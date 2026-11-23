/**
 * Générateur de Rapport Officiel d'Autodiagnostic SEnergyS Africa (SESA)
 * Permet l'impression et l'export PDF haute fidélité pour l'administration.
 */

export function generateDiagnosticReportHTML(diag) {
  if (!diag) return '';

  const contact = diag.contact || {};
  const general = diag.generalInfo || {};
  const scores = diag.scores || {};
  const priorites = scores.priorites || [];

  const createdDate = diag.created_at ? new Date(diag.created_at) : new Date();
  const formattedDate = createdDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = createdDate.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const entreprise = general.nomEntreprise || contact.nomEntreprise || 'Entreprise non précisée';
  const cleanRefSlug = entreprise.slice(0, 4).toUpperCase().replace(/[^A-Z0-9]/g, '') || 'SESA';
  const refCode = `SESA-DIAG-${createdDate.getFullYear()}-${cleanRefSlug}-${(diag.id || '').slice(-4).toUpperCase() || 'REF'}`;

  const scoreGlobal = scores.globalScore !== undefined ? scores.globalScore : 0;
  const niveauGlobal = scores.niveau || (
    scoreGlobal >= 75 ? 'Performance Optimale' :
    scoreGlobal >= 55 ? 'Maturité Avancée' :
    scoreGlobal >= 35 ? 'En cours de structuration' : 'Amélioration Prioritaire'
  );

  const statusLabel =
    diag.status === 'appointment' ? 'Rendez-vous fixé' :
    diag.status === 'contacted' ? 'Contacté' :
    diag.status === 'archived' ? 'Dossier archivé' : 'Nouveau lead à qualifier';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Rapport d'Autodiagnostic - ${entreprise} - ${refCode}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 14mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      font-size: 13px;
      line-height: 1.5;
    }
    .page-container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      padding: 32px 36px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }

    /* Action bar non-imprimable */
    .no-print-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0b1522;
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 8px;
      max-width: 860px;
      margin: 0 auto 20px auto;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    }
    .no-print-bar button {
      cursor: pointer;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      padding: 9px 18px;
      transition: all 0.2s;
    }
    .btn-print {
      background: #F47721;
      color: #ffffff;
    }
    .btn-print:hover {
      background: #e86610;
    }
    .btn-close {
      background: rgba(255,255,255,0.15);
      color: #ffffff;
      margin-left: 8px;
    }

    /* En-tête du rapport */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #F47721;
      padding-bottom: 18px;
      margin-bottom: 22px;
    }
    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .brand-logo {
      width: 58px;
      height: 58px;
      object-fit: contain;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      color: #0b1522;
      letter-spacing: -0.5px;
      margin: 0;
    }
    .brand-tagline {
      font-size: 11.5px;
      color: #64748b;
      margin-top: 2px;
      font-weight: 500;
    }
    .meta-wrap {
      text-align: right;
    }
    .doc-badge {
      display: inline-block;
      background: rgba(244, 119, 33, 0.12);
      color: #d95f0e;
      font-weight: 700;
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 4px 10px;
      border-radius: 4px;
      margin-bottom: 6px;
      border: 1px solid rgba(244, 119, 33, 0.3);
    }
    .doc-ref {
      font-size: 12px;
      font-weight: 700;
      color: #0b1522;
    }
    .doc-date {
      font-size: 11px;
      color: #64748b;
      margin-top: 2px;
    }

    /* Sections */
    .section-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #0b1522;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-left: 4px solid #F47721;
      padding-left: 10px;
      margin: 22px 0 12px 0;
    }

    /* Grilles et Tableaux d'informations */
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 14px 18px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #edf2f7;
      padding: 5px 0;
      font-size: 12.5px;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      color: #64748b;
      font-weight: 500;
    }
    .info-val {
      color: #0f172a;
      font-weight: 600;
      text-align: right;
    }

    /* Bloc Score et Maturité */
    .score-hero {
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #0b1522 0%, #152840 100%);
      color: #ffffff;
      border-radius: 8px;
      padding: 18px 24px;
      margin: 16px 0;
      gap: 24px;
    }
    .score-circle {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      background: #F47721;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(244, 119, 33, 0.4);
      flex-shrink: 0;
    }
    .score-circle-num {
      font-size: 28px;
      font-weight: 800;
      line-height: 1;
    }
    .score-circle-denom {
      font-size: 11px;
      opacity: 0.85;
      font-weight: 600;
    }
    .score-hero-details {
      flex: 1;
    }
    .score-level-name {
      font-size: 17px;
      font-weight: 700;
      color: #F47721;
      margin-bottom: 4px;
    }
    .score-level-desc {
      font-size: 12px;
      color: #cbd5e1;
      line-height: 1.45;
    }

    /* Tableau des priorités */
    .priorities-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 12px;
    }
    .priorities-table th {
      background: #0b1522;
      color: #ffffff;
      padding: 8px 12px;
      text-align: left;
      font-weight: 600;
      font-size: 11.5px;
    }
    .priorities-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
    }
    .priorities-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .priority-pill {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 10.5px;
      font-weight: 700;
      background: rgba(244, 119, 33, 0.15);
      color: #d95f0e;
    }

    /* Bloc Message */
    .message-box {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 12px 16px;
      border-radius: 4px;
      font-style: italic;
      color: #92400e;
      font-size: 12px;
      margin-top: 10px;
    }

    /* Footer & Mentions */
    .footer {
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 10.5px;
      color: #64748b;
    }
    .footer-left {
      max-width: 60%;
      line-height: 1.4;
    }
    .footer-right {
      text-align: right;
      font-weight: 600;
      color: #0b1522;
    }

    /* Print media overrides */
    @media print {
      body {
        background: #ffffff;
        padding: 0;
      }
      .page-container {
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      .no-print-bar {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <strong style="color: #F47721;">SEnergyS Africa</strong> — Aperçu du rapport de diagnostic pour <strong>${entreprise}</strong>
    </div>
    <div>
      <button class="btn-print" onclick="window.print()">🖨️ Imprimer / Enregistrer en PDF</button>
      <button class="btn-close" onclick="window.close()">✕ Fermer</button>
    </div>
  </div>

  <div class="page-container">
    <!-- Header -->
    <div class="header">
      <div class="brand-wrap">
        <img src="/assets/logo/logo-officiel.png" alt="SEnergyS Africa" class="brand-logo" onerror="this.style.display='none'" />
        <div>
          <h1 class="brand-title">SEnergyS Africa</h1>
          <div class="brand-tagline">Cabinet d'Ingénierie & Conseil en Transition Énergétique et Durable</div>
        </div>
      </div>
      <div class="meta-wrap">
        <div class="doc-badge">Rapport Officiel d'Évaluation</div>
        <div class="doc-ref">Réf : ${refCode}</div>
        <div class="doc-date">Émis le ${formattedDate} à ${formattedTime}</div>
      </div>
    </div>

    <!-- 1. Identification de l'Organisation & Contexte -->
    <div class="section-title">1. Identification de l'Organisation & Contexte Opérationnel</div>
    <div class="info-grid">
      <div>
        <div class="info-row">
          <span class="info-label">Raison Sociale :</span>
          <span class="info-val">${entreprise}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Secteur d'Activité :</span>
          <span class="info-val">${general.secteurActivite || 'Non renseigné'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Localisation :</span>
          <span class="info-val">${[general.region, general.pays].filter(Boolean).join(', ') || 'Sénégal / UEMOA'}</span>
        </div>
      </div>
      <div>
        <div class="info-row">
          <span class="info-label">Facture Énergétique Annuelle :</span>
          <span class="info-val" style="color: #F47721;">${general.factureAnnuelle || 'Non renseignée'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Statut du Dossier SESA :</span>
          <span class="info-val">${statusLabel}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Numéro Dossier :</span>
          <span class="info-val">${diag.id || 'N/A'}</span>
        </div>
      </div>
    </div>

    <!-- 2. Coordonnées du Déclarant / Contact Référent -->
    <div class="section-title">2. Coordonnées du Contact Référent</div>
    <div class="info-grid">
      <div>
        <div class="info-row">
          <span class="info-label">Nom et Prénom :</span>
          <span class="info-val">${contact.nom || 'Non renseigné'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Fonction exercée :</span>
          <span class="info-val">${contact.fonction || 'Non renseignée'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email Professionnel :</span>
          <span class="info-val">${contact.email || '—'}</span>
        </div>
      </div>
      <div>
        <div class="info-row">
          <span class="info-label">Téléphone / WhatsApp :</span>
          <span class="info-val">${contact.telephone || '—'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Souhait de recontact :</span>
          <span class="info-val" style="color: #F47721;">${contact.recontact === 'Oui' ? 'Oui, échange expert souhaité' : 'Non, sauvegarde uniquement'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Thème prioritaire :</span>
          <span class="info-val">${contact.theme || 'Efficacité Globale'}</span>
        </div>
      </div>
    </div>

    <!-- 3. Synthèse de l'Évaluation Énergétique -->
    <div class="section-title">3. Synthèse de Maturité & Performance Énergétique</div>
    <div class="score-hero">
      <div class="score-circle">
        <span class="score-circle-num">${scoreGlobal}</span>
        <span class="score-circle-denom">/ 100</span>
      </div>
      <div class="score-hero-details">
        <div class="score-level-name">${niveauGlobal}</div>
        <div class="score-level-desc">
          Évaluation calculée selon les référentiels d'efficacité énergétique industrielle (norme ISO 50001) et les facteurs d'émission carbone standards régionaux.
          Ce score synthétise le niveau de maîtrise des flux, la gouvernance de l'énergie et le potentiel de réduction des consommations.
        </div>
      </div>
    </div>

    <!-- 4. Pôles d'Intervention Prioritaires & Recommandations -->
    <div class="section-title">4. Chantiers Prioritaires Identifiés & Préconisations SESA</div>
    ${priorites.length > 0 ? `
      <table class="priorities-table">
        <thead>
          <tr>
            <th style="width: 8%;">N°</th>
            <th style="width: 32%;">Axe d'Intervention</th>
            <th style="width: 15%; text-align: center;">Maturité</th>
            <th style="width: 45%;">Recommandation Technique SESA</th>
          </tr>
        </thead>
        <tbody>
          ${priorites.map((p, idx) => `
            <tr>
              <td><span class="priority-pill">#${idx + 1}</span></td>
              <td><strong>${p.title}</strong></td>
              <td style="text-align: center;"><strong>${p.scorePct !== undefined ? p.scorePct + '%' : '—'}</strong></td>
              <td>${p.recommendation || 'Audit approfondi recommandé par l’équipe technique SESA.'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : `
      <div class="info-grid">
        <div style="grid-column: 1 / -1; color: #64748b; font-size: 12.5px;">
          Les axes d'audit standard recommandés pour ce profil incluent :<br>
          • <strong>Audit énergétique instrumenté & ISO 50001</strong> (groupes froids, chaudières, moteurs, air comprimé).<br>
          • <strong>Étude de solarisation sur toiture ou au sol</strong> (autoconsommation industrielle avec stockage optionnel).<br>
          • <strong>Bilan d'Émissions de Gaz à Effet de Serre (BEGES Scopes 1 & 2)</strong> & stratégie de décarbonation.
        </div>
      </div>
    `}

    <!-- 5. Commentaire ou Besoin Exprimé -->
    ${contact.commentaire ? `
      <div class="section-title">5. Remarques ou Besoins Spécifiques Exprimés</div>
      <div class="message-box">
        "${contact.commentaire}"
      </div>
    ` : ''}

    <!-- Footer -->
    <div class="footer">
      <div class="footer-left">
        <strong>Cadre de validité :</strong> Ce document constitue une synthèse préliminaire d'aide à la décision basée sur les éléments déclaratifs fournis. Il sert de base de calibrage pour la réalisation d'un audit énergétique approfondi, d'une étude de faisabilité solaire ou d'un accompagnement ISO 50001.<br>
        <strong>SEnergyS Africa SARL</strong> • Bâtiment APROSI, Diamniadio, Dakar, Sénégal • NINEA : En cours d'immatriculation UEMOA
      </div>
      <div class="footer-right">
        Direction Technique SESA<br>
        contact@senergysafrica.com<br>
        www.senergysafrica.com
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Déclenche l'impression / sauvegarde PDF du rapport officiel dans une nouvelle fenêtre.
 */
export function printDiagnosticReport(diag) {
  if (!diag) return;
  const html = generateDiagnosticReportHTML(diag);
  const printWindow = window.open('', '_blank', 'width=950,height=1000,menubar=no,toolbar=no,location=no,status=no');

  if (!printWindow) {
    alert("Veuillez autoriser l'ouverture des fenêtres pop-up dans votre navigateur pour afficher et télécharger le rapport PDF.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  // Déclencher le dialogue d'impression une fois le contenu chargé
  printWindow.onload = () => {
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };
}

/**
 * Télécharge le rapport au format fichier HTML autonome pour archivage direct.
 */
export function downloadDiagnosticHTML(diag) {
  if (!diag) return;
  const html = generateDiagnosticReportHTML(diag);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const entreprise = (diag.generalInfo?.nomEntreprise || 'diagnostic').replace(/[^a-zA-Z0-9]/g, '_');
  link.href = url;
  link.download = `Rapport_Autodiagnostic_SESA_${entreprise}_${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
