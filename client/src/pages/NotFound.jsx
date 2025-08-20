import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import '../styles.css';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">🛡️</div>
            <div>
              <h1 className="header-title">CCA/R&D</h1>
              <p className="header-subtitle">NIT DGP</p>
            </div>
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)'}}>
        <div style={{textAlign: 'center', maxWidth: '24rem', margin: '0 auto', padding: '0 1rem'}}>
          <div className="hero-icon" style={{marginBottom: '2rem'}}>🛡️</div>
          <h1 style={{fontSize: '6rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem'}}>404</h1>
          <h2 style={{fontSize: '2rem', fontWeight: '600', color: '#374151', marginBottom: '1rem'}}>Page Not Found</h2>
          <p style={{fontSize: '1.125rem', color: '#64748b', marginBottom: '2rem'}}>
            The security analysis page you're looking for doesn't exist.
          </p>
          <Link to="/" className="button button-primary">
            <span style={{marginRight: '0.5rem'}}>🏠</span>
            Return to APK Analyzer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;