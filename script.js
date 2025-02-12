document.addEventListener('DOMContentLoaded', () => {
    // Elementi principali
    const textArea = document.getElementById('textArea');
    const counter = document.getElementById('counter');
    const menuBtn = document.getElementById('menuBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const pageTitleElem = document.getElementById('pageTitle');
    const toastElem = document.getElementById('toast');
  
    // Nuovo pulsante guida (nell'header)
    const guideBtn = document.getElementById('guideBtn');
  
    // Flag per verificare se il titolo è già stato impostato
    let titleSet = false;
  
    // Elementi del menu a comparsa
    const toggleDarkBtn = document.getElementById('toggleDark');
    const saveDraftBtn = document.getElementById('saveDraft');
    const deleteDraftBtn = document.getElementById('deleteDraft');
    const downloadTxtBtn = document.getElementById('downloadTxt');
    const openEmailPopoverBtn = document.getElementById('openEmailPopover');
  
    // Elementi dell'email popover
    const emailPopover = document.getElementById('emailPopover');
    const closeEmailPopover = document.getElementById('closeEmailPopover');
    const cancelEmailPopover = document.getElementById('cancelEmailPopover');
    const emailForm = document.getElementById('emailForm');
    const recipientInput = document.getElementById('recipient');
    const subjectInput = document.getElementById('subject');
  
    // Elementi del modal guida
    const guideModal = document.getElementById('guideModal');
    const closeGuideBtn = document.querySelector('#guideModal .close-modal');
  
    // Carica la bozza salvata (testo e titolo, se presenti)
    const savedDraft = localStorage.getItem('draft');
    if (savedDraft) {
      textArea.value = savedDraft;
    }
    const savedTitle = localStorage.getItem('pageTitle');
    if (savedTitle) {
      pageTitleElem.innerText = savedTitle;
      document.title = savedTitle;
      titleSet = true;
    } else {
      pageTitleElem.innerText = "Pagina Vuota";
      document.title = "Pagina Vuota";
    }
    updateCounts();
  
    // Funzione per aggiornare il conteggio (parole e caratteri senza spazi)
    function updateCounts() {
      const fullText = textArea.value;
      const trimmedText = fullText.trim();
      const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
      const nonSpaceChars = fullText.replace(/\s/g, '').length;
      counter.textContent = `${words} parole - ${nonSpaceChars} caratteri`;
      textArea.style.overflowY = (textArea.scrollHeight > textArea.clientHeight) ? 'auto' : 'hidden';
      localStorage.setItem('draft', textArea.value);
    }
  
    textArea.addEventListener('input', updateCounts);
  
    // Funzione per mostrare il popup toast
    function showToast(message) {
      toastElem.innerText = message;
      toastElem.classList.add('show');
      setTimeout(() => {
        toastElem.classList.remove('show');
      }, 2000);
    }
  
    // Gestione del tasto Invio nel textarea per comandi e per impostare il titolo
    textArea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const pos = textArea.selectionStart;
        const textBefore = textArea.value.substring(0, pos);
        const lineStart = textBefore.lastIndexOf('\n') + 1;
        const currentLine = textBefore.substring(lineStart).trim();
        const lowerCurrentLine = currentLine.toLowerCase();
  
        // Se la riga digitata è "dark" o "light"
        if (lowerCurrentLine === 'dark' || lowerCurrentLine === 'light') {
          e.preventDefault();
          const textAfter = textArea.value.substring(pos);
          textArea.value = textArea.value.substring(0, lineStart) + textAfter;
          textArea.selectionStart = textArea.selectionEnd = lineStart;
          updateCounts();
          if (lowerCurrentLine === 'dark') {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'true');
            toggleDarkBtn.textContent = 'Toggle Light Mode';
          } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'false');
            toggleDarkBtn.textContent = 'Toggle Dark Mode';
          }
        }
        // Se la riga digitata è "fortnite"
        else if (lowerCurrentLine === 'fortnite') {
          e.preventDefault();
          window.open('https://tommy4377.github.io/fortnite.github.io/', '_blank');
          const textAfter = textArea.value.substring(pos);
          textArea.value = textArea.value.substring(0, lineStart) + textAfter;
          textArea.selectionStart = textArea.selectionEnd = lineStart;
          updateCounts();
        }
        // Se il titolo non è ancora stato impostato e la riga non è vuota, la usa come titolo
        else if (!titleSet && currentLine !== '') {
          e.preventDefault();
          pageTitleElem.style.transition = "opacity 0.5s";
          pageTitleElem.style.opacity = "0";
          setTimeout(() => {
            pageTitleElem.innerText = currentLine;
            document.title = currentLine;
            pageTitleElem.style.opacity = "1";
            localStorage.setItem('pageTitle', currentLine);
          }, 500);
          titleSet = true;
          const textAfter = textArea.value.substring(pos);
          textArea.value = textArea.value.substring(0, lineStart) + textAfter;
          textArea.selectionStart = textArea.selectionEnd = lineStart;
          updateCounts();
        }
        // Se la riga digitata è "rickroll"
        else if (lowerCurrentLine === 'rickroll') {
          e.preventDefault();
          window.open('https://youtu.be/dQw4w9WgXcQ', '_blank');
          const textAfter = textArea.value.substring(pos);
          textArea.value = textArea.value.substring(0, lineStart) + textAfter;
          textArea.selectionStart = textArea.selectionEnd = lineStart;
          updateCounts();
        }
      }
    });
  
    // Toggle dark mode tramite pulsante del menu
    toggleDarkBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('dark-mode', isDarkMode);
      toggleDarkBtn.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });
  
    // Salva Bozza: salva testo e titolo
    saveDraftBtn.addEventListener('click', () => {
      localStorage.setItem('draft', textArea.value);
      localStorage.setItem('pageTitle', pageTitleElem.innerText);
      showToast('Bozza salvata!');
    });
  
    // Cancella Bozza: elimina testo e titolo senza conferma
    deleteDraftBtn.addEventListener('click', () => {
      localStorage.removeItem('draft');
      localStorage.removeItem('pageTitle');
      textArea.value = "";
      pageTitleElem.innerText = "Pagina Vuota";
      document.title = "Pagina Vuota";
      titleSet = false;
      updateCounts();
      showToast('Bozza cancellata!');
    });
  
    // Scarica il file con nome uguale al titolo
    downloadTxtBtn.addEventListener('click', () => {
      const title = pageTitleElem.innerText.trim() || "Pagina Vuota";
      const blob = new Blob([textArea.value], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    });
  
    // Apertura del popover email
    openEmailPopoverBtn.addEventListener('click', () => {
      emailPopover.style.display = 'block';
    });
    closeEmailPopover.addEventListener('click', () => {
      emailPopover.style.display = 'none';
    });
    cancelEmailPopover.addEventListener('click', () => {
      emailPopover.style.display = 'none';
    });
  
    // Invio email: creazione dinamica di un <a> per miglior compatibilità
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const recipient = recipientInput.value;
      const subject = encodeURIComponent(subjectInput.value);
      const body = encodeURIComponent(textArea.value);
      const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
      const a = document.createElement('a');
      a.href = mailtoLink;
      a.target = '_blank';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      emailPopover.style.display = 'none';
    });
  
    // Apertura del modal guida tramite il pulsante guida
    guideBtn.addEventListener('click', () => {
      guideModal.classList.add('show');
      dropdownMenu.classList.remove('active');
    });
    // Chiusura del modal guida tramite il pulsante "X"
    closeGuideBtn.addEventListener('click', () => {
      guideModal.classList.remove('show');
    });
    // Chiusura del modal se si clicca fuori dal contenuto
    window.addEventListener('click', (e) => {
      if (e.target === guideModal) {
        guideModal.classList.remove('show');
      }
      if (!dropdownMenu.contains(e.target) && !menuBtn.contains(e.target) && !guideBtn.contains(e.target)) {
        dropdownMenu.classList.remove('active');
      }
    });
  
    // Apertura/chiusura del menu a comparsa
    menuBtn.addEventListener('click', () => {
      dropdownMenu.classList.toggle('active');
    });
});
