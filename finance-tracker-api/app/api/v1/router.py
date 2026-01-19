from fastapi import APIRouter
from app.api.v1.endpoints import system, users

api_router = APIRouter()

api_router.include_router(system.router, tags=["System"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
