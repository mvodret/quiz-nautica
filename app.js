// Quiz Nautica App - Dual Mode JavaScript
// ==================================================

class QuizAppDualMode {
    constructor() {
        // STATO APPLICAZIONE
        this.currentMode = null; // 'base' o 'vela'
        this.currentData = null; // Dataset attivo
        
        // ELEMENTI DOM - Mode Selection
        this.modeSelection = document.getElementById('mode-selection');
        this.selectBase = document.getElementById('selectBase');
        this.selectVela = document.getElementById('selectVela');
        
        // ELEMENTI DOM - Quiz Interface
        this.quizInterface = document.getElementById('quiz-interface');
        this.modeIndicator = document.getElementById('mode-indicator');
        this.currentModeText = document.getElementById('current-mode-text');
        this.changeMode = document.getElementById('changeMode');
        
        // ELEMENTI DOM - Search & Results
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.quizContainer = document.getElementById('quiz-container');
        this.resultsInfo = document.getElementById('results-info');
        this.welcomeStats = document.getElementById('welcome-stats');
        
        // Inizializza gli event listeners
        this.initEventListeners();
    }
    
    // INIZIALIZZAZIONE EVENT LISTENERS
    // --------------------------------
    initEventListeners() {
        // MODE SELECTION LISTENERS
        this.selectBase.addEventListener('click', () => this.selectMode('base'));
        this.selectVela.addEventListener('click', () => this.selectMode('vela'));
        this.changeMode.addEventListener('click', () => this.showModeSelection());
        
        // SEARCH LISTENERS
        this.searchBtn.addEventListener('click', () => this.search());
        this.clearBtn.addEventListener('click', () => this.clear());
        
        // RICERCA MENTRE SCRIVI (con debounce)
        let timeout;
        this.searchInput.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (this.searchInput.value.trim().length >= 2) {
                    this.search();
                }
            }, 500);
        });
        
        // RICERCA CON ENTER
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.search();
            }
        });
    }
    
    // SELEZIONE MODALITÀ
    // ------------------
    selectMode(mode) {
        this.currentMode = mode;
        
        if (mode === 'base') {
            this.currentData = QUIZ_DATA_BASE;
            this.currentModeText.textContent = '📋 Quiz Base - Patente Nautica Classica (A/B/C)';
            this.welcomeStats.textContent = `Hai a disposizione ${APP_CONFIG.totalBase} quiz base.`;
        } else {
            this.currentData = QUIZ_DATA_VELA;
            this.currentModeText.textContent = '⛵ Quiz Vela - Estensione Vela (Vero/Falso)';
            this.welcomeStats.textContent = `Hai a disposizione ${APP_CONFIG.totalVela} quiz vela.`;
        }
        
        // Mostra l'interfaccia quiz e nascondi la selezione
        this.modeSelection.style.display = 'none';
        this.quizInterface.style.display = 'block';
        
        // Reset search
        this.showWelcomeMessage();
    }
    
    // TORNA ALLA SELEZIONE MODALITÀ
    // -----------------------------
    showModeSelection() {
        this.currentMode = null;
        this.currentData = null;
        this.modeSelection.style.display = 'block';
        this.quizInterface.style.display = 'none';
        this.searchInput.value = '';
    }
    
    // FUNZIONE RICERCA PRINCIPALE
    // ---------------------------
    search() {
        if (!this.currentData) return;
        
        const keywords = this.searchInput.value.trim().toLowerCase();
        
        // Se non ci sono keyword, mostra messaggio benvenuto
        if (!keywords) {
            this.showWelcomeMessage();
            return;
        }
        
        // Divide le keyword per spazi (ricerca multi-termine)
        const keywordArray = keywords.split(/\s+/);
        
        // FILTRO QUIZ DAL DATASET ATTIVO
        // ------------------------------
        const filteredQuizzes = this.currentData.filter(quiz => {
            // Crea stringa di ricerca combinando domanda e opzioni
            const searchText = [
                quiz.question,
                ...quiz.options.map(opt => opt.text)
            ].join(' ').toLowerCase();
            
            // Verifica se almeno una keyword è presente nel testo
            return keywordArray.some(keyword => 
                searchText.includes(keyword)
            );
        });
        
        // Mostra i risultati
        this.displayResults(filteredQuizzes, keywords);
    }
    
    // VISUALIZZAZIONE RISULTATI
    // -------------------------
    displayResults(quizzes, searchTerm) {
        const modeText = this.currentMode === 'base' ? 'base' : 'vela';
        
        // CASO: Nessun risultato
        if (quizzes.length === 0) {
            this.resultsInfo.textContent = `❌ Nessun quiz ${modeText} trovato per "${searchTerm}"`;
            this.quizContainer.innerHTML = `
                <div class="welcome-message">
                    <h2>Nessun risultato 😔</h2>
                    <p>Prova con altre parole chiave.</p>
                    <p>Esempi: <em>diesel, vento, lunghezza, ponte, sentina</em></p>
                </div>
            `;
            return;
        }
        
        // CASO: Risultati trovati
        this.resultsInfo.textContent = `🔍 Trovati ${quizzes.length} quiz ${modeText} per "${searchTerm}"`;
        
        // Mostra tutti i quiz trovati con classe CSS specifica per modalità
        const quizClass = this.currentMode === 'vela' ? 'quiz-vela' : 'quiz-base';
        this.quizContainer.className = `quiz-container ${quizClass}`;
        this.quizContainer.innerHTML = quizzes.map(quiz => 
            this.createQuizCard(quiz)
        ).join('');
    }
    
    // CREAZIONE CARD SINGOLO QUIZ (DUAL-MODE)
    // ----------------------------------------
    createQuizCard(quiz) {
        // GESTIONE IMMAGINE
        const figureHtml = quiz.figure ? `
            <div class="quiz-figure">
                <img src="${quiz.figure.data}" alt="Figura quiz" style="max-width: 100%; height: auto; border-radius: 8px;">
            </div>
        ` : '';
        
        // GENERAZIONE OPZIONI DIFFERENZIATE
        let optionsHtml = '';
        
        if (this.currentMode === 'vela') {
            // QUIZ VELA: Solo Vero/Falso
            optionsHtml = quiz.options.map((option, index) => {
                const correctClass = option.correct ? 'correct' : '';
                const typeClass = option.text === 'VERO' ? 'vero' : 'falso';
                const icon = option.correct ? '✅' : '❌';
                
                return `
                    <div class="option ${correctClass} ${typeClass}">
                        <span class="option-text">${option.text}</span>
                        <span class="option-icon">${icon}</span>
                    </div>
                `;
            }).join('');
        } else {
            // QUIZ BASE: A/B/C classico
            optionsHtml = quiz.options.map((option, index) => {
                const letter = String.fromCharCode(65 + index); // A, B, C
                const correctClass = option.correct ? 'correct' : '';
                const icon = option.correct ? '✅' : '❌';
                
                return `
                    <div class="option ${correctClass}">
                        <span class="option-label">${letter})</span>
                        <span class="option-text">${option.text}</span>
                        <span class="option-icon">${icon}</span>
                    </div>
                `;
            }).join('');
        }
        
        // Icone e testo specifici per modalità
        const modeIcon = this.currentMode === 'vela' ? '⛵' : '🚢';
        const hasImage = quiz.figure ? '🖼️' : '';
        
        // ASSEMBLY CARD COMPLETA
        return `
            <div class="quiz-card">
                <div class="quiz-header">
                    ${modeIcon} Quiz ${quiz.id} ${hasImage}
                </div>
                <div class="quiz-question">
                    ${quiz.question}
                </div>
                ${figureHtml}
                <div class="quiz-options">
                    ${optionsHtml}
                </div>
            </div>
        `;
    }
    
    // PULISCI RICERCA
    // ---------------
    clear() {
        this.searchInput.value = '';
        this.showWelcomeMessage();
    }
    
    // MESSAGGIO BENVENUTO DUAL-MODE
    // ------------------------------
    showWelcomeMessage() {
        this.resultsInfo.textContent = '';
        this.quizContainer.className = 'quiz-container'; // Reset class
        
        if (!this.currentMode) return;
        
        const modeIcon = this.currentMode === 'vela' ? '⛵' : '📋';
        const modeText = this.currentMode === 'vela' ? 'Vela' : 'Base';
        const totalQuiz = this.currentMode === 'vela' ? APP_CONFIG.totalVela : APP_CONFIG.totalBase;
        
        this.quizContainer.innerHTML = `
            <div class="welcome-message">
                <h2>${modeIcon} Modalità ${modeText} Attiva! 👋</h2>
                <p>Cerca una parola chiave per trovare i quiz correlati.</p>
                <p>Hai a disposizione <strong>${totalQuiz} quiz ${modeText.toLowerCase()}</strong>.</p>
                <p><em>Esempi: diesel, vento, lunghezza, ponte, sentina</em></p>
            </div>
        `;
    }
}

// INIZIALIZZAZIONE APP DUAL-MODE
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
    new QuizAppDualMode();
    console.log('Quiz Nautica Dual-Mode App inizializzata!');
    console.log(`Base: ${APP_CONFIG.totalBase} quiz, Vela: ${APP_CONFIG.totalVela} quiz`);
});

// SERVICE WORKER PER PWA (opzionale)
// ----------------------------------
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}