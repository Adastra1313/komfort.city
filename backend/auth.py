from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models import AdminUser
from database import Collections, find_one, update_one
import os

# Security configuration
SECRET_KEY = os.environ.get("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 24 * 60  # 24 hours

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Bearer token scheme
security = HTTPBearer()

class AuthManager:
    def __init__(self):
        self.pwd_context = pwd_context

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify password against hash"""
        return self.pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str) -> str:
        """Hash password"""
        return self.pwd_context.hash(password)

    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None):
        """Create JWT access token"""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    async def authenticate_user(self, username: str, password: str) -> Optional[AdminUser]:
        """Authenticate user by username and password"""
        user_data = await find_one(Collections.ADMIN_USERS, {"username": username})
        
        if not user_data:
            return None
        
        user = AdminUser(**user_data)
        
        if not user.active:
            return None
            
        if not self.verify_password(password, user.hashed_password):
            return None
            
        # Update last login
        await update_one(
            Collections.ADMIN_USERS,
            {"username": username},
            {"last_login": datetime.utcnow()}
        )
        
        return user

    async def get_current_user(self, credentials: HTTPAuthorizationCredentials = Depends(security)) -> AdminUser:
        """Get current authenticated user from JWT token"""
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
        try:
            payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        
        user_data = await find_one(Collections.ADMIN_USERS, {"username": username})
        if user_data is None:
            raise credentials_exception
            
        user = AdminUser(**user_data)
        if not user.active:
            raise credentials_exception
            
        return user

# Create auth manager instance
auth_manager = AuthManager()

# Dependency to get current user
async def get_current_admin_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> AdminUser:
    return await auth_manager.get_current_user(credentials)

# Create default admin user
async def create_default_admin():
    """Create default admin user if not exists"""
    existing_admin = await find_one(Collections.ADMIN_USERS, {"username": "admin"})
    
    if not existing_admin:
        from database import insert_one
        
        default_admin = {
            "username": "admin",
            "email": "admin@komfort.city",
            "hashed_password": auth_manager.get_password_hash("admin123"),  # Change in production!
            "active": True,
            "created_at": datetime.utcnow(),
            "last_login": None
        }
        
        await insert_one(Collections.ADMIN_USERS, default_admin)
        print("✅ Default admin user created (username: admin, password: admin123)")
        print("⚠️  CHANGE DEFAULT PASSWORD IN PRODUCTION!")