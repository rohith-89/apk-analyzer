from app.services import static_analysis, dynamic_analysis, osint_analysis
from app.database import reports_db

def run_analysis(task_id: str, apk_path: str):
    # Step 1: Static Analysis
    static_result = static_analysis.analyze(apk_path)
    
    # Step 2: Dynamic Analysis
    dynamic_result = dynamic_analysis.analyze(apk_path)
    
    # Step 3: OSINT Analysis
    osint_result = osint_analysis.analyze(apk_path)
    
    # Save final report
    final_report = {
        "task_id": task_id,
        "status": "completed",
        "static": static_result,
        "dynamic": dynamic_result,
        "osint": osint_result
    }
    reports_db[task_id] = final_report
