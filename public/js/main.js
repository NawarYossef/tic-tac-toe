/* global $ */

// things to be done : 

// fix game reset
// computer Ai
// timing
// add sound
// end game flash effect
// refactor code


"use strict";

const _ = require('lodash');
const $ = require("jquery");

const mark1 = 'X';
const mark2 = 'O';


let tieScore = 0
let playerScore = 0
let computerScore = 0


let allPayerChoices = [];
let allComputerChoices = [];

let markedSquares = [];
let emptySquares = [];

let allSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
               [1, 4, 7], [2, 5, 8], [3, 6, 9],
               [1, 5, 9], [3, 5, 7]];

class Game {
  
  playerMove() {
    let that = this;
    $(document).ready(function(){
      $(".square").click(function(event){
        let idVal = $(this).attr('id');
        that.getMarkedSquares(idVal);
        that.getEmptySquares();
        $("#" + idVal).text(mark1)
        that.stylePlayerChoice(idVal);
        that.collectPlayerChoices(idVal); 
        that.preventOverwriteChoice();
        that.updatePlayerScore();
        that.updateTieScore()
      });
    });
  }

  stylePlayerChoice(val){
    $(document).ready(function(){
      $("#" + val).css("font-size", "105px");
      $("#" + val).css("padding-left", "50px");
      });
  }
  
  computerMove() {
    let that = this;
    $(document).ready(function(){
      $(".square").click(function(){
        let computerMark = _.shuffle(emptySquares)[0]; // .shuffle is a lodash method
        that.getMarkedSquares(computerMark); // store computer's choice into markedSquares array.
        that.getEmptySquares();
        that.collectComputerChoices(computerMark);
        that.printComputerChoice(computerMark); // print computer choice
        that.preventOverwriteChoice();
        that.computerStyleChoice(computerMark);
        that.updateComputerScore();
      });
    });
  }
  
  printComputerChoice(computerMark) {
    $(document).ready(function(){
      $("#" + computerMark).text(mark2);
    });
  }
  
  computerStyleChoice(pos) {
    $(document).ready(function(){
    $("#" + pos).css("font-size", "105px");
    });
  }
  
  preventOverwriteChoice(){
    $(document).ready(function(){
      markedSquares.forEach(function(ele) {
        $("#" + ele).off("click")
      });
    })
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
    $(document).ready(function(){
      // markedSquares array has a NaN value stored as the last computer input in each game. therefore, length comparison between markedSquares and allSquares arrays must be done without counting that 'NaN' value as an index (markedSquares.length - 1)
      if ((markedSquares.length - 1 === allSquares.length) && (that.didPlayerWin() === false && that.didComputerWin() === false)) {
        $(".tie-score").text(tieScore += 1);
        return true;
      }
    });
  }
  
  didComputerWin() {
    let funcReturn = false
    winCombinations.forEach(function(ele) {
      allComputerChoices.length === _.uniq(allComputerChoices.concat(ele)).length ? funcReturn = true : null
    })
    return funcReturn;
  }
  
  updateComputerScore(val) {
    let that = this;
    $(document).ready(function(){
      that.didComputerWin() ? $(".computer-score").text(computerScore += 1) : null;
    });
  }
  
  didPlayerWin() {
    let funcReturn = false
    winCombinations.forEach(function(ele) {
      allPayerChoices.length === _.uniq(allPayerChoices.concat(ele)).length ? funcReturn = true : null
    });
    return funcReturn;
  }
  
  updatePlayerScore(val) {
    let that = this;
    $(document).ready(function(){
      that.didPlayerWin() ? $(".player-score").text(playerScore += 1) : null;
      that.resetPlayer();
    });
  }
  
  resetPlayer() {
    allPayerChoices = [];
  }
  gameReset() {
    let that = this;
    $(document).ready(function(){
      $(".square").click(function(){
        if (that.updatePlayerScore() || that.updateComputerScore() || that.updateTieScore()) {
          allPayerChoices = [];
          allComputerChoices = [];
          markedSquares = [];
          emptySquares = []; 
          that.boardEmpty();
        };
      });
    })
  }
  
  boardEmpty() {
    $(document).ready(function(){
      $(".square").each(function(){
        $(this).empty();
       
      });
    });
  }
  
  // bb() {
  //   let that = this
  //   $(document).ready(function(){
  //     allSquares.forEach(function(ele) {
  //       $("#" + ele).on("click", that.playerMove())
  //       // $("#" + ele).on("click", that.computerMove())
  //     })
  //   });
  // }
  
  
  
  play() {
    this.playerMove();
    this.computerMove();
    this.gameReset();
  }
}
  
var ttt = new Game();

ttt.play();
 
   






