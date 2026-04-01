/**
 * PROJECT: Easy Reader Pro
 * FILE: script.js
 * DESCRIPTION: Logic for view switching, accordions, text-to-speech, and accessibility.
 */

// --- 1. VIEW SWITCHING LOGIC ---
// Switches between the Home Page and the Reader Web Page
function switchView(viewId) {
    const home = document.getElementById('home-view');
    const reader = document.getElementById('reader-view');
    
    if (home && reader) {
        home.style.display = 'none';
        reader.style.display = 'none';
        document.getElementById(viewId).style.display = 'flex';
    }
}

// --- 2. SIDEBAR ACCORDION LOGIC ---
// Makes the control sections expand and collapse when clicked
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        // Check if panel is currently visible; toggle accordingly
        if (panel.style.display === "flex") {
            panel.style.display = "none";
        } else {
            panel.style.display = "flex";
        }
    });
}

// --- 3. TEXT & FONT CONTROLS ---
const box = document.getElementById('text-square');

/**
 * Function: applyFont
 * Applies the specific dyslexia-friendly fonts.
 * Note: 'OpenDyslexic' requires the @font-face rule in your style.css
 */
function applyFont(fontFamily) {
    if (!box) return;
    
    if (fontFamily === 'OpenDyslexic') {
        // We add 'sans-serif' as a backup in case the file is missing
        box.style.fontFamily = "'OpenDyslexic', sans-serif";
    } else if (fontFamily === 'Comic Sans MS') {
        box.style.fontFamily = "'Comic Sans MS', 'Comic Sans', cursive";
    } else {
        box.style.fontFamily = "Arial, sans-serif";
    }
    console.log("Font changed to: " + fontFamily);
}

// Adjusts the font size using the slider value
function adjustSize() {
    const slider = document.getElementById('size-slider');
    if (box && slider) {
        box.style.fontSize = slider.value + "pt";
    }
}

// Adjusts the vertical space between lines
function applyLineHeight(val) {
    if (box) box.style.lineHeight = val;
}

// Changes background and text colors for high visibility
function applyContrast(mode) {
    if (!box) return;
    
    if (mode === 'high') {
        box.style.backgroundColor = "#000000"; // Black
        box.style.color = "#FFFF00";           // Bright Yellow
    } else if (mode === 'soft') {
        box.style.backgroundColor = "#f5f5dc"; // Beige/Creme
        box.style.color = "#003366";           // Dark Blue
    } else {
        box.style.backgroundColor = "#b0bdc1"; // Original Grey-Blue
        box.style.color = "#000000";           // Black
    }
}

// --- 4. TEXT TO SPEECH (TTS) ---
let synth = window.speechSynthesis;

function speakText() {
    // If it's already speaking, stop the old one first
    if (synth.speaking) synth.cancel();
    
    const textToRead = box.innerText || box.textContent;
    if (!textToRead.trim()) {
        alert("Please paste or type some text first!");
        return;
    }

    let utterance = new SpeechSynthesisUtterance(textToRead);
    
    // Get speed from the range slider
    const speed = document.getElementById('tts-rate').value;
    utterance.rate = speed;
    
    synth.speak(utterance);
}

function stopSpeech() {
    if (synth.speaking) {
        synth.cancel();
    }
}

// --- 5. URL INPUT SIMULATION ---
// Simulates loading text from a website link
function fetchURL() {
    const urlValue = document.getElementById('url-input').value;
    if (urlValue) {
        box.innerText = "Attempting to import content from: " + urlValue + 
                        "\n\n[System Note: Content fetched. Adjust your fonts and contrast now.]";
    } else {
        alert("Please enter a valid URL first.");
    }
}