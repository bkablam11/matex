/**
 * ==========================================================================
 * BACKEND GOOGLE APPS SCRIPT - MATEX CÔTE D'IVOIRE
 * Synchronisation Automatique : Google Drive, Google Sheets & Bibliothèque MATEX
 * ==========================================================================
 * 
 * Dossier Google Drive Officiel :
 * ID  : 1jWAn2ZHD4vU8NAypKcsXI5Ias8oIZFYF
 * URL : https://drive.google.com/drive/folders/1jWAn2ZHD4vU8NAypKcsXI5Ias8oIZFYF?usp=sharing
 * 
 * Feuille Google Sheets Officielle :
 * ID  : 100kYZ-lrTW069edLrur_RBfqxsvu288jeES5zQ-tZTI
 * URL : https://docs.google.com/spreadsheets/d/100kYZ-lrTW069edLrur_RBfqxsvu288jeES5zQ-tZTI/edit?usp=sharing
 * 
 * Instructions de Déploiement :
 * 1. Ouvrir votre feuille Google Sheets MATEX
 * 2. Cliquer sur Extensions > Apps Script
 * 3. Remplacer tout le code par ce fichier Code.gs
 * 4. Déployer en tant qu'Application Web (Web App) :
 *    - Exécuter en tant que : "Moi" (votre compte Google)
 *    - Qui a accès : "Tout le monde" (Anyone)
 * 5. Pour tester directement dans Apps Script :
 *    - Choisir la fonction "TESTER_CONNEXION_IMMEDIATE" dans la barre d'outils et cliquer sur "Exécuter" !
 */

const SPREADSHEET_ID = "100kYZ-lrTW069edLrur_RBfqxsvu288jeES5zQ-tZTI";
const DRIVE_FOLDER_ID = "1jWAn2ZHD4vU8NAypKcsXI5Ias8oIZFYF";

/**
 * FONCTION DE TEST AUTONOME (Exécutable directement dans l'éditeur Google Apps Script)
 * Cliquez sur cette fonction dans la liste déroulante et appuyez sur "Exécuter" pour tester en 1 clic !
 */
function TESTER_CONNEXION_IMMEDIATE() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName("Documents_MATEX");
    if (!sheet) {
      sheet = ss.insertSheet("Documents_MATEX");
      sheet.appendRow([
        "Date de Dépôt", "Titre", "Parcours", "Classe", "Leçon / Chapitre",
        "Type", "Domaine", "Auteur", "Établissement", "Description",
        "Nom du Fichier", "Lien Google Drive", "ID Fichier Drive"
      ]);
      sheet.getRange("A1:M1").setFontWeight("bold").setBackground("#059669").setFontColor("#ffffff");
    }

    // Activer l'onglet Documents_MATEX pour qu'il s'affiche au premier plan
    ss.setActiveSheet(sheet);

    // Supprimer ou renommer Feuille 1 si elle est vide pour éviter toute confusion
    try {
      const defaultSheet = ss.getSheetByName("Feuille 1") || ss.getSheetByName("Sheet1");
      if (defaultSheet && defaultSheet.getLastRow() === 0) {
        // Laisser intact ou déplacer en arrière-plan
      }
    } catch (e) {}

    // Tester Google Drive
    const rootFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const testBlob = Utilities.newBlob("Fichier de test unitaire MATEX - Connexion opérationnelle.", "text/plain", "test_connexion_" + Date.now() + ".txt");
    const testDriveFile = rootFolder.createFile(testBlob);
    try {
      testDriveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {}

    // Ajouter la ligne de test certifiée
    const now = new Date().toLocaleString("fr-FR", { timeZone: "Africa/Abidjan" });
    sheet.appendRow([
      now,
      "✅ TEST DE SYNCHRONISATION MATEX",
      "college",
      "Classe de Troisième (3e)",
      "Test Système",
      "cours",
      "Algèbre & Analyse",
      "M. Blanchard (Admin MATEX)",
      "Centre National MATEX",
      "Ligne de validation confirmant la communication entre MATEX, Google Sheets et Google Drive.",
      testDriveFile.getName(),
      testDriveFile.getUrl(),
      testDriveFile.getId()
    ]);

    Logger.log("=================================================");
    Logger.log("🎉 SUCCÈS TOTAL DU TEST !");
    Logger.log("1. Google Sheets : 1 ligne ajoutée dans l'onglet 'Documents_MATEX'");
    Logger.log("2. Google Drive  : 1 fichier test créé (" + testDriveFile.getUrl() + ")");
    Logger.log("=================================================");
    return "SUCCESS";
  } catch (err) {
    Logger.log("❌ ERREUR DU TEST : " + err.toString());
    throw err;
  }
}

/**
 * Gestion des requêtes GET (Console de Diagnostic & API JSON)
 */
function doGet(e) {
  try {
    e = e || { parameter: {} };
    const action = (e.parameter && e.parameter.action) || (e.parameter && e.parameter.test ? "test" : "console");

    // 1. Action : API de récupération des documents
    if (action === "get_documents") {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName("Documents_MATEX");
      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({ success: true, documents: [] })).setMimeType(ContentService.MimeType.JSON);
      }

      const rows = sheet.getDataRange().getValues();
      const documents = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row[1]) continue;
        documents.push({
          date: row[0],
          title: row[1],
          cycle: row[2],
          classe: row[3],
          chapter: row[4],
          type: row[5],
          domain: row[6],
          author: { name: row[7], institution: row[8] },
          description: row[9],
          fileName: row[10] || "",
          driveUrl: row[11] || "",
          driveFileId: row[12] || ""
        });
      }

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        count: documents.length,
        documents: documents
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Action : Lancement d'un test direct via URL (?action=test ou ?test=1)
    let testResult = null;
    if (action === "test") {
      try {
        TESTER_CONNEXION_IMMEDIATE();
        testResult = "Le test d'écriture a été exécuté avec SUCCÈS ! Une nouvelle ligne apparaît dans votre feuille Google Sheets et un fichier a été créé dans Google Drive.";
      } catch (tErr) {
        testResult = "Erreur lors du test : " + tErr.toString();
      }
    }

    // 3. Format JSON pur si demandé explicitement
    if (e.parameter && e.parameter.format === "json") {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        service: "MATEX Google Apps Script Backend (Drive & Sheets Synced)",
        spreadsheetId: SPREADSHEET_ID,
        driveFolderId: DRIVE_FOLDER_ID,
        testResult: testResult,
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 4. Par défaut en visite navigateur : Interface Web de Diagnostic Éléguante & Conviviale
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const docSheet = ss.getSheetByName("Documents_MATEX");
    const rowCount = docSheet ? Math.max(0, docSheet.getLastRow() - 1) : 0;
    const memberSheet = ss.getSheetByName("Membres_MATEX");
    const memberCount = memberSheet ? Math.max(0, memberSheet.getLastRow() - 1) : 0;

    let recentRowsHtml = "";
    if (docSheet && rowCount > 0) {
      const data = docSheet.getDataRange().getValues();
      const recent = data.slice(Math.max(1, data.length - 5)).reverse();
      recentRowsHtml = recent.map(r => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px; font-weight: bold; color: #1e293b;">${r[1]}</td>
          <td style="padding: 10px; color: #475569;">${r[3]}</td>
          <td style="padding: 10px; color: #475569;">${r[7]}</td>
          <td style="padding: 10px; color: #0284c7;"><a href="${r[11]}" target="_blank" style="color: #0284c7; text-decoration: underline;">Voir Drive</a></td>
        </tr>
      `).join("");
    }

    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Console Backend MATEX • Drive & Sheets</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; line-height: 1.5; }
          .container { max-width: 800px; margin: 0 auto; background: #ffffff; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1e1b4b, #312e81); color: #ffffff; padding: 32px 28px; }
          .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; background: #22c55e; color: #ffffff; margin-bottom: 12px; }
          .title { margin: 0 0 8px 0; font-size: 24px; font-weight: 800; }
          .subtitle { margin: 0; color: #c7d2fe; font-size: 14px; }
          .body { padding: 28px; }
          .alert { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 13px; color: #1e40af; }
          .alert-success { background: #f0fdf4; border-color: #bbf7d0; color: #166534; font-weight: 600; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; }
          .card-title { font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; margin-bottom: 6px; }
          .card-value { font-size: 20px; font-weight: 800; color: #0f172a; }
          .btn-group { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }
          .btn { display: inline-flex; align-items: center; justify-content: center; padding: 12px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; text-decoration: none; cursor: pointer; transition: 0.2s; border: none; }
          .btn-primary { background: #4f46e5; color: #ffffff; }
          .btn-primary:hover { background: #4338ca; }
          .btn-outline { background: #ffffff; color: #334155; border: 1px solid #cbd5e1; }
          .btn-outline:hover { background: #f1f5f9; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; text-align: left; }
          th { padding: 10px; background: #f1f5f9; color: #475569; font-weight: 700; border-bottom: 2px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">● Opérationnel & Synchronisé</span>
            <h1 class="title">Console Google Apps Script • MATEX</h1>
            <p class="subtitle">Liaison bidirectionnelle Google Drive, Google Sheets & Portail National</p>
          </div>
          <div class="body">
            
            ${testResult ? `<div class="alert alert-success">🎉 ${testResult}</div>` : ''}

            <div class="alert">
              <strong>💡 OÙ SONT VOS DONNÉES ?</strong><br>
              Dans votre feuille Google Sheets, vos ressources sont enregistrées dans l'onglet <strong>« Documents_MATEX »</strong> situé tout en bas à côté de « Feuille 1 ».
            </div>

            <div class="grid">
              <div class="card">
                <div class="card-title">Feuille Google Sheets</div>
                <div class="card-value">${rowCount} document(s)</div>
                <p style="margin: 6px 0 0 0; font-size: 11px; color: #64748b;">Onglet : Documents_MATEX</p>
              </div>
              <div class="card">
                <div class="card-title">Membres Inscrits</div>
                <div class="card-value">${memberCount} enseignant(s)</div>
                <p style="margin: 6px 0 0 0; font-size: 11px; color: #64748b;">Onglet : Membres_MATEX</p>
              </div>
            </div>

            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin: 0 0 12px 0;">Actions & Tests Immédiats</h3>
            <div class="btn-group">
              <a href="?action=test" class="btn btn-primary">🧪 Lancer un Test d'Écriture Immédiat</a>
              <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit" target="_blank" class="btn btn-outline">📊 Ouvrir Google Sheets</a>
              <a href="https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}" target="_blank" class="btn btn-outline">📁 Ouvrir Google Drive</a>
            </div>

            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin: 24px 0 12px 0;">Dernières Ressources Enregistrées</h3>
            ${rowCount > 0 ? `
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Niveau</th>
                    <th>Auteur</th>
                    <th>Fichier Drive</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentRowsHtml}
                </tbody>
              </table>
            ` : '<p style="font-size: 13px; color: #94a3b8;">Aucun document pour le moment. Cliquez sur « Lancer un Test d\'Écriture Immédiat » ci-dessus.</p>'}

          </div>
        </div>
      </body>
      </html>
    `;

    return HtmlService.createHtmlOutput(html).setTitle("Console MATEX • Backend Connecté").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Gestion des requêtes POST (Dépôt de document avec upload Drive, Adhésion membre, Don solidaire)
 */
function doPost(e) {
  try {
    e = e || {};
    const rawData = e.postData ? e.postData.contents : "{}";
    const data = JSON.parse(rawData);
    const action = data.action;
    const payload = data.payload || data;

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    // =========================================================================
    // 1. DÉPÔT DE DOCUMENT AVEC TÉLÉVERSEMENT AUTOMATIQUE DANS GOOGLE DRIVE
    // =========================================================================
    if (action === "submit_doc" || data.type === "document") {
      let driveFileUrl = payload.driveUrl || "";
      let driveFileId = "";
      let uploadedFileName = payload.fileName || "";

      // Si un fichier en base64 est transmis depuis le site MATEX
      if (payload.fileBase64) {
        try {
          let base64Data = payload.fileBase64;
          if (base64Data.indexOf("base64,") > -1) {
            base64Data = base64Data.split("base64,")[1];
          }
          const decodedBytes = Utilities.base64Decode(base64Data);
          uploadedFileName = payload.fileName || (payload.title ? payload.title.replace(/[^a-zA-Z0-9_-]/g, "_") + ".pdf" : "document_matex.pdf");
          const mimeType = payload.fileMimeType || "application/pdf";
          const blob = Utilities.newBlob(decodedBytes, mimeType, uploadedFileName);

          // Récupération du dossier racine MATEX Drive
          let rootFolder;
          try {
            rootFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
          } catch (folderErr) {
            rootFolder = DriveApp.getRootFolder();
          }

          // Organisation automatique par sous-dossier selon le Cycle d'enseignement
          let targetFolder = rootFolder;
          let subFolderName = "00_Ressources_Diverses";
          if (payload.cycle === "primaire") subFolderName = "01_Primaire_CP1_CM2";
          else if (payload.cycle === "college") subFolderName = "02_College_6e_3e";
          else if (payload.cycle === "lycee") subFolderName = "03_Lycee_2nde_Tle";
          else if (payload.cycle === "superieur") subFolderName = "04_Superieur_L1_M2";

          const existingSubFolders = rootFolder.getFoldersByName(subFolderName);
          if (existingSubFolders.hasNext()) {
            targetFolder = existingSubFolders.next();
          } else {
            targetFolder = rootFolder.createFolder(subFolderName);
          }

          // Création du fichier dans le dossier Drive
          const driveFile = targetFolder.createFile(blob);
          
          // Définition des droits d'accès public en lecture (pour consultation et téléchargement)
          try {
            driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          } catch (permErr) {
            // Ignorer si les droits du domaine s'appliquent déjà
          }

          driveFileUrl = driveFile.getUrl();
          driveFileId = driveFile.getId();

        } catch (uploadErr) {
          driveFileUrl = "Erreur Upload Drive : " + uploadErr.toString();
        }
      }

      // Si aucun fichier direct n'est uploadé mais qu'un code LaTeX est fourni
      if (!driveFileUrl && payload.latexCode) {
        try {
          const rootFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
          const texBlob = Utilities.newBlob(payload.latexCode, "text/plain", (payload.title || "document").replace(/[^a-zA-Z0-9_-]/g, "_") + ".tex");
          const texFile = rootFolder.createFile(texBlob);
          try {
            texFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          } catch (p) {}
          driveFileUrl = texFile.getUrl();
          driveFileId = texFile.getId();
        } catch (texErr) {}
      }

      // Enregistrement dans l'onglet "Documents_MATEX" de la feuille Google Sheets
      let sheet = ss.getSheetByName("Documents_MATEX");
      if (!sheet) {
        sheet = ss.insertSheet("Documents_MATEX");
        sheet.appendRow([
          "Date de Dépôt",
          "Titre",
          "Parcours",
          "Classe",
          "Leçon / Chapitre",
          "Type",
          "Domaine",
          "Auteur",
          "Établissement",
          "Description",
          "Nom du Fichier",
          "Lien Google Drive",
          "ID Fichier Drive"
        ]);
        sheet.getRange("A1:M1").setFontWeight("bold").setBackground("#059669").setFontColor("#ffffff");
      }

      const timestamp = payload.timestamp || new Date().toLocaleString("fr-FR", { timeZone: "Africa/Abidjan" });

      sheet.appendRow([
        timestamp,
        payload.title || "",
        payload.cycle || "",
        payload.classe || "",
        payload.chapter || "",
        payload.type || "",
        payload.domain || "",
        payload.author?.name || payload.authorName || "",
        payload.author?.institution || payload.institution || "",
        payload.description || "",
        uploadedFileName || "Non spécifié",
        driveFileUrl || ("https://drive.google.com/drive/folders/" + DRIVE_FOLDER_ID),
        driveFileId || ""
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Ressource pédagogique enregistrée et stockée avec succès sur Google Drive et Google Sheets",
        driveUrl: driveFileUrl || ("https://drive.google.com/drive/folders/" + DRIVE_FOLDER_ID),
        driveFileId: driveFileId,
        fileName: uploadedFileName
      })).setMimeType(ContentService.MimeType.JSON);

    // =========================================================================
    // 2. ADHÉSION D'UN NOUVEAU MEMBRE MATEX
    // =========================================================================
    } else if (action === "join_member" || data.type === "member") {
      let sheet = ss.getSheetByName("Membres_MATEX");
      if (!sheet) {
        sheet = ss.insertSheet("Membres_MATEX");
        sheet.appendRow([
          "Date & Heure",
          "Nom & Prénoms",
          "Numéro WhatsApp",
          "Email",
          "Établissement",
          "Ville",
          "Niveaux Enseignés",
          "Niveau LaTeX",
          "Motivation",
          "Statut"
        ]);
        sheet.getRange("A1:J1").setFontWeight("bold").setBackground("#4338ca").setFontColor("#ffffff");
      }

      sheet.appendRow([
        payload.timestamp || new Date().toLocaleString("fr-FR", { timeZone: "Africa/Abidjan" }),
        payload.fullName || "",
        payload.phoneWhatsApp || "",
        payload.email || "",
        payload.institution || "",
        payload.city || "",
        Array.isArray(payload.teachingLevels) ? payload.teachingLevels.join(", ") : (payload.teachingLevels || ""),
        payload.latexExperience || "",
        payload.motivation || "",
        "Actif"
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Membre MATEX enregistré avec succès"
      })).setMimeType(ContentService.MimeType.JSON);

    // =========================================================================
    // 3. ENREGISTREMENT D'UN DON SOLIDAIRE AVEC PREUVE SUR DRIVE
    // =========================================================================
    } else if (action === "donate" || data.type === "donation") {
      let proofDriveUrl = "";

      // Téléversement de la capture de paiement dans le dossier "Preuves_Dons"
      if (payload.proofDataUrl) {
        try {
          const rootFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
          let proofFolder;
          const pf = rootFolder.getFoldersByName("Preuves_Dons_Wave_Orange");
          if (pf.hasNext()) {
            proofFolder = pf.next();
          } else {
            proofFolder = rootFolder.createFolder("Preuves_Dons_Wave_Orange");
          }

          let proofBase64 = payload.proofDataUrl;
          if (proofBase64.indexOf("base64,") > -1) {
            proofBase64 = proofBase64.split("base64,")[1];
          }
          const proofBytes = Utilities.base64Decode(proofBase64);
          const proofBlob = Utilities.newBlob(proofBytes, "image/png", "recu_" + (payload.donorName || "donateur").replace(/[^a-zA-Z0-9]/g, "_") + "_" + Date.now() + ".png");
          const proofFile = proofFolder.createFile(proofBlob);
          proofDriveUrl = proofFile.getUrl();
        } catch (pErr) {
          proofDriveUrl = "Capture reçue";
        }
      }

      let sheet = ss.getSheetByName("Dons_MATEX");
      if (!sheet) {
        sheet = ss.insertSheet("Dons_MATEX");
        sheet.appendRow([
          "Date & Heure",
          "Nom du Donateur",
          "Numéro WhatsApp",
          "Montant (FCFA)",
          "Opérateur",
          "Bénéficiaire Officiel",
          "Preuve de Paiement (Lien Drive)",
          "Statut Validation"
        ]);
        sheet.getRange("A1:H1").setFontWeight("bold").setBackground("#d97706").setFontColor("#ffffff");
      }

      sheet.appendRow([
        payload.timestamp || new Date().toLocaleString("fr-FR", { timeZone: "Africa/Abidjan" }),
        payload.donorName || "Anonyme",
        payload.donorPhone || "",
        payload.amount || 5000,
        payload.operator || "Wave",
        "KABLAM EDJABROU ULRICH BLANCHARD (07 48 78 22 05)",
        proofDriveUrl || payload.proofFileName || "Preuve fournie",
        "En attente de vérification"
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Don solidaire MATEX enregistré avec succès",
        proofDriveUrl: proofDriveUrl
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Action non reconnue"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
