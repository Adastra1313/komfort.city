from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os
from typing import Optional

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database: Optional[AsyncIOMotorDatabase] = None

# Database instance
db_instance = Database()

async def connect_to_mongo():
    """Create database connection"""
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME', 'komfort_city')
    
    db_instance.client = AsyncIOMotorClient(mongo_url)
    db_instance.database = db_instance.client[db_name]
    
    print(f"Connected to MongoDB: {db_name}")

async def close_mongo_connection():
    """Close database connection"""
    if db_instance.client:
        db_instance.client.close()
        print("Disconnected from MongoDB")

def get_database() -> AsyncIOMotorDatabase:
    """Get database instance"""
    return db_instance.database

# Collection names
class Collections:
    SITE_INFO = "site_info"
    SERVICES = "services"
    SECTORS = "sectors"  
    ADVANTAGES = "advantages"
    SOLUTIONS = "solutions"
    PROJECTS = "projects"
    FAQ = "faq"
    LEADS = "leads"
    ADMIN_USERS = "admin_users"
    UPLOADS = "uploads"

# Helper functions for common database operations
async def get_collection(collection_name: str):
    """Get collection by name"""
    db = get_database()
    return db[collection_name]

async def insert_one(collection_name: str, document: dict):
    """Insert one document"""
    collection = await get_collection(collection_name)
    result = await collection.insert_one(document)
    return result

async def find_one(collection_name: str, filter_dict: dict):
    """Find one document"""
    collection = await get_collection(collection_name)
    result = await collection.find_one(filter_dict)
    return result

async def find_many(collection_name: str, filter_dict: dict = None, sort_by: list = None, limit: int = None):
    """Find many documents"""
    collection = await get_collection(collection_name)
    
    if filter_dict is None:
        filter_dict = {}
    
    cursor = collection.find(filter_dict)
    
    if sort_by:
        cursor = cursor.sort(sort_by)
    
    if limit:
        cursor = cursor.limit(limit)
    
    results = await cursor.to_list(length=None)
    return results

async def update_one(collection_name: str, filter_dict: dict, update_dict: dict):
    """Update one document"""
    collection = await get_collection(collection_name)
    result = await collection.update_one(filter_dict, {"$set": update_dict})
    return result

async def delete_one(collection_name: str, filter_dict: dict):
    """Delete one document"""
    collection = await get_collection(collection_name)
    result = await collection.delete_one(filter_dict)
    return result

async def count_documents(collection_name: str, filter_dict: dict = None):
    """Count documents"""
    collection = await get_collection(collection_name)
    if filter_dict is None:
        filter_dict = {}
    count = await collection.count_documents(filter_dict)
    return count

# Initialize default data
async def init_default_data():
    """Initialize database with default data from mock.js"""
    from datetime import datetime
    
    # Check if site_info exists
    site_info = await find_one(Collections.SITE_INFO, {})
    if not site_info:
        default_site_info = {
            "company_name": "ТОВ «Комфорт.Сіті»",
            "phone": "+380 XX XXX XX XX",
            "email": "info@komfort.city",
            "address": "Адреса офісу",
            "working_hours": "Пн-Пт: 9:00-18:00, Сб-Нд: 10:00-16:00",
            "emergency_phone": "+380 XX XXX XX XX",
            "updated_at": datetime.utcnow()
        }
        await insert_one(Collections.SITE_INFO, default_site_info)
        print("✅ Default site info created")

    # Check if services exist
    services_count = await count_documents(Collections.SERVICES)
    if services_count == 0:
        default_services = [
            {
                "title": {
                    "ua": "Проєктування котелень",
                    "ru": "Проектирование котельных", 
                    "en": "Boiler room design"
                },
                "description": {
                    "ua": "Газ/електро/твердопаливо, ТП, ГВП, каскади",
                    "ru": "Газ/электро/твердотопливо, ТП, ГВС, каскады",
                    "en": "Gas/electric/solid fuel, heating, hot water, cascades"
                },
                "icon": "Settings",
                "order": 1,
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": {
                    "ua": "Монтаж і пусконалагодження",
                    "ru": "Монтаж и пусконаладка",
                    "en": "Installation & commissioning"
                },
                "description": {
                    "ua": "Повний цикл встановлення та налаштування",
                    "ru": "Полный цикл установки и настройки",
                    "en": "Full cycle of installation and setup"
                },
                "icon": "Wrench",
                "order": 2,
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": {
                    "ua": "Документація та дозволи",
                    "ru": "Документация и разрешения",
                    "en": "Documentation & permits"
                },
                "description": {
                    "ua": "Оформлення всіх дозвільних процедур",
                    "ru": "Оформление всех разрешительных процедур",
                    "en": "Processing all permit procedures"
                },
                "icon": "FileText",
                "order": 3,
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": {
                    "ua": "Сервіс 24/7",
                    "ru": "Сервис 24/7",
                    "en": "24/7 Service"
                },
                "description": {
                    "ua": "Диспетчеризація BMS/SCADA",
                    "ru": "Диспетчеризация BMS/SCADA",
                    "en": "BMS/SCADA dispatching"
                },
                "icon": "Headphones",
                "order": 4,
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": {
                    "ua": "Енергоаудит і модернізація",
                    "ru": "Энергоаудит и модернизация",
                    "en": "Energy audit & modernization"
                },
                "description": {
                    "ua": "Реконструкція існуючих систем",
                    "ru": "Реконструкция существующих систем",
                    "en": "Reconstruction of existing systems"
                },
                "icon": "TrendingUp",
                "order": 5,
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": {
                    "ua": "Постачання обладнання",
                    "ru": "Поставка оборудования",
                    "en": "Equipment supply"
                },
                "description": {
                    "ua": "Підбір та постачання комплектуючих",
                    "ru": "Подбор и поставка комплектующих",
                    "en": "Selection and supply of components"
                },
                "icon": "Package",
                "order": 6,
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        
        for service in default_services:
            await insert_one(Collections.SERVICES, service)
        
        print(f"✅ {len(default_services)} default services created")

    print("✅ Database initialization completed")