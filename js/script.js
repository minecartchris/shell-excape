function startGame() {
    window.location = `http://localhost:5500/r1.html`
}

let passwordCorrect = [1,2,3,4]
let enteredpassword = []

let simonSequence = []
let simonSequenceEnterd = []
let simonClicks = 0
let simonClicks2 = 0

let connect4Grid = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],]
let connect4RowHeights = [1,1,1,1,1,1,1,1]
let roy = "red"
let winq = null
let hasWon = false

for (let index = 0; index < 42; index++) {
    connect4Grid.push(0)
}


function numberClick(number) {
    enteredpassword.push(number)
    document.getElementById("currentInput").textContent = enteredpassword
}

function removeLastNumber() {
    enteredpassword.pop()
    document.getElementById("currentInput").textContent = enteredpassword
}

function submit(type) {
    if (type === 1) {
        for (let index = 0; index < passwordCorrect.length; index++) {
            if (passwordCorrect[index] === enteredpassword[index]) {
                document.getElementById("cizerOutPut").textContent = "VQB axkknm db xo yaxpajvrwp lujbbnb. Krp bjmb rw cqn lqjc"
                document.getElementById("decoded").hidden = false
                document.getElementById("submitStr").hidden = false
            }    
        }
    } else if (type === 2) {
        let decodedStr = document.getElementById("decoded").value 
        if (decodedStr === "MHS robbed us of programing classes. Big sads in the chat") {
            alert("Nice Job You Did It")
            document.getElementById("nextRoom").hidden = false
        }
    }
}

function nextRoom(currentRoom) {
    if (currentRoom === 1) {
        window.location = 'http://localhost:5500/r2.html'
    } else if (currentRoom === 2) {
        window.location = 'http://localhost:5500/r3.html'
    }
}

function simonClick(number) {
    simonSequenceEnterd.push(number)
    
    simonClicks2++;
    let simonL = simonSequence.length
    let fail = false
    console.log(simonClicks)
    console.log(simonClicks2)
    if (simonClicks <= 4) {
        for (let index = 0; index < simonClicks2; index++) {
            if (simonSequence[index] != simonSequenceEnterd[index]) {
                simonClicks = 0
                simonSequence = []
                simonClicks2 = 0
                alert("you failed try again")
                simonLoop()
                fail = true
            }
        }
        if (!fail && simonL == simonClicks2) {

            simonClicks2 = 0
            simonLoop();
        }
    } else if (simonClicks == simonClicks2){ 
        document.getElementById("nextRoom").hidden = false
    }
    
}

if (window.location.href === "http://localhost:5500/r2.html") {
    simonLoop()
}

if (window.location.href === "http://localhost:5500/r3.html") {
    //testThingsMAybe()
    room3Setup()
}

function simonLoop() {
    simonSequenceEnterd = []
    
    simonClicks++;
    let randomSimon = Math.floor(Math.random() * 10)
    if (randomSimon > 9) {
        randomSimon = 9        
    } else if (randomSimon < 1) {
        randomSimon = 1
    }
    
    simonSequence.push(randomSimon)
    console.log(simonSequence)
    for (let index2 = 1; index2 <= 9; index2++) {
        index2 = String(index2)
        document.getElementById(index2).style.backgroundColor = "gray"
    }
    for (let index = 0; index < simonSequence.length; index++) {
        if ((index - 1) > 0) {
            index2 = String(index - 1)
            document.getElementById(simonSequence[index2]).style.backgroundColor = "gray"
        }

        index = String(index)
        
        document.getElementById(simonSequence[index]).style.backgroundColor = "blue"
        
        //document.getElementById(simonSequence[index]).style.backgroundColor = "blue"
    }

}

function addRow(row) {

    if (!(hasWon) && roy === "red") {
        document.getElementById(`${row}-${connect4RowHeights[row]}`).style.backgroundColor = roy;
        
        if (roy === "red") {
            roy = "yellow"
        } else {
            roy = "red"
        }

        for (let index = 1; index < 8; index++) {
            for (let index2 = 1; index2 < 7; index2++) {
                const element = document.getElementById(`${index}-${index2}`).style.backgroundColor
                connect4Grid[index][index2] = element
            }
            
        }

        
        let winq = checkWin()

        let calulatethings = connect4RowHeights[row]+1
        connect4RowHeights[row] = calulatethings
        minimax(connect4Grid, 5, 0, 0, true)



        if (winq === "red") {
            alert(`red Has won`)
            hasWon = true
        } else if (winq === "yellow") {
            alert(`yellow Has won`)
            hasWon = true
        }
    }
}

function checkWin() {
    const chk = (a, b, c, d) => a !== 0 && a === b && a === c && a === d;
    var board = connect4Grid
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            // Check horizontal, vertical, and both diagonals (similar to logic in)
            if (c + 3 < 7 && chk(board[r][c], board[r][c+1], board[r][c+2], board[r][c+3])) return board[r][c];
            if (r + 3 < 6 && chk(board[r][c], board[r+1][c], board[r+2][c], board[r+3][c])) return board[r][c];
            if (r + 3 < 6 && c + 3 < 7 && chk(board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3])) return board[r][c];
            if (r - 3 >= 0 && c + 3 < 7 && chk(board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3])) return board[r][c];
        }
    }
    return 0; // No winner
}
/*
function minimax(board, depth, alpha, beta, isMaximizing) {
    const validMoves = getValidMoves(board);
    const terminal = checkWin(board); // Check for win/draw

    if (depth === 0 || terminal) {
        if (terminal) {
            if (checkWin(board)=== "yellow") return 1000000;
            if (checkWin(board)=== "red") return -1000000;
            return 0; // Draw
        }
        //return evaluateBoard(board); // Your heuristic function
    }

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let col of validMoves) {
            let nextBoard = addRow(col);
            let evaluation = minimax(nextBoard, depth - 1, alpha, beta, false);
            maxEval = Math.max(maxEval, evaluation);
            // Alpha-Beta Pruning
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break; 
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let col of validMoves) {
            let nextBoard = addRow(close);
            let evaluation = minimax(nextBoard, depth - 1, alpha, beta, true);
            minEval = Math.min(minEval, evaluation);
            // Alpha-Beta Pruning
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

function evaluateBoard(player, opponent) {
    let score = 0;

    var board = connect4Grid

    // 1. Give bonus for center column pieces
    const centerArray = board.map(row => row[3]);
    const centerCount = centerArray.filter(val => val === player).length;
    score += centerCount * 3;

    // 2. Scan all horizontal, vertical, and diagonal windows of 4
    const windows = getAllWindows(board); // Helper to get all sets of 4
    windows.forEach(window => {
        score += evaluateWindow(window, player, opponent);
    });

    return score;
}

function evaluateWindow(window, player, opponent) {
    let score = 0;
    const playerCount = window.filter(v => v === player).length;
    const emptyCount = window.filter(v => v === 0).length;
    const opponentCount = window.filter(v => v === opponent).length;

    if (playerCount === 4) score += 10000;
    else if (playerCount === 3 && emptyCount === 1) score += 100;
    else if (playerCount === 2 && emptyCount === 2) score += 10;

    if (opponentCount === 3 && emptyCount === 1) score -= 80; // Blocking priority
    return score;
}

function getValidMoves(board) {
    var listOfValids = [0,0,0,0,0,0,0,0]
    for (let index = 1; index < 8; index++) {
        
        if (connect4Grid[index][4] == 0) {
            listOfValids[index] = 1
        }
    }
    return listOfValids
}


function addRow(row, isPlayer) {
    let calulatethings = connect4RowHeights[row]+1
    connect4RowHeights[row] = calulatethings

    let tmp = connect4Grid[row]
    
    console.log(connect4Grid)
    console.log(connect4RowHeights)

    if (isPlayer) {
        connect4Grid[tmp+connect4RowHeights[row]] = 1
        console.log(tmp+connect4RowHeights[row])
    } else if (!(isPlayer)) {
        connect4Grid[tmp+connect4RowHeights[row]] = 2
    }



    for (let index = 0; index < connect4Grid.length; index++) {
        const isYesPlayer = connect4Grid[index];
        const element = document.getElementById(String(index))
        if (isYesPlayer == 1 && element) {
            element.style.backgroundColor = "yellow"
        }
        if (isYesPlayer == 2 && element) {
            element.style.backgroundColor = "red"
        }
    }
}
*/
function room3Setup() {
    //later when things work maybe idk 
    
    
    //for (let index = 1; index < 7; index++) {
    //    addRow((index+7), false)
    //}
}

/* 
function testThingsMAybe() {
    
    for (let index = 1; index < 43; index++) {
        let element = document.getElementById(String(index));
        if (element) {
            element.style.backgroundColor = "green";
        }
        element = document.getElementById(String(index-1));
        if (element) {
            element.style.backgroundColor = "gray";
        }
    }
    
}
*/