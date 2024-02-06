/**
How to speak Native American, Sort Of: A Light-Hearted Lexicon
Taylor McArthur

Native American slang tool
*/

"use strict";
// Array of slang words and definitions, usage and usage
const slangWords = [
    {
        word: "howah",
        usage: "a versatile word used in various contexts such as awe, encouragement, or surprise. for example, 'howah, you's guys should go down to betty's house, she's selling frybread for a dollar, I think that's really crazy.'"
    },
    {
        word: "den",
        usage: "similar to 'then', used mostly at the end of a sentence. 'well, if we can't get any nuggets, what do you guys have den?'"
    },
    {
        word: "the rez",
        usage: "this phrase refers to a native american reservation."
    },
    {
        word: "rezzy",
        usage: "used to describe something that is defective, or just plain broke. 'not only is jimmy's payment car a get, it's also rezzy.'"
    },
    {
        word: "snagging",
        usage: "The action of riding around in your rez bomb looking for a new old lady/man, because the other one left you."
    },

    {
        word: "bepsi",
        usage: "'pepsi.'cuzzin, pass me a bepsi."
    },

    {
        word: "skoden",
        usage: "'cuzzin 1: skoden, cha.' 'cuzzin 2: eee calm down, I was just joking.'"
    },

    {
        word: "supden",
        usage: "short for 'whats up then'. 'supden, let's skoden."
    },

    {
        word: "stoodis!",
        usage: "let's do this."
    },

    {
        word: "uncle",
        usage: 'may or may not be an immediate family member.'
    },

    {
        word: "zif",
        usage: "as if. 'nevermind den, i'll try harder next time.' 'zif.'"
    },

    {
        word: "deadly",
        usage: "excellent"
    },

    {
        word: "errrr",
        usage: "gross"
    },

    {
        word: "eversick",
        usage: "attitude or expression. 'eversick, don't say that.'"
    },
];

let currentWordIndex = -1;
const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec('en-US', handleSpeechInput);
speechRecognizer.continuous = false; // to stop after each recognition

function preload() {

}


//Setup
function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont('Arial');
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(255);

    speechSynthesizer.setRate(0.9); // slow down speech a bit
}


//Draw()
function draw() {
    background(0);

    if (currentWordIndex >= 0) {
        text(slangWords[currentWordIndex].word, width / 2, height / 2);
    }

    else {
        text('click anywhere to start', width / 2, height / 2);
    }
}

function mousePressed() {
    if (currentWordIndex < 0 || !speechRecognizer.listening) {
        currentWordIndex = floor(random(slangWords.length)); // Get a random index
        let word = slangWords[currentWordIndex].word;
        speechSynthesizer.speak(`repeat after me: ${word}`);
        speechRecognizer.start(); // Start listening for the user to repeat the word
    }
}

function handleSpeechInput() {
    if (speechRecognizer.resultValue) {
        let userSaid = speechRecognizer.resultString.toLowerCase(); // Convert recognized speech to lowercase
        // Assuming you want to check if the spoken word matches the current slang word directly
        let currentWord = slangWords[currentWordIndex].word.toLowerCase(); // Also convert the expected word to lowercase for comparison

        if (userSaid.includes(currentWord)) {
            // If the user correctly repeats the word, speak out its usage
            speechSynthesizer.speak(slangWords[currentWordIndex].usage);
        } else {
            // If the user's response doesn't match, prompt them to try again
            speechSynthesizer.speak("try again, or click for a new word.");
        }
        currentWordIndex = -1; // Reset the index to allow for a new word to be selected on the next click
    }
}