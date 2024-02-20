/**
How to speak Native American, Sort Of: A Light-Hearted Lexicon
Taylor McArthur

Native American slang tool
*/

"use strict";

// Array of slang words and definitions, usage and recognized pronounciation
// - word: the slang word
// - usage: how the word is pronounced phonetically 
// - recognizedAs: optional array of recognized pronounciations
// - def: the definition or usage example of the slang word being used

const slangWords = [
    //Works
    {
        word: "howah",
        usage: "Ho Wah",
        recognizedAs: ["Ho-Wah", "howah", "hoh wah", "wah", "ho", "wah"],
        def: "a versatile word used in various contexts such as awe, encouragement, or surprise. for example, 'ho-wah, you's guys should go down to betty's house, she's selling fry-bread for a dollar, I think that's really crazy.'"
    },

    //Works
    {
        word: "den",
        usage: "den",
        recognizedAs: ["den", "dɛn"],
        def: "similar to 'then', used mostly at the end of a sentence. 'well, if we can't get any nuggets, what do you guys have den?'"
    },

    //Works
    {
        word: "the rez",
        usage: "the rez",
        recognizedAs: ["the rez", "the", "rez"],
        def: "this phrase refers to a native american reservation."
    },

    //Doesn't work enough to my liking so leaving commented out 
    // {
    //     word: "rezzy",
    //     usage: "rezzy", 
    //     def: "used to describe something that is defective, or just plain broke. 'not only is jimmy's payment car a get, it's also rezzy.'"
    // },

    //Works
    {
        word: "snagging",
        usage: "snagging",
        recognizedAs: ["snagging"],
        def: "The action of riding around in your rez bomb looking for a new old lady/man, because the other one left you."
    },

    // Works
    {
        word: "bepsi",
        usage: "bêbsi",
        recognizedAs: ["bêbsi", "pepsi"],
        def: "'a variation of pepsi. 'cuzzin, pass me a bepsi?"
    },

    //Works
    {
        word: "skoden",
        usage: "skoadɛn",
        recognizedAs: ["skoadɛn", "sk-oh-den", "sko", "den"],
        def: "'cuzzin 1: skoden!' 'cuzzin 2: eee calm down, I was just joking!'"
    },

    //Works, AGRESSIVLEY 
    {
        word: "sup den",
        usage: "suhp-dɛn",
        recognizedAs: ["suhp dɛn", "sup", "dɛn", "den", "supden"],
        def: "short for 'whats up then'. 'supden, let's skoden."
    },


    // Doesn't work...yet
    // {
    //     word: "stoodis",
    //     usage: "stoodis",
    //     def: "short for 'let's do this.' 'stoodis, mom is waiting!'"
    // },

    //Works
    {
        word: "uncle",
        usage: "uncle",
        recognizedAs: ["uncle"],
        def: "may or may not be an immediate family member."
    },

    //Doesn't work..for now
    // {
    //     word: "zif",
    //     usage: "zif",
    //     def: "as if. 'nevermind den, i'll try harder next time.' 'zif!'"
    // },

    //Works
    {
        word: "deadly",
        usage: "deadly",
        recognizedAs: ["deadly"],
        def: "used as an expression of 'excellent'. ever deadly cousin! where did you find bepsi?"
    },

    //Doesn't work
    // {
    //     word: "errr",
    //     usage: "kerr",
    //     recognizedAs: ["kerr", "ər", "ar", "ur", "her", "word", "fur", "wərd"],
    //     def: "plains cree, to reveal someone's disgust. mostly used in response to a question or idea. Your ex is on the phone, do you wanna talk to them? 'err' no!"
    // },

    {
        word: "ever-sick",
        usage: "ever-sick",
        recognizedAs: ["ever-sick"],
        def: "attitude or expression. 'ever-sick, don't say that.'"
    },
];


//Global Variables
let currentWordIndex = -1; // current word being displayed
let displayDef = false; //control to see the display of the definiton 
let padding = 50;

const speechSynthesizer = new p5.Speech(); //initalize speech syth
const speechRecognizer = new p5.SpeechRec('en-US', handleSpeechInput); // initalize speech recognizer
speechRecognizer.continuous = false; // to stop after each recognition 
function preload() {

}

//Setup
function setup() {
    createCanvas(windowWidth, windowHeight); // create canvas full size
    textFont('Arial'); // text to Arial
    textSize(24); // text size
    textAlign(CENTER, CENTER); // text align
    fill(255); // ste color to white
    speechSynthesizer.setRate(0.8); // slow down speech a bit
}

//Draw
function draw() {
    background(0); // black background

    // If displayDef is true, display the definition text
    if (displayDef) {
        text(slangWords[currentWordIndex].def, padding, height / 2, width - 2 * padding); // center text
    }

    // If currentWordIndex is valid, display the word text
    else if (currentWordIndex >= 0) {
        text(slangWords[currentWordIndex].word, width / 2, height / 2); // center text
    }

    // If currentWordIndex is invalid, display a message to click anywhere to start
    else {
        text('click anywhere to start', width / 2, height / 2); // center text
    }
}

// Function to display text
function displayDefinition(def) {
    displayDef = true; // set to true to show the definition
}

// Function handle speech input
function handleSpeechInput() {
    // Check if speech recognition result is ready
    if (speechRecognizer.resultValue) {
        let userSaid = speechRecognizer.resultString.toLowerCase(); // get speech and convert to lowercase
        let isCorrect = false; // start variable to track if users reponse matches 

        // Check if 'recognizedAs' field exists and is an array, had help here from CLAB to check Slang words array
        if (slangWords[currentWordIndex].recognizedAs && Array.isArray(slangWords[currentWordIndex].recognizedAs)) {
            // Go over 'recognizedAs' to find a match
            isCorrect = slangWords[currentWordIndex].recognizedAs.some(possibleWord =>
                userSaid.includes(possibleWord.toLowerCase())
            ); // get speech and convert to lowercase
        }

        else {
            // Fallback to using 'usage' if 'recognizedAs' is not available
            let expectedUsage = slangWords[currentWordIndex].usage.toLowerCase(); // get expected usage and convert to lowercase 
            isCorrect = userSaid.includes(expectedUsage); // check if recognized speech is a match
        }

        // If the user is correct, read out the definition
        if (isCorrect) {
            let def = slangWords[currentWordIndex].def; // get definition of word
            speechSynthesizer.speak(def); // speak definition
            displayDef = true; // Set to true to show the display of the definition
        }

        // If the users response is incorrect, prompt to try again
        else {
            speechSynthesizer.speak("try again."); // speak try again 
        }
    }

}

function mousePressed() {
    displayDef = false; // display to false to hide definiton of the text 

    // Check if currentWordIndex is invalid or speechRecognizer is not listening 
    if (currentWordIndex < 0 || !speechRecognizer.listening) {
        currentWordIndex = floor(random(slangWords.length)); // Get a random index
        let usage = slangWords[currentWordIndex].usage; // Get usage of the word
        // let def = slangWords[currentWordIndex].def; // working one
        speechSynthesizer.speak(`repeat after me: ${usage}`); // string from array 'word'

        // Start speech recognition after a delay of 300 milliseconds
        setTimeout(() => {
            speechRecognizer.start(); // start speech recognition
        }, 3000);
    }
}



