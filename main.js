//game logic
var Word = require('./word.js');
var game = require('./game.js');

var prompt = require('prompt');


console.log("Welcome to the NBA players Hangman!");

console.log("<------------------------------------->");
prompt.start();



game = {
  wordBank: ['ball', 'westbrooke', 'curry', 'embiid', 'derozan', 'irving', 'james', 'hayward','oladipo', 'Cousins', 'davis', 'walker', 'simmons'],
  wordsWon: 0,
  attemptsLeft: 10,
  currentWord: null,
  
  startGame: function (word) {
    this.resetAttempt();
    this.currentWord = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
    this.currentWord.getLet();
    this.promptUser();
  },

  resetAttempt: function(){
    this.attemptsLeft = 10;
  },
 
  promptUser: function(){
  
    var self = this;
    prompt.get(['guessLetter'], function(err, result){
      console.log("Letters guessed: " + result.guessLetter);
      var manyGuessed = self.currentWord.checkLetter(result.guessLetter);

      if(manyGuessed ==0) {
        console.log("Dissapointing!");
        self.attemptsLeft--;
        
      } else {
        console.log("Congratulations!");
          if(self.currentWord.findWord()){
            console.log("You won!", self.currentWord.target);
            console.log("<------------------------------------->");
            return;
          }
      }

      console.log("Attempts Left: " + self.attemptsLeft);
      console.log("<------------------------------------->");
      if((self.attemptsLeft > 0) && (self.currentWord.found == false)){
        self.promptUser();
      }
      else if(self.attemptsLeft ==0){
        console.log("You've Lost, The player is", self.currentWord.target);
      } else {
        console.log(self.currentWord.wordRender());
      }
    });

  }


};

game.startGame();