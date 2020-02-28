const app = () => {
const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');

const sounds = document.querySelectorAll(".sound-picker button");
const timeSelect = document.querySelectorAll(".time-select button");

const timeDisplay = document.querySelector(".display-time");

const outlineLength = outline.getTotalLength();

sounds.forEach(sound =>{
    sound.addEventListener("click",function(){
        song.src= this.getAttribute('data-sound');
        video.src= this.getAttribute('data-video');
        checkPlaying(song);
    });
});

let duration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

play.addEventListener("click",()=>{
    checkPlaying(song);
});

timeSelect.forEach(Option =>{
    Option.addEventListener("click",function(){
        duration= this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(duration / 60)}: ${Math.floor(duration % 60)}`; 
    });
});

const checkPlaying = song =>{
    if (song.paused){
        song.play();
        video.play();
        play.src="./svg/pause.svg"
    }
    else{
        song.pause();
        video.pause();
        play.src="./svg/play.svg"
    }
};

song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = duration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent= `${minutes}:${seconds}`;

    if (currentTime >= duration)
    {
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
    }
};

};



app();