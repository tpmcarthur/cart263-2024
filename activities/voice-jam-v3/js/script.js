/**
How to speak Native American, Sort Of: A Light-Hearted Lexicon
Taylor McArthur

Native American slang tool
*/

"use strict";
// Array of slang words and definitions, usage and usage
const slangWords = [
    // {
    //     word: "howah",
    //     usage: "Ho-Wah",
    //     def: "a versatile word used in various contexts such as awe, encouragement, or surprise. for example, 'ho-wah, you's guys should go down to betty's house, she's selling fry-bread for a dollar, I think that's really crazy.'"
    // },

    // {
    //     word: "den",
    //     usage: "den",
    //     def: "similar to 'then', used mostly at the end of a sentence. 'well, if we can't get any nuggets, what do you guys have den?'"
    // },

    // {
    //     word: "the rez",
    //     usage: "the rez",
    //     def: "this phrase refers to a native american reservation."
    // },

    // {
    //     word: "rezzy",
    //     usage: "rezzy", 
    //     def: "used to describe something that is defective, or just plain broke. 'not only is jimmy's payment car a get, it's also rezzy.'"
    // },

    //Word recognized 
    // {
    //     word: "snagging",
    //     usage: "snagging",
    //     def: "The action of riding around in your rez bomb looking for a new old lady/man, because the other one left you."
    // },

    // {
    //     word: "bepsi",
    //     usage: "bepsi",
    //     def: "'pepsi.'cuzzin, pass me a bepsi?"
    // },
    //  usage: "bêbsi",

    // {
    //     word: "skoden",
    //     usage: "skoden",
    //     def: "'cuzzin 1: skoden, cha.' 'cuzzin 2: eee calm down, I was just joking.'"
    // },

    {
        word: "supden",
        usage: "supden",
        def: "short for 'whats up then'. 'supden, let's skoden."
    },

    // {
    //     word: "stoodis",
    //     usage: "stoodis",
    //     def: "short for 'let's do this.' 'stoodis, mom is waiting!'"
    // },

    //Word recognized 
    // {
    //     word: "uncle",
    //     usage: "uncle",
    //     def: "may or may not be an immediate family member."
    // },

    // {
    //     word: "zif",
    //     usage: "zif",
    //     def: "as if. 'nevermind den, i'll try harder next time.' 'zif!'"
    // },

    //Word recognized
    // {
    //     word: "deadly",
    //     usage: "deadly",
    //     def: "used as an expression of 'excellent'. ever deadly cousin! where did you find bepsi?"
    // },

    // {
    //     word: "errrr",
    //     usage: "errr"
    //     def: "plains cree, to reveal someone's disgust. mostly used in response to a question or idea. Your ex is on the phone, do you wanna talk to them? 'err' no!"
    // },

    // {
    //     word: "ever-sick",
    //     usage: "ever-sick",
    //     def: "attitude or expression. 'eversick, don't say that.'"
    // },
];


// Global Variables
let currentWordIndex = -1;
let displayDef = false; // Control to see the display of the definition
let fetchedDef = ""; // Variable to store the fetched definition

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec('en-US', handleSpeechInput);
speechRecognizer.continuous = false;

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont('Arial');
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(255);

    speechSynthesizer.setRate(0.8); // Slow down speech a bit
}

function draw() {
    background(0);
    if (displayDef) {
        text(fetchedDef, 10, 10, width - 20, height - 20); // Adjusted to display the fetched definition
    } else if (currentWordIndex >= 0) {
        text(slangWords[currentWordIndex].word, width / 2, height / 2);
    } else {
        text('Click anywhere to start', width / 2, height / 2);
    }
}

function mousePressed() {
    displayDef = false; // Reset display state
    fetchedDef = ""; // Reset fetched definition

    if (currentWordIndex < 0 || !speechRecognizer.listening) {
        currentWordIndex = floor(random(slangWords.length)); // Get a random index
        let usage = slangWords[currentWordIndex].usage;
        speechSynthesizer.speak(`repeat after me: ${usage}`); // Prompt user with usage

        setTimeout(() => {
            speechRecognizer.start(); // Start recognition after a delay
        }, 3000);
    }
}

async function handleSpeechInput() {
    if (speechRecognizer.resultValue) {
        let userSaid = speechRecognizer.resultString.toLowerCase();
        let expectedUsage = slangWords[currentWordIndex].usage.toLowerCase();

        if (userSaid.includes(expectedUsage)) {
            fetchedDef = await fetchDefinition(slangWords[currentWordIndex].word); // Fetch and store definition
            speechSynthesizer.speak(fetchedDef);
            displayDef = true; // Signal to display the fetched definition
        } else {
            speechSynthesizer.speak("try again.");
        }
    }
}

// Function to fetch a word's definition from an online dictionary API
async function fetchDefinition(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        const data = await response.json();
        return data[0].meanings[0].definitions[0].definition; // Assuming the first definition of the first meaning
    } catch (error) {
        console.error("Error fetching definition:", error);
        return "Definition not found."; // Fallback message
    }
}


