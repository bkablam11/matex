#  MATEX  Bibliothèque Pédagogique & Communauté Nationale des Mathématiques en LaTeX
> Du CP1 au Master 2 & Concours Nationaux (CAPES, Agrégation)  Côte d'Ivoire

---

<div align="center">

<!-- BADGES DU PROJET -->
![Version](https://img.shields.io/badge/Version-2.5.0-blue?style=for-the-badge&logo=semver&logoColor=white)
![Stack](https://img.shields.io/badge/Architecture-Pure%20HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![KaTeX](https://img.shields.io/badge/Rendu%20Maths-KaTeX%20Fast%20Engine-319795?style=for-the-badge&logo=latex&logoColor=white)
![Google Apps Script](https://img.shields.io/badge/Backend-Google%20Apps%20Script%20%26%20Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)
![Programme MENA](https://img.shields.io/badge/Programme-MENA%20%26%20DPFC%20C%C3%B4te%20d'Ivoire-FF8C00?style=for-the-badge)
![Niveaux](https://img.shields.io/badge/Niveaux-CP1%20%E2%86%92%20Master%202%20%7C%20Agr%C3%A9gation-6366F1?style=for-the-badge)
![Formation](https://img.shields.io/badge/Formation%20LaTeX-2%E1%B5%89%20Cohorte%20Active-EC4899?style=for-the-badge&logo=mortarboard&logoColor=white)
![Statut](https://img.shields.io/badge/Statut-En%20Ligne%20%26%20Op%C3%A9rationnel-10B981?style=for-the-badge&logo=checkmarx&logoColor=white)
![Licence](https://img.shields.io/badge/Licence-Open%20Educational%20Resource%20(OER)-8B5CF6?style=for-the-badge)

<p align="center">
  <b>Une suite pédagogique et typographique complète, autonome, ultra-légère et sans dépendance de compilation serveur pour les enseignants, élèves et chercheurs en sciences mathématiques.</b>
</p>

[Explorer l'application](index.html)  [Consulter le Référentiel](#-référentiel-des-fichiers)  [Formation LaTeX](#-module-formation-latex--2e-cohorte)  [Améliorations](#-améliorations-du-projet)

</div>

---

##  Présentation du Projet MATEX

**MATEX** est la première plateforme ivoirienne dédiée à l'excellence de la production et de la diffusion de documents mathématiques rédigés en **LaTeX**, de l'école primaire jusqu'aux cycles universitaires avancés (Licence, Master, Doctorat, CAPES, Agrégation).

Conçue dans le respect des programmes officiels du **Ministère de l'Éducation Nationale et de l'Alphabétisation (MENA)** et de la **Direction de la Pédagogie et de la Formation Continue (DPFC)**, l'application permet de :
1. **Consulter et télécharger** des fiches de cours, devoirs surveillés, évaluations sommatives et mémoires en format PDF certifié.
2. **Copier et exporter les codes sources LaTeX originaux** (`.tex`) avec prévisualisation mathématique instantanée via **KaTeX**.
3. **Consulter la progression officielle 2026-2027** avec les volumes horaires hebdomadaires et annuels par niveau.
4. **Participer aux cohortes de formation nationale LaTeX** (galerie photos en direct, liens Google Drive, supports de cours, formulaires d'adhésion).
5. **Soutenir le projet solidaire** via un module de don Wave / Orange Money avec téléversement de bordereau de paiement synchronisé automatiquement avec Google Sheets.

---

##  Référentiel des Fichiers du Dossier `matex/`

L'ensemble de l'application est contenu de façon **autonome et stricte** dans le répertoire `matex/` :

| Fichier | Rôle & Fonctionnalités Clés |
| :--- | :--- |
| **`index.html`** | Structure sémantique complète : Header/Navbar responsive, Hero avec statistiques en temps réel, filtres multicritères cascadés, grille des documents modèles, module de formation (2 Cohorte), et **5 fenêtres modales interactives** (Visionneuse de document, Déblocage solidaire, Don Wave/Orange Money, Adhésion membre, Dépôt de nouveau document, Progression pédagogique). |
| **`app.js`** | **Moteur logique applicatif en JavaScript pur (Vanilla JS)** : gestion du cycle de vie des modales, filtres dynamiques multicritères (Cycle  Classe  Leçon  Type  Domaine), moteur de rendu KaTeX avec support complet de la notation mathématique, intégration de l'album photo Google Drive de la 2 cohorte, lecteur et compilateur de prévisualisation PDF/LaTeX, et synchronisation asynchrone avec le webhook Google Apps Script. |
| **`data.js`** | **Référentiel des données institutionnelles et pédagogiques** : base de données de **20 documents modèles certifiés** (avec métadonnées, résumé, extrait KaTeX et code `.tex` complet), référentiel officiel des programmes scolaires et universitaires (de la 6 à la Terminale C/D/E/A, CP1 au CM2, Université L1-M2), coordonnées officielles de don et liens communautaires. |
| **`style.css`** | **Système de design sur mesure** : typographie d'excellence (`Playfair Display` pour la titraille académique, `Plus Jakarta Sans` pour l'interface moderne, `JetBrains Mono` pour les blocs LaTeX), simulation papier **A4 haute fidélité** avec marges professionnelles et filigranes, animations douces, gestion de l'impression (`@media print`) et scrollbars stylisées. |
| **`Code.gs`** | **Backend Google Apps Script sécurisé** : webhook `doPost(e)` & `doGet(e)` pour recevoir les soumissions de dons, les adhésions de membres et les propositions de documents, avec enregistrement instantané dans le tableur Google Sheets officiel MATEX et gestion des images de reçus vers Google Drive. |
| **`README.md`** | Documentation technique, guide d'installation, badges institutionnels et feuille de route des améliorations. |
| [PROMPT_IA_MATEX.md](PROMPT_IA_MATEX.md) | Prompt maître détaillé à copier-coller pour reprendre le projet avec n'importe quelle IA. |

---

##  Fonctionnalités Majeures Implémentées

### 1.  Recherche Multicritère et Filtres en Cascade
- **Parcours Pédagogique** : Tout afficher, Primaire (CP1-CM2), Collège (6-3), Lycée (2-Tle), Supérieur & Concours (L1-M2, Agrégation).
- **Filtrage par Classe et par Leçon Officielle** : Sélectionner une classe recharge instantanément la liste officielle des chapitres de la DPFC.
- **Filtrage par Type d'Écrit** : Cours, Fiche d'Exercices, Devoir Surveillé (DS), Devoir de Niveau, Fiche d'Activité, Examen Blanc, Mémoire de Recherche.
- **Recherche plein texte instantanée** : Filtre sur le titre, l'auteur, l'établissement, le chapitre ou les mots-clés.

### 2.  Visionneuse de Document A4 Haute Fidélité
- **Double affichage** :
  - **Aperçu PDF Réel / Document A4 Modélisé** : Rendu typographique professionnel avec en-tête institutionnelle (DRENA, Établissement, Année scolaire, Durée, Coefficient).
  - **Code Source LaTeX (.tex)** : Coloration du code source brut, bouton de copie instantanée dans le presse-papier et bouton de téléchargement du fichier `.tex`.
- **Rendu KaTeX Temps Réel** : Rendu immédiat des matrices, fractions, intégrales, sommes, limites et théorèmes sans temps de latence.

### 3.  Module Formation LaTeX  2 Cohorte Nationale
- **Présentation immersive** du programme en 3 jours intensifs (Fondations, Géométrie TikZ, Sujets d'examens & Automatisation).
- **Galerie Photos Google Drive Interactive** :
  - Affichage direct des clichés phares avec badges de journée (Jour 1, Jour 2, Jour 3).
  - Liens directs sécurisés vers les dossiers Drive officiels de chaque journée et vers l'album complet.
- **Accès aux supports pédagogiques** : modèles de cours, packages recommandés (`tikz`, `geometry`, `amsmath`, `babel`).

### 4.  Passerelle Solidaire & Synchronisation Google Sheets
- **Dons par Mobile Money** : Numéro officiel Wave & Orange Money : `07 48 78 22 05` (KABLAM EDJABROU ULRICH BLANCHARD).
- **Formulaire avec téléversement de capture d'écran** de la transaction (converti en Base64 ou lien Drive).
- **Envoi automatique vers Google Apps Script (`Code.gs`)** connecté au classeur Google Sheets officiel de gestion des contributions.

---

##  Améliorations du Projet (Roadmap & Évolutions)

###  Améliorations Récemment Apportées (v2.5)
1. **Intégration d'un album photo Google Drive réel** pour la 2 cohorte avec prévisualisations directes des images hébergées sur le Drive sans erreur CORS.
2. **Système de filtres en cascade 100% synchronisé** avec les données officielles du programme MENA 2026-2027.
3. **Optimisation KaTeX** avec délimiteurs mathématiques automatiques `$...$` et `$$...$$` et gestion des environnements d'équations.
4. **Feuille de styles d'impression dédiée (`@media print`)** permettant d'imprimer ou d'exporter n'importe quel document en PDF vectoriel impeccable directement depuis le navigateur.
5. **Formulaire de don avec calculatrice de paliers d'impact** (Exemple : 1 000 FCFA = 1 mois d'hébergement, 5 000 FCFA = 1 pack de fiches Lycée, etc.).

---

###  Améliorations Proposées & Pistes d'Évolution Futures

Voici les axes d'amélioration recommandés pour enrichir le projet :

#### 1.  Mode Hors-Ligne & Support PWA (Progressive Web App)
- [ ] Ajout d'un `manifest.json` et d'un `service-worker.js` pour permettre aux enseignants des zones à faible connectivité de consulter l'ensemble des fiches et des codes LaTeX hors-ligne.
- [ ] Mise en cache locale des bibliothèques externes (KaTeX, polices Google Fonts, Lucide Icons).

#### 2.  Éditeur & Compilateur LaTeX Intégré dans le Navigateur
- [ ] Intégration d'un bac à sable LaTeX interactif en direct (WebAssembly ou moteur TeXLive léger comme SwiftLaTeX ou TikZJax) pour tester et modifier le code source directement dans l'interface sans installer TeXstudio.
- [ ] Coloration syntaxique dédiée pour LaTeX avec coloration des balises `\begin{}`, `\frac{}`, `\usepackage{}`.

#### 3.  Générateur d'Attestation de Fin de Formation avec QR Code
- [ ] Génération automatique en PDF du certificat de participation pour les auditeurs de la formation LaTeX de la 2 cohorte.
- [ ] QR code unique de vérification d'authenticité imprimé sur chaque diplôme.

#### 4.  Système Collaboratif de Notation et de Commentaires
- [ ] Système d'évaluation par étoiles (1 à 5 étoiles) pour chaque document déposé par les enseignants.
- [ ] Espace de discussion ou commentaires modérés pour poser des questions sur un exercice ou proposer une correction alternative.

#### 5.  Export en Archive ZIP en Un Clic
- [ ] Bouton pour télécharger un pack complet d'un niveau (exemple : *"Télécharger tous les cours de Terminale C en .zip"* comprenant les fichiers `.tex`, figures `.pdf` et fichiers de style `.sty`).

---

##  Guide d'Utilisation et Déploiement Local

### Option 1 : Utilisation Locale avec VS Code Live Server
1. Téléchargez ou clonez le dossier `matex/` sur votre ordinateur.
2. Ouvrez le dossier dans **Visual Studio Code**.
3. Effectuez un clic droit sur `matex/index.html` puis choisissez ** Open with Live Server **.
4. L'application est disponible immédiatement à l'adresse : `http://127.0.0.1:5500/index.html`.

### Option 2 : Déploiement Statique Instantané
Le projet étant composé uniquement de fichiers statiques (`index.html`, `style.css`, `app.js`, `data.js`), il peut être déployé en 30 secondes sur :
- **GitHub Pages** (en pointant vers la branche contenant le dossier)
- **Vercel** ou **Netlify** (en configurant le répertoire racine sur `matex`)
- **Google Drive / Google Workspace** via Google Apps Script (HTML Service)

---

##  Contacts & Réseaux Officiels

- **Coordonnateur National :** KABLAM EDJABROU ULRICH BLANCHARD
- **Téléphone / Wave / Orange Money :** `+225 07 48 78 22 05`
- **Rejoindre le Groupe WhatsApp Communauté :** [Cliquez ici pour rejoindre](https://chat.whatsapp.com/DRQEqCr4221L0bS2wXjgWU?mode=gi_t)
- **Rejoindre le Groupe Formation LaTeX :** [Cliquez ici pour rejoindre](https://chat.whatsapp.com/D3Z48FSKgQT57ZA9lqLdJh?mode=gi_t)
- **Classeur Google Sheets Officiel :** [Consulter la base de données](https://docs.google.com/spreadsheets/d/100kYZ-lrTW069edLrur_RBfqxsvu288jeES5zQ-tZTI/edit?usp=sharing)
- **Dossier Ressources Google Drive :** [Accéder au Drive MATEX](https://drive.google.com/drive/folders/1jWAn2ZHD4vU8NAypKcsXI5Ias8oIZFYF?usp=sharing)

---

<div align="center">
  <sub>MATEX  Fait avec passion pour l'excellence de l'enseignement des mathématiques en Côte d'Ivoire .</sub>
</div>
