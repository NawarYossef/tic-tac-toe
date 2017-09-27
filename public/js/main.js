/* global $ */

// make first move

// defend:
// go through player choices
// go thorugh winCombs
// if a winCom includes two player choies then choose  the third as computer mark


//attack:
//  go thorugh winCombs
// if computer choices include two choies from a comb, then choose third

//random:
// just make a random move


"use strict";

const _ = require('lodash');
const $ = require("jquery");

const mark1 = 'X';
const mark2 = 'O';


let tieScore = 0
let playerScore = 0
let computerScore = 0

let computerMark = ''
let displayComChoice;

let allPayerChoices = [];
let allComputerChoices = [];

let markedSquares = [];
let emptySquares = [];

let allSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
               [1, 4, 7], [2, 5, 8], [3, 6, 9],
               [1, 5, 9], [3, 5, 7]];

let playerAudio = document.createElement('audio');
let computerAudio = document.createElement('audio');

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
  
  loadAudio() {
    playerAudio.src = 'audio/player-sound.mp3'
    computerAudio.src = 'audio/computer-sound.mp3'
  }


  playerMoveSound() {
    playerAudio.play();
  }

  computerMoveSound() {
    computerAudio.play();
  }

  // any time you want to re-add the click listener:
  // this.setUpListener();



  stylePlayerChoice(val){
    $("#" + val).css("font-size", "105px");
    $("#" + val).css("padding-left", "50px");
  }
  
  computerDefendAi() {
    // winCombinations.forEach(function(comb) {
    //   _.difference(comb, allPayerChoices).length === comb.length ? 
    // computerMark = _.shuffle(emptySquares)[0];
     
    // })
  }
  
  computerDefendAi() {
    let funcReturn = false;
    for (var i = 0; i < winCombinations.length; i++) {
      let comb = winCombinations[i];
      let playerWinningSquare = _.difference(comb, allPayerChoices)[0];

      if ((_.difference(comb, allPayerChoices).length === 1) && allComputerChoices.includes(playerWinningSquare) === false) {
        computerMark = playerWinningSquare;
        funcReturn = true;
        break;
      } 
    }
    return funcReturn;
  }
  
  computerMove() {
    let that = this;
    console.log(emptySquares)
    $("input").click(function(){
      that.computerDefendAi() === false ? computerMark = _.shuffle(emptySquares)[0] : null;
      that.getMarkedSquares(computerMark); // store computer's choice into markedSquares array.
      that.getEmptySquares();
      that.collectComputerChoices(computerMark);
      that.displayComputerChoice(computerMark); // print computer choice
      that.preventOverwriteChoice();
      that.computerStyleChoice(computerMark);
    });
  }
  
  displayComputerChoice(computerMark) {
    let that = this;
    displayComChoice = setTimeout(function(){
      that.computerMoveSound(); 
      $('#' + computerMark).val(mark2); 
    }, 1000);
  }
  
  computerStyleChoice(pos) {
    $("#" + pos).css("font-size", "105px");
  }
  
  preventOverwriteChoice(){
    markedSquares.forEach(function(ele) {
      $("#" + ele).prop('disabled', true);;
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
     allPayerChoices.push(Number(val));
     allPayerChoices = _.uniq(allPayerChoices);
  }
  
  
  collectComputerChoices(val) {
     allComputerChoices.push(Number(val));
     allComputerChoices = _.uniq(allComputerChoices);
  }
 
 
 // scores 
  
  updateTieScore() {
    let that = this;
      // markedSquares array has a NaN value stored as the last computer input in each game. therefore, length comparison between markedSquares and allSquares arrays must be done without counting that 'NaN' value as an index (markedSquares.length - 1)
    if ((markedSquares.length - 1 === allSquares.length) && (that.didPlayerWin() === false && that.didComputerWin() === false)) {
      $(".tie-score").text(tieScore += 1);
      return true;
    }
  }
  
  didComputerWin() {
    let funcReturn = false
    winCombinations.forEach(function(ele) {
      allComputerChoices.length === _.uniq(allComputerChoices.concat(ele)).length ? funcReturn = true : null
    })
    return funcReturn;
  }
  
  updateComputerScore() {
    let funcReturn = false
    let that = this;
    if (that.didComputerWin()) {
      $(".computer-score").text(computerScore += 1)
      funcReturn = true
    } 
    return funcReturn
  }
  
  didPlayerWin() {
    let funcReturn = false
    winCombinations.forEach(function(ele) {
      allPayerChoices.length === _.uniq(allPayerChoices.concat(ele)).length ? funcReturn = true : null
    });
    return funcReturn;
  }
  
  updatePlayerScore() {
    let funcReturn = false
    let that = this;
    if (that.didPlayerWin()) {
      $(".player-score").text(playerScore += 1)
      funcReturn = true
    } 
    return funcReturn
  }
  
  resetPlayer() {
    allPayerChoices = [];
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

  resetDisplayComputerChoice(print) {
    clearTimeout(displayComChoice);
  }
  
  enableChoices() {
    $("input").each(function(ele) {
      $(this).prop('disabled', false);
    });
  }
  
  // gameScore() {
  //   let that = this;
  //   $("input").click(function(){
  //     if (that.didPlayerWin() || that.didComputerWin() || that.updateTieScore()) {
  //       that.updatePlayerScore();
  //       that.updateComputerScore();
  //       that.updateTieScore();
  //     };
  //   })
  // }
  
  GameReset() {
    let that = this;
    $("input").click(function(){
      if (that.updateComputerScore() || that.updatePlayerScore() || that.updateTieScore()) {
        that.enableChoices();
        that.boardEmpty();
        that.resetPlayer();
        that.resetComputer();
        that.resetMarkedSquares();
        that.resetEmptySquares();
        that.resetDisplayComputerChoice();
      }
    });
  }
  
  boardEmpty() {
    $("input").each(function(){
      $(this).val('');
    });
  }
  
  
  play() {
    this.loadAudio();
    this.playerMove();
    this.computerMove();
    this.GameReset();
  }
  
}

var ttt = new Game();
ttt.play();


