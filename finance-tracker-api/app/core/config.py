from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Finance Tracker API"
    debug: bool = True

settings = Settings()
