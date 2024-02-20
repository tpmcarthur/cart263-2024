/**
How to speak Native American, Sort Of: A Light-Hearted Lexicon
Taylor McArthur

Native American slang tool
*/

"use strict";
// Array of slang words and definitions, usage and usage
const slangWords = [
    // Works
    // {
    //     word: "howah",
    //     usage: "Ho Wah",
    //     recognizedAs: ["Ho-Wah", "howah", "hoh wah", "wah", "ho", "wah"],
    //     def: "a versatile word used in various contexts such as awe, encouragement, or surprise. for example, 'ho-wah, you's guys should go down to betty's house, she's selling fry-bread for a dollar, I think that's really crazy.'"
    // },

    //Works
    // {
    //     word: "den",
    //     usage: "den",
    //     recognizedAs: ["den", "dɛn"],
    //     def: "similar to 'then', used mostly at the end of a sentence. 'well, if we can't get any nuggets, what do you guys have den?'"
    // },

    //Works
    // {
    //     word: "the rez",
    //     usage: "the rez",
    //     recognizedAs: ["the rez", "the", "rez"],
    //     def: "this phrase refers to a native american reservation."
    // },

    // {
    //     word: "rezzy",
    //     usage: "rezzy", 
    //     def: "used to describe something that is defective, or just plain broke. 'not only is jimmy's payment car a get, it's also rezzy.'"
    // },

    //Works
    // {
    //     word: "snagging",
    //     usage: "snagging",
    //     def: "The action of riding around in your rez bomb looking for a new old lady/man, because the other one left you."
    // },

    // Works
    // {
    //     word: "bepsi",
    //     usage: "bêbsi",
    //     recognizedAs: ["bêbsi", "pepsi"],
    //     def: "'a variation of pepsi. 'cuzzin, pass me a bepsi?"
    // },

    //Works
    // {
    //     word: "skoden",
    //     usage: "skoadɛn",
    //     recognizedAs: ["skoadɛn", "sk-oh-den", "sko", "den"],
    //     def: "'cuzzin 1: skoden!' 'cuzzin 2: eee calm down, I was just joking!'"
    // },

    //Works, AGRESSIVLEY 
    // {
    //     word: "supden",
    //     usage: "suh-pdɛn",
    //     recognizedAs: ["suhp dɛn", "sup", "dɛn", "den", "supden"],
    //     def: "short for 'whats up then'. 'supden, let's skoden."
    // },

    // {
    //     word: "stoodis",
    //     usage: "stoodis",
    //     def: "short for 'let's do this.' 'stoodis, mom is waiting!'"
    // },

    //Works
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

    //Works
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


//Global Variables
let currentWordIndex = -1;
let displayDef = false; //control to see the display of the definiton 

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec('en-US', handleSpeechInput);
speechRecognizer.continuous = false; // to stop after each recognition ** is this why it keeps not working??

function preload() {

}

//Setup
function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont('Arial');
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(255);
    speechSynthesizer.setRate(0.8); // slow down speech a bit
}

//Draw()
function draw() {
    background(0);
    if (displayDef) {
        text(slangWords[currentWordIndex].def, width / 2, height / 2);
    }

    else if (currentWordIndex >= 0) {
        text(slangWords[currentWordIndex].word, width / 2, height / 2);
    }

    else {
        text('click anywhere to start', width / 2, height / 2);
    }
}

function displayDefinition(def) {
    displayDef = true;
}

//test function
function handleSpeechInput() {
    if (speechRecognizer.resultValue) {
        let userSaid = speechRecognizer.resultString.toLowerCase();
        let isCorrect = false;

        // Check if 'recognizedAs' field exists and is an array
        if (slangWords[currentWordIndex].recognizedAs && Array.isArray(slangWords[currentWordIndex].recognizedAs)) {
            // Iterate over 'recognizedAs' to find a match
            isCorrect = slangWords[currentWordIndex].recognizedAs.some(possibleWord =>
                userSaid.includes(possibleWord.toLowerCase())
            );
        }

        else {
            // Fallback to using 'usage' if 'recognizedAs' is not available
            let expectedUsage = slangWords[currentWordIndex].usage.toLowerCase();
            isCorrect = userSaid.includes(expectedUsage);
        }

        if (isCorrect) {
            let def = slangWords[currentWordIndex].def;
            speechSynthesizer.speak(def);
            displayDef = true; // Set to true to signal the display of the definition
        }

        else {
            speechSynthesizer.speak("try again.");
        }
    }

}

// function handleSpeechInput() {
//     if (speechRecognizer.resultValue) {
//         let userSaid = speechRecognizer.resultString.toLowerCase(); // convert recognized speech to lower case 
//         // let expectedUsage = slangWords[currentWordIndex].usage.toLowerCase(); // working one 

//         let expectedUsage = slangWords[currentWordIndex].usage.map(usage => usage.toLowerCase());

//         const isMatch = expectedUsages.some(expectedUsage => userSaid.includes(expectedUsage));


//         //
//         if (userSaid.includes(expectedUsage)) {
//             let def = slangWords[currentWordIndex].def;
//             speechSynthesizer.speak(def);
//             displayDefinition(def);
//         }

//         else {
//             speechSynthesizer.speak("try again.");
//         }

//         // if (userSaid.includes(slangWords[currentWordIndex].usage.toLowerCase()) && userSaid.includes(slangWords[currentWordIndex].def.toLowerCase())) {
//         //     speechSynthesizer.speak(`slangWords[currentWordIndex].${def}`);
//         // }
//     }

// }

function mousePressed() {
    displayDef = false;

    if (currentWordIndex < 0 || !speechRecognizer.listening) {
        currentWordIndex = floor(random(slangWords.length)); // Get a random index
        let usage = slangWords[currentWordIndex].usage;
        // let def = slangWords[currentWordIndex].def; // working one
        speechSynthesizer.speak(`repeat after me: ${usage}`); // string from array 'word'

        setTimeout(() => {
            speechRecognizer.start();
        }, 3000);
        // speechSynthesizer.speak(def); //says definition
    }
}



