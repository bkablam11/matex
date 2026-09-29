/**
 * ==========================================================================
 * BACKEND GOOGLE APPS SCRIPT - MATEX COTE D'IVOIRE
 * Synchronisation : Google Drive, Google Sheets (13 colonnes A a M) & Console Web
 * Tableau de bord statistique des contributions enseignants
 * ==========================================================================
 */

const SPREADSHEET_ID = "100kYZ-lrTW069edLrur_RBfqxsvu288jeES5zQ-tZTI";
const DRIVE_FOLDER_ID = "1jWAn2ZHD4vU8NAypKcsXI5Ias8oIZFYF";
const CACHE_CATALOG_KEY = "matex_catalog_json_v1";
const CACHE_TTL_SECONDS = 600; // 10 minutes

/**
 * Fonction de test autonome executable dans l'editeur Apps Script
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

    const rootFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const testBlob = Utilities.newBlob("Fichier de test unitaire MATEX.", "text/plain", "test_" + Date.now() + ".txt");
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
    Logger.log("Google Sheets et Google Drive operationnels.");
    return "SUCCESS";
  } catch (err) {
    Logger.log("ERREUR DU TEST : " + err.toString());
    throw err;
  }
}

/**
 * Gestion des requetes GET (API JSON & Console Web avec Statistiques et Classement)
 */
function doGet(e) {
  try {
    e = e || { parameter: {} };
    const action = (e.parameter && e.parameter.action) || (e.parameter && e.parameter.test ? "test" : "console");

    // 1. API JSON : Recuperation du catalogue de documents (Colonnes A a M)
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

    // 2. API JSON : Lecture du code source TeX a la demande
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
          error: "Parametre fileId manquant"
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

    // 4. Console Web Interactive avec Statistiques & Top Contributeurs
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const docSheet = ss.getSheetByName("Documents_MATEX");
    const memberSheet = ss.getSheetByName("Membres_MATEX");
    const donSheet = ss.getSheetByName("Dons_MATEX");

    const totalDocs = docSheet ? Math.max(0, docSheet.getLastRow() - 1) : 0;
    const totalMembers = memberSheet ? Math.max(0, memberSheet.getLastRow() - 1) : 0;
    const totalDons = donSheet ? Math.max(0, donSheet.getLastRow() - 1) : 0;

    // Analyse des donnees : Top Contributeurs & Repartition
    const authorCounts = {};
    const cycleCounts = { primaire: 0, college: 0, lycee: 0, superieur: 0 };
    const typeCounts = {};
    let recentRowsHtml = "";

    if (docSheet && totalDocs > 0) {
      const data = docSheet.getDataRange().getValues();

      for (let i = 1; i < data.length; i++) {
        const r = data[i];
        const cycle = String(r[2] || "").toLowerCase().trim();
        const type = String(r[5] || "").toLowerCase().trim();
        const author = String(r[7] || "Enseignant Anonyme").trim();

        if (author) {
          authorCounts[author] = (authorCounts[author] || 0) + 1;
        }
        if (cycleCounts[cycle] !== undefined) {
          cycleCounts[cycle]++;
        }
        if (type) {
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        }
      }

      const recent = data.slice(Math.max(1, data.length - 6)).reverse();
      recentRowsHtml = recent.map(r => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px; font-weight: bold; color: #1e293b;">${r[1]}</td>
          <td style="padding: 10px; color: #475569;">${r[3]}</td>
          <td style="padding: 10px; color: #4338ca; font-weight: 600;">${r[7]}</td>
          <td style="padding: 10px;"><a href="${r[11]}" target="_blank" style="color: #0284c7; text-decoration: underline; font-weight: bold;">Voir Fichier</a></td>
        </tr>
      `).join("");
    }

    // Classement des top contributeurs
    const sortedAuthors = Object.keys(authorCounts)
      .map(name => ({ name: name, count: authorCounts[name] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topAuthorsHtml = sortedAuthors.length > 0 ? sortedAuthors.map((a, idx) => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 6px; border: 1px solid #e2e8f0;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 900; color: #4338ca; font-size: 13px;">#${idx + 1}</span>
          <span style="font-weight: 700; color: #0f172a; font-size: 13px;">${a.name}</span>
        </div>
        <span style="background: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 800;">${a.count} ressource(s)</span>
      </div>
    `).join("") : "<p style='font-size: 12px; color: #94a3b8;'>Aucune contribution analysee.</p>";

    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tableau de Bord Backend MATEX</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f1f5f9; color: #0f172a; margin: 0; padding: 24px; line-height: 1.5; }
          .container { max-width: 900px; margin: 0 auto; background: #ffffff; border-radius: 18px; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1e1b4b, #312e81); color: #ffffff; padding: 28px; }
          .title { margin: 0 0 6px 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
          .subtitle { margin: 0; color: #c7d2fe; font-size: 13px; }
          .body { padding: 24px; }
          .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; font-weight: 600; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; }
          .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; }
          .kpi-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
          .kpi-label { font-size: 11px; color: #64748b; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
          .kpi-value { font-size: 22px; font-weight: 900; color: #0f172a; }
          .section-title { font-size: 15px; font-weight: 800; color: #0f172a; margin: 24px 0 12px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
          .btn-group { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
          .btn { display: inline-flex; align-items: center; justify-content: center; padding: 9px 15px; border-radius: 8px; font-size: 12px; font-weight: 700; text-decoration: none; cursor: pointer; border: none; }
          .btn-primary { background: #4338ca; color: #ffffff; }
          .btn-outline { background: #ffffff; color: #334155; border: 1px solid #cbd5e1; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; }
          th { padding: 9px 10px; background: #f8fafc; color: #475569; font-weight: 700; border-bottom: 2px solid #e2e8f0; }
          .bar-track { background: #e2e8f0; border-radius: 99px; height: 8px; overflow: hidden; margin-top: 4px; }
          .bar-fill { height: 100%; border-radius: 99px; background: #4338ca; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">MATEX - Console Pédagogique Backend</h1>
            <p class="subtitle">Gestionnaire Google Sheets (13 colonnes) & Google Drive National</p>
          </div>
          <div class="body">
            ${testResult ? `<div class="alert-success">${testResult}</div>` : ""}

            <div class="kpi-grid">
              <div class="kpi-card">
                <div class="kpi-label">Documents en Ligne</div>
                <div class="kpi-value">${totalDocs}</div>
              </div>
              <div class="kpi-card">
                <div class="kpi-label">Enseignants Membres</div>
                <div class="kpi-value">${totalMembers}</div>
              </div>
              <div class="kpi-card">
                <div class="kpi-label">Dons Solidaires</div>
                <div class="kpi-value">${totalDons}</div>
              </div>
            </div>

            <div class="btn-group">
              <a href="?action=test" class="btn btn-primary">Tester la synchronisation</a>
              <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit" target="_blank" class="btn btn-outline">Ouvrir Google Sheets</a>
              <a href="https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}" target="_blank" class="btn btn-outline">Ouvrir Google Drive</a>
            </div>

            <div class="section-title">Palmares des Enseignants Contributeurs</div>
            ${topAuthorsHtml}

            <div class="section-title">Repartition des Ressources par Cycle</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
              <div style="background: #f8fafc; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: bold;">
                  <span>Primaire</span>
                  <span>${cycleCounts.primaire}</span>
                </div>
                <div class="bar-track"><div class="bar-fill" style="width: ${totalDocs > 0 ? (cycleCounts.primaire / totalDocs * 100) : 0}%; background: #059669;"></div></div>
              </div>
              <div style="background: #f8fafc; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: bold;">
                  <span>College (6e - 3e)</span>
                  <span>${cycleCounts.college}</span>
                </div>
                <div class="bar-track"><div class="bar-fill" style="width: ${totalDocs > 0 ? (cycleCounts.college / totalDocs * 100) : 0}%; background: #0284c7;"></div></div>
              </div>
              <div style="background: #f8fafc; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: bold;">
                  <span>Lycee (2nde - Tle)</span>
                  <span>${cycleCounts.lycee}</span>
                </div>
                <div class="bar-track"><div class="bar-fill" style="width: ${totalDocs > 0 ? (cycleCounts.lycee / totalDocs * 100) : 0}%; background: #4338ca;"></div></div>
              </div>
              <div style="background: #f8fafc; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: bold;">
                  <span>Superieur (L1 - M2)</span>
                  <span>${cycleCounts.superieur}</span>
                </div>
                <div class="bar-track"><div class="bar-fill" style="width: ${totalDocs > 0 ? (cycleCounts.superieur / totalDocs * 100) : 0}%; background: #d97706;"></div></div>
              </div>
            </div>

            <div class="section-title">Derniers Depots Enregistres</div>
            ${totalDocs > 0 ? `
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Classe</th>
                    <th>Auteur</th>
                    <th>Lien Drive</th>
                  </tr>
                </thead>
                <tbody>${recentRowsHtml}</tbody>
              </table>
            ` : "<p style='font-size: 12px; color: #94a3b8;'>Aucun document reference pour le moment.</p>"}
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
 * Structure stricte sur 13 colonnes (A a M)
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
    // 1. DEPOT DE DOCUMENT PÉDAGOGIQUE (COLONNES A A M)
    // =========================================================================
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

      // Enregistrement du fichier PDF dans Google Drive
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

      // Enregistrement du fichier source LaTeX (.tex) dans Google Drive
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

      // Ecriture stricte sur 13 colonnes (A a M)
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

    // =========================================================================
    // 2. ADHESION D'UN NOUVEAU MEMBRE ENSEIGNANT
    // =========================================================================
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

    // =========================================================================
    // 3. ENREGISTREMENT D'UN DON SOLIDAIRE
    // =========================================================================
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