from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import upload, report

app = FastAPI(title="APK Analyzer API")

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # put your frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(upload.router)
app.include_router(report.router)

@app.get("/api/hello")
def home():
    return {"message": "APK Analyzer Backend Running"}
