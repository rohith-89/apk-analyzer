import React, { useState, useCallback, useEffect } from 'react';
import '../styles.css';
import logo from '../assets/rdlogo .jpg'

function APKSecurityAnalyzer() {

    const [dragActive, setDragActive] = useState(false);
    const [analysisState, setAnalysisState] = useState('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [analysisId, setAnalysisId] = useState('');
    const [fileName, setFileName] = useState('');


    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.name.endsWith('.apk')) {
                handleFile(file);
            } else {
                alert('Please select an APK file');
            }
        }
    }, []);

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.name.endsWith('.apk')) {
                handleFile(file);
            } else {
                alert('Please select an APK file');
            }
        }
    };

    const handleFile = (file) => {
        setFileName(file.name);
        setAnalysisState('uploading');
        
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setAnalysisState('uploaded');
                setAnalysisId(`APK_${Date.now().toString(36).toUpperCase()}`);
            }
            setUploadProgress(progress);
        }, 200);
    };

    const startAnalysis = () => {
        setAnalysisState('analyzing');
        
        // Simulate analysis completion
        setTimeout(() => {
            setAnalysisState('completed');
        }, 3000);
    };

    const resetUpload = () => {
        setAnalysisState('idle');
        setUploadProgress(0);
        setAnalysisId('');
        setFileName('');
    };

    const viewResults = () => {
        alert('Analysis Results:\n\n📊 Security Score: 78/100 (Medium Risk)\n🔍 Static Analysis: 85/100\n⚡ Dynamic Analysis: 92/100\n👁️ OSINT Check: 65/100\n🧠 ML Detection: 89/100\n\nThis is a demo - in a real app, this would show detailed security analysis results!');
    };
      const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching:", err));
      console.log("Fetched message:", message);
  }, []);

    return (
        <div className="app-container">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="header-left">
                        <img src={logo} alt="" className='logo' />
                        <div>
                            <h1 className="header-title">CCA/R&D</h1>
                            <p className="header-subtitle">NIT DGP</p>
                        </div>
                    </div>
                    <div className="badge">
                        Advanced APK Security Analysis Platform
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {/* Hero Section */}
                <div className="hero">
                    <div className="hero-icon">🛡️</div>
                    <h1 className="hero-title">🛡️ APK Security Analyzer</h1>
                    <p className="hero-description">
                        Upload your APK file for comprehensive security analysis including static analysis, 
                        dynamic simulation, OSINT reputation checks, and ML-powered threat detection.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">📄</span>
                        <h3 className="feature-title">Static Analysis</h3>
                        <p className="feature-description">Code inspection</p>
                        <p className="feature-description21" >Static analysis inspects an APK file (Android app package) to understand how the app works, what permissions it uses, and whether it has security flaws — all without executing the app on a device or emulator.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">⚡</span>
                        <h3 className="feature-title">Dynamic Simulation</h3>
                        <p className="feature-description">Runtime behavior</p>
                        <p className="feature-description22">Dynamic simulation executes the app in a controlled environment to observe its behavior in real-time, identifying potential security issues that may not be apparent in static analysis.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">👁️</span>
                        <h3 className="feature-title">OSINT Checks</h3>
                        <p className="feature-description">Reputation analysis</p>
                        <p className="feature-description23">OSINT (Open Source Intelligence) checks gather information from publicly available sources to assess the reputation of the app and its developers, identifying potential risks associated with known malicious actors.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🧠</span>
                        <h3 className="feature-title">ML Detection</h3>
                        <p className="feature-description">AI-powered threats</p>
                    </div>
                </div>

                {/* Upload Card */}
                <div className="upload-card">
                    <div className="card-header">
                        <h3 className="card-title">📤 Upload APK File</h3>
                        <p className="card-description">
                            Select your APK file to begin comprehensive security analysis
                        </p>
                    </div>
                    <div className="card-content">
                        {analysisState === 'idle' && (
                            <div>
                                <div
                                    className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('apk-upload').click()}
                                >
                                    <div className="upload-content">
                                        <div className="upload-icon-bg">📤</div>
                                        <div>
                                            <p className="upload-text-primary">📱 Drop your APK file here</p>
                                            <p className="upload-text-secondary">or click to browse files</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept=".apk"
                                            onChange={handleFileInput}
                                            className="hidden"
                                            id="apk-upload"
                                        />
                                        <button className="upload-button">Browse Files</button>
                                    </div>
                                </div>
                                <p className="upload-info">
                                    Maximum file size: 100MB • Only .apk files are supported
                                </p>
                            </div>
                        )}

                        {analysisState === 'uploading' && (
                            <div className="loading-container">
                                <div className="spinner"></div>
                                <p className="upload-text-primary">Uploading...</p>
                                <div className="progress-container">
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill" 
                                            style={{width: `${uploadProgress}%`}}
                                        ></div>
                                    </div>
                                    <p className="progress-text">{Math.round(uploadProgress)}% complete</p>
                                </div>
                            </div>
                        )}

                        {analysisState === 'uploaded' && (
                            <div>
                                <div className="alert alert-success">
                                    <span className="alert-icon">✅</span>
                                    <div>
                                        <strong>✅ Upload successful!</strong>
                                        <br />
                                        Analysis ID: <code>{analysisId}</code>
                                    </div>
                                </div>
                                
                                <div style={{textAlign: 'center'}}>
                                    <button 
                                        onClick={startAnalysis}
                                        className="button button-primary"
                                    >
                                        🚀 Start Security Analysis
                                    </button>
                                </div>
                            </div>
                        )}

                        {analysisState === 'analyzing' && (
                            <div className="analysis-container">
                                <div className="analysis-spinner">
                                    <div className="analysis-spinner-ring"></div>
                                    <div className="analysis-spinner-icon">🛡️</div>
                                </div>
                                <div>
                                    <h3 className="analysis-title">Analyzing APK Security</h3>
                                    <p className="analysis-description">Running comprehensive security checks...</p>
                                </div>
                                <div className="analysis-steps">
                                    <div className="analysis-step completed">
                                        <span>Static Analysis</span>
                                        <span className="step-icon">✅</span>
                                    </div>
                                    <div className="analysis-step active">
                                        <span>Dynamic Simulation</span>
                                        <div className="step-spinner"></div>
                                    </div>
                                    <div className="analysis-step pending">
                                        <span>OSINT Checks</span>
                                        <div className="step-circle"></div>
                                    </div>
                                    <div className="analysis-step pending">
                                        <span>ML Threat Detection</span>
                                        <div className="step-circle"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {analysisState === 'completed' && (
                            <div>
                                <div className="alert alert-info">
                                    <span className="alert-icon">✅</span>
                                    <div>
                                        <strong>Analysis completed!</strong>
                                        <br />
                                        Your APK has been thoroughly analyzed. View the detailed security report below.
                                    </div>
                                </div>
                                
                                <div className="button-group">
                                    <button 
                                        onClick={viewResults}
                                        className="button button-success"
                                    >
                                        📊 View Analysis Results
                                    </button>
                                    <button 
                                        onClick={resetUpload}
                                        className="button button-outline"
                                    >
                                        Upload Another APK
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Feature Cards */}
                <div className="bottom-grid">
                    <div className="bottom-card">
                        <div className="card-header">
                            <h3 className="card-title">🛡️ Security Features</h3>
                        </div>
                        <div className="card-content">
                            <ul className="card-list">
                                <li className="card-list-item">
                                    <span className="list-icon">✅</span>
                                    Malware Detection
                                </li>
                                <li className="card-list-item">
                                    <span className="list-icon">✅</span>
                                    Permission Analysis
                                </li>
                                <li className="card-list-item">
                                    <span className="list-icon">✅</span>
                                    API Security Scan
                                </li>
                                <li className="card-list-item">
                                    <span className="list-icon">✅</span>
                                    Code Obfuscation Check
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bottom-card">
                        <div className="card-header">
                            <h3 className="card-title">💾 Report Formats</h3>
                        </div>
                        <div className="card-content">
                            <ul className="card-list">
                                <li className="card-list-item">
                                    <span className="list-icon">✅</span>
                                    Detailed PDF Report
                                </li>
                                <li className="card-list-item">
                                    <span className="list-icon">✅</span>
                                    JSON Data Export
                                </li>
                                <li className="card-list-item">
                                    <span className="list-icon">✅</span>
                                    CSV Summary
                                </li>
                                <li className="card-list-item">
                                    <span className="list-icon">✅</span>
                                    Interactive Dashboard
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default APKSecurityAnalyzer;