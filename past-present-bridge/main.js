var sound_bulow  = new Audio("audios/bulowstr.wav");
var sound_basar  = new Audio("audios/turkische-basar-song.mp3");
var img_basar = document.getElementById('img-basar');
var img_bulow = document.getElementById('img-bulow');
let volumeslider= document.getElementById("slide");
volumeslider.addEventListener("input", function() {
    sound_bulow.volume = volumeslider.value;
    sound_basar.volume = 1 - volumeslider.value;
    img_bulow.style.opacity = volumeslider.value;
    img_basar.style.opacity = 1 - volumeslider.value;
    sound_bulow.play();
    sound_basar.play();
}, false);

var inputRange = document.getElementsByClassName('range')[0],
    maxValue = 1, // the higher the smoother when dragging
    speed = 5,
    currValue, rafID;

// set min/max value
inputRange.min = 0;
inputRange.max = maxValue;

// listen for unlock
function unlockStartHandler() {
    // clear raf if trying again
    window.cancelAnimationFrame(rafID);
    
    // set to desired value
    currValue = +this.value;
}

function unlockEndHandler() {
    
    // store current value
    currValue = +this.value;
    
    // determine if we have reached success or not
    if(currValue >= maxValue) {
        successHandler();
    }
    else {
        rafID = window.requestAnimationFrame(animateHandler);
    }
}

// handle range animation
function animateHandler() {

    // calculate gradient transition
    var transX = currValue - maxValue;
    
    // update input range
    inputRange.value = currValue;

    //Change slide thumb color on mouse up
    if (currValue < 0.2) {
        inputRange.classList.remove('ltpurple');
    }
    if (currValue < 0.4) {
        inputRange.classList.remove('purple');
    }
    if (currValue < 0.6) {
        inputRange.classList.remove('pink');
    }
    
    // determine if we need to continue
    if(currValue > -1) {
      window.requestAnimationFrame(animateHandler);   
    }
    
    // decrement value
    currValue = currValue - speed;
}



// move gradient
inputRange.addEventListener('input', function() {
    //Change slide thumb color on way up
    if (this.value > 0.2) {
        inputRange.classList.add('ltpurple');
    }
    if (this.value > 0.4) {
        inputRange.classList.add('purple');
    }
    if (this.value > 0.6) {
        inputRange.classList.add('pink');
    }

    //Change slide thumb color on way down
    if (this.value < 0.2) {
        inputRange.classList.remove('ltpurple');
    }
    if (this.value < 0.4) {
        inputRange.classList.remove('purple');
    }
    if (this.value < 0.6) {
        inputRange.classList.remove('pink');
    }
});

