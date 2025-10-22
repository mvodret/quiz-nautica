// Quiz Nautica App - JavaScript
// Classe principale che gestisce tutta la logica dell'applicazione

class QuizApp {
    constructor() {
        // ELEMENTI DOM - Riferimenti agli elementi HTML
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.quizContainer = document.getElementById('quiz-container');
        this.resultsInfo = document.getElementById('results-info');
        
        // Inizializza gli event listeners
        this.initEventListeners();
    }
    
    // INIZIALIZZAZIONE EVENT LISTENERS
    // --------------------------------
    initEventListeners() {
        // Click su bottone cerca
        this.searchBtn.addEventListener('click', () => this.search());
        
        // Click su bottone pulisci
        this.clearBtn.addEventListener('click', () => this.clear());
        
        // RICERCA MENTRE SCRIVI (con debounce per performance)
        let timeout;
        this.searchInput.addEventListener('input', () => {
            clearTimeout(timeout);
            // Aspetta 500ms dopo che l'utente smette di scrivere
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
    
    // FUNZIONE RICERCA PRINCIPALE
    // ---------------------------
    search() {
        const keywords = this.searchInput.value.trim().toLowerCase();
        
        // Se non ci sono keyword, mostra messaggio benvenuto
        if (!keywords) {
            this.showWelcomeMessage();
            return;
        }
        
        // Divide le keyword per spazi (ricerca multi-termine)
        const keywordArray = keywords.split(/\\s+/);
        
        // FILTRO QUIZ
        // -----------
        const filteredQuizzes = QUIZ_DATA.filter(quiz => {
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
        // CASO: Nessun risultato
        if (quizzes.length === 0) {
            this.resultsInfo.textContent = `❌ Nessun quiz trovato per "${searchTerm}"`;
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
        this.resultsInfo.textContent = `🔍 Trovati ${quizzes.length} quiz per "${searchTerm}"`;
        
        // Mostra tutti i quiz trovati (rimosso limite 20)  
        this.quizContainer.innerHTML = quizzes.map(quiz => 
            this.createQuizCard(quiz)
        ).join('');
    }
    
    // CREAZIONE CARD SINGOLO QUIZ
    // ----------------------------
    createQuizCard(quiz) {
        // GESTIONE IMMAGINE
        // Se il quiz ha un'immagine, crea l'HTML per mostrarla
        const figureHtml = quiz.figure ? `
            <div class="quiz-figure">
                <strong style="color: #2E86AB;"> </strong>
                <img src="${quiz.figure.data}" alt="Figura quiz" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;">
            </div>
        ` : '';
        
        // GENERAZIONE OPZIONI
        // Crea HTML per ogni opzione di risposta
        const optionsHtml = quiz.options.map((option, index) => {
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
        
        // Icona per quiz con immagine
        const hasImage = quiz.figure ? '🖼️' : '';
        
        // ASSEMBLY CARD COMPLETA
        return `
            <div class="quiz-card">
                <div class="quiz-header">
                    🚢 Quiz ${quiz.id} ${hasImage}
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
    
    // MESSAGGIO BENVENUTO
    // -------------------
    showWelcomeMessage() {
        this.resultsInfo.textContent = '';
        this.quizContainer.innerHTML = `
            <div class="welcome-message">
                <h2>Benvenuto! 👋</h2>
                <p>Cerca una parola chiave per trovare i quiz correlati.</p>
                <p>Hai a disposizione <strong>${QUIZ_DATA.length} quiz</strong> della patente nautica.</p>
                <p><em>Esempi: diesel, vento, lunghezza, ponte, sentina</em></p>
            </div>
        `;
    }
}

// INIZIALIZZAZIONE APP
// --------------------
// Avvia l'app quando la pagina è completamente caricata
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// SERVICE WORKER PER PWA (opzionale)
// ----------------------------------
// Registra service worker se supportato dal browser
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