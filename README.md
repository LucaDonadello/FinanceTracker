# Finance Tracker API

A personal project to track personal expenses, categorize spending, and visualize trends. Built with FastAPI and PostgreSQL.

## Features
- Upload CSV/XLSX files with expenses
- Automatic categorization using AI
- Monthly and yearly summaries
- Graphs and analytics dashboard

## Tech Stack
- Python 3.12
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- JavaScript/React for frontend (planned)

## Getting Started
1. Clone repo
2. Create virtual environment: `python -m venv venv`
3. Activate venv: `source venv/bin/activate` or `venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run server: `uvicorn app.main:app --reload`