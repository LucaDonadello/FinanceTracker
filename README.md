# Finance Tracker API

A personal project to track personal expenses, categorize spending, and visualize trends. Built with FastAPI and PostgreSQL.

## Features
- Upload CSV/XLSX files with expenses
- Automatic categorization using AI
- Monthly and yearly summaries
- Graphs and analytics dashboard
- User management (register/login)
- Database migrations handled via Alembic

## Tech Stack
- Python 3.12
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Alembic
- JavaScript/React for frontend (planned)

## Getting Started

### 1. Clone the repository

### 2. Create and activate a virtual environment

python -m venv venv

#### On Windows:
venv\Scripts\activate

#### On macOS/Linux:
source venv/bin/activate

### 3. Install Dependencies
pip install --upgrade pip
pip install -r requirements.txt

### 4. Set up the PostgreSQL database
- Make sure PostgreSQL is installed and running
- Create a database:
  CREATE DATABASE finance_tracker;

### 5. Configure your .env or settings
Set environment variables for database connection, e.g.:
DATABASE_URL=postgresql://username:password@localhost:5432/finance_tracker
SECRET_KEY=your-secret-key

### 6. Run Alembic migrations
alembic init alembic
- Make sure your Alembic env.py points to your SQLAlchemy DATABASE_URL
- Generate migrations (if you add new models):
alembic revision --autogenerate -m "Add users table"
- Apply migrations to create tables:
alembic upgrade head

### 7. Run the Server
uvicorn app.main:app --reload

### 8. Notes
Each time you add or modify models, generate and run migrations using Alembic.
Email addresses are unique; trying to register an existing email will fail.
All timestamps are stored in UTC to avoid timezone issues.


