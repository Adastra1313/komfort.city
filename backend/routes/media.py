from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status
from fastapi.responses import FileResponse
from typing import List
import os
import uuid
import shutil
from pathlib import Path
from datetime import datetime

from models import AdminUser, FileUpload, MessageResponse
from auth import get_current_admin_user
from database import Collections, insert_one, find_many, delete_one, find_one

router = APIRouter(prefix="/api", tags=["media"])

# Configuration
UPLOAD_DIR = Path("/app/uploads")
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# Ensure upload directory exists
UPLOAD_DIR.mkdir(exist_ok=True)

def is_allowed_file(filename: str) -> bool:
    """Check if file extension is allowed"""
    return Path(filename).suffix.lower() in ALLOWED_EXTENSIONS

def generate_unique_filename(original_filename: str) -> str:
    """Generate unique filename while preserving extension"""
    file_ext = Path(original_filename).suffix
    unique_id = str(uuid.uuid4())
    return f"{unique_id}{file_ext}"

@router.post("/upload/image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Upload image file (admin only)"""
    
    # Check file extension
    if not is_allowed_file(file.filename):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Check file size
    if file.size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size too large. Maximum size: {MAX_FILE_SIZE // (1024*1024)}MB"
        )
    
    # Generate unique filename
    unique_filename = generate_unique_filename(file.filename)
    file_path = UPLOAD_DIR / unique_filename
    
    try:
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Save file info to database
        file_info = {
            "filename": unique_filename,
            "original_filename": file.filename,
            "content_type": file.content_type,
            "size": file.size,
            "url": f"/api/media/{unique_filename}",
            "uploaded_by": current_user.username,
            "uploaded_at": datetime.utcnow()
        }
        
        await insert_one(Collections.UPLOADS, file_info)
        
        return {
            "success": True,
            "message": "File uploaded successfully",
            "filename": unique_filename,
            "url": file_info["url"],
            "original_filename": file.filename,
            "size": file.size
        }
        
    except Exception as e:
        # Clean up file if database operation fails
        if file_path.exists():
            file_path.unlink()
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload file: {str(e)}"
        )

@router.get("/media/{filename}")
async def get_media_file(filename: str):
    """Get media file by filename (public endpoint)"""
    file_path = UPLOAD_DIR / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    # Get file info from database for content type
    file_info = await find_one(Collections.UPLOADS, {"filename": filename})
    
    content_type = "application/octet-stream"
    if file_info and "content_type" in file_info:
        content_type = file_info["content_type"]
    
    return FileResponse(
        path=file_path,
        media_type=content_type,
        filename=filename
    )

@router.get("/media", response_model=List[FileUpload])
async def get_media_files(
    limit: int = 50,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Get list of uploaded media files (admin only)"""
    files = await find_many(
        Collections.UPLOADS,
        {},
        [("uploaded_at", -1)],  # Sort by newest first
        limit
    )
    
    return files

@router.delete("/media/{filename}")
async def delete_media_file(
    filename: str,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Delete media file (admin only)"""
    
    # Check if file exists in database
    file_info = await find_one(Collections.UPLOADS, {"filename": filename})
    if not file_info:
        raise HTTPException(status_code=404, detail="File not found in database")
    
    # Delete from filesystem
    file_path = UPLOAD_DIR / filename
    if file_path.exists():
        file_path.unlink()
    
    # Delete from database
    result = await delete_one(Collections.UPLOADS, {"filename": filename})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete file from database"
        )
    
    return MessageResponse(message="File deleted successfully")

@router.post("/upload/bulk")
async def upload_bulk_images(
    files: List[UploadFile] = File(...),
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Upload multiple images at once (admin only)"""
    
    if len(files) > 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Maximum 10 files allowed per bulk upload"
        )
    
    uploaded_files = []
    failed_files = []
    
    for file in files:
        try:
            # Check file extension
            if not is_allowed_file(file.filename):
                failed_files.append({
                    "filename": file.filename,
                    "error": "File type not allowed"
                })
                continue
            
            # Check file size
            if file.size > MAX_FILE_SIZE:
                failed_files.append({
                    "filename": file.filename,
                    "error": "File size too large"
                })
                continue
            
            # Generate unique filename
            unique_filename = generate_unique_filename(file.filename)
            file_path = UPLOAD_DIR / unique_filename
            
            # Save file
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            # Save file info to database
            file_info = {
                "filename": unique_filename,
                "original_filename": file.filename,
                "content_type": file.content_type,
                "size": file.size,
                "url": f"/api/media/{unique_filename}",
                "uploaded_by": current_user.username,
                "uploaded_at": datetime.utcnow()
            }
            
            await insert_one(Collections.UPLOADS, file_info)
            
            uploaded_files.append({
                "filename": unique_filename,
                "original_filename": file.filename,
                "url": file_info["url"],
                "size": file.size
            })
            
        except Exception as e:
            failed_files.append({
                "filename": file.filename,
                "error": str(e)
            })
    
    return {
        "success": True,
        "message": f"Uploaded {len(uploaded_files)} files successfully",
        "uploaded_files": uploaded_files,
        "failed_files": failed_files,
        "total_uploaded": len(uploaded_files),
        "total_failed": len(failed_files)
    }