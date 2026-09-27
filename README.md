# MATEX - Bibliothèque Pédagogique & Communauté Nationale • CP1 au Master 2
### Version Pure HTML / CSS / JavaScript (Vanilla)

Bienvenue dans la version pure et autonome de l'application **MATEX** (de la maternelle au supérieur et à l'agrégation en Côte d'Ivoire). Cette version fonctionne sans Node.js, sans React et sans compilation : ouvrez simplement `index.html` dans votre navigateur ou lancez un serveur local !

---

## 📁 Structure du Dossier `matex/`

- **`index.html`** : Point d'entrée principal avec la navbar, le hero, les filtres avancés, la grille des 20 documents modèles, la section formation (2e Cohorte) et les 5 fenêtres modales.
- **`data.js`** : Base de données complète contenant :
  - Les **20 documents officiels répertoriés** (Primaire, Collège, Lycée, Supérieur) avec métadonnées, formules KaTeX et codes sources LaTeX.
  - Le **référentiel national des programmes** (heures annuelles et hebdomadaires, découpage des leçons officielles de la 6e à la Tle, Primaire et Supérieur).
  - Les informations officielles de don solidaire (07 48 78 22 05 - KABLAM EDJABROU ULRICH BLANCHARD).
- **`app.js`** : Logique applicative en JavaScript pur :
  - Moteur de recherche instantané & filtres cascadés (Parcours → Classe → Leçon → Type → Domaine).
  - Visionneuse de document A4 authentique avec onglets PDF, LaTeX (.tex) et Word (.docx).
  - Passerelle de déblocage solidaire, modal de don Wave/Orange Money avec téléversement de capture, modal d'adhésion membre et modal de dépôt de document.
  - Rendu universel des formules mathématiques via KaTeX CDN.
- **`style.css`** : Styles sur mesure (rendu papier A4 haute fidélité, polices Playfair Display / Plus Jakarta Sans, styles d'impression `@media print`).
- **`Code.gs`** : Script Google Apps Script pour lier vos formulaires à votre feuille Google Sheets officielle MATEX.

---

## 🚀 Comment lancer avec VS Code Live Server ?

1. Téléchargez ou copiez le dossier `matex/` sur votre ordinateur.
2. Ouvrez le dossier `matex/` dans **Visual Studio Code**.
3. Assurez-vous d'avoir l'extension **Live Server** installée (par *Ritwick Dey*).
4. Faites un clic droit sur `index.html` et cliquez sur **« Open with Live Server »**.
5. Votre navigateur s'ouvrira automatiquement à l'adresse : `http://127.0.0.1:5500/index.html`.

Sur l'environnement actuel en cours d'exécution, l'application est également directement accessible à l'URL :
**`http://localhost:3000/matex/`**

---

## 🔗 Liens Officiels Intégrés

- **Wave / Orange Money :** `07 48 78 22 05` (KABLAM EDJABROU ULRICH BLANCHARD)
- **Groupe WhatsApp Communauté :** https://chat.whatsapp.com/DRQEqCr4221L0bS2wXjgWU?mode=gi_t
- **Groupe WhatsApp Formation :** https://chat.whatsapp.com/D3Z48FSKgQT57ZA9lqLdJh?mode=gi_t
- **Formulaire d'inscription 2e Cohorte :** https://forms.gle/2sPqT34ESzQR1S5L7
- **Feuille Google Sheets MATEX :** https://docs.google.com/spreadsheets/d/100kYZ-lrTW069edLrur_RBfqxsvu288jeES5zQ-tZTI/edit?usp=sharing
- **Dossier Google Drive MATEX :** https://drive.google.com/drive/folders/1jWAn2ZHD4vU8NAypKcsXI5Ias8oIZFYF?usp=sharing
- **Webhook Google Apps Script Déployé :** https://script.google.com/macros/s/AKfycbzeC6g6PE6W3Dd02ynQKZpS7C0nSqCVf_KF4-7ggYMeHjU10KpLJiklLKQeu9CQiSWr/exec
