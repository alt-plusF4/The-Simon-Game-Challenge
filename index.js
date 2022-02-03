var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

var clickCounter = 0;

var correct = 0;


//Functions

function nextSequence() {
    level++;
    
    $(".level-title").html("Level "+level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(30).fadeIn(30); 
    
    clickCounter = 0;
    correct = 0;

    userClickedPattern = [];
}


function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}


function gameOver(){
    $("body").addClass("red");
    
    setTimeout(function(){
        $("body").removeClass("red");
    }, 100);
    
    $(".game-over").css("display", "block");
    $(".level-title").html("<h2>Press any key to Restart</h2>").addClass("blink");
    
    playSound("wrong");

    started = false;
    gamePattern = [];
}



//Manipulation

$(document).keydown(function(){
    
    if(!started){

        $(".game-over").css("display", "none");
        $(".level-title").removeClass("blink");
        
        level = 0;
        nextSequence();
        started = true;
    }
});


$('.btn').click( function (evt) {
   
    if(started == true){
        
        clickCounter++;
        
        var userChosenColour = evt.target.id;
        
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
    
        if(clickCounter <= level){
            
            if(userClickedPattern[clickCounter-1] == gamePattern[clickCounter-1])
                correct++;
            else
                gameOver();     
            
        }
    
        if(correct == level){
            setTimeout( function() { nextSequence(); }, 1000);
        }

    }
});

