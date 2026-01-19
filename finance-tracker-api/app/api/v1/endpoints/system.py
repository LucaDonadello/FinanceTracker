from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()

@router.get("/info", tags=["System"])
async def get_info():
    return {
        "APP_NAME": settings.APP_NAME,
        "DEBUG": settings.DEBUG
    }

@router.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok"}
