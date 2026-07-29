# Backend

## Overview

This directory contains the backend part of the scientific conference management system. The backend is implemented with Django and Django REST Framework and provides the API, authentication, administrative operations, and data processing logic required by the application.

The backend is responsible for managing conference-related data such as participants, abstracts, talks, submissions, accommodation, conference information, schedules, and administrative content. It also supports document generation and protected administration workflows.

## Tech Stack

- Django
- Django REST Framework
- Simple JWT
- SQLite
- CORS support for the React frontend

## Project Structure

- `backend/` — Django project configuration.
- `core/` — main application containing models, serializers, views, URLs, tests, and administrative logic.
- `media/` — uploaded media files.
- `db.sqlite3` — local development database.

## Requirements

- Python 3.x
- pip
- Virtual environment recommended

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:

   **Windows**
   ```bash
   venv\Scripts\activate
   ```

   **Linux/macOS**
   ```bash
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create a superuser if needed:
   ```bash
   python manage.py createsuperuser
   ```

## Running the Development Server

Start the backend server with:

```bash
python manage.py runserver
```

By default, the development server runs on `http://127.0.0.1:8000/`.

## Configuration

The project uses SQLite as its development database.  
JWT authentication is configured through Simple JWT.  
CORS is enabled for the frontend running on `http://localhost:3000`.

The backend also serves media files during development.

## API Overview

The backend exposes endpoints for:

- public conference information,
- conference program,
- participants,
- abstracts,
- talks,
- organizers and committees,
- accommodation,
- conference information editing,
- submissions,
- submission publishing,
- schedules,
- hiking routes and stops,
- badge and program PDF generation.

Administrative endpoints are protected and require authentication.

## Authentication

The backend uses JWT authentication.  
Administrative actions require an authenticated user with staff privileges.

## Testing

The backend contains automated tests for core data and API behavior, including:

- participant submission model behavior,
- serializer validation,
- submission creation API,
- submission publishing workflow,
- talk scheduling logic.

Run the test suite with:

```bash
python manage.py test
```
