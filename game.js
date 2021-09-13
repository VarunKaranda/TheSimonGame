var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

//creating a new empty array with the name userClickedPattern.
var userClickedPattern = [];

//variable used to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//Creating a new variable called level and start at level 0.
var level = 0;

//jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

$(document).keypress(function () {
  if (!started) {
    //Making h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  //Inside the handler, creating a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  //Add the contents of the variable userChosenColour to the end of userClickedPattern
  userClickedPattern.push(userChosenColour);
  //calling playSound function
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //Calling checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
  //console.log(userClickedPattern);
});

//Creating a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //to check if the most recent user answer is the same as the game pattern.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    //If the user got the most recent answer right, then check that they have finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    //play this sound if the user got one of the answers wrong.
    playSound("wrong");
    //applying "game-over" class to the body of the website when the user gets one of the answers wrong.
    $("body").addClass("game-over");
    //Changing the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //removing "game-over" class after 200 milliseconds.
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    //Calling startOver() if the user gets the sequence wrong.
    startOver();
  }
}

function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //increase the level by 1 every time nextSequence() is called.
  level++;
  //Inside nextSequence(), updating the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  //generating random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //calling playSound function
  playSound(randomChosenColour);
}
//Creating a new function called animatePress(), it should take a single input parameter called currentColour
function animatePress(currentColour) {
  //jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColour).addClass("pressed");
  //removing the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
//Creating a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  //resetting the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
