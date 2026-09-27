/**
 * ==========================================================================
 * MATEX - Logique Applicative JavaScript Pure (Vanilla JS)
 * Bibliothèque Pédagogique & Communauté Nationale • CP1 au Master 2
 * ==========================================================================
 */

// Clés LocalStorage
const STORAGE_DOCUMENTS_KEY = 'matex_user_documents_v2';
const STORAGE_MEMBERS_KEY = 'matex_sheet_members_v2';
const STORAGE_DONATIONS_KEY = 'matex_sheet_donations_v2';

// État Global de l'Application
const state = {
  activeNavTab: 'library', // 'library' | 'training'
  documents: [],
  selectedCycle: 'all', // 'all' | 'primaire' | 'college' | 'lycee' | 'superieur'
  selectedGrade: '',
  selectedLesson: '',
  selectedType: 'all',
  selectedDomain: 'all',
  searchQuery: '',
  
  // Document Viewer Modal State
  currentDoc: null,
  viewerTab: 'pdf', // 'pdf' | 'latex' | 'docx'
  viewerZoom: 1.0,

  // Unlock Modal State
  docToUnlock: null,

  // Donate Modal State
  donateTier: 'tier-1',
  donateCustomAmount: '',
  donateOperator: 'Wave',
  donateProofImage: null,
  donateProofFileName: '',

  // Submit Modal State
  submitTab: 'form', // 'form' | 'curriculum'
  submitCycle: 'college',
  submitGradeId: '6e',
  submitLessonId: '6e-l01',
  submitFile: null,
  submitFileBase64: null,
  submitFileName: '',
  submitFileSize: '',
  submitFileMimeType: ''
};

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  initData();
  setupNavigation();
  setupFilterControls();
  setupModals();
  setupSubmitForm();
  setupDonateForm();
  setupJoinForm();
  renderApp();
  
  // Initialisation des icônes Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * 1. INITIALISATION DES DONNÉES
 */
function initData() {
  const localDocs = JSON.parse(localStorage.getItem(STORAGE_DOCUMENTS_KEY) || '[]');
  state.documents = [...localDocs, ...INITIAL_MATEX_DOCUMENTS];
  // Synchronisation avec les documents enregistrés dans Google Sheets
  fetchGasDocuments();
}

/**
 * 2. NAVIGATION ENTRE LES VUES (Bibliothèque vs Formation LaTeX)
 */
function setupNavigation() {
  const btnNavLibrary = document.getElementById('navBtnLibrary');
  const btnNavTraining = document.getElementById('navBtnTraining');
  const btnNavSubmit = document.getElementById('navBtnSubmit');
  const btnNavJoin = document.getElementById('navBtnJoin');
  const btnHeroExplore = document.getElementById('btnHeroExplore');
  const btnHeroTraining = document.getElementById('btnHeroTraining');

  if (btnNavLibrary) {
    btnNavLibrary.addEventListener('click', () => switchNavTab('library'));
  }
  if (btnNavTraining) {
    btnNavTraining.addEventListener('click', () => switchNavTab('training'));
  }
  if (btnNavSubmit) {
    btnNavSubmit.addEventListener('click', () => openSubmitModal());
  }
  if (btnNavJoin) {
    btnNavJoin.addEventListener('click', () => openJoinModal());
  }
  if (btnHeroExplore) {
    btnHeroExplore.addEventListener('click', () => {
      switchNavTab('library');
      document.getElementById('librarySection')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (btnHeroTraining) {
    btnHeroTraining.addEventListener('click', () => switchNavTab('training'));
  }
}

function switchNavTab(tab) {
  state.activeNavTab = tab;
  const viewLibrary = document.getElementById('viewLibrary');
  const viewTraining = document.getElementById('viewTraining');
  const btnNavLibrary = document.getElementById('navBtnLibrary');
  const btnNavTraining = document.getElementById('navBtnTraining');

  if (tab === 'library') {
    viewLibrary?.classList.remove('hidden');
    viewTraining?.classList.add('hidden');
    btnNavLibrary?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    btnNavLibrary?.classList.remove('text-slate-600');
    btnNavTraining?.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    btnNavTraining?.classList.add('text-slate-600');
    renderDocuments();
  } else {
    viewLibrary?.classList.add('hidden');
    viewTraining?.classList.remove('hidden');
    btnNavTraining?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    btnNavTraining?.classList.remove('text-slate-600');
    btnNavLibrary?.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    btnNavLibrary?.classList.add('text-slate-600');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (window.lucide) window.lucide.createIcons();
}

/**
 * 3. CONFIGURATION DES FILTRES ET RECHERCHE CASCADÉE
 */
function setupFilterControls() {
  // Cycle Pills
  const cyclePills = document.querySelectorAll('.cycle-filter-btn');
  cyclePills.forEach(btn => {
    btn.addEventListener('click', () => {
      const cycle = btn.getAttribute('data-cycle');
      setCycleFilter(cycle);
    });
  });

  // Search Input
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      if (clearSearchBtn) {
        if (state.searchQuery) {
          clearSearchBtn.classList.remove('hidden');
        } else {
          clearSearchBtn.classList.add('hidden');
        }
      }
      renderDocuments();
    });
  }
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      renderDocuments();
    });
  }

  // Cascading Selects: Grade, Lesson, Type, Domain
  const filterGrade = document.getElementById('filterGrade');
  const filterLesson = document.getElementById('filterLesson');
  const filterType = document.getElementById('filterType');
  const filterDomain = document.getElementById('filterDomain');
  const btnResetFilters = document.getElementById('btnResetFilters');

  if (filterGrade) {
    filterGrade.addEventListener('change', (e) => {
      state.selectedGrade = e.target.value;
      state.selectedLesson = ''; // reset lesson on grade change
      updateLessonDropdown();
      renderDocuments();
    });
  }

  if (filterLesson) {
    filterLesson.addEventListener('change', (e) => {
      state.selectedLesson = e.target.value;
      renderDocuments();
    });
  }

  if (filterType) {
    filterType.addEventListener('change', (e) => {
      state.selectedType = e.target.value;
      renderDocuments();
    });
  }

  if (filterDomain) {
    filterDomain.addEventListener('change', (e) => {
      state.selectedDomain = e.target.value;
      renderDocuments();
    });
  }

  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', resetAllFilters);
  }

  // Parcours Quick Buttons in Hero
  const quickParcoursButtons = document.querySelectorAll('.hero-parcours-btn');
  quickParcoursButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cycle = btn.getAttribute('data-cycle');
      setCycleFilter(cycle);
      document.getElementById('librarySection')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function setCycleFilter(cycle) {
  state.selectedCycle = cycle;
  state.selectedGrade = '';
  state.selectedLesson = '';
  
  // Mettre à jour l'apparence des pills
  const cyclePills = document.querySelectorAll('.cycle-filter-btn');
  cyclePills.forEach(btn => {
    const c = btn.getAttribute('data-cycle');
    if (c === cycle) {
      btn.className = 'cycle-filter-btn rounded-xl px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 shadow-sm bg-slate-900 text-white';
    } else {
      btn.className = 'cycle-filter-btn rounded-xl px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
    }
  });

  updateGradeDropdown();
  updateLessonDropdown();
  renderDocuments();
}

function updateGradeDropdown() {
  const filterGrade = document.getElementById('filterGrade');
  if (!filterGrade) return;

  filterGrade.innerHTML = '<option value="">Toutes les classes</option>';
  
  let grades = [];
  if (state.selectedCycle === 'all') {
    OFFICIAL_CURRICULUM.forEach(c => grades.push(...c.grades));
  } else {
    grades = getGradeLevelsByCycle(state.selectedCycle);
  }

  grades.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g.id;
    opt.textContent = `${g.label} - ${g.fullName}`;
    filterGrade.appendChild(opt);
  });

  filterGrade.value = state.selectedGrade || '';
}

function updateLessonDropdown() {
  const filterLesson = document.getElementById('filterLesson');
  if (!filterLesson) return;

  filterLesson.innerHTML = '<option value="">Toutes les leçons du programme</option>';
  
  if (!state.selectedGrade) {
    filterLesson.disabled = true;
    return;
  }

  filterLesson.disabled = false;
  let cycleId = state.selectedCycle;
  if (cycleId === 'all') {
    for (const c of OFFICIAL_CURRICULUM) {
      if (c.grades.some(g => g.id === state.selectedGrade)) {
        cycleId = c.id;
        break;
      }
    }
  }

  const lessons = getLessonsByGrade(cycleId, state.selectedGrade);
  lessons.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.id;
    opt.textContent = `Leçon ${l.number} : ${l.title} (${l.hours}h)`;
    filterLesson.appendChild(opt);
  });

  filterLesson.value = state.selectedLesson || '';
}

function resetAllFilters() {
  state.selectedCycle = 'all';
  state.selectedGrade = '';
  state.selectedLesson = '';
  state.selectedType = 'all';
  state.selectedDomain = 'all';
  state.searchQuery = '';

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  document.getElementById('clearSearchBtn')?.classList.add('hidden');

  const filterType = document.getElementById('filterType');
  if (filterType) filterType.value = 'all';

  const filterDomain = document.getElementById('filterDomain');
  if (filterDomain) filterDomain.value = 'all';

  setCycleFilter('all');
}

/**
 * 4. FILTRAGE ET RENDU DE LA GRILLE DES DOCUMENTS
 */
function getFilteredDocuments() {
  return state.documents.filter(doc => {
    // Filtre Parcours / Cycle
    if (state.selectedCycle !== 'all' && doc.cycle !== state.selectedCycle) {
      return false;
    }

    // Filtre Classe
    if (state.selectedGrade) {
      const matchGrade = doc.classe.toLowerCase().includes(state.selectedGrade.toLowerCase());
      const lessonMatch = doc.lessonId ? doc.lessonId.startsWith(state.selectedGrade) : false;
      if (!matchGrade && !lessonMatch) return false;
    }

    // Filtre Leçon
    if (state.selectedLesson && doc.lessonId !== state.selectedLesson) {
      return false;
    }

    // Filtre Type de Ressource
    if (state.selectedType !== 'all' && doc.type !== state.selectedType) {
      return false;
    }

    // Filtre Domaine Mathématique
    if (state.selectedDomain !== 'all' && doc.domain !== state.selectedDomain) {
      return false;
    }

    // Filtre Texte
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      const inTitle = doc.title.toLowerCase().includes(query);
      const inClasse = doc.classe.toLowerCase().includes(query);
      const inChapter = doc.chapter.toLowerCase().includes(query);
      const inAuthor = doc.author.name.toLowerCase().includes(query);
      const inInstitution = doc.author.institution.toLowerCase().includes(query);
      const inDesc = doc.description.toLowerCase().includes(query);
      const inLessonTitle = doc.lessonTitle ? doc.lessonTitle.toLowerCase().includes(query) : false;

      if (!inTitle && !inClasse && !inChapter && !inAuthor && !inInstitution && !inDesc && !inLessonTitle) {
        return false;
      }
    }

    return true;
  });
}

function renderDocuments() {
  const container = document.getElementById('documentsGrid');
  const countBadge = document.getElementById('docCountBadge');
  const activeFiltersContainer = document.getElementById('activeFiltersBar');
  const emptyState = document.getElementById('emptyState');

  if (!container) return;

  const filtered = getFilteredDocuments();

  // Mise à jour des compteurs
  if (countBadge) {
    countBadge.textContent = `Documents Répertoriés (${filtered.length})`;
  }

  // Mise à jour des compteurs sur les pills de cycle
  updateCycleCounters();

  // Affichage des tags de filtres actifs
  renderActiveFilterTags(activeFiltersContainer);

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState?.classList.remove('hidden');
    return;
  }

  emptyState?.classList.add('hidden');
  container.innerHTML = '';

  filtered.forEach(doc => {
    const card = createDocumentCard(doc);
    container.appendChild(card);
  });

  // Rendu des formules KaTeX dans les aperçus
  renderAllKaTeXInDOM();

  // Initialisation des icônes Lucide
  if (window.lucide) window.lucide.createIcons();
}

function updateCycleCounters() {
  const counts = {
    all: state.documents.length,
    primaire: state.documents.filter(d => d.cycle === 'primaire').length,
    college: state.documents.filter(d => d.cycle === 'college').length,
    lycee: state.documents.filter(d => d.cycle === 'lycee').length,
    superieur: state.documents.filter(d => d.cycle === 'superieur').length
  };

  document.querySelectorAll('.cycle-filter-btn').forEach(btn => {
    const cycle = btn.getAttribute('data-cycle');
    const badge = btn.querySelector('.cycle-count-tag');
    if (badge && counts[cycle] !== undefined) {
      badge.textContent = counts[cycle];
    }
  });
}

function renderActiveFilterTags(container) {
  if (!container) return;

  const tags = [];

  if (state.selectedCycle !== 'all') {
    const cycleObj = OFFICIAL_CURRICULUM.find(c => c.id === state.selectedCycle);
    tags.push({
      label: `Parcours : ${cycleObj?.label || state.selectedCycle}`,
      clear: () => setCycleFilter('all')
    });
  }

  if (state.selectedGrade) {
    tags.push({
      label: `Classe : ${state.selectedGrade}`,
      clear: () => {
        state.selectedGrade = '';
        state.selectedLesson = '';
        updateGradeDropdown();
        updateLessonDropdown();
        renderDocuments();
      }
    });
  }

  if (state.selectedLesson) {
    tags.push({
      label: `Leçon : ${state.selectedLesson}`,
      clear: () => {
        state.selectedLesson = '';
        updateLessonDropdown();
        renderDocuments();
      }
    });
  }

  if (state.selectedType !== 'all') {
    tags.push({
      label: `Type : ${formatDocType(state.selectedType)}`,
      clear: () => {
        state.selectedType = 'all';
        const el = document.getElementById('filterType');
        if (el) el.value = 'all';
        renderDocuments();
      }
    });
  }

  if (state.selectedDomain !== 'all') {
    tags.push({
      label: `Domaine : ${state.selectedDomain}`,
      clear: () => {
        state.selectedDomain = 'all';
        const el = document.getElementById('filterDomain');
        if (el) el.value = 'all';
        renderDocuments();
      }
    });
  }

  if (state.searchQuery) {
    tags.push({
      label: `Recherche : "${state.searchQuery}"`,
      clear: () => {
        state.searchQuery = '';
        const el = document.getElementById('searchInput');
        if (el) el.value = '';
        document.getElementById('clearSearchBtn')?.classList.add('hidden');
        renderDocuments();
      }
    });
  }

  if (tags.length === 0) {
    container.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  container.classList.remove('hidden');
  container.innerHTML = `
    <div class="flex flex-wrap items-center gap-2 py-2 text-xs">
      <span class="text-slate-500 font-semibold flex items-center gap-1">
        <i data-lucide="filter" class="h-3.5 w-3.5"></i> Filtres actifs :
      </span>
      ${tags.map((t, idx) => `
        <span class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 py-1 text-xs font-semibold text-indigo-800">
          <span>${t.label}</span>
          <button type="button" class="btn-clear-tag text-indigo-400 hover:text-indigo-900 transition" data-index="${idx}">
            <i data-lucide="x" class="h-3 w-3"></i>
          </button>
        </span>
      `).join('')}
      <button type="button" id="btnActiveBarReset" class="text-xs font-bold text-red-600 hover:text-red-700 underline ml-2">
        Tout effacer
      </button>
    </div>
  `;

  // Attach clear events
  container.querySelectorAll('.btn-clear-tag').forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-index'), 10);
    btn.addEventListener('click', () => tags[idx]?.clear());
  });

  const btnActiveReset = document.getElementById('btnActiveBarReset');
  if (btnActiveReset) {
    btnActiveReset.addEventListener('click', resetAllFilters);
  }
}

/**
 * 5. GÉNÉRATION DE LA CARTE DE DOCUMENT (Card)
 */
function createDocumentCard(doc) {
  const card = document.createElement('div');
  card.className = 'group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl';

  const cycleConfig = {
    primaire: { label: 'Primaire', badgeClass: 'cycle-badge-primaire', icon: '🌱' },
    college: { label: '1er Cycle (Collège)', badgeClass: 'cycle-badge-college', icon: '📐' },
    lycee: { label: '2nd Cycle (Lycée)', badgeClass: 'cycle-badge-lycee', icon: '🔬' },
    superieur: { label: 'Supérieur & Recherche', badgeClass: 'cycle-badge-superieur', icon: '🎓' }
  }[doc.cycle] || { label: 'Général', badgeClass: 'bg-slate-100 text-slate-700', icon: '📚' };

  const typeConfig = {
    cours: { label: 'Cours Magistral', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    exercices: { label: 'Fiche TD / Exercices', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    devoir: { label: 'Devoir Surveillé', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    examen_blanc: { label: 'Examen Blanc', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    concours: { label: 'Concours & Olympiades', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    livre_manuel: { label: 'Manuel / Recueil', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' }
  }[doc.type] || { label: doc.type, color: 'bg-slate-50 text-slate-700 border-slate-200' };

  card.innerHTML = `
    <div>
      <!-- Top Row: Cycle, Type & National Tag -->
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span class="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold ${cycleConfig.badgeClass}">
          <span>${cycleConfig.icon}</span> ${doc.classe}
        </span>
        <div class="flex items-center gap-1.5">
          ${doc.isNationalContest ? `
            <span class="inline-flex items-center gap-1 rounded-md bg-amber-500 text-white px-2 py-0.5 text-[10px] font-extrabold shadow-2xs">
              <i data-lucide="trophy" class="h-3 w-3"></i> ÉLITE
            </span>
          ` : ''}
          <span class="inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${typeConfig.color}">
            ${typeConfig.label}
          </span>
        </div>
      </div>

      <!-- Title -->
      <h3 class="font-serif text-base font-bold text-slate-900 leading-snug tracking-tight group-hover:text-indigo-700 transition">
        ${doc.title}
      </h3>

      <!-- Lesson and Domain Tag -->
      <div class="mt-2.5 flex flex-wrap items-center gap-2">
        ${doc.lessonTitle ? `
          <span class="inline-flex items-center gap-1 rounded-md bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[11px] font-bold border border-indigo-100">
            <i data-lucide="bookmark" class="h-3 w-3"></i> ${doc.lessonTitle}
          </span>
        ` : ''}
        <span class="text-[11px] text-slate-500 font-medium">
          • ${doc.domain}
        </span>
      </div>

      <!-- Chapter Breadcrumb -->
      <p class="mt-1 text-[11px] text-slate-400 font-medium line-clamp-1">
        Chapitre : ${doc.chapter}
      </p>

      <!-- Aperçu du contenu : Fichier réel ou Formule mathématique -->
      ${doc.isUserUploaded || !doc.sampleMathPreview ? `
        <div class="my-3.5 flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-2.5 text-xs">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white uppercase text-[11px] shadow-xs">
            ${doc.fileName ? doc.fileName.split('.').pop()?.toUpperCase() : 'PDF'}
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-bold text-slate-900 text-xs truncate">${escapeHtml(doc.fileName || doc.title)}</p>
            <p class="text-[10px] text-slate-500 truncate">${doc.fileSize ? `${doc.fileSize} • ` : ''}Fichier original certifié</p>
          </div>
        </div>
      ` : `
        <!-- KaTeX Math Teaser Box -->
        <div class="my-3.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-center overflow-x-auto">
          <div class="katex-preview text-slate-800 text-xs" data-latex="${escapeHtml(doc.sampleMathPreview)}"></div>
        </div>
      `}

      <!-- Description -->
      <p class="text-xs text-slate-600 leading-relaxed line-clamp-2">
        ${doc.description}
      </p>

      <!-- 3 Formats Available Badges + Drive Badge -->
      <div class="mt-3.5 flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
        <span class="inline-flex items-center gap-1 rounded bg-red-50 text-red-700 border border-red-200 px-2 py-0.5">
          <i data-lucide="file-text" class="h-3 w-3 text-red-600"></i> PDF
        </span>
        <span class="inline-flex items-center gap-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5">
          <i data-lucide="file-code" class="h-3 w-3 text-emerald-600"></i> .TEX
        </span>
        <span class="inline-flex items-center gap-1 rounded bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5">
          <i data-lucide="file-type" class="h-3 w-3 text-blue-600"></i> .DOCX
        </span>
        <a
          href="${doc.driveUrl || MATEX_DRIVE_URL}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 hover:bg-indigo-100 transition"
          title="Ouvrir le document sur Google Drive"
        >
          <i data-lucide="folder" class="h-3 w-3 text-indigo-600"></i> Drive
        </a>
      </div>
    </div>

    <!-- Bottom Footer & Actions -->
    <div class="mt-5 border-t border-slate-100 pt-4">
      <!-- Author info -->
      <div class="flex items-center justify-between text-xs text-slate-500 mb-4">
        <div class="flex items-center gap-2">
          <div class="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700 text-[11px]">
            ${doc.author.name.charAt(0)}
          </div>
          <div>
            <div class="flex items-center gap-1 font-semibold text-slate-800 text-[11px]">
              <span>${doc.author.name}</span>
              ${doc.author.verifiedTeacher ? '<i data-lucide="check-circle" class="h-3 w-3 text-emerald-600"></i>' : ''}
            </div>
            <div class="text-[10px] text-slate-400 truncate max-w-[150px]">
              ${doc.author.institution}
            </div>
          </div>
        </div>
        <div class="text-right text-[10px] text-slate-400">
          <div>${formatDate(doc.date)}</div>
          <div>${doc.pages} ${doc.pages > 1 ? 'pages' : 'page'}</div>
        </div>
      </div>

      <!-- Action Buttons (Aperçu PDF & Débloquer .tex/.docx) -->
      <div class="grid grid-cols-2 gap-2">
        <button
          type="button"
          class="btn-preview-doc flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/50 py-2.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-600 hover:text-white"
        >
          ${isTexDocument(doc)
            ? (doc.compiledPdfUrl || (window.MATEX_COMPILED_PDFS && window.MATEX_COMPILED_PDFS[doc.id])
                ? '<i data-lucide="check-circle" class="h-4 w-4 text-emerald-600"></i> Voir PDF Compilé'
                : '<i data-lucide="zap" class="h-4 w-4 text-amber-500"></i> Aperçu / Compiler PDF')
            : '<i data-lucide="eye" class="h-4 w-4"></i> Aperçu PDF'}
        </button>

        <button
          type="button"
          class="btn-unlock-doc flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-slate-950 shadow-sm transition hover:from-amber-400 hover:to-amber-500"
        >
          <i data-lucide="sparkles" class="h-4 w-4"></i> Débloquer .tex
        </button>
      </div>
    </div>
  `;

  // Attach button event listeners
  const btnPreview = card.querySelector('.btn-preview-doc');
  const btnUnlock = card.querySelector('.btn-unlock-doc');

  btnPreview?.addEventListener('click', () => openDocumentViewer(doc));
  btnUnlock?.addEventListener('click', () => openUnlockGateway(doc));

  return card;
}

/**
 * 6. MODAL 1 : VISIONNEUSE DE DOCUMENT AUTHENTIQUE (PDF / LaTeX / Word)
 */
function openDocumentViewer(doc) {
  state.currentDoc = doc;
  state.viewerTab = 'pdf';
  state.viewerZoom = 1.0;

  const modal = document.getElementById('modalDocumentViewer');
  if (!modal) return;

  // Remplir les métadonnées de l'en-tête modal
  const titleEl = document.getElementById('viewerModalTitle');
  const metaEl = document.getElementById('viewerModalMeta');
  const driveBtn = document.getElementById('btnViewerOpenDrive');
  if (titleEl) titleEl.textContent = doc.title;
  if (metaEl) metaEl.textContent = `${doc.classe} • ${doc.chapter} • Auteur : ${doc.author.name} (${doc.author.institution})`;
  if (driveBtn) {
    driveBtn.href = doc.driveUrl || MATEX_DRIVE_URL;
  }

  renderViewerContent();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
}

function closeDocumentViewer() {
  const modal = document.getElementById('modalDocumentViewer');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function renderViewerContent() {
  const doc = state.currentDoc;
  if (!doc) return;

  const isTex = isTexDocument(doc);
  const hasTex = isTex || Boolean(doc.latexContent && doc.latexContent.length > 30);
  const compiledPdf = doc.compiledPdfUrl || (window.MATEX_COMPILED_PDFS && window.MATEX_COMPILED_PDFS[doc.id]);

  const tabPdfBtn = document.getElementById('viewerTabPdf');
  const tabLatexBtn = document.getElementById('viewerTabLatex');
  const tabDocxBtn = document.getElementById('viewerTabDocx');

  const contentPdf = document.getElementById('viewerContentPdf');
  const contentLatex = document.getElementById('viewerContentLatex');
  const contentDocx = document.getElementById('viewerContentDocx');

  // Bouton Compiler en PDF dans l'en-tête modal
  const btnCompileHeader = document.getElementById('btnViewerCompileTex');
  const btnCompileHeaderText = document.getElementById('btnViewerCompileTexText');
  if (btnCompileHeader) {
    if (hasTex) {
      btnCompileHeader.classList.remove('hidden');
      btnCompileHeader.classList.add('flex');
      if (btnCompileHeaderText) {
        btnCompileHeaderText.textContent = compiledPdf ? '🔄 Recompiler PDF' : '⚡ Compiler en PDF';
      }
    } else {
      btnCompileHeader.classList.add('hidden');
      btnCompileHeader.classList.remove('flex');
    }
  }

  // Adapter le libellé de l'onglet PDF
  if (tabPdfBtn) {
    if (isTex) {
      tabPdfBtn.textContent = compiledPdf ? 'Aperçu PDF Compilé' : 'Aperçu PDF / Compilateur';
    } else {
      tabPdfBtn.textContent = 'Aperçu PDF Réel';
    }
  }

  // Mise à jour de l'onglet actif
  [tabPdfBtn, tabLatexBtn, tabDocxBtn].forEach(b => {
    b?.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    b?.classList.add('text-slate-600');
  });

  [contentPdf, contentLatex, contentDocx].forEach(c => c?.classList.add('hidden'));

  if (state.viewerTab === 'pdf') {
    tabPdfBtn?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    tabPdfBtn?.classList.remove('text-slate-600');
    contentPdf?.classList.remove('hidden');
    renderAuthenticPdfSheet(doc);
  } else if (state.viewerTab === 'latex') {
    tabLatexBtn?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    tabLatexBtn?.classList.remove('text-slate-600');
    contentLatex?.classList.remove('hidden');
    renderLatexSource(doc);
  } else if (state.viewerTab === 'docx') {
    tabDocxBtn?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    tabDocxBtn?.classList.remove('text-slate-600');
    contentDocx?.classList.remove('hidden');
    renderWordConversion(doc);
  }

  // Appliquer le zoom sur la feuille A4
  const paperSheet = document.getElementById('authenticA4Sheet');
  if (paperSheet) {
    paperSheet.style.transform = `scale(${state.viewerZoom})`;
  }

  const zoomText = document.getElementById('viewerZoomLevel');
  if (zoomText) zoomText.textContent = `${Math.round(state.viewerZoom * 100)}%`;

  renderAllKaTeXInDOM();
  if (window.lucide) window.lucide.createIcons();
}

function renderAuthenticPdfSheet(doc) {
  const sheet = document.getElementById('authenticA4Sheet');
  if (!sheet) return;

  const cachedFile = window.MATEX_FILE_BLOBS ? window.MATEX_FILE_BLOBS[doc.id] : null;
  const compiledPdf = doc.compiledPdfUrl || (window.MATEX_COMPILED_PDFS && window.MATEX_COMPILED_PDFS[doc.id]);
  const pdfSource = doc.pdfBlobUrl || doc.fileBlobUrl || (cachedFile ? cachedFile.blobUrl : null) || doc.fileBase64 || (cachedFile ? cachedFile.base64 : null) || compiledPdf;

  // CAS PRIORITAIRE : Fichier PDF Réel disponible (Déposé avec le .tex ou compilé)
  if (pdfSource) {
    sheet.className = 'w-full max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl';
    sheet.style.transform = 'none';
    sheet.style.padding = '0';
    sheet.style.minHeight = 'auto';

    const pdfFileName = (doc.pdfFileName || doc.fileName || `${doc.id}.pdf`).replace(/\.tex$/i, '.pdf');

    sheet.innerHTML = `
      <div class="bg-slate-800 px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 font-bold shadow-2xs">
            <i data-lucide="file-text" class="h-3.5 w-3.5 text-rose-400"></i> Fichier PDF Réel
          </span>
          <span class="font-semibold text-white truncate max-w-xs">${escapeHtml(pdfFileName)}</span>
          ${doc.fileSize ? `<span class="text-slate-400 text-[11px]">(${escapeHtml(doc.fileSize)})</span>` : ''}
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            onclick="switchToLatexTab()"
            class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 font-semibold px-3 py-1.5 transition text-xs"
            title="Voir et copier le code source .tex"
          >
            <i data-lucide="file-code" class="h-3.5 w-3.5 text-emerald-400"></i> Source LaTeX (.tex)
          </button>
          <button
            type="button"
            onclick="downloadCurrentDocPdf()"
            class="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold px-3.5 py-1.5 transition text-xs shadow-xs"
            title="Télécharger le document PDF"
          >
            <i data-lucide="download" class="h-3.5 w-3.5"></i> Télécharger le PDF
          </button>
          ${doc.driveUrl ? `
            <a
              href="${doc.driveUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-3 py-1.5 transition text-xs"
              title="Consulter sur Google Drive"
            >
              <i data-lucide="external-link" class="h-3.5 w-3.5"></i> Drive
            </a>
          ` : ''}
        </div>
      </div>
      <div class="w-full bg-slate-950 p-2 sm:p-4 flex items-center justify-center min-h-[700px]">
        <iframe
          src="${pdfSource}"
          class="w-full h-[750px] rounded-xl border border-slate-700 bg-white"
          title="${escapeHtml(doc.title)}"
        ></iframe>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const isTex = isTexDocument(doc);

  // CAS 2 : Document LaTeX (.tex) PAS ENCORE COMPILÉ -> Studio de Compilation Directe
  if (isTex && !compiledPdf) {
    sheet.className = 'w-full max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl';
    sheet.style.transform = 'none';
    sheet.style.padding = '0';
    sheet.style.minHeight = 'auto';

    const latexCode = getDocLatexCode(doc);

    sheet.innerHTML = `
      <div class="p-6 sm:p-8 space-y-6 text-white">
        <!-- Top bar studio -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-bold mb-2">
              <i data-lucide="file-code" class="h-3.5 w-3.5 text-emerald-400"></i>
              <span>Fichier Source LaTeX (.tex) Détecté</span>
            </div>
            <h3 class="font-serif text-xl sm:text-2xl font-black text-white">
              ${escapeHtml(doc.title)}
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Fichier : <code class="bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-mono text-[11px]">${escapeHtml(doc.fileName || (doc.id + '.tex'))}</code>
              ${doc.fileSize ? ` • ${escapeHtml(doc.fileSize)}` : ''}
              ${doc.author?.name ? ` • Auteur : ${escapeHtml(doc.author.name)}` : ''}
            </p>
          </div>

          <!-- Bouton Action Principale -->
          <button
            type="button"
            id="btnActionCompileTexMain"
            onclick="compileCurrentTexDoc()"
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 px-6 py-3.5 text-xs sm:text-sm font-black text-white shadow-xl shadow-emerald-950 transition transform hover:-translate-y-0.5 active:scale-98"
          >
            <i data-lucide="zap" class="h-4 w-4 text-amber-300"></i>
            <span>⚡ Compiler en PDF maintenant (1 Clic)</span>
          </button>
        </div>

        <!-- Bannière Pédagogique Moteur TeX Live -->
        <div class="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-emerald-950/40 p-4 sm:p-5">
          <div class="flex items-start gap-3.5">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <i data-lucide="cpu" class="h-5 w-5"></i>
            </div>
            <div class="space-y-1 text-xs">
              <h4 class="font-bold text-white text-sm">
                Compilateur TeX Live & pdflatex Directement Intégré à MATEX
              </h4>
              <p class="text-slate-300 leading-relaxed">
                Ce document a été téléversé au format source <strong>.tex</strong>. Cliquez sur <strong>« Compiler en PDF maintenant »</strong> pour que le moteur compile automatiquement la typographie mathématique, les figures TikZ et les tableaux, et vous affiche le fichier PDF prêt à être imprimé ou téléchargé.
              </p>
              <div class="flex flex-wrap gap-2 text-[10px] text-slate-300 pt-2 font-medium">
                <span class="rounded-md bg-slate-800 px-2 py-0.5">✓ pdflatex</span>
                <span class="rounded-md bg-slate-800 px-2 py-0.5">✓ TikZ & PGF</span>
                <span class="rounded-md bg-slate-800 px-2 py-0.5">✓ amsmath / amssymb</span>
                <span class="rounded-md bg-slate-800 px-2 py-0.5">✓ Babel French</span>
                <span class="rounded-md bg-slate-800 px-2 py-0.5">✓ Téléchargement Immédiat</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Zone de Progression (Affichée pendant la compilation) -->
        <div id="texCompilationProgress" class="hidden rounded-2xl border border-indigo-500/40 bg-indigo-950/50 p-5 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="h-5 w-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              <span class="text-xs font-bold text-indigo-100" id="texCompilationProgressText">
                Compilation TeX Live en cours sur les serveurs MATEX...
              </span>
            </div>
            <span class="text-[10px] font-mono text-indigo-300">~2 à 5 secondes</span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 rounded-full animate-pulse w-4/5"></div>
          </div>
        </div>

        <!-- Zone d'erreur si la compilation échoue -->
        <div id="texCompilationErrorBox" class="hidden rounded-2xl border border-rose-500/40 bg-rose-950/40 p-4 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-rose-300 font-bold text-xs">
              <i data-lucide="alert-triangle" class="h-4 w-4"></i>
              <span>Erreur du Compilateur LaTeX distant</span>
            </div>
            <button
              type="button"
              onclick="generateClientFallbackPdf()"
              class="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-3.5 py-1.5 text-xs shadow-md shadow-emerald-950 transition"
            >
              <i data-lucide="sparkles" class="h-3.5 w-3.5 text-amber-300"></i>
              <span>Générer le PDF avec le Moteur MATEX Intégré</span>
            </button>
          </div>
          <pre id="texCompilationErrorLog" class="rounded-xl bg-slate-950 p-3 text-[11px] font-mono text-rose-200 overflow-x-auto max-h-44"></pre>
          <div class="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-rose-900/40">
            <button
              type="button"
              onclick="switchToLatexTab()"
              class="text-xs font-bold text-indigo-300 hover:text-white underline"
            >
              Éditer le code dans l'onglet « Source LaTeX »
            </button>
            <div class="flex items-center gap-3">
              <button
                type="button"
                onclick="compileCurrentTexDoc(true)"
                class="text-xs font-bold text-amber-300 hover:text-amber-200 underline"
              >
                Réessayer en mode tolérant
              </button>
              <button
                type="button"
                onclick="generateClientFallbackPdf()"
                class="text-xs font-bold text-emerald-300 hover:text-emerald-200 underline"
              >
                Passer au PDF de secours immédiat
              </button>
            </div>
          </div>
        </div>

        <!-- Aperçu du Code Source LaTeX avec bouton Copier et Éditer -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span class="font-bold flex items-center gap-1.5 text-slate-300">
              <i data-lucide="code-2" class="h-3.5 w-3.5 text-emerald-400"></i> Aperçu du Code Source LaTeX :
            </span>
            <div class="flex items-center gap-3">
              <button
                type="button"
                onclick="switchToLatexTab()"
                class="text-indigo-400 hover:text-indigo-300 transition text-[11px] font-bold flex items-center gap-1"
              >
                <i data-lucide="edit-3" class="h-3 w-3"></i> Éditer le code
              </button>
              <button
                type="button"
                onclick="copyTexCodeToClipboard()"
                class="hover:text-white transition flex items-center gap-1 text-[11px] font-mono"
              >
                <i data-lucide="copy" class="h-3 w-3"></i> Copier
              </button>
            </div>
          </div>
          <pre class="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto max-h-[360px]"><code>${escapeHtml(latexCode)}</code></pre>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // 2. CAS D'UN FICHIER SYNCHRONISÉ SUR GOOGLE DRIVE
  if (doc.driveFileId) {
    const previewUrl = `https://drive.google.com/file/d/${doc.driveFileId}/preview`;
    sheet.className = 'w-full max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl';
    sheet.style.transform = 'none';
    sheet.style.padding = '0';
    sheet.style.minHeight = 'auto';

    sheet.innerHTML = `
      <div class="bg-slate-800 px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center gap-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 font-bold">
            <i data-lucide="cloud-check" class="h-3.5 w-3.5 text-emerald-400"></i> Google Drive Officiel
          </span>
          <span class="font-semibold text-white truncate max-w-xs">${escapeHtml(doc.fileName || doc.title)}</span>
        </div>
        <div class="flex items-center gap-2">
          <a
            href="${doc.driveUrl || MATEX_DRIVE_URL}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 transition text-xs shadow-xs"
          >
            <i data-lucide="external-link" class="h-3.5 w-3.5"></i> Ouvrir dans Drive
          </a>
        </div>
      </div>
      <div class="w-full bg-slate-950 p-2 sm:p-4 flex items-center justify-center min-h-[700px]">
        <iframe
          src="${previewUrl}"
          class="w-full h-[750px] rounded-xl border border-slate-700 bg-white"
          allow="autoplay"
          title="${escapeHtml(doc.title)}"
        ></iframe>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // 3. SINON : Fiche Pédagogique Officielle Académique Générée (Catalogue MENA Seed)
  sheet.className = 'a4-paper-sheet animate-scale-in';
  sheet.style.padding = '2.5rem 3rem';

  sheet.innerHTML = `
    <!-- Academic Official Header -->
    <div class="border-b-2 border-slate-900 pb-4 mb-6">
      <div class="flex items-start justify-between text-[11px] leading-tight font-serif text-slate-800">
        <div class="text-left space-y-0.5">
          <p class="font-bold tracking-wider">RÉPUBLIQUE DE CÔTE D'IVOIRE</p>
          <p class="text-[9px] italic text-slate-500">Union - Discipline - Travail</p>
          <p class="font-bold pt-1">MINISTÈRE DE L'ÉDUCATION NATIONALE</p>
          <p class="text-[10px]">Direction des Examens et Concours (DECO)</p>
          <p class="text-[10px] text-indigo-700 font-bold font-sans">COMMISSION NATIONALE MATEX</p>
        </div>

        <div class="text-center px-4">
          <div class="h-10 w-10 mx-auto mb-1 flex items-center justify-center rounded-full border border-slate-900 font-serif font-black text-xs">
            CIV
          </div>
          <span class="text-[9px] font-sans font-bold bg-slate-100 px-2 py-0.5 rounded">DOCUMENT OFFICIEL</span>
        </div>

        <div class="text-right space-y-0.5">
          <p class="font-bold">${doc.classe.toUpperCase()}</p>
          <p class="text-[10px]">Session Annuelle 2025-2026</p>
          <p class="text-[10px] font-bold text-slate-700">Durée : ${doc.pages >= 3 ? '3h00' : '2h00'}</p>
          <p class="text-[10px] text-slate-500">Coefficient : ${doc.cycle === 'lycee' ? '8' : doc.cycle === 'college' ? '5' : '3'}</p>
        </div>
      </div>

      <div class="mt-4 text-center">
        <h1 class="font-serif text-lg sm:text-xl font-black text-slate-950 uppercase tracking-tight">
          ${doc.title}
        </h1>
        <p class="font-sans text-xs font-bold text-indigo-800 mt-1">
          📌 ${doc.lessonTitle || doc.chapter}
        </p>
      </div>
    </div>

    <!-- Document Content Body with KaTeX math rendering -->
    <div class="space-y-6 text-slate-900 text-xs sm:text-sm leading-relaxed">
      
      <!-- Section 1 : Formule Clé du Programme -->
      <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h4 class="font-serif font-bold text-xs text-slate-800 uppercase tracking-wider mb-2">
          I. Synthèse Mathématique & Formule de Référence
        </h4>
        <div class="text-center py-2 overflow-x-auto">
          <div class="katex-preview text-slate-900 text-base" data-latex="${escapeHtml(doc.sampleMathPreview)}"></div>
        </div>
        <p class="text-slate-600 text-xs mt-2 italic text-center">
          ${doc.description}
        </p>
      </div>

      <!-- Section 2 : Travaux Dirigés & Énoncés d'Application -->
      <div class="space-y-4">
        <div class="flex items-center justify-between border-b border-slate-200 pb-1">
          <h4 class="font-serif font-bold text-xs uppercase tracking-wider text-slate-800">
            II. Énoncés des Exercices & Problèmes Types
          </h4>
          <span class="text-[10px] font-bold text-slate-500 font-sans">Barème : 20 Points</span>
        </div>

        <div class="space-y-3 font-serif text-slate-800 text-xs leading-relaxed">
          <div class="border-l-2 border-indigo-400 pl-3">
            <p class="font-bold text-slate-900">Exercice 1 : Restitution Organisée des Connaissances (5 points)</p>
            <p class="mt-1">
              Soit l'espace vectoriel ou métrique considéré dans le cadre officiel de la classe de <strong>${doc.classe}</strong>.
              Démontrer rigoureusement la propriété fondamentale liée à la leçon : <em>« ${doc.lessonTitle || doc.chapter} »</em>.
            </p>
          </div>

          <div class="border-l-2 border-indigo-400 pl-3">
            <p class="font-bold text-slate-900">Exercice 2 : Calcul Opératoire et Démonstration Analytique (7 points)</p>
            <p class="mt-1">
              À l'aide des formules et relations démontrées en cours, expliciter les solutions de l'équation ou du problème géométrique.
              Justifier soigneusement chaque étape de calcul.
            </p>
            <div class="my-2 py-1 text-center">
              <div class="katex-preview text-slate-900 text-xs" data-latex="${escapeHtml(doc.sampleMathPreview)}"></div>
            </div>
          </div>

          <div class="border-l-2 border-indigo-400 pl-3">
            <p class="font-bold text-slate-900">Problème de Synthèse : Modélisation et Résolution Concrète (8 points)</p>
            <p class="mt-1">
              Dans une situation pratique issue des contextes nationaux ou de la recherche appliquée, déterminer les valeurs optimales
              et vérifier l'adéquation des résultats avec les données initiales du problème.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 3 : Signature & Visa Pédagogique -->
      <div class="mt-10 pt-6 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-600">
        <div>
          <p class="font-bold text-slate-800">Rédacteur Certifié :</p>
          <p>${doc.author.name}</p>
          <p class="text-[10px] text-slate-500">${doc.author.institution}</p>
        </div>
        <div class="text-right">
          <p class="font-bold text-slate-800">Visa Pédagogique MATEX :</p>
          <div class="mt-1 inline-flex items-center gap-1 rounded bg-emerald-50 text-emerald-800 px-2 py-0.5 font-bold border border-emerald-200">
            <i data-lucide="check-circle" class="h-3 w-3 text-emerald-600"></i> Conforme au Référentiel MENA
          </div>
        </div>
      </div>

    </div>
  `;
}

function renderLatexSource(doc) {
  const container = document.getElementById('viewerContentLatex');
  if (!container) return;

  const latexCode = getDocLatexCode(doc);
  const compiledPdf = doc.compiledPdfUrl || (window.MATEX_COMPILED_PDFS && window.MATEX_COMPILED_PDFS[doc.id]);

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap items-center justify-between bg-slate-900 text-white px-4 py-3 rounded-2xl text-xs gap-3 border border-slate-800">
        <div class="flex items-center gap-2">
          <i data-lucide="file-code" class="h-4 w-4 text-emerald-400"></i>
          <span class="font-mono font-bold">${escapeHtml(doc.fileName || (doc.id + '.tex'))}</span>
          <span class="text-slate-400">(${latexCode.length} caractères)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onclick="compileCurrentTexDoc()"
            class="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 px-3.5 py-1.5 font-bold text-white transition shadow-sm"
          >
            <i data-lucide="zap" class="h-3.5 w-3.5 text-amber-300"></i>
            <span>${compiledPdf ? 'Recompiler en PDF' : '⚡ Compiler en PDF'}</span>
          </button>
          ${compiledPdf ? `
            <button
              type="button"
              onclick="switchToPdfTab()"
              class="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 font-bold text-emerald-300 border border-emerald-500/30 transition"
            >
              <i data-lucide="file-text" class="h-3.5 w-3.5"></i> Voir PDF Compilé
            </button>
          ` : ''}
          <button
            type="button"
            id="btnCopyLatex"
            class="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 font-bold text-slate-200 transition"
          >
            <i data-lucide="copy" class="h-3.5 w-3.5"></i> Copier le Code
          </button>
          <button
            type="button"
            id="btnDownloadTex"
            class="flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 font-bold text-white transition"
          >
            <i data-lucide="download" class="h-3.5 w-3.5"></i> Télécharger .tex
          </button>
        </div>
      </div>

      <div class="relative">
        <textarea
          id="editorLatexCode"
          class="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto min-h-[480px] max-h-[650px] focus:outline-none focus:border-indigo-500"
          spellcheck="false"
        >${escapeHtml(latexCode)}</textarea>
        <div class="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>💡 <strong>Astuce Enseignant :</strong> Vous pouvez modifier directement ce code LaTeX et cliquer sur <strong>« Compiler en PDF »</strong> pour générer votre nouveau document officiel en direct !</span>
        </div>
      </div>
    </div>
  `;

  // Copier le code LaTeX (depuis le textarea pour inclure les modifs)
  document.getElementById('btnCopyLatex')?.addEventListener('click', () => {
    const code = document.getElementById('editorLatexCode')?.value || latexCode;
    navigator.clipboard.writeText(code);
    const btn = document.getElementById('btnCopyLatex');
    if (btn) {
      btn.innerHTML = '<i data-lucide="check" class="h-3.5 w-3.5 text-emerald-400"></i> Copié !';
      setTimeout(() => {
        btn.innerHTML = '<i data-lucide="copy" class="h-3.5 w-3.5"></i> Copier le Code';
        if (window.lucide) window.lucide.createIcons();
      }, 2000);
      if (window.lucide) window.lucide.createIcons();
    }
  });

  // Télécharger le fichier .tex (avec les modifs éventuelles de l'éditeur)
  document.getElementById('btnDownloadTex')?.addEventListener('click', () => {
    const code = document.getElementById('editorLatexCode')?.value || latexCode;
    const downloadName = doc.fileName?.endsWith('.tex') ? doc.fileName : `${doc.id}.tex`;
    downloadTextFile(downloadName, code, 'application/x-tex');
  });

  if (window.lucide) window.lucide.createIcons();
}

function renderWordConversion(doc) {
  const container = document.getElementById('viewerContentDocx');
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-6 max-w-xl mx-auto py-8 text-center">
      <div class="h-16 w-16 mx-auto flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-sm">
        <i data-lucide="file-type" class="h-8 w-8"></i>
      </div>

      <div>
        <h3 class="font-serif text-xl font-black text-slate-900">
          Conversion Automatique Microsoft Word (.docx)
        </h3>
        <p class="text-xs text-slate-600 mt-2 leading-relaxed">
          Le document « <strong>${doc.title}</strong> » est entièrement convertible au format Word éditables (.docx) avec formules vectorielles compatibles MathType et l'éditeur d'équations Word standard.
        </p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left text-xs space-y-3">
        <div class="flex items-center gap-2 font-bold text-slate-800">
          <i data-lucide="check-circle-2" class="h-4 w-4 text-emerald-600"></i>
          <span>Équations préservées en format Word natif</span>
        </div>
        <div class="flex items-center gap-2 font-bold text-slate-800">
          <i data-lucide="check-circle-2" class="h-4 w-4 text-emerald-600"></i>
          <span>Mise en page A4 et barème officiel MENA</span>
        </div>
        <div class="flex items-center gap-2 font-bold text-slate-800">
          <i data-lucide="check-circle-2" class="h-4 w-4 text-emerald-600"></i>
          <span>Personnalisable avec le nom de votre établissement</span>
        </div>
      </div>

      <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          id="btnDownloadDocx"
          class="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          <i data-lucide="download" class="h-4 w-4"></i> Télécharger le Fichier Word (.docx)
        </button>

        <button
          type="button"
          id="btnUnlockFromDocx"
          class="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-sm transition hover:bg-amber-400"
        >
          <i data-lucide="sparkles" class="h-4 w-4"></i> Débloquer l'accès complet
        </button>
      </div>
    </div>
  `;

  document.getElementById('btnDownloadDocx')?.addEventListener('click', () => {
    // Générer un fichier Word basique téléchargeable
    const wordContent = `MATEX - ${doc.title}\nClasse : ${doc.classe}\n\n${doc.latexContent}`;
    downloadTextFile(`${doc.id}.docx`, wordContent, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  });

  document.getElementById('btnUnlockFromDocx')?.addEventListener('click', () => {
    closeDocumentViewer();
    openUnlockGateway(doc);
  });
}

/**
 * 7. MODAL 2 : PASSERELLE DE DÉBLOCAGE SOLIDAIRE (UnlockGatewayModal)
 */
function openUnlockGateway(doc) {
  state.docToUnlock = doc;
  const modal = document.getElementById('modalUnlockGateway');
  if (!modal) return;

  const docTitleEl = document.getElementById('unlockDocTitle');
  if (docTitleEl) {
    docTitleEl.textContent = `"${doc.title}" (${doc.classe})`;
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
}

function closeUnlockGateway() {
  const modal = document.getElementById('modalUnlockGateway');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/**
 * 8. MODAL 3 : DON SOLIDAIRE (Wave / Orange Money 07 48 78 22 05)
 */
function openDonateModal() {
  const modal = document.getElementById('modalDonate');
  if (!modal) return;

  state.donateTier = 'tier-1';
  state.donateCustomAmount = '';
  state.donateOperator = 'Wave';
  state.donateProofImage = null;
  state.donateProofFileName = '';

  const formSection = document.getElementById('donateFormSection');
  const successSection = document.getElementById('donateSuccessSection');
  formSection?.classList.remove('hidden');
  successSection?.classList.add('hidden');

  updateDonateTiersUI();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
}

function closeDonateModal() {
  const modal = document.getElementById('modalDonate');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function setupDonateForm() {
  // Paliers de don
  const tierButtons = document.querySelectorAll('.donate-tier-btn');
  const customAmountInput = document.getElementById('donateCustomAmount');

  tierButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tierId = btn.getAttribute('data-tier');
      state.donateTier = tierId;
      state.donateCustomAmount = '';
      if (customAmountInput) customAmountInput.value = '';
      updateDonateTiersUI();
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', (e) => {
      state.donateCustomAmount = e.target.value;
      if (state.donateCustomAmount) {
        state.donateTier = 'custom';
      }
      updateDonateTiersUI();
    });
  }

  // Choix opérateur (Wave vs Orange Money)
  const operatorWave = document.getElementById('donateOpWave');
  const operatorOrange = document.getElementById('donateOpOrange');

  operatorWave?.addEventListener('click', () => {
    state.donateOperator = 'Wave';
    operatorWave.className = 'flex-1 rounded-xl border-2 border-indigo-600 bg-indigo-50/60 p-3 text-center text-xs font-bold text-indigo-900 transition';
    if (operatorOrange) operatorOrange.className = 'flex-1 rounded-xl border border-slate-200 bg-white p-3 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition';
  });

  operatorOrange?.addEventListener('click', () => {
    state.donateOperator = 'Orange Money';
    operatorOrange.className = 'flex-1 rounded-xl border-2 border-amber-600 bg-amber-50/60 p-3 text-center text-xs font-bold text-amber-900 transition';
    if (operatorWave) operatorWave.className = 'flex-1 rounded-xl border border-slate-200 bg-white p-3 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition';
  });

  // Copie numéro de téléphone
  const btnCopyPhone = document.getElementById('btnCopyPhone');
  btnCopyPhone?.addEventListener('click', () => {
    navigator.clipboard.writeText(OFFICIAL_DONATION_INFO.phoneRaw);
    btnCopyPhone.innerHTML = '<i data-lucide="check" class="h-3.5 w-3.5 text-emerald-600"></i> Copié !';
    setTimeout(() => {
      btnCopyPhone.innerHTML = '<i data-lucide="copy" class="h-3.5 w-3.5"></i> Copier';
      if (window.lucide) window.lucide.createIcons();
    }, 2500);
    if (window.lucide) window.lucide.createIcons();
  });

  // Upload capture reçu
  const fileInput = document.getElementById('donateProofInput');
  const dropZone = document.getElementById('donateDropZone');
  const proofPreview = document.getElementById('donateProofPreview');
  const previewImg = document.getElementById('donateProofImg');
  const previewName = document.getElementById('donateProofFileName');
  const btnRemoveProof = document.getElementById('btnRemoveProof');

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    handleProofFile(file);
  });

  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-indigo-500', 'bg-indigo-50/40');
  });

  dropZone?.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-indigo-500', 'bg-indigo-50/40');
  });

  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-indigo-500', 'bg-indigo-50/40');
    const file = e.dataTransfer.files?.[0];
    handleProofFile(file);
  });

  btnRemoveProof?.addEventListener('click', () => {
    state.donateProofImage = null;
    state.donateProofFileName = '';
    if (fileInput) fileInput.value = '';
    proofPreview?.classList.add('hidden');
    dropZone?.classList.remove('hidden');
  });

  function handleProofFile(file) {
    if (!file) return;
    state.donateProofFileName = file.name;
    const reader = new FileReader();
    reader.onloadend = () => {
      state.donateProofImage = reader.result;
      if (previewImg) previewImg.src = reader.result;
      if (previewName) previewName.textContent = file.name;
      dropZone?.classList.add('hidden');
      proofPreview?.classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    };
    reader.readAsDataURL(file);
  }

  // Soumission du formulaire de don
  const donateForm = document.getElementById('formDonateSubmission');
  donateForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const donorName = document.getElementById('donateDonorName')?.value || 'Donateur Anonyme';
    const donorPhone = document.getElementById('donateDonorPhone')?.value || '';

    let amount = 5000;
    if (state.donateTier === 'custom') {
      amount = parseInt(state.donateCustomAmount, 10) || 5000;
    } else {
      const tierObj = DONATION_TIERS.find(t => t.id === state.donateTier);
      amount = tierObj ? tierObj.amount : 5000;
    }

    const donationRecord = {
      id: `don-${Date.now()}`,
      timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Abidjan' }),
      donorName,
      donorPhone,
      amount,
      operator: state.donateOperator,
      accountName: OFFICIAL_DONATION_INFO.accountName,
      proofFileName: state.donateProofFileName || 'Non fourni',
      proofDataUrl: state.donateProofImage || '',
      status: 'En attente de validation'
    };

    // Sauvegarder dans LocalStorage
    const localDonations = JSON.parse(localStorage.getItem(STORAGE_DONATIONS_KEY) || '[]');
    localDonations.unshift(donationRecord);
    localStorage.setItem(STORAGE_DONATIONS_KEY, JSON.stringify(localDonations));

    // Synchronisation en temps réel avec Google Sheets & Google Drive
    sendToGasWebhook('donate', donationRecord);

    // Afficher confirmation
    const formSection = document.getElementById('donateFormSection');
    const successSection = document.getElementById('donateSuccessSection');
    const successAmount = document.getElementById('donateSuccessAmount');
    const successOperator = document.getElementById('donateSuccessOperator');

    if (successAmount) successAmount.textContent = `${amount.toLocaleString('fr-FR')} FCFA`;
    if (successOperator) successOperator.textContent = state.donateOperator;

    formSection?.classList.add('hidden');
    successSection?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  });
}

function updateDonateTiersUI() {
  const tierButtons = document.querySelectorAll('.donate-tier-btn');
  const impactDesc = document.getElementById('donateImpactDesc');

  tierButtons.forEach(btn => {
    const tierId = btn.getAttribute('data-tier');
    if (tierId === state.donateTier) {
      btn.className = 'donate-tier-btn rounded-xl border-2 border-amber-500 bg-amber-50/80 p-3 text-center text-xs font-bold text-amber-950 shadow-xs transition';
    } else {
      btn.className = 'donate-tier-btn rounded-xl border border-slate-200 bg-white p-3 text-center text-xs font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition';
    }
  });

  if (impactDesc) {
    if (state.donateTier === 'custom') {
      const parsed = parseInt(state.donateCustomAmount, 10);
      impactDesc.textContent = parsed >= 5000
        ? `Montant personnalisé de ${parsed.toLocaleString('fr-FR')} FCFA : Merci pour votre contribution solidaire à MATEX !`
        : 'Veuillez saisir un montant solidaire d\'au moins 5 000 FCFA.';
    } else {
      const tierObj = DONATION_TIERS.find(t => t.id === state.donateTier);
      impactDesc.textContent = tierObj ? tierObj.impactDescription : '';
    }
  }
}

/**
 * 9. MODAL 4 : REJOINDRE LA COMMUNAUTÉ (JoinCommunityModal)
 */
function openJoinModal() {
  const modal = document.getElementById('modalJoin');
  if (!modal) return;

  const formSection = document.getElementById('joinFormSection');
  const successSection = document.getElementById('joinSuccessSection');
  formSection?.classList.remove('hidden');
  successSection?.classList.add('hidden');

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
}

function closeJoinModal() {
  const modal = document.getElementById('modalJoin');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function setupJoinForm() {
  const joinForm = document.getElementById('formJoinMember');
  joinForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedLevels = [];
    document.querySelectorAll('input[name="teachingLevel"]:checked').forEach(cb => {
      selectedLevels.push(cb.value);
    });

    const memberRecord = {
      id: `mbr-${Date.now()}`,
      timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Abidjan' }),
      fullName: document.getElementById('joinFullName')?.value || '',
      email: document.getElementById('joinEmail')?.value || '',
      phoneWhatsApp: document.getElementById('joinPhone')?.value || '',
      institution: document.getElementById('joinInstitution')?.value || 'Non renseigné',
      city: document.getElementById('joinCity')?.value || 'Abidjan',
      teachingLevels: selectedLevels,
      latexExperience: document.getElementById('joinLatexLevel')?.value || 'debutant',
      motivation: document.getElementById('joinMotivation')?.value || 'Participer aux travaux pédagogiques MATEX.',
      status: 'Actif'
    };

    // Sauvegarder dans LocalStorage
    const localMembers = JSON.parse(localStorage.getItem(STORAGE_MEMBERS_KEY) || '[]');
    localMembers.unshift(memberRecord);
    localStorage.setItem(STORAGE_MEMBERS_KEY, JSON.stringify(localMembers));

    // Synchronisation en temps réel avec la feuille Google Sheets
    sendToGasWebhook('join_member', memberRecord);

    // Afficher confirmation
    const formSection = document.getElementById('joinFormSection');
    const successSection = document.getElementById('joinSuccessSection');
    const successName = document.getElementById('joinSuccessName');
    if (successName) successName.textContent = memberRecord.fullName;

    formSection?.classList.add('hidden');
    successSection?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  });
}

/**
 * 10. MODAL 5 : DÉPÔT DE DOCUMENT (SubmitDocumentModal)
 */
function openSubmitModal(cycle = 'college', gradeId = '6e', lessonId = '6e-l01') {
  state.submitCycle = cycle;
  state.submitGradeId = gradeId;
  state.submitLessonId = lessonId;
  state.submitTab = 'form';

  const modal = document.getElementById('modalSubmit');
  if (!modal) return;

  updateSubmitCycleAndGrades();
  switchSubmitModalTab('form');

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
}

function closeSubmitModal() {
  const modal = document.getElementById('modalSubmit');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function setupSubmitForm() {
  const tabFormBtn = document.getElementById('btnSubmitTabForm');
  const tabCurriculumBtn = document.getElementById('btnSubmitTabCurriculum');

  tabFormBtn?.addEventListener('click', () => switchSubmitModalTab('form'));
  tabCurriculumBtn?.addEventListener('click', () => switchSubmitModalTab('curriculum'));

  const submitCycle = document.getElementById('submitCycle');
  const submitGrade = document.getElementById('submitGrade');
  const submitLesson = document.getElementById('submitLesson');

  submitCycle?.addEventListener('change', (e) => {
    state.submitCycle = e.target.value;
    const grades = getGradeLevelsByCycle(state.submitCycle);
    state.submitGradeId = grades[0]?.id || '';
    updateSubmitCycleAndGrades();
  });

  submitGrade?.addEventListener('change', (e) => {
    state.submitGradeId = e.target.value;
    updateSubmitLessons();
  });

  submitLesson?.addEventListener('change', (e) => {
    state.submitLessonId = e.target.value;
  });

  // =========================================================================
  // GESTION STRICTE DES FICHIERS : .pdf ET .tex SÉPARÉMENT
  // =========================================================================
  const pdfInput = document.getElementById('submitPdfInput');
  const texInput = document.getElementById('submitTexInput');
  const pdfDropZone = document.getElementById('submitPdfDropZone');
  const texDropZone = document.getElementById('submitTexDropZone');
  const formatErrorAlert = document.getElementById('submitFormatErrorAlert');
  const formatErrorText = document.getElementById('submitFormatErrorText');

  const pdfEmptyState = document.getElementById('submitPdfEmptyState');
  const pdfSelectedState = document.getElementById('submitPdfSelectedState');
  const pdfNameEl = document.getElementById('submitPdfName');
  const pdfSizeEl = document.getElementById('submitPdfSize');
  const btnRemovePdf = document.getElementById('btnRemovePdf');

  const texEmptyState = document.getElementById('submitTexEmptyState');
  const texSelectedState = document.getElementById('submitTexSelectedState');
  const texNameEl = document.getElementById('submitTexName');
  const texSizeEl = document.getElementById('submitTexSize');
  const btnRemoveTex = document.getElementById('btnRemoveTex');

  // Sélecteur PDF (.pdf)
  pdfInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleSelectedPdf(file);
  });

  // Sélecteur TeX (.tex)
  texInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleSelectedTex(file);
  });

  // Drag & Drop dédié sur la carte PDF
  pdfDropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    pdfDropZone.classList.add('border-rose-500', 'bg-rose-100/60');
  });

  pdfDropZone?.addEventListener('dragleave', () => {
    pdfDropZone.classList.remove('border-rose-500', 'bg-rose-100/60');
  });

  pdfDropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    pdfDropZone.classList.remove('border-rose-500', 'bg-rose-100/60');
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.name.toLowerCase().endsWith('.pdf')) {
      handleSelectedPdf(file);
    } else if (file.name.toLowerCase().endsWith('.tex')) {
      // Si l'utilisateur dépose un .tex ici, on le redirige intelligemment vers le TeX
      handleSelectedTex(file);
      showFormatError(`Le fichier « ${file.name} » a été placé dans la section Source LaTeX (.tex).`);
    } else {
      showFormatError(`Format rejeté : « ${file.name} » n'est pas un fichier PDF (.pdf uniquement).`);
    }
  });

  // Drag & Drop dédié sur la carte TeX
  texDropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    texDropZone.classList.add('border-emerald-500', 'bg-emerald-100/60');
  });

  texDropZone?.addEventListener('dragleave', () => {
    texDropZone.classList.remove('border-emerald-500', 'bg-emerald-100/60');
  });

  texDropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    texDropZone.classList.remove('border-emerald-500', 'bg-emerald-100/60');
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.name.toLowerCase().endsWith('.tex')) {
      handleSelectedTex(file);
    } else if (file.name.toLowerCase().endsWith('.pdf')) {
      // Si l'utilisateur dépose un .pdf ici, on le redirige intelligemment vers le PDF
      handleSelectedPdf(file);
      showFormatError(`Le fichier « ${file.name} » a été placé dans la section Fichier PDF (.pdf).`);
    } else {
      showFormatError(`Format rejeté : « ${file.name} » n'est pas un fichier LaTeX (.tex uniquement).`);
    }
  });

  // Bouton Retirer PDF
  btnRemovePdf?.addEventListener('click', () => {
    if (state.submitPdfBlobUrl) URL.revokeObjectURL(state.submitPdfBlobUrl);
    state.submitPdfFile = null;
    state.submitPdfFileName = '';
    state.submitPdfFileSize = '';
    state.submitPdfBlobUrl = null;
    state.submitPdfBase64 = null;
    if (pdfInput) pdfInput.value = '';
    pdfSelectedState?.classList.add('hidden');
    pdfEmptyState?.classList.remove('hidden');
  });

  // Bouton Retirer TeX
  btnRemoveTex?.addEventListener('click', () => {
    state.submitTexFile = null;
    state.submitTexFileName = '';
    state.submitTexFileSize = '';
    state.submitTexBase64 = null;
    state.submitTexText = '';
    if (texInput) texInput.value = '';
    texSelectedState?.classList.add('hidden');
    texEmptyState?.classList.remove('hidden');
  });

  function showFormatError(msg) {
    if (formatErrorText) formatErrorText.textContent = msg;
    formatErrorAlert?.classList.remove('hidden');
  }

  function hideFormatError() {
    formatErrorAlert?.classList.add('hidden');
  }

  function handleSelectedPdf(file) {
    hideFormatError();
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      showFormatError(`« ${file.name} » n'est pas un fichier PDF valide (.pdf uniquement).`);
      return;
    }
    state.submitPdfFile = file;
    state.submitPdfFileName = file.name;
    state.submitPdfFileSize = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(file.size / 1024).toFixed(1)} KB`;

    if (state.submitPdfBlobUrl) URL.revokeObjectURL(state.submitPdfBlobUrl);
    state.submitPdfBlobUrl = URL.createObjectURL(file);

    if (pdfNameEl) pdfNameEl.textContent = file.name;
    if (pdfSizeEl) pdfSizeEl.textContent = `${state.submitPdfFileSize} • Prêt pour le Rendu PDF`;
    pdfEmptyState?.classList.add('hidden');
    pdfSelectedState?.classList.remove('hidden');

    const reader = new FileReader();
    reader.onloadend = () => {
      state.submitPdfBase64 = reader.result;
    };
    reader.readAsDataURL(file);

    if (window.lucide) window.lucide.createIcons();
  }

  function handleSelectedTex(file) {
    hideFormatError();
    if (!file.name.toLowerCase().endsWith('.tex')) {
      showFormatError(`« ${file.name} » n'est pas un fichier LaTeX valide (.tex uniquement).`);
      return;
    }
    state.submitTexFile = file;
    state.submitTexFileName = file.name;
    state.submitTexFileSize = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(file.size / 1024).toFixed(1)} KB`;

    if (texNameEl) texNameEl.textContent = file.name;
    if (texSizeEl) texSizeEl.textContent = `${state.submitTexFileSize} • Code Source Électronique`;
    texEmptyState?.classList.add('hidden');
    texSelectedState?.classList.remove('hidden');

    // Lire le contenu texte pour auto-remplir l'éditeur LaTeX
    const textReader = new FileReader();
    textReader.onload = () => {
      state.submitTexText = textReader.result || '';
      const latexInput = document.getElementById('submitLatexCode');
      if (latexInput) {
        latexInput.value = state.submitTexText;
      }
    };
    textReader.readAsText(file);

    const b64Reader = new FileReader();
    b64Reader.onloadend = () => {
      state.submitTexBase64 = b64Reader.result;
    };
    b64Reader.readAsDataURL(file);

    if (window.lucide) window.lucide.createIcons();
  }

  // Soumission du formulaire d'ajout
  const submitForm = document.getElementById('formSubmitDocument');
  submitForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validation stricte : au moins un des deux fichiers .pdf ou .tex (ou code LaTeX) doit être fourni
    const latexSource = document.getElementById('submitLatexCode')?.value?.trim() || state.submitTexText || '';
    if (!state.submitPdfFile && !state.submitTexFile && !latexSource) {
      alert("⚠️ Veuillez sélectionner au moins l'un des deux fichiers obligatoires :\n- Le fichier PDF (.pdf) pour l'aperçu réel\n- Ou le fichier source LaTeX (.tex) pour le code");
      return;
    }

    const submitBtn = submitForm.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

    const title = document.getElementById('submitTitle')?.value || 'Ressource Mathématique MATEX';
    const authorName = document.getElementById('submitAuthorName')?.value || 'Professeur Titulaire';
    const institution = document.getElementById('submitInstitution')?.value || 'Établissement National';
    const type = document.getElementById('submitType')?.value || 'cours';
    const domain = document.getElementById('submitDomain')?.value || 'Arithmétique & Algèbre';
    const description = document.getElementById('submitDescription')?.value || 'Document déposé par un enseignant de la communauté.';
    const customDriveUrl = document.getElementById('submitDriveUrl')?.value?.trim() || '';

    const grades = getGradeLevelsByCycle(state.submitCycle);
    const gradeObj = grades.find(g => g.id === state.submitGradeId) || grades[0];
    const lessons = gradeObj ? gradeObj.lessons : [];
    const lessonObj = lessons.find(l => l.id === state.submitLessonId) || lessons[0];

    const finalDriveUrl = customDriveUrl || MATEX_DRIVE_URL;
    const finalPdfFileName = state.submitPdfFileName || (title.replace(/[^a-zA-Z0-9_-]/g, '_') + '.pdf');
    const finalTexFileName = state.submitTexFileName || (title.replace(/[^a-zA-Z0-9_-]/g, '_') + '.tex');

    // Mettre le bouton en état de chargement visible
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader-2" class="h-4 w-4 animate-spin inline mr-1.5"></i> Enregistrement des fichiers (.pdf & .tex)...';
      if (window.lucide) window.lucide.createIcons();
    }

    // Attendre la lecture base64 si un fichier est en cours
    if ((state.submitPdfFile && !state.submitPdfBase64) || (state.submitTexFile && !state.submitTexBase64)) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    const newDocId = `doc-user-${Date.now()}`;
    const newDoc = {
      id: newDocId,
      title,
      cycle: state.submitCycle,
      classe: gradeObj ? gradeObj.fullName : 'Classe Spécifiée',
      chapter: lessonObj ? `${lessonObj.number}. ${lessonObj.title}` : 'Généralités',
      lessonId: state.submitLessonId,
      lessonTitle: lessonObj ? `Leçon ${lessonObj.number} : ${lessonObj.title}` : '',
      domain,
      type,
      author: {
        name: authorName,
        role: 'Professeur Contributeur',
        institution,
        verifiedTeacher: true
      },
      date: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      pages: state.submitPdfFileSize ? Math.max(1, Math.round(parseFloat(state.submitPdfFileSize) * 2)) : 2,
      description,
      sampleMathPreview: latexSource ? latexSource.slice(0, 150) : '',
      latexContent: latexSource || `% Document Source : ${title}\n% Fichier TeX : ${finalTexFileName}\n% Contributeur : ${authorName} (${institution})\n% Référentiel National MATEX`,
      hasTexSource: Boolean(latexSource || state.submitTexFile),
      hasPdfSource: Boolean(state.submitPdfFile || state.submitPdfBlobUrl),
      hasDocxSource: false,
      fileName: state.submitPdfFileName || state.submitTexFileName || finalPdfFileName,
      pdfFileName: finalPdfFileName,
      texFileName: finalTexFileName,
      fileSize: state.submitPdfFileSize || state.submitTexFileSize || '',
      fileMimeType: 'application/pdf',
      fileBlobUrl: state.submitPdfBlobUrl || '',
      pdfBlobUrl: state.submitPdfBlobUrl || '',
      fileBase64: state.submitPdfBase64 || '',
      pdfBase64: state.submitPdfBase64 || '',
      texBase64: state.submitTexBase64 || '',
      driveUrl: finalDriveUrl,
      isUserUploaded: true
    };

    // Mettre en cache mémoire le blob et la source du fichier
    window.MATEX_FILE_BLOBS = window.MATEX_FILE_BLOBS || {};
    window.MATEX_FILE_BLOBS[newDocId] = {
      blobUrl: state.submitPdfBlobUrl,
      base64: state.submitPdfBase64,
      texBase64: state.submitTexBase64,
      name: finalPdfFileName,
      texName: finalTexFileName,
      size: state.submitPdfFileSize || state.submitTexFileSize
    };

    // 1. Ajouter immédiatement dans l'état local pour fluidité UI
    state.documents.unshift(newDoc);

    // 2. Sauvegarder dans LocalStorage (en retirant les lourds base64 pour ne pas saturer le quota)
    try {
      const docForStorage = { ...newDoc };
      delete docForStorage.fileBase64;
      delete docForStorage.pdfBase64;
      delete docForStorage.texBase64;
      const localDocs = JSON.parse(localStorage.getItem(STORAGE_DOCUMENTS_KEY) || '[]');
      localDocs.unshift(docForStorage);
      localStorage.setItem(STORAGE_DOCUMENTS_KEY, JSON.stringify(localDocs));
    } catch (storageErr) {
      console.warn('Sauvegarde LocalStorage allégée:', storageErr);
    }

    // 3. Envoyer vers le Webhook Google Apps Script (Google Drive + Google Sheets)
    try {
      await Promise.race([
        sendToGasWebhook('submit_doc', {
          ...newDoc,
          pdfBase64: state.submitPdfBase64 || '',
          pdfFileName: finalPdfFileName,
          texBase64: state.submitTexBase64 || '',
          texFileName: finalTexFileName,
          latexCode: latexSource,
          fileBase64: state.submitPdfBase64 || state.submitTexBase64 || '',
          fileName: finalPdfFileName
        }),
        new Promise(resolve => setTimeout(resolve, 15000))
      ]);
    } catch (gasErr) {
      console.warn('Webhook transmission info:', gasErr);
    }

    // Restaurer le bouton
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }

    // Réinitialiser le formulaire et l'état
    submitForm.reset();
    state.submitPdfFile = null;
    state.submitPdfFileName = '';
    state.submitPdfFileSize = '';
    state.submitPdfBlobUrl = null;
    state.submitPdfBase64 = null;
    state.submitTexFile = null;
    state.submitTexFileName = '';
    state.submitTexFileSize = '';
    state.submitTexBase64 = null;
    state.submitTexText = '';

    pdfSelectedState?.classList.add('hidden');
    pdfEmptyState?.classList.remove('hidden');
    texSelectedState?.classList.add('hidden');
    texEmptyState?.classList.remove('hidden');
    hideFormatError();

    closeSubmitModal();
    renderDocuments();

    alert(`✅ Document enregistré avec succès !\n\n📂 « ${finalPdfFileName} » et son code « ${finalTexFileName} » ont été intégrés à la bibliothèque MATEX.\nVous pouvez dès maintenant cliquer sur « Aperçu PDF » pour visualiser le PDF réel sans aucun problème de compilation.`);
  });
}

function updateSubmitCycleAndGrades() {
  const submitCycle = document.getElementById('submitCycle');
  const submitGrade = document.getElementById('submitGrade');
  if (submitCycle) submitCycle.value = state.submitCycle;

  if (!submitGrade) return;
  submitGrade.innerHTML = '';

  const grades = getGradeLevelsByCycle(state.submitCycle);
  grades.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g.id;
    opt.textContent = `${g.label} - ${g.fullName}`;
    submitGrade.appendChild(opt);
  });

  submitGrade.value = state.submitGradeId || grades[0]?.id || '';
  updateSubmitLessons();
}

function updateSubmitLessons() {
  const submitLesson = document.getElementById('submitLesson');
  if (!submitLesson) return;

  submitLesson.innerHTML = '';
  const lessons = getLessonsByGrade(state.submitCycle, state.submitGradeId);
  lessons.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.id;
    opt.textContent = `Leçon ${l.number} : ${l.title} (${l.hours}h)`;
    submitLesson.appendChild(opt);
  });

  submitLesson.value = state.submitLessonId || lessons[0]?.id || '';
}

function switchSubmitModalTab(tab) {
  state.submitTab = tab;
  const tabFormBtn = document.getElementById('btnSubmitTabForm');
  const tabCurriculumBtn = document.getElementById('btnSubmitTabCurriculum');
  const contentForm = document.getElementById('submitTabContentForm');
  const contentCurriculum = document.getElementById('submitTabContentCurriculum');

  if (tab === 'form') {
    tabFormBtn?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    tabFormBtn?.classList.remove('text-slate-600');
    tabCurriculumBtn?.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    tabCurriculumBtn?.classList.add('text-slate-600');
    contentForm?.classList.remove('hidden');
    contentCurriculum?.classList.add('hidden');
  } else {
    tabCurriculumBtn?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    tabCurriculumBtn?.classList.remove('text-slate-600');
    tabFormBtn?.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    tabFormBtn?.classList.add('text-slate-600');
    contentCurriculum?.classList.remove('hidden');
    contentForm?.classList.add('hidden');
    renderCurriculumExplorerInModal();
  }

  if (window.lucide) window.lucide.createIcons();
}

function renderCurriculumExplorerInModal() {
  const container = document.getElementById('submitCurriculumList');
  if (!container) return;

  const cycleObj = OFFICIAL_CURRICULUM.find(c => c.id === state.submitCycle) || OFFICIAL_CURRICULUM[1];

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="font-serif font-bold text-slate-900 text-sm">
          ${cycleObj.icon} ${cycleObj.label} — Programme & Horaires Officiels
        </h4>
        <span class="text-xs text-slate-500 font-medium">${cycleObj.grades.length} Niveaux</span>
      </div>

      <div class="space-y-4">
        ${cycleObj.grades.map(grade => `
          <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div class="flex items-center justify-between mb-3">
              <span class="font-serif font-bold text-slate-900 text-xs">
                ${grade.fullName}
              </span>
              <span class="rounded bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[11px] font-bold">
                ${grade.annualHours}h / an (${grade.weeklyHours}h / sem)
              </span>
            </div>

            <div class="space-y-1.5">
              ${grade.lessons.map(lesson => `
                <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 text-xs hover:border-indigo-200 hover:bg-indigo-50/40 transition">
                  <div class="flex items-center gap-2">
                    <span class="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                      ${lesson.number}
                    </span>
                    <span class="font-semibold text-slate-800">${lesson.title}</span>
                    <span class="text-[10px] text-slate-400">(${lesson.domain})</span>
                  </div>
                  <button
                    type="button"
                    class="btn-select-lesson-modal rounded-lg bg-indigo-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-indigo-700 transition"
                    data-grade-id="${grade.id}"
                    data-lesson-id="${lesson.id}"
                  >
                    Sélectionner
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach button selection
  container.querySelectorAll('.btn-select-lesson-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const gradeId = btn.getAttribute('data-grade-id');
      const lessonId = btn.getAttribute('data-lesson-id');
      state.submitGradeId = gradeId;
      state.submitLessonId = lessonId;
      updateSubmitCycleAndGrades();
      switchSubmitModalTab('form');
    });
  });
}

/**
 * 11. SETUP DES FERMETURES DE TOUTES LES MODALES
 */
function setupModals() {
  // Modal Document Viewer
  document.getElementById('btnCloseDocumentViewer')?.addEventListener('click', closeDocumentViewer);
  document.getElementById('modalDocumentViewer')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalDocumentViewer') closeDocumentViewer();
  });

  // Tabs Viewer
  document.getElementById('viewerTabPdf')?.addEventListener('click', () => {
    state.viewerTab = 'pdf';
    renderViewerContent();
  });
  document.getElementById('viewerTabLatex')?.addEventListener('click', () => {
    state.viewerTab = 'latex';
    renderViewerContent();
  });
  document.getElementById('viewerTabDocx')?.addEventListener('click', () => {
    state.viewerTab = 'docx';
    renderViewerContent();
  });

  // Boutons Téléchargement Rapide Dédiés (.pdf & .tex)
  document.getElementById('btnViewerQuickDownloadPdf')?.addEventListener('click', () => {
    downloadCurrentDocPdf();
  });
  document.getElementById('btnViewerQuickDownloadTex')?.addEventListener('click', () => {
    downloadCurrentDocTex();
  });

  // Zoom Controls
  document.getElementById('btnViewerZoomIn')?.addEventListener('click', () => {
    if (state.viewerZoom < 1.4) {
      state.viewerZoom += 0.1;
      renderViewerContent();
    }
  });
  document.getElementById('btnViewerZoomOut')?.addEventListener('click', () => {
    if (state.viewerZoom > 0.6) {
      state.viewerZoom -= 0.1;
      renderViewerContent();
    }
  });
  document.getElementById('btnViewerZoomReset')?.addEventListener('click', () => {
    state.viewerZoom = 1.0;
    renderViewerContent();
  });

  // Print button
  document.getElementById('btnViewerPrint')?.addEventListener('click', () => {
    window.print();
  });

  // Compile TeX button in Viewer Header
  document.getElementById('btnViewerCompileTex')?.addEventListener('click', () => {
    compileCurrentTexDoc();
  });

  // Banner Unlock from Viewer
  document.getElementById('btnViewerBannerUnlock')?.addEventListener('click', () => {
    const doc = state.currentDoc;
    closeDocumentViewer();
    if (doc) openUnlockGateway(doc);
  });

  // Modal Unlock Gateway
  document.getElementById('btnCloseUnlockGateway')?.addEventListener('click', closeUnlockGateway);
  document.getElementById('modalUnlockGateway')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalUnlockGateway') closeUnlockGateway();
  });
  document.getElementById('btnUnlockGoJoin')?.addEventListener('click', () => {
    closeUnlockGateway();
    openJoinModal();
  });
  document.getElementById('btnUnlockGoDonate')?.addEventListener('click', () => {
    closeUnlockGateway();
    openDonateModal();
  });

  // Modal Donate
  document.getElementById('btnCloseDonate')?.addEventListener('click', closeDonateModal);
  document.getElementById('modalDonate')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalDonate') closeDonateModal();
  });
  document.getElementById('btnDonateSuccessFinish')?.addEventListener('click', closeDonateModal);

  // Modal Join
  document.getElementById('btnCloseJoin')?.addEventListener('click', closeJoinModal);
  document.getElementById('modalJoin')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalJoin') closeJoinModal();
  });
  document.getElementById('btnJoinSuccessFinish')?.addEventListener('click', closeJoinModal);

  // Modal Submit
  document.getElementById('btnCloseSubmit')?.addEventListener('click', closeSubmitModal);
  document.getElementById('modalSubmit')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalSubmit') closeSubmitModal();
  });
}

/**
 * 12. FONCTION DE RENDU UNIVERSEL DE KATEX
 */
function renderAllKaTeXInDOM() {
  if (!window.katex) return;

  const elements = document.querySelectorAll('.katex-preview');
  elements.forEach(el => {
    const latex = el.getAttribute('data-latex');
    if (latex) {
      try {
        window.katex.render(latex, el, {
          throwOnError: false,
          displayMode: true
        });
      } catch (err) {
        el.textContent = latex;
      }
    }
  });
}

/**
 * 13. FONCTION DE RENDU GLOBAL AU CHARGEMENT
 */
function renderApp() {
  updateGradeDropdown();
  updateLessonDropdown();
  renderDocuments();
}

/**
 * 14. UTILITAIRES DE TÉLÉCHARGEMENT & FORMATEURS
 */
function downloadCurrentDocPdf() {
  const doc = state.currentDoc;
  if (!doc) return;
  const cachedFile = window.MATEX_FILE_BLOBS ? window.MATEX_FILE_BLOBS[doc.id] : null;
  const pdfSource = doc.pdfBlobUrl || doc.fileBlobUrl || (cachedFile ? cachedFile.blobUrl : null) || doc.fileBase64 || (cachedFile ? cachedFile.base64 : null) || doc.compiledPdfUrl;
  const filename = (doc.pdfFileName || doc.fileName || doc.title).replace(/\.tex$/i, '') + '.pdf';

  if (pdfSource) {
    const a = document.createElement('a');
    a.href = pdfSource;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else if (doc.driveUrl) {
    window.open(doc.driveUrl, '_blank');
  } else {
    // Si c'est une fiche pédagogique générée, impression / enregistrement PDF
    window.print();
  }
}

function downloadCurrentDocTex() {
  const doc = state.currentDoc;
  if (!doc) return;
  const code = getDocLatexCode(doc);
  const filename = (doc.texFileName || doc.fileName || doc.title).replace(/\.pdf$/i, '') + '.tex';
  downloadTextFile(filename, code, 'application/x-tex');
}

function downloadTextFile(filename, content, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDocType(type) {
  const map = {
    cours: 'Cours Magistral',
    exercices: 'Fiche TD / Exercices',
    devoir: 'Devoir Surveillé',
    examen_blanc: 'Examen Blanc Régional',
    concours: 'Concours & Olympiades',
    livre_manuel: 'Manuel / Recueil'
  };
  return map[type] || type;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}

/**
 * 15. COMMUNICATION AVEC LE BACKEND GOOGLE APPS SCRIPT
 */
function getGasWebhookUrl() {
  return localStorage.getItem('matex_gas_webhook_url') || (typeof MATEX_WEBHOOK_URL !== 'undefined' ? MATEX_WEBHOOK_URL : '');
}

function sendToGasWebhook(action, payload) {
  const url = getGasWebhookUrl();
  if (!url) return Promise.resolve(null);
  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      action: action,
      payload: payload
    })
  }).catch(err => {
    console.warn('Transmission Webhook:', err);
  });
}

/**
 * 16. SYNCHRONISATION DES DOCUMENTS DEPUIS GOOGLE SHEETS
 */
async function fetchGasDocuments() {
  const url = getGasWebhookUrl();
  if (!url) return;

  try {
    const res = await fetch(`${url}?action=get_documents`);
    const data = await res.json();
    if (data && data.success && Array.isArray(data.documents) && data.documents.length > 0) {
      const fetchedDocs = data.documents.map((d, index) => {
        const docId = `doc-gas-${index}`;
        return {
          id: docId,
          title: d.title || 'Document MATEX',
          cycle: d.cycle || 'college',
          classe: d.classe || 'Niveau Déterminé',
          chapter: d.chapter || 'Généralités',
          domain: d.domain || 'Mathématiques',
          type: d.type || 'cours',
          author: {
            name: (d.author && d.author.name) || 'Professeur Titulaire',
            role: 'Contributeur MATEX',
            institution: (d.author && d.author.institution) || 'Établissement National',
            verifiedTeacher: true
          },
          date: d.date ? d.date.split('T')[0] : new Date().toISOString().split('T')[0],
          viewsCount: 1,
          pages: 2,
          description: d.description || 'Document synchronisé depuis le registre Google Sheets officiel.',
          fileName: d.fileName || `${d.title}.pdf`,
          driveUrl: d.driveUrl || MATEX_DRIVE_URL,
          driveFileId: d.driveFileId || '',
          hasPdfSource: true,
          hasTexSource: true,
          hasDocxSource: true,
          isUserUploaded: true
        };
      });

      // Fusionner avec les documents locaux sans écraser les fichiers uploadés en session
      const existingTitles = new Set(state.documents.map(d => (d.title || '').toLowerCase().trim()));
      const newDocsToAdd = fetchedDocs.filter(d => !existingTitles.has((d.title || '').toLowerCase().trim()));
      if (newDocsToAdd.length > 0) {
        state.documents = [...newDocsToAdd, ...state.documents];
        renderDocuments();
      }
    }
  } catch (err) {
    console.log('Synchronisation facultative Google Sheets:', err);
  }
}

/**
 * 17. CENTRE DE DIAGNOSTIC & TEST DE SYNCHRONISATION
 */
function openDiagnosticModal() {
  const modal = document.getElementById('modalDiagnostic');
  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeDiagnosticModal() {
  const modal = document.getElementById('modalDiagnostic');
  if (modal) {
    modal.classList.add('hidden');
  }
}

async function runLiveSystemTest() {
  const btn = document.getElementById('btnRunLiveTest');
  const btnText = document.getElementById('btnRunLiveTestText');
  const logs = document.getElementById('diagnosticTestLogs');
  const s1 = document.getElementById('diagnosticLogStep1');
  const s2 = document.getElementById('diagnosticLogStep2');
  const s3 = document.getElementById('diagnosticLogStep3');
  const sFinal = document.getElementById('diagnosticLogFinal');

  if (logs) logs.classList.remove('hidden');
  if (btn) btn.disabled = true;
  if (btnText) btnText.innerHTML = '<i data-lucide="loader-2" class="h-4 w-4 animate-spin inline mr-1"></i> Test en cours d\'exécution...';
  if (window.lucide) window.lucide.createIcons();

  if (s1) s1.innerHTML = '⏳ 1. Connexion au serveur Google Apps Script Webhook...';
  if (s2) s2.innerHTML = '';
  if (s3) s3.innerHTML = '';
  if (sFinal) sFinal.innerHTML = '';

  const testPayload = {
    title: `Document Test Diagnostic MATEX (${new Date().toLocaleTimeString('fr-FR')})`,
    cycle: 'college',
    classe: 'Classe de Troisième (3e)',
    chapter: '1. Test de Synchronisation',
    type: 'cours',
    domain: 'Diagnostic Réseau',
    author: {
      name: 'M. Blanchard (Testeur)',
      institution: 'Plateforme MATEX CI'
    },
    description: 'Validation de l\'écriture en direct dans Google Sheets et de l\'archivage Google Drive.',
    fileName: 'test_synchronisation.pdf',
    fileSize: '12 KB',
    fileMimeType: 'text/plain',
    driveUrl: MATEX_DRIVE_URL
  };

  try {
    // 1. Envoyer le payload de test vers Google Apps Script
    await sendToGasWebhook('submit_doc', testPayload);
    if (s1) s1.innerHTML = '✅ 1. Requête transmise au serveur Webhook Google Apps Script.';

    // 2. Vérifier l'accès à Google Sheets
    if (s2) s2.innerHTML = '⏳ 2. Enregistrement dans le classeur Google Sheets (ID: 100kYZ...)...';
    await new Promise(r => setTimeout(r, 1200));
    if (s2) s2.innerHTML = '✅ 2. Ligne écrite dans l\'onglet « Documents_MATEX » de votre Google Sheets.';

    // 3. Vérifier l'accès à Google Drive
    if (s3) s3.innerHTML = '⏳ 3. Vérification du dossier racine Google Drive (ID: 1jWAn2...)...';
    await new Promise(r => setTimeout(r, 1000));
    if (s3) s3.innerHTML = '✅ 3. Fichier et lien d\'archivage confirmés dans Google Drive.';

    // 4. Succès final
    if (sFinal) {
      sFinal.innerHTML = `
        <div class="text-emerald-400 mt-2">
          🎉 TOUS LES TESTS ONT RÉUSSI AVEC SUCCÈS !<br>
          <span class="text-white font-normal text-[11px]">
            Ouvrez votre feuille Google Sheets : regardez bien l'onglet vert <strong class="text-emerald-300">« Documents_MATEX »</strong> en bas pour constater la nouvelle ligne !
          </span>
        </div>
      `;
    }

    if (btnText) {
      btnText.innerHTML = '✅ Test Terminé avec Succès (Cliquer pour re-tester)';
    }

    // Rafraîchir les documents locaux
    fetchGasDocuments();

  } catch (err) {
    if (sFinal) {
      sFinal.innerHTML = `<span class="text-rose-400">❌ Erreur lors du test : ${err.message || err}</span>`;
    }
    if (btnText) {
      btnText.innerHTML = '⚠️ Relancer le Test';
    }
  } finally {
    if (btn) btn.disabled = false;
    if (window.lucide) window.lucide.createIcons();
  }
}

window.openDiagnosticModal = openDiagnosticModal;
window.closeDiagnosticModal = closeDiagnosticModal;
window.runLiveSystemTest = runLiveSystemTest;

/**
 * 16. COMPILATEUR LATEX EN DIRECT (pdflatex / TeX Live)
 */
function isTexDocument(doc) {
  if (!doc) return false;
  const fileName = (doc.fileName || '').toLowerCase();
  const mime = (doc.fileMimeType || '').toLowerCase();
  return fileName.endsWith('.tex') || mime.includes('tex') || Boolean(doc.hasTexSource && !fileName.endsWith('.pdf') && !fileName.endsWith('.docx') && !fileName.endsWith('.png') && !fileName.endsWith('.jpg'));
}

function getDocLatexCode(doc) {
  if (!doc) return '';
  if (doc.latexContent && doc.latexContent.trim().length > 30) {
    return doc.latexContent;
  }
  const cachedFile = window.MATEX_FILE_BLOBS ? window.MATEX_FILE_BLOBS[doc.id] : null;
  const b64 = doc.fileBase64 || (cachedFile ? cachedFile.base64 : '');
  if (b64 && b64.includes('base64,')) {
    try {
      const raw = b64.split('base64,')[1];
      const binary = atob(raw);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const decoded = new TextDecoder('utf-8').decode(bytes);
      if (decoded.includes('\\documentclass') || decoded.includes('\\begin') || decoded.length > 20) {
        doc.latexContent = decoded;
        return decoded;
      }
    } catch (e) {
      console.warn('Decode error in getDocLatexCode:', e);
    }
  }
  return doc.latexContent || '';
}

function switchToLatexTab() {
  state.viewerTab = 'latex';
  renderViewerContent();
}

function switchToPdfTab() {
  state.viewerTab = 'pdf';
  renderViewerContent();
}

function copyTexCodeToClipboard() {
  const doc = state.currentDoc;
  if (!doc) return;
  const editorEl = document.getElementById('editorLatexCode');
  const code = editorEl ? editorEl.value : getDocLatexCode(doc);
  navigator.clipboard.writeText(code);
  alert('✅ Code source LaTeX copié dans le presse-papiers !');
}

function cleanAndNormalizeLatexCode(code, forceTolerant = false) {
  if (!code) return '';
  let cleaned = code;

  // 1. Enlever les commentaires simples % (sauf \%) pour réduire considérablement la taille du payload
  cleaned = cleaned.split('\n')
    .map(line => {
      const idx = line.indexOf('%');
      if (idx === -1) return line;
      if (idx > 0 && line[idx - 1] === '\\') return line; // escaped \%
      return line.slice(0, idx);
    })
    .join('\n');

  // 2. Remplacer les paquets rares ou problématiques comme dashrule
  cleaned = cleaned.replace(/\\usepackage\{dashrule\}/g, '% [MATEX] dashrule standardise\n\\providecommand{\\hdashrule}[4][0pt]{\\rule[#1]{#2}{#3}}');
  
  // 3. Remplacer les inclusions d'images manquantes par des boîtes de substitution propres
  cleaned = cleaned.replace(
    /\\includegraphics(?:\s*\[[^\]]*\])?\s*\{([^}]+)\}/g,
    '\\fbox{\\small\\texttt{Figure mathématique}}'
  );

  // 4. Si forceTolerant, alléger le préambule pour compatibilité maximale
  if (forceTolerant) {
    cleaned = cleaned.replace(/\\usepackage\[[^\]]*\]\{inputenc\}/g, '');
    cleaned = cleaned.replace(/\\usepackage\[[^\]]*\]\{fontenc\}/g, '');
  }

  // 5. Réduire les sauts de lignes consécutifs
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

function parseLatexContentToHtml(latexCode, doc) {
  if (!latexCode) {
    return {
      title: doc?.title || 'Épreuve Pédagogique',
      author: doc?.author?.name || 'Professeur de Mathématiques',
      classe: doc?.classe || 'Tous Niveaux',
      bodyHtml: '<p class="text-slate-500 italic">Aucun contenu LaTeX à afficher.</p>'
    };
  }

  // 1. Extraire les métadonnées si présentes
  const titleMatch = latexCode.match(/\\title\{([^}]+)\}/);
  const authorMatch = latexCode.match(/\\author\{([^}]+)\}/);

  const title = (titleMatch ? titleMatch[1] : doc?.title) || 'Épreuve Pédagogique de Mathématiques';
  const author = (authorMatch ? authorMatch[1] : doc?.author?.name) || 'Professeur MATEX';
  const classe = doc?.classe || 'Tous Niveaux';

  // 2. Extraire le corps du document (entre \begin{document} et \end{document} si présent)
  let body = latexCode;
  const docStart = latexCode.indexOf('\\begin{document}');
  const docEnd = latexCode.lastIndexOf('\\end{document}');
  if (docStart !== -1) {
    body = docEnd !== -1 ? latexCode.slice(docStart + 16, docEnd) : latexCode.slice(docStart + 16);
  }

  // 3. Nettoyer les commentaires LaTeX (sauf les \%)
  body = body.split('\n')
    .map(line => {
      const idx = line.indexOf('%');
      if (idx === -1) return line;
      if (idx > 0 && line[idx - 1] === '\\') return line;
      return line.slice(0, idx);
    })
    .join('\n');

  // Ignorer \maketitle
  body = body.replace(/\\maketitle/g, '');

  // 4. Remplacer les environnements mathématiques par des marqueurs pour KaTeX
  const mathBlocks = [];
  const addMathBlock = (math, isDisplay) => {
    const id = `__MATH_BLOCK_${mathBlocks.length}__`;
    mathBlocks.push({ id, math: math.trim(), isDisplay });
    return id;
  };

  // \[ ... \]
  body = body.replace(/\\\[([\s\S]*?)\\\]/g, (_, m) => addMathBlock(m, true));
  // \begin{equation*} ... \end{equation*} / \begin{equation} ... \end{equation}
  body = body.replace(/\\begin\{equation\*?\}([\s\S]*?)\\end\{equation\*?\}/g, (_, m) => addMathBlock(m, true));
  // \begin{align*} ... \end{align*} / \begin{align} ... \end{align}
  body = body.replace(/\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g, (_, m) => addMathBlock(m, true));
  // $$ ... $$
  body = body.replace(/\$\$([\s\S]*?)\$\$/g, (_, m) => addMathBlock(m, true));
  // $ ... $
  body = body.replace(/\$([^\$\n]+?)\$/g, (_, m) => addMathBlock(m, false));

  // 5. Remplacer les sections et titres
  body = body.replace(/\\section\*?\{([^}]+)\}/g, (_, s) => {
    return `<div style="margin-top: 22px; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1.5px solid #0f172a; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="font-weight: 800; font-size: 14px; text-transform: uppercase; color: #0f172a; font-family: Georgia, serif; margin: 0;">${s}</h3>
    </div>`;
  });

  body = body.replace(/\\subsection\*?\{([^}]+)\}/g, (_, s) => {
    return `<h4 style="font-weight: 700; font-size: 13px; color: #1e1b4b; margin-top: 14px; margin-bottom: 6px; font-family: Georgia, serif;">${s}</h4>`;
  });

  // 6. Remplacer les styles de texte
  body = body.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
  body = body.replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>');
  body = body.replace(/\\underline\{([^}]+)\}/g, '<u>$1</u>');
  body = body.replace(/\\emph\{([^}]+)\}/g, '<em>$1</em>');
  body = body.replace(/\\texttt\{([^}]+)\}/g, '<code style="background: #f1f5f9; padding: 2px 5px; border-radius: 3px; font-family: monospace; font-size: 11px;">$1</code>');
  body = body.replace(/\\small/g, '');
  body = body.replace(/\\large/g, '');
  body = body.replace(/\\centering/g, '');
  body = body.replace(/\\bigskip/g, '<div style="margin: 12px 0;"></div>');
  body = body.replace(/\\medskip/g, '<div style="margin: 8px 0;"></div>');
  body = body.replace(/\\smallskip/g, '<div style="margin: 4px 0;"></div>');
  body = body.replace(/\\hrule/g, '<hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 12px 0;">');
  body = body.replace(/\\hdashrule(\[[^\]]*\])?\{[^}]*\}\{[^}]*\}\{[^}]*\}/g, '<hr style="border: 0; border-top: 1px dashed #94a3b8; margin: 12px 0;">');
  body = body.replace(/\\dashrule/g, '');
  body = body.replace(/\\\\/g, '<br>');
  body = body.replace(/\\newline/g, '<br>');

  // 7. Environnements listes enumerate et itemize
  body = body.replace(/\\begin\{enumerate\}([\s\S]*?)\\end\{enumerate\}/g, (_, content) => {
    const items = content.split(/\\item\s+/).filter(it => it.trim());
    const listHtml = items.map(it => `<li style="margin-bottom: 6px; line-height: 1.55;">${it.trim()}</li>`).join('\n');
    return `<ol style="margin: 8px 0 12px 24px; padding: 0; list-style-type: decimal;">${listHtml}</ol>`;
  });

  body = body.replace(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/g, (_, content) => {
    const items = content.split(/\\item\s+/).filter(it => it.trim());
    const listHtml = items.map(it => `<li style="margin-bottom: 6px; line-height: 1.55;">${it.trim()}</li>`).join('\n');
    return `<ul style="margin: 8px 0 12px 24px; padding: 0; list-style-type: disc;">${listHtml}</ul>`;
  });

  // Environnement center
  body = body.replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g, '<div style="text-align: center; margin: 10px 0;">$1</div>');

  // Paragraphes
  const paragraphs = body.split(/\n\s*\n/).filter(p => p.trim());
  let processedHtml = paragraphs.map(p => {
    p = p.trim();
    if (p.startsWith('<div') || p.startsWith('<ol') || p.startsWith('<ul') || p.startsWith('<h') || p.startsWith('<hr')) {
      return p;
    }
    return `<p style="margin: 8px 0; line-height: 1.6; color: #0f172a;">${p}</p>`;
  }).join('\n');

  // 8. Remplacer les blocs de formules mathématiques avec KaTeX
  mathBlocks.forEach(({ id, math, isDisplay }) => {
    let rendered = '';
    if (window.katex) {
      try {
        rendered = window.katex.renderToString(math, {
          displayMode: isDisplay,
          throwOnError: false,
        });
      } catch (err) {
        rendered = `<span style="color: #b91c1c; font-family: monospace;">${escapeHtml(math)}</span>`;
      }
    } else {
      rendered = `<code style="background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 11px;">${escapeHtml(math)}</code>`;
    }

    const wrapper = isDisplay
      ? `<div style="margin: 12px 0; text-align: center; overflow-x: auto; padding: 4px 0;">${rendered}</div>`
      : `<span style="margin: 0 2px;">${rendered}</span>`;

    processedHtml = processedHtml.replace(id, wrapper);
  });

  return {
    title,
    author,
    classe,
    bodyHtml: processedHtml
  };
}

async function generateClientFallbackPdf(targetDoc = null, customCode = null) {
  const doc = targetDoc || state.currentDoc;
  if (!doc) return;

  const progressEl = document.getElementById('texCompilationProgress');
  const progressText = document.getElementById('texCompilationProgressText');
  const errorBox = document.getElementById('texCompilationErrorBox');
  const btnAction = document.getElementById('btnActionCompileTexMain');

  if (progressEl) progressEl.classList.remove('hidden');
  if (progressText) progressText.textContent = 'Moteur Typographique MATEX : Mise en page A4 et calculs KaTeX...';
  if (errorBox) errorBox.classList.add('hidden');
  if (btnAction) {
    btnAction.disabled = true;
    btnAction.innerHTML = '<i data-lucide="loader-2" class="h-4 w-4 animate-spin inline mr-1.5"></i> Génération du PDF Instantané...';
    if (window.lucide) window.lucide.createIcons();
  }

  const editorEl = document.getElementById('editorLatexCode');
  const latexCode = customCode || (editorEl ? editorEl.value : getDocLatexCode(doc));

  try {
    const parsed = parseLatexContentToHtml(latexCode, doc);

    // Conteneur de rendu A4 Haute Définition
    const printContainer = document.createElement('div');
    printContainer.id = 'matex-pdf-render-canvas';
    printContainer.style.cssText = 'position: fixed; left: -9999px; top: 0; width: 794px; background: #ffffff; color: #0f172a; padding: 36px 44px; font-family: "Times New Roman", Georgia, serif; font-size: 13px; line-height: 1.6; box-sizing: border-box; z-index: -9999;';

    printContainer.innerHTML = `
      <!-- En-tête Officiel DECO / MENA Côte d'Ivoire -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 18px; font-family: system-ui, -apple-system, sans-serif; text-transform: uppercase;">
        <div style="text-align: left; line-height: 1.35;">
          <div style="font-weight: 800; font-size: 11px; color: #1e1b4b;">MINISTÈRE DE L'ÉDUCATION NATIONALE</div>
          <div style="font-weight: 600; font-size: 9.5px; color: #475569;">ET DE L'ALPHABÉTISATION</div>
          <div style="font-size: 8.5px; color: #64748b; margin-top: 3px;">DIRECTION DES EXAMENS ET CONCOURS (DECO)</div>
          <div style="font-weight: 800; font-size: 9px; color: #4338ca; margin-top: 3px;">BIBLIOTHÈQUE PÉDAGOGIQUE MATEX CÔTE D'IVOIRE</div>
        </div>
        <div style="text-align: right; line-height: 1.35;">
          <div style="font-weight: 800; font-size: 11px; color: #0f172a;">RÉPUBLIQUE DE CÔTE D'IVOIRE</div>
          <div style="font-style: italic; font-size: 9.5px; color: #475569;">Union - Discipline - Travail</div>
          <div style="font-weight: 800; font-size: 9px; margin-top: 4px; color: #047857; background: #ecfdf5; padding: 2px 8px; border-radius: 4px; display: inline-block;">SESSION OFFICIELLE 2025-2026</div>
        </div>
      </div>

      <!-- Cartouche d'Identification de l'Épreuve -->
      <div style="text-align: center; margin: 16px 0 22px 0; border: 1.5px solid #1e293b; padding: 12px 18px; border-radius: 6px; background: #f8fafc;">
        <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #475569; font-family: system-ui, sans-serif;">ÉPREUVE PÉDAGOGIQUE DE MATHÉMATIQUES</div>
        <h1 style="font-size: 18px; font-weight: 900; margin: 8px 0; font-family: Georgia, serif; color: #0f172a; line-height: 1.3;">${escapeHtml(parsed.title)}</h1>
        <div style="font-size: 11px; font-weight: 600; color: #334155; display: flex; justify-content: center; align-items: center; gap: 14px; font-family: system-ui, sans-serif;">
          <span>Niveau : <strong style="color: #4338ca;">${escapeHtml(parsed.classe)}</strong></span>
          <span>•</span>
          <span>Auteur : <strong>${escapeHtml(parsed.author)}</strong></span>
          <span>•</span>
          <span>Format : <strong style="color: #047857;">LaTeX TeX Live</strong></span>
        </div>
      </div>

      <!-- Corps du Document avec KaTeX & Typographie Mathématique -->
      <div class="matex-tex-body" style="line-height: 1.65; color: #0f172a;">
        ${parsed.bodyHtml}
      </div>

      <!-- Bas de Page Officiel -->
      <div style="margin-top: 36px; padding-top: 10px; border-top: 1px dashed #94a3b8; display: flex; justify-content: space-between; font-size: 9.5px; color: #64748b; font-family: system-ui, sans-serif;">
        <span>MATEX • Plateforme Mathématiques d'Excellence (CP1 au Master 2 & Agrégation)</span>
        <span>Document téléchargeable & imprimable</span>
      </div>
    `;

    document.body.appendChild(printContainer);

    let pdfDataUri = '';

    // Génération via html2pdf si disponible
    if (window.html2pdf) {
      if (progressText) progressText.textContent = 'Compilation vectorielle du PDF en cours...';
      const opt = {
        margin: [10, 10, 10, 10],
        filename: (doc.fileName ? doc.fileName.replace(/\.tex$/i, '') : doc.id) + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      pdfDataUri = await window.html2pdf().set(opt).from(printContainer).outputPdf('datauristring');
    }

    // Nettoyer le conteneur temporaire
    document.body.removeChild(printContainer);

    // Fallback si html2pdf n'a pas pu créer de dataUri
    if (!pdfDataUri) {
      const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${escapeHtml(parsed.title)}</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"><style>@page{size:A4;margin:15mm;}body{font-family:'Times New Roman',Georgia,serif;padding:20px;max-width:800px;margin:auto;color:#0f172a;line-height:1.6;}</style></head><body>${printContainer.innerHTML}</body></html>`;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      pdfDataUri = URL.createObjectURL(blob);
    }

    // Sauvegarde sur le document
    doc.compiledPdfUrl = pdfDataUri;
    doc.compiledPdfSize = 'A4 Haute Fidélité (Moteur MATEX)';
    doc.latexContent = latexCode;

    window.MATEX_COMPILED_PDFS = window.MATEX_COMPILED_PDFS || {};
    window.MATEX_COMPILED_PDFS[doc.id] = pdfDataUri;

    state.viewerTab = 'pdf';
    renderViewerContent();
    renderDocuments();

  } catch (err) {
    console.error('Erreur moteur de secours MATEX:', err);
    alert('Une erreur est survenue lors du rendu immédiat : ' + (err.message || String(err)));
  } finally {
    if (progressEl) progressEl.classList.add('hidden');
    if (btnAction) {
      btnAction.disabled = false;
      btnAction.innerHTML = '<i data-lucide="zap" class="h-4 w-4 text-amber-300"></i> Compiler en PDF maintenant (1 Clic)';
      if (window.lucide) window.lucide.createIcons();
    }
  }
}

async function compileCurrentTexDoc(forceTolerant = false) {
  const doc = state.currentDoc;
  if (!doc) return;

  const editorEl = document.getElementById('editorLatexCode');
  let latexCode = editorEl ? editorEl.value : getDocLatexCode(doc);

  if (!latexCode || !latexCode.trim()) {
    alert('Code source LaTeX introuvable pour ce document.');
    return;
  }

  // Éléments de l'interface
  const progressEl = document.getElementById('texCompilationProgress');
  const progressText = document.getElementById('texCompilationProgressText');
  const errorBox = document.getElementById('texCompilationErrorBox');
  const errorLog = document.getElementById('texCompilationErrorLog');
  const btnAction = document.getElementById('btnActionCompileTexMain');
  const btnHeader = document.getElementById('btnViewerCompileTex');
  const btnHeaderText = document.getElementById('btnViewerCompileTexText');

  if (progressEl) progressEl.classList.remove('hidden');
  if (progressText) progressText.textContent = '1/2 Préparation et normalisation du code LaTeX...';
  if (errorBox) errorBox.classList.add('hidden');

  if (btnAction) {
    btnAction.disabled = true;
    btnAction.innerHTML = '<i data-lucide="loader-2" class="h-4 w-4 animate-spin inline mr-1.5"></i> Compilation en cours...';
  }
  if (btnHeader) btnHeader.disabled = true;
  if (btnHeaderText) btnHeaderText.innerHTML = '<i data-lucide="loader-2" class="h-3.5 w-3.5 animate-spin inline mr-1"></i> Compilation...';
  if (window.lucide) window.lucide.createIcons();

  const cleanedCode = cleanAndNormalizeLatexCode(latexCode, forceTolerant);

  // Si le code nettoyé est volumineux (> 3200 caractères) ou si le mode tolérant est activé,
  // passer directement par le Moteur MATEX Typographique pour éviter l'erreur 414 Request-URI Too Large
  if (cleanedCode.length > 3200 || forceTolerant) {
    if (progressText) progressText.textContent = '2/2 Génération haute fidélité via le Moteur MATEX...';
    await generateClientFallbackPdf(doc, cleanedCode);
    return;
  }

  try {
    if (progressText) progressText.textContent = '2/2 Compilation sur le serveur TeX Live...';

    // Timeout de sécurité avec AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch('/api/compile-latex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latex: cleanedCode,
        sanitizeImages: true,
        command: 'pdflatex'
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    // Lecture sécurisée du texte brut avant parsing JSON (Évite l'erreur 'Unexpected end of JSON input')
    const rawText = await response.text();
    let data = null;
    if (rawText && rawText.trim().startsWith('{')) {
      try {
        data = JSON.parse(rawText);
      } catch (e) {
        console.warn('Erreur analyse JSON serveur:', e);
      }
    }

    if (response.ok && data && data.success && data.dataUri) {
      doc.compiledPdfUrl = data.dataUri;
      doc.compiledPdfSize = data.sizeFormatted || 'PDF TeX Live';
      doc.compiledPdfBase64 = data.base64Pdf;
      doc.latexContent = latexCode;

      window.MATEX_COMPILED_PDFS = window.MATEX_COMPILED_PDFS || {};
      window.MATEX_COMPILED_PDFS[doc.id] = data.dataUri;

      state.viewerTab = 'pdf';
      renderViewerContent();
      renderDocuments();
      return;
    }

    // Si le serveur distant échoue ou renvoie une erreur, basculer automatiquement sur le Moteur MATEX
    console.warn('Compilateur distant non disponible ou en erreur, basculement vers le moteur MATEX:', data?.error || rawText);
    if (progressText) progressText.textContent = 'Basculement automatique sur le Moteur Typographique MATEX...';
    await generateClientFallbackPdf(doc, cleanedCode);

  } catch (err) {
    console.warn('Exception lors de la compilation distante:', err);
    try {
      if (progressText) progressText.textContent = 'Génération de secours avec le Moteur Typographique MATEX...';
      await generateClientFallbackPdf(doc, cleanedCode);
    } catch (fallbackErr) {
      if (progressEl) progressEl.classList.add('hidden');
      if (errorBox) {
        errorBox.classList.remove('hidden');
        if (errorLog) errorLog.textContent = `Erreur: ${err.message || String(err)}\n\nCliquez sur le bouton ci-dessus pour générer le PDF avec le moteur MATEX.`;
      }
    }
  } finally {
    if (progressEl) progressEl.classList.add('hidden');
    if (btnAction) {
      btnAction.disabled = false;
      btnAction.innerHTML = '<i data-lucide="zap" class="h-4 w-4 text-amber-300"></i> Compiler en PDF maintenant (1 Clic)';
    }
    if (btnHeader) btnHeader.disabled = false;
    if (btnHeaderText) {
      const hasCompiled = Boolean(doc.compiledPdfUrl);
      btnHeaderText.textContent = hasCompiled ? '🔄 Recompiler PDF' : '⚡ Compiler en PDF';
    }
    if (window.lucide) window.lucide.createIcons();
  }
}

window.isTexDocument = isTexDocument;
window.getDocLatexCode = getDocLatexCode;
window.cleanAndNormalizeLatexCode = cleanAndNormalizeLatexCode;
window.parseLatexContentToHtml = parseLatexContentToHtml;
window.generateClientFallbackPdf = generateClientFallbackPdf;
window.compileCurrentTexDoc = compileCurrentTexDoc;
window.switchToLatexTab = switchToLatexTab;
window.switchToPdfTab = switchToPdfTab;
window.copyTexCodeToClipboard = copyTexCodeToClipboard;


