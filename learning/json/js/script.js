/**
Learning JSON
Taylor McArthur


*/

"use strict";
// Global Variables
let tarot;
let fortune = `No fortune loaded.`;

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);

    // Display the meaning 
    push();
    textSize(18);
    textAlign(CENTER, CENTER);
    fill(255, 255, 0);
    text(fortune, width / 2, height / 2);
    pop();
}

function mousePressed() {
    loadJSON("assets/data/tarot_interpretations.json", tarotLoaded);
}

function tarotLoaded(data) {
    tarot = data;

    let card = random(tarot.tarot_interpretations);

    fortune = random(card.fortune_telling);
}