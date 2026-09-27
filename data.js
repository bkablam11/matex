/**
 * ==========================================================================
 * MATEX - Base de Donnees Pedagogique & Referentiel National des Programmes
 * CP1 au Master 2 & Agregation - Cote d'Ivoire
 * Configuration et Referentiel officiel allege pour haute performance
 * ==========================================================================
 */

// 1. INFORMATIONS OFFICIELLES DE DON ET CONTACT
const OFFICIAL_DONATION_INFO = Object.freeze({
  accountName: "Coordination & Tresorerie Generale MATEX Cote d'Ivoire",
  phoneFormatted: "07 48 78 22 05",
  phoneRaw: "0748782205",
  minAmount: 5000,
  operators: Object.freeze(["Wave", "Orange Money"])
});

// 2. METADONNEES OFFICIELLES DPFC / MENAET 2026-2027
const DPFC_CURRICULUM_METADATA_2026_2027 = Object.freeze({
  title: "Progressions Annuelles Pedagogiques de Mathematiques",
  ministry: "Ministere de l'Education Nationale, de l'Alphabetisation et de l'Enseignement Technique (MENAET)",
  direction: "Direction de la Pedagogie et de la Formation Continue (DPFC)",
  subDirection: "Sous-Direction de la Formation Pedagogique Continue",
  coordination: "Coordination Nationale Disciplinaire de Mathematiques",
  coordinator: "Jean-Marie KOFFI",
  contactEmail: "cndmaths33@gmail.com",
  academicYear: "2026-2027",
  status: "Officiel en Vigueur",
  totalCycles: 4,
  description: "Progression pedagogique nationale officielle regissant l'enseignement des mathematiques en Cote d'Ivoire de la Sixieme a la Terminale pour l'annee scolaire 2026-2027."
});

// 3. IDENTIFIANTS SERVICES & LIENS CLOUDS
const MATEX_SPREADSHEET_ID = "100kYZ-lrTW069edLrur_RBfqxsvu288jeES5zQ-tZTI";
const MATEX_SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/" + MATEX_SPREADSHEET_ID + "/edit?usp=sharing";
const MATEX_DRIVE_FOLDER_ID = "1jWAn2ZHD4vU8NAypKcsXI5Ias8oIZFYF";
const MATEX_DRIVE_URL = "https://drive.google.com/drive/folders/" + MATEX_DRIVE_FOLDER_ID + "?usp=sharing";
const MATEX_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzeC6g6PE6W3Dd02ynQKZpS7C0nSqCVf_KF4-7ggYMeHjU10KpLJiklLKQeu9CQiSWr/exec";
const MATEX_WHATSAPP_LINK = "https://chat.whatsapp.com/DRQEqCr4221L0bS2wXjgWU?mode=gi_t";
const REGISTRATION_FORM_URL = "https://forms.gle/2sPqT34ESzQR1S5L7";
const FORMATION_WHATSAPP_URL = "https://chat.whatsapp.com/D3Z48FSKgQT57ZA9lqLdJh?mode=gi_t";
const YOUTUBE_VIDEO_URL = "https://youtu.be/5veQlZEFJ-w?si=mjkuc7xbdChn6tQI";

// 4. PALIERS DE DON SOLIDAIRE
const DONATION_TIERS = Object.freeze([
  {
    id: "tier-1",
    amount: 5000,
    label: "5 000 FCFA",
    popular: true,
    impactDescription: "Montant minimal solidaire (A partir de 5 000 FCFA) : Contribue a l'hebergement des sources LaTeX, aux connexions et a la logistique des ateliers."
  },
  {
    id: "tier-2",
    amount: 10000,
    label: "10 000 FCFA",
    popular: false,
    impactDescription: "Soutient la redaction d'annales de concours complets avec figures TikZ vectorielles et conversion Word."
  },
  {
    id: "tier-3",
    amount: 25000,
    label: "25 000 FCFA",
    popular: false,
    impactDescription: "Parraine une session de formation intensive pour les professeurs et la logistique de videoprojection."
  },
  {
    id: "tier-4",
    amount: 50000,
    label: "50 000 FCFA",
    popular: false,
    impactDescription: "Grand Bienfaiteur : Soutien structurel aux cohortes de formation et a l'impression des polycopies nationaux."
  }
]);

// 5. REFERENTIEL OFFICIEL DES 4 PARCOURS (DPFC 2026-2027)
const OFFICIAL_CURRICULUM = Object.freeze([
  // --- 1. PRIMAIRE (CP1 - CM2) ---
  {
    id: "primaire",
    label: "Primaire (CP1 - CM2)",
    colorClass: "emerald",
    description: "Enseignement fondamental : numeration, calculs poses, geometrie d'eveil et grandeurs & mesures.",
    grades: [
      {
        id: "cp1",
        label: "CP1",
        fullName: "Cours Preparatoire 1ere Annee (CP1)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "cp1-l01", number: 1, title: "Nombres entiers de 0 a 10 et denombrement", hours: 8, trimester: 1, domain: "Eveil & Numeration" },
          { id: "cp1-l02", number: 2, title: "Comparaison, ordre et symboles (<, >, =)", hours: 6, trimester: 1, domain: "Eveil & Numeration" },
          { id: "cp1-l03", number: 3, title: "Orientation spatiale (gauche, droite, devant, derriere)", hours: 6, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "cp1-l04", number: 4, title: "Nombres entiers de 11 a 20", hours: 8, trimester: 2, domain: "Eveil & Numeration" },
          { id: "cp1-l05", number: 5, title: "Sens de l'addition et tables d'addition simples", hours: 10, trimester: 2, domain: "Eveil & Numeration" },
          { id: "cp1-l06", number: 6, title: "Reconnaissance de formes simples (carre, rond, triangle)", hours: 6, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "cp1-l07", number: 7, title: "Introduction a la soustraction", hours: 8, trimester: 3, domain: "Eveil & Numeration" },
          { id: "cp1-l08", number: 8, title: "Mesure de longueurs avec etalons simples", hours: 6, trimester: 3, domain: "Geometrie & Trigonometrie" }
        ]
      },
      {
        id: "cp2",
        label: "CP2",
        fullName: "Cours Preparatoire 2eme Annee (CP2)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "cp2-l01", number: 1, title: "Nombres entiers de 0 a 50 (dizaines et unites)", hours: 8, trimester: 1, domain: "Eveil & Numeration" },
          { id: "cp2-l02", number: 2, title: "Lignes droites, segments et trace a la regle", hours: 6, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "cp2-l03", number: 3, title: "Addition sans retenue et decompositions", hours: 8, trimester: 1, domain: "Eveil & Numeration" },
          { id: "cp2-l04", number: 4, title: "Nombres entiers jusqu'a 100", hours: 10, trimester: 2, domain: "Eveil & Numeration" },
          { id: "cp2-l05", number: 5, title: "Addition avec retenue et soustraction simple", hours: 10, trimester: 2, domain: "Eveil & Numeration" },
          { id: "cp2-l06", number: 6, title: "Monnaie courante (pieces et billets FCFA)", hours: 6, trimester: 2, domain: "Eveil & Numeration" },
          { id: "cp2-l07", number: 7, title: "Mesures de longueur : le metre et le centimetre", hours: 6, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "cp2-l08", number: 8, title: "Resolution de petits problemes arithmetiques du quotidien", hours: 8, trimester: 3, domain: "Eveil & Numeration" }
        ]
      },
      {
        id: "ce1",
        label: "CE1",
        fullName: "Cours Elementaire 1ere Annee (CE1)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "ce1-l01", number: 1, title: "Nombres entiers de 0 a 1 000 (centaines, dizaines, unites)", hours: 9, trimester: 1, domain: "Eveil & Numeration" },
          { id: "ce1-l02", number: 2, title: "Addition et soustraction posees avec retenue", hours: 9, trimester: 1, domain: "Eveil & Numeration" },
          { id: "ce1-l03", number: 3, title: "L'angle droit et l'equerre", hours: 6, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "ce1-l04", number: 4, title: "Sens de la multiplication et tables de 2, 3, 4 et 5", hours: 10, trimester: 2, domain: "Eveil & Numeration" },
          { id: "ce1-l05", number: 5, title: "Figures usuelles : Carre, rectangle, triangle", hours: 7, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "ce1-l06", number: 6, title: "Mesures de masses (kg, g) et de capacites (L, cL)", hours: 6, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "ce1-l07", number: 7, title: "Initiation au partage et division exacte", hours: 8, trimester: 3, domain: "Eveil & Numeration" },
          { id: "ce1-l08", number: 8, title: "Lecture de l'heure et calcul de durees simples", hours: 6, trimester: 3, domain: "Eveil & Numeration" }
        ]
      },
      {
        id: "ce2",
        label: "CE2",
        fullName: "Cours Elementaire 2eme Annee (CE2)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "ce2-l01", number: 1, title: "Nombres entiers de 0 a 10 000", hours: 9, trimester: 1, domain: "Eveil & Numeration" },
          { id: "ce2-l02", number: 2, title: "Droites perpendiculaires et droites paralleles", hours: 7, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "ce2-l03", number: 3, title: "Multiplication posee par un nombre a un et deux chiffres", hours: 10, trimester: 1, domain: "Eveil & Numeration" },
          { id: "ce2-l04", number: 4, title: "Solides de l'espace : Cube, pave droit et prisme", hours: 6, trimester: 2, domain: "Geometrie dans l'Espace" },
          { id: "ce2-l05", number: 5, title: "Division posee a un chiffre au diviseur", hours: 10, trimester: 2, domain: "Eveil & Numeration" },
          { id: "ce2-l06", number: 6, title: "Mesures de longueurs (km, m, dm, cm, mm)", hours: 6, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "ce2-l07", number: 7, title: "Symetrie axiale sur quadrillage", hours: 7, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "ce2-l08", number: 8, title: "Resolution methodique de problemes a etapes", hours: 8, trimester: 3, domain: "Eveil & Numeration" }
        ]
      },
      {
        id: "cm1",
        label: "CM1",
        fullName: "Cours Moyen 1ere Annee (CM1)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "cm1-l01", number: 1, title: "Les grands nombres entiers (jusqu'au million)", hours: 8, trimester: 1, domain: "Eveil & Numeration" },
          { id: "cm1-l02", number: 2, title: "Fractions simples : demis, tiers, quarts, dixiemes", hours: 9, trimester: 1, domain: "Eveil & Numeration" },
          { id: "cm1-l03", number: 3, title: "Perimetres du carre, du rectangle et du polygone", hours: 7, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "cm1-l04", number: 4, title: "Nombres decimaux : ecriture a virgule et reperage", hours: 9, trimester: 2, domain: "Eveil & Numeration" },
          { id: "cm1-l05", number: 5, title: "Aires du carre et du rectangle (cm2, m2)", hours: 8, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "cm1-l06", number: 6, title: "Division posee a 2 chiffres au diviseur", hours: 9, trimester: 2, domain: "Eveil & Numeration" },
          { id: "cm1-l07", number: 7, title: "Proportionnalite : tableau et regle de trois", hours: 8, trimester: 3, domain: "Eveil & Numeration" },
          { id: "cm1-l08", number: 8, title: "Angles et reproduction de figures complexes", hours: 6, trimester: 3, domain: "Geometrie & Trigonometrie" }
        ]
      },
      {
        id: "cm2",
        label: "CM2",
        fullName: "Cours Moyen 2eme Annee (CM2 / Entree en 6e)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "cm2-l01", number: 1, title: "Numeration des grands nombres (jusqu'au milliard)", hours: 8, trimester: 1, domain: "Eveil & Numeration" },
          { id: "cm2-l02", number: 2, title: "Operations sur les nombres decimaux", hours: 10, trimester: 1, domain: "Eveil & Numeration" },
          { id: "cm2-l03", number: 3, title: "Perimetres, Aires usuelles et Unites agraires (ha, a, ca)", hours: 9, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "cm2-l04", number: 4, title: "Fractions : comparaison, somme et produit par un entier", hours: 9, trimester: 2, domain: "Eveil & Numeration" },
          { id: "cm2-l05", number: 5, title: "Division decimale et quotients approches", hours: 8, trimester: 2, domain: "Eveil & Numeration" },
          { id: "cm2-l06", number: 6, title: "Aires du triangle, du disque et du trapeze", hours: 8, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "cm2-l07", number: 7, title: "Pourcentages, Echelles, Vitesses et Partages proportionnels", hours: 9, trimester: 3, domain: "Eveil & Numeration" },
          { id: "cm2-l08", number: 8, title: "Volumes du cube et du pave droit (dm3, L)", hours: 7, trimester: 3, domain: "Geometrie dans l'Espace" },
          { id: "cm2-l09", number: 9, title: "Grandes Enigmes & Epreuves du Concours d'Excellence Primaire", hours: 8, trimester: 3, domain: "Eveil & Numeration" }
        ]
      }
    ]
  },

  // --- 2. 1ER CYCLE / COLLEGE (6E - 3E) ---
  {
    id: "college",
    label: "1er Cycle / College (6e - 3e)",
    colorClass: "sky",
    description: "Progression annuelle nationale officielle DPFC 2026-2027 (128 heures annuelles, 4 heures par semaine).",
    grades: [
      {
        id: "6e",
        label: "6eme",
        fullName: "Classe de Sixieme (6e)",
        cycle: "college",
        annualHours: 128,
        weeklyHours: 4,
        lessons: [
          { id: "6e-l00", number: 0, title: "Seances de revisions", hours: 8, trimester: 1, domain: "Evaluation & Regulation" },
          { id: "6e-l01", number: 1, title: "Nombres entiers naturels", hours: 9, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "6e-l02", number: 2, title: "Droites et points", hours: 11, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "6e-l03", number: 3, title: "Nombres decimaux relatifs", hours: 15, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "6e-l04", number: 4, title: "Segments", hours: 5, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "6e-l05", number: 5, title: "Paves droits et cylindres droits", hours: 7, trimester: 2, domain: "Geometrie dans l'Espace" },
          { id: "6e-l06", number: 6, title: "Fractions", hours: 7, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "6e-l07", number: 7, title: "Cercles et disques", hours: 7, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "6e-l08", number: 8, title: "Angles", hours: 7, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "6e-l09", number: 9, title: "Triangles", hours: 7, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "6e-l10", number: 10, title: "Proportionnalite", hours: 7, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "6e-l11", number: 11, title: "Figures symetriques par rapport a un point", hours: 11, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "6e-l12", number: 12, title: "Statistique", hours: 5, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "6e-l13", number: 13, title: "Parallelogramme", hours: 9, trimester: 3, domain: "Geometrie & Trigonometrie" }
        ]
      },
      {
        id: "5e",
        label: "5eme",
        fullName: "Classe de Cinquieme (5e)",
        cycle: "college",
        annualHours: 128,
        weeklyHours: 4,
        lessons: [
          { id: "5e-l00", number: 0, title: "Seances de revisions", hours: 8, trimester: 1, domain: "Evaluation & Regulation" },
          { id: "5e-l01", number: 1, title: "Nombres premiers", hours: 13, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "5e-l02", number: 2, title: "Segments", hours: 7, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "5e-l03", number: 3, title: "Angles", hours: 7, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "5e-l04", number: 4, title: "Nombres decimaux relatifs", hours: 11, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "5e-l05", number: 5, title: "Figures symetriques par rapport a une droite", hours: 13, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "5e-l06", number: 6, title: "Fractions", hours: 9, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "5e-l07", number: 7, title: "Prismes droits", hours: 7, trimester: 2, domain: "Geometrie dans l'Espace" },
          { id: "5e-l08", number: 8, title: "Triangles", hours: 11, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "5e-l09", number: 9, title: "Proportionnalite", hours: 9, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "5e-l10", number: 10, title: "Cercles", hours: 5, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "5e-l11", number: 11, title: "Statistique", hours: 7, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "5e-l12", number: 12, title: "Parallelogrammes particuliers", hours: 9, trimester: 3, domain: "Geometrie & Trigonometrie" }
        ]
      },
      {
        id: "4e",
        label: "4eme",
        fullName: "Classe de Quatrieme (4e)",
        cycle: "college",
        annualHours: 128,
        weeklyHours: 4,
        lessons: [
          { id: "4e-l00", number: 0, title: "Seances de revisions", hours: 8, trimester: 1, domain: "Evaluation & Regulation" },
          { id: "4e-l01", number: 1, title: "Nombres decimaux relatifs", hours: 7, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "4e-l02", number: 2, title: "Angles", hours: 9, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "4e-l03", number: 3, title: "Nombres rationnels", hours: 15, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "4e-l04", number: 4, title: "Distances", hours: 7, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "4e-l05", number: 5, title: "Perspective cavaliere", hours: 9, trimester: 2, domain: "Geometrie dans l'Espace" },
          { id: "4e-l06", number: 6, title: "Calcul litteral", hours: 9, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "4e-l07", number: 7, title: "Cercles et triangles", hours: 11, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "4e-l08", number: 8, title: "Equations et inequations dans Q", hours: 7, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "4e-l09", number: 9, title: "Vecteurs", hours: 13, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "4e-l10", number: 10, title: "Statistique", hours: 7, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "4e-l11", number: 11, title: "Symetries et translations", hours: 15, trimester: 3, domain: "Geometrie & Trigonometrie" }
        ]
      },
      {
        id: "3e",
        label: "3eme (BEPC)",
        fullName: "Classe de Troisieme (3e / Candidats BEPC)",
        cycle: "college",
        annualHours: 128,
        weeklyHours: 4,
        lessons: [
          { id: "3e-l00", number: 0, title: "Seances de revisions", hours: 8, trimester: 1, domain: "Evaluation & Regulation" },
          { id: "3e-l01", number: 1, title: "Calcul litteral", hours: 9, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "3e-l02", number: 2, title: "Proprietes de Thales dans un triangle", hours: 7, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "3e-l03", number: 3, title: "Racines carrees", hours: 7, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "3e-l04", number: 4, title: "Triangle rectangle", hours: 11, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "3e-l05", number: 5, title: "Calcul numerique", hours: 11, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "3e-l06", number: 6, title: "Angles inscrits", hours: 5, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "3e-l07", number: 7, title: "Vecteurs", hours: 7, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "3e-l08", number: 8, title: "Equations et inequations dans R", hours: 5, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "3e-l09", number: 9, title: "Pyramides et cones", hours: 9, trimester: 2, domain: "Geometrie dans l'Espace" },
          { id: "3e-l10", number: 10, title: "Statistique", hours: 9, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "3e-l11", number: 11, title: "Coordonnees de vecteurs", hours: 7, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "3e-l12", number: 12, title: "Equations de droites", hours: 9, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "3e-l13", number: 13, title: "Applications affines", hours: 5, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "3e-l14", number: 14, title: "Equations et inequations dans R x R", hours: 5, trimester: 3, domain: "Arithmetique & Algebre" }
        ]
      }
    ]
  },

  // --- 3. 2ND CYCLE / LYCEE (2NDE - TLE) ---
  {
    id: "lycee",
    label: "2nd Cycle / Lycee (2nde - Tle)",
    colorClass: "indigo",
    description: "Series d'enseignement general conformes au referentiel officiel DPFC 2026-2027.",
    grades: [
      {
        id: "2de-a",
        label: "2nde A",
        fullName: "Seconde Litteraire (2nde A)",
        cycle: "lycee",
        annualHours: 96,
        weeklyHours: 3,
        lessons: [
          { id: "2a-l01", number: 1, title: "Calcul numerique", hours: 11, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "2a-l02", number: 2, title: "Denombrement", hours: 17, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "2a-l03", number: 3, title: "Calcul litteral", hours: 12, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "2a-l04", number: 4, title: "Equations et inequations dans R", hours: 7, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "2a-l05", number: 5, title: "Generalites sur les fonctions", hours: 14, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "2a-l06", number: 6, title: "Etude de fonctions elementaires", hours: 9, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "2a-l07", number: 7, title: "Statistique", hours: 7, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "2a-l08", number: 8, title: "Systemes d'equations lineaires dans R x R", hours: 5, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "2a-rev", number: 9, title: "Revisions", hours: 6, trimester: 3, domain: "Evaluation & Regulation" }
        ]
      },
      {
        id: "2de-c",
        label: "2nde C",
        fullName: "Seconde Scientifique (2nde C)",
        cycle: "lycee",
        annualHours: 160,
        weeklyHours: 5,
        lessons: [
          { id: "2c-l01", number: 1, title: "Vecteurs et points du plan", hours: 10, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "2c-l02", number: 2, title: "Ensemble des nombres reels", hours: 14, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "2c-l03", number: 3, title: "Utilisation des symetries et translations", hours: 7, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "2c-l04", number: 4, title: "Generalites sur les fonctions", hours: 10, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "2c-l05", number: 5, title: "Droites et plans de l'espace", hours: 11, trimester: 1, domain: "Geometrie dans l'Espace" },
          { id: "2c-l06", number: 6, title: "Fonctions polynomes et fractions rationnelles", hours: 9, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "2c-l07", number: 7, title: "Angles inscrits", hours: 5, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "2c-l08", number: 8, title: "Angles orientes et trigonometrie", hours: 14, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "2c-l09", number: 9, title: "Statistique a une variable", hours: 7, trimester: 2, domain: "Probabilites & Statistiques" },
          { id: "2c-l10", number: 10, title: "Produit scalaire", hours: 11, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "2c-l11", number: 11, title: "Equations et inequations dans R", hours: 9, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "2c-l12", number: 12, title: "Homotheties", hours: 7, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "2c-l13", number: 13, title: "Etude de fonctions elementaires", hours: 11, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "2c-l14", number: 14, title: "Rotations", hours: 7, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "2c-l15", number: 15, title: "Inequations dans R x R", hours: 3, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "2c-rev", number: 16, title: "Revisions", hours: 10, trimester: 3, domain: "Evaluation & Regulation" }
        ]
      },
      {
        id: "1re-a1",
        label: "1ere A1",
        fullName: "Premiere Litteraire A1 (1ere A1)",
        cycle: "lycee",
        annualHours: 128,
        weeklyHours: 4,
        lessons: [
          { id: "1a1-l01", number: 1, title: "Equations et inequations", hours: 19, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "1a1-l02", number: 2, title: "Denombrement", hours: 19, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "1a1-l03", number: 3, title: "Generalites sur les fonctions", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1a1-l04", number: 4, title: "Derivabilite et etude de fonctions", hours: 23, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1a1-l05", number: 5, title: "Suites numeriques", hours: 17, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1a1-l06", number: 6, title: "Statistique", hours: 15, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "1a1-l07", number: 7, title: "Systemes d'equations dans R x R", hours: 9, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "1a1-rev", number: 8, title: "Revisions", hours: 8, trimester: 3, domain: "Evaluation & Regulation" }
        ]
      },
      {
        id: "1re-a2",
        label: "1ere A2",
        fullName: "Premiere Litteraire A2 (1ere A2)",
        cycle: "lycee",
        annualHours: 96,
        weeklyHours: 3,
        lessons: [
          { id: "1a2-l01", number: 1, title: "Equations et inequations dans R", hours: 11, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "1a2-l02", number: 2, title: "Denombrement", hours: 18, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "1a2-l03", number: 3, title: "Generalites sur les fonctions", hours: 12, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1a2-l04", number: 4, title: "Derivabilite et etude de fonctions", hours: 17, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1a2-l05", number: 5, title: "Suites numeriques", hours: 11, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1a2-l06", number: 6, title: "Statistique", hours: 9, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "1a2-l07", number: 7, title: "Systemes d'equations lineaires dans R x R", hours: 5, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "1a2-rev", number: 8, title: "Revisions", hours: 6, trimester: 3, domain: "Evaluation & Regulation" }
        ]
      },
      {
        id: "1re-c",
        label: "1ere C",
        fullName: "Premiere Scientifique C (1ere C)",
        cycle: "lycee",
        annualHours: 192,
        weeklyHours: 6,
        lessons: [
          { id: "1c-l01", number: 1, title: "Equations et inequations dans R", hours: 11, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "1c-l02", number: 2, title: "Angles orientes et trigonometrie", hours: 11, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "1c-l03", number: 3, title: "Generalites sur les fonctions", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1c-l04", number: 4, title: "Barycentre", hours: 11, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "1c-l05", number: 5, title: "Limites et continuite", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1c-l06", number: 6, title: "Denombrement", hours: 11, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "1c-l07", number: 7, title: "Extension de la notion de limite", hours: 9, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1c-l08", number: 8, title: "Composees de transformations du plan", hours: 11, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "1c-l09", number: 9, title: "Derivation", hours: 9, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1c-l10", number: 10, title: "Orthogonalite de l'espace", hours: 9, trimester: 2, domain: "Geometrie dans l'Espace" },
          { id: "1c-l11", number: 11, title: "Etude et representation graphique d'une fonction", hours: 11, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1c-l12", number: 12, title: "Probabilite", hours: 8, trimester: 2, domain: "Probabilites & Statistiques" },
          { id: "1c-l13", number: 13, title: "Systeme d'equations lineaires dans R2 et dans R3", hours: 4, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "1c-l14", number: 14, title: "Geometrie analytique du plan", hours: 7, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "1c-l15", number: 15, title: "Suites numeriques", hours: 11, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "1c-l16", number: 16, title: "Vecteurs de l'espace", hours: 11, trimester: 3, domain: "Geometrie dans l'Espace" },
          { id: "1c-l17", number: 17, title: "Statistique a une variable", hours: 7, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "1c-rev", number: 18, title: "Revisions", hours: 12, trimester: 3, domain: "Evaluation & Regulation" }
        ]
      },
      {
        id: "1re-d",
        label: "1ere D",
        fullName: "Premiere Sciences Experimentales (1ere D)",
        cycle: "lycee",
        annualHours: 160,
        weeklyHours: 5,
        lessons: [
          { id: "1d-l01", number: 1, title: "Equations et inequations du second degre dans R", hours: 9, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "1d-l02", number: 2, title: "Angles orientes et trigonometrie", hours: 9, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "1d-l03", number: 3, title: "Generalites sur les fonctions", hours: 9, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1d-l04", number: 4, title: "Limites et continuite", hours: 10, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1d-l05", number: 5, title: "Denombrement", hours: 9, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "1d-l06", number: 6, title: "Derivation", hours: 14, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1d-l07", number: 7, title: "Extension de la notion de limite", hours: 9, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1d-l08", number: 8, title: "Barycentre", hours: 7, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "1d-l09", number: 9, title: "Etude et representation graphique d'une fonction", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1d-l10", number: 10, title: "Probabilite", hours: 9, trimester: 2, domain: "Probabilites & Statistiques" },
          { id: "1d-l11", number: 11, title: "Suites numeriques", hours: 9, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "1d-l12", number: 12, title: "Composees de transformations du plan", hours: 7, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "1d-l13", number: 13, title: "Statistique a une variable", hours: 9, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "1d-l14", number: 14, title: "Systemes d'equations lineaires dans R2 et dans R3", hours: 3, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "1d-l15", number: 15, title: "Orthogonalite dans l'espace", hours: 7, trimester: 3, domain: "Geometrie dans l'Espace" },
          { id: "1d-rev", number: 16, title: "Revisions", hours: 10, trimester: 3, domain: "Evaluation & Regulation" }
        ]
      },
      {
        id: "tle-a1",
        label: "Tle A1",
        fullName: "Terminale Litteraire A1 (Tle A1)",
        cycle: "lycee",
        annualHours: 160,
        weeklyHours: 5,
        lessons: [
          { id: "ta1-l01", number: 1, title: "Etude de fonctions polynomes et de fonctions rationnelles", hours: 29, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "ta1-l02", number: 2, title: "Probabilite et variable aleatoire", hours: 24, trimester: 1, domain: "Probabilites & Statistiques" },
          { id: "ta1-l03", number: 3, title: "Primitives et calcul integral", hours: 19, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "ta1-l04", number: 4, title: "Fonction logarithme népérien", hours: 14, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "ta1-l05", number: 5, title: "Fonction exponentielle népérienne", hours: 14, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "ta1-l06", number: 6, title: "Statistique a deux variables", hours: 19, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "ta1-l07", number: 7, title: "Suites numeriques", hours: 14, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "ta1-l08", number: 8, title: "Systemes d'equations lineaires dans R x R", hours: 9, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "ta1-rev", number: 9, title: "Revisions", hours: 10, trimester: 3, domain: "Evaluation & Regulation" }
        ]
      },
      {
        id: "tle-a2",
        label: "Tle A2",
        fullName: "Terminale Litteraire A2 (Tle A2)",
        cycle: "lycee",
        annualHours: 128,
        weeklyHours: 4,
        lessons: [
          { id: "ta2-l01", number: 1, title: "Etude de fonctions polynomes et de fonctions rationnelles", hours: 28, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "ta2-l02", number: 2, title: "Probabilite", hours: 20, trimester: 1, domain: "Probabilites & Statistiques" },
          { id: "ta2-l03", number: 3, title: "Fonction logarithme népérien", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "ta2-l04", number: 4, title: "Fonction exponentielle népérienne", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "ta2-l05", number: 5, title: "Statistique a deux variables", hours: 15, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "ta2-l06", number: 6, title: "Suites numeriques", hours: 15, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "ta2-l07", number: 7, title: "Systemes d'equations lineaires dans R x R", hours: 5, trimester: 3, domain: "Arithmetique & Algebre" },
          { id: "ta2-rev", number: 8, title: "Revisions", hours: 8, trimester: 3, domain: "Evaluation & Regulation" }
        ]
      },
      {
        id: "tle-c",
        label: "Terminale C",
        fullName: "Terminale Scientifique C (Tle C)",
        cycle: "lycee",
        annualHours: 256,
        weeklyHours: 8,
        lessons: [
          { id: "tc-l01", number: 1, title: "Barycentre et lignes de niveaux", hours: 11, trimester: 1, domain: "Geometrie & Trigonometrie" },
          { id: "tc-l02", number: 2, title: "Limites et continuite", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "tc-l03", number: 3, title: "Divisibilite dans Z", hours: 13, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "tc-l04", number: 4, title: "Derivabilite et etude de fonctions", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "tc-l05", number: 5, title: "Geometrie analytique de l'espace", hours: 11, trimester: 1, domain: "Geometrie dans l'Espace" },
          { id: "tc-l06", number: 6, title: "Primitives", hours: 7, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "tc-l07", number: 7, title: "Fonctions logarithmes", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "tc-l08", number: 8, title: "Coniques", hours: 11, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "tc-l09", number: 9, title: "Fonctions exponentielles et fonctions puissances", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "tc-l10", number: 10, title: "Nombres complexes", hours: 13, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "tc-l11", number: 11, title: "PPCM et PGCD de deux entiers relatifs", hours: 13, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "tc-l12", number: 12, title: "Suites numeriques", hours: 13, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "tc-l13", number: 13, title: "Isometries du plan", hours: 17, trimester: 2, domain: "Geometrie & Trigonometrie" },
          { id: "tc-l14", number: 14, title: "Calcul integral", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "tc-l15", number: 15, title: "Similitudes directes du plan", hours: 15, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "tc-l16", number: 16, title: "Probabilite conditionnelle et variable aleatoire", hours: 13, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "tc-l17", number: 17, title: "Nombres complexes et geometrie du plan", hours: 9, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "tc-l18", number: 18, title: "Statistique a deux variables", hours: 7, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "tc-l19", number: 19, title: "Equations differentielles", hours: 5, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "tc-rev", number: 20, title: "Revisions", hours: 16, trimester: 3, domain: "Evaluation & Regulation" }
        ]
      },
      {
        id: "tle-d",
        label: "Terminale D",
        fullName: "Terminale Sciences Experimentales (Tle D)",
        cycle: "lycee",
        annualHours: 192,
        weeklyHours: 6,
        lessons: [
          { id: "td-l01", number: 1, title: "Limites et continuite", hours: 17, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "td-l02", number: 2, title: "Probabilite conditionnelle et variable aleatoire", hours: 17, trimester: 1, domain: "Probabilites & Statistiques" },
          { id: "td-l03", number: 3, title: "Derivabilite et etude de fonctions", hours: 15, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "td-l04", number: 4, title: "Primitives", hours: 7, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "td-l05", number: 5, title: "Fonctions logarithmes", hours: 17, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "td-l06", number: 6, title: "Fonctions exponentielles et puissances", hours: 21, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "td-l07", number: 7, title: "Suites numeriques", hours: 13, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "td-l08", number: 8, title: "Nombres complexes", hours: 17, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "td-l09", number: 9, title: "Calcul integral", hours: 15, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "td-l10", number: 10, title: "Nombres complexes et geometrie du plan", hours: 15, trimester: 3, domain: "Geometrie & Trigonometrie" },
          { id: "td-l11", number: 11, title: "Statistiques a deux variables", hours: 9, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "td-l12", number: 12, title: "Equations differentielles", hours: 5, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "td-rev", number: 13, title: "Revisions", hours: 12, trimester: 3, domain: "Evaluation & Regulation" }
        ]
      }
    ]
  },

  // --- 4. SUPERIEUR & RECHERCHE (L1 - MASTER 2) ---
  {
    id: "superieur",
    label: "Superieur & Recherche (L1 - M2)",
    colorClass: "amber",
    description: "Licences fondamentales, Classes Preparatoires (CPGE MPSI/MP), Masters, CAPES & Agregation.",
    grades: [
      {
        id: "l1-prepa",
        label: "Licence 1 / MPSI",
        fullName: "Licence 1 & Classes Preparatoires (MPSI / PCSI)",
        cycle: "superieur",
        annualHours: 250,
        weeklyHours: 9,
        lessons: [
          { id: "l1-l01", number: 1, title: "Logique, Theorie des ensembles et Applications", hours: 18, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "l1-l02", number: 2, title: "Nombres complexes, Polynomes et Fractions rationnelles", hours: 24, trimester: 1, domain: "Arithmetique & Algebre" },
          { id: "l1-l03", number: 3, title: "Suites reelles, Bornes superieures et Theoreme de Bolzano-Weierstrass", hours: 22, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "l1-l04", number: 4, title: "Continuite, Derivabilite et Theoremes de Rolle / Accroissements Finis", hours: 25, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "l1-l05", number: 5, title: "Espaces vectoriels, Familles libres/generatrices et Dimension finie", hours: 30, trimester: 2, domain: "Algebre Lineaire" },
          { id: "l1-l06", number: 6, title: "Applications lineaires, Matrices et Systemes de Cramer", hours: 28, trimester: 2, domain: "Algebre Lineaire" },
          { id: "l1-l07", number: 7, title: "Integration de Riemann sur un segment et Developpements limites", hours: 26, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "l1-l08", number: 8, title: "Espaces Euclidiens et Produit scalaire reel", hours: 20, trimester: 3, domain: "Algebre Lineaire" }
        ]
      },
      {
        id: "l2-prepa",
        label: "Licence 2 / MP",
        fullName: "Licence 2 & Classes Preparatoires (MP / PSI / Concours Ingenieurs)",
        cycle: "superieur",
        annualHours: 250,
        weeklyHours: 9,
        lessons: [
          { id: "l2-l01", number: 1, title: "Series numeriques, Series entieres et Series de Fourier", hours: 28, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "l2-l02", number: 2, title: "Reduction des endomorphismes (Valeurs propres, Diagonalisation & Jordan)", hours: 30, trimester: 1, domain: "Algebre Lineaire" },
          { id: "l2-l03", number: 3, title: "Algebre bilineaire, Formes quadratiques et Espaces prehilbertiens", hours: 26, trimester: 1, domain: "Algebre Lineaire" },
          { id: "l2-l04", number: 4, title: "Topologie des espaces vectoriels normes et Compacite", hours: 28, trimester: 2, domain: "Topologie & Calcul Differentiel" },
          { id: "l2-l05", number: 5, title: "Calcul differentiel a plusieurs variables et Extrema lies", hours: 26, trimester: 2, domain: "Topologie & Calcul Differentiel" },
          { id: "l2-l06", number: 6, title: "Integrales dependant d'un parametre et Integrales multiples", hours: 24, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "l2-l07", number: 7, title: "Probabilites discretes et Variables aleatoires sur univers denombrable", hours: 20, trimester: 3, domain: "Probabilites & Statistiques" }
        ]
      },
      {
        id: "l3-m1",
        label: "Licence 3 / M1",
        fullName: "Licence 3 & Master 1 Recherche Mathematique",
        cycle: "superieur",
        annualHours: 260,
        weeklyHours: 10,
        lessons: [
          { id: "l3-l01", number: 1, title: "Topologie generale, Espaces metriques complets et Espaces de Baire", hours: 30, trimester: 1, domain: "Topologie & Calcul Differentiel" },
          { id: "l3-l02", number: 2, title: "Theorie de la Mesure et Integration de Lebesgue sur Rn", hours: 35, trimester: 1, domain: "Topologie & Calcul Differentiel" },
          { id: "l3-l03", number: 3, title: "Espaces de Banach, Espaces de Hilbert et Theoreme de Riesz", hours: 30, trimester: 1, domain: "Topologie & Calcul Differentiel" },
          { id: "l3-l04", number: 4, title: "Theorie des Groupes, Anneaux, Ideaux et Corps finis", hours: 32, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "l3-l05", number: 5, title: "Analyse complexe, Theoreme de Cauchy et Calcul des residus", hours: 28, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "l3-l06", number: 6, title: "Probabilites continues, Esperances conditionnelles et Martingales", hours: 26, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "l3-l07", number: 7, title: "Geometrie differentielle elementaire et Sous-varietes de Rn", hours: 25, trimester: 3, domain: "Physique-Mathematiques" }
        ]
      },
      {
        id: "m2-agreg",
        label: "Master 2 / Agregation",
        fullName: "Master 2 Recherche, CAPES & Agregation de Mathematiques",
        cycle: "superieur",
        annualHours: 280,
        weeklyHours: 10,
        lessons: [
          { id: "m2-l01", number: 1, title: "Analyse fonctionnelle avancee et Theorie des Distributions de Laurent Schwartz", hours: 35, trimester: 1, domain: "Topologie & Calcul Differentiel" },
          { id: "m2-l02", number: 2, title: "Equations aux Derivees Partielles (EDP lineaires, Problemes elliptiques & Sobolev)", hours: 35, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "m2-l03", number: 3, title: "Geometrie riemannienne, Connexions et Formule de Gauss-Bonnet", hours: 30, trimester: 2, domain: "Physique-Mathematiques" },
          { id: "m2-l04", number: 4, title: "Algebre commutative, Modules de type fini et Theorie de Galois", hours: 32, trimester: 2, domain: "Arithmetique & Algebre" },
          { id: "m2-l05", number: 5, title: "Processus stochastiques, Mouvement Brownien et Calcul d'Ito", hours: 30, trimester: 3, domain: "Probabilites & Statistiques" },
          { id: "m2-l06", number: 6, title: "Optimisation convexe, Analyse numerique matricielle et Elements finis", hours: 28, trimester: 3, domain: "Physique-Mathematiques" }
        ]
      }
    ]
  }
]);

// 6. FONCTIONS D'ACCES AU REFERENTIEL AVEC CACHE
const _lessonsCache = new Map();

function getGradeLevelsByCycle(cycleId) {
  const cycle = OFFICIAL_CURRICULUM.find(c => c.id === cycleId);
  return cycle ? cycle.grades : [];
}

function getLessonsByGrade(cycleId, gradeId) {
  const cacheKey = cycleId + "_" + gradeId;
  if (_lessonsCache.has(cacheKey)) {
    return _lessonsCache.get(cacheKey);
  }
  const grades = getGradeLevelsByCycle(cycleId);
  const grade = grades.find(g => g.id === gradeId || g.label.toLowerCase() === (gradeId || "").toLowerCase());
  const lessons = grade ? grade.lessons : [];
  _lessonsCache.set(cacheKey, lessons);
  return lessons;
}

function findLessonById(lessonId) {
  if (!lessonId) return null;
  for (const cycle of OFFICIAL_CURRICULUM) {
    for (const grade of cycle.grades) {
      const lesson = grade.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return { grade, lesson, cycle };
      }
    }
  }
  return null;
}

const INITIAL_MATEX_DOCUMENTS = Object.freeze([]);