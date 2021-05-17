'use strict';
let attempts = 0;

let maxAttempts ;
let subEl=document.getElementById('submit');
subEl.onclick=submit;

function submit() {
    let inputEl = document.getElementById("num").value;
    maxAttempts = inputEl;
  }

let attemptEl = document.getElementById('Attempt');
let Bus = [];
let numofViews =[];
let numofClicks=[];
let BusName=[];
let Repeat=[];
let busImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg','chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

function BusMall(busName) {
    this.busName = busName.split('.')[0];
    this.source = 'img/' + busName;
    this.clicks = 0;
    this.views = 0;
    Bus.push(this);
    BusName.push(this.busName);
}





for (let i = 0; i < busImages.length; i++) {
    new BusMall(busImages[i]);

}

function generateRandomImage() {
    return Math.floor(Math.random() * Bus.length);
}


let leftImgEl = document.getElementById('LeftImg');
let middleImgEl = document.getElementById('MiddleImg');
let rightImgEl = document.getElementById('RightImg');

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;

function renderImages() {
    leftImgIndex = generateRandomImage();

    middleImgIndex = generateRandomImage();

    rightImgIndex = generateRandomImage();

  

    while (leftImgIndex === rightImgIndex || leftImgIndex === middleImgIndex || middleImgIndex === rightImgIndex || Repeat[0]===leftImgIndex || Repeat[0]===rightImgIndex || Repeat[0]===middleImgIndex || Repeat[1]===leftImgIndex || Repeat[1]===rightImgIndex || Repeat[1]===middleImgIndex || Repeat[2]===leftImgIndex || Repeat[2]===rightImgIndex || Repeat[2]===middleImgIndex  ) {
        leftImgIndex = generateRandomImage();
        middleImgIndex = generateRandomImage();
        rightImgIndex = generateRandomImage();
     

    }
   
    Repeat[0]=leftImgIndex;
    Repeat[1]=middleImgIndex;
    Repeat[2]=rightImgIndex;

    leftImgEl.setAttribute('src', Bus[leftImgIndex].source);
    leftImgEl.setAttribute('title', Bus[leftImgIndex].source);
    Bus[leftImgIndex].views++;

    middleImgEl.setAttribute('src', Bus[middleImgIndex].source);
    middleImgEl.setAttribute('title', Bus[middleImgIndex].source);
    Bus[middleImgIndex].views++;

    rightImgEl.setAttribute('src', Bus[rightImgIndex].source);
    rightImgEl.setAttribute('title', Bus[rightImgIndex].source);
    Bus[rightImgIndex].views++;
    attemptEl.textContent = attempts;

    
}

Repeat[0]=generateRandomImage();
Repeat[1]=generateRandomImage();
Repeat[2]=generateRandomImage();


renderImages();

leftImgEl.addEventListener('click', handelClicks);

middleImgEl.addEventListener('click', handelClicks);

rightImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        console.log(event.target.id)
        if (event.target.id === 'LeftImg') {
            Bus[leftImgIndex].clicks++;
        } 
        else if (event.target.id === 'MiddleImg') {
            Bus[middleImgIndex].clicks++;
        }
        else if (event.target.id === 'RightImg') {
            Bus[rightImgIndex].clicks++;
        }
        renderImages();
    } else {
        let buttonEl=document.getElementById('button');
        // buttonEl=document.addEventListener('click', viewResult);

      
        buttonEl.onclick=viewResult;
        

        leftImgEl.removeEventListener('click', handelClicks);
        middleImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);

      
    }
}


function viewResult()
{
    let buttonEl=document.getElementById('button');

   let ulEl = document.getElementById('Result');
        
        let liEl;
        for (let i = 0; i < Bus.length; i++) {
            liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${Bus[i].busName} has ${Bus[i].views} views and has ${Bus[i].clicks} clicks.`
            numofClicks.push(Bus[i].clicks);
            numofViews.push(Bus[i].views);
        }
        chartRender();
        buttonEl.disabled=true;

}

function chartRender()
{



let chartEl = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(chartEl, {
    type: 'bar',
    data: {
        labels: BusName,
        datasets: [{
            label: '# of clicks',
            data:numofClicks,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
               
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
               
            ],
            borderWidth: 1
        },{
            label: '# of views',
            data: numofViews,
            backgroundColor: [
               
                'rgba(75, 192, 192, 0.2)',
               
            ],
            borderColor: [
              
                'rgba(75, 192, 192, 1)',
              
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}