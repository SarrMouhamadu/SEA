import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { pagesData } from '../data/pagesData';
import AutoDiagnosticModal from '../components/AutoDiagnosticModal';
import ContactForm from '../components/ContactForm';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  ChevronRight, 
  HelpCircle,
  Phone,
  Mail,
  Award
} from 'lucide-react';

export default function SubPage({ categoryProp, slugProp }) {
  const params = useParams();
  const category = categoryProp || params.category;
  const slug = slugProp || params.slug;

  const [diagModalOpen, setDiagModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const page = pagesData[category]?.[slug];

  if (!page) {
    return (
      <div className="section container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--theme-text)' }}>Page en cours de finalisation</h1>
        <p style={{ color: 'var(--theme-text-muted)', marginBottom: '24px' }}>
          Le contenu de cette page est en cours de publication par nos équipes.
        </p>
        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="subpage-wrapper">
      
      {/* 1. HERO & FIL D'ARIANE */}
      <section className="subpage-hero" style={{
        background: 'var(--theme-surface-alt)',
        borderBottom: '1px solid var(--theme-border)',
        padding: '50px 0 60px'
      }}>
        <div className="container">
          
          {/* Fil d'Ariane (Breadcrumbs) */}
          <nav className="subpage-breadcrumbs" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: 'var(--theme-text-muted)',
            marginBottom: '20px'
          }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link>
            <ChevronRight size={14} />
            <Link to={page.categoryPath} style={{ color: 'inherit', textDecoration: 'none' }}>{page.category}</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-orange)', fontWeight: 600 }}>{page.title}</span>
          </nav>

          <div style={{ maxWidth: '860px' }}>
            <span className="badge" style={{ marginBottom: '16px', display: 'inline-block' }}>
              {page.badge}
            </span>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: 'var(--theme-text)',
              marginBottom: '16px',
              lineHeight: 1.2
            }}>
              {page.title}
            </h1>
            <p style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: 'var(--color-orange)',
              marginBottom: '20px',
              lineHeight: 1.45
            }}>
              {page.subtitle}
            </p>
            <p style={{
              fontSize: '16px',
              color: 'var(--theme-text-muted)',
              lineHeight: 1.7,
              marginBottom: '32px',
              whiteSpace: 'pre-line'
            }}>
              {page.intro}
            </p>

            {/* Boutons d'Action Rapides */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setDiagModalOpen(true)}
                className="btn-pill btn-pill-outline-gold"
                style={{ padding: '12px 22px' }}
              >
                <Sparkles size={16} /> Autodiagnostic gratuit
              </button>
              <button 
                onClick={() => setContactModalOpen(true)}
                className="btn-pill btn-pill-orange"
                style={{ padding: '12px 22px' }}
              >
                Nous contacter <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. BARRE D'INDICATEURS CLÉS (KPIS) */}
      {page.kpis && page.kpis.length > 0 && (
        <section style={{
          background: 'var(--theme-surface)',
          padding: '36px 0',
          borderBottom: '1px solid var(--theme-border)'
        }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
              gap: '20px'
            }}>
              {page.kpis.map((kpi, idx) => (
                <div key={idx} className="card" style={{
                  padding: '20px',
                  background: 'var(--theme-surface-alt)',
                  border: '1px solid var(--theme-border)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '1.7rem',
                    fontWeight: 800,
                    color: 'var(--color-orange)',
                    marginBottom: '6px'
                  }}>
                    {kpi.value}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--theme-text-muted)',
                    fontWeight: 600
                  }}>
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. CONTENU DÉTAILLÉ & SECTIONS */}
      <section className="section" style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            
            {page.sections && page.sections.map((sec, idx) => (
              <div key={idx} className="card card-interactive" style={{
                padding: '36px',
                marginBottom: '32px',
                background: 'var(--theme-surface)',
                borderColor: 'var(--theme-border)'
              }}>
                <h3 style={{
                  fontSize: '1.45rem',
                  color: 'var(--theme-text)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Award size={22} color="var(--color-orange)" />
                  {sec.title}
                </h3>

                {sec.text && (
                  <p style={{
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: 'var(--theme-text-muted)',
                    marginBottom: sec.points ? '20px' : '0'
                  }}>
                    {sec.text}
                  </p>
                )}

                {sec.points && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {sec.points.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <CheckCircle2 size={18} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '14.5px', color: 'var(--theme-text)', lineHeight: 1.6 }}>
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Bloc d'Appel à l'Action & Contact Direct */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, var(--color-forest) 0%, #061A24 100%)',
              color: 'var(--color-sand)',
              padding: '40px 36px',
              borderRadius: '16px',
              marginTop: '48px',
              border: '1px solid rgba(246, 241, 231, 0.15)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
                <div style={{ maxWidth: '540px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--color-gold)',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    Concrétisons votre projet
                  </span>
                  <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '10px' }}>
                    Besoin d'un accompagnement en {page.title} ?
                  </h3>
                  <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.6 }}>
                    Nos ingénieurs et experts en transition énergétique se tiennent à votre disposition pour analyser vos besoins et structurer votre projet avec engagement contractuel sur les résultats.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button 
                    onClick={() => setContactModalOpen(true)}
                    className="btn-pill btn-pill-orange"
                    style={{ padding: '14px 24px', fontSize: '15px' }}
                  >
                    Demander une étude <ArrowRight size={16} />
                  </button>
                  <a 
                    href="tel:+221772173364" 
                    className="btn-pill btn-pill-outline-gold"
                    style={{ padding: '12px 20px', fontSize: '13.5px', justifyContent: 'center' }}
                  >
                    <Phone size={15} /> +221 77 217 33 64
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modals Autodiagnostic & Contact */}
      <AutoDiagnosticModal isOpen={diagModalOpen} onClose={() => setDiagModalOpen(false)} />

      {contactModalOpen && (
        <div className="diag-modal-backdrop" onClick={() => setContactModalOpen(false)}>
          <div className="diag-modal-box" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="diag-modal-header" style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '24px', color: 'var(--theme-text)' }}>Nous contacter — {page.title}</h3>
              <button className="diag-modal-close" onClick={() => setContactModalOpen(false)}>✕</button>
            </div>
            <ContactForm onSuccess={() => setTimeout(() => setContactModalOpen(false), 2000)} />
          </div>
        </div>
      )}

    </div>
  );
}
