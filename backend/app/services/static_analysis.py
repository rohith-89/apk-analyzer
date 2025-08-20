import zipfile, os

def analyze(apk_path: str):
    result = {"permissions": [], "files": []}
    try:
        with zipfile.ZipFile(apk_path, 'r') as apk:
            result["files"] = apk.namelist()
            # Example: look for AndroidManifest.xml
            if "AndroidManifest.xml" in apk.namelist():
                result["permissions"].append("Manifest Found")
    except Exception as e:
        result["error"] = str(e)
    return result
