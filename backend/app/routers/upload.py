import shutil, uuid
from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from ..services.analysis_runner import run_analysis

router = APIRouter(prefix="/upload", tags=["Upload"])

@router.post("/")
async def upload_apk(file: UploadFile = File(...), background_tasks: BackgroundTasks = None):
    task_id = str(uuid.uuid4())
    file_path = f"uploads/{task_id}_{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Run analysis in background
    background_tasks.add_task(run_analysis, task_id, file_path)
    
    return {"task_id": task_id, "status": "processing"}
