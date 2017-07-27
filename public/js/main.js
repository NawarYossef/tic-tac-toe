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
  
  collectPlayerChoices() {
    $(document).ready(function(){
      $(".square").click(function(){ 
        let mark = Number($(this).attr('id'));  // convert passed id attribute to from string to number
        allPayerChoices.push(mark);
      });
    });
  }
  
  displayAll() {
    let that = this
    $(document).ready(function(){
      $(".square").click(function(){
       
        // print mark
        $(this).text(mark1); 
        // 
        
        // store player mark into marked squares
        let playerMark = Number($(this).attr('id'));
         markedSquares.push(playerMark);
         markedSquares = _.uniq(markedSquares);
         
         //get empty squares 
         emptySquares = allSquares.filter(function(ele) {
           return markedSquares.indexOf(ele) < 0;
        });
         emptySquares = _.uniq(emptySquares);
      // 
         
        // store computer mark into marked squares
        let pos = _.shuffle(emptySquares)[0];
        let computerMark = pos;
        markedSquares.push(computerMark);
        markedSquares = _.uniq(markedSquares);
        // 
        
        
        // computer mark
        $("#" + pos).text(mark2);
        $("#" + pos).css("font-size", "105px");
        // 
        
         
        // get player and computer choices
        allComputerChoices.push(pos);
        allPayerChoices.push(playerMark);
        //
        
      });
    });
  }
  
  playerChoice() {
    $(document).ready(function(){
      
    })
  }

  stylePlayerChoice(){
    $(document).ready(function(){
      $(".square").click(function(){
           $(this).css("font-size", "105px");
           $(this).css("padding-left", "50px");
      });
    });
  }
  
  getMarkedSquares() {
    $(document).ready(function(){
      $(".square").click(function(){
        let mark = Number($(this).attr('id'));
        markedSquares.push(mark);
        markedSquares = _.uniq(markedSquares);
        // console.log(markedSquares)
      });
    });
  }
  
  getEmptySquares() {
    $(document).ready(function(){
      $(".square").click(function(){
       emptySquares = allSquares.filter(function(ele) {
         return markedSquares.indexOf(ele) < 0;
       });
      // console.log(emptySquares)
      });
    });
  }
  
  collectComputerChoices() {
    $(document).ready(function(){
      $(".square").click(function(){
          let mark = Number($(this).attr('id'));
          allComputerChoices.push(mark);
      });
    });
  }
  
  
  computerStyleChoice(pos) {
    $(document).ready(function(){
    $("#" + pos).css("font-size", "105px");
    });
  }
  
}
  
var ttt = new Game();
  
  // ttt.getEmptySquares();
  // ttt.getMarkedSquares();
  ttt.displayAll();
  ttt.stylePlayerChoice();
  // ttt.collectPlayerChoices();
  // ttt.collectComputerChoices();
   






