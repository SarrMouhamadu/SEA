/**
 * autodiagnosticData.js
 * Structure stricte issue des fichiers Excel SEnergyS Africa :
 * - "1. Outil autodiagnostic_SEnergyS Africa.xlsx"
 * - "2. Exemple réponse_Outil autodiagnostic.xlsx"
 */

export const FACTEURS_EMISSION = {
  electricite: 0.6,       // kgCO2e/kWh (Mix Senelec)
  gasoil: 2.68,           // kgCO2e/L (GIEC 2006)
  fuelLourd: 3.1,         // kgCO2e/L (GIEC 2006)
  butaneGPL: 3.0,         // kgCO2e/kg (GIEC 2006)
  gazNaturel: 1.9,        // kgCO2e/Nm3 (GIEC 2006)
  charbon: 2.4,           // kgCO2e/kg (GIEC 2006)
  biomasse: 0.0           // Scope 1 = 0 (CO2 biogénique)
};

export const SECTEURS_ACTIVITE = [
  "Agroalimentaire",
  "Chimie et parachimie",
  "Ciment et matériaux de construction",
  "Mines et carrières",
  "Pétrole et gaz",
  "Textile et cuir",
  "Métallurgie",
  "BTP",
  "Hôtellerie et tourisme",
  "Santé",
  "Commerce et bureaux",
  "Institution financière",
  "Secteur public",
  "Autre"
];

export const TRANCHES_EFFECTIF = [
  "Moins de 10",
  "10 à 49",
  "50 à 249",
  "250 à 999",
  "1 000 et plus"
];

export const TRANCHES_CA = [
  "Moins de 100 M",
  "100 M à 1 Md",
  "1 à 10 Md",
  "10 à 50 Md",
  "Plus de 50 Md"
];

export const TYPES_ABONNEMENT = [
  "Basse tension (BT)",
  "Moyenne tension (MT)",
  "Haute tension (HT)"
];

export const DESTINATIONS_EAU = [
  "Réseau ONAS",
  "Milieu naturel (sol)",
  "Mer",
  "Autre"
];

export const FILIERES_DECHETS = [
  "Enlèvement par prestataire agréé",
  "Décharge",
  "Brûlage",
  "Valorisation / recyclage",
  "Autre"
];

export const BAREME_REPONSES = [
  { val: 0, label: "0 - Non / Je ne sais pas", short: "Non / NSP" },
  { val: 1, label: "1 - Envisagé", short: "Envisagé" },
  { val: 2, label: "2 - En place partiellement", short: "Partiel" },
  { val: 3, label: "3 - En place et suivi", short: "En place & suivi" }
];

export const MODULES_CONFIG = [
  {
    id: "GOV",
    num: 1,
    title: "Gouvernance et stratégie",
    weight: 1,
    recommandations: {
      faible: "La gestion énergie-environnement n'est pas encore pilotée par la direction. Priorité : formaliser une politique, désigner un responsable et établir le registre réglementaire.",
      intermediaire: "Les bases de gouvernance existent. Priorité : fixer des objectifs chiffrés, instaurer une revue de direction et sécuriser la conformité réglementaire.",
      avance: "Gouvernance structurée. Prochaine étape : viser la certification ISO 50001 / ISO 14001 et intégrer les enjeux climat à la stratégie d'entreprise."
    },
    offreSE: "Appui à la mise en place du SME/SMEn, formation des équipes de direction",
    questions: [
      {
        id: "1.1",
        text: "L'entreprise dispose d'une politique énergie/environnement/climat formalisée, datant de moins de 3 ans et contenant des objectifs chiffrés.",
        rec: "Formaliser une politique énergie-environnement-climat avec des objectifs chiffrés, signée par la direction."
      },
      {
        id: "1.2",
        text: "Un membre de la direction est responsable des engagements énergie et environnement.",
        rec: "Désigner un membre de la direction responsable des engagements énergie-climat."
      },
      {
        id: "1.3",
        text: "Les personnes désignées disposent d'une description claire de leurs missions et de ressources financières adéquates.",
        rec: "Rédiger la fiche de poste du référent énergie-environnement et lui allouer un budget."
      },
      {
        id: "1.4",
        text: "La direction examine régulièrement les questions énergie et environnement (réunions, revue de direction).",
        rec: "Instaurer une revue de direction semestrielle sur l'énergie et l'environnement."
      },
      {
        id: "1.5",
        text: "L'entreprise connaît les réglementations applicables (Code de l'environnement, normes de rejets, réglementation énergie) et suit un programme de conformité.",
        rec: "Établir un registre de la réglementation applicable et un programme de mise en conformité."
      },
      {
        id: "1.6",
        text: "Les objectifs et performances énergie-environnement sont communiqués aux employés et discutés par les actionnaires.",
        rec: "Communiquer les objectifs et résultats énergie-environnement au personnel et aux actionnaires."
      }
    ]
  },
  {
    id: "SMEn",
    num: 2,
    title: "Management de l'énergie",
    weight: 1,
    recommandations: {
      faible: "Les consommations ne sont pas maîtrisées. Priorité : réaliser un audit énergétique pour identifier et chiffrer les gisements d'économies.",
      intermediaire: "Le suivi existe mais reste partiel. Priorité : sous-comptage, indicateurs de performance énergétique et plan d'actions chiffré.",
      avance: "SMEn mature. Prochaine étape : certification ISO 50001 et amélioration continue de la performance énergétique."
    },
    offreSE: "Audit énergétique, accompagnement ISO 50001, formation",
    questions: [
      {
        id: "2.1",
        text: "Les consommations d'énergie sont suivies au moins mensuellement et analysées.",
        rec: "Mettre en place un suivi mensuel des consommations d'énergie (factures, compteurs)."
      },
      {
        id: "2.2",
        text: "Les principaux usages énergétiques disposent d'un sous-comptage.",
        rec: "Installer des sous-compteurs sur les usages énergétiques significatifs."
      },
      {
        id: "2.3",
        text: "Des indicateurs de performance énergétique (IPE) et une situation énergétique de référence sont définis et comparés à des références sectorielles.",
        rec: "Définir des IPE (kWh/tonne, kWh/m²…) et une situation énergétique de référence."
      },
      {
        id: "2.4",
        text: "Un audit énergétique a été réalisé au cours des 4 dernières années.",
        rec: "Réaliser un audit énergétique pour identifier et chiffrer les gisements d'économies."
      },
      {
        id: "2.5",
        text: "Un plan d'actions d'efficacité énergétique chiffré est en place et suivi.",
        rec: "Élaborer un plan d'actions d'efficacité énergétique hiérarchisé par temps de retour."
      },
      {
        id: "2.6",
        text: "Des critères de performance énergétique sont intégrés aux achats et aux nouveaux projets (moteurs, éclairage, froid, bâtiments, informatique).",
        rec: "Intégrer des critères d'efficacité énergétique dans les cahiers des charges d'achat et de projets."
      },
      {
        id: "2.7",
        text: "Le personnel est formé et sensibilisé à la gestion de l'énergie (techniciens, gardiens, usagers).",
        rec: "Former les équipes techniques et mener des campagnes de sensibilisation régulières."
      }
    ]
  },
  {
    id: "ENV",
    num: 3,
    title: "Environnement et ressources",
    weight: 1,
    recommandations: {
      faible: "Les impacts eau, rejets et déchets ne sont pas maîtrisés, avec un risque réglementaire. Priorité : audit environnemental et plan de mise en conformité.",
      intermediaire: "Pratiques partielles. Priorité : traitement des rejets, traçabilité des déchets et réduction des consommations d'eau.",
      avance: "Bonne maîtrise environnementale. Prochaine étape : économie circulaire et certification ISO 14001."
    },
    offreSE: "Audit environnemental, production plus propre, valorisation des déchets",
    questions: [
      {
        id: "3.1",
        text: "Les consommations d'eau sont suivies et des actions de réduction sont mises en œuvre.",
        rec: "Suivre les consommations d'eau par usage et identifier les pertes."
      },
      {
        id: "3.2",
        text: "Les eaux usées sont traitées avant rejet, conformément aux normes (NS 05-061).",
        rec: "Faire caractériser les rejets et étudier une solution de traitement conforme."
      },
      {
        id: "3.3",
        text: "Les déchets sont triés, tracés et confiés à des filières agréées.",
        rec: "Mettre en place le tri à la source et la traçabilité des déchets (bordereaux de suivi)."
      },
      {
        id: "3.4",
        text: "Une évaluation des impacts environnementaux (EIES, audit environnemental) est à jour.",
        rec: "Mettre à jour l'audit environnemental ou l'EIES de l'installation."
      },
      {
        id: "3.5",
        text: "L'entreprise valorise ses déchets ou sous-produits (réutilisation, recyclage, valorisation énergétique).",
        rec: "Étudier la valorisation matière ou énergétique des déchets et sous-produits."
      }
    ]
  },
  {
    id: "CARB",
    num: 4,
    title: "Carbone et climat",
    weight: 1,
    recommandations: {
      faible: "Les émissions de l'entreprise ne sont pas connues. Priorité : réaliser un bilan GES de référence (scopes 1 et 2).",
      intermediaire: "Les émissions sont partiellement connues. Priorité : fixer un objectif de réduction et élaborer un plan de décarbonation.",
      avance: "Démarche carbone avancée. Prochaine étape : trajectoire alignée sur la science et valorisation des réductions d'émissions."
    },
    offreSE: "Bilan carbone, plan de décarbonation, étude d'exposition au MACF",
    questions: [
      {
        id: "4.1",
        text: "Un bilan des émissions de gaz à effet de serre (scopes 1 et 2) a été réalisé.",
        rec: "Réaliser un bilan GES de référence (scopes 1 et 2) selon le GHG Protocol ou l'ISO 14064-1."
      },
      {
        id: "4.2",
        text: "Les émissions indirectes du scope 3 (achats, transport, produits) ont été estimées.",
        rec: "Estimer les principaux postes du scope 3 (achats, transport, fin de vie des produits)."
      },
      {
        id: "4.3",
        text: "L'entreprise s'est fixé un objectif de réduction de ses émissions, daté et chiffré.",
        rec: "Fixer un objectif de réduction des émissions daté et chiffré."
      },
      {
        id: "4.4",
        text: "Un plan de décarbonation est en place (efficacité énergétique, énergies renouvelables, substitution de combustibles).",
        rec: "Élaborer une trajectoire de décarbonation (efficacité, solaire, substitution de combustibles)."
      },
      {
        id: "4.5",
        text: "L'entreprise a évalué son exposition aux exigences carbone de ses clients et marchés (MACF, chaînes d'approvisionnement européennes).",
        rec: "Évaluer l'exposition au MACF et aux exigences carbone des clients export."
      },
      {
        id: "4.6",
        text: "L'entreprise a évalué les risques climatiques physiques sur ses sites (chaleur, inondations, stress hydrique).",
        rec: "Évaluer la vulnérabilité des sites aux risques climatiques (chaleur, inondations, eau)."
      }
    ]
  },
  {
    id: "ESG",
    num: 5,
    title: "ESG et reporting",
    weight: 1,
    recommandations: {
      faible: "Les pratiques ESG ne sont pas documentées, ce qui limite l'accès aux financements et aux clients exigeants. Priorité : diagnostic ESG.",
      intermediaire: "Des pratiques ESG existent mais sont peu formalisées. Priorité : structurer les politiques et produire un premier rapport RSE/ESG.",
      avance: "Reporting ESG structuré. Prochaine étape : alignement sur les normes IFRS S1/S2 et vérification externe."
    },
    offreSE: "Diagnostic ESG, rapport RSE, système de gestion environnementale et sociale (SGES)",
    questions: [
      {
        id: "5.1",
        text: "L'entreprise publie un rapport RSE/ESG ou intègre ces informations dans son rapport annuel.",
        rec: "Publier un rapport RSE/ESG annuel, même simplifié."
      },
      {
        id: "5.2",
        text: "Le reporting suit un référentiel reconnu (GRI, IFRS S1/S2, critères des bailleurs).",
        rec: "Aligner le reporting sur un référentiel reconnu (GRI, IFRS S1/S2)."
      },
      {
        id: "5.3",
        text: "Une politique santé-sécurité au travail est en place, avec suivi des accidents.",
        rec: "Formaliser une politique santé-sécurité et suivre le taux de fréquence des accidents."
      },
      {
        id: "5.4",
        text: "L'entreprise a des engagements sociaux formalisés (emploi local, conditions de travail, relations avec les communautés riveraines).",
        rec: "Formaliser les engagements sociaux (emploi local, communautés, conditions de travail)."
      },
      {
        id: "5.5",
        text: "Des dispositifs d'éthique et de gestion des risques ESG sont en place (anticorruption, mécanisme de gestion des plaintes).",
        rec: "Mettre en place un code d'éthique et un mécanisme de gestion des plaintes."
      },
      {
        id: "5.6",
        text: "L'entreprise est en mesure de répondre aux questionnaires ESG des banques, bailleurs et clients.",
        rec: "Constituer une base de données ESG pour répondre aux questionnaires des banques et clients."
      }
    ]
  },
  {
    id: "FIN",
    num: 6,
    title: "Finance durable et carbone",
    weight: 1,
    recommandations: {
      faible: "L'énergie et le carbone ne sont pas intégrés aux décisions financières. Priorité : budget énergie et identification des financements verts mobilisables.",
      intermediaire: "Connaissance partielle des financements. Priorité : monter un dossier bancable et évaluer le potentiel de crédits carbone.",
      avance: "Bonne maturité financière. Prochaine étape : mobiliser des financements verts ou des revenus carbone (Article 6)."
    },
    offreSE: "Montage de dossiers de financement, levée de fonds, expertise carbone (Article 6)",
    questions: [
      {
        id: "6.1",
        text: "Un budget énergie couvre les charges énergétiques, les investissements et la maintenance.",
        rec: "Établir un budget énergie couvrant charges, investissements et maintenance."
      },
      {
        id: "6.2",
        text: "L'impact énergie/carbone est pris en compte dans les décisions d'investissement et les demandes de financement.",
        rec: "Intégrer l'impact énergie-carbone (coût global, prix interne du carbone) dans les décisions d'investissement."
      },
      {
        id: "6.3",
        text: "L'entreprise connaît les financements verts disponibles (lignes de crédit vertes, BOAD, FONSIS, bailleurs, garanties).",
        rec: "Identifier les financements verts mobilisables pour les projets de l'entreprise."
      },
      {
        id: "6.4",
        text: "L'entreprise a déjà sollicité ou obtenu un financement vert.",
        rec: "Préparer un dossier bancable pour un premier financement vert."
      },
      {
        id: "6.5",
        text: "L'entreprise connaît les mécanismes de crédits carbone (marché volontaire, Article 6 de l'Accord de Paris).",
        rec: "Se former aux mécanismes de crédits carbone et à l'Article 6."
      },
      {
        id: "6.6",
        text: "L'entreprise a des projets potentiellement générateurs de crédits carbone (énergies renouvelables, valorisation de biomasse ou de déchets, efficacité énergétique).",
        rec: "Faire évaluer l'éligibilité de ses projets à la génération de crédits carbone."
      }
    ]
  }
];

export const NIVEAUX_MATURITE = [
  {
    min: 0,
    max: 25,
    niveau: "Débutant",
    desc: "Les pratiques énergie, environnement et climat sont peu structurées. Les gains rapides sont importants."
  },
  {
    min: 26,
    max: 50,
    niveau: "En progression",
    desc: "Des initiatives existent mais restent ponctuelles et peu pilotées."
  },
  {
    min: 51,
    max: 75,
    niveau: "Structuré",
    desc: "Une démarche organisée est en place. L'enjeu est de la systématiser et de la valoriser."
  },
  {
    min: 76,
    max: 100,
    niveau: "Avancé",
    desc: "Démarche mature. L'enjeu est la certification, la valorisation financière et carbone."
  }
];

/**
 * Calculateur central - Réplique exacte des formules Excel
 */
export function calculateAutoDiagnostic(profil, reponses) {
  // 1. Calculs des scores par module
  const moduleResults = MODULES_CONFIG.map((mod, index) => {
    let totalPoints = 0;
    let questionsAnswered = 0;

    mod.questions.forEach((q) => {
      if (reponses[q.id] !== undefined && reponses[q.id] !== null && reponses[q.id] !== "") {
        totalPoints += Number(reponses[q.id]);
        questionsAnswered++;
      }
    });

    const maxPoints = mod.questions.length * 3;
    const scoreRatio = maxPoints > 0 ? totalPoints / maxPoints : 0;
    const scorePct = Math.round(scoreRatio * 100);

    // Niveau du module
    let niveauModule = "Débutant";
    for (const n of NIVEAUX_MATURITE) {
      if (scorePct >= n.min) {
        niveauModule = n.niveau;
      }
    }

    // Recommandation selon seuil
    let recTexte = mod.recommandations.faible;
    if (scoreRatio >= 0.7) {
      recTexte = mod.recommandations.avance;
    } else if (scoreRatio >= 0.4) {
      recTexte = mod.recommandations.intermediaire;
    }

    return {
      id: mod.id,
      num: mod.num,
      title: mod.title,
      scoreRatio,
      scorePct,
      totalPoints,
      maxPoints,
      questionsCount: mod.questions.length,
      questionsAnswered,
      niveau: niveauModule,
      recommandation: recTexte,
      offreSE: mod.offreSE,
      // Valeur pour tri de départage ex-aequo (ROW() / 1000000)
      sortKey: scoreRatio + (index + 12) / 1000000
    };
  });

  // 2. Score global (ROUND(Moyenne des ratios * 100, 0))
  const sumRatios = moduleResults.reduce((acc, m) => acc + m.scoreRatio, 0);
  const scoreGlobal = Math.round((sumRatios / moduleResults.length) * 100);

  let niveauGlobal = NIVEAUX_MATURITE[0];
  for (const n of NIVEAUX_MATURITE) {
    if (scoreGlobal >= n.min) {
      niveauGlobal = n;
    }
  }

  // 3. Les 3 priorités d'accompagnement (les 3 plus faibles)
  const sortedModules = [...moduleResults].sort((a, b) => a.sortKey - b.sortKey);
  const priorites = sortedModules.slice(0, 3);

  // 4. Complétude
  const totalQuestions = MODULES_CONFIG.reduce((acc, m) => acc + m.questions.length, 0);
  const totalAnswered = moduleResults.reduce((acc, m) => acc + m.questionsAnswered, 0);
  const isComplete = totalAnswered === totalQuestions;
  const missingCount = totalQuestions - totalAnswered;

  // 5. Calculateurs énergétiques & carbone
  // Scope 1 Combustibles
  const qGasoil = Number(profil.qGasoil || 0);
  const qFuel = Number(profil.qFuel || 0);
  const qGpl = Number(profil.qGpl || 0);
  const qGazNat = Number(profil.qGazNat || 0);
  const qCharbon = Number(profil.qCharbon || 0);
  const qBiomasse = Number(profil.qBiomasse || 0);
  const qAutreDirect = Number(profil.qAutreDirect || 0);

  const emGasoil = (qGasoil * FACTEURS_EMISSION.gasoil) / 1000;
  const emFuel = (qFuel * FACTEURS_EMISSION.fuelLourd) / 1000;
  const emGpl = (qGpl * FACTEURS_EMISSION.butaneGPL) / 1000;
  const emGazNat = (qGazNat * FACTEURS_EMISSION.gazNaturel) / 1000;
  const emCharbon = (qCharbon * FACTEURS_EMISSION.charbon) / 1000;
  const emBiomasse = 0; // Biogénique

  const scope1 = Number((emGasoil + emFuel + emGpl + emGazNat + emCharbon + emBiomasse + qAutreDirect).toFixed(2));

  // Scope 2 Électricité
  const consoElec = Number(profil.consoElec || 0);
  const scope2 = Number(((consoElec * FACTEURS_EMISSION.electricite) / 1000).toFixed(2));

  const totalScopes1Et2 = Number((scope1 + scope2).toFixed(2));

  // Facture totale
  const factElec = Number(profil.factureElec || 0);
  const factComb = Number(profil.factureComb || 0);
  const factureTotale = factElec + factComb;

  // Taux d'économies selon le score du Module 2 (SMEn)
  const smenScorePct = moduleResults.find((m) => m.id === "SMEn")?.scorePct || 0;
  let tauxBas = 0.10;
  let tauxHaut = 0.20;

  if (smenScorePct >= 70) {
    tauxBas = 0.03;
    tauxHaut = 0.08;
  } else if (smenScorePct >= 40) {
    tauxBas = 0.05;
    tauxHaut = 0.15;
  }

  const economiesBas = Math.round(factureTotale * tauxBas);
  const economiesHaut = Math.round(factureTotale * tauxHaut);

  // 6. Alertes et Opportunités conditionnelles
  const alerts = [];

  // Alerte MACF
  const exportUE = profil.exportUE === "Oui";
  const noteQ45 = reponses["4.5"] !== undefined ? Number(reponses["4.5"]) : 0;
  if (exportUE && noteQ45 < 2) {
    alerts.push({
      type: "macf",
      title: "Exposition MACF",
      message: "L'entreprise exporte vers l'UE sans avoir évalué son exposition carbone : vérifier l'impact du MACF (ciment, acier, aluminium, engrais, hydrogène, électricité) et les exigences carbone des clients."
    });
  }

  // Alerte Demande ESG
  const demandeESG = profil.demandeESG === "Oui";
  const scoreRatioESG = moduleResults.find((m) => m.id === "ESG")?.scoreRatio || 0;
  if (demandeESG && scoreRatioESG < 0.5) {
    alerts.push({
      type: "esg",
      title: "Demande ESG",
      message: "Les clients ou bailleurs demandent des données ESG/carbone alors que le reporting reste limité : un diagnostic ESG est prioritaire."
    });
  }

  // Alerte Conformité Réglementaire
  const noteQ15 = reponses["1.5"] !== undefined ? Number(reponses["1.5"]) : null;
  const noteQ32 = reponses["3.2"] !== undefined ? Number(reponses["3.2"]) : null;
  const eauTraitee = profil.eauTraitee === "Non";

  if ((noteQ15 !== null && noteQ15 <= 1) || (noteQ32 !== null && noteQ32 <= 1) || eauTraitee) {
    alerts.push({
      type: "conformite",
      title: "Conformité réglementaire",
      message: "Risque de non-conformité (veille réglementaire ou traitement des rejets insuffisant) : un audit environnemental est recommandé."
    });
  }

  // Opportunité Carbone
  const noteQ66 = reponses["6.6"] !== undefined ? Number(reponses["6.6"]) : 0;
  const valorisationDechets = profil.potentielValDechets === "Oui";
  const puissanceSolaire = Number(profil.solaireKwc || 0);
  const puissanceBiomasse = Number(profil.biomasseKw || 0);

  if (noteQ66 >= 2 || valorisationDechets || puissanceSolaire > 0 || puissanceBiomasse > 0) {
    alerts.push({
      type: "carbone",
      title: "Opportunité carbone",
      message: "Projets ENR, biomasse ou valorisation de déchets identifiés : une étude d'éligibilité aux crédits carbone (marché volontaire, Article 6) peut générer des revenus complémentaires."
    });
  }

  return {
    scoreGlobal,
    niveauGlobal,
    moduleResults,
    priorites,
    isComplete,
    missingCount,
    totalQuestions,
    totalAnswered,
    indicateurs: {
      scope1,
      scope2,
      totalScopes1Et2,
      factureTotale,
      economiesBas,
      economiesHaut,
      tauxBas,
      tauxHaut
    },
    alerts
  };
}

