/**
 * ==========================================================================
 * MATEX - Base de Données Pédagogique & Référentiel National des Programmes
 * CP1 au Master 2 & Agrégation • Côte d'Ivoire
 * ==========================================================================
 */

// Informations Officielles de Don et Contact
const OFFICIAL_DONATION_INFO = {
  accountName: "KABLAM EDJABROU ULRICH BLANCHARD",
  phoneFormatted: "07 48 78 22 05",
  phoneRaw: "0748782205",
  minAmount: 5000,
  operators: ["Wave", "Orange Money"]
};

const MATEX_SPREADSHEET_ID = "100kYZ-lrTW069edLrur_RBfqxsvu288jeES5zQ-tZTI";
const MATEX_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${MATEX_SPREADSHEET_ID}/edit?usp=sharing`;
const MATEX_DRIVE_FOLDER_ID = "1jWAn2ZHD4vU8NAypKcsXI5Ias8oIZFYF";
const MATEX_DRIVE_URL = "https://drive.google.com/drive/folders/1jWAn2ZHD4vU8NAypKcsXI5Ias8oIZFYF?usp=sharing";
const MATEX_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzeC6g6PE6W3Dd02ynQKZpS7C0nSqCVf_KF4-7ggYMeHjU10KpLJiklLKQeu9CQiSWr/exec";
const MATEX_WHATSAPP_LINK = "https://chat.whatsapp.com/DRQEqCr4221L0bS2wXjgWU?mode=gi_t";
const REGISTRATION_FORM_URL = "https://forms.gle/2sPqT34ESzQR1S5L7";
const FORMATION_WHATSAPP_URL = "https://chat.whatsapp.com/D3Z48FSKgQT57ZA9lqLdJh?mode=gi_t";
const YOUTUBE_VIDEO_URL = "https://youtu.be/5veQlZEFJ-w?si=mjkuc7xbdChn6tQI";

// Paliers de don solidaire
const DONATION_TIERS = [
  {
    id: "tier-1",
    amount: 5000,
    label: "5 000 FCFA",
    popular: true,
    impactDescription: "Montant minimal solidaire (À partir de 5 000 FCFA) : Contribue à l'hébergement des sources LaTeX, aux connexions et à la logistique des ateliers."
  },
  {
    id: "tier-2",
    amount: 10000,
    label: "10 000 FCFA",
    popular: false,
    impactDescription: "Soutient la rédaction d'annales de concours complets avec figures TikZ vectorielles et conversion Word."
  },
  {
    id: "tier-3",
    amount: 25000,
    label: "25 000 FCFA",
    popular: false,
    impactDescription: "Parraine une session de formation intensive pour les professeurs et la logistique de vidéoprojection."
  },
  {
    id: "tier-4",
    amount: 50000,
    label: "50 000 FCFA",
    popular: false,
    impactDescription: "Grand Bienfaiteur : Soutien structurel aux cohortes de formation et à l'impression des polycopiés nationaux."
  }
];

// Référentiel officiel des 4 Parcours & Programmes
const OFFICIAL_CURRICULUM = [
  // --- 1. PRIMAIRE (CP1 - CM2) ---
  {
    id: "primaire",
    label: "Primaire (CP1 - CM2)",
    icon: "🌱",
    colorClass: "emerald",
    description: "Enseignement fondamental : numération, calculs posés, géométrie d'éveil et grandeurs & mesures.",
    grades: [
      {
        id: "cp1",
        label: "CP1",
        fullName: "Cours Préparatoire 1ère Année (CP1)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "cp1-l01", number: 1, title: "Nombres entiers de 0 à 10 et dénombrement", hours: 8, trimester: 1, domain: "Éveil & Numération" },
          { id: "cp1-l02", number: 2, title: "Comparaison, ordre et symboles (<, >, =)", hours: 6, trimester: 1, domain: "Éveil & Numération" },
          { id: "cp1-l03", number: 3, title: "Orientation spatiale (gauche, droite, devant, derrière)", hours: 6, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "cp1-l04", number: 4, title: "Nombres entiers de 11 à 20", hours: 8, trimester: 2, domain: "Éveil & Numération" },
          { id: "cp1-l05", number: 5, title: "Sens de l'addition et tables d'addition simples", hours: 10, trimester: 2, domain: "Éveil & Numération" },
          { id: "cp1-l06", number: 6, title: "Reconnaissance de formes simples (carré, rond, triangle)", hours: 6, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "cp1-l07", number: 7, title: "Introduction à la soustraction", hours: 8, trimester: 3, domain: "Éveil & Numération" },
          { id: "cp1-l08", number: 8, title: "Mesure de longueurs avec étalons simples", hours: 6, trimester: 3, domain: "Géométrie & Trigonométrie" }
        ]
      },
      {
        id: "cp2",
        label: "CP2",
        fullName: "Cours Préparatoire 2ème Année (CP2)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "cp2-l01", number: 1, title: "Nombres entiers de 0 à 50 (dizaines et unités)", hours: 8, trimester: 1, domain: "Éveil & Numération" },
          { id: "cp2-l02", number: 2, title: "Lignes droites, segments et tracé à la règle", hours: 6, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "cp2-l03", number: 3, title: "Addition sans retenue et décompositions", hours: 8, trimester: 1, domain: "Éveil & Numération" },
          { id: "cp2-l04", number: 4, title: "Nombres entiers jusqu'à 100", hours: 10, trimester: 2, domain: "Éveil & Numération" },
          { id: "cp2-l05", number: 5, title: "Addition avec retenue et soustraction simple", hours: 10, trimester: 2, domain: "Éveil & Numération" },
          { id: "cp2-l06", number: 6, title: "Monnaie courante (pièces et billets FCFA)", hours: 6, trimester: 2, domain: "Éveil & Numération" },
          { id: "cp2-l07", number: 7, title: "Mesures de longueur : le mètre et le centimètre", hours: 6, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "cp2-l08", number: 8, title: "Résolution de petits problèmes arithmétiques du quotidien", hours: 8, trimester: 3, domain: "Éveil & Numération" }
        ]
      },
      {
        id: "ce1",
        label: "CE1",
        fullName: "Cours Élémentaire 1ère Année (CE1)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "ce1-l01", number: 1, title: "Nombres entiers de 0 à 1 000 (centaines, dizaines, unités)", hours: 9, trimester: 1, domain: "Éveil & Numération" },
          { id: "ce1-l02", number: 2, title: "Addition et soustraction posées avec retenue", hours: 9, trimester: 1, domain: "Éveil & Numération" },
          { id: "ce1-l03", number: 3, title: "L'angle droit et l'équerre", hours: 6, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "ce1-l04", number: 4, title: "Sens de la multiplication et tables de 2, 3, 4 et 5", hours: 10, trimester: 2, domain: "Éveil & Numération" },
          { id: "ce1-l05", number: 5, title: "Figures usuelles : Carré, rectangle, triangle", hours: 7, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "ce1-l06", number: 6, title: "Mesures de masses (kg, g) et de capacités (L, cL)", hours: 6, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "ce1-l07", number: 7, title: "Initiation au partage et division exacte", hours: 8, trimester: 3, domain: "Éveil & Numération" },
          { id: "ce1-l08", number: 8, title: "Lecture de l'heure et calcul de durées simples", hours: 6, trimester: 3, domain: "Éveil & Numération" }
        ]
      },
      {
        id: "ce2",
        label: "CE2",
        fullName: "Cours Élémentaire 2ème Année (CE2)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "ce2-l01", number: 1, title: "Nombres entiers de 0 à 10 000", hours: 9, trimester: 1, domain: "Éveil & Numération" },
          { id: "ce2-l02", number: 2, title: "Droites perpendiculaires et droites parallèles", hours: 7, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "ce2-l03", number: 3, title: "Multiplication posée par un nombre à un et deux chiffres", hours: 10, trimester: 1, domain: "Éveil & Numération" },
          { id: "ce2-l04", number: 4, title: "Solides de l'espace : Cube, pavé droit et prisme", hours: 6, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "ce2-l05", number: 5, title: "Division posée à un chiffre au diviseur", hours: 10, trimester: 2, domain: "Éveil & Numération" },
          { id: "ce2-l06", number: 6, title: "Mesures de longueurs (km, m, dm, cm, mm)", hours: 6, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "ce2-l07", number: 7, title: "Symétrie axiale sur quadrillage", hours: 7, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "ce2-l08", number: 8, title: "Résolution méthodique de problèmes à étapes", hours: 8, trimester: 3, domain: "Éveil & Numération" }
        ]
      },
      {
        id: "cm1",
        label: "CM1",
        fullName: "Cours Moyen 1ère Année (CM1)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "cm1-l01", number: 1, title: "Les grands nombres entiers (jusqu'au million)", hours: 8, trimester: 1, domain: "Éveil & Numération" },
          { id: "cm1-l02", number: 2, title: "Fractions simples : demis, tiers, quarts, dixièmes", hours: 9, trimester: 1, domain: "Éveil & Numération" },
          { id: "cm1-l03", number: 3, title: "Périmètres du carré, du rectangle et du polygone", hours: 7, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "cm1-l04", number: 4, title: "Nombres décimaux : écriture à virgule et repérage", hours: 9, trimester: 2, domain: "Éveil & Numération" },
          { id: "cm1-l05", number: 5, title: "Aires du carré et du rectangle (cm², m²)", hours: 8, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "cm1-l06", number: 6, title: "Division posée à 2 chiffres au diviseur", hours: 9, trimester: 2, domain: "Éveil & Numération" },
          { id: "cm1-l07", number: 7, title: "Proportionnalité : tableau et règle de trois", hours: 8, trimester: 3, domain: "Éveil & Numération" },
          { id: "cm1-l08", number: 8, title: "Angles et reproduction de figures complexes", hours: 6, trimester: 3, domain: "Géométrie & Trigonométrie" }
        ]
      },
      {
        id: "cm2",
        label: "CM2",
        fullName: "Cours Moyen 2ème Année (CM2 / Entrée en 6e)",
        cycle: "primaire",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "cm2-l01", number: 1, title: "Numération des grands nombres (jusqu'au milliard)", hours: 8, trimester: 1, domain: "Éveil & Numération" },
          { id: "cm2-l02", number: 2, title: "Opérations sur les nombres décimaux", hours: 10, trimester: 1, domain: "Éveil & Numération" },
          { id: "cm2-l03", number: 3, title: "Périmètres, Aires usuelles et Unités agraires (ha, a, ca)", hours: 9, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "cm2-l04", number: 4, title: "Fractions : comparaison, somme et produit par un entier", hours: 9, trimester: 2, domain: "Éveil & Numération" },
          { id: "cm2-l05", number: 5, title: "Division décimale et quotients approchés", hours: 8, trimester: 2, domain: "Éveil & Numération" },
          { id: "cm2-l06", number: 6, title: "Aires du triangle, du disque et du trapèze", hours: 8, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "cm2-l07", number: 7, title: "Pourcentages, Échelles, Vitesses et Partages proportionnels", hours: 9, trimester: 3, domain: "Éveil & Numération" },
          { id: "cm2-l08", number: 8, title: "Volumes du cube et du pavé droit (dm³, L)", hours: 7, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "cm2-l09", number: 9, title: "Grandes Énigmes & Épreuves du Concours d'Excellence Primaire", hours: 8, trimester: 3, domain: "Éveil & Numération" }
        ]
      }
    ]
  },

  // --- 2. 1ER CYCLE / COLLÈGE (6E - 3E) ---
  {
    id: "college",
    label: "1er Cycle / Collège (6e - 3e)",
    icon: "📐",
    colorClass: "sky",
    description: "Progression officielle nationale MENA (120 h annuelles par classe de la 6e à la 3e).",
    grades: [
      {
        id: "6e",
        label: "6ème",
        fullName: "Classe de Sixième (6e)",
        cycle: "college",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "6e-l01", number: 1, title: "Nombres entiers naturels", hours: 7, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "6e-l02", number: 2, title: "Droites et points", hours: 9, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "6e-l03", number: 3, title: "Nombres décimaux relatifs", hours: 13, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "6e-l04", number: 4, title: "Segments", hours: 5, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "6e-l05", number: 5, title: "Cercles et disques", hours: 7, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "6e-l06", number: 6, title: "Fractions", hours: 7, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "6e-l07", number: 7, title: "Angles", hours: 7, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "6e-l08", number: 8, title: "Triangles", hours: 7, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "6e-l09", number: 9, title: "Proportionnalité", hours: 5, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "6e-l10", number: 10, title: "Figures symétriques par rapport à un point", hours: 11, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "6e-l11", number: 11, title: "Parallélogramme", hours: 11, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "6e-l12", number: 12, title: "Statistique", hours: 5, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "6e-l13", number: 13, title: "Pavés droits et cylindres droits", hours: 5, trimester: 3, domain: "Géométrie & Trigonométrie" }
        ]
      },
      {
        id: "5e",
        label: "5ème",
        fullName: "Classe de Cinquième (5e)",
        cycle: "college",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "5e-l01", number: 1, title: "Nombres premiers", hours: 11, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "5e-l02", number: 2, title: "Figures symétriques par rapport à une droite", hours: 13, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "5e-l03", number: 3, title: "Angles", hours: 7, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "5e-l04", number: 4, title: "Nombres décimaux relatifs", hours: 11, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "5e-l05", number: 5, title: "Segments", hours: 7, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "5e-l06", number: 6, title: "Fractions", hours: 9, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "5e-l07", number: 7, title: "Triangles", hours: 11, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "5e-l08", number: 8, title: "Cercles", hours: 5, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "5e-l09", number: 9, title: "Proportionnalité", hours: 7, trimester: 3, domain: "Arithmétique & Algèbre" },
          { id: "5e-l10", number: 10, title: "Parallélogrammes particuliers", hours: 9, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "5e-l11", number: 11, title: "Statistique", hours: 5, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "5e-l12", number: 12, title: "Prismes droits", hours: 5, trimester: 3, domain: "Géométrie & Trigonométrie" }
        ]
      },
      {
        id: "4e",
        label: "4ème",
        fullName: "Classe de Quatrième (4e)",
        cycle: "college",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "4e-l01", number: 1, title: "Nombres décimaux relatifs", hours: 7, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "4e-l02", number: 2, title: "Angles", hours: 7, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "4e-l03", number: 3, title: "Nombres rationnels", hours: 13, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "4e-l04", number: 4, title: "Distances", hours: 7, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "4e-l05", number: 5, title: "Perspective cavalière", hours: 9, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "4e-l06", number: 6, title: "Calcul littéral", hours: 9, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "4e-l07", number: 7, title: "Cercles et triangles", hours: 9, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "4e-l08", number: 8, title: "Équations et inéquations", hours: 7, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "4e-l09", number: 9, title: "Vecteurs", hours: 13, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "4e-l10", number: 10, title: "Statistique", hours: 5, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "4e-l11", number: 11, title: "Symétries et translations", hours: 15, trimester: 3, domain: "Géométrie & Trigonométrie" }
        ]
      },
      {
        id: "3e",
        label: "3ème (BEPC)",
        fullName: "Classe de Troisième (3e / Candidats BEPC)",
        cycle: "college",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "3e-l01", number: 1, title: "Calcul littéral", hours: 7, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "3e-l02", number: 2, title: "Propriétés de Thalès dans un triangle", hours: 7, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "3e-l03", number: 3, title: "Racines carrées", hours: 7, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "3e-l04", number: 4, title: "Triangle rectangle", hours: 11, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "3e-l05", number: 5, title: "Calcul numérique", hours: 9, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "3e-l06", number: 6, title: "Angles inscrits", hours: 5, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "3e-l07", number: 7, title: "Vecteurs", hours: 7, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "3e-l08", number: 8, title: "Équations et inéquations dans ℝ", hours: 5, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "3e-l09", number: 9, title: "Coordonnées de vecteurs", hours: 7, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "3e-l10", number: 10, title: "Équations de droites", hours: 7, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "3e-l11", number: 11, title: "Statistique", hours: 7, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "3e-l12", number: 12, title: "Équations et inéquations dans ℝ × ℝ", hours: 7, trimester: 3, domain: "Arithmétique & Algèbre" },
          { id: "3e-l13", number: 13, title: "Applications affines", hours: 5, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "3e-l14", number: 14, title: "Pyramides et cônes", hours: 7, trimester: 3, domain: "Géométrie & Trigonométrie" }
        ]
      }
    ]
  },

  // --- 3. 2ND CYCLE / LYCÉE (2NDE - TLE) ---
  {
    id: "lycee",
    label: "2nd Cycle / Lycée (2nde - Tle)",
    icon: "🔬",
    colorClass: "indigo",
    description: "Toutes les séries d'enseignement général (2de A, 2nde C, 1re A1/A2/C/D, Tle A1/A2/C/D).",
    grades: [
      {
        id: "2de-a",
        label: "2nde A",
        fullName: "Seconde Littéraire (2nde A)",
        cycle: "lycee",
        annualHours: 90,
        weeklyHours: 3,
        lessons: [
          { id: "2a-l01", number: 1, title: "Calcul numérique", hours: 11, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "2a-l02", number: 2, title: "Dénombrement", hours: 15, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "2a-l03", number: 3, title: "Calcul littéral", hours: 11, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "2a-l04", number: 4, title: "Équations et inéquations dans ℝ", hours: 7, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "2a-l05", number: 5, title: "Généralités sur les fonctions", hours: 11, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "2a-l06", number: 6, title: "Étude de fonctions élémentaires", hours: 9, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "2a-l07", number: 7, title: "Statistique", hours: 7, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "2a-l08", number: 8, title: "Systèmes d’équations linéaires dans ℝ × ℝ", hours: 5, trimester: 3, domain: "Arithmétique & Algèbre" }
        ]
      },
      {
        id: "2de-c",
        label: "2nde C",
        fullName: "Seconde Scientifique (2nde C)",
        cycle: "lycee",
        annualHours: 150,
        weeklyHours: 5,
        lessons: [
          { id: "2c-l01", number: 1, title: "Vecteurs et points du plan", hours: 9, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "2c-l02", number: 2, title: "Ensemble des nombres réels", hours: 11, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "2c-l03", number: 3, title: "Utilisation des symétries et translations", hours: 7, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "2c-l04", number: 4, title: "Généralités sur les fonctions", hours: 9, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "2c-l05", number: 5, title: "Droites et plans de l’espace", hours: 11, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "2c-l06", number: 6, title: "Fonctions polynômes et fractions rationnelles", hours: 7, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "2c-l07", number: 7, title: "Angles inscrits", hours: 5, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "2c-l08", number: 8, title: "Angles orientés et trigonométrie", hours: 11, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "2c-l09", number: 9, title: "Statistique à une variable", hours: 7, trimester: 2, domain: "Probabilités & Statistiques" },
          { id: "2c-l10", number: 10, title: "Produit scalaire", hours: 11, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "2c-l11", number: 11, title: "Équations et inéquations dans ℝ", hours: 9, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "2c-l12", number: 12, title: "Homothéties", hours: 7, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "2c-l13", number: 13, title: "Étude de fonctions élémentaires", hours: 11, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "2c-l14", number: 14, title: "Rotations", hours: 7, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "2c-l15", number: 15, title: "Inéquations dans ℝ × ℝ", hours: 3, trimester: 3, domain: "Arithmétique & Algèbre" }
        ]
      },
      {
        id: "1re-a",
        label: "1ère A1/A2",
        fullName: "Première Littéraire (1ère A1 & A2)",
        cycle: "lycee",
        annualHours: 120,
        weeklyHours: 4,
        lessons: [
          { id: "1a-l01", number: 1, title: "Équations et inéquations dans ℝ", hours: 17, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "1a-l02", number: 2, title: "Dénombrement", hours: 19, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "1a-l03", number: 3, title: "Généralités sur les fonctions", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1a-l04", number: 4, title: "Dérivabilité et étude de fonctions", hours: 21, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1a-l05", number: 5, title: "Suites numériques", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1a-l06", number: 6, title: "Statistique", hours: 13, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "1a-l07", number: 7, title: "Systèmes d’équations linéaires dans ℝ × ℝ", hours: 9, trimester: 3, domain: "Arithmétique & Algèbre" }
        ]
      },
      {
        id: "1re-c",
        label: "1ère C",
        fullName: "Première Mathématiques & Sciences Physiques (1ère C)",
        cycle: "lycee",
        annualHours: 180,
        weeklyHours: 6,
        lessons: [
          { id: "1c-l01", number: 1, title: "Équations et inéquations du second degré dans ℝ", hours: 9, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "1c-l02", number: 2, title: "Angles orientés et trigonométrie", hours: 11, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "1c-l03", number: 3, title: "Généralités sur les fonctions", hours: 9, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1c-l04", number: 4, title: "Barycentre", hours: 9, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "1c-l05", number: 5, title: "Limites et continuité", hours: 9, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1c-l06", number: 6, title: "Dénombrement", hours: 11, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "1c-l07", number: 7, title: "Extension de la notion de limite", hours: 9, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1c-l08", number: 8, title: "Composées de transformations du plan", hours: 11, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "1c-l09", number: 9, title: "Dérivation", hours: 9, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1c-l10", number: 10, title: "Orthogonalité dans l’espace", hours: 9, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "1c-l11", number: 11, title: "Étude et représentation graphique d’une fonction", hours: 11, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1c-l12", number: 12, title: "Probabilité", hours: 7, trimester: 2, domain: "Probabilités & Statistiques" },
          { id: "1c-l13", number: 13, title: "Systèmes d’équations linéaires dans ℝ² et ℝ³", hours: 3, trimester: 3, domain: "Arithmétique & Algèbre" },
          { id: "1c-l14", number: 14, title: "Géométrie analytique du plan", hours: 7, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "1c-l15", number: 15, title: "Suites numériques", hours: 9, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "1c-l16", number: 16, title: "Vecteurs de l’espace", hours: 11, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "1c-l17", number: 17, title: "Statistique à une variable", hours: 7, trimester: 3, domain: "Probabilités & Statistiques" }
        ]
      },
      {
        id: "1re-d",
        label: "1ère D",
        fullName: "Première Sciences Expérimentales (1ère D)",
        cycle: "lycee",
        annualHours: 150,
        weeklyHours: 5,
        lessons: [
          { id: "1d-l01", number: 1, title: "Équations et inéquations du second degré dans ℝ", hours: 9, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "1d-l02", number: 2, title: "Angles orientés et trigonométrie", hours: 9, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "1d-l03", number: 3, title: "Généralités sur les fonctions", hours: 7, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1d-l04", number: 4, title: "Limites et continuité", hours: 9, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1d-l05", number: 5, title: "Dénombrement", hours: 9, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "1d-l06", number: 6, title: "Dérivation", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "1d-l07", number: 7, title: "Extension de la notion de limite", hours: 9, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1d-l08", number: 8, title: "Barycentre", hours: 7, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "1d-l09", number: 9, title: "Étude et représentation graphique d’une fonction", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "1d-l10", number: 10, title: "Probabilité", hours: 7, trimester: 2, domain: "Probabilités & Statistiques" },
          { id: "1d-l11", number: 11, title: "Suites numériques", hours: 9, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "1d-l12", number: 12, title: "Composées de transformations du plan", hours: 7, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "1d-l13", number: 13, title: "Statistique à une variable", hours: 7, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "1d-l14", number: 14, title: "Systèmes d’équations linéaires dans ℝ² et ℝ³", hours: 3, trimester: 3, domain: "Arithmétique & Algèbre" },
          { id: "1d-l15", number: 15, title: "Orthogonalité dans l’espace", hours: 7, trimester: 3, domain: "Géométrie & Trigonométrie" }
        ]
      },
      {
        id: "tle-a",
        label: "Tle A1/A2",
        fullName: "Terminale Littéraire (Tle A1 & Tle A2)",
        cycle: "lycee",
        annualHours: 150,
        weeklyHours: 5,
        lessons: [
          { id: "ta-l01", number: 1, title: "Étude de fonctions polynômes et de fonctions rationnelles", hours: 27, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "ta-l02", number: 2, title: "Probabilité et variable aléatoire", hours: 23, trimester: 1, domain: "Probabilités & Statistiques" },
          { id: "ta-l03", number: 3, title: "Primitives et calcul intégral", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "ta-l04", number: 4, title: "Fonction logarithme népérien", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "ta-l05", number: 5, title: "Fonction exponentielle népérienne", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "ta-l06", number: 6, title: "Statistique à deux variables", hours: 19, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "ta-l07", number: 7, title: "Suites numériques", hours: 13, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "ta-l08", number: 8, title: "Systèmes d’équations linéaires dans ℝ × ℝ", hours: 9, trimester: 3, domain: "Arithmétique & Algèbre" }
        ]
      },
      {
        id: "tle-c",
        label: "Terminale C",
        fullName: "Terminale Mathématiques & Sciences Physiques (Tle C)",
        cycle: "lycee",
        annualHours: 240,
        weeklyHours: 8,
        lessons: [
          { id: "tc-l01", number: 1, title: "Barycentre et lignes de niveaux", hours: 9, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "tc-l02", number: 2, title: "Limites et continuité", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "tc-l03", number: 3, title: "Divisibilité dans ℤ", hours: 11, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "tc-l04", number: 4, title: "Dérivabilité et étude de fonctions", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "tc-l05", number: 5, title: "Géométrie analytique de l’espace", hours: 9, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "tc-l06", number: 6, title: "Primitives", hours: 7, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "tc-l07", number: 7, title: "Fonctions logarithmes", hours: 11, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "tc-l08", number: 8, title: "Coniques", hours: 9, trimester: 1, domain: "Géométrie & Trigonométrie" },
          { id: "tc-l09", number: 9, title: "Fonctions exponentielles et fonctions puissances", hours: 15, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "tc-l10", number: 10, title: "Nombres complexes", hours: 11, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "tc-l11", number: 11, title: "PPCM et PGCD de deux entiers relatifs", hours: 11, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "tc-l12", number: 12, title: "Suites numériques", hours: 13, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "tc-l13", number: 13, title: "Isométries du plan", hours: 15, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "tc-l14", number: 14, title: "Calcul intégral", hours: 15, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "tc-l15", number: 15, title: "Similitudes directes du plan", hours: 13, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "tc-l16", number: 16, title: "Probabilité conditionnelle et variable aléatoire", hours: 13, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "tc-l17", number: 17, title: "Nombres complexes et géométrie du plan", hours: 9, trimester: 3, domain: "Géométrie & Trigonométrie" },
          { id: "tc-l18", number: 18, title: "Statistique à deux variables", hours: 7, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "tc-l19", number: 19, title: "Équations différentielles", hours: 5, trimester: 3, domain: "Analyse & Fonctions" }
        ]
      },
      {
        id: "tle-d",
        label: "Terminale D",
        fullName: "Terminale Sciences Expérimentales (Tle D)",
        cycle: "lycee",
        annualHours: 180,
        weeklyHours: 6,
        lessons: [
          { id: "td-l01", number: 1, title: "Limites et continuité", hours: 15, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "td-l02", number: 2, title: "Probabilité conditionnelle et variable aléatoire", hours: 17, trimester: 1, domain: "Probabilités & Statistiques" },
          { id: "td-l03", number: 3, title: "Dérivabilité et étude de fonctions", hours: 13, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "td-l04", number: 4, title: "Primitives", hours: 7, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "td-l05", number: 5, title: "Fonctions logarithmes", hours: 15, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "td-l06", number: 6, title: "Fonctions exponentielles et fonctions puissances", hours: 19, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "td-l07", number: 7, title: "Nombres complexes", hours: 17, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "td-l08", number: 8, title: "Calcul intégral", hours: 13, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "td-l09", number: 9, title: "Nombres complexes et géométrie du plan", hours: 13, trimester: 2, domain: "Géométrie & Trigonométrie" },
          { id: "td-l10", number: 10, title: "Suites numériques", hours: 13, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "td-l11", number: 11, title: "Statistique à deux variables", hours: 9, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "td-l12", number: 12, title: "Équations différentielles", hours: 5, trimester: 3, domain: "Analyse & Fonctions" }
        ]
      }
    ]
  },

  // --- 4. SUPÉRIEUR & RECHERCHE (L1 - MASTER 2) ---
  {
    id: "superieur",
    label: "Supérieur & Recherche (L1 - M2)",
    icon: "🎓",
    colorClass: "amber",
    description: "Licences fondamentales, Classes Préparatoires (CPGE MPSI/MP), Masters, CAPES & Agrégation.",
    grades: [
      {
        id: "l1-prepa",
        label: "Licence 1 / MPSI",
        fullName: "Licence 1 & Classes Préparatoires (MPSI / PCSI)",
        cycle: "superieur",
        annualHours: 250,
        weeklyHours: 9,
        lessons: [
          { id: "l1-l01", number: 1, title: "Logique, Théorie des ensembles et Applications", hours: 18, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "l1-l02", number: 2, title: "Nombres complexes, Polynômes et Fractions rationnelles", hours: 24, trimester: 1, domain: "Arithmétique & Algèbre" },
          { id: "l1-l03", number: 3, title: "Suites réelles, Bornes supérieures et Théorème de Bolzano-Weierstrass", hours: 22, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "l1-l04", number: 4, title: "Continuité, Dérivabilité et Théorèmes de Rolle / Accroissements Finis", hours: 25, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "l1-l05", number: 5, title: "Espaces vectoriels, Familles libres/génératrices et Dimension finie", hours: 30, trimester: 2, domain: "Algèbre Linéaire" },
          { id: "l1-l06", number: 6, title: "Applications linéaires, Matrices et Systèmes de Cramer", hours: 28, trimester: 2, domain: "Algèbre Linéaire" },
          { id: "l1-l07", number: 7, title: "Intégration de Riemann sur un segment et Développements limités", hours: 26, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "l1-l08", number: 8, title: "Espaces Euclidiens et Produit scalaire réel", hours: 20, trimester: 3, domain: "Algèbre Linéaire" }
        ]
      },
      {
        id: "l2-prepa",
        label: "Licence 2 / MP",
        fullName: "Licence 2 & Classes Préparatoires (MP / PSI / Concours Ingénieurs)",
        cycle: "superieur",
        annualHours: 250,
        weeklyHours: 9,
        lessons: [
          { id: "l2-l01", number: 1, title: "Séries numériques, Séries entières et Séries de Fourier", hours: 28, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "l2-l02", number: 2, title: "Réduction des endomorphismes (Valeurs propres, Diagonalisation & Jordan)", hours: 30, trimester: 1, domain: "Algèbre Linéaire" },
          { id: "l2-l03", number: 3, title: "Algèbre bilinéaire, Formes quadratiques et Espaces préhilbertiens", hours: 26, trimester: 1, domain: "Algèbre Linéaire" },
          { id: "l2-l04", number: 4, title: "Topologie des espaces vectoriels normés et Compacité", hours: 28, trimester: 2, domain: "Topologie & Calcul Différentiel" },
          { id: "l2-l05", number: 5, title: "Calcul différentiel à plusieurs variables et Extrema liés", hours: 26, trimester: 2, domain: "Topologie & Calcul Différentiel" },
          { id: "l2-l06", number: 6, title: "Intégrales dépendant d’un paramètre et Intégrales multiples", hours: 24, trimester: 3, domain: "Analyse & Fonctions" },
          { id: "l2-l07", number: 7, title: "Probabilités discrètes et Variables aléatoires sur univers dénombrable", hours: 20, trimester: 3, domain: "Probabilités & Statistiques" }
        ]
      },
      {
        id: "l3-m1",
        label: "Licence 3 / M1",
        fullName: "Licence 3 & Master 1 Recherche Mathématique",
        cycle: "superieur",
        annualHours: 260,
        weeklyHours: 10,
        lessons: [
          { id: "l3-l01", number: 1, title: "Topologie générale, Espaces métriques complets et Espaces de Baire", hours: 30, trimester: 1, domain: "Topologie & Calcul Différentiel" },
          { id: "l3-l02", number: 2, title: "Théorie de la Mesure et Intégration de Lebesgue sur ℝⁿ", hours: 35, trimester: 1, domain: "Topologie & Calcul Différentiel" },
          { id: "l3-l03", number: 3, title: "Espaces de Banach, Espaces de Hilbert et Théorème de Riesz", hours: 30, trimester: 1, domain: "Topologie & Calcul Différentiel" },
          { id: "l3-l04", number: 4, title: "Théorie des Groupes, Anneaux, Idéaux et Corps finis", hours: 32, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "l3-l05", number: 5, title: "Analyse complexe, Théorème de Cauchy et Calcul des résidus", hours: 28, trimester: 2, domain: "Analyse & Fonctions" },
          { id: "l3-l06", number: 6, title: "Probabilités continues, Espérances conditionnelles et Martingales", hours: 26, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "l3-l07", number: 7, title: "Géométrie différentielle élémentaire et Sous-variétés de ℝⁿ", hours: 25, trimester: 3, domain: "Physique-Mathématiques" }
        ]
      },
      {
        id: "m2-agreg",
        label: "Master 2 / Agrégation",
        fullName: "Master 2 Recherche, CAPES & Agrégation de Mathématiques",
        cycle: "superieur",
        annualHours: 280,
        weeklyHours: 10,
        lessons: [
          { id: "m2-l01", number: 1, title: "Analyse fonctionnelle avancée et Théorie des Distributions de Laurent Schwartz", hours: 35, trimester: 1, domain: "Topologie & Calcul Différentiel" },
          { id: "m2-l02", number: 2, title: "Équations aux Dérivées Partielles (EDP linéaires, Problèmes elliptiques & Sobolev)", hours: 35, trimester: 1, domain: "Analyse & Fonctions" },
          { id: "m2-l03", number: 3, title: "Géométrie riemannienne, Connexions et Formule de Gauss-Bonnet", hours: 30, trimester: 2, domain: "Physique-Mathématiques" },
          { id: "m2-l04", number: 4, title: "Algèbre commutative, Modules de type fini et Théorie de Galois", hours: 32, trimester: 2, domain: "Arithmétique & Algèbre" },
          { id: "m2-l05", number: 5, title: "Processus stochastiques, Mouvement Brownien et Calcul d'Itô", hours: 30, trimester: 3, domain: "Probabilités & Statistiques" },
          { id: "m2-l06", number: 6, title: "Optimisation convexe, Analyse numérique matricielle et Éléments finis", hours: 28, trimester: 3, domain: "Physique-Mathématiques" }
        ]
      }
    ]
  }
];

// Fonctions d'accès aux référentiels
function getGradeLevelsByCycle(cycleId) {
  const cycle = OFFICIAL_CURRICULUM.find(c => c.id === cycleId);
  return cycle ? cycle.grades : [];
}

function getLessonsByGrade(cycleId, gradeId) {
  const grades = getGradeLevelsByCycle(cycleId);
  const grade = grades.find(g => g.id === gradeId || g.label.toLowerCase() === (gradeId || "").toLowerCase());
  return grade ? grade.lessons : [];
}

function findLessonById(lessonId) {
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

// 20 Documents Officiels Répertoriés (5 Primaire, 5 Collège, 5 Lycée, 5 Supérieur)
const INITIAL_MATEX_DOCUMENTS = [
  // --- PRIMAIRE ---
  {
    id: "doc-pri-01",
    title: "Sujet Officiel & Corrigé Détaillé - Concours National d'Excellence Primaire (CM2)",
    cycle: "primaire",
    classe: "Cours Moyen 2ème Année (CM2)",
    chapter: "7. Pourcentages, Partages proportionnels & Périmètres",
    lessonId: "cm2-l07",
    lessonTitle: "Leçon 7 : Pourcentages, partages proportionnels et vitesse moyenne",
    domain: "Éveil & Numération",
    type: "concours",
    author: {
      name: "Inspecteur K. Kouassi",
      role: "Conseiller Pédagogique du Primaire",
      institution: "DRENA Abidjan 1",
      verifiedTeacher: true
    },
    date: "2026-05-14",
    viewsCount: 1420,
    pages: 2,
    description: "Épreuves types du concours national d'excellence pour les élèves de CM2. Problèmes à étapes, cryptarithmes et calculs de périmètres/surfaces composés.",
    sampleMathPreview: `P = 2 \\times (L + l) = 360\\text{ m} \\implies \\mathcal{A} = 90\\text{ m} \\times 60\\text{ m} = 5400\\text{ m}^2`,
    latexContent: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[french]{babel}
\\usepackage{amsmath,amssymb}
\\usepackage{geometry}
\\geometry{a4paper, margin=2cm}

\\title{\\textbf{Concours National d'Excellence Mathématique - Session Primaire CM2}}
\\author{Commission Nationale des Mathématiques - MATEX}
\\date{Épreuve de 2 heures}

\\begin{document}
\\maketitle

\\section*{Partie I : Énigmes et Logique Numérique (8 points)}
\\textbf{Exercice 1 :} Trouver le nombre mystère à trois chiffres $N = \\overline{abc}$ tel que :
\\begin{enumerate}
    \\item La somme de ses chiffres vaut $a + b + c = 18$.
    \\item Le chiffre des unités $c$ est le double du chiffre des centaines $a$.
    \\item $N$ est un multiple de 9 et de 2.
\\end{enumerate}

\\section*{Partie II : Géométrie et Mesure de Grandeurs (6 points)}
Un champ rectangulaire a pour périmètre $P = 360\\text{ m}$. La longueur $L$ dépasse la largeur $l$ de $30\\text{ m}$.
\\begin{enumerate}
    \\item Calculer le demi-périmètre du champ : $\\frac{P}{2} = L + l$.
    \\item Déterminer la longueur $L$ et la largeur $l$.
    \\item En déduire l'aire $\\mathcal{A} = L \\times l$ en mètres carrés, puis en hectares.
\\end{enumerate}

\\section*{Partie III : Grand Problème de Partage Proportionnel (6 points)}
Trois coopératives scolaires $A, B$ et $C$ se partagent une subvention de $1\\,200\\,000\\text{ FCFA}$ proportionnellement au nombre d'élèves : 120, 180 et 300 élèves. Calculer la part exacte de chaque coopérative.

\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true,
    isNationalContest: true
  },
  {
    id: "doc-pri-02",
    title: "Fiche Complète d'Exercices : Les Fractions Simples, Conversions et Partages Équitables",
    cycle: "primaire",
    classe: "Cours Moyen 1ère Année (CM1)",
    chapter: "2. Fractions simples (demis, tiers, quarts, dixièmes)",
    lessonId: "cm1-l02",
    lessonTitle: "Leçon 2 : Fractions simples (demis, tiers, quarts, dixièmes)",
    domain: "Éveil & Numération",
    type: "exercices",
    author: {
      name: "Mme G. Akissi",
      role: "Institutrice Principale",
      institution: "EPP Plateau Abidjan",
      verifiedTeacher: true
    },
    date: "2026-04-10",
    viewsCount: 890,
    pages: 2,
    description: "Fiche d'activités illustrées en LaTeX pour manipuler les demis, tiers, quarts, dixièmes et centièmes à travers des situations concrètes.",
    sampleMathPreview: `\\frac{1}{2} + \\frac{1}{4} = \\frac{3}{4} \\quad ; \\quad 1\\text{ L} = 100\\text{ cL}`,
    latexContent: `\\documentclass[12pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Fiche d'entraînement : Découverte et Manipulation des Fractions}
\\maketitle
\\section*{Exercice 1 : Coloriage et repérage}
Écrire la fraction correspondant à la partie ombrée : $\\frac{1}{2}$, $\\frac{3}{4}$, $\\frac{2}{5}$.
\\section*{Exercice 2 : Partage d'un gâteau familial}
Un gâteau pèse $1200\\text{ g}$. Maman en donne $\\frac{1}{4}$ à Koffi et $\\frac{1}{3}$ à Awa.
1. Combien de grammes reçoit chaque enfant ?
2. Quelle fraction du gâteau reste-t-il pour les parents ?
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-pri-03",
    title: "Cours & Activités Pratiques : Périmètres, Aires du Rectangle, Carré et Triangle",
    cycle: "primaire",
    classe: "Cours Moyen 1ère Année (CM1)",
    chapter: "5. Calcul d'aires : carré et rectangle",
    lessonId: "cm1-l05",
    lessonTitle: "Leçon 5 : Calcul d'aires : carré et rectangle",
    domain: "Géométrie & Trigonométrie",
    type: "cours",
    author: {
      name: "M. M. Bamba",
      role: "Directeur d'École Primaire",
      institution: "Groupe Scolaire Cocody Anono",
      verifiedTeacher: true
    },
    date: "2026-03-25",
    viewsCount: 1120,
    pages: 2,
    description: "Fiche de cours structurée avec formules géométriques usuelles, conversions en hectares ($1\\text{ ha} = 10\\,000\\text{ m}^2$) et exercices d'application.",
    sampleMathPreview: `\\mathcal{A}_{\\text{rectangle}} = L \\times l \\quad ; \\quad \\mathcal{A}_{\\text{triangle}} = \\frac{B \\times h}{2} \\quad ; \\quad 1\\text{ ha} = 10\\,000\\text{ m}^2`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Fiche Mémo : Formules de Périmètres et d'Aires}
\\maketitle
\\section*{1. Le Carré et le Rectangle}
Périmètre du carré : $P = 4 \\times c$ ; Aire : $\\mathcal{A} = c \\times c$.\\\\
Périmètre du rectangle : $P = 2 \\times (L + l)$ ; Aire : $\\mathcal{A} = L \\times l$.
\\section*{2. Le Triangle}
Aire du triangle : $\\mathcal{A} = \\frac{\\text{Base} \\times \\text{hauteur}}{2}$.
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-pri-04",
    title: "Évaluation Mensuelle N°2 : Numération des Grands Nombres, Décimaux et 4 Opérations",
    cycle: "primaire",
    classe: "Cours Moyen 2ème Année (CM2)",
    chapter: "1. Nombres entiers naturels jusqu'au milliard",
    lessonId: "cm2-l01",
    lessonTitle: "Leçon 1 : Nombres entiers naturels jusqu'au milliard",
    domain: "Éveil & Numération",
    type: "devoir",
    author: {
      name: "Mme S. Konaté",
      role: "Conseillère Pédagogique",
      institution: "Inspection Primaire Yopougon Est",
      verifiedTeacher: true
    },
    date: "2026-02-14",
    viewsCount: 970,
    pages: 2,
    description: "Devoir sur table prêt à l'emploi pour tester la maîtrise des grands entiers, les opérations posées avec virgule et la résolution de mini-problèmes financiers.",
    sampleMathPreview: `345\\,678 + 98\\,765 = 444\\,443 \\quad ; \\quad 125{,}75 \\times 24 = 3\\,018`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Évaluation Mensuelle N°2 - CM2}
\\maketitle
\\section*{Opérations (6 pts)}
Poser et effectuer :
1. $748\\,925 + 189\\,408$
2. $905{,}40 - 328{,}85$
3. $458 \\times 207$
4. $5\\,688 : 24$
\\section*{Problème du Marché (8 pts)}
Un commerçant achète 15 sacs de riz à 18 500 FCFA le sac...
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-pri-05",
    title: "Manuel Officiel & Recueil d'Énigmes : Logique & Grandeurs Mathématiques au Primaire",
    cycle: "primaire",
    classe: "Cours Moyen 2ème Année (CM2)",
    chapter: "4. Calcul d'aires : carré, rectangle, triangle et trapèze",
    lessonId: "cm2-l04",
    lessonTitle: "Leçon 4 : Calcul d'aires : carré, rectangle, triangle et trapèze",
    domain: "Éveil & Numération",
    type: "livre_manuel",
    author: {
      name: "Collectif MATEX Primaire",
      role: "Formateurs Pédagogiques",
      institution: "Association MATEX Côte d'Ivoire",
      verifiedTeacher: true
    },
    date: "2026-05-20",
    viewsCount: 1680,
    pages: 2,
    description: "Recueil de 15 énigmes progressives pour stimuler le raisonnement logique, les suites numériques et la visualisation spatiale dès l'école primaire.",
    sampleMathPreview: `u_n = 2, 5, 10, 17, 26, \\dots \\implies u_n = n^2 + 1`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Concours du Jeune Mathématicien - Épreuve Logique}
\\maketitle
\\section*{Énigme 1 : Les carrés magiques}
Compléter la grille $3 \\times 3$ pour que la somme de chaque ligne, colonne et diagonale soit égale à 34.
\\section*{Énigme 2 : La balance à deux plateaux}
Avec 3 pesées seulement sur une balance Roberval, retrouver la bille la plus lourde parmi 9 billes d'aspect identique.
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true,
    isNationalContest: true
  },

  // --- COLLÈGE ---
  {
    id: "doc-col-01",
    title: "Olympiades Nationales de Mathématiques - 1er Cycle (Classe de 3ème)",
    cycle: "college",
    classe: "Classe de 3ème",
    chapter: "3. Racines carrées",
    lessonId: "3e-l03",
    lessonTitle: "Leçon 3 : Racines carrées",
    domain: "Arithmétique & Algèbre",
    type: "concours",
    author: {
      name: "Prof. Y. Koffi & C. Bamba",
      role: "Professeurs Certifiés de Mathématiques",
      institution: "Lycée Classique d'Abidjan",
      verifiedTeacher: true
    },
    date: "2026-04-20",
    viewsCount: 2310,
    pages: 3,
    description: "Sujet officiel des Olympiades du 1er cycle. Démonstrations géométriques fines, calculs de radicaux imbriqués et résolutions d'équations diophantiennes simples.",
    sampleMathPreview: `\\sqrt{7 + 4\\sqrt{3}} = 2 + \\sqrt{3} \\quad \\text{et} \\quad \\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}`,
    latexContent: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[french]{babel}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{geometry}
\\geometry{a4paper, margin=2cm}

\\title{\\textbf{Olympiades Nationales de Mathématiques - 1er Cycle (3ème)}}
\\author{Société Mathématique de Côte d'Ivoire & MATEX}
\\date{Durée : 3 heures - Coefficient : 5}

\\begin{document}
\\maketitle

\\section*{Exercice 1 : Algèbre & Radicaux Imbriqués (5 points)}
1. Montrer que $(2 + \\sqrt{3})^2 = 7 + 4\\sqrt{3}$. En déduire l'écriture simplifiée de $\\sqrt{7 + 4\\sqrt{3}} - \\sqrt{7 - 4\\sqrt{3}}$.
2. Résoudre dans $\\mathbb{R}$ l'équation : $\\sqrt{x + 3} + \\sqrt{x - 2} = 5$.
3. Soit $n$ un entier naturel. Démontrer que le nombre $A = n(n+1)(n+2)(n+3) + 1$ est un carré parfait.

\\section*{Exercice 2 : Géométrie Plane et Puissance d'un Point (5 points)}
Soit un triangle $ABC$ rectangle en $A$ tel que $AB = 6\\text{ cm}$ et $AC = 8\\text{ cm}$. Soit $H$ le pied de la hauteur issue de $A$.
1. Calculer $BC$, puis $AH, BH$ et $CH$.
2. Soit $(C)$ le cercle de diamètre $[AH]$. Il coupe $[AB]$ en $M$ et $[AC]$ en $N$. Démontrer que le quadrilatère $AMHN$ est un rectangle.
3. Calculer la longueur $MN$.

\\section*{Problème : Arithmétique et Optimisation (10 points)}
Déterminer tous les couples d'entiers naturels non nuls $(x, y)$ vérifiant l'égalité :
\\[ \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{6} \\]

\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true,
    isNationalContest: true
  },
  {
    id: "doc-col-02",
    title: "Devoir Surveillé N°3 : Théorème de Pythagore, Réciproque et Trigonométrie dans le Triangle Rectangle",
    cycle: "college",
    classe: "Classe de 3ème",
    chapter: "4. Triangle rectangle : Propriété de Pythagore et Trigonométrie",
    lessonId: "3e-l04",
    lessonTitle: "Leçon 4 : Triangle rectangle : Propriété de Pythagore et Trigonométrie",
    domain: "Géométrie & Trigonométrie",
    type: "devoir",
    author: {
      name: "M. S. Traoré",
      role: "Professeur de Collège",
      institution: "Collège Moderne de Cocody",
      verifiedTeacher: true
    },
    date: "2026-03-12",
    viewsCount: 1650,
    pages: 2,
    description: "Épreuve d'évaluation sommative type BEPC avec barème détaillé, schémas vectoriels et calculs d'angles au degré près.",
    sampleMathPreview: `\\cos^2(\\widehat{B}) + \\sin^2(\\widehat{B}) = 1 \\quad ; \\quad \\tan(\\widehat{B}) = \\frac{\\sin(\\widehat{B})}{\\cos(\\widehat{B})} = \\frac{AC}{AB}`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Devoir Surveillé N°3 : Trigonométrie et Géométrie}
\\maketitle
\\section*{Exercice 1 (6 points)}
Dans un triangle $ABC$ rectangle en $A$, on donne $AB = 4\\text{ cm}$ et $BC = 8\\text{ cm}$.
1. Calculer la valeur exacte de $AC$.
2. Déterminer $\\cos(\\widehat{ABC})$, $\\sin(\\widehat{ABC})$ et $\\tan(\\widehat{ABC})$.
3. En déduire la mesure de l'angle $\\widehat{ABC}$ en degrés.
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-col-03",
    title: "Cours & Fiche d'Entraînement : Calcul Littéral, Identités Remarquables et Factorisations",
    cycle: "college",
    classe: "Classe de 3ème",
    chapter: "1. Calcul littéral (Développement, Factorisation, Identités remarquables)",
    lessonId: "3e-l01",
    lessonTitle: "Leçon 1 : Calcul littéral (Développement, Factorisation, Identités remarquables)",
    domain: "Arithmétique & Algèbre",
    type: "cours",
    author: {
      name: "Mme F. Diallo",
      role: "Professeure de Mathématiques",
      institution: "Lycée Sainte-Marie de Cocody",
      verifiedTeacher: true
    },
    date: "2026-01-22",
    viewsCount: 1980,
    pages: 3,
    description: "Polycopié complet avec les 3 identités remarquables $(a+b)^2$, $(a-b)^2$, $(a-b)(a+b)$, méthode du facteur commun et 30 expressions progressives à factoriser.",
    sampleMathPreview: `(a+b)^2 = a^2 + 2ab + b^2 \\quad ; \\quad (a-b)(a+b) = a^2 - b^2`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Cours : Calcul Littéral et Identités Remarquables}
\\maketitle
\\section*{Les Trois Identités Remarquables Fondamentales}
Pour tous réels $a$ et $b$ :
\\begin{align*}
(a + b)^2 &= a^2 + 2ab + b^2 \\\\
(a - b)^2 &= a^2 - 2ab + b^2 \\\\
(a - b)(a + b) &= a^2 - b^2
\\end{align*}
\\section*{Exemples de factorisation}
$E = 4x^2 - 9 = (2x - 3)(2x + 3)$.\\\\
$F = (2x + 1)^2 - (x - 3)^2 = [(2x+1)-(x-3)][(2x+1)+(x-3)] = (x+4)(3x-2)$.
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-col-04",
    title: "BEPC Blanc Régional : Épreuve Complète Conforme au Format Officiel & Corrigé",
    cycle: "college",
    classe: "Classe de 3ème",
    chapter: "2. Propriétés de Thalès dans un triangle",
    lessonId: "3e-l02",
    lessonTitle: "Leçon 2 : Propriétés de Thalès dans un triangle",
    domain: "Géométrie & Trigonométrie",
    type: "examen_blanc",
    author: {
      name: "Unité Pédagogique Régionale",
      role: "Professeurs Coordinateurs BEPC",
      institution: "DRENA Yamoussoukro",
      verifiedTeacher: true
    },
    date: "2026-04-18",
    viewsCount: 2750,
    pages: 3,
    description: "Sujet officiel d'examen blanc régional avec 4 exercices structurés : calcul numérique, configuration de Thalès, statistiques et problème concret avec cône de révolution.",
    sampleMathPreview: `V = \\frac{1}{3} \\pi R^2 h \\quad ; \\quad \\begin{cases} 2x + 3y = 4500 \\\\ x + 2y = 2600 \\end{cases}`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Examen Blanc Régional du BEPC - Épreuve de Mathématiques}
\\maketitle
\\section*{Exercice 1 : Calculs Numériques (4 pts)}
On donne $A = \\frac{7}{3} - \\frac{2}{3} \\times \\frac{5}{4}$ et $B = \\sqrt{48} - 3\\sqrt{12} + 2\\sqrt{75}$.
1. Écrire $A$ sous forme d'une fraction irréductible.
2. Écrire $B$ sous la forme $a\\sqrt{3}$ où $a$ est un entier relatif.
\\section*{Exercice 2 : Système Linéaire (4 pts)}
Résoudre dans $\\mathbb{R}^2$ le système :
\\[ \\begin{cases} 2x + 3y = 4500 \\\\ x + 2y = 2600 \\end{cases} \\]
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-col-05",
    title: "Série d'Exercices Olympiques : Arithmétique des Entiers, PGCD, PPCM & Nombres Premiers",
    cycle: "college",
    classe: "Classe de 5ème",
    chapter: "1. Nombres premiers et décomposition en facteurs premiers",
    lessonId: "5e-l01",
    lessonTitle: "Leçon 1 : Nombres premiers et décomposition en facteurs premiers",
    domain: "Arithmétique & Algèbre",
    type: "exercices",
    author: {
      name: "M. O. Coulibaly",
      role: "Professeur Titulaire",
      institution: "Lycée Moderne de Korhogo",
      verifiedTeacher: true
    },
    date: "2026-03-05",
    viewsCount: 1430,
    pages: 2,
    description: "Fiche d'entraînement intensif sur l'arithmétique fondamentale du 1er cycle : algorithme des soustractions successives, algorithme d'Euclide et problèmes de carrelage/paquets.",
    sampleMathPreview: `\\text{PGCD}(a,b) \\times \\text{PPCM}(a,b) = a \\times b \\quad ; \\quad 1764 = 2^2 \\times 3^2 \\times 7^2`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Fiche d'Exercices : Arithmétique & Algorithme d'Euclide}
\\maketitle
\\section*{Exercice 1}
1. Décomposer en produit de facteurs premiers les nombres 168 et 252.
2. En déduire leur PGCD et leur PPCM.
3. Rendre irréductible la fraction $\\frac{168}{252}$.
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },

  // --- LYCÉE ---
  {
    id: "doc-lyc-01",
    title: "Concours Général National de Mathématiques - Épreuve d'Élite (Terminale C/E)",
    cycle: "lycee",
    classe: "Terminale C",
    chapter: "14. Calcul intégral et primitives",
    lessonId: "tc-l14",
    lessonTitle: "Leçon 14 : Calcul intégral et primitives",
    domain: "Analyse & Fonctions",
    type: "concours",
    author: {
      name: "Dr. N'Guessan & Équipe MATEX",
      role: "Inspecteurs Généraux & Rédacteurs",
      institution: "Commission Nationale des Programmes",
      verifiedTeacher: true
    },
    date: "2026-05-02",
    viewsCount: 3890,
    pages: 4,
    description: "L'épreuve la plus prestigieuse du secondaire ivoirien. Étude fine des intégrales de Wallis $W_n = \\int_0^{\\frac{\\pi}{2}} \\sin^n(t)\\,dt$, formule de Stirling et approximation de $\\pi$.",
    sampleMathPreview: `W_n = \\int_0^{\\frac{\\pi}{2}} \\sin^n(t)\\,dt \\implies W_n = \\frac{n-1}{n} W_{n-2} \\quad \\text{et} \\quad \\lim_{n\\to\\infty} n W_n W_{n-1} = \\frac{\\pi}{2}`,
    latexContent: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[french]{babel}
\\usepackage{amsmath,amssymb,amsthm}
\\usepackage{geometry}
\\geometry{a4paper, margin=2cm}

\\title{\\textbf{Concours Général National de Mathématiques - Session 2026}}
\\author{Épreuve de Terminale C et E}
\\date{Durée : 4 heures - Coefficient : 8}

\\begin{document}
\\maketitle

\\section*{Problème I : Les Intégrales de Wallis et le Produit de Wallis (10 points)}
Pour tout entier naturel $n$, on pose :
\\[ W_n = \\int_0^{\\frac{\\pi}{2}} \\sin^n(t)\\,dt \\]
\\begin{enumerate}
    \\item Calculer $W_0$ et $W_1$.
    \\item À l'aide d'une intégration par parties, établir la relation de récurrence pour tout $n \\ge 2$ :
    \\[ W_n = \\frac{n-1}{n} W_{n-2} \\]
    \\item En déduire les expressions explicites de $W_{2p}$ et $W_{2p+1}$ en fonction des factorielles.
    \\item Montrer que la suite $(W_n)$ est strictement décroissante et strictement positive.
    \\item Démontrer que pour tout $n \\ge 1$ : $n W_n W_{n-1} = \\frac{\\pi}{2}$.
    \\item Établir la formule célèbre de Wallis :
    \\[ \\lim_{p\\to+\\infty} \\frac{1}{p} \\left( \\frac{2 \\cdot 4 \\cdot 6 \\dots (2p)}{1 \\cdot 3 \\cdot 5 \\dots (2p-1)} \\right)^2 = \\pi \\]
\\end{enumerate}

\\section*{Problème II : Nombres Complexes et Géométrie de Ptolémée (10 points)}
Soit $A, B, C, D$ quatre points d'affixes respectives $a, b, c, d$ situés sur un cercle trigonométrique de centre $O$.
\\begin{enumerate}
    \\item Exprimer le birapport $(a, b, c, d) = \\frac{(c-a)(d-b)}{(c-b)(d-a)}$ et montrer qu'il est réel.
    \\item Démontrer le théorème de Ptolémée : $AC \\cdot BD = AB \\cdot CD + BC \\cdot AD$.
\\end{enumerate}

\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true,
    isNationalContest: true
  },
  {
    id: "doc-lyc-02",
    title: "Cours Magistral : Géométrie Vectorielle dans l'Espace et Systèmes d'Équations",
    cycle: "lycee",
    classe: "1ère C",
    chapter: "16. Vecteurs de l’espace et repérage",
    lessonId: "1c-l16",
    lessonTitle: "Leçon 16 : Vecteurs de l’espace et repérage",
    domain: "Géométrie & Trigonométrie",
    type: "cours",
    author: {
      name: "Prof. Amadou Koné",
      role: "Professeur Agrégé de Mathématiques",
      institution: "Lycée Scientifique de Yamoussoukro",
      verifiedTeacher: true
    },
    date: "2026-02-18",
    viewsCount: 2840,
    pages: 3,
    description: "Polycopié complet et rigoureux avec définitions des repères cartésiens de l'espace, coplanarité, produit scalaire et équations de plans et droites.",
    sampleMathPreview: `\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz' \\quad ; \\quad ax + by + cz + d = 0`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Cours : Géométrie Vectorielle dans l'Espace}
\\maketitle
\\section{Équation cartésienne d'un plan}
Soit $\\mathcal{P}$ un plan de vecteur normal $\\vec{n}(a, b, c)$ non nul passant par $A(x_0, y_0, z_0)$.
Une équation cartésienne de $\\mathcal{P}$ s'écrit :
\\[ a(x - x_0) + b(y - y_0) + c(z - z_0) = 0 \\iff ax + by + cz + d = 0 \\]
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-lyc-03",
    title: "Baccalauréat Blanc Régional : Épreuve Type Complète & Barème Officiel (Série D)",
    cycle: "lycee",
    classe: "Terminale D",
    chapter: "6. Fonctions exponentielles et fonctions puissances",
    lessonId: "td-l06",
    lessonTitle: "Leçon 6 : Fonctions exponentielles et fonctions puissances",
    domain: "Analyse & Fonctions",
    type: "examen_blanc",
    author: {
      name: "Coordination Pédagogique Régionale",
      role: "Inspecteurs Pédagogiques",
      institution: "DRENA Bouaké 2",
      verifiedTeacher: true
    },
    date: "2026-04-05",
    viewsCount: 3120,
    pages: 3,
    description: "Épreuve type Baccalauréat pour la série D avec arbre de probabilité, étude de fonction exponentielle avec asymptote oblique et calcul d'aire intégrale.",
    sampleMathPreview: `f(x) = (2x - 1)e^{-x} + 1 \\quad ; \\quad \\mathcal{A} = \\int_0^2 |f(x) - 1|\\,dx \\text{ u.a.}`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Baccalauréat Blanc Régional - Série D}
\\maketitle
\\section*{Exercice 1 : Probabilités (4 points)}
Dans une population, 40\\% des individus sont vaccinés contre une maladie...
\\section*{Problème : Étude d'une fonction exponentielle (11 points)}
Soit $f$ la fonction définie sur $\\mathbb{R}$ par $f(x) = (2x-1)e^{-x} + 1$.
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-lyc-04",
    title: "Devoir Surveillé : Nombres Complexes, Trigonométrie & Géométrie des Transformations du Plan",
    cycle: "lycee",
    classe: "Terminale C",
    chapter: "10. Nombres complexes (Forme trigonométrique, Forme exponentielle)",
    lessonId: "tc-l10",
    lessonTitle: "Leçon 10 : Nombres complexes (Forme trigonométrique, Forme exponentielle)",
    domain: "Arithmétique & Algèbre",
    type: "devoir",
    author: {
      name: "M. P. N'Dri",
      role: "Professeur Principal de Terminale",
      institution: "Lycée Garçons de Bingerville",
      verifiedTeacher: true
    },
    date: "2026-03-10",
    viewsCount: 2210,
    pages: 3,
    description: "Épreuve complète portant sur les résolutions d'équations dans $\\mathbb{C}$, forme trigonométrique/exponentielle, formules d'Euler et de Moivre, et caractérisation géométrique des similitudes $z' = az + b$.",
    sampleMathPreview: `e^{i\\theta} = \\cos\\theta + i\\sin\\theta \\quad ; \\quad z' - \\omega = k e^{i\\alpha}(z - \\omega)`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Devoir Surveillé : Nombres Complexes et Similitudes Directes}
\\maketitle
\\section*{Exercice 1 : Équations dans $\\mathbb{C}$ (5 points)}
1. Résoudre dans $\\mathbb{C}$ l'équation : $z^2 - 2\\sqrt{3}z + 4 = 0$.
2. Écrire les solutions sous forme trigonométrique et exponentielle.
\\section*{Exercice 2 : Similitudes Directes (7 points)}
Soit l'application $S$ du plan qui à tout point $M(z)$ associe $M'(z')$ tel que :
\\[ z' = (1 + i\\sqrt{3})z + 2 - 2i\\sqrt{3} \\]
Déterminer le centre $\\Omega$, le rapport $k$ et l'angle $\\theta$ de cette similitude.
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-lyc-05",
    title: "Polycopié de Cours & Annales Corrigées : Équations Différentielles Linéaires du 1er et 2nd Ordre",
    cycle: "lycee",
    classe: "Terminale C",
    chapter: "19. Équations différentielles",
    lessonId: "tc-l19",
    lessonTitle: "Leçon 19 : Équations différentielles",
    domain: "Analyse & Fonctions",
    type: "cours",
    author: {
      name: "Prof. T. Gondo",
      role: "Professeur Agrégé de Lycée",
      institution: "Lycée Moderne d'Abobo",
      verifiedTeacher: true
    },
    date: "2026-02-28",
    viewsCount: 1890,
    pages: 3,
    description: "Guide méthodologique détaillé pour résoudre les équations différentielles homogènes et avec second membre, équation caractéristique (racines réelles et complexes) et applications à la radioactivité / circuits RLC.",
    sampleMathPreview: `ay'' + by' + cy = 0 \\implies r^2 + \\frac{b}{a}r + \\frac{c}{a} = 0 \\quad ; \\quad y(t) = e^{\\alpha t}(A\\cos\\beta t + B\\sin\\beta t)`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Cours et Méthodes : Équations Différentielles du Second Ordre}
\\maketitle
\\section{Équation homogène $ay'' + by' + cy = 0$}
Soit l'équation caractéristique $ar^2 + br + c = 0$ de discriminant $\\Delta = b^2 - 4ac$.
\\begin{itemize}
    \\item Si $\\Delta > 0$ : deux racines réelles $r_1, r_2$, solutions $y(t) = C_1 e^{r_1 t} + C_2 e^{r_2 t}$.
    \\item Si $\\Delta = 0$ : une racine double $r_0$, solutions $y(t) = (C_1 t + C_2)e^{r_0 t}$.
    \\item Si $\\Delta < 0$ : racines complexes $\\alpha \\pm i\\beta$, solutions $y(t) = e^{\\alpha t}(C_1 \\cos\\beta t + C_2 \\sin\\beta t)$.
\\end{itemize}
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },

  // --- SUPÉRIEUR & RECHERCHE ---
  {
    id: "doc-sup-01",
    title: "Polycopié de Cours & Exercices Corrigés : Topologie des Espaces Métriques et Espaces de Banach",
    cycle: "superieur",
    classe: "Licence 3 / M1",
    chapter: "3. Espaces de Banach, Espaces de Hilbert & Dualité",
    lessonId: "l3-l03",
    lessonTitle: "Leçon 3 : Espaces de Banach, Espaces de Hilbert & Dualité",
    domain: "Topologie & Calcul Différentiel",
    type: "cours",
    author: {
      name: "Prof. S. Touré & Dr. K. Yao",
      role: "Professeurs Titulaires de Chaire",
      institution: "Université Félix Houphouët-Boigny",
      verifiedTeacher: true
    },
    date: "2026-01-30",
    viewsCount: 4500,
    pages: 5,
    description: "Polycopié de référence pour les étudiants de Licence 3 et Master 1. Espaces complets, compacité séquentielle (Bolzano-Weierstrass) et applications aux EDO.",
    sampleMathPreview: `d(x, y) = 0 \\iff x = y \\quad ; \\quad T(x) = x \\implies d(T^n(x_0), x^*) \\le \\frac{k^n}{1-k} d(x_1, x_0)`,
    latexContent: `\\documentclass[12pt,a4paper]{book}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath,amssymb,amsthm}
\\usepackage{geometry}
\\geometry{a4paper, margin=2.5cm}

\\title{\\textbf{Topologie Générale et Analyse Fonctionnelle}}
\\author{Département de Mathématiques et Informatique - UFHB}
\\date{Niveau Master 1}

\\begin{document}
\\maketitle

\\chapter{Espaces Métriques Complets et Théorème de Banach-Picard}

\\section{Définitions Fondamentales}
Soit $(E, d)$ un espace métrique. Une suite $(x_n)_{n \\in \\mathbb{N}}$ est dite de Cauchy si :
\\[ \\forall \\varepsilon > 0, \\quad \\exists N \\in \\mathbb{N}, \\quad \\forall p, q \\ge N, \\quad d(x_p, x_q) < \\varepsilon \\]
L'espace $(E, d)$ est dit complet si toute suite de Cauchy converge dans $E$.

\\section{Théorème du Point Fixe de Banach}
\\begin{theorem}
Soit $(E, d)$ un espace métrique complet non vide et $f : E \\to E$ une application strictement contractante, c'est-à-dire qu'il existe $k \\in [0, 1[$ tel que :
\\[ \\forall x, y \\in E, \\quad d(f(x), f(y)) \\le k \\cdot d(x, y) \\]
Alors $f$ admet un unique point fixe $x^* \\in E$. De plus, pour tout $x_0 \\in E$, la suite définie par $x_{n+1} = f(x_n)$ converge vers $x^*$ avec l'estimation de vitesse :
\\[ d(x_n, x^*) \\le \\frac{k^n}{1 - k} d(x_0, x_1) \\]
\\end{theorem}

\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-sup-02",
    title: "Sujet du Concours d'Entrée aux Écoles d'Ingénieurs (Option MP / PSI) - Mathématiques 1",
    cycle: "superieur",
    classe: "Licence 2 / MP",
    chapter: "2. Réduction des endomorphismes (Diagonalisation, Trigonalisation)",
    lessonId: "l2-l02",
    lessonTitle: "Leçon 2 : Réduction des endomorphismes (Diagonalisation, Trigonalisation)",
    domain: "Algèbre Linéaire",
    type: "concours",
    author: {
      name: "Comité des Concours INP-HB",
      role: "Membres du Jury",
      institution: "INP-HB Yamoussoukro",
      verifiedTeacher: true
    },
    date: "2026-05-18",
    viewsCount: 2980,
    pages: 4,
    description: "Épreuve majeure de mathématiques pour l'admission aux grandes écoles d'ingénieurs. Matrices symétriques réelles, théorème spectral et exponentielle de matrice.",
    sampleMathPreview: `\\exp(A) = \\sum_{k=0}^{+\\infty} \\frac{A^k}{k!} \\quad ; \\quad \\det(\\exp(A)) = e^{\\text{Tr}(A)}`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Concours d'Ingénieurs INP-HB - Épreuve de Mathématiques 1}
\\maketitle
\\section*{Problème : Exponentielle d'Endomorphisme et Systèmes Différentiels}
Soit $E$ un espace vectoriel de dimension $n$ sur $\\mathbb{R}$ ou $\\mathbb{C}$.
1. Démontrer que la série $\\sum_{k=0}^\\infty \\frac{A^k}{k!}$ converge pour toute matrice $A \\in \\mathcal{M}_n(\\mathbb{K})$.
2. Montrer que si $A$ et $B$ commutent ($AB = BA$), alors $\\exp(A+B) = \\exp(A)\\exp(B)$.
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true,
    isNationalContest: true
  },
  {
    id: "doc-sup-03",
    title: "Polycopié de Cours Magistral : Théorie de la Mesure et Intégration de Lebesgue",
    cycle: "superieur",
    classe: "Licence 3 / M1",
    chapter: "2. Théorie de la Mesure et Intégration de Lebesgue ($L^p$)",
    lessonId: "l3-l02",
    lessonTitle: "Leçon 2 : Théorie de la Mesure et Intégration de Lebesgue ($L^p$)",
    domain: "Topologie & Calcul Différentiel",
    type: "cours",
    author: {
      name: "Prof. J.-B. Ehouman",
      role: "Professeur Titulaire",
      institution: "Université Nangui Abrogoua",
      verifiedTeacher: true
    },
    date: "2026-02-10",
    viewsCount: 3410,
    pages: 4,
    description: "Cours avancé d'analyse réelle : construction de la mesure de Lebesgue sur $\\mathbb{R}^n$, lemme de Fatou, théorème de convergence monotone de Beppo Levi et théorème de convergence dominée de Lebesgue dans les espaces $L^p(\\Omega)$.",
    sampleMathPreview: `\\int_E \\lim_{n\\to\\infty} f_n\\,d\\mu = \\lim_{n\\to\\infty} \\int_E f_n\\,d\\mu \\quad ; \\quad \\|f\\|_{L^p} = \\left(\\int |f|^p\\,d\\mu\\right)^{1/p}`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb,amsthm}
\\begin{document}
\\title{Théorie de la Mesure et Intégration de Lebesgue}
\\maketitle
\\section{Théorème de Convergence Dominée}
Soit $(f_n)$ une suite de fonctions mesurables convergeant simplement presque partout vers $f$.
S'il existe $g \\in L^1(\\mu)$ telle que pour tout $n$, $|f_n| \\le g$ p.p., alors $f \\in L^1(\\mu)$ et :
\\[ \\lim_{n\\to+\\infty} \\int f_n\\,d\\mu = \\int f\\,d\\mu \\]
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-sup-04",
    title: "Examen de Synthèse Semestre 1 : Algèbre Bilinéaire, Formes Quadratiques et Réduction de Jordan",
    cycle: "superieur",
    classe: "Licence 2 / MP",
    chapter: "3. Algèbre bilinéaire, Formes quadratiques & Espaces euclidiens",
    lessonId: "l2-l03",
    lessonTitle: "Leçon 3 : Algèbre bilinéaire, Formes quadratiques & Espaces euclidiens",
    domain: "Algèbre Linéaire",
    type: "devoir",
    author: {
      name: "Dr. M. Sanogo",
      role: "Maître de Conférences",
      institution: "UFR Mathématiques et Informatique - UFHB",
      verifiedTeacher: true
    },
    date: "2026-01-15",
    viewsCount: 2640,
    pages: 3,
    description: "Épreuve semestrielle universitaire d'algèbre bilinéaire : réduction de Gauss de formes quadratiques, orthogonalité au sens d'une forme bilinéaire, loi d'inertie de Sylvester et réduction sous forme normale de Jordan.",
    sampleMathPreview: `q(x) = \\sum_{i=1}^r \\alpha_i l_i(x)^2 - \\sum_{j=1}^s \\beta_j m_j(x)^2 \\implies \\text{sgn}(q) = (r, s)`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb}
\\begin{document}
\\title{Examen d'Algèbre Bilinéaire - Session Normale}
\\maketitle
\\section*{Exercice 1 : Réduction de Gauss (7 pts)}
Soit la forme quadratique définie sur $\\mathbb{R}^3$ par :
\\[ q(x, y, z) = x^2 + 2y^2 + 5z^2 + 2xy - 4xz - 2yz \\]
1. Appliquer l'algorithme de Gauss pour écrire $q$ comme combinaison linéaire de carrés de formes linéaires indépendantes.
2. Déterminer le rang et la signature de $q$. La forme est-elle définie positive ?
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true
  },
  {
    id: "doc-sup-05",
    title: "Concours de Recrutement / CAPES & Agrégation de Mathématiques : Épreuve de Géométrie Différentielle",
    cycle: "superieur",
    classe: "Master 2 / Agrégation",
    chapter: "3. Géométrie riemannienne, Connexions et Formule de Gauss-Bonnet",
    lessonId: "m2-l03",
    lessonTitle: "Leçon 3 : Géométrie riemannienne, Connexions et Formule de Gauss-Bonnet",
    domain: "Physique-Mathématiques",
    type: "concours",
    author: {
      name: "Jury National du CAPES/Agrégation",
      role: "Inspecteurs Généraux & Professeurs d'Université",
      institution: "École Normale Supérieure (ENS) d'Abidjan",
      verifiedTeacher: true
    },
    date: "2026-05-25",
    viewsCount: 3150,
    pages: 4,
    description: "Épreuve de haut niveau pour futurs professeurs agrégés : première et deuxième formes fondamentales des surfaces régulières de $\\mathbb{R}^3$, formule de Brioschi, géodésiques et théorème de Gauss-Bonnet global $\\iint_S K\\,dA = 2\\pi \\chi(S)$.",
    sampleMathPreview: `K = \\frac{LN - M^2}{EG - F^2} \\quad ; \\quad \\iint_M K\\,dA + \\int_{\\partial M} k_g\\,ds = 2\\pi \\chi(M)`,
    latexContent: `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb,amsthm}
\\begin{document}
\\title{Concours de l'Agrégation de Mathématiques - Épreuve 2}
\\maketitle
\\section*{Problème : Courbure Intrinsèque et Formule de Gauss-Bonnet}
Soit $S \\subset \\mathbb{R}^3$ une surface régulière orientée de classe $C^2$.
1. Rappeler les définitions des coefficients de la première forme fondamentale $E, F, G$ et de la seconde forme fondamentale $L, M, N$.
2. Établir le Theorema Egregium de Gauss démontrant que la courbure totale $K$ ne dépend que de la métrique riemannienne induite.
\\end{document}`,
    hasTexSource: true,
    hasDocxSource: true,
    hasPdfSource: true,
    isNationalContest: true
  }
];
