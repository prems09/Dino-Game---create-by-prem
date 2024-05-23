score=0;
cross = true;

audio = new Audio('sound.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play().then(() => {
        // Playback started successfully
        console.log('Playback started successfully');
    }).catch(error => {
        // Handle the error
        console.error('Error occurred while trying to play audio:', error);
    });
}, 1000);
document.onkeydown = function(e){
    console.log("key code is: " + e.keyCode);
    if(e.keyCode==38){
        dino = document.querySelector('.dino');
        dino.classList.add('jump');
        setTimeout(()=>{
            dino.classList.remove('jump');
        },700);
    }
    if(e.keyCode==39){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if(e.keyCode==37){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(()=>{
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    cactus = document.querySelector('.cactus');

    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    
    ox = parseInt(window.getComputedStyle(cactus, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(cactus, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    console.log(offsetX, offsetY);
    if(offsetX<113 && offsetY<57){
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        cactus.classList.remove('cactusAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if(offsetX<145 && cross){
        score += 1;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            cross=true;
        },1000);
        setTimeout(()=>{
            aniDur =  parseFloat(window.getComputedStyle(cactus, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            cactus.style.animationDuration = newDur + 's';
        },500);

    }

}, 10)

function updateScore(score){
    scoreCount.innerHTML = "Your Score: " + score;
}