# Finance Tracker

A comprehensive personal finance management system built with **FastAPI** and **PostgreSQL**. This API enables users to track expenses, manage multiple accounts, and analyze spending patterns with secure authentication and role-based access control.

**Project Status:** In Development  
**Python Version:** 3.12+  
**Last Updated:** February 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Authentication & Security](#authentication--security)
9. [Environment Configuration](#environment-configuration)
10. [Development Workflow](#development-workflow)
11. [Future Enhancements](#future-enhancements)
12. [Contributing](#contributing)

---

## Overview

**Finance Tracker API** is a robust backend service designed to help users manage their personal finances efficiently. It provides a complete REST API for user authentication, account management, and transaction tracking. The system implements JWT-based authentication for secure API access and uses SQLAlchemy ORM for database operations.

This project serves as a foundation for a full-stack personal finance application, with planned frontend integration (JavaScript/React).

---

## Features

### ✅ Core Features (Implemented)
- **User Management**
  - User registration with email validation
  - Secure login with JWT token authentication
  - Password hashing using bcrypt
  - User profile retrieval (protected endpoint)
  - Account creation linked to user registration

- **Authentication & Authorization**
  - JWT token-based stateless authentication
  - Bearer token validation
  - Protected endpoints requiring authentication
  - Automatic account creation upon user registration

- **System Monitoring**
  - Health check endpoint
  - API info endpoint with app metadata
  - Debug mode support

### 🔄 In Progress / Planned
- CSV/XLSX file upload for bulk expense imports
- Automatic expense categorization using AI
- Monthly and yearly spending summaries
- Data visualization and analytics dashboard
- Multi-account support (checking, savings, credit cards)
- Transaction filtering and search
- Budget tracking and alerts
- Receipt image storage and OCR

---

## Tech Stack

### Backend Framework & ORM
- **FastAPI** - Modern, fast (high-performance) Python web framework for building APIs
- **SQLAlchemy** - SQL database toolkit and Object-Relational Mapping (ORM)
- **Pydantic** - Data validation and settings management using Python type annotations
- **Pydantic Settings** - Configuration management from environment variables

### Database
- **PostgreSQL** - Robust relational database system
- **Alembic** - Database migration tool for SQLAlchemy

### Authentication & Security
- **python-jose** - JWT token generation and validation
- **passlib** - Password hashing library
- **bcrypt** - Secure password hashing algorithm
- **cryptography** - Cryptographic recipes and primitives

### Utilities
- **uvicorn** - ASGI web server for running FastAPI
- **python-dotenv** - Environment variable management
- **email-validator** - Email validation
- **PyYAML** - YAML parser and emitter

### Development & DevOps
- **watchfiles** - Auto-reload on file changes
- **httptools** - HTTP request/response parser

---

## Project Structure

```
finance-tracker-api/
├── alembic/                      # Database migration files
│   ├── versions/                 # Migration version scripts
│   │   ├── 02a2ab2c1440_create_users_table.py
│   │   ├── 70394632a3e7_add_accounts_table.py
│   │   └── 8606ec7c191e_create_users_table.py
│   ├── env.py                    # Alembic environment configuration
│   ├── script.py.mako            # Migration template
│   └── README
├── app/                          # Main application package
│   ├── main.py                   # FastAPI app initialization
│   ├── __init__.py
│   ├── ai/                       # AI/ML features (future)
│   ├── api/                      # API routes and dependencies
│   │   ├── v1/                   # API v1 endpoints
│   │   │   ├── router.py         # Main API router
│   │   │   └── endpoints/        # Endpoint modules
│   │   │       ├── system.py     # System endpoints (health, info)
│   │   │       └── users.py      # User endpoints (register, login, profile)
│   │   └── dependencies.py       # FastAPI dependencies (get_current_user, etc.)
│   ├── core/                     # Core configuration and utilities
│   │   ├── config.py             # Settings and environment variables
│   │   ├── jwt.py                # JWT token generation/validation
│   │   ├── security.py           # Password hashing/verification
│   │   └── __init__.py
│   ├── crud/                     # CRUD operations
│   │   ├── user.py               # User database operations
│   │   └── __init__.py
│   ├── db/                       # Database configuration
│   │   ├── base.py               # Declarative base for models
│   │   ├── session.py            # Database session management
│   │   ├── models/               # SQLAlchemy ORM models
│   │   │   ├── user.py           # User model
│   │   │   ├── account.py        # Account model
│   │   │   ├── transaction.py    # Transaction model
│   │   │   └── __init__.py
│   │   └── __init__.py
│   └── schemas/                  # Pydantic request/response schemas
│       ├── user.py               # User request/response models
│       ├── account.py            # Account schemas
│       └── __init__.py
├── alembic.ini                   # Alembic configuration file
├── requirements.txt              # Python dependencies
└── notes.txt                     # Development notes
```

### Directory Explanations

| Directory | Purpose |
|-----------|---------|
| `alembic/` | Version control for database schema changes |
| `app/api/` | REST API route definitions and endpoint handlers |
| `app/core/` | Configuration, JWT, and security utilities |
| `app/crud/` | Create, Read, Update, Delete operations for models |
| `app/db/` | Database connection, session management, ORM models |
| `app/schemas/` | Request/response validation and serialization schemas |

---

## Getting Started

### Prerequisites
- Python 3.12 or higher
- PostgreSQL 12+ (or higher)
- pip or another Python package manager
- Git

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Finance Project/finance-tracker-api"
```

#### 2. Create and Activate Virtual Environment

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python -m venv venv
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### 4. Set Up PostgreSQL Database

Ensure PostgreSQL is installed and running, then create a database:

```sql
CREATE DATABASE finance_tracker;
```

(Optional) Create a dedicated user:
```sql
CREATE USER finance_user WITH PASSWORD 'your_secure_password';
ALTER ROLE finance_user SET client_encoding TO 'utf8';
ALTER ROLE finance_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE finance_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE finance_tracker TO finance_user;
```

#### 5. Configure Environment Variables

Create a `.env` file in the `finance-tracker-api/` directory:

```env
# App Configuration
APP_NAME=Finance Tracker API
VERSION=1.0.0
DEBUG=True

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/finance_tracker

# JWT & Security
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

> ⚠️ **Security Warning:** Never commit the `.env` file to version control. Always use a `.gitignore` entry.

#### 6. Run Database Migrations

```bash
alembic upgrade head
```

To create a new migration after model changes:

```bash
alembic revision --autogenerate -m "Description of changes"
alembic upgrade head
```

#### 7. Start the Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

---

## API Documentation

### Interactive Documentation

Once the server is running, access:

- **Swagger UI (Recommended)**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### API Endpoints

#### System Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/api/v1/info` | Get application info and settings | ❌ |
| `GET` | `/api/v1/health` | Health check endpoint | ❌ |

#### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `POST` | `/api/v1/users/register` | Register new user | ❌ |
| `POST` | `/api/v1/users/login` | Login and receive JWT token | ❌ |
| `GET` | `/api/v1/users/me` | Get current user profile | ✅ |

### Request/Response Examples

#### User Registration

**Request:**
```bash
curl -X POST "http://localhost:8000/api/v1/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

**Response (201 Created):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "is_active": true,
    "created_at": "2026-02-18T10:30:00Z"
  },
  "token": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer"
  }
}
```

#### User Login

**Request:**
```bash
curl -X POST "http://localhost:8000/api/v1/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### Get Current User

**Request:**
```bash
curl -X GET "http://localhost:8000/api/v1/users/me" \
  -H "Authorization: Bearer {access_token}"
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "is_active": true,
  "created_at": "2026-02-18T10:30:00Z"
}
```

---

## Database Schema

### User Table
Stores user account information and authentication credentials.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

**Relationships:**
- One-to-One with Account (user owns one account)
- One-to-Many with Transaction (user has multiple transactions)

### Account Table
Stores account information linked to each user.

```sql
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
```

### Transaction Table
Stores individual financial transactions.

```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount FLOAT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

**Planned Enhancements:**
- Description/note field
- Category field
- Transaction type (income/expense)
- Multiple tags support

---

## Authentication & Security

### JWT Token System

The API uses **JSON Web Tokens (JWT)** for stateless authentication:

1. **Registration**: User registers with email/password → Account created → JWT token issued
2. **Token Storage**: Client stores token securely (localStorage, secure cookie)
3. **Authenticated Requests**: Client sends token in `Authorization: Bearer <token>` header
4. **Token Validation**: Server validates token signature without storing session state
5. **Logout**: Client-side token deletion (no server revocation list needed)

**Benefits:**
- ✅ Stateless: No session data stored on server
- ✅ Portable: Works across multiple services/domains
- ✅ Scalable: No database lookups for authentication
- ✅ Secure: Cryptographically signed and tamper-proof

### Security Features

- **Password Hashing**: bcrypt with salt for secure password storage
- **JWT Signing**: HS256 algorithm with SECRET_KEY
- **Token Expiration**: Configurable token lifetime (default: 60 minutes)
- **Email Validation**: Built-in email format validation via Pydantic
- **Database Security**: Foreign key constraints, cascading deletes (prevents orphaned records)

### Security Best Practices

1. **Environment Variables**: Never hardcode secrets in source code
2. **HTTPS**: Always use HTTPS in production
3. **SECRET_KEY**: Use a strong, unique secret key (at least 32 characters)
4. **Token Storage**: Store tokens securely on clients (avoid localStorage if possible)
5. **Validation**: All inputs validated via Pydantic schemas
6. **Dependency Injection**: FastAPI dependencies ensure protected endpoints

---

## Environment Configuration

### Configuration File (`.env`)

The application uses Pydantic Settings to manage configuration from `.env` file:

```python
class Settings(BaseSettings):
    APP_NAME: str
    VERSION: str
    DATABASE_URL: str
    SECRET_KEY: str
    DEBUG: bool
```

### Common Environment Variables

| Variable | Default | Purpose | Example |
|----------|---------|---------|---------|
| `APP_NAME` | `` | Application display name | `Finance Tracker API` |
| `VERSION` | `` | API version | `1.0.0` |
| `DATABASE_URL` | `` | PostgreSQL connection string | `postgresql://user:pass@localhost/finance_tracker` |
| `SECRET_KEY` | `` | JWT signing key | `your-secret-key-here` |
| `DEBUG` | `False` | Development mode flag | `True` or `False` |
| `ALGORITHM` | `HS256` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60` | Token lifetime | `60` |

### Development vs. Production

**Development (.env):**
```env
DEBUG=True
SECRET_KEY=dev-secret-key-not-for-production
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

**Production (.env or environment variables):**
```env
DEBUG=False
SECRET_KEY=<generated-secure-key>
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## Development Workflow

### Running the Application

**Development mode with auto-reload:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Production mode:**
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Database Migrations

**View migration status:**
```bash
alembic current
```

**Create new migration:**
```bash
alembic revision --autogenerate -m "Add new_field to table"
```

**Apply migration:**
```bash
alembic upgrade head
```

**Rollback migration:**
```bash
alembic downgrade -1
```

### Code Organization Principles

- **Separation of Concerns**: API routes, business logic, database operations separated
- **DRY (Don't Repeat Yourself)**: Reusable schemas, dependencies, and CRUD functions
- **Type Safety**: Full type hints for better IDE support and runtime validation
- **Dependency Injection**: FastAPI's dependency system for clean, testable code

### Adding New Features

1. **Create Model** in `app/db/models/`
2. **Create Schema** in `app/schemas/` for request/response validation
3. **Create CRUD** operations in `app/crud/`
4. **Create Endpoint** in `app/api/v1/endpoints/`
5. **Create Migration** with Alembic

Example structure for a new feature:
```
app/
├── api/v1/endpoints/transactions.py  # Route handlers
├── crud/transactions.py               # Database operations
├── db/models/transaction.py           # ORM model
└── schemas/transaction.py             # Request/response models
```

---

## Future Enhancements

### Phase 2 (Short-term)
- [ ] Transaction management (create, read, update, delete)
- [ ] Account balance tracking
- [ ] Transaction categories
- [ ] Monthly/yearly summaries
- [ ] Spending analytics endpoints
- [ ] User profile update endpoint

### Phase 3 (Medium-term)
- [ ] CSV/XLSX file upload for bulk imports
- [ ] AI-powered expense categorization
- [ ] Budget management and alerts
- [ ] Receipt image storage and OCR
- [ ] Multi-currency support
- [ ] Data export (PDF, CSV)

### Phase 4 (Long-term)
- [ ] React/TypeScript frontend
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and machine learning
- [ ] Collaborative budgeting
- [ ] Bill reminders and recurring transactions
- [ ] Integration with banking APIs

### Infrastructure
- [ ] Unit and integration tests (pytest)
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Docker Compose for local development
- [ ] Logging and monitoring
- [ ] API rate limiting

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make your changes**: Ensure code follows the project structure
3. **Test your changes**: Test endpoints manually or write unit tests
4. **Commit with clear messages**: `git commit -m "Add feature: description"`
5. **Push to branch**: `git push origin feature/your-feature-name`
6. **Create a Pull Request**: Provide clear description of changes

### Code Style
- Use type hints for all functions
- Follow PEP 8 naming conventions
- Keep functions focused and single-responsibility
- Add docstrings for public functions

---

## License

This project is part of a personal development portfolio. All rights reserved.

---

## Contact & Support

For questions or issues:
- Check the [notes.txt](notes.txt) for development insights
- Review API documentation at `/docs` (Swagger UI)
- Examine existing code in `app/` directory for patterns

**Last Updated:** February 18, 2026  
**Maintained by:** Luca
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


