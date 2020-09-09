console.log("--- DINO GAME ---")
score = 0
cross = true

gameAudio = new Audio("music.mp3")
gameOverAudio = new Audio("gameover.mp3")
openSettingsAudio = new Audio("opening-file-cabinet.mp3")
closeSettingsAudio = new Audio("closing-file-cabinet.mp3")
buttonClickAudio = new Audio("Mouse-Click.mp3")

// auto play audio
setTimeout(() => {
    // gameAudio.play()
}, 1000)

// show & hide settings box
settingsbtn = document.getElementById("settings-btn")
visible = true
settingsbtn.addEventListener("click", () => {
    if (visible == true) {
        document.getElementById("settings-box").classList.add("settings-ani")
        document.getElementById("settings-box").style.visibility = "visible"
        openSettingsAudio.play()
        visible = false
    } else {
        document.getElementById("settings-box").classList.remove("settings-ani")
        document.getElementById("settings-box").style.visibility = "hidden"
        closeSettingsAudio.play()
        visible = true
    }
})

// audio volume is 0 - 1
gameAudio.volume = 0.5 // set default value
audioVolume = document.getElementById("audioVolume")
audioVolume.addEventListener("change", () => {
    gameAudio.volume = audioVolume.value / 100
    console.log(audioVolume.value / 100)
})
audioVolume.addEventListener("mousemove", () => {
    gameAudio.volume = audioVolume.value / 100
    console.log(audioVolume.value / 100)
})

// play audio when click on button
playAudio = document.getElementById("playAudio")
playAudio.addEventListener("click", () => {
    gameAudio.play()
    buttonClickAudio.play()
})
// pause audio 
pauseAudio = document.getElementById("pauseAudio")
pauseAudio.addEventListener("click", () => {
    gameAudio.pause()
    buttonClickAudio.play()
})

// Play game when click on play button
play_game_btn = document.getElementById("play-game-btn")
play_game_btn.addEventListener("click",()=>{
    document.getElementById("enemy").classList.add("enemy-run")
    buttonClickAudio.play()
    document.querySelector(".play-btn-box").style.backgroundColor = "transparent"
    play_game_btn.style.visibility = "hidden"
    gameAudio.play()
})
// Play again when click on play again button
play_again_btn = document.getElementById("play-again-btn")
play_again_btn.addEventListener("click",()=>{
    document.querySelector(".gameOver").style.visibility = "hidden"
    score = 0
    document.getElementById("enemy").classList.add("enemy-run")
    updateScore(score)
    document.querySelector(".enemy-run").style.animationDuration = "5s"
    gameAudio.play()
})


// when user press up-arrow key on the DOM
document.addEventListener("keydown", (e) => {
    console.log(e.keyCode)
    if (e.keyCode == 38) {
        player = document.querySelector("#player")
        player.classList.add("player-jump")
        setTimeout(() => {
            player.classList.remove("player-jump")
        }, 1000)
    }
    if (e.keyCode == 39) {
        player = document.querySelector("#player")
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue("left"))
        player.style.left = (playerX + 112) + "px"
    }
    if (e.keyCode == 37) {
        player = document.querySelector("#player")
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue("left"))
        player.style.left = (playerX - 112) + "px"
    }
})

setInterval(() => {
    player = document.querySelector("#player")
    enemy = document.querySelector("#enemy")
    gameOver = document.querySelector(".gameOver")
    
    // player x and y position
    px = parseInt(window.getComputedStyle(player, null).getPropertyValue("left"))
    py = parseInt(window.getComputedStyle(player, null).getPropertyValue("top"))
   
    // enemy x and y position
    ex = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("left"))
    ey = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("top"))
    
    // absolute values
    offsetX = Math.abs(px-ex)
    offsetY = Math.abs(py-ey)

    if (offsetX < 100 && offsetY < 80) {
        gameOver.style.visibility = "visible"
        enemy.classList.remove("enemy-run")
        gameOverAudio.play()
        setTimeout(() => {
            gameOverAudio.pause()
            gameAudio.pause()
        }, 1000);
    } else if(offsetX < 80 && cross){
        score += 1
        updateScore(score)
        cross = false
        setTimeout(() => {
            cross = true
        }, 1000);
        setTimeout(() => {
            // enemy_run = document.querySelector(".enemy-run")
            aniDur = parseFloat(window.getComputedStyle(enemy, null).getPropertyValue("animation-duration"))
            newDur = aniDur - 0.1
            enemy.style.animationDuration = newDur + "s"
        }, 500);
    }
}, 100);

// update score
function updateScore(s){
    document.querySelector("#score").innerHTML = "SCORE : " + s
    document.querySelector("#highScore").innerHTML = "YOUR HIGH SCORE : " + s
}

// loader animation
function loader(){
    document.querySelector(".load").style.visibility = "hidden"
}
