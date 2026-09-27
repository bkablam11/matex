/**
 * ==========================================================================
 * BACKEND GOOGLE APPS SCRIPT - MATEX COTE D'IVOIRE
 * Synchronisation Automatique : Google Drive, Google Sheets & Bibliotheque MATEX
 * Architecture haute performance avec CacheService et 13 colonnes strictes (A a M)
 * ==========================================================================
 */

const SPREADSHEET_ID = "100kYZ-lrTW069edLrur_RBfqxsvu288jeES5zQ-tZTI";
const DRIVE_FOLDER_ID = "1jWAn2ZHD4vU8NAypKcsXI5Ias8oIZFYF";
const CACHE_CATALOG_KEY = "matex_catalog_json_v1";
const CACHE_TTL_SECONDS = 600; // 10 minutes

/**
 * Fonction de test autonome executable directement dans l'editeur Apps Script
 */
function TESTER_CONNEXION_IMMEDIATE() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName("Documents_MATEX");
    if (!sheet) {
      sheet = ss.insertSheet("Documents_MATEX");
      sheet.appendRow([
        "Date de Depot", "Titre", "Parcours", "Classe", "Lecon / Chapitre",
        "Type", "Domaine", "Auteur", "Etablissement", "Description",
        "Nom du Fichier", "Lien Google Drive", "ID Fichier Drive"
      ]);
      sheet.getRange("A1:M1").setFontWeight("bold").setBackground("#059669").setFontColor("#ffffff");
    }

    ss.setActiveSheet(sheet);

    const rootFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const testBlob = Utilities.newBlob("Fichier de test unitaire MATEX - Connexion operationnelle.", "text/plain", "test_connexion_" + Date.now() + ".txt");
    const testDriveFile = rootFolder.createFile(testBlob);
    try {
      testDriveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {}

    const now = new Date().toLocaleString("fr-FR", { timeZone: "Africa/Abidjan" });
    sheet.appendRow([
      now,
      "[TEST] Synchronisation MATEX",
      "college",
      "Classe de Troisieme (3e)",
      "Test Systeme",
      "cours",
      "Arithmetique & Algebre",
      "Admin MATEX",
      "Centre National MATEX CI",
      "Validation de communication entre MATEX, Sheets et Drive.",
      testDriveFile.getName(),
      testDriveFile.getUrl(),
      testDriveFile.getId()
    ]);

    try {
      CacheService.getScriptCache().remove(CACHE_CATALOG_KEY);
    } catch (cErr) {}

    Logger.log("SUCCES DU TEST");
    Logger.log("1. Google Sheets : Ligne ajoutee dans Documents_MATEX (13 colonnes)");
    Logger.log("2. Google Drive  : Fichier cree (" + testDriveFile.getUrl() + ")");
    return "SUCCESS";
  } catch (err) {
    Logger.log("ERREUR DU TEST : " + err.toString());
    throw err;
  }
}

/**
 * Gestion des requetes GET (API JSON avec cache & lecture TeX a la demande)
 */
function doGet(e) {
  try {
    e = e || { parameter: {} };
    const action = (e.parameter && e.parameter.action) || (e.parameter && e.parameter.test ? "test" : "console");

    // 1. API : Recuperation du catalogue de documents (Colonnes A a M)
    if (action === "get_documents") {
      const cache = CacheService.getScriptCache();
      const cached = cache.get(CACHE_CATALOG_KEY);
      if (cached) {
        return ContentService.createTextOutput(cached).setMimeType(ContentService.MimeType.JSON);
      }

      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName("Documents_MATEX");
      if (!sheet) {
        const emptyOutput = JSON.stringify({ success: true, count: 0, documents: [] });
        return ContentService.createTextOutput(emptyOutput).setMimeType(ContentService.MimeType.JSON);
      }

      const rows = sheet.getDataRange().getValues();
      const documents = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row[1]) continue;

        const driveUrl = row[11] ? String(row[11]) : "";
        const driveFileId = row[12] ? String(row[12]) : "";

        documents.push({
          id: "doc-sheet-" + i,
          date: row[0] ? String(row[0]) : "",
          title: String(row[1] || ""),
          cycle: String(row[2] || "college"),
          classe: String(row[3] || ""),
          chapter: String(row[4] || ""),
          type: String(row[5] || "cours"),
          domain: String(row[6] || ""),
          author: {
            name: String(row[7] || "Enseignant"),
            institution: String(row[8] || "Etablissement National"),
            verifiedTeacher: true
          },
          description: String(row[9] || ""),
          fileName: String(row[10] || (row[1] + ".pdf")),
          pdfFileName: String(row[10] || (row[1] + ".pdf")),
          driveUrl: driveUrl || ("https://drive.google.com/drive/folders/" + DRIVE_FOLDER_ID),
          pdfDriveUrl: driveUrl,
          driveFileId: driveFileId,
          hasPdfSource: Boolean(driveUrl && driveUrl.indexOf("http") === 0),
          hasTexSource: true
        });
      }

      const payloadString = JSON.stringify({
        success: true,
        count: documents.length,
        timestamp: Date.now(),
        documents: documents
      });

      try {
        cache.put(CACHE_CATALOG_KEY, payloadString, CACHE_TTL_SECONDS);
      } catch (cacheErr) {}

      return ContentService.createTextOutput(payloadString).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. API : Recuperation a la demande du code source TeX depuis Drive
    if (action === "get_tex_content") {
      let fileId = e.parameter.fileId;

      if (!fileId && e.parameter.driveUrl) {
        const rawUrl = e.parameter.driveUrl;
        const m = rawUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || rawUrl.match(/id=([a-zA-Z0-9_-]+)/);
        if (m) fileId = m[1];
      }

      if (!fileId) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: "Parametre fileId ou driveUrl manquant"
        })).setMimeType(ContentService.MimeType.JSON);
      }

      try {
        const file = DriveApp.getFileById(fileId);
        const texContent = file.getBlob().getDataAsString("UTF-8");
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          fileId: fileId,
          fileName: file.getName(),
          content: texContent
        })).setMimeType(ContentService.MimeType.JSON);
      } catch (errDrive) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: "Erreur lecture Drive : " + errDrive.toString()
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 3. Execution d'un test direct par URL (?action=test)
    let testResult = null;
    if (action === "test") {
      try {
        TESTER_CONNEXION_IMMEDIATE();
        testResult = "Test effectue avec succes. Une ligne a ete ajoutee et le cache a ete purge.";
      } catch (tErr) {
        testResult = "Erreur lors du test : " + tErr.toString();
      }
    }

    // 4. Format JSON pur sur demande
    if (e.parameter && e.parameter.format === "json") {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        service: "MATEX Apps Script Backend (13 colonnes strictes)",
        spreadsheetId: SPREADSHEET_ID,
        driveFolderId: DRIVE_FOLDER_ID,
        testResult: testResult,
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 5. Console de diagnostic Web
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
          <td style="padding: 10px; color: #0284c7;"><a href="${r[11]}" target="_blank" style="color: #0284c7; text-decoration: underline;">Voir Fichier</a></td>
        </tr>
      `).join("");
    }

    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Console Backend MATEX</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; line-height: 1.5; }
          .container { max-width: 800px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: #1e1b4b; color: #ffffff; padding: 28px; }
          .title { margin: 0 0 8px 0; font-size: 22px; font-weight: 800; }
          .subtitle { margin: 0; color: #c7d2fe; font-size: 13px; }
          .body { padding: 24px; }
          .alert { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px; margin-bottom: 20px; font-size: 13px; color: #1e40af; }
          .alert-success { background: #f0fdf4; border-color: #bbf7d0; color: #166534; font-weight: 600; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
          .card-title { font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
          .card-value { font-size: 18px; font-weight: 800; color: #0f172a; }
          .btn-group { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
          .btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-decoration: none; cursor: pointer; border: none; }
          .btn-primary { background: #4f46e5; color: #ffffff; }
          .btn-outline { background: #ffffff; color: #334155; border: 1px solid #cbd5e1; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; }
          th { padding: 8px 10px; background: #f1f5f9; color: #475569; font-weight: 700; border-bottom: 2px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">Console Backend MATEX</h1>
            <p class="subtitle">Liaison Google Drive, Google Sheets (13 colonnes) & Bibliotheque</p>
          </div>
          <div class="body">
            ${testResult ? `<div class="alert alert-success">${testResult}</div>` : ""}
            <div class="alert">
              Onglet des ressources : <strong>Documents_MATEX</strong> (ID : ${SPREADSHEET_ID})
            </div>
            <div class="grid">
              <div class="card">
                <div class="card-title">Documents references</div>
                <div class="card-value">${rowCount} document(s)</div>
              </div>
              <div class="card">
                <div class="card-title">Membres inscrits</div>
                <div class="card-value">${memberCount} enseignant(s)</div>
              </div>
            </div>
            <div class="btn-group">
              <a href="?action=test" class="btn btn-primary">Executer un test de synchronisation</a>
              <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit" target="_blank" class="btn btn-outline">Ouvrir Google Sheets</a>
              <a href="https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}" target="_blank" class="btn btn-outline">Ouvrir Google Drive</a>
            </div>
            ${rowCount > 0 ? `
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Classe</th>
                    <th>Auteur</th>
                    <th>Lien</th>
                  </tr>
                </thead>
                <tbody>${recentRowsHtml}</tbody>
              </table>
            ` : "<p style='font-size: 12px; color: #94a3b8;'>Aucun document pour le moment.</p>"}
          </div>
        </div>
      </body>
      </html>
    `;

    return HtmlService.createHtmlOutput(html)
      .setTitle("Console MATEX")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Gestion des requetes POST (Depot de document, Adhesion membre, Don solidaire)
 */
function doPost(e) {
  try {
    e = e || {};
    const rawData = e.postData ? e.postData.contents : "{}";
    const data = JSON.parse(rawData);
    const action = data.action;
    const payload = data.payload || data;

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    // 1. DEPOT DE DOCUMENT AVEC TELEVERSEMENT AUTOMATIQUE DANS GOOGLE DRIVE
    if (action === "submit_doc" || data.type === "document") {
      let rootFolder;
      try {
        rootFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      } catch (folderErr) {
        rootFolder = DriveApp.getRootFolder();
      }

      let targetFolder = rootFolder;
      let subFolderName = "00_Ressources_Diverses";
      if (payload.cycle === "primaire") subFolderName = "01_Primaire_CP1_CM2";
      else if (payload.cycle === "college") subFolderName = "02_College_6e_3e";
      else if (payload.cycle === "lycee") subFolderName = "03_Lycee_2nde_Tle";
      else if (payload.cycle === "superieur") subFolderName = "04_Superieur_L1_M2";

      try {
        const existingSubFolders = rootFolder.getFoldersByName(subFolderName);
        if (existingSubFolders.hasNext()) {
          targetFolder = existingSubFolders.next();
        } else {
          targetFolder = rootFolder.createFolder(subFolderName);
          try {
            targetFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          } catch (e) {}
        }
      } catch (errSub) {
        targetFolder = rootFolder;
      }

      let pdfDriveUrl = "";
      let pdfDriveId = "";
      let pdfFileName = payload.pdfFileName || payload.fileName || "";
      let texDriveUrl = "";
      let texDriveId = "";
      let texFileName = payload.texFileName || "";

      // 1.1 Televersement du fichier PDF
      const pdfBase64 = payload.pdfBase64 || payload.fileBase64;
      if (pdfBase64 && (!payload.fileMimeType || payload.fileMimeType === "application/pdf" || pdfFileName.toLowerCase().endsWith(".pdf"))) {
        try {
          let b64 = pdfBase64;
          if (b64.indexOf("base64,") > -1) {
            b64 = b64.split("base64,")[1];
          }
          const decodedPdfBytes = Utilities.base64Decode(b64);
          if (!pdfFileName) {
            pdfFileName = (payload.title ? payload.title.replace(/[^a-zA-Z0-9_-]/g, "_") : "document") + ".pdf";
          }
          const pdfBlob = Utilities.newBlob(decodedPdfBytes, "application/pdf", pdfFileName);
          const pdfFile = targetFolder.createFile(pdfBlob);
          try {
            pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          } catch (pErr) {}
          pdfDriveUrl = pdfFile.getUrl();
          pdfDriveId = pdfFile.getId();
        } catch (pdfErr) {
          pdfDriveUrl = "Erreur PDF : " + pdfErr.toString();
        }
      }

      // 1.2 Televersement du fichier source TeX dans Google Drive
      const texBase64 = payload.texBase64;
      const latexCode = payload.latexCode || payload.latexContent;
      if (texBase64 || latexCode) {
        try {
          if (!texFileName) {
            texFileName = (payload.title ? payload.title.replace(/[^a-zA-Z0-9_-]/g, "_") : "source") + ".tex";
          }
          let texBlob;
          if (texBase64) {
            let b64Tex = texBase64;
            if (b64Tex.indexOf("base64,") > -1) {
              b64Tex = b64Tex.split("base64,")[1];
            }
            const decodedTexBytes = Utilities.base64Decode(b64Tex);
            texBlob = Utilities.newBlob(decodedTexBytes, "text/plain", texFileName);
          } else {
            texBlob = Utilities.newBlob(latexCode, "text/plain", texFileName);
          }
          const texFile = targetFolder.createFile(texBlob);
          try {
            texFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          } catch (tErr) {}
          texDriveUrl = texFile.getUrl();
          texDriveId = texFile.getId();
        } catch (texUploadErr) {
          texDriveUrl = "Erreur TEX : " + texUploadErr.toString();
        }
      }

      const driveUrl = pdfDriveUrl || texDriveUrl || targetFolder.getUrl() || ("https://drive.google.com/drive/folders/" + DRIVE_FOLDER_ID);
      const driveFileId = pdfDriveId || texDriveId || "";

      // Enregistrement STRICTEMENT limite aux 13 colonnes officielles (A a M)
      let sheet = ss.getSheetByName("Documents_MATEX");
      if (!sheet) {
        sheet = ss.insertSheet("Documents_MATEX");
        sheet.appendRow([
          "Date de Depot", "Titre", "Parcours", "Classe", "Lecon / Chapitre",
          "Type", "Domaine", "Auteur", "Etablissement", "Description",
          "Nom du Fichier", "Lien Google Drive", "ID Fichier Drive"
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
        (payload.author && payload.author.name) || payload.authorName || "",
        (payload.author && payload.author.institution) || payload.institution || "",
        payload.description || "",
        pdfFileName || texFileName || "document.pdf",
        pdfDriveUrl || driveUrl,
        driveFileId || ""
      ]);

      // Invalidation immediate du cache memoire
      try {
        CacheService.getScriptCache().remove(CACHE_CATALOG_KEY);
      } catch (cPurgeErr) {}

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Ressource enregistree avec succes",
        driveUrl: driveUrl,
        pdfDriveUrl: pdfDriveUrl,
        pdfDriveId: pdfDriveId,
        texDriveUrl: texDriveUrl,
        texDriveId: texDriveId,
        driveFolderUrl: targetFolder.getUrl(),
        subFolder: subFolderName
      })).setMimeType(ContentService.MimeType.JSON);

    // 2. ADHESION D'UN NOUVEAU MEMBRE
    } else if (action === "join_member" || data.type === "member") {
      let sheet = ss.getSheetByName("Membres_MATEX");
      if (!sheet) {
        sheet = ss.insertSheet("Membres_MATEX");
        sheet.appendRow([
          "Date & Heure", "Nom & Prenoms", "Numero WhatsApp", "Email",
          "Etablissement", "Ville", "Niveaux Enseignes", "Niveau LaTeX",
          "Motivation", "Statut"
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
        message: "Membre enregistre avec succes"
      })).setMimeType(ContentService.MimeType.JSON);

    // 3. ENREGISTREMENT D'UN DON SOLIDAIRE
    } else if (action === "donate" || data.type === "donation") {
      let proofDriveUrl = "";

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
          proofDriveUrl = "Capture recue";
        }
      }

      let sheet = ss.getSheetByName("Dons_MATEX");
      if (!sheet) {
        sheet = ss.insertSheet("Dons_MATEX");
        sheet.appendRow([
          "Date & Heure", "Nom du Donateur", "Numero WhatsApp", "Montant (FCFA)",
          "Operateur", "Beneficiaire Officiel", "Preuve de Paiement (Lien Drive)", "Statut Validation"
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
        "En attente de verification"
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Don enregistre avec succes",
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