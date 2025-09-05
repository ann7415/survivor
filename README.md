# JEB Incubator Platform

## 📋 Description

A web platform to showcase and manage emerging projects from a startup incubator. The platform provides three distinct areas:

**⭢ Public Area**: Startup catalog, news, events, and advanced search

**⭢ Admin Area**: Project management, user management, statistics, and synchronization with the JEB API

**⭢ Startup Area**: Project profile, internal messaging, and opportunity tracking

The application retrieves data from the existing JEB API and allows full CRUD management of information in the new system.

---

## 🛠 Technologies Used

### Backend
- **.NET Core 9.0** - REST API
- **Entity Framework Core** - ORM with SQLite
- **JWT Authentication** - Endpoint security
- **Swagger** - Automatic API documentation

### Frontend
- **Angular 17+** - SPA web application
- **Bootstrap 5** - Responsive CSS framework
- **Typescript** - Reactive programming

### Database
- **SQLite** - Local database (`jeb-incubator.db` file)

---

## ⚙️ Installation

### Prerequisites

#### Windows
```bash
# .NET 9 SDK
winget install Microsoft.DotNet.SDK.9

# Node.js 18+
winget install OpenJS.NodeJS

# Angular CLI
npm install -g @angular/cli@17
```

#### macOS
```bash
# .NET 9 SDK
brew install dotnet@9

# Node.js 18+
brew install node

# Angular CLI
npm install -g @angular/cli@17
```

#### Linux (Ubuntu/Debian)
```bash
# .NET 9 SDK
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update && sudo apt-get install -y dotnet-sdk-9.0

# Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Angular CLI
npm install -g @angular/cli@17
```

### Verify Installations
```bash
dotnet --version    # Should display 9.x.x
node --version      # Should display v18.x.x or higher
ng version          # Should display Angular CLI 17.x.x
```

---

## 📡 Project Setup

### 1. Clone Repository
```bash
git clone [REPO_URL] JebIncubator
cd JebIncubator
```

### 2. Setup Backend
```bash
cd JebIncubator.Api

# Restore NuGet packages
dotnet restore

# Create/Update the database
dotnet ef database update

# Run backend API
dotnet run
```

### 3. Setup Frontend
```bash
# In a new terminal
cd jeb-incubator-frontend

# Install npm dependencies
npm install

# Run frontend
ng serve
```

---

## 🌐 Launch

### Full Startup

1. **Backend API**:
```bash
cd JebIncubator.Api
dotnet run --urls "http://localhost:5000"
```
➡️ **API available at:** http://localhost:5000
➡️ **Swagger docs:** http://localhost:5000/swagger

2. **Angular Frontend**:
```bash
cd jeb-incubator-frontend
ng serve
```
➡️ **Web app:** http://localhost:4200

### Test Accounts
- **Test User**: Create via signup form

---

## 💾 Database

### Location
```
JebIncubator.Api/jeb-incubator.db
```

### Reset Database

#### Option 1: Full Deletion
```bash
cd JebIncubator.Api
rm jeb-incubator.db
dotnet ef database update
```

#### Option 2: Reset with New Migrations
```bash
cd JebIncubator.Api
rm -rf Migrations/
rm jeb-incubator.db
dotnet ef migrations add InitialCreate
dotnet ef database update
```

#### Option 3: Keep Structure, Clear Data
```bash
cd JebIncubator.Api
sqlite3 jeb-incubator.db

# In SQLite CLI
DELETE FROM Users WHERE Email != 'admin@jeb.com';
DELETE FROM Startups;
DELETE FROM News;
DELETE FROM Events;

.quit
```

### Inspect Database
```bash
sqlite3 jeb-incubator.db
.tables
.schema Users
SELECT * FROM Startups;
.quit
```

### GUI Tools for SQLite
- [DB Browser for SQLite](https://sqlitebrowser.org)
- **VS Code extension**: SQLite Viewer
- [Beekeeper Studio](https://www.beekeeperstudio.io)

---

## 🔗 JEB API Integration

### Token Setup
The JEB API base URL and group token are now configured via environment variables instead of appsettings.json.

Set the following variables before running the backend:

For Windows PowerShell, use:
```json
$env:JEB_BASE_URL="https://api.jeb-incubator.com"
$env:JEB_GROUP_TOKEN="YOUR-TOKEN-HERE"
```
For Linux/macOS, use:
```json
export JEB_BASE_URL="https://api.jeb-incubator.com"
export JEB_GROUP_TOKEN="YOUR-TOKEN-HERE"
```
The backend reads these variables automatically at runtime.

### Data Synchronization
Once logged in as Admin:
- **Swagger**: `POST /api/sync/startups`
- **Frontend**: Admin interface → "Synchronize" button

---

## 📁 Project Structure

```
JebIncubator/
├── JebIncubator.Api/              # Backend .NET Core
│   ├── Controllers/               # API Endpoints
│   ├── Models/                    # Entities and DTOs
│   ├── Services/                  # Business logic
│   ├── Data/                      # DbContext
│   ├── jeb-incubator.db           # SQLite Database
│   └── appsettings.json           # Config
├── jeb-incubator-frontend/        # Angular Frontend
│   ├── src/app/                   # Angular Code
│   ├── src/environments/          # Env Config
│   └── package.json               # npm Dependencies
└── README.md
```

---

## 🧪 Testing & Development

### Test Backend API
1. Run `dotnet run` inside `JebIncubator.Api/`
2. Open http://localhost:5000/swagger
3. Test endpoints with Swagger UI

### Develop Frontend
1. Backend must always be running
2. Frontend in dev mode: `ng serve`
3. Auto hot reload on changes

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Backend
dotnet run --urls "http://localhost:5001"

# Frontend
ng serve --port 4201
```

#### CORS Errors
Check that backend allows requests from `http://localhost:4200`

#### Corrupted Database
```bash
rm jeb-incubator.db
dotnet ef database update
```

#### Migration Issues
```bash
rm -rf Migrations/
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## 📚 API Documentation

### Main Endpoints

#### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

#### Startups
- `GET /api/startups` - List startups
- `GET /api/startups/{id}` - Startup details
- `POST /api/startups` - Create startup (Admin)
- `PUT /api/startups/{id}` - Update startup (Admin/Startup)
- `DELETE /api/startups/{id}` - Delete startup (Admin)

#### Synchronization (Admin Only)
- `POST /api/sync/startups` - Sync startups from JEB API
- `POST /api/sync/news` - Sync news from JEB API
- `POST /api/sync/events` - Sync events from JEB API
- `GET /api/sync/status` - Sync status

**Full docs available at:** http://localhost:5000/swagger

---

## 👥 Our Team

Meet the team that makes the JEB Incubator Platform possible.

- **Anna Poghosyan** – Team Lead, Backend & API Integration
- **Robin Schuffenecker** – Frontend Developer
- **Romain Berard** – Frontend Developer
- **Konogan Pineau** – UI/UX Developer

Each member is available via the contact form or directly on the internal project Slack for technical questions or user feedback.
