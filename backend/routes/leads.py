from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from models import (
    Lead, LeadCreate, LeadUpdate, LeadStatus,
    AdminUser, MessageResponse, DashboardStats, LeadStats
)
from database import Collections, find_many, find_one, insert_one, update_one, count_documents
from auth import get_current_admin_user

router = APIRouter(prefix="/api", tags=["leads"])

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc and "_id" in doc:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    return doc

# Contact form endpoint (public)
@router.post("/contact-form", response_model=MessageResponse)
async def submit_contact_form(lead: LeadCreate):
    """Submit contact form (public endpoint)"""
    lead_data = lead.dict()
    lead_data["status"] = LeadStatus.new
    lead_data["created_at"] = datetime.utcnow()
    lead_data["updated_at"] = datetime.utcnow()
    
    result = await insert_one(Collections.LEADS, lead_data)
    
    if result.inserted_id:
        # Here you could add email notification logic
        return MessageResponse(
            message="Дякуємо! Ваша заявка відправлена. Ми зв'яжемося з вами найближчим часом.",
            success=True
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit form"
        )

# Admin endpoints for managing leads
@router.get("/leads", response_model=List[Lead])
async def get_leads(
    status_filter: Optional[LeadStatus] = None,
    limit: Optional[int] = 100,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Get all leads with optional status filter (admin only)"""
    filter_dict = {}
    if status_filter:
        filter_dict["status"] = status_filter
    
    leads = await find_many(
        Collections.LEADS,
        filter_dict,
        [("created_at", -1)],  # Sort by newest first
        limit
    )
    
    return [serialize_doc(lead) for lead in leads]

@router.get("/leads/{lead_id}", response_model=Lead)
async def get_lead(
    lead_id: str,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Get specific lead by ID (admin only)"""
    if not ObjectId.is_valid(lead_id):
        raise HTTPException(status_code=400, detail="Invalid lead ID")
    
    lead = await find_one(Collections.LEADS, {"_id": ObjectId(lead_id)})
    
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    return serialize_doc(lead)

@router.put("/leads/{lead_id}/status")
async def update_lead_status(
    lead_id: str,
    lead_update: LeadUpdate,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Update lead status and notes (admin only)"""
    if not ObjectId.is_valid(lead_id):
        raise HTTPException(status_code=400, detail="Invalid lead ID")
    
    update_data = lead_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await update_one(
        Collections.LEADS,
        {"_id": ObjectId(lead_id)},
        update_data
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found or no changes made")
    
    return MessageResponse(message="Lead status updated successfully")

@router.get("/leads/stats", response_model=LeadStats)
async def get_lead_stats(current_user: AdminUser = Depends(get_current_admin_user)):
    """Get lead statistics (admin only)"""
    new_count = await count_documents(Collections.LEADS, {"status": LeadStatus.new})
    in_progress_count = await count_documents(Collections.LEADS, {"status": LeadStatus.in_progress})
    completed_count = await count_documents(Collections.LEADS, {"status": LeadStatus.completed})
    rejected_count = await count_documents(Collections.LEADS, {"status": LeadStatus.rejected})
    total_count = await count_documents(Collections.LEADS, {})
    
    return LeadStats(
        new=new_count,
        in_progress=in_progress_count,
        completed=completed_count,
        rejected=rejected_count,
        total=total_count
    )

@router.get("/dashboard/stats", response_model=DashboardStats)
async def get_dashboard_stats(current_user: AdminUser = Depends(get_current_admin_user)):
    """Get dashboard statistics (admin only)"""
    total_leads = await count_documents(Collections.LEADS, {})
    new_leads = await count_documents(Collections.LEADS, {"status": LeadStatus.new})
    completed_projects = await count_documents(Collections.PROJECTS, {"active": True})
    active_services = await count_documents(Collections.SERVICES, {"active": True})
    
    # Count total content items
    total_content = (
        await count_documents(Collections.SERVICES, {}) +
        await count_documents(Collections.SECTORS, {}) +
        await count_documents(Collections.ADVANTAGES, {}) +
        await count_documents(Collections.SOLUTIONS, {}) +
        await count_documents(Collections.PROJECTS, {}) +
        await count_documents(Collections.FAQ, {})
    )
    
    return DashboardStats(
        total_leads=total_leads,
        new_leads=new_leads,
        completed_projects=completed_projects,
        active_services=active_services,
        total_content_items=total_content
    )