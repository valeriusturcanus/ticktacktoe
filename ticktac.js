$(document).ready(function() {
    var yourchoice = "",
        computerchoice = "";
    var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var winThreat = [
            [], false
        ],
        loseJoy = [
            [], false
        ];
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
        console.log("COMPUTER MOVE");
        console.log(loseJoy)
        console.log(winThreat)
        threatCheck()
        console.log(loseJoy);
        console.log(winThreat);
        if (loseJoy[1]) {
            for (e = 0; e < 3; e++) {
                if (board[loseJoy[0][e]] == 0) {
                    board[loseJoy[0][e]] = -1;
                    render();
                    break;
                }
            }
        } else if (winThreat[1]) {
            for (e = 0; e < 3; e++) {
                // console.log(board);
                // console.log();
                console.log(board[winThreat[0][e]]);
                if (board[winThreat[0][e]] == 0) {
                    board[winThreat[0][e]] = -1;
                    console.log(board);
                    render();
                    break;
                }
            }
        } else {
            var moveSequence = [4, 0, 2, 6, 8, 1, 3, 5, 7]
            // ---------------------------------------
            // THIS CODE IS NECESARY TO COMBAT OPOSITE SQUARES FORK WHEN COMPUTER HAS THE MIDDLE
            // AND THE PLAYER HAS 2 OPOSITE CORNERS
            var emptySquares = 0;
            for (var i = 0; i < 9; i++) {
                if (board[i] == 0) {
                    emptySquares++
                }
            }
            console.log(emptySquares);
            if (board[4] == -1 && emptySquares >= 6 &&(board[0]+board[8]==2||board[2]+board[6]==2)) {
                for (var z = 5; z < 9; z++) {
                    console.log("weaksquare");
                    if (board[moveSequence[z]] == 0) {
                        board[moveSequence[z]] = -1
                        // console.log("=computermove=");
                        // console.log(board);
                        render();
                        break;
                    }
                }
            }
            // -----------------------------------------
            else {

                for (var e = 0; e < 9; e++) {
                    if (board[moveSequence[e]] == 0) {
                        board[moveSequence[e]] = -1
                        // console.log("=computermove=");
                        // console.log(board);
                        render();
                        break;
                    }
                }
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

    function renderWinLine(arraythree) {
        $($("td")[arraythree[0]]).css("background-color", "red");
        $($("td")[arraythree[1]]).css("background-color", "red");
        $($("td")[arraythree[2]]).css("background-color", "red");
    }

    function reset() {
        $("td").css("background-color", "#555").text("");
        $(".x-or-o").css("display", "block");
        yourchoice = "";
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        gameStatus = "off";
        $(".endgame").css("display", "none");
        winThreat = [
            [], false
        ], loseJoy = [
            [], false
        ];
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
                if (total == 3) {
                    gameStatus = "won";
                    renderWinLine(winingCombinations[i]);
                    $(".endgame").css("display", "block").text("Player : " + gameStatus);
                    setTimeout(reset, 3000)
                }
                if (total == -3) {
                    gameStatus = "lost";
                    renderWinLine(winingCombinations[i]);
                    $(".endgame").css("display", "block").text("Player : " + gameStatus);
                    setTimeout(reset, 2000)
                }
            }
            var movesleft = 0;
            for(var e = 0;e<9;e++){
                if(board[e]==0){
                    movesleft++;
                }
            }
            if (movesleft==0){
                gameStatus = "off";
                $(".endgame").css("display", "block").text("Player : " + "Tied");
                setTimeout(reset, 2000)
            }
        }
    }

    function threatCheck() {
        for (var i = 0; i < 8; i++) {
            var total = 0;
            for (var e = 0; e < 3; e++) {
                // console.log(winingCombinations[i]);
                total += board[winingCombinations[i][e]]
            };
            if (total == 2) {
                winThreat[0] = winingCombinations[i];
                winThreat[1] = true;
                break;
            }
            if (total == -2) {
                loseJoy[0] = winingCombinations[i];
                loseJoy[1] = true;
                break;
            } else {
                console.log("Assign threats to false");
                winThreat = [
                    [], false
                ], loseJoy = [
                    [], false
                ];
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
            computermove();
        }
    });


    $("td").click(function() {
        if (yourchoice.length == 1 && gameStatus == "on") {
            var squareIndex = $(this).attr("class");
            if (board[squareIndex] == 0) {
                board[squareIndex] = 1;
                winLostCeck();
                if (gameStatus == "on") {
                    computermove();
                    winLostCeck();
                }
                render();
            }
        }
    });
    // $("#reset").click(reset);

});
// NEED TO MAKE AN BOARD ARRAY MAKE THE TIKTAKTOE TO RENDER ACORDING TO THE BOARD
