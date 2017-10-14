$(document).ready(function() {
    var yourchoice = "", computerchoice = "";
    var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var winThreat = [[],false], loseJoy = [[],false];
    var gameStatus = "off" //   COULD BE OFF ON WON OR LOST
    var winingCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function computermove() {
        for (var e = 0; e < 9; e++) {
            if (board[e] == 0) {
                board[e] = -1
                // console.log("=computermove=");
                // console.log(board);
                break;
            }
        }
    }

    function render() {
        for (var e = 0; e < 9; e++) {
            if (board[e] == 1) {
                $($("td")[e]).text(yourchoice);

            }
            if (board[e] == -1) {
                $($("td")[e]).text(computerchoice);

            }
        }
    }

    function renderWinLine(arraythree){
        $($("td")[arraythree[0]]).css("background-color","red");
        $($("td")[arraythree[1]]).css("background-color","red");
        $($("td")[arraythree[2]]).css("background-color","red");
    }

    function reset() {
        $("td").css("background-color", "#555").text("");
        $(".x-or-o").css("display", "block");
        yourchoice = "";
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        gameStatus = "off";
    };

    function winLostCeck() {
        if (gameStatus == "on") {
            for (var i = 0; i < 8; i++) {
                var total = 0;
                for (var e = 0; e < 3; e++) {
                    // console.log(winingCombinations[i]);
                    total += board[winingCombinations[i][e]]
                };
                // console.log(total);
                if (total == 3){
                    gameStatus = "won";
                    renderWinLine(winingCombinations[i]);
                }
                if (total == -3){
                    gameStatus = "lost";
                    renderWinLine(winingCombinations[i]);
                }

            }
        }
    }

    $(".choice").click(function() {
        yourchoice = $(this).text();
        gameStatus = "on";
        $(".x-or-o").css("display", "none");
        if (yourchoice == "X") {
            computerchoice = "O";
        } else {
            computerchoice = "X";
        }
    });


    $("td").click(function() {
        if (yourchoice.length == 1 && gameStatus == "on") {
            var squareIndex = $(this).attr("class");
            board[squareIndex] = 1;
            winLostCeck();
            if (gameStatus =="on"){
                computermove();
                winLostCeck();
            }
            render();
        }
    });
    $("#reset").click(reset);

});
// NEED TO MAKE AN BOARD ARRAY MAKE THE TIKTAKTOE TO RENDER ACORDING TO THE BOARD
