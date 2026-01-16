from fastapi import FastAPI
from fastapi.routing import APIRouter
from .core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG
)

api_router = APIRouter(prefix="/api/v1")

@api_router.get("/info", tags=["System"])
async def get_info():
    return {
        "APP_NAME": settings.APP_NAME,
        "DATABASE_URL": settings.DATABASE_URL,
        "SECRET_KEY": settings.SECRET_KEY,
        "DEBUG": settings.DEBUG
    }

@api_router.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok"}

app.include_router(api_router)
