# 🚢 Quiz Nautica - Dual Mode App

Progressive Web App per i quiz della patente nautica con **modalità dual-mode**: Quiz Base (A/B/C) e Quiz Vela (Vero/Falso).

## 🌐 App Live
**[Apri l'app →](https://mvodret.github.io/quiz-nautica/)**

## 🎯 Modalità Disponibili

- **📋 Quiz Base**: 1472 domande formato A/B/C (Patente Nautica Classica)
- **⛵ Quiz Vela**: 250 domande formato Vero/Falso (Estensione Vela)
- **🔄 Switch dinamico** tra modalità senza ricaricare la pagina

## 📁 Struttura del Progetto

```
app_nautica/
├── quiz_app_web.ipynb          # 🏭 GENERATORE DUAL-MODE PRINCIPALE
├── database/
│   ├── filtered_quiz_base.csv  # 📊 Dataset Quiz Base (1472)
│   ├── filtered_quiz_vela.csv  # ⛵ Dataset Quiz Vela (250)
│   └── immagini_quiz_base/      # �️ Immagini quiz (103)
├── quiz_nautica_app/           # 🔧 Build locale dual-mode
└── quiz-nautica-github/        # 🌐 Deploy online (sincronizzato)
```

## 🎯 Come Funziona la Dual Mode

### Interfaccia di Selezione
1. **Apertura app** → Schermata di selezione modalità
2. **Quiz Base** → 1472 domande formato A/B/C
3. **Quiz Vela** → 250 domande formato Vero/Falso
4. **Switch dinamico** → Cambio modalità senza ricaricare

### Layout Specifici
- **Quiz Base**: Layout classico a 3 opzioni (A/B/C)
- **Quiz Vela**: Layout orizzontale a 2 opzioni (VERO/FALSO)
- **Colori differenziati**: Verde per VERO, rosso per FALSO
- **Icone distintive**: 🚢 per Base, ⛵ per Vela

### Ricerca Separata
- Ogni modalità ha il **proprio dataset di ricerca**
- **Statistiche specifiche** per modalità
- **Risultati filtrati** solo nella modalità attiva

## 🔄 Workflow di Sviluppo

### 1. **Modificare l'App**
- Apri `quiz_app_web.ipynb`
- Modifica le celle secondo necessità
- Esegui le celle per rigenerare l'app

### 2. **Test Locale**
- Esegui la cella del server locale
- L'app si apre su `http://localhost:8000`
- Testa le modifiche

### 3. **Deploy Online**
```bash
# Copia i file aggiornati
cp quiz_nautica_app/*.html quiz_nautica_app/*.js quiz_nautica_app/*.css quiz_nautica_app/*.json quiz-nautica-github/

# Vai nella cartella GitHub
cd quiz-nautica-github

# Controlla modifiche
git status

# Commit e push
git add .
git commit -m "🚀 Descrizione modifiche"
git push origin main
```

### 4. **Verifica Online**
- L'app è disponibile su: https://mvodret.github.io/quiz-nautica/
- Aggiornamento automatico entro 1-2 minuti

## 📱 Caratteristiche

- ✅ **1722 quiz totali** - 1472 Base + 250 Vela
- 🎯 **Dual Mode** - Selezione modalità con interfaccia dedicata
- 📋 **Quiz Base** - Formato A/B/C classico per patente nautica
- ⛵ **Quiz Vela** - Formato Vero/Falso per estensione vela
- 🖼️ **118 quiz con immagini** integrate (mostrate tra domanda e risposte)
- 🔍 **Ricerca per modalità** - Ricerca separata per Base e Vela
- 🎨 **Layout ottimizzato** - Interfaccia specifica per Vero/Falso
- 📱 **Mobile-friendly** - Responsive design per entrambe le modalità
- 🚀 **PWA** - Installabile come app nativa
- ⚡ **Veloce** - Funziona offline dopo il primo caricamento

## 🧩 File Generati dal Notebook

| File | Descrizione |
|------|-------------|
| `index.html` | Struttura dual-mode con selezione modalità |
| `app.js` | Logica JavaScript dual-mode e ricerca separata |
| `styles.css` | Stili responsive per Base e Vela |
| `manifest.json` | Configurazione PWA |
| `quiz_data.js` | Dataset separati: BASE + VELA con immagini base64 |

## 🚧 Prossimi Miglioramenti

- [x] **Quiz Vela integrati** - ✅ Completato! 250 domande Vero/Falso
- [x] **Dual Mode Interface** - ✅ Selezione modalità implementata
- [x] **Layout Vero/Falso** - ✅ Interfaccia ottimizzata per quiz vela
- [ ] Aggiungere più immagini per quiz vela (attualmente solo 2)
- [ ] Controllare e correggere l'allineamento delle immagini
- [ ] Aggiungere lazy loading per le immagini
- [ ] Filtri avanzati per argomenti specifici
- [ ] Statistiche separate per modalità Base/Vela

## 🛠️ Comandi Utili

```bash
# Test locale rapido
cd quiz_nautica_app && python -m http.server 8000

# Sync completo con GitHub
cp quiz_nautica_app/* quiz-nautica-github/ && cd quiz-nautica-github && git add . && git commit -m "Update" && git push

# Pulizia file temporanei
find . -name ".DS_Store" -delete
```

## 📁 Struttura del Progetto

```
app_nautica/
├── README.md                          # Questo file
├── database/                          # Dati del quiz
│   ├── quiz-base.docx                # Documento originale
│   ├── quiz-base.pdf                 # Versione PDF
│   ├── quiz-base.xlsx                # Versione Excel
│   ├── extracted_questions.csv       # Domande estratte
│   ├── filtered_quiz_base.csv        # Domande filtrate
│   ├── quiz_with_correct_images.csv  # Quiz con immagini corrette
│   ├── quiz_with_empirical_images.csv # Quiz con immagini empiriche
│   ├── quiz_with_images_info.csv     # Informazioni immagini
│   ├── immagini_quiz_base/           # Immagini organizzate
│   │   ├── IMG1.jpeg                 # Immagine 1
│   │   ├── IMG2.jpeg                 # Immagine 2
│   │   ├── ...                       # ...
│   │   └── IMG103.jpeg               # Immagine 103
│   ├── immagini_quiz_base_info.csv   # Metadati immagini
│   └── quiz-nautica-carteggio/       # Altri documenti quiz
├── extracted_images/                  # Immagini estratte (legacy)
├── quiz_nautica_app/                 # Applicazione web principale
├── quiz-nautica-github/              # Versione GitHub Pages
├── open_word.ipynb                   # Notebook analisi documenti
├── first_sketch.ipynb               # Prime prove
├── quiz_app_web.ipynb               # Sviluppo app web
└── raw->filtered_data.ipynb         # Elaborazione dati
```

## 🔧 Lavoro Completato

### 1. 📄 Estrazione e Analisi Documenti
- **Analizzato documento `quiz-base.docx`** contenente le domande e immagini
- **Estratte 103 immagini** dal documento Word usando `python-docx` e `zipfile`
- **Identificate relazioni** tra immagini e contenuto tramite XML parsing
- **Analizzato contenuto testuale** per riferimenti alle immagini

### 2. 🖼️ Gestione Immagini
- **Convertite tutte le immagini PNG in JPEG** per uniformità di formato
- **Rinominate sequenzialmente** da `IMG1.jpeg` a `IMG103.jpeg`
- **Organizzate nella cartella** `database/immagini_quiz_base/`
- **Creato DataFrame pandas** con metadati completi delle immagini:
  - Dimensioni (larghezza × altezza in pixel)
  - Peso file (KB)
  - Aspect ratio
  - Modalità colore
  - Categorizzazione per dimensione (piccola/media/grande)

### 3. 📊 Analisi e Catalogazione
- **DataFrame dettagliato** con 103 righe × 15 colonne di metadati
- **Statistiche complete**:
  - Dimensioni file: 1.7 - 22.9 KB (media: 5.8 KB)
  - Risoluzione: 13×39 px fino a 454×437 px
  - Formato uniforme: 100% JPEG
- **Distribuzione per categoria**:
  - Media: 79 immagini
  - Piccola: 15 immagini  
  - Grande: 9 immagini
- **Salvato in CSV** per integrazione con l'applicazione

### 4. 🔍 Controllo Qualità
- **Verifica numerazione sequenziale** completa 1-103
- **Validazione integrità file** e corrispondenza DataFrame
- **Controllo formati** e standardizzazione nomi
- **Eliminazione duplicati** e conflitti di nomenclatura

### 5. 💻 Applicazioni Web
- **Quiz Nautica App** (`quiz_nautica_app/`): Versione principale locale
- **GitHub Pages** (`quiz-nautica-github/`): Versione online pubblica
- **Interfacce moderne** con HTML5, CSS3, JavaScript

## 📈 Statistiche del Dataset

### Quiz Totali
- **Quiz Base**: 1472 domande (A/B/C)
- **Quiz Vela**: 250 domande (Vero/Falso)
- **Totale generale**: 1722 quiz
- **Con immagini**: 118 quiz Base + 2 quiz Vela = 120 quiz

### Immagini
- **Totale**: 103 immagini
- **Formato**: JPEG uniforme
- **Dimensione totale**: ~589 KB (0.58 MB)
- **Dimensione media**: 5.7 KB per immagine
- **Nomenclatura**: Sequenziale IMG1.jpeg → IMG103.jpeg

### Dimensioni più Comuni
1. **324×166 px**: 8 immagini
2. **312×181 px**: 6 immagini  
3. **333×166 px**: 5 immagini
4. **305×175 px**: 4 immagini
5. **281×211 px**: 3 immagini

### Aspect Ratio più Frequenti
1. **1.95**: 8 immagini (formato panoramico)
2. **1.72**: 6 immagini
3. **2.0**: 5 immagini
4. **1.74**: 4 immagini

## 🛠️ Tecnologie Utilizzate

### Python & Data Science
- **pandas**: Manipolazione e analisi dati
- **python-docx**: Estrazione da documenti Word
- **PIL/Pillow**: Elaborazione immagini
- **zipfile**: Estrazione file da archivi
- **matplotlib**: Visualizzazioni (preparato per future analisi)

### Web Development
- **HTML5**: Struttura applicazione
- **CSS3**: Styling e responsive design
- **JavaScript**: Logica applicazione e interattività
- **JSON**: Formato dati per il frontend

### Hosting & Deployment
- **GitHub Pages**: Hosting gratuito e affidabile
- **Custom Domain**: Configurabile se necessario
- **SSL/HTTPS**: Certificato automatico GitHub
- **CDN Global**: Distribuzione mondiale veloce
- **Auto-Deploy**: Aggiornamenti automatici da push Git

### Tools & Environment
- **Jupyter Notebook**: Sviluppo e prototipazione
- **VS Code**: IDE principale
- **Git**: Controllo versione
- **GitHub Pages**: Hosting

## 📂 File di Output Principali

### CSV Dataset
- `database/immagini_quiz_base_info.csv`: Metadati completi delle 103 immagini
- `database/extracted_questions.csv`: Domande estratte dal documento
- `database/filtered_quiz_base.csv`: Domande elaborate e filtrate

### Immagini Organizzate
- `database/immagini_quiz_base/IMG[1-103].jpeg`: Immagini numerate sequenzialmente

### Applicazioni
- `quiz_nautica_app/`: App principale con tutti i file necessari
- `quiz-nautica-github/`: Versione ottimizzata per GitHub Pages

### Repository & Hosting
- **Repository principale**: `mvodret.github.io` (branch: main)
- **URL live**: https://mvodret.github.io/quiz-nautica-github/
- **Backup locale**: `quiz_nautica_app/` per sviluppo e test

## 🎮 Funzionalità Applicazione Attuale

### Quiz Engine
- **Caricamento domande** da file JSON
- **Visualizzazione immagini** associate
- **Sistema di punteggio** e feedback
- **Navigazione** tra domande
- **Interfaccia responsive** per tutti i dispositivi

### Caratteristiche UI/UX
- **Design moderno** e intuitivo
- **Compatibilità mobile** e desktop
- **Feedback visivo** per risposte corrette/errate
- **Progressione** attraverso il quiz

## 🚀 Prossimi Step Pianificati

### 1. 🔗 Collegamento Immagini-Domande
- **Mappatura esatta** tra domande e immagini corrispondenti
- **Verifica manuale** di tutti i collegamenti
- **Creazione database relazionale** domanda ↔ immagine
- **Aggiornamento JSON** con riferimenti immagini

### 2. ✅ Controllo Qualità Domande
- **Identificazione domande** con risposte multiple valide
- **Revisione logica** delle risposte corrette
- **Standardizzazione formato** domande
- **Verifica coerenza** contenuti nautici

### 3. 📱 Miglioramenti Applicazione
- **Integrazione completa** immagini nelle domande
- **Modalità studio** vs **modalità esame**
- **Sistema di salvataggio** progressi
- **Statistiche dettagliate** performance utente

### 4. 🎨 UI/UX Enhancements
- **Tema scuro/chiaro**
- **Zoom immagini** per dettagli carteggio
- **Filtri per argomento** (vela, motore, carteggio)
- **Esportazione risultati**

### 5. 🔧 Ottimizzazioni Tecniche
- **Lazy loading** immagini
- **Caching intelligente**
- **Compressione** ulteriore immagini
- **PWA** (Progressive Web App) per uso offline

## 📊 Metriche di Successo

### Completamento Dati
- ✅ **100%** immagini estratte e organizzate (103/103)
- ✅ **100%** conversione formato uniforme (JPEG)
- ✅ **100%** numerazione sequenziale verificata
- 🔄 **0%** collegamento domande-immagini (prossimo step)

### Qualità Dataset
- ✅ **Nomenclatura standardizzata**
- ✅ **Metadati completi** per tutte le immagini
- ✅ **Integrità verificata** file e database
- 🔄 **Validazione contenuti** domande (in corso)

## 🤝 Contribuzione

Il progetto è strutturato per facilitare:
- **Aggiornamenti contenuti** (nuove domande/immagini)
- **Miglioramenti UI/UX**
- **Ottimizzazioni performance**
- **Estensioni funzionalità**

## 📝 Note Tecniche

### Gestione Immagini
```python
# Esempio utilizzo nel codice
for i in range(1, 104):
    img_path = f"database/immagini_quiz_base/IMG{i}.jpeg"
    # Carica immagine i-esima
```

### Accesso Metadati
```python
import pandas as pd
df_images = pd.read_csv('database/immagini_quiz_base_info.csv')
# DataFrame con tutte le informazioni delle immagini
```

### Integrazione Frontend
```javascript
// Caricamento dinamico immagini nel quiz
const loadQuestionImage = (questionNumber) => {
    const imgPath = `database/immagini_quiz_base/IMG${questionNumber}.jpeg`;
    return imgPath;
};
```

## 📞 Status e Contatti

**Stato progetto**: � Dual-Mode Completato!  
**Completamento fase 1**: ✅ 100% (Estrazione e organizzazione dati)  
**Completamento fase 2**: ✅ 100% (App dual-mode Quiz Base + Vela)  
**Fase corrente**: 🎯 Miglioramenti UI/UX e ottimizzazioni  
**Prossima milestone**: Lazy loading immagini e filtri avanzati  

### 🎉 Milestone Completate
- ✅ **Dual Mode Interface** - Selezione tra Base e Vela
- ✅ **Quiz Base** - 1472 domande A/B/C integrate
- ✅ **Quiz Vela** - 250 domande Vero/Falso integrate
- ✅ **Layout Responsive** - Ottimizzato per entrambe le modalità
- ✅ **PWA Ready** - Installabile su tutti i dispositivi

---

**Ultimo aggiornamento**: 23 Ottobre 2025  
**Versione**: 2.0.0-dual-mode  
**Licenza**: MIT