#  Authentication Task (NestJS + React)

This project is a full-stack authentication system using:
- **Backend:** NestJS (Node.js) with MongoDB
- **Frontend:** React (TypeScript)
- **Database:** MongoDB (Atlas)
- **Containerized:** Docker 
- **CI/CD:** GitHub Actions (automatically builds & pushes to Docker Hub)

---

## **📌 Prerequisites**
- Install **Docker**
- Install **Node.js**

---

## ** Option 1: Run the Project with Docker **
### **1 Start Docker**
docker compose up -d --build

### Backend should run at http://localhost:3000/api/docs

### Frontend should run at http://localhost:5173/


## ** Option 2: Run the Project Manually without docker

### start backend
### cd backend
npm install
npm run start:dev

### Backend should run at http://localhost:3000/api/docs


### start Frontend
cd ../frontend
npm install
npm run dev

### Frontend should run at http://localhost:5173/



### Swagger API Docs: http://localhost:3000/api/docs


