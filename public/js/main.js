/* global $ */
"use strict";

const _ = require('lodash');

const mark1 = 'X';
const mark2 = 'O';


let allPayerChoices = [];
let allComputerChoices = [];

let markedSquares = [];
let emptySquares = [];

let allSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
               [1, 4, 7], [2, 5, 8], [3, 6, 9],
               [1, 5, 9], [3, 5, 7]];

class Game {
  
  // collectPlayerChoices() {
  //   $(document).ready(function(){
  //     $(".square").click(function(){ 
  //       let mark = Number($(this).attr('id'));  // convert passed id attribute to from string to number
  //       allPayerChoices.push(mark);
  //     });
  //   });
  // }
  
  play() {
    let that = this;
    $(document).ready(function(){
      $(".square").click(function(){
       
       let idVal = $(this).attr('id');
        // print player choice
        that.stylePlayerChoice(idVal);
        that.PlayerChoice(idVal);
        // 
        
        // store player mark into markedSquares array
        that.getMarkedSquares(idVal);
        
         
         //get empty squares 
        that.getEmptySquares();
      
        // print computer Move
        that.ComputerChoice();

        // get player and computer choices
        that.collectPlayerChoices(idVal);
        that.collectComputerChoices(idVal);
      });
    });
  }
  
  PlayerChoice(val) {
    $(document).ready(function(){
       $("#" + val).text(mark1);
    });
  }

  stylePlayerChoice(val){
    $(document).ready(function(){
      $("#" + val).css("font-size", "105px");
      $("#" + val).css("padding-left", "50px");
      });
  }
  
  ComputerChoice() {
    let that = this;
    $(document).ready(function(){
      let computerMark = _.shuffle(emptySquares)[0]; // .shuffle is a lodash method
      that.getMarkedSquares(computerMark); // store computer's choice into markedSquares array. 
      $("#" + computerMark).text(mark2);
      that.computerStyleChoice(computerMark);
    });
  }
  
  computerStyleChoice(pos) {
    $(document).ready(function(){
    $("#" + pos).css("font-size", "105px");
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
}
  
var ttt = new Game();

ttt.play();

   






