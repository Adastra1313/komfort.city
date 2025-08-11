from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPAuthorizationCredentials
from datetime import timedelta

from models import AdminLogin, AdminUser, MessageResponse
from auth import auth_manager, get_current_admin_user, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.post("/login")
async def login(login_data: AdminLogin):
    """Admin login endpoint"""
    user = await auth_manager.authenticate_user(login_data.username, login_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_manager.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # in seconds
        "user": {
            "id": str(user.id) if user.id else None,
            "username": user.username,
            "email": user.email
        }
    }

@router.post("/logout")
async def logout(current_user: AdminUser = Depends(get_current_admin_user)):
    """Admin logout endpoint"""
    # In a more sophisticated setup, you would invalidate the token
    # For now, we just return a success message
    return MessageResponse(message="Successfully logged out")

@router.get("/me")
async def get_current_user_info(current_user: AdminUser = Depends(get_current_admin_user)):
    """Get current admin user info"""
    return {
        "id": str(current_user.id) if current_user.id else None,
        "username": current_user.username,
        "email": current_user.email,
        "active": current_user.active,
        "created_at": current_user.created_at,
        "last_login": current_user.last_login
    }

@router.post("/change-password")
async def change_password(
    password_data: dict,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Change admin password"""
    current_password = password_data.get("current_password")
    new_password = password_data.get("new_password")
    
    if not current_password or not new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Both current_password and new_password are required"
        )
    
    # Verify current password
    if not auth_manager.verify_password(current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Hash new password and update
    from database import update_one, Collections
    from bson import ObjectId
    from datetime import datetime
    
    new_hashed_password = auth_manager.get_password_hash(new_password)
    
    result = await update_one(
        Collections.ADMIN_USERS,
        {"_id": ObjectId(current_user.id)},
        {
            "hashed_password": new_hashed_password,
            "updated_at": datetime.utcnow()
        }
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update password"
        )
    
    return MessageResponse(message="Password changed successfully")