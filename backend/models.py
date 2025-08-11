from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

# Multilingual text model
class MultilingualText(BaseModel):
    ua: str
    ru: str
    en: str

# Enums
class LeadStatus(str, Enum):
    new = "new"
    in_progress = "in_progress"
    completed = "completed"
    rejected = "rejected"

class ObjectType(str, Enum):
    production = "production"
    office = "office"
    hotel = "hotel"
    medical = "medical"
    residential = "residential"
    educational = "educational"
    warehouse = "warehouse"
    agriculture = "agriculture"

class CurrentFuel(str, Enum):
    gas = "gas"
    electricity = "electricity"
    solid = "solid"
    central = "central"
    none = "none"

class Timeline(str, Enum):
    urgent = "urgent"
    normal = "normal"
    planned = "planned"
    future = "future"

# Site Info Model
class SiteInfo(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    company_name: str
    phone: str
    email: str
    address: str
    working_hours: str
    emergency_phone: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SiteInfoUpdate(BaseModel):
    company_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    working_hours: Optional[str] = None
    emergency_phone: Optional[str] = None

# Service Model
class Service(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: MultilingualText
    description: MultilingualText
    icon: str
    order: int = 0
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ServiceCreate(BaseModel):
    title: MultilingualText
    description: MultilingualText
    icon: str
    order: int = 0
    active: bool = True

class ServiceUpdate(BaseModel):
    title: Optional[MultilingualText] = None
    description: Optional[MultilingualText] = None
    icon: Optional[str] = None
    order: Optional[int] = None
    active: Optional[bool] = None

# Sector Model
class Sector(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: MultilingualText
    description: MultilingualText
    image: str
    stats: Optional[str] = None
    order: int = 0
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SectorCreate(BaseModel):
    name: MultilingualText
    description: MultilingualText
    image: str
    stats: Optional[str] = None
    order: int = 0
    active: bool = True

class SectorUpdate(BaseModel):
    name: Optional[MultilingualText] = None
    description: Optional[MultilingualText] = None
    image: Optional[str] = None
    stats: Optional[str] = None
    order: Optional[int] = None
    active: Optional[bool] = None

# Advantage Model
class Advantage(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: MultilingualText
    description: MultilingualText
    icon: str
    order: int = 0
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AdvantageCreate(BaseModel):
    title: MultilingualText
    description: MultilingualText
    icon: str
    order: int = 0
    active: bool = True

class AdvantageUpdate(BaseModel):
    title: Optional[MultilingualText] = None
    description: Optional[MultilingualText] = None
    icon: Optional[str] = None
    order: Optional[int] = None
    active: Optional[bool] = None

# Solution Model
class Solution(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: MultilingualText
    description: MultilingualText
    power_range: str
    brands: str
    timeline: str
    budget_range: str
    icon: str
    popular: bool = False
    order: int = 0
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SolutionCreate(BaseModel):
    title: MultilingualText
    description: MultilingualText
    power_range: str
    brands: str
    timeline: str
    budget_range: str
    icon: str
    popular: bool = False
    order: int = 0
    active: bool = True

class SolutionUpdate(BaseModel):
    title: Optional[MultilingualText] = None
    description: Optional[MultilingualText] = None
    power_range: Optional[str] = None
    brands: Optional[str] = None
    timeline: Optional[str] = None
    budget_range: Optional[str] = None
    icon: Optional[str] = None
    popular: Optional[bool] = None
    order: Optional[int] = None
    active: Optional[bool] = None

# Project Model
class Project(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: MultilingualText
    sector: str
    power: str
    savings: str
    duration: str
    fuel_type: str
    image: str
    description: MultilingualText
    featured: bool = False
    order: int = 0
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: MultilingualText
    sector: str
    power: str
    savings: str
    duration: str
    fuel_type: str
    image: str
    description: MultilingualText
    featured: bool = False
    order: int = 0
    active: bool = True

class ProjectUpdate(BaseModel):
    title: Optional[MultilingualText] = None
    sector: Optional[str] = None
    power: Optional[str] = None
    savings: Optional[str] = None
    duration: Optional[str] = None
    fuel_type: Optional[str] = None
    image: Optional[str] = None
    description: Optional[MultilingualText] = None
    featured: Optional[bool] = None
    order: Optional[int] = None
    active: Optional[bool] = None

# FAQ Model
class FAQ(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    question: MultilingualText
    answer: MultilingualText
    order: int = 0
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class FAQCreate(BaseModel):
    question: MultilingualText
    answer: MultilingualText
    order: int = 0
    active: bool = True

class FAQUpdate(BaseModel):
    question: Optional[MultilingualText] = None
    answer: Optional[MultilingualText] = None
    order: Optional[int] = None
    active: Optional[bool] = None

# Lead Model (Contact Form)
class Lead(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    object_type: ObjectType
    area: float
    current_fuel: CurrentFuel
    needs: List[str]
    timeline: Timeline
    name: str
    phone: str
    email: str
    message: Optional[str] = None
    status: LeadStatus = LeadStatus.new
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class LeadCreate(BaseModel):
    object_type: ObjectType
    area: float
    current_fuel: CurrentFuel
    needs: List[str]
    timeline: Timeline
    name: str
    phone: str
    email: str
    message: Optional[str] = None

class LeadUpdate(BaseModel):
    status: Optional[LeadStatus] = None
    notes: Optional[str] = None

# Admin User Model
class AdminUser(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    username: str
    email: str
    hashed_password: str
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None

class AdminUserCreate(BaseModel):
    username: str
    email: str
    password: str

class AdminLogin(BaseModel):
    username: str
    password: str

# File Upload Models
class FileUpload(BaseModel):
    filename: str
    content_type: str
    size: int
    url: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

# Response Models
class MessageResponse(BaseModel):
    message: str
    success: bool = True

class ErrorResponse(BaseModel):
    error: str
    success: bool = False

# Stats Models for Dashboard
class DashboardStats(BaseModel):
    total_leads: int
    new_leads: int
    completed_projects: int
    active_services: int
    total_content_items: int

class LeadStats(BaseModel):
    new: int
    in_progress: int
    completed: int
    rejected: int
    total: int