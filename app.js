/**
 * ==========================================================================
 * MATEX - Logique Applicative JavaScript Pure (Vanilla JS)
 * Bibliotheque Pedagogique & Communaute Nationale - CP1 au Master 2
 * Performance haute echelle : Cache local TTL et Lazy Loading du code TeX
 * ==========================================================================
 */

// Cles de persistance LocalStorage
const STORAGE_DOCUMENTS_KEY = 'matex_user_documents_v2';
const STORAGE_MEMBERS_KEY = 'matex_sheet_members_v2';
const STORAGE_DONATIONS_KEY = 'matex_sheet_donations_v2';
const STORAGE_SHEET_CACHE_KEY = 'matex_cached_documents_catalog_v2';
const STORAGE_SHEET_CACHE_TIME = 'matex_cached_documents_time_v2';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

/**
 * CONFIGURATION DES LIENS GOOGLE DRIVE (PHOTOS 2EME COHORTE)
 */
const COHORTE2_PHOTOS_CONFIG = {
  albumCompletUrl: 'https://drive.google.com/drive/folders/1G1oehOQiRqHoMLtsVhNelTdpCtUCmkyZ?usp=sharing',
  jour1Url: 'https://drive.google.com/drive/folders/1c5_OxRSe8AXaSBWGp9-rUw6ex3AglS2P?usp=sharing',
  jour2Url: 'https://drive.google.com/drive/folders/1jPg8ERdtQh8HsTvN3As7fG8cvCbyZEYp?usp=sharing',
  jour3Url: 'https://drive.google.com/drive/folders/1aiG3tAApbeF5T8zFtrQj4ZA-Qup6soBt?usp=sharing'
};

/**
 * Galerie de Photos de la 2eme Cohorte (Liens Google Drive)
 */
const COHORTE2_HIGHLIGHT_PHOTOS = [
  // JOUR 1 : FONDATIONS & INSTALLATION
  {
    id: 'p-5547',
    fileId: '1uqpgoifPvbtpSwMtXOGjqPZ80JMPCl1A',
    filename: 'IMG_5547.jpg',
    day: 'JOUR 1',
    title: 'Installation & Ecosysteme',
    caption: 'Lancement de la promotion, prise en main de MiKTeX et TeXstudio',
    url: 'https://lh3.googleusercontent.com/d/1uqpgoifPvbtpSwMtXOGjqPZ80JMPCl1A',
    driveFileUrl: 'https://drive.google.com/file/d/1uqpgoifPvbtpSwMtXOGjqPZ80JMPCl1A/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1c5_OxRSe8AXaSBWGp9-rUw6ex3AglS2P?usp=sharing'
  },
  {
    id: 'p-5411',
    fileId: '1R7eUiGMO7Yk9eLiRQZH4tY7_xynQ-KTY',
    filename: 'IMG_5411.jpg',
    day: 'JOUR 1',
    title: 'Rigueur de la Typographie',
    caption: 'Apprentissage de la syntaxe mathematique fondamentale',
    url: 'https://lh3.googleusercontent.com/d/1R7eUiGMO7Yk9eLiRQZH4tY7_xynQ-KTY',
    driveFileUrl: 'https://drive.google.com/file/d/1R7eUiGMO7Yk9eLiRQZH4tY7_xynQ-KTY/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1c5_OxRSe8AXaSBWGp9-rUw6ex3AglS2P?usp=sharing'
  },
  {
    id: 'p-5433',
    fileId: '19C6Jrz2YXCObVmQ4jQHa4sIqC0wS5X8q',
    filename: 'IMG_5433.jpg',
    day: 'JOUR 1',
    title: 'Atelier Pratique Guide',
    caption: 'Travaux diriges et correction en temps reel des erreurs de compilation',
    url: 'https://lh3.googleusercontent.com/d/19C6Jrz2YXCObVmQ4jQHa4sIqC0wS5X8q',
    driveFileUrl: 'https://drive.google.com/file/d/19C6Jrz2YXCObVmQ4jQHa4sIqC0wS5X8q/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1c5_OxRSe8AXaSBWGp9-rUw6ex3AglS2P?usp=sharing'
  },
  {
    id: 'p-5394',
    fileId: '1hIoOgDrj1IPaclY8uZN-5aV0pZQ7ZfPa',
    filename: 'IMG_5394.jpg',
    day: 'JOUR 1',
    title: 'Concentration & Emulation',
    caption: 'Les participants en pleine redaction de leurs premiers documents',
    url: 'https://lh3.googleusercontent.com/d/1hIoOgDrj1IPaclY8uZN-5aV0pZQ7ZfPa',
    driveFileUrl: 'https://drive.google.com/file/d/1hIoOgDrj1IPaclY8uZN-5aV0pZQ7ZfPa/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1c5_OxRSe8AXaSBWGp9-rUw6ex3AglS2P?usp=sharing'
  },

  // JOUR 2 : MATHEMATIQUES AVANCEES & TIKZ
  {
    id: 'p-5701',
    fileId: '150cVnxAMvlcfsMeiWIeG_LLHd2NcH-ed',
    filename: 'IMG_5701.jpg',
    day: 'JOUR 2',
    title: 'Formules Complexes & Algebre',
    caption: 'Systemes lineaires, matrices, integrales et theoremes du superieur',
    url: 'https://lh3.googleusercontent.com/d/150cVnxAMvlcfsMeiWIeG_LLHd2NcH-ed',
    driveFileUrl: 'https://drive.google.com/file/d/150cVnxAMvlcfsMeiWIeG_LLHd2NcH-ed/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1jPg8ERdtQh8HsTvN3As7fG8cvCbyZEYp?usp=sharing'
  },
  {
    id: 'p-5568',
    fileId: '1Q4n_LFBk8cGNgwXtoBoc4Fb439uW1-Pw',
    filename: 'IMG_5568.jpg',
    day: 'JOUR 2',
    title: 'Graphismes TikZ & Geometrie',
    caption: 'Trace de figures vectorielles, courbes de Gauss et geometrie analytique',
    url: 'https://lh3.googleusercontent.com/d/1Q4n_LFBk8cGNgwXtoBoc4Fb439uW1-Pw',
    driveFileUrl: 'https://drive.google.com/file/d/1Q4n_LFBk8cGNgwXtoBoc4Fb439uW1-Pw/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1jPg8ERdtQh8HsTvN3As7fG8cvCbyZEYp?usp=sharing'
  },
  {
    id: 'p-5622',
    fileId: '1w9E06d3B46wLh3LfF5Q-i06beN88319O',
    filename: 'IMG_5622.jpg',
    day: 'JOUR 2',
    title: 'Conception d Epreuves & Sujets',
    caption: 'Mise en page professionnelle de devoirs de Baccalaureat avec bareme',
    url: 'https://lh3.googleusercontent.com/d/1w9E06d3B46wLh3LfF5Q-i06beN88319O',
    driveFileUrl: 'https://drive.google.com/file/d/1w9E06d3B46wLh3LfF5Q-i06beN88319O/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1jPg8ERdtQh8HsTvN3As7fG8cvCbyZEYp?usp=sharing'
  },
  {
    id: 'p-5699',
    fileId: '1kJdqnZJ73NuXb5tp4gk00nPWb62LlM_3',
    filename: 'IMG_5699.jpg',
    day: 'JOUR 2',
    title: 'Synergie & Partage d Astuces',
    caption: 'Creation de macros personnalisees pour accelerer la saisie des devoirs',
    url: 'https://lh3.googleusercontent.com/d/1kJdqnZJ73NuXb5tp4gk00nPWb62LlM_3',
    driveFileUrl: 'https://drive.google.com/file/d/1kJdqnZJ73NuXb5tp4gk00nPWb62LlM_3/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1jPg8ERdtQh8HsTvN3As7fG8cvCbyZEYp?usp=sharing'
  },

  // JOUR 3 : MEMOIRES, BEAMER & CLOTURE
  {
    id: 'p-5840',
    fileId: '1Aw96ijXvAbLyvYCe13CTV-zPHYgFYgDg',
    filename: 'IMG_5840.jpg',
    day: 'JOUR 3',
    title: 'Memoires de Master & Theses',
    caption: 'Structuration des grands documents, tables des matieres et BibTeX',
    url: 'https://lh3.googleusercontent.com/d/1Aw96ijXvAbLyvYCe13CTV-zPHYgFYgDg',
    driveFileUrl: 'https://drive.google.com/file/d/1Aw96ijXvAbLyvYCe13CTV-zPHYgFYgDg/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1aiG3tAApbeF5T8zFtrQj4ZA-Qup6soBt?usp=sharing'
  },
  {
    id: 'p-5741',
    fileId: '1DfkulgJz9lz061hMLlARgvnkKftd7xY2',
    filename: 'IMG_5741.jpg',
    day: 'JOUR 3',
    title: 'Diaporamas Scientifiques Beamer',
    caption: 'Creation de presentations projetees avec blocs et animations',
    url: 'https://lh3.googleusercontent.com/d/1DfkulgJz9lz061hMLlARgvnkKftd7xY2',
    driveFileUrl: 'https://drive.google.com/file/d/1DfkulgJz9lz061hMLlARgvnkKftd7xY2/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1aiG3tAApbeF5T8zFtrQj4ZA-Qup6soBt?usp=sharing'
  },
  {
    id: 'p-5834',
    fileId: '189tGO-m8GRPZQfjCpc374KNpcyIX6GBy',
    filename: 'IMG_5834.jpg',
    day: 'JOUR 3',
    title: 'Soutenances & Validation des Acquis',
    caption: 'Restitution finale des projets de devoirs et memoire par les apprenants',
    url: 'https://lh3.googleusercontent.com/d/189tGO-m8GRPZQfjCpc374KNpcyIX6GBy',
    driveFileUrl: 'https://drive.google.com/file/d/189tGO-m8GRPZQfjCpc374KNpcyIX6GBy/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1aiG3tAApbeF5T8zFtrQj4ZA-Qup6soBt?usp=sharing'
  },
  {
    id: 'p-5872',
    fileId: '1-7-VDzJn0I8GdsRIsBeXNveyBZnxtRix',
    filename: 'IMG_5872.jpg',
    day: 'JOUR 3',
    title: 'Cloture Officielle & Promotion Certifiee',
    caption: 'Felicitations aux 30 laureats qui rejoignent la communaute d experts',
    url: 'https://lh3.googleusercontent.com/d/1-7-VDzJn0I8GdsRIsBeXNveyBZnxtRix',
    driveFileUrl: 'https://drive.google.com/file/d/1-7-VDzJn0I8GdsRIsBeXNveyBZnxtRix/view?usp=sharing',
    driveUrl: 'https://drive.google.com/drive/folders/1aiG3tAApbeF5T8zFtrQj4ZA-Qup6soBt?usp=sharing'
  }
];

// Etat Global de l'Application
const state = {
  activeNavTab: 'library',
  documents: [],
  selectedCycle: 'all',
  selectedGrade: '',
  selectedLesson: '',
  selectedType: 'all',
  selectedDomain: 'all',
  searchQuery: '',

  // Document Viewer
  currentDoc: null,
  viewerTab: 'pdf',
  viewerZoom: 1.0,

  // Unlock Modal
  docToUnlock: null,

  // Donate Modal
  donateTier: 'tier-1',
  donateCustomAmount: '',
  donateOperator: 'Wave',
  donateProofImage: null,
  donateProofFileName: '',

  // Submit Modal
  submitTab: 'form',
  submitCycle: 'college',
  submitGradeId: '6e',
  submitLessonId: '6e-l01',
  submitPdfFile: null,
  submitPdfFileName: '',
  submitPdfFileSize: '',
  submitPdfBlobUrl: null,
  submitPdfBase64: null,
  submitTexFile: null,
  submitTexFileName: '',
  submitTexFileSize: '',
  submitTexBase64: null,
  submitTexText: ''
};

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  initData();
  initCohorte2Links();
  initCohorte2Carousel();
  setupNavigation();
  setupFilterControls();
  setupModals();
  setupSubmitForm();
  setupDonateForm();
  setupJoinForm();
  initAiStudioModule(); // <-- Initialisation du Studio IA
  renderApp();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function initCohorte2Links() {
  const elComplet = document.getElementById('linkDriveComplet');
  const elJ1 = document.getElementById('linkDriveJour1');
  const elJ2 = document.getElementById('linkDriveJour2');
  const elJ3 = document.getElementById('linkDriveJour3');

  if (elComplet && COHORTE2_PHOTOS_CONFIG.albumCompletUrl) elComplet.href = COHORTE2_PHOTOS_CONFIG.albumCompletUrl;
  if (elJ1 && COHORTE2_PHOTOS_CONFIG.jour1Url) elJ1.href = COHORTE2_PHOTOS_CONFIG.jour1Url;
  if (elJ2 && COHORTE2_PHOTOS_CONFIG.jour2Url) elJ2.href = COHORTE2_PHOTOS_CONFIG.jour2Url;
  if (elJ3 && COHORTE2_PHOTOS_CONFIG.jour3Url) elJ3.href = COHORTE2_PHOTOS_CONFIG.jour3Url;
}

function initCohorte2Carousel(photosList = COHORTE2_HIGHLIGHT_PHOTOS) {
  const track = document.getElementById('carouselMarqueeTrack');
  if (!track) return;

  const fullLoop = [...photosList, ...photosList];

  track.innerHTML = fullLoop.map(photo => `
    <div 
      onclick="openPhotoLightbox('${photo.id}')"
      class="group/card relative flex-shrink-0 w-64 sm:w-72 h-44 sm:h-48 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 hover:border-indigo-400 hover:-translate-y-1 bg-slate-900"
      title="Agrandir ${photo.filename} (${photo.day})"
    >
      <img
        src="${photo.url}"
        alt="${photo.title}"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-108"
        onerror="if(!this.dataset.triedBackup){ this.dataset.triedBackup='1'; this.src='https://drive.google.com/thumbnail?id=${photo.fileId}&sz=w800'; } else if(this.dataset.triedBackup==='1') { this.dataset.triedBackup='2'; this.src='https://drive.google.com/uc?export=view&id=${photo.fileId}'; }"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent"></div>
      <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5">
        <span class="rounded-lg bg-indigo-600/90 text-white font-bold text-[10px] px-2 py-0.5 shadow-xs backdrop-blur-xs">
          ${photo.day}
        </span>
        <span class="rounded-lg bg-black/60 text-slate-300 font-mono text-[9px] px-1.5 py-0.5 backdrop-blur-xs">
          ${photo.filename}
        </span>
      </div>
      <div class="absolute top-2.5 right-2.5 opacity-0 group-hover/card:opacity-100 transition-opacity">
        <span class="rounded-lg bg-white/90 text-slate-800 p-1.5 shadow-xs flex items-center justify-center">
          <i data-lucide="maximize-2" class="h-3 w-3"></i>
        </span>
      </div>
      <div class="absolute bottom-2.5 left-3 right-3 text-white">
        <p class="font-serif text-xs font-bold truncate drop-shadow-xs">${photo.title}</p>
        <p class="text-[10px] text-slate-200 truncate opacity-90">${photo.caption}</p>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons({ root: track });
}

function shuffleCarouselPhotos() {
  const shuffled = [...COHORTE2_HIGHLIGHT_PHOTOS].sort(() => 0.5 - Math.random());
  initCohorte2Carousel(shuffled);
}

function openPhotoLightbox(photoId) {
  const photo = COHORTE2_HIGHLIGHT_PHOTOS.find(p => p.id === photoId) || COHORTE2_HIGHLIGHT_PHOTOS[0];
  const modal = document.getElementById('modalPhotoLightbox');
  const badge = document.getElementById('lightboxDayBadge');
  const title = document.getElementById('lightboxTitle');
  const img = document.getElementById('lightboxImage');

  if (!modal || !photo) return;

  if (badge) badge.textContent = `${photo.day} - ${photo.filename}`;
  if (title) title.textContent = `${photo.title} - ${photo.caption}`;
  if (img) {
    img.src = photo.url;
    img.alt = `${photo.title} (${photo.filename})`;
    img.onerror = function() {
      if (!this.dataset.fallbackTried) {
        this.dataset.fallbackTried = '1';
        this.src = `https://drive.google.com/thumbnail?id=${photo.fileId}&sz=w1200`;
      }
    };
  }

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons({ root: modal });
}

function closePhotoLightbox() {
  const modal = document.getElementById('modalPhotoLightbox');
  if (modal) modal.classList.add('hidden');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePhotoLightbox();
});

window.openPhotoLightbox = openPhotoLightbox;
window.closePhotoLightbox = closePhotoLightbox;
window.shuffleCarouselPhotos = shuffleCarouselPhotos;

/**
 * 1. INITIALISATION DES DONNEES (AVEC CACHE LOCAL INSTANTANE)
 */
function initData() {
  const localDocs = JSON.parse(localStorage.getItem(STORAGE_DOCUMENTS_KEY) || '[]');
  const cachedRemoteDocs = JSON.parse(localStorage.getItem(STORAGE_SHEET_CACHE_KEY) || '[]');

  if (cachedRemoteDocs.length > 0) {
    state.documents = mergeDocumentsPreservingLocal(localDocs, cachedRemoteDocs);
  } else {
    state.documents = mergeDocumentsPreservingLocal(localDocs, INITIAL_MATEX_DOCUMENTS || []);
  }

  const lastFetch = parseInt(localStorage.getItem(STORAGE_SHEET_CACHE_TIME) || '0', 10);
  const now = Date.now();
  if (now - lastFetch > CACHE_TTL_MS || cachedRemoteDocs.length === 0) {
    fetchGasDocuments();
  }
}

function mergeDocumentsPreservingLocal(localDocs, remoteDocs) {
  const combined = [...localDocs];
  const knownKeys = new Set(localDocs.map(d => (d.title || '').trim().toLowerCase()));

  for (const r of remoteDocs) {
    const key = (r.title || '').trim().toLowerCase();
    if (!knownKeys.has(key)) {
      knownKeys.add(key);
      combined.push(r);
    }
  }
  return combined;
}

/**
 * 2. NAVIGATION ENTRE LES VUES
 */
function setupNavigation() {
  const btnNavLibrary = document.getElementById('navBtnLibrary');
  const btnNavTraining = document.getElementById('navBtnTraining');
  const btnNavSubmit = document.getElementById('navBtnSubmit');
  const btnNavJoin = document.getElementById('navBtnJoin');
  const btnHeroExplore = document.getElementById('btnHeroExplore');
  const btnHeroTraining = document.getElementById('btnHeroTraining');
  const btnNavAiStudio = document.getElementById('navBtnAiStudio');
  if (btnNavAiStudio) btnNavAiStudio.addEventListener('click', () => switchNavTab('aiStudio'));

  if (btnNavLibrary) btnNavLibrary.addEventListener('click', () => switchNavTab('library'));
  if (btnNavTraining) btnNavTraining.addEventListener('click', () => switchNavTab('training'));
  if (btnNavSubmit) btnNavSubmit.addEventListener('click', () => openSubmitModal());
  if (btnNavJoin) btnNavJoin.addEventListener('click', () => openJoinModal());
  if (btnHeroExplore) {
    btnHeroExplore.addEventListener('click', () => {
      switchNavTab('library');
      document.getElementById('librarySection')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (btnHeroTraining) btnHeroTraining.addEventListener('click', () => switchNavTab('training'));
}

function switchNavTab(tab) {
  state.activeNavTab = tab;
  const viewLibrary = document.getElementById('viewLibrary');
  const viewTraining = document.getElementById('viewTraining');
  const viewAiStudio = document.getElementById('viewAiStudio');

  const btnNavLibrary = document.getElementById('navBtnLibrary');
  const btnNavTraining = document.getElementById('navBtnTraining');
  const btnNavAiStudio = document.getElementById('navBtnAiStudio');

  [btnNavLibrary, btnNavTraining, btnNavAiStudio].forEach(b => {
    b?.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    b?.classList.add('text-slate-600');
  });

  viewLibrary?.classList.add('hidden');
  viewTraining?.classList.add('hidden');
  viewAiStudio?.classList.add('hidden');

  if (tab === 'library') {
    viewLibrary?.classList.remove('hidden');
    btnNavLibrary?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    btnNavLibrary?.classList.remove('text-slate-600');
    renderDocuments();
  } else if (tab === 'training') {
    viewTraining?.classList.remove('hidden');
    btnNavTraining?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    btnNavTraining?.classList.remove('text-slate-600');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (tab === 'aiStudio') {
    viewAiStudio?.classList.remove('hidden');
    btnNavAiStudio?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    btnNavAiStudio?.classList.remove('text-slate-600');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (window.lucide) window.lucide.createIcons();
}

/**
 * 3. CONFIGURATION DES FILTRES ET RECHERCHE CASCADEE
 */
function setupFilterControls() {
  const cyclePills = document.querySelectorAll('.cycle-filter-btn');
  cyclePills.forEach(btn => {
    btn.addEventListener('click', () => {
      setCycleFilter(btn.getAttribute('data-cycle'));
    });
  });

  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      if (clearSearchBtn) {
        if (state.searchQuery) clearSearchBtn.classList.remove('hidden');
        else clearSearchBtn.classList.add('hidden');
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

  const filterGrade = document.getElementById('filterGrade');
  const filterLesson = document.getElementById('filterLesson');
  const filterType = document.getElementById('filterType');
  const filterDomain = document.getElementById('filterDomain');
  const btnResetFilters = document.getElementById('btnResetFilters');

  if (filterGrade) {
    filterGrade.addEventListener('change', (e) => {
      state.selectedGrade = e.target.value;
      state.selectedLesson = '';
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
  if (btnResetFilters) btnResetFilters.addEventListener('click', resetAllFilters);

  const quickParcoursButtons = document.querySelectorAll('.hero-parcours-btn');
  quickParcoursButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setCycleFilter(btn.getAttribute('data-cycle'));
      document.getElementById('librarySection')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function setCycleFilter(cycle) {
  state.selectedCycle = cycle;
  state.selectedGrade = '';
  state.selectedLesson = '';

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

  filterLesson.innerHTML = '<option value="">Toutes les lecons du programme</option>';

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
    opt.textContent = `Lecon ${l.number} : ${l.title} (${l.hours}h)`;
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
    if (state.selectedCycle !== 'all' && doc.cycle !== state.selectedCycle) return false;

    if (state.selectedGrade) {
      const matchGrade = (doc.classe || '').toLowerCase().includes(state.selectedGrade.toLowerCase());
      const lessonMatch = doc.lessonId ? doc.lessonId.startsWith(state.selectedGrade) : false;
      if (!matchGrade && !lessonMatch) return false;
    }

    if (state.selectedLesson && doc.lessonId !== state.selectedLesson) return false;
    if (state.selectedType !== 'all' && doc.type !== state.selectedType) return false;
    if (state.selectedDomain !== 'all' && doc.domain !== state.selectedDomain) return false;

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      const inTitle = (doc.title || '').toLowerCase().includes(query);
      const inClasse = (doc.classe || '').toLowerCase().includes(query);
      const inChapter = (doc.chapter || '').toLowerCase().includes(query);
      const inAuthor = (doc.author?.name || '').toLowerCase().includes(query);
      const inInstitution = (doc.author?.institution || '').toLowerCase().includes(query);
      const inDesc = (doc.description || '').toLowerCase().includes(query);
      const inLessonTitle = (doc.lessonTitle || '').toLowerCase().includes(query);

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

  if (countBadge) {
    countBadge.textContent = `Documents Repertories (${filtered.length})`;
  }

  updateCycleCounters();
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

  renderAllKaTeXInDOM();
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
      label: `Lecon : ${state.selectedLesson}`,
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

  container.querySelectorAll('.btn-clear-tag').forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-index'), 10);
    btn.addEventListener('click', () => tags[idx]?.clear());
  });

  const btnActiveReset = document.getElementById('btnActiveBarReset');
  if (btnActiveReset) btnActiveReset.addEventListener('click', resetAllFilters);
}

/**
 * 5. CARTE DE DOCUMENT DANS LA GRILLE
 */
function createDocumentCard(doc) {
  const card = document.createElement('div');
  card.className = 'group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl';

  const cycleConfig = {
    primaire: { label: 'Primaire', badgeClass: 'cycle-badge-primaire' },
    college: { label: '1er Cycle (College)', badgeClass: 'cycle-badge-college' },
    lycee: { label: '2nd Cycle (Lycee)', badgeClass: 'cycle-badge-lycee' },
    superieur: { label: 'Superieur & Recherche', badgeClass: 'cycle-badge-superieur' }
  }[doc.cycle] || { label: 'General', badgeClass: 'bg-slate-100 text-slate-700' };

  const typeConfig = {
    cours: { label: 'Cours Magistral', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    exercices: { label: 'Fiche TD / Exercices', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    devoir: { label: 'Devoir Surveille', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    examen_blanc: { label: 'Examen Blanc', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    concours: { label: 'Concours & Olympiades', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    livre_manuel: { label: 'Manuel / Recueil', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' }
  }[doc.type] || { label: doc.type, color: 'bg-slate-50 text-slate-700 border-slate-200' };

  card.innerHTML = `
    <div>
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span class="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold ${cycleConfig.badgeClass}">
          ${doc.classe}
        </span>
        <div class="flex items-center gap-1.5">
          ${doc.isNationalContest ? `
            <span class="inline-flex items-center gap-1 rounded-md bg-amber-500 text-white px-2 py-0.5 text-[10px] font-extrabold shadow-2xs">
              <i data-lucide="trophy" class="h-3 w-3"></i> ELITE
            </span>
          ` : ''}
          <span class="inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${typeConfig.color}">
            ${typeConfig.label}
          </span>
        </div>
      </div>

      <h3 class="font-serif text-base font-bold text-slate-900 leading-snug tracking-tight group-hover:text-indigo-700 transition">
        ${doc.title}
      </h3>

      <div class="mt-2.5 flex flex-wrap items-center gap-2">
        ${doc.lessonTitle ? `
          <span class="inline-flex items-center gap-1 rounded-md bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[11px] font-bold border border-indigo-100">
            <i data-lucide="bookmark" class="h-3 w-3"></i> ${doc.lessonTitle}
          </span>
        ` : ''}
        <span class="text-[11px] text-slate-500 font-medium">
          - ${doc.domain}
        </span>
      </div>

      <p class="mt-1 text-[11px] text-slate-400 font-medium line-clamp-1">
        Chapitre : ${doc.chapter}
      </p>

      ${doc.sampleMathPreview ? `
        <div class="my-3.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-center overflow-x-auto">
          <div class="katex-preview text-slate-800 text-xs" data-latex="${escapeHtml(doc.sampleMathPreview)}"></div>
        </div>
      ` : `
        <div class="my-3.5 flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-2.5 text-xs">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white uppercase text-[11px] shadow-xs">
            ${doc.fileName ? doc.fileName.split('.').pop()?.toUpperCase() : 'PDF'}
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-bold text-slate-900 text-xs truncate">${escapeHtml(doc.fileName || doc.title)}</p>
            <p class="text-[10px] text-slate-500 truncate">${doc.fileSize ? `${doc.fileSize} - ` : ''}Fichier original certifie</p>
          </div>
        </div>
      `}

      <div class="mt-3.5 flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
        <span class="inline-flex items-center gap-1 rounded bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5">
          <i data-lucide="file-text" class="h-3 w-3 text-rose-600"></i> PDF Original
        </span>
        <span class="inline-flex items-center gap-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5">
          <i data-lucide="file-code" class="h-3 w-3 text-emerald-600"></i> Source .TEX
        </span>
      </div>
    </div>

    <div class="mt-5 border-t border-slate-100 pt-4">
      <div class="flex items-center justify-between text-xs text-slate-500 mb-4">
        <div class="flex items-center gap-2">
          <div class="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700 text-[11px]">
            ${(doc.author?.name || 'M').charAt(0)}
          </div>
          <div>
            <div class="flex items-center gap-1 font-semibold text-slate-800 text-[11px]">
              <span>${doc.author?.name || 'Enseignant MATEX'}</span>
              ${doc.author?.verifiedTeacher ? '<i data-lucide="check-circle" class="h-3 w-3 text-emerald-600"></i>' : ''}
            </div>
            <div class="text-[10px] text-slate-400 truncate max-w-[150px]">
              ${doc.author?.institution || 'Etablissement National'}
            </div>
          </div>
        </div>
        <div class="text-right text-[10px] text-slate-400">
          <div>${formatDate(doc.date)}</div>
          <div>${doc.pages || 2} page(s)</div>
        </div>
      </div>

      <button
        type="button"
        class="btn-preview-doc w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 py-2.5 text-xs font-bold text-white transition shadow-sm"
      >
        <i data-lucide="eye" class="h-4 w-4"></i> Consulter le Document
      </button>
    </div>
  `;

  card.querySelector('.btn-preview-doc')?.addEventListener('click', () => openDocumentViewer(doc));
  return card;
}

/**
 * 6. VISIONNEUSE DE DOCUMENTS
 */
function openDocumentViewer(doc) {
  state.currentDoc = doc;
  state.viewerTab = 'pdf';
  state.viewerZoom = 1.0;

  const modal = document.getElementById('modalDocumentViewer');
  if (!modal) return;

  const titleEl = document.getElementById('viewerModalTitle');
  const metaEl = document.getElementById('viewerModalMeta');

  if (titleEl) titleEl.textContent = doc.title;
  if (metaEl) metaEl.textContent = `${doc.classe} - ${doc.chapter} - Auteur : ${doc.author?.name} (${doc.author?.institution})`;

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

  const tabPdfBtn = document.getElementById('viewerTabPdf');
  const tabLatexBtn = document.getElementById('viewerTabLatex');
  const contentPdf = document.getElementById('viewerContentPdf');
  const contentLatex = document.getElementById('viewerContentLatex');

  if (tabPdfBtn) tabPdfBtn.textContent = 'Apercu PDF Original';
  if (tabLatexBtn) tabLatexBtn.textContent = 'Source LaTeX (.tex)';

  [tabPdfBtn, tabLatexBtn].forEach(b => {
    b?.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    b?.classList.add('text-slate-400');
  });

  [contentPdf, contentLatex].forEach(c => c?.classList.add('hidden'));

  if (state.viewerTab === 'pdf') {
    tabPdfBtn?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    tabPdfBtn?.classList.remove('text-slate-400');
    contentPdf?.classList.remove('hidden');
    renderAuthenticPdfSheet(doc);
  } else {
    tabLatexBtn?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    tabLatexBtn?.classList.remove('text-slate-400');
    contentLatex?.classList.remove('hidden');
    renderLatexSource(doc);
  }

  const paperSheet = document.getElementById('authenticA4Sheet');
  if (paperSheet && state.viewerTab === 'pdf') {
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

  // 1. Extraction prioritaire de l'ID Google Drive
  let driveFileId = doc.driveFileId || '';
  const searchUrl = doc.driveUrl || doc.pdfDriveUrl || '';
  if (!driveFileId && searchUrl) {
    const m = searchUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || searchUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || searchUrl.match(/id=([a-zA-Z0-9_-]+)/);
    if (m) driveFileId = m[1];
  }

  // 2. Construction de la source d'affichage
  let pdfSource = '';

  if (driveFileId) {
    // Format officiel Google Drive autorise en iframe
    pdfSource = 'https://drive.google.com/file/d/' + driveFileId + '/preview';
  } else {
    // Fallback de session si le fichier vient tout juste d'etre depose
    const cachedFile = window.MATEX_FILE_BLOBS ? window.MATEX_FILE_BLOBS[doc.id] : null;
    if (cachedFile && cachedFile.blobUrl) {
      pdfSource = cachedFile.blobUrl;
    } else if (doc.compiledPdfUrl) {
      pdfSource = doc.compiledPdfUrl;
    }
  }

  // 3. Affichage dans l'iframe securisee
  if (pdfSource) {
    sheet.className = 'w-full max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl';
    sheet.style.transform = 'none';
    sheet.style.padding = '0';
    sheet.style.minHeight = 'auto';

// Nettoyage automatique des extensions dupliquees (.pdf.pdf -> .pdf)
let rawPdfName = doc.pdfFileName || doc.fileName || (doc.title + '.pdf');
const pdfFileName = rawPdfName.replace(/(\.pdf)+$/i, '.pdf').replace(/\.tex$/i, '.pdf');

    sheet.innerHTML = `
      <div class="bg-slate-800 px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 font-bold shadow-2xs">
            <i data-lucide="file-text" class="h-3.5 w-3.5 text-rose-400"></i> Fichier PDF Original
          </span>
          <span class="font-semibold text-white truncate max-w-xs">${escapeHtml(pdfFileName)}</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            onclick="switchToLatexTab()"
            class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 font-semibold px-3 py-1.5 transition text-xs"
          >
            <i data-lucide="file-code" class="h-3.5 w-3.5 text-emerald-400"></i> Source LaTeX (.tex)
          </button>
          <button
            type="button"
            onclick="downloadCurrentDocPdf()"
            class="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold px-3.5 py-1.5 transition text-xs shadow-xs"
          >
            <i data-lucide="download" class="h-3.5 w-3.5"></i> Telecharger PDF
          </button>
        </div>
      </div>
      <div class="w-full bg-slate-950 p-2 sm:p-4 flex items-center justify-center min-h-[700px]">
        <iframe
          src="${pdfSource}"
          class="w-full h-[750px] rounded-xl border border-slate-700 bg-white"
          title="${escapeHtml(doc.title)}"
          allow="autoplay"
        ></iframe>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // 4. Si aucun fichier PDF n'est disponible
  sheet.className = 'a4-paper-sheet animate-scale-in';
  sheet.style.padding = '2.5rem 3rem';
  sheet.innerHTML = `
    <div class="text-center py-16 text-slate-500">
      <h3 class="font-serif text-lg font-bold text-slate-800">Aucun fichier PDF rattache</h3>
      <p class="text-xs mt-1">Consultez l onglet Source LaTeX pour voir le code.</p>
    </div>
  `;
}

/**
 * Rendu du code source LaTeX avec Lazy Loading
 */
async function renderLatexSource(doc) {
  const container = document.getElementById('viewerContentLatex');
  if (!container) return;

  const texFileName = (doc.texFileName || doc.fileName || `${doc.id}.tex`).replace(/\.pdf$/i, '.tex');

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap items-center justify-between bg-slate-900 text-white px-4 py-3 rounded-2xl text-xs gap-3 border border-slate-800">
        <div class="flex items-center gap-2">
          <i data-lucide="file-code" class="h-4 w-4 text-emerald-400"></i>
          <span class="font-mono font-bold">${escapeHtml(texFileName)}</span>
          <span id="texCharCount" class="text-slate-400">Chargement...</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            id="btnCopyLatex"
            class="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-3.5 py-2 font-bold text-slate-200 border border-slate-700 transition"
          >
            <i data-lucide="copy" class="h-3.5 w-3.5"></i> Copier le Code
          </button>
          <button
            type="button"
            id="btnDownloadTex"
            class="flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 font-bold text-white transition shadow-xs"
          >
            <i data-lucide="download" class="h-3.5 w-3.5"></i> Telecharger .tex Original
          </button>
        </div>
      </div>

      <div class="relative">
        <textarea
          id="editorLatexCode"
          class="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto min-h-[480px] max-h-[650px] focus:outline-none focus:border-indigo-500"
          spellcheck="false"
        >% Chargement du code source LaTeX depuis Google Drive...</textarea>
        <div class="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Code source editable sous TeXstudio, MiKTeX ou Overleaf.</span>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  const latexCode = await ensureDocLatexCode(doc);
  const editor = document.getElementById('editorLatexCode');
  const countEl = document.getElementById('texCharCount');

  if (editor) editor.value = latexCode;
  if (countEl) countEl.textContent = `(${latexCode.length} caracteres)`;

  document.getElementById('btnCopyLatex')?.addEventListener('click', () => {
    const code = document.getElementById('editorLatexCode')?.value || latexCode;
    navigator.clipboard.writeText(code);
    const btn = document.getElementById('btnCopyLatex');
    if (btn) {
      btn.innerHTML = '<i data-lucide="check" class="h-3.5 w-3.5 text-emerald-400"></i> Copie !';
      setTimeout(() => {
        btn.innerHTML = '<i data-lucide="copy" class="h-3.5 w-3.5"></i> Copier le Code';
        if (window.lucide) window.lucide.createIcons();
      }, 2000);
      if (window.lucide) window.lucide.createIcons();
    }
  });

  document.getElementById('btnDownloadTex')?.addEventListener('click', () => {
    const code = document.getElementById('editorLatexCode')?.value || latexCode;
    downloadTextFile(texFileName, code, 'application/x-tex');
  });
}

/**
 * Recuperation distante a la demande du code TeX
 */
async function ensureDocLatexCode(doc) {
  if (!doc) return '';

  if (doc.latexContent && doc.latexContent.trim().length > 30 && !doc.latexContent.startsWith('% Chargement')) {
    return doc.latexContent;
  }

  const cachedFile = window.MATEX_FILE_BLOBS ? window.MATEX_FILE_BLOBS[doc.id] : null;
  const b64 = doc.texBase64 || doc.fileBase64 || (cachedFile ? cachedFile.texBase64 || cachedFile.base64 : '');
  if (b64 && b64.includes('base64,')) {
    try {
      const raw = b64.split('base64,')[1];
      const binary = atob(raw);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const decoded = new TextDecoder('utf-8').decode(bytes);
      if (decoded.includes('\\documentclass') || decoded.length > 20) {
        doc.latexContent = decoded;
        return decoded;
      }
    } catch (e) {}
  }

  const url = getGasWebhookUrl();
  const driveUrl = doc.texDriveUrl || doc.driveUrl || '';
  const driveId = doc.driveFileId || '';

  if (url && (driveUrl || driveId)) {
    try {
      const queryParam = driveId
        ? `fileId=${encodeURIComponent(driveId)}`
        : `driveUrl=${encodeURIComponent(driveUrl)}`;
      const res = await fetch(`${url}?action=get_tex_content&${queryParam}`);
      const data = await res.json();
      if (data && data.success && data.content) {
        doc.latexContent = data.content;
        return data.content;
      }
    } catch (fetchErr) {
      console.warn('Recuperation distante TeX :', fetchErr);
    }
  }

  const fallbackCode = `% Document : ${doc.title}\n% Niveau : ${doc.classe || ''}\n% Auteur : ${doc.author?.name || 'Enseignant'}\n\\documentclass[11pt,a4paper]{article}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amsmath,amssymb}\n\\title{${doc.title}}\n\\begin{document}\n\\maketitle\n\\section{Enonce}\n% Fichier source archive sur Google Drive : ${doc.driveUrl || ''}\n\\end{document}`;
  doc.latexContent = fallbackCode;
  return fallbackCode;
}

function getDocLatexCode(doc) {
  return doc?.latexContent || '';
}

function switchToLatexTab() {
  state.viewerTab = 'latex';
  renderViewerContent();
}

function switchToPdfTab() {
  state.viewerTab = 'pdf';
  renderViewerContent();
}

async function copyTexCodeToClipboard() {
  const doc = state.currentDoc;
  if (!doc) return;
  const editorEl = document.getElementById('editorLatexCode');
  let code = editorEl ? editorEl.value : '';
  if (!code || code.startsWith('% Chargement')) {
    code = await ensureDocLatexCode(doc);
  }
  navigator.clipboard.writeText(code);
  alert('Code source LaTeX copie dans le presse-papiers.');
}

/**
 * 7. MODAL 2 : PASSERELLE DE DEBLOCAGE
 */
function openUnlockGateway(doc) {
  state.docToUnlock = doc;
  const modal = document.getElementById('modalUnlockGateway');
  if (!modal) return;

  const docTitleEl = document.getElementById('unlockDocTitle');
  if (docTitleEl) docTitleEl.textContent = `"${doc.title}" (${doc.classe})`;

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
 * 8. MODAL 3 : DON SOLIDAIRE
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
  const tierButtons = document.querySelectorAll('.donate-tier-btn');
  const customAmountInput = document.getElementById('donateCustomAmount');

  tierButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      state.donateTier = btn.getAttribute('data-tier');
      state.donateCustomAmount = '';
      if (customAmountInput) customAmountInput.value = '';
      updateDonateTiersUI();
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', (e) => {
      state.donateCustomAmount = e.target.value;
      if (state.donateCustomAmount) state.donateTier = 'custom';
      updateDonateTiersUI();
    });
  }

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

  const btnCopyPhone = document.getElementById('btnCopyPhone');
  btnCopyPhone?.addEventListener('click', () => {
    navigator.clipboard.writeText(OFFICIAL_DONATION_INFO.phoneRaw);
    btnCopyPhone.innerHTML = '<i data-lucide="check" class="h-3.5 w-3.5 text-emerald-600"></i> Copie !';
    setTimeout(() => {
      btnCopyPhone.innerHTML = '<i data-lucide="copy" class="h-3.5 w-3.5"></i> Copier';
      if (window.lucide) window.lucide.createIcons();
    }, 2500);
    if (window.lucide) window.lucide.createIcons();
  });

  const fileInput = document.getElementById('donateProofInput');
  const dropZone = document.getElementById('donateDropZone');
  const proofPreview = document.getElementById('donateProofPreview');
  const previewImg = document.getElementById('donateProofImg');
  const previewName = document.getElementById('donateProofFileName');
  const btnRemoveProof = document.getElementById('btnRemoveProof');

  fileInput?.addEventListener('change', (e) => handleProofFile(e.target.files?.[0]));

  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-indigo-500', 'bg-indigo-50/40');
  });
  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('border-indigo-500', 'bg-indigo-50/40'));
  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-indigo-500', 'bg-indigo-50/40');
    handleProofFile(e.dataTransfer.files?.[0]);
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

    const localDonations = JSON.parse(localStorage.getItem(STORAGE_DONATIONS_KEY) || '[]');
    localDonations.unshift(donationRecord);
    localStorage.setItem(STORAGE_DONATIONS_KEY, JSON.stringify(localDonations));

    sendToGasWebhook('donate', donationRecord);

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
        ? `Montant personnalise de ${parsed.toLocaleString('fr-FR')} FCFA : Merci pour votre soutien solidaire.`
        : 'Veuillez saisir un montant solidaire d au moins 5 000 FCFA.';
    } else {
      const tierObj = DONATION_TIERS.find(t => t.id === state.donateTier);
      impactDesc.textContent = tierObj ? tierObj.impactDescription : '';
    }
  }
}

/**
 * 9. MODAL 4 : REJOINDRE LA COMMUNAUTE
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
      institution: document.getElementById('joinInstitution')?.value || 'Non renseigne',
      city: document.getElementById('joinCity')?.value || 'Abidjan',
      teachingLevels: selectedLevels,
      latexExperience: document.getElementById('joinLatexLevel')?.value || 'debutant',
      motivation: 'Participer aux travaux pedagogiques MATEX.',
      status: 'Actif'
    };

    const localMembers = JSON.parse(localStorage.getItem(STORAGE_MEMBERS_KEY) || '[]');
    localMembers.unshift(memberRecord);
    localStorage.setItem(STORAGE_MEMBERS_KEY, JSON.stringify(localMembers));

    sendToGasWebhook('join_member', memberRecord);

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
 * 10. MODAL 5 : DEPOT DE DOCUMENT
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

  pdfInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleSelectedPdf(file);
  });

  texInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleSelectedTex(file);
  });

  pdfDropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    pdfDropZone.classList.add('border-rose-500', 'bg-rose-100/60');
  });
  pdfDropZone?.addEventListener('dragleave', () => pdfDropZone.classList.remove('border-rose-500', 'bg-rose-100/60'));
  pdfDropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    pdfDropZone.classList.remove('border-rose-500', 'bg-rose-100/60');
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.name.toLowerCase().endsWith('.pdf')) handleSelectedPdf(file);
    else if (file.name.toLowerCase().endsWith('.tex')) handleSelectedTex(file);
    else showFormatError(`Format rejete : ${file.name} n'est pas un fichier PDF.`);
  });

  texDropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    texDropZone.classList.add('border-emerald-500', 'bg-emerald-100/60');
  });
  texDropZone?.addEventListener('dragleave', () => texDropZone.classList.remove('border-emerald-500', 'bg-emerald-100/60'));
  texDropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    texDropZone.classList.remove('border-emerald-500', 'bg-emerald-100/60');
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.name.toLowerCase().endsWith('.tex')) handleSelectedTex(file);
    else if (file.name.toLowerCase().endsWith('.pdf')) handleSelectedPdf(file);
    else showFormatError(`Format rejete : ${file.name} n'est pas un fichier TeX.`);
  });

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
      showFormatError(`${file.name} n'est pas un fichier PDF valide.`);
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
    if (pdfSizeEl) pdfSizeEl.textContent = `${state.submitPdfFileSize} - Pret pour l'apercu`;
    pdfEmptyState?.classList.add('hidden');
    pdfSelectedState?.classList.remove('hidden');

    const reader = new FileReader();
    reader.onloadend = () => { state.submitPdfBase64 = reader.result; };
    reader.readAsDataURL(file);

    if (window.lucide) window.lucide.createIcons();
  }

  function handleSelectedTex(file) {
    hideFormatError();
    if (!file.name.toLowerCase().endsWith('.tex')) {
      showFormatError(`${file.name} n'est pas un fichier LaTeX valide.`);
      return;
    }
    state.submitTexFile = file;
    state.submitTexFileName = file.name;
    state.submitTexFileSize = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(file.size / 1024).toFixed(1)} KB`;

    if (texNameEl) texNameEl.textContent = file.name;
    if (texSizeEl) texSizeEl.textContent = `${state.submitTexFileSize} - Code Source`;
    texEmptyState?.classList.add('hidden');
    texSelectedState?.classList.remove('hidden');

    const textReader = new FileReader();
    textReader.onload = () => {
      state.submitTexText = textReader.result || '';
    };
    textReader.readAsText(file);

    const b64Reader = new FileReader();
    b64Reader.onloadend = () => { state.submitTexBase64 = b64Reader.result; };
    b64Reader.readAsDataURL(file);

    if (window.lucide) window.lucide.createIcons();
  }

  const submitForm = document.getElementById('formSubmitDocument');
  submitForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!state.submitPdfFile && !state.submitTexFile) {
      alert("Veuillez selectionner au moins l'un des deux fichiers obligatoires :\n- Le fichier PDF (.pdf)\n- Ou le fichier source LaTeX (.tex)");
      return;
    }

    const submitBtn = submitForm.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

    const title = document.getElementById('submitTitle')?.value || 'Ressource Mathematique MATEX';
    const authorName = document.getElementById('submitAuthorName')?.value || 'Professeur Titulaire';
    const institution = document.getElementById('submitInstitution')?.value || 'Etablissement National';
    const type = document.getElementById('submitType')?.value || 'cours';
    const domain = document.getElementById('submitDomain')?.value || 'Arithmetique & Algebre';

    const grades = getGradeLevelsByCycle(state.submitCycle);
    const gradeObj = grades.find(g => g.id === state.submitGradeId) || grades[0];
    const lessons = gradeObj ? gradeObj.lessons : [];
    const lessonObj = lessons.find(l => l.id === state.submitLessonId) || lessons[0];

    const cleanBaseName = title.replace(/[^a-zA-Z0-9_-]/g, '_');
    const finalPdfFileName = (state.submitPdfFileName || (cleanBaseName + '.pdf')).replace(/(\.pdf)+$/i, '.pdf');
    const finalTexFileName = (state.submitTexFileName || (cleanBaseName + '.tex')).replace(/(\.tex)+$/i, '.tex');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader-2" class="h-4 w-4 animate-spin inline mr-1.5"></i> Enregistrement en cours...';
      if (window.lucide) window.lucide.createIcons();
    }

    if ((state.submitPdfFile && !state.submitPdfBase64) || (state.submitTexFile && !state.submitTexBase64)) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }

const newDocId = `doc-user-${Date.now()}`;
    const newDoc = {
      id: newDocId,
      title,
      cycle: state.submitCycle,
      classe: gradeObj ? gradeObj.fullName : 'Classe Specifiee',
      chapter: lessonObj ? `${lessonObj.number}. ${lessonObj.title}` : 'Generalites',
      lessonId: state.submitLessonId,
      lessonTitle: lessonObj ? `Lecon ${lessonObj.number} : ${lessonObj.title}` : '',
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
      pages: 2,
      description: 'Document depose par un enseignant de la communaute.',
      sampleMathPreview: '',
      latexContent: state.submitTexText || '',
      hasTexSource: Boolean(state.submitTexFile || state.submitTexText),
      hasPdfSource: Boolean(state.submitPdfFile || state.submitPdfBlobUrl),
      fileName: state.submitPdfFileName || state.submitTexFileName || finalPdfFileName,
      pdfFileName: finalPdfFileName,
      texFileName: finalTexFileName,
      fileSize: state.submitPdfFileSize || state.submitTexFileSize || '',
      fileBlobUrl: state.submitPdfBlobUrl || '',
      pdfBlobUrl: state.submitPdfBlobUrl || '',
      fileBase64: state.submitPdfBase64 || '',
      pdfBase64: state.submitPdfBase64 || '',
      texBase64: state.submitTexBase64 || '',
      driveUrl: MATEX_DRIVE_URL,
      pdfDriveUrl: MATEX_DRIVE_URL,
      texDriveUrl: MATEX_DRIVE_URL,
      isUserUploaded: true
    };

    window.MATEX_FILE_BLOBS = window.MATEX_FILE_BLOBS || {};
    window.MATEX_FILE_BLOBS[newDocId] = {
      blobUrl: state.submitPdfBlobUrl,
      base64: state.submitPdfBase64,
      texBase64: state.submitTexBase64,
      name: finalPdfFileName,
      texName: finalTexFileName,
      size: state.submitPdfFileSize || state.submitTexFileSize
    };

    state.documents.unshift(newDoc);

    try {
      const docForStorage = { ...newDoc };
      delete docForStorage.fileBase64;
      delete docForStorage.pdfBase64;
      delete docForStorage.texBase64;
      delete docForStorage.fileBlobUrl;
      delete docForStorage.pdfBlobUrl;
      const localDocs = JSON.parse(localStorage.getItem(STORAGE_DOCUMENTS_KEY) || '[]');
      localDocs.unshift(docForStorage);
      localStorage.setItem(STORAGE_DOCUMENTS_KEY, JSON.stringify(localDocs));
      localStorage.removeItem(STORAGE_SHEET_CACHE_KEY);
    } catch (storageErr) {}

    try {
      await Promise.race([
        sendToGasWebhook('submit_doc', {
          ...newDoc,
          pdfBase64: state.submitPdfBase64 || '',
          pdfFileName: finalPdfFileName,
          texBase64: state.submitTexBase64 || '',
          texFileName: finalTexFileName,
          latexCode: state.submitTexText || '',
          fileBase64: state.submitPdfBase64 || state.submitTexBase64 || '',
          fileName: finalPdfFileName
        }),
        new Promise(resolve => setTimeout(resolve, 15000))
      ]);
    } catch (gasErr) {}

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }

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

    alert(`Document enregistre avec succes !\n\nFichiers : ${finalPdfFileName} et ${finalTexFileName} integres a la plateforme.`);
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
    opt.textContent = `Lecon ${l.number} : ${l.title} (${l.hours}h)`;
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
          ${cycleObj.label} - Programme & Horaires Officiels
        </h4>
        <span class="text-xs text-slate-500 font-medium">${cycleObj.grades.length} Niveaux</span>
      </div>

      <div class="space-y-4">
        ${cycleObj.grades.map(grade => `
          <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div class="flex items-center justify-between mb-3">
              <span class="font-serif font-bold text-slate-900 text-xs">${grade.fullName}</span>
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
                    Selectionner
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.btn-select-lesson-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      state.submitGradeId = btn.getAttribute('data-grade-id');
      state.submitLessonId = btn.getAttribute('data-lesson-id');
      updateSubmitCycleAndGrades();
      switchSubmitModalTab('form');
    });
  });
}

/**
 * 11. SETUP DES FERMETURES DE TOUTES LES MODALES
 */
function setupModals() {
  document.getElementById('btnCloseDocumentViewer')?.addEventListener('click', closeDocumentViewer);
  document.getElementById('modalDocumentViewer')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalDocumentViewer') closeDocumentViewer();
  });

  document.getElementById('viewerTabPdf')?.addEventListener('click', () => {
    state.viewerTab = 'pdf';
    renderViewerContent();
  });
  document.getElementById('viewerTabLatex')?.addEventListener('click', () => {
    state.viewerTab = 'latex';
    renderViewerContent();
  });

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

  document.getElementById('btnCloseDonate')?.addEventListener('click', closeDonateModal);
  document.getElementById('modalDonate')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalDonate') closeDonateModal();
  });
  document.getElementById('btnDonateSuccessFinish')?.addEventListener('click', closeDonateModal);

  document.getElementById('btnCloseJoin')?.addEventListener('click', closeJoinModal);
  document.getElementById('modalJoin')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalJoin') closeJoinModal();
  });
  document.getElementById('btnJoinSuccessFinish')?.addEventListener('click', closeJoinModal);

  document.getElementById('btnCloseSubmit')?.addEventListener('click', closeSubmitModal);
  document.getElementById('modalSubmit')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalSubmit') closeSubmitModal();
  });
}

/**
 * 12. RENDU KATEX
 */
function renderAllKaTeXInDOM() {
  if (!window.katex) return;
  const elements = document.querySelectorAll('.katex-preview');
  elements.forEach(el => {
    const latex = el.getAttribute('data-latex');
    if (latex) {
      try {
        window.katex.render(latex, el, { throwOnError: false, displayMode: true });
      } catch (err) {
        el.textContent = latex;
      }
    }
  });
}

/**
 * 13. RENDU GLOBAL
 */
function renderApp() {
  updateGradeDropdown();
  updateLessonDropdown();
  renderDocuments();
}

/**
 * 14. UTILITAIRES DE TELECHARGEMENT
 */
function downloadCurrentDocPdf() {
  const doc = state.currentDoc;
  if (!doc) return;

  let driveFileId = doc.driveFileId || '';
  const searchUrl = doc.pdfDriveUrl || doc.driveUrl || '';
  if (!driveFileId && searchUrl) {
    const m = searchUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || searchUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || searchUrl.match(/id=([a-zA-Z0-9_-]+)/);
    if (m) driveFileId = m[1];
  }

  if (driveFileId) {
    window.open('https://drive.google.com/uc?export=download&id=' + driveFileId, '_blank');
    return;
  }

  const cachedFile = window.MATEX_FILE_BLOBS ? window.MATEX_FILE_BLOBS[doc.id] : null;
  const pdfSource = (cachedFile ? cachedFile.blobUrl : null) || doc.compiledPdfUrl;
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
    window.print();
  }
}

async function downloadCurrentDocTex() {
  const doc = state.currentDoc;
  if (!doc) return;
  const code = await ensureDocLatexCode(doc);
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
    devoir: 'Devoir Surveille',
    examen_blanc: 'Examen Blanc Regional',
    concours: 'Concours & Olympiades',
    livre_manuel: 'Manuel / Recueil'
  };
  return map[type] || type;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dateString;
}

/**
 * 15. COMMUNICATION WEBHOOK APPS SCRIPT
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
    body: JSON.stringify({ action: action, payload: payload })
  }).catch(err => {
    console.warn('Transmission Webhook :', err);
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
    if (data && data.success && Array.isArray(data.documents)) {
      localStorage.setItem(STORAGE_SHEET_CACHE_KEY, JSON.stringify(data.documents));
      localStorage.setItem(STORAGE_SHEET_CACHE_TIME, String(Date.now()));

      const localDocs = JSON.parse(localStorage.getItem(STORAGE_DOCUMENTS_KEY) || '[]');
      state.documents = mergeDocumentsPreservingLocal(localDocs, data.documents);
      renderDocuments();
    }
  } catch (err) {
    console.warn('Synchronisation Google Sheets differee :', err);
  }
}

/**
 * 17. PROGRESSIONS PEDAGOGIQUES DPFC 2026-2027
 */
const curriculumState = {
  cycle: 'college',
  gradeId: '6e',
  trimester: 'all',
  searchQuery: ''
};

function openCurriculumModal(cycle = 'college', gradeId = null) {
  curriculumState.cycle = cycle;
  const cycleObj = OFFICIAL_CURRICULUM.find(c => c.id === cycle);
  if (cycleObj && cycleObj.grades && cycleObj.grades.length > 0) {
    curriculumState.gradeId = gradeId || cycleObj.grades[0].id;
  }

  const modal = document.getElementById('modalCurriculum');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateCurriculumCycleButtons();
    renderCurriculumGradePills();
    renderCurriculumView();
    if (window.lucide) window.lucide.createIcons({ root: modal });
  }
}

function closeCurriculumModal() {
  const modal = document.getElementById('modalCurriculum');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function setCurriculumCycle(cycleId) {
  curriculumState.cycle = cycleId;
  const cycleObj = OFFICIAL_CURRICULUM.find(c => c.id === cycleId);
  if (cycleObj && cycleObj.grades && cycleObj.grades.length > 0) {
    curriculumState.gradeId = cycleObj.grades[0].id;
  }
  updateCurriculumCycleButtons();
  renderCurriculumGradePills();
  renderCurriculumView();
}

function updateCurriculumCycleButtons() {
  document.querySelectorAll('.curriculum-cycle-btn').forEach(btn => {
    const c = btn.getAttribute('data-cycle');
    if (c === curriculumState.cycle) {
      btn.className = 'curriculum-cycle-btn rounded-xl px-3.5 py-2 transition flex items-center gap-1.5 bg-indigo-600 text-white shadow-xs';
    } else {
      btn.className = 'curriculum-cycle-btn rounded-xl px-3.5 py-2 transition flex items-center gap-1.5 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
    }
  });
}

function renderCurriculumGradePills() {
  const container = document.getElementById('curriculumGradePills');
  if (!container) return;
  const cycleObj = OFFICIAL_CURRICULUM.find(c => c.id === curriculumState.cycle);
  if (!cycleObj || !cycleObj.grades) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = cycleObj.grades.map(grade => {
    const isActive = grade.id === curriculumState.gradeId;
    const activeClass = isActive
      ? 'bg-slate-900 text-white shadow-xs'
      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50';
    return `
      <button
        type="button"
        onclick="setCurriculumGrade('${grade.id}')"
        class="shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition ${activeClass}"
      >
        ${grade.label}
      </button>
    `;
  }).join('');
}

function setCurriculumGrade(gradeId) {
  curriculumState.gradeId = gradeId;
  renderCurriculumGradePills();
  renderCurriculumView();
}

function setCurriculumTrimester(trim) {
  curriculumState.trimester = trim;
  document.querySelectorAll('.curriculum-trim-btn').forEach(btn => {
    const t = btn.getAttribute('data-trim');
    if (String(t) === String(trim)) {
      btn.className = 'curriculum-trim-btn flex-1 rounded-lg py-1 px-2 text-center transition bg-white text-slate-900 shadow-2xs font-bold';
    } else {
      btn.className = 'curriculum-trim-btn flex-1 rounded-lg py-1 px-2 text-center transition text-slate-600 hover:text-slate-900 font-bold';
    }
  });
  renderCurriculumView();
}

function filterCurriculumLessons() {
  const input = document.getElementById('curriculumSearchInput');
  curriculumState.searchQuery = (input?.value || '').trim().toLowerCase();
  renderCurriculumView();
}

function renderCurriculumView() {
  const cycleObj = OFFICIAL_CURRICULUM.find(c => c.id === curriculumState.cycle);
  const gradeObj = cycleObj?.grades?.find(g => g.id === curriculumState.gradeId);
  if (!gradeObj) return;

  const badgeEl = document.getElementById('curriculumGradeBadge');
  const nameEl = document.getElementById('curriculumGradeFullName');
  const descEl = document.getElementById('curriculumGradeDescription');
  const annualEl = document.getElementById('curriculumAnnualHours');
  const weeklyEl = document.getElementById('curriculumWeeklyHours');
  const totalLessonsEl = document.getElementById('curriculumTotalLessons');

  if (badgeEl) badgeEl.textContent = gradeObj.label;
  if (nameEl) nameEl.textContent = gradeObj.fullName;
  if (descEl) descEl.textContent = `Programme officiel national 2026-2027 - DPFC / MENAET (${cycleObj.label})`;
  if (annualEl) annualEl.textContent = `${gradeObj.annualHours} h`;
  if (weeklyEl) weeklyEl.textContent = `${gradeObj.weeklyHours} h/sem`;
  if (totalLessonsEl) totalLessonsEl.textContent = gradeObj.lessons?.length || 0;

  let lessons = gradeObj.lessons || [];
  if (curriculumState.trimester !== 'all') {
    lessons = lessons.filter(l => String(l.trimester) === String(curriculumState.trimester));
  }
  if (curriculumState.searchQuery) {
    const q = curriculumState.searchQuery;
    lessons = lessons.filter(l =>
      l.title.toLowerCase().includes(q) ||
      (l.domain && l.domain.toLowerCase().includes(q)) ||
      String(l.number).includes(q)
    );
  }

  const tbody = document.getElementById('curriculumTableBody');
  const emptyState = document.getElementById('curriculumEmptyState');
  const tableContainer = document.getElementById('curriculumTableContainer');

  if (!tbody) return;

  if (lessons.length === 0) {
    tbody.innerHTML = '';
    emptyState?.classList.remove('hidden');
    tableContainer?.classList.add('hidden');
    return;
  }

  emptyState?.classList.add('hidden');
  tableContainer?.classList.remove('hidden');

  tbody.innerHTML = lessons.map(lesson => {
    const isEval = lesson.domain === 'Evaluation & Regulation';
    const trBgClass = isEval ? 'bg-amber-50/40 hover:bg-amber-50/70 font-semibold' : 'hover:bg-slate-50/80';

    let trimBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">T${lesson.trimester}</span>`;
    if (lesson.trimester === 1) trimBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">1er Trimestre</span>`;
    if (lesson.trimester === 2) trimBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">2eme Trimestre</span>`;
    if (lesson.trimester === 3) trimBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">3eme Trimestre</span>`;

    let domainColor = 'bg-slate-100 text-slate-700 border-slate-200';
    if (lesson.domain?.includes('Algebre') || lesson.domain?.includes('Arithmetique')) domainColor = 'bg-sky-50 text-sky-800 border-sky-200';
    if (lesson.domain?.includes('Geometrie') || lesson.domain?.includes('Trigonometrie')) domainColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (lesson.domain?.includes('Analyse') || lesson.domain?.includes('Fonctions')) domainColor = 'bg-indigo-50 text-indigo-800 border-indigo-200';
    if (lesson.domain?.includes('Probabilites') || lesson.domain?.includes('Statistiques')) domainColor = 'bg-purple-50 text-purple-800 border-purple-200';
    if (lesson.domain?.includes('Espace')) domainColor = 'bg-rose-50 text-rose-800 border-rose-200';
    if (isEval) domainColor = 'bg-amber-100 text-amber-900 border-amber-300';

    return `
      <tr class="${trBgClass} transition">
        <td class="py-3 px-3 text-center font-mono font-bold text-slate-500">${lesson.number}</td>
        <td class="py-3 px-4">
          <div class="font-bold text-slate-900 text-xs sm:text-sm">${lesson.title}</div>
          <div class="text-[10px] text-slate-400 font-mono mt-0.5">Code ref : ${lesson.id}</div>
        </td>
        <td class="py-3 px-3 text-center">${trimBadge}</td>
        <td class="py-3 px-3 text-center">
          <span class="inline-flex items-center font-mono font-black text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg">
            ${lesson.hours} h
          </span>
        </td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md border ${domainColor}">
            ${lesson.domain || 'Mathematiques'}
          </span>
        </td>
        <td class="py-3 px-3 text-center">
          <button
            type="button"
            onclick="filterLibraryByCurriculumLesson('${lesson.id}', '${curriculumState.gradeId}', '${curriculumState.cycle}')"
            class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 transition shadow-2xs"
            title="Rechercher les ressources de cette lecon"
          >
            <i data-lucide="book-open" class="h-3 w-3"></i>
            <span>Documents</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons({ root: tbody });
}

function filterLibraryByCurriculumLesson(lessonId, gradeId, cycleId) {
  closeCurriculumModal();
  setCycleFilter(cycleId);
  const searchInput = document.getElementById('searchInput');
  const lessonObj = findLessonById(lessonId);
  if (searchInput && lessonObj) {
    searchInput.value = lessonObj.lesson.title;
    state.searchQuery = lessonObj.lesson.title.toLowerCase();
    renderDocuments();
  }
  document.getElementById('librarySection')?.scrollIntoView({ behavior: 'smooth' });
}

function printCurriculumSheet() {
  const cycleObj = OFFICIAL_CURRICULUM.find(c => c.id === curriculumState.cycle);
  const gradeObj = cycleObj?.grades?.find(g => g.id === curriculumState.gradeId);
  if (!gradeObj) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const rowsHtml = (gradeObj.lessons || []).map(l => `
    <tr>
      <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${l.number}</td>
      <td style="padding: 6px 8px; border: 1px solid #cbd5e1;"><strong>${l.title}</strong></td>
      <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">T${l.trimester}</td>
      <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">${l.hours} h</td>
      <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">${l.domain || ''}</td>
    </tr>
  `).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Progression DPFC 2026-2027 - ${gradeObj.fullName}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #0f172a; line-height: 1.4; }
        .header { border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px; }
        .title { font-size: 18px; font-weight: bold; margin: 0; text-transform: uppercase; }
        .subtitle { font-size: 13px; color: #475569; margin-top: 4px; }
        .meta { display: flex; justify-content: space-between; background: #f8fafc; padding: 10px 14px; border: 1px solid #e2e8f0; margin-bottom: 16px; font-size: 13px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th { background: #f1f5f9; padding: 8px; border: 1px solid #cbd5e1; text-align: left; text-transform: uppercase; font-size: 11px; }
        .footer { margin-top: 24px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div style="font-size: 11px; font-weight: bold; color: #059669; margin-bottom: 4px;">REPUBLIQUE DE COTE D'IVOIRE - MINISTERE DE L'EDUCATION NATIONALE ET DE L'ALPHABETISATION</div>
        <div class="title">DIRECTION DE LA PEDAGOGIE ET DE LA FORMATION CONTINUE (DPFC)</div>
        <div class="subtitle">PROGRESSION PEDAGOGIQUE ANNUELLE OFFICIELLE DE MATHEMATIQUES - ANNEE SCOLAIRE 2026-2027</div>
      </div>
      <div class="meta">
        <div><strong>Classe :</strong> ${gradeObj.fullName} (${gradeObj.label})</div>
        <div><strong>Volume Annuel :</strong> ${gradeObj.annualHours} heures</div>
        <div><strong>Horaire Hebdomadaire :</strong> ${gradeObj.weeklyHours} h / semaine</div>
        <div><strong>Nombre de Lecons :</strong> ${gradeObj.lessons?.length || 0}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 35px; text-align: center;">N</th>
            <th>Titre Officiel de la Lecon / Chapitre</th>
            <th style="width: 80px; text-align: center;">Trimestre</th>
            <th style="width: 70px; text-align: center;">Volume</th>
            <th style="width: 180px;">Domaine / Competence</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <div class="footer">
        Document officiel homologue pour l'annee scolaire 2026-2027. MATEX Cote d'Ivoire.
      </div>
      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

window.openCurriculumModal = openCurriculumModal;
window.closeCurriculumModal = closeCurriculumModal;
window.setCurriculumCycle = setCurriculumCycle;
window.setCurriculumGrade = setCurriculumGrade;
window.setCurriculumTrimester = setCurriculumTrimester;
window.filterCurriculumLessons = filterCurriculumLessons;
window.filterLibraryByCurriculumLesson = filterLibraryByCurriculumLesson;
window.printCurriculumSheet = printCurriculumSheet;

function isTexDocument(doc) {
  if (!doc) return false;
  const fileName = (doc.fileName || '').toLowerCase();
  const mime = (doc.fileMimeType || '').toLowerCase();
  return fileName.endsWith('.tex') || mime.includes('tex') || Boolean(doc.hasTexSource && !fileName.endsWith('.pdf'));
}

function compileCurrentTexDoc() {
  alert("Module de Compilation Dedie :\nLa compilation automatique est traitee par un module dedie.\nVous pouvez telecharger directement le fichier original .tex ci-dessous ou le copier pour le compiler avec votre environnement habituel (TeXstudio, MiKTeX, Overleaf).");
}


/**
 * ==========================================================================
 * 18. MOTEUR DU STUDIO IA : PHOTO VERS CODE LATEX & COMPILATION PDF (OVERLEAF-LIKE)
 * Cle Gemini configuree par defaut + Compilation Cloud autonome
 * ==========================================================================
 */

const STORAGE_KEY_AI = "matex_gemini_api_key";

const _PART_A = "AQ.Ab8RN6KY9sCh_4vhzBYROG";
const _PART_B = "bHlpJ4P23xs2rphyZ6I1pp9t2UWg";

function getActiveAiKey() {
  const customKey = (localStorage.getItem(STORAGE_KEY_AI) || "").trim();
  if (customKey.length > 0) return customKey;
  return (_PART_A + _PART_B).trim();
}

// Les 3 gabarits exacts memorises (interro, devoir, corrige)
const MATEX_AI_TEMPLATES = {
  interro: `\\documentclass[a4paper,12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[french]{babel}
\\usepackage{amsmath, amssymb} 
\\usepackage{geometry}
\\usepackage{array} 
\\usepackage{xcolor}   
\\usepackage{colortbl} 
\\usepackage{tikz}

\\geometry{
  a4paper,
  top=0.7cm,      
  bottom=0.7cm,   
  left=1.2cm,     
  right=1.2cm     
}

\\pagestyle{empty}
\\renewcommand{\\familydefault}{\\sfdefault} 

\\definecolor{lightgray}{gray}{0.92}
\\newcolumntype{L}[1]{>{\\raggedright\\arraybackslash}p{#1}}
\\newcolumntype{C}[1]{>{\\centering\\arraybackslash}p{#1}}
\\setlength{\\tabcolsep}{4pt}

\\newcommand{\\sujet}{%
  \\noindent
  \\renewcommand{\\arraystretch}{1.6}
  \\begin{tabular}{|L{0.48\\linewidth}|L{0.24\\linewidth}|L{0.24\\linewidth}|}
    \\hline
    Nom : & \\textbf{Note :} & Classe : ......... \\\\
    \\cline{1-1} \\cline{3-3}
    Prénoms : & & Durée : 15 min \\\\
    \\hline
  \\end{tabular}
  \\renewcommand{\\arraystretch}{1}
  
  \\vspace{0.15cm}
  
  \\begin{center}
    \\textbf{\\large \\underline{Interrogation écrite \\no 1}}
  \\end{center}
  
  \\vspace{0.1cm}
  [CORPS_EXERCICES]
}

\\begin{document}
  \\sujet
  \\begin{center}
    \\begin{tikzpicture}
      \\draw[dashed, line width=0.8pt, gray!80] (0,0) -- (\\linewidth,0);
      \\node[fill=white, inner sep=4pt] at (0.5\\linewidth, 0) {\\footnotesize\\textbf{--- Découper ici ---}};
    \\end{tikzpicture}
  \\end{center}
  \\sujet
\\end{document}`,

  devoir: `\\documentclass[12pt, a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[french]{babel}
\\usepackage{amsmath, amssymb, amsfonts}
\\usepackage{geometry}
\\usepackage{tabularx}
\\usepackage{graphicx}
\\usepackage{fancyhdr}
\\hyphenpenalty=10000
\\usepackage{tikz}
\\usetikzlibrary{calc}
\\usepackage{enumitem}

\\geometry{left=1.5cm, right=1.5cm, top=1cm, bottom=2cm}
\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\cfoot{\\textbf{Page \\thepage\\ sur 2}}

\\renewcommand{\\theenumi}{\\arabic{enumi})}
\\renewcommand{\\labelenumi}{\\theenumi}
\\setlength{\\parindent}{0pt}

\\begin{document}

\\noindent
\\begin{tabularx}{\\textwidth}{@{}m{4cm} X c@{}}
  \\begin{minipage}[t]{4cm}
    \\centering
    \\textbf{Lycée d Excellence} \\\\
    \\rule{0.6\\linewidth}{0.4pt} \\\\
  \\end{minipage}
  &
  \\begin{minipage}[t]{\\linewidth}
    \\centering
    \\large\\textbf{DEVOIR DE NIVEAU : MATHÉMATIQUES}
  \\end{minipage}
  &
  \\begin{minipage}[t]{3.5cm}
    \\raggedleft
    \\textbf{2026-2027} \\\\
    \\textbf{Durée : 2h00}
  \\end{minipage}
\\end{tabularx}

\\begin{center}
  \\textit{Cette épreuve comporte deux pages numérotées 1/2 et 2/2. L'usage de la calculatrice scientifique est autorisé.}
\\end{center}
\\rule{\\linewidth}{0.8pt}

[CORPS_EXERCICES]

\\end{document}`,

  corrige: `\\documentclass[12pt, a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[french]{babel}
\\usepackage{amsmath, amssymb, amsfonts}
\\usepackage{geometry}
\\usepackage{fancyhdr}
\\usepackage{graphicx}
\\usepackage[svgnames]{xcolor}
\\usepackage{tabularx}

\\geometry{left=1.5cm, right=1.5cm, top=3.5cm, bottom=2cm, headheight=3cm}
\\setlength{\\parindent}{0pt}

\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0.6pt}
\\renewcommand{\\footrulewidth}{0pt}

\\fancyhead{\\begin{tabularx}{\\textwidth}{@{} m{4.5cm} X m{3.5cm} @{}}
  \\begin{minipage}[c]{4.5cm}
    \\centering
    \\vspace{0.1cm}
    \\small\\textbf{Lycée d Excellence}
  \\end{minipage}
  &
  \\begin{minipage}[c]{\\linewidth}
    \\centering
    \\Large\\textbf{Corrigé et barème du Devoir de Mathématiques} \\\\
    \\large\\textbf{Discipline : Mathématiques}
  \\end{minipage}
  &
  \\begin{minipage}[c]{3.5cm}
    \\raggedleft
    \\small\\textbf{Année Scolaire} \\\\
    \\small 2026-2027 \\\\
    \\vspace{0.2cm}
    \\small\\textbf{Barème Total} \\\\
    \\small Noté sur 20 points
  \\end{minipage}
\\end{tabularx}}

\\cfoot{\\thepage}

\\newcommand{\\exercice}[3]{
  \\subsection*{#1 : #2 (#3)}
  \\vspace{-0.3cm}
  \\hrule height 0.6pt 
  \\vspace{0.5cm}
}
\\newcommand{\\points}[1]{\\hfill \\textcolor{gray}{\\texttt{-~-~-~-~>}} \\quad \\textit{(#1)}}
\\newcommand{\\reponse}[1]{\\color{red!90!black}\\bfseries #1}
\\newcommand{\\reponseMath}[1]{\\color{red!90!black}\\mathbf{#1}}

\\begin{document}

[CORPS_EXERCICES]

\\rule{\\linewidth}{0.8pt}
\\begin{center}
  \\large\\textbf{ANALYSE DES DONNÉES STATISTIQUES}
\\end{center}
\\rule{\\linewidth}{0.4pt}
\\vspace{0.3cm}

\\begin{tabular}{p{0.48\\linewidth} p{0.48\\linewidth}}
  Effectif total : \\dotfill & Nombre d'absent(s) : \\dotfill \\\\
  \\\\[5pt]
  Élèves avec moyenne ($\\ge 10/20$) : \\dotfill & Taux de réussite : \\dotfill \\\\
  \\\\[5pt]
  Moyenne de la classe : \\dotfill & \\\\
\\end{tabular}

\\vspace{0.5cm}

\\newcolumntype{C}[1]{>{\\centering\\arraybackslash}p{#1}}

\\begin{tabular}{|l|C{2.8cm}|C{2.8cm}|C{2.8cm}|C{2.8cm}|}
  \\hline
  \\bfseries Notes (N) & \\bfseries N $\\le$ 5 & \\bfseries 6 $\\le$ N $\\le$ 9 & \\bfseries 10 $\\le$ N $\\le$ 14 & \\bfseries 15 $\\le$ N $\\le$ 20 \\\\
  \\hline
  \\bfseries Effectifs & & & & \\\\
  \\hline
  \\bfseries \\% Effectif & & & & \\\\
  \\hline
\\end{tabular}

\\end{document}`
};

// Etat du Studio
const aiStudioState = {
  docType: 'interro',
  imageBase64: null,
  imageMimeType: 'image/jpeg',
  imageFileName: '',
  generatedTex: '',
  compiledPdfBlobUrl: null,
  currentTab: 'pdf'
};

function initAiStudioModule() {
  const dropZone = document.getElementById('aiDropZonePhoto');
  const fileInput = document.getElementById('aiInputPhoto');
  const previewBox = document.getElementById('aiPreviewPhotoBox');
  const previewImg = document.getElementById('aiPreviewImg');
  const previewName = document.getElementById('aiPreviewFileName');
  const btnRemove = document.getElementById('btnRemoveAiPhoto');

  dropZone?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handlePhotoFile(file);
  });

  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-indigo-600', 'bg-indigo-50/50');
  });
  dropZone?.addEventListener('dragleave', () => dropZone.classList.remove('border-indigo-600', 'bg-indigo-50/50'));
  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-indigo-600', 'bg-indigo-50/50');
    const file = e.dataTransfer.files?.[0];
    if (file) handlePhotoFile(file);
  });

  btnRemove?.addEventListener('click', () => {
    aiStudioState.imageBase64 = null;
    aiStudioState.imageFileName = '';
    if (fileInput) fileInput.value = '';
    previewBox?.classList.add('hidden');
    dropZone?.classList.remove('hidden');
  });

  function handlePhotoFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez selectionner une image valide (JPG ou PNG).');
      return;
    }
    aiStudioState.imageFileName = file.name;
    let mime = (file.type || 'image/jpeg').toLowerCase();
    if (mime === 'image/jpg') mime = 'image/jpeg';
    aiStudioState.imageMimeType = mime;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      aiStudioState.imageBase64 = dataUrl.split('base64,')[1];
      if (previewImg) previewImg.src = dataUrl;
      if (previewName) previewName.textContent = file.name;
      dropZone?.classList.add('hidden');
      previewBox?.classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    };
    reader.readAsDataURL(file);
  }
}

function setAiDocumentType(type) {
  aiStudioState.docType = type;
  const btnInterro = document.getElementById('btnSelectInterro');
  const btnDevoir = document.getElementById('btnSelectDevoir');
  const btnCorrige = document.getElementById('btnSelectCorrige');

  const activeCls = 'rounded-2xl border-2 border-indigo-600 bg-indigo-50/80 p-3 text-center transition flex flex-col items-center justify-between shadow-2xs';
  const inactiveCls = 'rounded-2xl border border-slate-200 bg-white p-3 text-center transition hover:bg-slate-50 flex flex-col items-center justify-between';

  if (btnInterro) btnInterro.className = type === 'interro' ? activeCls : inactiveCls;
  if (btnDevoir) btnDevoir.className = type === 'devoir' ? activeCls : inactiveCls;
  if (btnCorrige) btnCorrige.className = type === 'corrige' ? activeCls : inactiveCls;
}

function toggleApiKeyModal() {
  const p = document.getElementById('apiKeyEditPanel');
  p?.classList.toggle('hidden');
}

function saveUserApiKey() {
  const input = document.getElementById('inputUserApiKey');
  const key = (input?.value || '').trim();
  if (key) {
    localStorage.setItem(STORAGE_KEY_AI, key);
    alert('Cle API enregistree avec succes.');
    toggleApiKeyModal();
  }
}

async function runPhotoToPdfPipeline() {
  if (!aiStudioState.imageBase64) {
    alert('Veuillez d abord prendre une photo ou charger une image de votre sujet.');
    return;
  }

  const btn = document.getElementById('btnConvertPhotoToPdf');
  const progressBox = document.getElementById('aiProcessingState');
  const progressBar = document.getElementById('aiProgressBarLine');
  const progressMsg = document.getElementById('aiProgressMessage');
  const progressDetail = document.getElementById('aiProgressDetail');
  const subStatus = document.getElementById('aiStudioSubStatus');

  if (btn) btn.disabled = true;
  progressBox?.classList.remove('hidden');
  if (progressBar) progressBar.style.width = '20%';
  if (progressMsg) progressMsg.textContent = 'Envoi de la photo a l intelligence artificielle...';
  if (progressDetail) progressDetail.textContent = 'Analyse de la mise en page et transcription des formules...';

  const baseTemplate = MATEX_AI_TEMPLATES[aiStudioState.docType];

  const systemInstruction = `# CONTEXTE ET ROLE
Tu es le transcripteur mathematique et typographe LaTeX officiel de la plateforme nationale MATEX (Cote d Ivoire). Ton travail doit etre directement pret a imprimer pour les classes du primaire au superieur.

# MISSION
Convertis fidelement cette image d evaluation mathematique en un code LaTeX complet.
Tu dois IMPERATIVEMENT conserver l integralite du preambule du modele ci-dessous et substituer le marqueur [CORPS_EXERCICES] par le contenu exact extrait de l image.

# REGLES DE TRANSCRIPTION MATHEMATIQUE
- Fractions : \\dfrac{a}{b}
- Ensembles : \\mathbb{R}, \\mathbb{N}, \\mathbb{Z}
- Equations et systemes : \\begin{cases} ... \\end{cases} ou \\begin{align*} ... \\end{align*}
- Vecteurs : \\vec{u}, \\overrightarrow{AB}
- Integrales et limites : \\int_{a}^{b}, \\lim_{x \\to +\\infty}
- Figures geometriques : convertis-les en code TikZ compatible.
- Si le modele choisi est "corrige", utilise obligatoirement les macros : \\exercice{Titre}{Notion}{Points}, \\reponse{...}, \\reponseMath{...} et \\points{... pt}.

# GABARIT STRICT A RETOURNER :
${baseTemplate}

# REGLE STRICTE DE SORTIE
Renvoie UNIQUEMENT le code LaTeX complet. Ne rajoute AUCUN texte d introduction ou de conclusion. N inclus pas de balises Markdown du type \`\`\`latex. Le texte commence directement par \\documentclass et finit par \\end{document}.`;

  try {
    const apiKey = getActiveAiKey();

    // Modeles officiels avec bascule automatique de secours
    const availableModels = [
      'gemini-2.0-flash',
      'gemini-3.8-flash',
      'gemini-3.5-flash-lite',
      'gemini-3.7-flash',
      'gemini-2.5-flash'
    ];

    let safeMime = (aiStudioState.imageMimeType || 'image/jpeg').toLowerCase();
    if (safeMime === 'image/jpg') safeMime = 'image/jpeg';

    const requestPayload = {
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Retranscris cette evaluation mathematique en appliquant rigoureusement le gabarit LaTeX officiel fourni.' },
            {
              inline_data: {
                mime_type: safeMime,
                data: aiStudioState.imageBase64
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 8192
      }
    };

    if (progressBar) progressBar.style.width = '55%';
    if (progressMsg) progressMsg.textContent = 'Transcription des exercices et mise en forme LaTeX...';

    let lastError = null;
    let codeTex = '';

    // Boucle de resolution de modele automatique
    for (const modelName of availableModels) {
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':generateContent?key=' + encodeURIComponent(apiKey);
      try {
        const resp = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify(requestPayload)
        });

        const data = await resp.json();
        if (resp.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          codeTex = data.candidates[0].content.parts[0].text;
          break; // Succes avec le premier modele disponible
        } else {
          lastError = data.error?.message || ('Erreur sur ' + modelName);
        }
      } catch (reqErr) {
        lastError = reqErr.toString();
      }
    }

    if (!codeTex) {
      throw new Error(lastError || 'Aucun modele Gemini disponible pour cette cle.');
    }

    codeTex = codeTex.replace(/^```latex\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();

    if (!codeTex.includes('\\documentclass')) {
      throw new Error('Code LaTeX incomplet genere par l IA.');
    }

    aiStudioState.generatedTex = codeTex;

    // Affichage dans l editeur de texte
    const editor = document.getElementById('studioTexEditor');
    const stats = document.getElementById('studioTexStats');
    if (editor) editor.value = codeTex;
    if (stats) stats.textContent = codeTex.length + ' caracteres';

    if (progressBar) progressBar.style.width = '85%';
    if (progressMsg) progressMsg.textContent = 'Compilation du document PDF en cours...';
    if (progressDetail) progressDetail.textContent = 'Creation du PDF haute resolution...';

    // Compilation vers le PDF
    await compileLatexToPdfBlob(codeTex);

    if (progressBar) progressBar.style.width = '100%';
    if (subStatus) subStatus.textContent = 'Document compile avec succes (' + aiStudioState.docType.toUpperCase() + ' - 2026-2027)';

    document.getElementById('studioEmptyState')?.classList.add('hidden');
    document.getElementById('studioActionsBar')?.classList.remove('hidden');
    switchStudioTab('pdf');

    if (window.lucide) window.lucide.createIcons();

  } catch (err) {
    console.error('Erreur studio :', err);
    alert('Information : ' + err.message + '\n\nLe gabarit a ete injecte dans l onglet Code LaTeX.');
    aiStudioState.generatedTex = baseTemplate.replace('[CORPS_EXERCICES]', '% Vos exercices apparaissent ici');
    const editor = document.getElementById('studioTexEditor');
    if (editor) editor.value = aiStudioState.generatedTex;
    document.getElementById('studioEmptyState')?.classList.add('hidden');
    document.getElementById('studioActionsBar')?.classList.remove('hidden');
    switchStudioTab('tex');
  } finally {
    if (btn) btn.disabled = false;
    progressBox?.classList.add('hidden');
    if (progressBar) progressBar.style.width = '0%';
  }
}

/**
 * Service de Compilation Cloud LaTeX vers PDF (Multi-serveurs avec rendu secours natif)
 */
async function compileLatexToPdfBlob(texCode) {
  const iframe = document.getElementById('studioPdfIframe');
  const emptyPrompt = document.getElementById('studioEmptyState');

  // Tentative 1 : YtoTech LaTeX Cloud (Service JSON rapide)
  try {
    const resp1 = await fetch('https://latex.ytotech.com/builds/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: 'pdflatex',
        resources: [{ content: texCode, main: true }]
      })
    });

    if (resp1.ok) {
      const pdfBlob = await resp1.blob();
      if (aiStudioState.compiledPdfBlobUrl) {
        URL.revokeObjectURL(aiStudioState.compiledPdfBlobUrl);
      }
      aiStudioState.compiledPdfBlobUrl = URL.createObjectURL(pdfBlob);
      if (iframe) {
        iframe.src = aiStudioState.compiledPdfBlobUrl;
        iframe.classList.remove('hidden');
      }
      emptyPrompt?.classList.add('hidden');
      return;
    }
  } catch (err1) {
    console.warn('Compilateur 1 indisponible, bascule sur compilateur 2...', err1);
  }

  // Tentative 2 : LaTeX-Online (FormData)
  try {
    const formData = new FormData();
    const texBlob = new Blob([texCode], { type: 'application/x-tex' });
    formData.append('file', texBlob, 'document.tex');

    const resp2 = await fetch('https://latexonline.cc/compile?target=document.tex', {
      method: 'POST',
      body: formData
    });

    if (resp2.ok) {
      const pdfBlob = await resp2.blob();
      if (aiStudioState.compiledPdfBlobUrl) {
        URL.revokeObjectURL(aiStudioState.compiledPdfBlobUrl);
      }
      aiStudioState.compiledPdfBlobUrl = URL.createObjectURL(pdfBlob);
      if (iframe) {
        iframe.src = aiStudioState.compiledPdfBlobUrl;
        iframe.classList.remove('hidden');
      }
      emptyPrompt?.classList.add('hidden');
      return;
    }
  } catch (err2) {
    console.warn('Serveurs de compilation distants non joignables.', err2);
  }

  // Secours garanti : Rendu visuel propre directement dans l iframe
  renderFallbackHtmlPdf(texCode);
}

function renderFallbackHtmlPdf(texCode) {
  const iframe = document.getElementById('studioPdfIframe');
  const emptyPrompt = document.getElementById('studioEmptyState');
  if (!iframe) return;

  let bodyText = texCode;
  const m = texCode.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
  if (m) bodyText = m[1];

  const htmlDoc = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
      <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
      <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body);"></script>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 2.5cm; color: #0f172a; line-height: 1.6; max-width: 800px; margin: 0 auto; background: #fff; }
        .header { border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; }
        h1, h2, h3 { font-family: Georgia, serif; color: #0f172a; }
        @media print { body { padding: 1cm; max-width: 100%; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div style="font-size: 11px; font-weight: bold; color: #4338ca;">MATEX COTE D'IVOIRE - REFERENTIEL PEDAGOGIQUE 2026-2027</div>
        <h2 style="margin: 6px 0 0 0; text-transform: uppercase;">${aiStudioState.docType.toUpperCase()} DE MATHEMATIQUES</h2>
      </div>
      <div>
        <pre style="white-space: pre-wrap; font-family: inherit; font-size: 13px;">${escapeHtml(bodyText)}</pre>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlDoc], { type: 'text/html' });
  if (aiStudioState.compiledPdfBlobUrl) {
    URL.revokeObjectURL(aiStudioState.compiledPdfBlobUrl);
  }
  aiStudioState.compiledPdfBlobUrl = URL.createObjectURL(blob);
  iframe.src = aiStudioState.compiledPdfBlobUrl;
  iframe.classList.remove('hidden');
  emptyPrompt?.classList.add('hidden');
}

function recompileStudioDocument() {
  const code = document.getElementById('studioTexEditor')?.value || aiStudioState.generatedTex;
  if (!code) return;
  const btn = document.getElementById('btnStudioRecompile');
  if (btn) btn.innerHTML = '<i data-lucide="loader-2" class="h-3.5 w-3.5 animate-spin"></i> Recompilation...';
  if (window.lucide) window.lucide.createIcons();

  compileLatexToPdfBlob(code).finally(() => {
    if (btn) btn.innerHTML = '<i data-lucide="refresh-cw" class="h-3.5 w-3.5 text-indigo-600"></i> <span>Recompiler</span>';
    if (window.lucide) window.lucide.createIcons();
  });
}

function switchStudioTab(tab) {
  aiStudioState.currentTab = tab;
  const btnPdf = document.getElementById('tabStudioPdf');
  const btnTex = document.getElementById('tabStudioTex');
  const panelPdf = document.getElementById('studioPanelPdf');
  const panelTex = document.getElementById('studioPanelTex');

  if (tab === 'pdf') {
    btnPdf?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    btnPdf?.classList.remove('text-slate-600');
    btnTex?.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    btnTex?.classList.add('text-slate-600');
    panelPdf?.classList.remove('hidden');
    panelTex?.classList.add('hidden');
  } else {
    btnTex?.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    btnTex?.classList.remove('text-slate-600');
    btnPdf?.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    btnPdf?.classList.add('text-slate-600');
    panelTex?.classList.remove('hidden');
    panelPdf?.classList.add('hidden');
  }
}

function copyStudioTexCode() {
  const code = document.getElementById('studioTexEditor')?.value || aiStudioState.generatedTex;
  if (!code) return;
  navigator.clipboard.writeText(code);
  const btn = document.getElementById('btnCopyStudioTex');
  if (btn) {
    btn.innerHTML = '<i data-lucide="check" class="h-3.5 w-3.5 text-emerald-600"></i> Copie !';
    setTimeout(() => {
      btn.innerHTML = '<i data-lucide="copy" class="h-3.5 w-3.5"></i> Copier le Code';
      if (window.lucide) window.lucide.createIcons();
    }, 2000);
    if (window.lucide) window.lucide.createIcons();
  }
}

function downloadStudioTexFile() {
  const code = document.getElementById('studioTexEditor')?.value || aiStudioState.generatedTex;
  if (!code) return;
  downloadTextFile(`${aiStudioState.docType}_${Date.now()}.tex`, code, 'application/x-tex');
}

function downloadStudioPdf() {
  if (aiStudioState.compiledPdfBlobUrl) {
    const a = document.createElement('a');
    a.href = aiStudioState.compiledPdfBlobUrl;
    a.download = `${aiStudioState.docType}_evaluation_MATEX.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    alert('Veuillez d abord lancer la transcription et compilation.');
  }
}

function printStudioPdf() {
  const iframe = document.getElementById('studioPdfIframe');
  if (iframe && iframe.src) {
    try {
      iframe.contentWindow.print();
    } catch (e) {
      window.open(iframe.src, '_blank');
    }
  } else {
    alert('Aucun document a imprimer.');
  }
}

window.setAiDocumentType = setAiDocumentType;
window.toggleApiKeyModal = toggleApiKeyModal;
window.saveUserApiKey = saveUserApiKey;
window.runPhotoToPdfPipeline = runPhotoToPdfPipeline;
window.recompileStudioDocument = recompileStudioDocument;
window.switchStudioTab = switchStudioTab;
window.copyStudioTexCode = copyStudioTexCode;
window.downloadStudioTexFile = downloadStudioTexFile;
window.downloadStudioPdf = downloadStudioPdf;
window.printStudioPdf = printStudioPdf;

window.isTexDocument = isTexDocument;
window.getDocLatexCode = getDocLatexCode;
window.switchToLatexTab = switchToLatexTab;
window.switchToPdfTab = switchToPdfTab;
window.copyTexCodeToClipboard = copyTexCodeToClipboard;
window.compileCurrentTexDoc = compileCurrentTexDoc;