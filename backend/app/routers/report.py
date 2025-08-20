from fastapi import APIRouter
from app.database import reports_db

router = APIRouter(prefix="/report", tags=["Report"])

@router.get("/{task_id}")
async def get_report(task_id: str):
    report = reports_db.get(task_id)
    if not report:
        return {"task_id": task_id, "status": "processing"}
    return report
