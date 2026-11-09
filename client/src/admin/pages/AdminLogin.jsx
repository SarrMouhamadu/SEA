import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import '../admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez renseigner votre email et mot de passe.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message || 'Identifiants invalides');
    }
  };

  const fillDemo = () => {
    setEmail('admin@senergysafrica.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo">
            <Shield size={28} />
          </div>
          <h1 className="admin-login-title">SEnergyS Africa</h1>
          <p className="admin-login-sub">Espace d'Administration & Back-Office</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#FCA5A5',
            padding: '12px 14px',
            borderRadius: 8,
            marginBottom: 20,
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Adresse email administrateur</label>
            <div className="admin-input-wrap">
              <Mail className="admin-input-icon" size={17} />
              <input
                type="email"
                className="admin-form-input"
                placeholder="ex: admin@senergysafrica.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Mot de passe</label>
            <div className="admin-input-wrap">
              <Lock className="admin-input-icon" size={17} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="admin-form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--admin-text-subtle)',
                  cursor: 'pointer',
                  padding: 4
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: '100%', padding: '14px', marginTop: 10 }}
            disabled={loading}
          >
            {loading ? (
              <div className="admin-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
            ) : (
              <>
                <span>Se connecter au tableau de bord</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="admin-demo-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <b style={{ color: 'var(--admin-primary)', fontSize: 12 }}>Identifiants par défaut :</b>
            <button
              type="button"
              onClick={fillDemo}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--admin-primary)',
                fontWeight: 600,
                fontSize: 12,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Remplir automatiquement
            </button>
          </div>
          <div>Email : <code style={{ color: '#fff' }}>admin@senergysafrica.com</code></div>
          <div>Mot de passe : <code style={{ color: '#fff' }}>admin123</code></div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <a
            href="/"
            style={{ color: 'var(--admin-text-subtle)', fontSize: 13, textDecoration: 'none' }}
          >
            ← Revenir au site public SEnergyS Africa
          </a>
        </div>
      </div>
    </div>
  );
}
