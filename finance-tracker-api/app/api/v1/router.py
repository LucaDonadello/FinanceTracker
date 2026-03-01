from fastapi import APIRouter
from app.api.v1.endpoints import system, users, financial_report

api_router = APIRouter()

api_router.include_router(system.router, tags=["System"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(financial_report.router, prefix="/financial-reports", tags=["Financial Reports"])

