// Quiz App Triple Mode - Nautica COMPLETO
// Supporta: Ricerca INTERATTIVA (Base/Vela) + Esame Simulato

class QuizAppTripleMode {
    constructor() {
        this.currentMode = 'base'; // base, vela, exam
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isExamMode = false;
        this.examStartTime = null;
        this.searchResults = [];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showModeSelection();
        
        // Verifica dati disponibili
        if (typeof quiz_data_base === 'undefined') {
            console.error('quiz_data_base non trovato');
            return;
        }
        
        console.log('Quiz App Triple Mode inizializzata');
        console.log(`Quiz Base: ${quiz_data_base.length} domande`);
        console.log(`Quiz Vela: ${quiz_data_vela ? quiz_data_vela.length : 0} domande`);
        console.log('Exam Schema:', exam_schema);
    }
    
    bindEvents() {
        // Mode selection
        document.getElementById('selectBase')?.addEventListener('click', () => this.startMode('base'));
        document.getElementById('selectVela')?.addEventListener('click', () => this.startMode('vela'));
        document.getElementById('selectExam')?.addEventListener('click', () => this.startMode('exam'));
        
        // Search interface
        document.getElementById('searchBtn')?.addEventListener('click', () => this.performSearch());
        document.getElementById('clearBtn')?.addEventListener('click', () => this.clearSearch());
        document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        document.getElementById('backToModesFromSearch')?.addEventListener('click', () => this.showModeSelection());
        
        // Exam interface
        document.getElementById('nextQuestion')?.addEventListener('click', () => this.nextQuestion());
        document.getElementById('restartExam')?.addEventListener('click', () => this.startMode('exam'));
        document.getElementById('newExam')?.addEventListener('click', () => this.startMode('exam'));
        document.getElementById('backToModesFromExam')?.addEventListener('click', () => this.showModeSelection());
        document.getElementById('backToModesFromResults')?.addEventListener('click', () => this.showModeSelection());
        
        // Event delegation per gestire click dinamici
        document.addEventListener('click', (e) => {
            // Risposte esame
            if (e.target.classList.contains('answer')) {
                this.selectAnswer(e.target);
            }
            // Risposte ricerca (interattive)
            else if (e.target.classList.contains('search-quiz-option')) {
                this.handleSearchOptionClick(e.target);
            }
        });
    }
    
    showModeSelection() {
        document.getElementById('mode-selection').style.display = 'block';
        document.getElementById('search-interface').style.display = 'none';
        document.getElementById('exam-interface').style.display = 'none';
        document.getElementById('exam-results').style.display = 'none';
        
        // Reset stato
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isExamMode = false;
        this.examStartTime = null;
        this.searchResults = [];
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }
    
    startMode(mode) {
        this.currentMode = mode;
        
        if (mode === 'base' || mode === 'vela') {
            // Modalità ricerca
            this.showSearchInterface();
        } else if (mode === 'exam') {
            // Modalità esame
            this.startExam();
        }
    }
    
    showSearchInterface() {
        document.getElementById('mode-selection').style.display = 'none';
        document.getElementById('search-interface').style.display = 'block';
        document.getElementById('exam-interface').style.display = 'none';
        document.getElementById('exam-results').style.display = 'none';
        
        // Aggiorna header
        const modeText = this.currentMode === 'base' ? 'Quiz Base - Ricerca' : 'Quiz Vela - Ricerca';
        document.getElementById('currentSearchMode').textContent = modeText;
        
        // Aggiorna statistiche
        const currentData = this.currentMode === 'base' ? quiz_data_base : quiz_data_vela;
        const statsText = `Hai a disposizione ${currentData.length} quiz della patente nautica ${this.currentMode === 'base' ? 'base' : 'vela'}.`;
        document.getElementById('welcome-stats').textContent = statsText;
        
        // Pulisci ricerca precedente
        this.clearSearch();
    }
    
    performSearch() {
        const query = document.getElementById('searchInput').value.trim().toLowerCase();
        if (!query) {
            alert('Inserisci una parola chiave per la ricerca');
            return;
        }
        
        const currentData = this.currentMode === 'base' ? quiz_data_base : quiz_data_vela;
        
        // Cerca nei testi delle domande e delle risposte
        this.searchResults = currentData.filter(quiz => {
            const questionMatch = quiz.question.toLowerCase().includes(query);
            const optionsMatch = quiz.options.some(option => {
                const optionText = typeof option === 'string' ? option : option.text;
                return optionText.toLowerCase().includes(query);
            });
            return questionMatch || optionsMatch;
        });
        
        this.displaySearchResults(query);
    }
    
    displaySearchResults(query) {
        const resultsInfo = document.getElementById('results-info');
        const quizContainer = document.getElementById('quiz-container');
        
        resultsInfo.innerHTML = `
            <div class="search-summary">
                <strong>Ricerca: "${query}"</strong> - 
                ${this.searchResults.length} risultati trovati in ${this.currentMode === 'base' ? 'Quiz Base' : 'Quiz Vela'}
            </div>
        `;
        
        if (this.searchResults.length === 0) {
            quizContainer.innerHTML = `
                <div class="no-results">
                    <h3>❌ Nessun risultato trovato</h3>
                    <p>Prova con una parola chiave diversa</p>
                </div>
            `;
            return;
        }
        
        // Mostra i risultati con risposte INTERATTIVE
        let html = '<div class="quiz-list">';
        this.searchResults.forEach((quiz, index) => {
            html += `
                <div class="quiz-item" data-quiz-index="${index}">
                    <div class="quiz-header">
                        <h3>Domanda ${index + 1}/${this.searchResults.length}</h3>
                        ${quiz.category ? `<span class="quiz-category">${quiz.category}</span>` : ''}
                    </div>
                    <div class="quiz-question">${quiz.question}</div>
                    ${quiz.figure && quiz.figure.data ? `<img src="${quiz.figure.data}" alt="Immagine" class="quiz-image">` : ''}
                    <div class="quiz-options">
                        ${quiz.options.map((option, optIndex) => {
                            const optionText = typeof option === 'string' ? option : option.text;
                            const isCorrect = typeof option === 'string' ? false : option.correct;
                            const letter = ['A', 'B', 'C', 'D'][optIndex];
                            return `
                                <div class="search-quiz-option" 
                                     data-quiz-index="${index}" 
                                     data-option-index="${optIndex}"
                                     data-is-correct="${isCorrect}">
                                    <strong>${letter})</strong> ${optionText}
                                </div>
                            `;
                        }).join('')}
                    </div>
                    <div class="quiz-feedback" id="feedback-${index}" style="display: none;"></div>
                </div>
            `;
        });
        html += '</div>';
        
        quizContainer.innerHTML = html;
    }
    
    // Gestisce il click sulle opzioni di ricerca (interattive)
    handleSearchOptionClick(optionEl) {
        const quizIndex = parseInt(optionEl.dataset.quizIndex);
        const optionIndex = parseInt(optionEl.dataset.optionIndex);
        const isCorrect = optionEl.dataset.isCorrect === 'true';
        
        // Rimuovi selezioni precedenti per questo quiz
        const quizItem = optionEl.closest('.quiz-item');
        quizItem.querySelectorAll('.search-quiz-option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Seleziona l'opzione cliccata
        optionEl.classList.add('selected');
        
        // Mostra tutte le risposte con i colori corretti
        quizItem.querySelectorAll('.search-quiz-option').forEach(opt => {
            const optIsCorrect = opt.dataset.isCorrect === 'true';
            if (optIsCorrect) {
                opt.classList.add('correct');
            } else if (opt === optionEl && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });
        
        // Mostra feedback
        const feedbackEl = document.getElementById(`feedback-${quizIndex}`);
        if (feedbackEl) {
            feedbackEl.style.display = 'block';
            if (isCorrect) {
                feedbackEl.innerHTML = '<div class="feedback-correct">✅ <strong>Corretto!</strong> Ottima risposta.</div>';
            } else {
                feedbackEl.innerHTML = '<div class="feedback-incorrect">❌ <strong>Sbagliato!</strong> </div>';
            }
        }
    }
    
    clearSearch() {
        document.getElementById('searchInput').value = '';
        document.getElementById('results-info').innerHTML = '';
        document.getElementById('quiz-container').innerHTML = `
            <div class="welcome-message">
                <h2>Benvenuto! 👋</h2>
                <p>Cerca una parola chiave per trovare i quiz correlati.</p>
                <p id="welcome-stats">Hai a disposizione quiz della patente nautica.</p>
            </div>
        `;
        this.searchResults = [];
    }
    
    // === MODALITÀ ESAME ===
    
    startExam() {
        this.isExamMode = true;
        this.examStartTime = new Date();
        
        // Genera esame random
        this.currentQuestions = this.generateRandomExam();
        
        if (this.currentQuestions.length !== 20) {
            alert(`Errore: esame dovrebbe avere 20 domande, generate ${this.currentQuestions.length}`);
            console.error('Errore generazione esame:', this.currentQuestions.length);
            this.showModeSelection();
            return;
        }
        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        
        this.showExamInterface();
        this.displayExamQuestion();
        
        console.log('Esame generato con successo:', this.currentQuestions.length, 'domande');
    }
    
    generateRandomExam() {
        const examQuestions = [];
        const usedQuestions = new Set();
        
        console.log('Generazione esame con schema ufficiale...');
        
        // Per ogni categoria nell'exam schema
        for (const [category, requiredCount] of Object.entries(exam_schema)) {
            // Filtra domande di questa categoria non ancora usate
            const categoryQuestions = quiz_data_base.filter(q => 
                q.category === category && !usedQuestions.has(q.id)
            );
            
            if (categoryQuestions.length < requiredCount) {
                console.warn(`Attenzione: categoria "${category}" ha solo ${categoryQuestions.length} domande disponibili, ne servono ${requiredCount}`);
            }
            
            // Mescola e seleziona il numero richiesto
            this.shuffleArray(categoryQuestions);
            const selected = categoryQuestions.slice(0, requiredCount);
            
            // Aggiungi all'esame e marca come usate
            selected.forEach(q => {
                examQuestions.push(q);
                usedQuestions.add(q.id);
            });
            
            console.log(`${category}: selezionate ${selected.length}/${requiredCount} domande`);
        }
        
        // Mescola l'ordine finale delle domande nell'esame
        this.shuffleArray(examQuestions);
        
        console.log(`Esame generato: ${examQuestions.length} domande totali`);
        return examQuestions;
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    showExamInterface() {
        document.getElementById('mode-selection').style.display = 'none';
        document.getElementById('search-interface').style.display = 'none';
        document.getElementById('exam-interface').style.display = 'block';
        document.getElementById('exam-results').style.display = 'none';
        
        // Avvia timer
        this.startExamTimer();
    }
    
    startExamTimer() {
        const timerEl = document.getElementById('examTimer');
        if (!timerEl || !this.isExamMode) return;
        
        const updateTimer = () => {
            if (!this.examStartTime || !this.isExamMode) return;
            
            const elapsed = new Date() - this.examStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            timerEl.textContent = `Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };
        
        updateTimer();
        this.timerInterval = setInterval(updateTimer, 1000);
    }
    
    displayExamQuestion() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        if (!question) {
            console.error('Domanda non trovata all\'indice:', this.currentQuestionIndex);
            return;
        }
        
        // Aggiorna progress
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('totalQuestions').textContent = this.currentQuestions.length;
        
        const progress = ((this.currentQuestionIndex + 1) / this.currentQuestions.length) * 100;
        document.getElementById('progressBar').style.width = progress + '%';
        
        // Mostra domanda
        document.getElementById('questionText').textContent = question.question || 'Domanda non disponibile';
        
        // Mostra categoria
        document.getElementById('questionCategory').textContent = `Categoria: ${question.category}`;
        
        // Mostra immagine se presente
        const imageContainer = document.getElementById('questionImage');
        if (question.figure && question.figure.data) {
            imageContainer.innerHTML = `<img src="${question.figure.data}" alt="Immagine domanda" style="max-width: 100%; height: auto;">`;
            imageContainer.style.display = 'block';
        } else {
            imageContainer.style.display = 'none';
        }
        
        // Mostra risposte
        const answersContainer = document.getElementById('answers');
        if (answersContainer && question.options) {
            const letters = ['A', 'B', 'C', 'D'];
            answersContainer.innerHTML = question.options.map((option, index) => {
                const optionText = typeof option === 'string' ? option : option.text;
                return `<div class="answer" data-answer="${letters[index]}">
                    ${letters[index]}) ${optionText}
                </div>`;
            }).join('');
        }
        
        // Reset selezione
        document.querySelectorAll('.answer').forEach(el => el.classList.remove('selected'));
        document.getElementById('nextQuestion').disabled = true;
    }
    
    selectAnswer(answerEl) {
        // Remove previous selection
        document.querySelectorAll('.answer').forEach(el => el.classList.remove('selected'));
        
        // Add selection to clicked answer
        answerEl.classList.add('selected');
        
        // Enable next button
        document.getElementById('nextQuestion').disabled = false;
        
        // Store answer
        const selectedAnswer = answerEl.dataset.answer;
        this.userAnswers[this.currentQuestionIndex] = selectedAnswer;
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.displayExamQuestion();
        } else {
            this.showExamResults();
        }
    }
    
    showExamResults() {
        // Stop timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        // Calcola score
        this.score = 0;
        this.currentQuestions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            if (userAnswer && question.options) {
                const userAnswerIndex = ['A', 'B', 'C', 'D'].indexOf(userAnswer);
                if (userAnswerIndex >= 0 && question.options[userAnswerIndex] && question.options[userAnswerIndex].correct) {
                    this.score++;
                }
            }
        });
        
        const percentage = Math.round((this.score / this.currentQuestions.length) * 100);
        
        // Mostra risultati
        document.getElementById('exam-interface').style.display = 'none';
        document.getElementById('exam-results').style.display = 'block';
        
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('totalScore').textContent = this.currentQuestions.length;
        document.getElementById('percentage').textContent = percentage;
        
        // Messaggio risultato
        let message = '';
        const examTime = this.examStartTime ? Math.floor((new Date() - this.examStartTime) / 60000) : 0;
        if (percentage >= 60) {
            message = `🎉 ESAME SUPERATO! Complimenti, hai risposto correttamente al ${percentage}% delle domande in ${examTime} minuti.`;
        } else {
            message = `❌ Esame non superato. Hai bisogno di almeno il 60% per passare. Continua a studiare!`;
        }
        
        document.getElementById('resultMessage').textContent = message;
        
        console.log(`Esame completato: ${this.score}/${this.currentQuestions.length} (${percentage}%)`);
    }
}

// Inizializza app quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, inizializzazione Quiz App Triple Mode...');
    
    // Verifica dipendenze
    if (typeof quiz_data_base === 'undefined') {
        console.error('quiz_data_base non trovato - assicurati che quiz_data.js sia caricato');
        alert('Errore: dati quiz non trovati');
        return;
    }
    
    if (typeof exam_schema === 'undefined') {
        console.error('exam_schema non trovato');
        alert('Errore: schema esame non trovato');
        return;
    }
    
    // Inizializza app
    window.quizApp = new QuizAppTripleMode();
    console.log('Quiz App Triple Mode inizializzata con successo');
});

console.log('Quiz App Triple Mode script caricato');
