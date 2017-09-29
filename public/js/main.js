/* global $ */
"use strict";

const _ = require('lodash');
const $ = require("jquery");

const mark1 = 'X';
const mark2 = 'O';


let tieScore = 0;
let playerScore = 0;
let computerScore = 0;

let computerMark = '';
let displayComChoice;
let computerChoiceSound;

let allPlayerChoices = [];
let allComputerChoices = [];

let markedSquares = [];
let emptySquares = [];

let allSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
               [1, 4, 7], [2, 5, 8], [3, 6, 9],
               [1, 5, 9], [3, 5, 7]];

let playerAudio = document.createElement('audio');
let computerAudio = document.createElement('audio');
let winMessageAudio = document.createElement('audio');
let tieAudio  = document.createElement('audio');

class Game {
  
  playerMove() {
    let that = this;
    $("input").click(function(event){
      let idVal = $(this).attr('id');
      that.getMarkedSquares(idVal);
      that.getEmptySquares();
      that.playerMoveSound();
      $('#' + idVal).val(mark1);
      that.stylePlayerChoice(idVal);
      that.collectPlayerChoices(idVal); 
      that.preventOverwriteChoice();
    });
  }
  
  loadPlayerAudio() {
    playerAudio.src = 'audio/player-sound.mp3';
  }

  loadComputerAudio() {
    computerAudio.src = 'audio/computer-sound.mp3';
  }

  loadWinningAudio() {
    computerAudio.src = 'audio/win-sound.mp3';
  }

  loadTieAudio() {
    computerAudio.src = 'audio/tie-sound.mp3';
  }

  playerMoveSound() {
    playerAudio.play();
  }

  computerMoveSound() {
    let that = this;
    computerChoiceSound = setTimeout(function(){ 
      computerAudio.play();
    }, 1000);
  }


  stylePlayerChoice(val){
    $("#" + val).css("font-size", "105px");
    $("#" + val).css("padding-left", "50px");
  }
  
  computerDefendAi() {
    let funcReturn = false;
    for (var i = 0; i < winCombinations.length; i++) {
      let comb = winCombinations[i];
      let playerWinningSquare = _.difference(comb, allPlayerChoices)[0];

      if ((_.difference(comb, allPlayerChoices).length === 1) && allComputerChoices.includes(playerWinningSquare) === false) {
        computerMark = playerWinningSquare;
        funcReturn = true;
        break;
      } 
    }
    return funcReturn;
  }

  computerAttackAi() {
    for (var i = 0; i < winCombinations.length; i++) {
      let comb = winCombinations[i];

      if (_.difference(comb, allComputerChoices).length === 1) {
        let computerWinningSquare = _.difference(comb, allComputerChoices)[0];
        computerMark = computerWinningSquare;
      } else if ((_.difference(comb, allPlayerChoices).length === 1) && (_.difference(comb, allComputerChoices).length === 1)) {
          computerMark = computerWinningSquare;
      } else {
           computerMark = _.shuffle(emptySquares)[0];
      }
    }
  }
  
  computerMove() {
    let that = this;
    $("input").click(function(){
      that.computerDefendAi() === false ? that.computerAttackAi() : null;
      that.getMarkedSquares(computerMark); // store computer's choice into markedSquares array.
      that.getEmptySquares();
      that.collectComputerChoices(computerMark);
      that.computerMoveSound();
      that.displayComputerChoice(computerMark); // print computer choice
      that.preventOverwriteChoice();
      that.computerStyleChoice(computerMark);
    });
  }
  
  displayComputerChoice(computerMark) {
    let that = this;
    displayComChoice = setTimeout(function(){
      // that.computerMoveSound(); 
      $('#' + computerMark).val(mark2); 
    }, 1000);
  }
  
  computerStyleChoice(pos) {
    $("#" + pos).css("font-size", "105px");
  }
  
  preventOverwriteChoice(){
    markedSquares.forEach(function(ele) {
      $("#" + ele).prop('disabled', true);
    });
  }
  
  getMarkedSquares(idVal) {
    markedSquares.push(Number(idVal));
    markedSquares = _.uniq(markedSquares); // .uniq is a lodash method
  }
  
  getEmptySquares() {
    emptySquares = allSquares.
      filter(function(ele) {
        return markedSquares.indexOf(ele) < 0;
      });
    emptySquares = _.uniq(emptySquares);
  }
  
  collectPlayerChoices(val) {
     allPlayerChoices.push(Number(val));
     allPlayerChoices = _.uniq(allPlayerChoices);
  }
  
  
  collectComputerChoices(val) {
     allComputerChoices.push(Number(val));
     allComputerChoices = _.uniq(allComputerChoices);
  }
 
 
 // scores 
  
  isGameTie() {
    let that = this;
      // markedSquares array has a NaN value stored as the last computer input in each game. therefore, length comparison between markedSquares and allSquares arrays must be done without counting that 'NaN' value as an index (markedSquares.length - 1)
    if ((markedSquares.length - 1 === allSquares.length) && (that.didPlayerWin() === false && that.didComputerWin() === false)) {
      this.stopComputerAudio()
      return true;
    }
  }

  updateTieScore() {
     if (this.isGameTie()) {
      $(".tie-score").text(tieScore += 1);
    }
  }
  
  didComputerWin() {
    let funcReturn = false;
    winCombinations.forEach(function(ele) {
      allComputerChoices.length === _.uniq(allComputerChoices.concat(ele)).length ? funcReturn = true : null
    });
    return funcReturn;
  }
  
  updateComputerScore() {
    let that = this;
    if (that.didComputerWin()) {
      $(".computer-score").text(computerScore += 1)
    } 
  }
  
  didPlayerWin() {
    let funcReturn = false
    winCombinations.forEach(function(ele) {
      if (allPlayerChoices.length === _.uniq(allPlayerChoices.concat(ele)).length) {
        funcReturn = true;
      }
    });
    return funcReturn;
  }
  
  updatePlayerScore() {
    let that = this;
    if (that.didPlayerWin()) {
      $(".player-score").text(playerScore += 1);
    } 
  }
  
  resetPlayer() {
    allPlayerChoices = [];
  }
  
  resetComputer() {
    allComputerChoices = [];
  }
  
  resetMarkedSquares() {
    markedSquares = [];
  }
  
  resetEmptySquares() {
    emptySquares = [];
  }

  resetDisplayComputerChoice() {
    clearTimeout(displayComChoice);
  }
  
  stopComputerAudio() {
clearTimeout(computerChoiceSound);
  }

  enableChoices() {
    $("input").each(function(ele) {
      $(this).prop('disabled', false);
    });
  }

  winningMessage() {
    //play audio
    // flash win comb
  }

  tieMessage() {
    //play audio
    // flash all squares
  }
  
  // gameOver() {
  //   let that = this;
  //   $("input").click(function(){
  //     if (that.didPlayerWin() || that.didComputerWin() || that.isGameTie()) {
  //       return true;
  //     };
  //   })
  //   return false;
  // }
  
  gameReset() {
    let that = this;
    setTimeout(function(){
      that.updatePlayerScore();
      that.updateComputerScore();
      that.updateTieScore();
      that.enableChoices();
      that.boardEmpty();
      that.resetPlayer();
      that.resetComputer();
      that.resetMarkedSquares();
      that.resetEmptySquares();
      that.stopComputerAudio(); 
      that.resetDisplayComputerChoice();
    }, 2000);
  }


  evalResult() {
    let that = this;
    $("input").click(function(){

      if (that.didComputerWin()) {
        // that.winningMessage();
        that.gameReset();

      } else if (that.isGameTie()) {
          that.tieMessage();
          that.gameReset();
      } else if (that.didPlayerWin()) {
          // that.winningMessage();
          that.resetDisplayComputerChoice();
          that.stopComputerAudio(); 
          that.gameReset();
      }

    });
  }
  
  boardEmpty() { 
    $("input").each(function(){
      $(this).val('');
    });
  }
  
  play() {
    this.loadPlayerAudio();
    this.loadComputerAudio();
    this.playerMove();
    this.computerMove();
    this.evalResult();
  }
  
}

var ttt = new Game();
ttt.play();


