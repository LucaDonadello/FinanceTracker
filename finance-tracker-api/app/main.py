from fastapi import FastAPI
from fastapi.routing import APIRouter

app = FastAPI(
    title="Finance Tracker API",
    version="1.0.0"
)

api_router = APIRouter(prefix="/api/v1")

@api_router.get("/health", tags=["System"])
def health_check():
    return {"status": "ok"}

app.include_router(api_router)
