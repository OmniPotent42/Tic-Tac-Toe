$(document).ready(function() {
    firstPlayerTurn = true;
    turnCount = 1;
    var board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var lastClickedOn = null;
    
    var findThreeInARow = function(item, arrOfCombos, board) {
        //for each combo, check if board has those values
        for (var i = 0; i < arrOfCombos.length; i++) {
            var currentCombo = arrOfCombos[i];
            //we must have both indexes correct to have a match
            var correctIndexCount = 0;
            for (var j = 0; j < currentCombo.length; j++) {
                var currentIndex = currentCombo[j];
                if (board[currentIndex] === item) {
                    correctIndexCount++;
                }
            }
            if (correctIndexCount === 2) {
                return true;
            }
        }
        return false;
    }
    
    var setValue = function(firstPlayerTurn, i) {
        var index = i - 1;
        lastClickedOn = index;
        if (firstPlayerTurn) {
            board[index] = "x";
        } else {
            board[index] = "o";
        }
    }
    
    var setLastClickedOn = function(box) {
        if($(box).hasClass("one")) {
            setValue(firstPlayerTurn, 1);
        } else if ($(box).hasClass("two")) {
            setValue(firstPlayerTurn, 2);
        } else if ($(box).hasClass("three")) {
            setValue(firstPlayerTurn, 3);
        } else if ($(box).hasClass("four")) {
            setValue(firstPlayerTurn, 4);
        } else if ($(box).hasClass("five")) {
            setValue(firstPlayerTurn, 5);
        } else if ($(box).hasClass("six")) {
            setValue(firstPlayerTurn, 6);
        } else if ($(box).hasClass("seven")) {
            setValue(firstPlayerTurn, 7);
        } else if ($(box).hasClass("eight")) {
            setValue(firstPlayerTurn, 8);
        } else if ($(box).hasClass("nine")) {
            setValue(firstPlayerTurn, 9);
        }
        //alert(board);
    }
    
    var setGamePanel = function(isPlayerOne, player) {
        if (player) {
            $(".gamepanel").html(player + " wins!");
        } else if (isPlayerOne === "Tie") {
            $(".gamepanel").html("Game over. It's a tie!");
        } else if (isPlayerOne) {
            $(".gamepanel").html("It's Player 1's turn!");
        } else {
            $(".gamepanel").html("It's Player 2's turn!");
        }
    }
    
    var determineWin = function(lastClickedOn) {
        //we need to determine if there is a winning board state
        //there are 8 different board states that result in a win
        //if it was the end of the first player's turn, examine all win posibilities that include the latest played index
        var possibleIndexes = [];
        if (lastClickedOn === 0) {
            possibleIndexes = [[1, 2], [3,6], [4,8]];
        } else if (lastClickedOn === 1) {
            possibleIndexes = [[0,2], [4,7]];
        } else if (lastClickedOn === 2) {
            possibleIndexes = [[0,1], [4,6], [5,8]];
        } else if (lastClickedOn === 3) {
            possibleIndexes = [[0,6], [4,5]];
        } else if (lastClickedOn === 4) {
            possibleIndexes = [[0,8], [1,7], [2,6], [3,5]];
        } else if (lastClickedOn === 5) {
            possibleIndexes = [[3,4], [2,8]];
        } else if (lastClickedOn === 6) {
            possibleIndexes = [[0,3], [2,4], [7,8]];
        } else if (lastClickedOn === 7) {
            possibleIndexes = [[1,4], [6,8]];
        } else if (lastClickedOn === 8) {
            possibleIndexes = [[2,5], [0,4], [6,7]];
        }
        var isWin = null;
        if (!firstPlayerTurn) {
            //do stuff with x
            isWin = findThreeInARow("x", possibleIndexes, board);
            if (isWin) {
                setGamePanel("win", "Player 1");
                return true;
            }
        }
        else {
            //do stuff with o
            isWin = findThreeInARow("o", possibleIndexes, board);
            if (isWin) {
                setGamePanel("win", "Player 2");
                return true;
            }
        }
    }
    
    $(".box").on("click", function() {
        //set the box's id to the lastClickedOn variable
        setLastClickedOn(this);
        $(this).off();
        if (firstPlayerTurn) {//it is player 1's turn
            $(this).css("background-image", "url('x.jpg')");
            firstPlayerTurn = false;
        } else {//it is player 2's turn
            $(this).css("background-image", "url('o.jpg')");
            firstPlayerTurn = true;
        }
        setGamePanel(firstPlayerTurn);
        if (turnCount >= 5) {
            var didAPlayerWin = determineWin(lastClickedOn);
            if (didAPlayerWin) {
                $(".box").off();
            }
            if (turnCount >= 9) {
                setGamePanel("Tie");
            }
            if (didAPlayerWin || turnCount >= 9) {
                //display the hidden button to reset the game
                $(".playAgain").show();
            }
        }
        turnCount++;
    })
})