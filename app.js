// Quiz Nautica App - JavaScript
class QuizApp {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.quizContainer = document.getElementById('quiz-container');
        this.resultsInfo = document.getElementById('results-info');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        this.searchBtn.addEventListener('click', () => this.search());
        this.clearBtn.addEventListener('click', () => this.clear());
        
        // Ricerca mentre scrivi (con debounce)
        let timeout;
        this.searchInput.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (this.searchInput.value.trim().length >= 2) {
                    this.search();
                }
            }, 500);
        });
        
        // Ricerca con ENTER
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.search();
            }
        });
    }
    
    search() {
        const keywords = this.searchInput.value.trim().toLowerCase();
        
        if (!keywords) {
            this.showWelcomeMessage();
            return;
        }
        
        // Dividi le keyword per spazi
        const keywordArray = keywords.split(/\s+/);
        
        // Filtra i quiz
        const filteredQuizzes = QUIZ_DATA.filter(quiz => {
            const searchText = [
                quiz.question,
                ...quiz.options.map(opt => opt.text)
            ].join(' ').toLowerCase();
            
            // Verifica se almeno una keyword è presente
            return keywordArray.some(keyword => 
                searchText.includes(keyword)
            );
        });
        
        this.displayResults(filteredQuizzes, keywords);
    }
    
    displayResults(quizzes, searchTerm) {
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
        
        this.resultsInfo.textContent = `🔍 Trovati ${quizzes.length} quiz per "${searchTerm}"`;
        
        // Mostra massimo 20 quiz per performance
        const maxQuizzes = Math.min(quizzes.length, 20);
        const quizzesToShow = quizzes.slice(0, maxQuizzes);
        
        if (quizzes.length > 20) {
            this.resultsInfo.textContent += ` (mostrati i primi ${maxQuizzes})`;
        }
        
        this.quizContainer.innerHTML = quizzesToShow.map(quiz => 
            this.createQuizCard(quiz)
        ).join('');
    }
    
    createQuizCard(quiz) {
        // Crea l'HTML per l'immagine se presente
        const figureHtml = quiz.figure ? `
            <div class="quiz-figure">
                <strong style="color: #2E86AB;"> </strong>
                <img src="${quiz.figure.data}" alt="Figura quiz" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;">
            </div>
        ` : '';
        
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
        
        const hasImage = quiz.figure ? '🖼️' : '';
        
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
    
    clear() {
        this.searchInput.value = '';
        this.showWelcomeMessage();
    }
    
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

// Avvia l'app quando la pagina è caricata
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// Service Worker per PWA (opzionale)
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