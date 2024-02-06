/**
Voices of ancestral Future
Taylor McArthur 

Prototype exploring indigenous futurisims through interactive storytellin and AI
Using p5.js for visuals and interaction, p5.speech for voice recognition 
*/

"use strict";
// Array of indig futurist narratives/prompts
const narratives = [
    "Imagine a future where technology harmonizes with nature.",
    "Envision a society where inherent wisdom guides technological advancement.",
    "Reflect on the role of community in the sustainable future of tomorrow."
];

let currentNarrative = ``;
let userResponse = ``;


const speechSynthesizer = new p5.Speech(); // synthesis
const speechRecognizer = new p5.SpeechRec(); //recognition


/**
Description of preload
*/
function preload() {


}


/**
Description of setup
*/
function setup() {
    // adjust later 
    createCanvas(windowWidth, windowHeight);

    //start the speechRec settings
    speechRecognizer.continuous = true; //keep listening 
    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start(); // start listening

    //finding different voices, debugging
    speechSynthesizer.listVoices()

    //configure speech synth for voice, rate etc,
    configureSpeechSynthesizer();

    //narrative prompt
    generateNarrative();
}


/**
Description of draw()
*/
function draw() {
    background(0);

    //Display the current narrative or users response
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(currentNarrative, width / 2, height / 3);
    text(userResponse, width / 2, 2 * height / 3);
}

function mousePressed() {
    // Generate and speak on mouse press
    generateNarrative();

}

function configureSpeechSynthesizer() {
    //language of the syth 
    speechSynthesizer.setLang('en-US');

    speechSynthesizer.setVoice('Google Deutsch');

    speechSynthesizer.setRate(0.95) // slowing it down a bit 

    //Pitch and volume
    speechSynthesizer.setPitch(1.0); //standard pitch
    speechSynthesizer.setVolume(1.0) // Maximum volume


}

function generateNarrative() {
    currentNarrative = random(narratives); // selects a random narrative
    speechSynthesizer.speak(currentNarrative); // speaks the narrative 
}

function handleSpeechInput() {
    if (speechRecognizer.resultValue) {
        userResponse = speechRecognizer.resultString; // Captures the user response 
    }
}

