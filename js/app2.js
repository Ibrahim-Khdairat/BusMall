'use strict';
let attempts = 0;
let maxAttempts = 10;
let attemptsEl = document.getElementById('attempts');
let goats = [];
function GoatImage(goatName) {
    //'cruisin-goat.jpg'.split('.') >>['cruisin-goat','jpg']
    this.goatName = goatName.split('.')[0];
    this.source = 'images/' + goatName;
    this.clicks = 0;
    this.views = 0;
    goats.push(this);
}

// let goat1 = new GoatImage('cruisin-goat', 'images/cruisin-goat.jpg');
// let goat2 = new GoatImage('float-your-goat.jpg', 'images/float-your-goat.jpg');


let goatsImages = ['cruisin-goat.jpg', 'float-your-goat.jpg', 'goat-away.jpg', 'goat-out-of-hand.jpg', 'kissing-goat.jpg', 'sassy-goat.jpg', 'smiling-goat.jpg', 'sweater-goat.jpg'];

for (let i = 0; i < goatsImages.length; i++) {
    new GoatImage(goatsImages[i]);
}

function generateImage() {
    //0-1 >> 0-7
    return Math.floor(Math.random() * goats.length);
}
// console.log(goats);
// generateImage();

let lImgEl = document.getElementById('leftImg');

let rImgEl = document.getElementById('rightImg');

let leftImgIndex;
let rightImgIndex;

function renderImg() {
    leftImgIndex = generateImage();
    rightImgIndex = generateImage();

    while (leftImgIndex === rightImgIndex) {
        leftImgIndex = generateImage();
    }

    lImgEl.setAttribute('src', goats[leftImgIndex].source);
    lImgEl.setAttribute('title', goats[leftImgIndex].source);
    goats[leftImgIndex].views++;

    rImgEl.setAttribute('src', goats[rightImgIndex].source);
    rImgEl.setAttribute('title', goats[rightImgIndex].source);
    goats[rightImgIndex].views++;
    attemptsEl.textContent = attempts;
    // console.log('left', leftImgIndex)
    // console.log('right', rightImgIndex);
}
renderImg();

lImgEl.addEventListener('click', handelClicks);
rImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        console.log(event.target.id)
        if (event.target.id === 'leftImg') {
            goats[leftImgIndex].clicks++;
        } else if (event.target.id === 'rightImg') {
            goats[rightImgIndex].clicks++;
        }
        renderImg();
    } else {
        let ulEl = document.getElementById('results');
        let liEl;
        for (let i = 0; i < goats.length; i++) {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${goats[i].goatName} has ${goats[i].views} views and has ${goats[i].clicks} clicks.`
        }
        lImgEl.removeEventListener('click', handelClicks);
        rImgEl.removeEventListener('click', handelClicks);
    }
}