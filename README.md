# MATEX - Bibliothèque Pédagogique & Communauté Nationale des Mathématiques en LaTeX
> Du CP1 au Master 2 & Concours Nationaux (CAPES, Agrégation) - République de Côte d'Ivoire

---

<div align="center">

<!-- BADGES OFFICIELS DU PROJET -->
![Version](https://img.shields.io/badge/Version-3.0.0-blue?style=for-the-badge&logo=semver&logoColor=white)
![Architecture](https://img.shields.io/badge/Stack-Pure%20HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Studio IA](https://img.shields.io/badge/Studio%20IA-Gemini%20Multimodal%20%2B%20pdflatex-8B5CF6?style=for-the-badge&logo=google&logoColor=white)
![Moteur PDF](https://img.shields.io/badge/Rendu%20PDF-Compilation%20Cloud%20Directe-E11D48?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)
![KaTeX Engine](https://img.shields.io/badge/Rendu%20Maths-KaTeX%20Fast%20Engine-319795?style=for-the-badge&logo=latex&logoColor=white)
![Google Workspace](https://img.shields.io/badge/Backend-Google%20Sheets%20(13%20colonnes)%20%26%20Drive-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)
![Programme MENAET](https://img.shields.io/badge/Programme-DPFC%20%2F%20MENAET%202026--2027-FF8C00?style=for-the-badge)
![Formation](https://img.shields.io/badge/Formation%20LaTeX-2e%20Cohorte%20Certifiee-EC4899?style=for-the-badge&logo=mortarboard&logoColor=white)
![Statut](https://img.shields.io/badge/Statut-En%20Ligne%20%26%20Operationnel-10B981?style=for-the-badge&logo=checkmarx&logoColor=white)
![Licence](https://img.shields.io/badge/Licence-Open%20Educational%20Resource%20(OER)-6366F1?style=for-the-badge)

<p align="center">
  <b>Suite pédagogique et typographique complète, autonome, ultra-légère et sans framework dédiée aux enseignants, élèves, étudiants et chercheurs en sciences mathématiques de Côte d'Ivoire.</b>
</p>

[Bibliothèque Numérique](#1-bibliothèque-pédagogique-nationale) | [Studio IA : Photo en Sujet](#2-studio-ia--photo-vers-sujet-latex--pdf-style-overleaf) | [Progressions DPFC 2026-2027](#3-référentiel-officiel-des-progressions-dpfc-2026-2027) | [Formation LaTeX](#4-module-formation-nationale-latex--2e-cohorte) | [Architecture Technique](#5-architecture-technique-du-dépôt) | [Feuille de Route & MAJ Futures](#7-feuille-de-route-des-fonctionnalités-à-venir--mises-à-jour-techniques)

</div>

---

## Sommaire

- [MATEX - Bibliothèque Pédagogique \& Communauté Nationale des Mathématiques en LaTeX](#matex---bibliothèque-pédagogique--communauté-nationale-des-mathématiques-en-latex)
  - [Sommaire](#sommaire)
  - [Présentation Générale de MATEX](#présentation-générale-de-matex)
  - [Fonctionnalités Majeures de la Plateforme](#fonctionnalités-majeures-de-la-plateforme)
    - [1. Bibliothèque Pédagogique Nationale](#1-bibliothèque-pédagogique-nationale)
    - [2. Studio IA : Photo vers Sujet LaTeX \& PDF (Style Overleaf)](#2-studio-ia--photo-vers-sujet-latex--pdf-style-overleaf)
    - [3. Référentiel Officiel des Progressions DPFC 2026-2027](#3-référentiel-officiel-des-progressions-dpfc-2026-2027)
    - [4. Module Formation Nationale LaTeX (2e Cohorte)](#4-module-formation-nationale-latex-2e-cohorte)
    - [5. Passerelle de Solidarité \& Trésorerie](#5-passerelle-de-solidarité--trésorerie)
  - [Architecture Technique du Dépôt](#architecture-technique-du-dépôt)
    - [Fichiers et Rôles](#fichiers-et-rôles)
    - [Structure Stricte Google Sheets (13 Colonnes A à M)](#structure-stricte-google-sheets-13-colonnes-a-à-m)
    - [Mécanismes de Cache et Lazy Loading](#mécanismes-de-cache-et-lazy-loading)
  - [Détail des 3 Gabarits d'Évaluation Homologués](#détail-des-3-gabarits-dévaluation-homologués)
    - [1. Gabarit `interro.tex` (Interrogation Écrite 15-30 min)](#1-gabarit-interrotex-interrogation-écrite-15-30-min)
    - [2. Gabarit `devoir.tex` (Devoir Surveillé / Évaluation Sommative 2h00)](#2-gabarit-devoirtex-devoir-surveillé--évaluation-sommative-2h00)
    - [3. Gabarit `corrige_bareme.tex` (Corrigé Officiel \& Analyse Statistique)](#3-gabarit-corrige_baremetex-corrigé-officiel--analyse-statistique)
  - [Feuille de Route des Fonctionnalités à Venir \& Mises à Jour Techniques](#feuille-de-route-des-fonctionnalités-à-venir--mises-à-jour-techniques)
    - [1. Fonctionnalités Pédagogiques \& Collaboratives (Prochaine Version v3.1)](#1-fonctionnalités-pédagogiques--collaboratives-prochaine-version-v31)
    - [2. Optimisations Techniques \& Mode Hors-Ligne (PWA)](#2-optimisations-techniques--mode-hors-ligne-pwa)
    - [3. Module d'Exportation en Masse \& Automatisation](#3-module-dexportation-en-masse--automatisation)
    - [4. Mises à Jour \& Maintenance Régulière](#4-mises-à-jour--maintenance-régulière)
  - [Guide de Déploiement et d'Installation](#guide-de-déploiement-et-dinstallation)
    - [Option 1 : Exécution Locale Rapide avec VS Code](#option-1--exécution-locale-rapide-avec-vs-code)

---

## Présentation Générale de MATEX

**MATEX** est la première infrastructure numérique ivoirienne dédiée à l'excellence typographique, à la mutualisation et à la diffusion libre de ressources mathématiques écrites en **LaTeX**, depuis l'école primaire jusqu'aux cycles universitaires avancés (Licence, Master, Doctorat, CAPES, Agrégation).

Conçue en harmonie absolue avec les programmes de la **Direction de la Pédagogie et de la Formation Continue (DPFC)** sous tutelle du **Ministère de l'Éducation Nationale, de l'Alphabétisation et de l'Enseignement Technique (MENAET)**, la plateforme MATEX répond à quatre défis majeurs de l'enseignement en Côte d'Ivoire :
1. **Éradiquer les épreuves illisibles ou mal formatées** grâce à des gabarits typographiques rigoureux adaptés aux standards d'examen.
2. **Fournir un accès immédiat aux codes sources LaTeX originaux (`.tex`)** pour permettre aux enseignants de modifier, réadapter et enrichir les devoirs.
3. **Démocratiser la saisie mathématique par l'Intelligence Artificielle** : un enseignant qui ne maîtrise pas l'informatique peut photographier son brouillon manuscrit pour obtenir en 10 secondes une épreuve complète compilée en PDF.
4. **Fédérer une communauté nationale** d'enseignants autour d'ateliers pratiques de formation continue en présentiel et à distance.

---

## Fonctionnalités Majeures de la Plateforme

### 1. Bibliothèque Pédagogique Nationale

La bibliothèque référence l'ensemble des documents pédagogiques partagés par les enseignants titulaires de Côte d'Ivoire :
- **Filtrage multicritère cascadé** :
  - *Parcours* : Tous les parcours, Primaire (CP1-CM2), 1er Cycle / Collège (6e-3e), 2nd Cycle / Lycée (2nde-Tle), Supérieur & Recherche (L1-M2, Agrégation).
  - *Classe* : Mise à jour automatique de la liste des classes selon le parcours choisi.
  - *Leçon Officielle MENAET* : Les intitulés exacts du programme officiel se chargent en cascade dès la sélection de la classe.
  - *Type de ressource* : Cours magistraux, Fiches TD / Exercices, Devoirs surveillés (DS), Examens blancs régionaux, Concours & Olympiades d'excellence, Manuels & Recueils.
  - *Domaine mathématique* : Arithmétique & Algèbre, Géométrie & Trigonométrie, Géométrie dans l'Espace, Analyse & Fonctions, Probabilités & Statistiques, Algèbre linéaire, Topologie & Calcul différentiel.
- **Recherche plein texte instantanée** : Détection en direct dans les titres, chapitres, noms d'auteurs, établissements et descriptions.
- **Visionneuse de document A4 plein écran (Double Onglet)** :
  - *Aperçu PDF Réel* : Intégration directe via l'URL sécurisée Google Drive `/preview` ou rendu vectoriel A4.
  - *Source LaTeX (`.tex`)* : Zone de code source éditable avec coloration typographique, compteur de caractères, bouton de copie instantanée dans le presse-papiers et bouton de téléchargement direct.

---

### 2. Studio IA : Photo vers Sujet LaTeX & PDF (Style Overleaf)

Ce module permet la transformation instantanée d'un sujet manuscrit ou imprimé en document PDF d'examen prêt au tirage :
- **Zéro installation requise** : Utilisable directement depuis un smartphone (accès direct à l'appareil photo via `capture="environment"`) ou un ordinateur de bureau.
- **Workflow en 3 clics pour l'enseignant** :
  1. *Choix du gabarit* : Interrogation, Devoir surveillé ou Corrigé avec barème.
  2. *Prise de photo* : Cadrage de la feuille manuscrite bien à plat.
  3. *Lancement* : Clic sur « Transcrire et Compiler en PDF ».
- **Moteur d'extraction IA Multimodal** :
  - Utilise l'API Google Gemini (modèles officiels rapides `gemini-2.0-flash`, `gemini-3.8-flash`, `gemini-3.5-flash-lite`).
  - Reconnaissance fine des fractions mathématiques (`\dfrac`), puissances, racines carrées, matrices, vecteurs (`\vec{u}`, `\overrightarrow{AB}`), intégrales, limites et tableaux de variations.
  - Conversion des croquis géométriques manuscrits en graphiques vectoriels **TikZ** natifs.
  - Système de bascule automatique (*fallback cascade*) : si un modèle d'API est saturé ou indisponible, la requête tente immédiatement le modèle suivant de la liste pour garantir 100% de disponibilité.
- **Moteur de compilation cloud & Rendu Overleaf-like** :
  - Le code LaTeX complet généré en tâche de fond est transmis aux microservices de compilation LaTeX (`pdflatex`).
  - Le fichier PDF binaire résultant est injecté dans la visionneuse avec boutons **« Imprimer »** et **« Télécharger PDF »**.
  - Si la compilation cloud est ralentie par le réseau, un moteur de secours génère instantanément la prévisualisation A4 haute résolution via **KaTeX** sans jamais bloquer l'enseignant.
  - Un onglet **« Code LaTeX (.tex) »** reste accessible en parallèle pour les professeurs souhaitant retoucher le code sous TeXstudio ou Overleaf.

---

### 3. Référentiel Officiel des Progressions DPFC 2026-2027

Intégration exhaustive du programme national homologué par la **Coordination Nationale Disciplinaire de Mathématiques** :
- **Découpage trimestriel strict** : T1, T2 et T3 avec numérotation officielle des leçons, volumes horaires hebdomadaires et volumes annuels.
- **Respect des normes horaires nationales** :
  - *Collège (6e, 5e, 4e, 3e)* : Exactement 128 heures annuelles (4h / semaine). Chaque niveau s'ouvre obligatoirement sur la *Leçon 0 : Séances de révisions* (8h).
  - *Lycée Scientifique (2nde C, 1re C, Tle C)* : De 160h à 256h annuelles (jusqu'à 8h / semaine en Terminale C).
  - *Lycée Littéraire & Expérimental (2nde A, 1re A1/A2, 1re D, Tle A1/A2, Tle D)* : De 96h à 192h annuelles.
  - *Enseignement Supérieur (L1, L2, L3, M1, M2 & Agrégation)* : Modules fondamentaux d'Analyse, Algèbre linéaire, Topologie, Mesure et Intégration, Géométrie riemannienne et Distributions.
- **Fiche d'impression A4 officielle** : Un bouton dédié permet d'imprimer la progression annuelle au format officiel DPFC / MENAET pour les dossiers d'inspection pédagogique.

---

### 4. Module Formation Nationale LaTeX (2e Cohorte)

Espace dédié à la formation pratique intensive des enseignants de mathématiques :
- **Programme officiel de 18 heures en 5 modules** :
  - *Module 1 (3h)* : Environnement & Syntaxe Fondamentale (TeX Live, MiKTeX, TeXstudio, Overleaf).
  - *Module 2 (4h)* : Formules Mathématiques, Matrices & Systèmes (`amsmath`, `amssymb`).
  - *Module 3 (5h)* : Figures Vectorielles avec TikZ & PGFPlots.
  - *Module 4 (3h)* : Présentations Scientifiques & Diaporamas Beamer.
  - *Module 5 (3h)* : Production d'Examens Types avec Barèmes et Automatisation.
- **Sous l'égide scientifique du Pr. Saliou TOURE** (Président de la Société Mathématique de Côte d'Ivoire - SMCI).
- **Réseau de 6 Pôles Universitaires** : Abidjan (UFHB & ENS), Yamoussoukro (INP-HB), Bouaké (UAO), Korhogo (UPGC), Daloa (UJLoG) et San-Pedro (USP).
- **Carrousel Photos Dynamique** : Bande défilante continue (animation CSS marquee) valorisant les 3 journées d'ateliers avec visionneuse Lightbox grand format.

---

### 5. Passerelle de Solidarité & Trésorerie

- **Financement participatif transparent** : Soutien des serveurs, de l'hébergement des sources `.tex` et de la logistique des ateliers de formation.
- **Mobile Money National** : Numéro officiel Wave / Orange Money : `07 48 78 22 05` (Coordination & Trésorerie Générale MATEX CI).
- **Calculateur de paliers d'impact** : 5 000 FCFA (montant minimal solidaire), 10 000 FCFA, 25 000 FCFA et 50 000 FCFA.
- **Transmission sécurisée des reçus** : Téléversement de la capture d'écran du transfert, encodage et archivage automatique dans le dossier Google Drive dédié et enregistrement dans la feuille Google Sheets `Dons_MATEX`.

---

## Architecture Technique du Dépôt

### Fichiers et Rôles

Le projet est entièrement contenu à la racine du dépôt `matex/` sans dépendance système complexe :

| Fichier | Format | Rôle & Fonctionnalités Techniques Clés |
| :--- | :---: | :--- |
| **`index.html`** | HTML5 | Point d'entrée de l'application. Structure sémantique complète, navbar avec 3 vues (`#viewLibrary`, `#viewAiStudio`, `#viewTraining`), boutons d'action rapide, 6 fenêtres modales interactives, inclusion des CDN (Tailwind CSS, KaTeX v0.16.8, Lucide Icons, html2pdf.js). |
| **`app.js`** | JS (ES6+) | Moteur applicatif principal (Vanilla JS). État global de l'application, gestion du Studio IA (conversion d'images Base64, appels API Gemini avec fallback de modèles, compilation cloud), double cache local TTL (15 min), filtrage cascadé et synchronisation avec Apps Script. |
| **`data.js`** | JS | Référentiel institutionnel protégé par `Object.freeze`. Progressions officielles 2026-2027 DPFC (4 cycles, 14 niveaux, leçons et volumes), paliers de dons solidaires, métadonnées MENAET et Map de cache mémorisée. |
| **`style.css`** | CSS3 | Feuille de styles sur mesure : typographie académique (`Playfair Display`, `Plus Jakarta Sans`, `JetBrains Mono`), simulation papier A4 haute fidélité (`.a4-paper-sheet`), animation marquee continue et styles d'impression (`@media print`). |
| **`Code.gs`** | Apps Script | Backend Google Apps Script déployé en Web App publique. Cache serveur `CacheService` pour servir le catalogue en moins de 100 ms, extraction du code TeX distant via `action=get_tex_content`, téléversement hiérarchisé dans Google Drive par cycles et écriture stricte sur 13 colonnes dans Google Sheets. |
| **`README.md`** | Markdown | Documentation complète, architecture, cahier des charges et feuille de route des évolutions. |

---

### Structure Stricte Google Sheets (13 Colonnes A à M)

Pour préserver la compatibilité entre l'application web et le tableur Google Sheets `Documents_MATEX`, la structure des colonnes est strictement fixée de **A à M** (aucune colonne N ou O n'est écrite ni attendue) :

| Colonne | En-tête de Colonne | Description Technique & Format |
| :---: | :--- | :--- |
| **A** | `Date de Depot` | Horodatage textuel de la soumission (`JJ/MM/AAAA HH:MM:SS`, Afrique/Abidjan) |
| **B** | `Titre` | Titre complet de la ressource pédagogique |
| **C** | `Parcours` | Identifiant du cycle : `primaire`, `college`, `lycee` ou `superieur` |
| **D** | `Classe` | Dénomination complète de la classe (ex: `Classe de Troisieme (3e)`) |
| **E** | `Lecon / Chapitre` | Intitulé officiel de la leçon du référentiel DPFC |
| **F** | `Type` | Identifiant du document : `cours`, `exercices`, `devoir`, `examen_blanc`, `concours` |
| **G** | `Domaine` | Branche mathématique (Analyse, Géométrie, Algèbre...) |
| **H** | `Auteur` | Nom et prénom de l'enseignant contributeur |
| **I** | `Etablissement` | Nom de l'établissement scolaire d'origine |
| **J** | `Description` | Résumé pédagogique ou consignes particulières |
| **K** | `Nom du Fichier` | Nom normalisé sans double extension (ex: `devoir_nombres_complexes.pdf`) |
| **L** | `Lien Google Drive` | URL de consultation directe du fichier archivé sur Google Drive |
| **M** | `ID Fichier Drive` | Identifiant alphanumérique unique Google Drive utilisé pour l'iframe `/preview` |

---

### Mécanismes de Cache et Lazy Loading

1. **Double Cache Client Instantané (0 ms)** :
   - Le catalogue complet est stocké dans le `localStorage` du navigateur (`matex_cached_documents_catalog_v2`) avec horodatage TTL de 15 minutes.
   - À l'ouverture du site, le catalogue s'affiche instantanément à 0 ms sans écran de chargement.
   - Si le cache a plus de 15 minutes, une requête d'actualisation asynchrone `get_documents` s'exécute en arrière-plan sans bloquer l'utilisateur.
2. **Lazy Loading du Code Source LaTeX** :
   - Pour éviter de saturer la mémoire avec des dizaines de milliers de lignes de code TeX, les documents du catalogue ne chargent initialement que leurs métadonnées.
   - Le code source complet `.tex` n'est récupéré via l'action d'API `get_tex_content` que lorsque l'utilisateur clique expressément sur l'onglet *« Source LaTeX »*, sur *« Copier le Code »* ou sur *« Télécharger .tex »*.
3. **Pérennité de l'Affichage PDF (Anti-`ERR_FILE_NOT_FOUND`)** :
   - L'application n'utilise jamais d'anciennes URL de session `blob:` temporaires après rafraîchissement de la page.
   - L'affichage PDF s'appuie en priorité sur l'URL d'incorporation officielle Google Drive : `https://drive.google.com/file/d/${driveFileId}/preview`, évitant tout blocage CSP (`frame-ancestors`).

---

## Détail des 3 Gabarits d'Évaluation Homologués

Le Studio IA injecte scrupuleusement les exercices extraits de la photo dans l'un des trois gabarits typographiques suivants :

### 1. Gabarit `interro.tex` (Interrogation Écrite 15-30 min)
- **Objectif** : Format économique permettant d'imprimer 2 sujets identiques sur une seule feuille A4 pour découpe au massicot.
- **Caractéristiques techniques** :
  - Marges réduites (`top=0.7cm`, `bottom=0.7cm`, `left=1.2cm`, `right=1.2cm`).
  - Commande macro `\sujet` dupliquée deux fois.
  - Ligne médiane de découpe générée en TikZ :
    ```latex
    \begin{center}
      \begin{tikzpicture}
        \draw[dashed, line width=0.8pt, gray!80] (0,0) -- (\linewidth,0);
        \node[fill=white, inner sep=4pt] at (0.5\linewidth, 0) {\footnotesize\textbf{--- Découper ici ---}};
      \end{tikzpicture}
    \end{center}
    ```
  - Tableau d'en-tête compact avec champs Nom, Prénoms, Note sur `/10` ou `/20`, Classe et Durée.

### 2. Gabarit `devoir.tex` (Devoir Surveillé / Évaluation Sommative 2h00)
- **Objectif** : Mise en page officielle type examen (BEPC, Baccalauréat).
- **Caractéristiques techniques** :
  - Document calibré sur 2 pages A4 avec pied de page numéroté `\cfoot{\textbf{Page \thepage\ sur 2}}`.
  - En-tête tabulaire `tabularx` à 3 blocs : Établissement (gauche avec filet horizontal), Titre de l'épreuve centré en `\large\textbf{...}`, Année scolaire 2026-2027 et durée (droite).
  - Exercices structurés avec barèmes individuels entre parenthèses, tableaux d'affirmations et figures géométriques vectorielles TikZ.

### 3. Gabarit `corrige_bareme.tex` (Corrigé Officiel & Analyse Statistique)
- **Objectif** : Document de référence pour l'enseignant et la commission de correction.
- **Caractéristiques techniques** :
  - Macros personnalisées d'annotation :
    - `\exercice{Numéro}{Titre}{Points}` pour la séparation claire des énoncés.
    - `\reponse{...}` et `\reponseMath{...}` en couleur rouge sombre (`red!90!black`) pour les corrigés.
    - Flèche de barème `\points{... pt}` alignée en marge droite : `\hfill \textcolor{gray}{\texttt{- - - - >}} \quad \textit{(0,5 pt)}`.
  - Section terminale obligatoire **ANALYSE DES DONNÉES STATISTIQUES** comprenant : Effectif total, absents, moyenne de classe, taux de réussite ($\ge 10/20$) et tableau de répartition par tranches de notes ($N \le 5$, $6 \le N \le 9$, $10 \le N \le 14$, $15 \le N \le 20$).

---

## Feuille de Route des Fonctionnalités à Venir & Mises à Jour Techniques

Pour maintenir l'excellence et l'évolutivité de la plateforme MATEX, les développements futurs s'organisent autour de 5 axes prioritaires :

### 1. Fonctionnalités Pédagogiques & Collaboratives (Prochaine Version v3.1)
- [ ] **Générateur de Sujets de Rattrapage & Variantes (Sujet A / Sujet B)** :
  - Permettre à l'enseignant, après avoir scanné une interrogation, de cliquer sur « Générer la Variante B ».
  - L'IA modifie automatiquement les valeurs numériques des exercices (coefficients, coordonnées de vecteurs, expressions polynomiales) tout en conservant la structure et le barème pour éviter les fraudes en classe.
- [ ] **Générateur d'Attestation de Réussite de Formation avec QR Code de Vérification** :
  - Module d'émission automatique du certificat de fin de cohorte en PDF vectoriel pour les auditeurs certifiés.
  - Intégration d'un QR code infalsifiable pointant vers l'URL de vérification officielle sur le site MATEX.
- [ ] **Espace de Notation & Retours d'Expérience Pédagogiques** :
  - Système d'évaluation communautaire par étoiles (1 à 5 étoiles) sur les documents déposés.
  - Section de commentaires modérés pour proposer des variantes méthodologiques ou signaler des coquilles.

---

### 2. Optimisations Techniques & Mode Hors-Ligne (PWA)
- [ ] **Support PWA Complet (Progressive Web App)** :
  - Ajout d'un fichier `manifest.json` et enregistrement d'un `service-worker.js`.
  - Mise en cache intégrale des bibliothèques externes (CSS Tailwind pré-compilé, polices Google Fonts locales, fichiers KaTeX minifiés).
  - Permettre aux enseignants des zones rurales ou à faible connectivité d'ouvrir la bibliothèque, de consulter les progressions 2026-2027 et de préparer leurs cours sans aucune connexion Internet.
- [ ] **Compilation LaTeX WebAssembly Locale (Zéro Réseau)** :
  - Intégration d'un compilateur WebAssembly (ex: Tectonic WASM ou SwiftLaTeX) directement exécutable dans le navigateur du client.
  - Avantage : compiler les fichiers `.tex` volumineux en PDF en quelques millisecondes sans dépendre d'une connexion vers des serveurs cloud externes.

---

### 3. Module d'Exportation en Masse & Automatisation
- [ ] **Export d'Archives ZIP Complètes par Niveau / Trimestre** :
  - Bouton permettant de télécharger en un clic l'intégralité d'un trimestre (ex: *« Pack Complet 3e - Trimestre 1 »* comprenant tous les cours, devoirs surveillés, corrigés `.tex` et figures `.pdf`).
- [ ] **Génération Automatique de Diaporamas de Cours Beamer** :
  - Option permettant à l'enseignant de convertir une fiche de cours manuscrite directement en diaporama de projection scientifique avec la classe LaTeX `beamer` (thème harmonisé aux couleurs ivoiriennes).

---

### 4. Mises à Jour & Maintenance Régulière
- [ ] **Actualisation Annuelle des Progressions DPFC** :
  - Maintien annuel de l'objet `OFFICIAL_CURRICULUM` dans `data.js` lors de la publication des arrêtés ministériels pour les rentrées scolaires suivantes.
- [ ] **Veille sur les Versions des Modèles Google AI Studio** :
  - Vérification continue des dépréciations d'endpoints de l'API Google Generative Language et maintien de la liste `availableModels` dans `app.js` (`gemini-2.0-flash`, `gemini-3.8-flash`, etc.).
- [ ] **Sécurisation de la Passerelle Trésorerie Google Apps Script** :
  - Limitation du taux de requêtes (*rate limiting*) dans `Code.gs` pour protéger l'API Webhook contre les soumissions massives automatisées.

---

## Guide de Déploiement et d'Installation

### Option 1 : Exécution Locale Rapide avec VS Code
1. Clonez ou téléchargez le dépôt `matex/` sur votre machine :
   ```bash
   git clone https://github.com/bkablam11/matex.git
   cd matex