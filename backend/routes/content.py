from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from datetime import datetime
from bson import ObjectId

from models import (
    Service, ServiceCreate, ServiceUpdate,
    Sector, SectorCreate, SectorUpdate,
    Advantage, AdvantageCreate, AdvantageUpdate,
    Solution, SolutionCreate, SolutionUpdate,
    Project, ProjectCreate, ProjectUpdate,
    FAQ, FAQCreate, FAQUpdate,
    SiteInfo, SiteInfoUpdate,
    AdminUser, MessageResponse
)
from database import Collections, find_many, find_one, insert_one, update_one, delete_one
from auth import get_current_admin_user

router = APIRouter(prefix="/api", tags=["content"])

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc and "_id" in doc:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    return doc

# Site Info endpoints
@router.get("/site-info")
async def get_site_info():
    """Get site information (public endpoint)"""
    site_info = await find_one(Collections.SITE_INFO, {})
    if not site_info:
        raise HTTPException(status_code=404, detail="Site info not found")
    return serialize_doc(site_info)

@router.put("/site-info")
async def update_site_info(
    site_info_update: SiteInfoUpdate, 
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Update site information (admin only)"""
    update_data = site_info_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await update_one(Collections.SITE_INFO, {}, update_data)
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Site info not found or no changes made")
    
    return MessageResponse(message="Site info updated successfully")

# Services endpoints
@router.get("/services", response_model=List[Service])
async def get_services():
    """Get all active services (public endpoint)"""
    services = await find_many(
        Collections.SERVICES, 
        {"active": True}, 
        [("order", 1), ("created_at", 1)]
    )
    return [serialize_doc(service) for service in services]

@router.get("/admin/services", response_model=List[Service])
async def get_all_services(current_user: AdminUser = Depends(get_current_admin_user)):
    """Get all services for admin (admin only)"""
    services = await find_many(
        Collections.SERVICES, 
        {}, 
        [("order", 1), ("created_at", 1)]
    )
    return [serialize_doc(service) for service in services]

@router.post("/services", response_model=Service)
async def create_service(
    service: ServiceCreate, 
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Create new service (admin only)"""
    service_data = service.dict()
    service_data["created_at"] = datetime.utcnow()
    service_data["updated_at"] = datetime.utcnow()
    
    result = await insert_one(Collections.SERVICES, service_data)
    
    created_service = await find_one(Collections.SERVICES, {"_id": result.inserted_id})
    return serialize_doc(created_service)

@router.put("/services/{service_id}")
async def update_service(
    service_id: str,
    service_update: ServiceUpdate,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Update service (admin only)"""
    if not ObjectId.is_valid(service_id):
        raise HTTPException(status_code=400, detail="Invalid service ID")
    
    update_data = service_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await update_one(
        Collections.SERVICES, 
        {"_id": ObjectId(service_id)}, 
        update_data
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Service not found or no changes made")
    
    return MessageResponse(message="Service updated successfully")

@router.delete("/services/{service_id}")
async def delete_service(
    service_id: str,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Delete service (admin only)"""
    if not ObjectId.is_valid(service_id):
        raise HTTPException(status_code=400, detail="Invalid service ID")
    
    result = await delete_one(Collections.SERVICES, {"_id": ObjectId(service_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    
    return MessageResponse(message="Service deleted successfully")

# Sectors endpoints
@router.get("/sectors", response_model=List[Sector])
async def get_sectors():
    """Get all active sectors (public endpoint)"""
    sectors = await find_many(
        Collections.SECTORS, 
        {"active": True}, 
        [("order", 1), ("created_at", 1)]
    )
    return [serialize_doc(sector) for sector in sectors]

@router.get("/admin/sectors", response_model=List[Sector])
async def get_all_sectors(current_user: AdminUser = Depends(get_current_admin_user)):
    """Get all sectors for admin (admin only)"""
    sectors = await find_many(
        Collections.SECTORS, 
        {}, 
        [("order", 1), ("created_at", 1)]
    )
    return [serialize_doc(sector) for sector in sectors]

@router.post("/sectors", response_model=Sector)
async def create_sector(
    sector: SectorCreate, 
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Create new sector (admin only)"""
    sector_data = sector.dict()
    sector_data["created_at"] = datetime.utcnow()
    sector_data["updated_at"] = datetime.utcnow()
    
    result = await insert_one(Collections.SECTORS, sector_data)
    
    created_sector = await find_one(Collections.SECTORS, {"_id": result.inserted_id})
    return serialize_doc(created_sector)

@router.put("/sectors/{sector_id}")
async def update_sector(
    sector_id: str,
    sector_update: SectorUpdate,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Update sector (admin only)"""
    if not ObjectId.is_valid(sector_id):
        raise HTTPException(status_code=400, detail="Invalid sector ID")
    
    update_data = sector_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await update_one(
        Collections.SECTORS, 
        {"_id": ObjectId(sector_id)}, 
        update_data
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Sector not found or no changes made")
    
    return MessageResponse(message="Sector updated successfully")

@router.delete("/sectors/{sector_id}")
async def delete_sector(
    sector_id: str,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Delete sector (admin only)"""
    if not ObjectId.is_valid(sector_id):
        raise HTTPException(status_code=400, detail="Invalid sector ID")
    
    result = await delete_one(Collections.SECTORS, {"_id": ObjectId(sector_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Sector not found")
    
    return MessageResponse(message="Sector deleted successfully")

# Advantages endpoints
@router.get("/advantages", response_model=List[Advantage])
async def get_advantages():
    """Get all active advantages (public endpoint)"""
    advantages = await find_many(
        Collections.ADVANTAGES, 
        {"active": True}, 
        [("order", 1), ("created_at", 1)]
    )
    return [serialize_doc(advantage) for advantage in advantages]

@router.get("/admin/advantages", response_model=List[Advantage])
async def get_all_advantages(current_user: AdminUser = Depends(get_current_admin_user)):
    """Get all advantages for admin (admin only)"""
    advantages = await find_many(
        Collections.ADVANTAGES, 
        {}, 
        [("order", 1), ("created_at", 1)]
    )
    return [serialize_doc(advantage) for advantage in advantages]

@router.post("/advantages", response_model=Advantage)
async def create_advantage(
    advantage: AdvantageCreate, 
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Create new advantage (admin only)"""
    advantage_data = advantage.dict()
    advantage_data["created_at"] = datetime.utcnow()
    advantage_data["updated_at"] = datetime.utcnow()
    
    result = await insert_one(Collections.ADVANTAGES, advantage_data)
    
    created_advantage = await find_one(Collections.ADVANTAGES, {"_id": result.inserted_id})
    return serialize_doc(created_advantage)

@router.put("/advantages/{advantage_id}")
async def update_advantage(
    advantage_id: str,
    advantage_update: AdvantageUpdate,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Update advantage (admin only)"""
    if not ObjectId.is_valid(advantage_id):
        raise HTTPException(status_code=400, detail="Invalid advantage ID")
    
    update_data = advantage_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await update_one(
        Collections.ADVANTAGES, 
        {"_id": ObjectId(advantage_id)}, 
        update_data
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Advantage not found or no changes made")
    
    return MessageResponse(message="Advantage updated successfully")

@router.delete("/advantages/{advantage_id}")
async def delete_advantage(
    advantage_id: str,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Delete advantage (admin only)"""
    if not ObjectId.is_valid(advantage_id):
        raise HTTPException(status_code=400, detail="Invalid advantage ID")
    
    result = await delete_one(Collections.ADVANTAGES, {"_id": ObjectId(advantage_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Advantage not found")
    
    return MessageResponse(message="Advantage deleted successfully")

# Solutions endpoints
@router.get("/solutions", response_model=List[Solution])
async def get_solutions():
    """Get all active solutions (public endpoint)"""
    solutions = await find_many(
        Collections.SOLUTIONS, 
        {"active": True}, 
        [("order", 1), ("created_at", 1)]
    )
    return [serialize_doc(solution) for solution in solutions]

@router.get("/admin/solutions", response_model=List[Solution])
async def get_all_solutions(current_user: AdminUser = Depends(get_current_admin_user)):
    """Get all solutions for admin (admin only)"""
    solutions = await find_many(
        Collections.SOLUTIONS, 
        {}, 
        [("order", 1), ("created_at", 1)]
    )
    return [serialize_doc(solution) for solution in solutions]

@router.post("/solutions", response_model=Solution)
async def create_solution(
    solution: SolutionCreate, 
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Create new solution (admin only)"""
    solution_data = solution.dict()
    solution_data["created_at"] = datetime.utcnow()
    solution_data["updated_at"] = datetime.utcnow()
    
    result = await insert_one(Collections.SOLUTIONS, solution_data)
    
    created_solution = await find_one(Collections.SOLUTIONS, {"_id": result.inserted_id})
    return serialize_doc(created_solution)

@router.put("/solutions/{solution_id}")
async def update_solution(
    solution_id: str,
    solution_update: SolutionUpdate,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Update solution (admin only)"""
    if not ObjectId.is_valid(solution_id):
        raise HTTPException(status_code=400, detail="Invalid solution ID")
    
    update_data = solution_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await update_one(
        Collections.SOLUTIONS, 
        {"_id": ObjectId(solution_id)}, 
        update_data
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Solution not found or no changes made")
    
    return MessageResponse(message="Solution updated successfully")

@router.delete("/solutions/{solution_id}")
async def delete_solution(
    solution_id: str,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Delete solution (admin only)"""
    if not ObjectId.is_valid(solution_id):
        raise HTTPException(status_code=400, detail="Invalid solution ID")
    
    result = await delete_one(Collections.SOLUTIONS, {"_id": ObjectId(solution_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Solution not found")
    
    return MessageResponse(message="Solution deleted successfully")

# Projects endpoints
@router.get("/projects", response_model=List[Project])
async def get_projects():
    """Get all active projects (public endpoint)"""
    projects = await find_many(
        Collections.PROJECTS, 
        {"active": True}, 
        [("order", 1), ("created_at", -1)]
    )
    return [serialize_doc(project) for project in projects]

@router.get("/admin/projects", response_model=List[Project])
async def get_all_projects(current_user: AdminUser = Depends(get_current_admin_user)):
    """Get all projects for admin (admin only)"""
    projects = await find_many(
        Collections.PROJECTS, 
        {}, 
        [("order", 1), ("created_at", -1)]
    )
    return [serialize_doc(project) for project in projects]

@router.post("/projects", response_model=Project)
async def create_project(
    project: ProjectCreate, 
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Create new project (admin only)"""
    project_data = project.dict()
    project_data["created_at"] = datetime.utcnow()
    project_data["updated_at"] = datetime.utcnow()
    
    result = await insert_one(Collections.PROJECTS, project_data)
    
    created_project = await find_one(Collections.PROJECTS, {"_id": result.inserted_id})
    return serialize_doc(created_project)

@router.put("/projects/{project_id}")
async def update_project(
    project_id: str,
    project_update: ProjectUpdate,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Update project (admin only)"""
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    update_data = project_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await update_one(
        Collections.PROJECTS, 
        {"_id": ObjectId(project_id)}, 
        update_data
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Project not found or no changes made")
    
    return MessageResponse(message="Project updated successfully")

@router.delete("/projects/{project_id}")
async def delete_project(
    project_id: str,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Delete project (admin only)"""
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    
    result = await delete_one(Collections.PROJECTS, {"_id": ObjectId(project_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return MessageResponse(message="Project deleted successfully")

# FAQ endpoints
@router.get("/faq", response_model=List[FAQ])
async def get_faq():
    """Get all active FAQ (public endpoint)"""
    faq = await find_many(
        Collections.FAQ, 
        {"active": True}, 
        [("order", 1), ("created_at", 1)]
    )
    return [serialize_doc(item) for item in faq]

@router.get("/admin/faq", response_model=List[FAQ])
async def get_all_faq(current_user: AdminUser = Depends(get_current_admin_user)):
    """Get all FAQ for admin (admin only)"""
    faq = await find_many(
        Collections.FAQ, 
        {}, 
        [("order", 1), ("created_at", 1)]
    )
    return [serialize_doc(item) for item in faq]

@router.post("/faq", response_model=FAQ)
async def create_faq(
    faq: FAQCreate, 
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Create new FAQ (admin only)"""
    faq_data = faq.dict()
    faq_data["created_at"] = datetime.utcnow()
    faq_data["updated_at"] = datetime.utcnow()
    
    result = await insert_one(Collections.FAQ, faq_data)
    
    created_faq = await find_one(Collections.FAQ, {"_id": result.inserted_id})
    return serialize_doc(created_faq)

@router.put("/faq/{faq_id}")
async def update_faq(
    faq_id: str,
    faq_update: FAQUpdate,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Update FAQ (admin only)"""
    if not ObjectId.is_valid(faq_id):
        raise HTTPException(status_code=400, detail="Invalid FAQ ID")
    
    update_data = faq_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    result = await update_one(
        Collections.FAQ, 
        {"_id": ObjectId(faq_id)}, 
        update_data
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found or no changes made")
    
    return MessageResponse(message="FAQ updated successfully")

@router.delete("/faq/{faq_id}")
async def delete_faq(
    faq_id: str,
    current_user: AdminUser = Depends(get_current_admin_user)
):
    """Delete FAQ (admin only)"""
    if not ObjectId.is_valid(faq_id):
        raise HTTPException(status_code=400, detail="Invalid FAQ ID")
    
    result = await delete_one(Collections.FAQ, {"_id": ObjectId(faq_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    return MessageResponse(message="FAQ deleted successfully")