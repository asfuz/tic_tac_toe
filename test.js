
// Function to add two variables.
// build tictactoe game


let gameactive= true
let player1score = 0;
let player2score = 0;

let player1 = "X";
let player2 = "O";
let currentPlayer = player1;
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

function reset(){
    board = [["","",""],["","",""],["","",""]];
    document.getElementById("cell-0").innerHTML="";
    document.getElementById("cell-1").innerHTML="";
    document.getElementById("cell-2").innerHTML="";
    document.getElementById("cell-3").innerHTML="";
    document.getElementById("cell-4").innerHTML="";
    document.getElementById("cell-5").innerHTML="";
    document.getElementById("cell-6").innerHTML="";
    document.getElementById("cell-7").innerHTML="";
    document.getElementById("cell-8").innerHTML="";

   
}



function NewGame(){
document.getElementById("player1score").innerHTML = "Player 1 : 0"
document.getElementById("player2score").innerHTML = "Player 2 : 0"
document.getElementById("reset").style.display = "none";

gameactive= true
countdown()
document.getElementById("cell-0").addEventListener("click",function(){
    console.log("cell-0 clicked");
    if(board[0][0] == "" && gameactive){
        document.getElementById("cell-0").innerHTML = currentPlayer;
        if(currentPlayer == player1){
            currentPlayer = player2;
            document.getElementById("cell-0").innerHTML="X";
            board[0][0] = "X";
        }else{
            currentPlayer = player1;
            document.getElementById("cell-0").innerHTML="O";
            board[0][0] = "O";
        }document.getElementById("winner").innerHTML= checkWinner();
    }
});
document.getElementById("cell-1").addEventListener("click",function(){
    if(board[0][1] == "" && gameactive){
        document.getElementById("cell-1").innerHTML = currentPlayer;
        if(currentPlayer == player1){
            currentPlayer = player2;
            document.getElementById("cell-1").innerHTML="X";
            board[0][1] = "X";
        }else{
            currentPlayer = player1;
            document.getElementById("cell-1").innerHTML="O";
            board[0][1] = "O";
        }document.getElementById("winner").innerHTML= checkWinner();
    }
});
document.getElementById("cell-2").addEventListener("click",function(){
   if(board[0][2] == "" && gameactive){
        document.getElementById("cell-2").innerHTML = currentPlayer;
        if(currentPlayer == player1){
            currentPlayer = player2;
            document.getElementById("cell-2").innerHTML="X";
            board[0][2] = "X";

        }else{
            currentPlayer = player1;
            document.getElementById("cell-2").innerHTML="O";
            board[0][2] = "O";
        }document.getElementById("winner").innerHTML= checkWinner();
    }
}); 
document.getElementById("cell-3").addEventListener("click",function(){
    if(board[1][0] == "" && gameactive){
        document.getElementById("cell-3").innerHTML = currentPlayer;
        if(currentPlayer == player1){
            currentPlayer = player2;
            document.getElementById("cell-3").innerHTML="X";
            board[1][0] = "X";
        }else{
            currentPlayer = player1;
            document.getElementById("cell-3").innerHTML="O";
            board[1][0] = "O";
        }document.getElementById("winner").innerHTML= checkWinner();
    }
});
document.getElementById("cell-4").addEventListener("click",function(){
    if(board[1][1] == "" && gameactive){
        document.getElementById("cell-4").innerHTML = currentPlayer;
        if(currentPlayer == player1){
            currentPlayer = player2;
            document.getElementById("cell-4").innerHTML="X";
            board[1][1] = "X";
        }else{
            currentPlayer = player1;
            document.getElementById("cell-4").innerHTML="O";
            board[1][1] = "O";
        }document.getElementById("winner").innerHTML= checkWinner();
    }
});
document.getElementById("cell-5").addEventListener("click",function(){
   if(board[1][2] == "" && gameactive){
    document.getElementById("cell-5").innerHTML = currentPlayer;
    if(currentPlayer == player1){
        currentPlayer = player2;
        document.getElementById("cell-5").innerHTML="X";
        board[1][2] = "X";
    }else{
        currentPlayer = player1;
        document.getElementById("cell-5").innerHTML="O";
        board[1][2] = "O";
    }document.getElementById("winner").innerHTML= checkWinner();
}
});
document.getElementById("cell-6").addEventListener("click",function(){
    if(board[2][0] == "" && gameactive){
    document.getElementById("cell-6").innerHTML = currentPlayer;
    if(currentPlayer == player1){
        currentPlayer = player2;
        document.getElementById("cell-6").innerHTML="X";
        board[2][0] = "X";
    }else{
        currentPlayer = player1;
        document.getElementById("cell-6").innerHTML="O";
        board[2][0] = "O";
    }document.getElementById("winner").innerHTML= checkWinner();
}
});
document.getElementById("cell-7").addEventListener("click",function(){
    if(board[2][1] == "" && gameactive){
    document.getElementById("cell-7").innerHTML = currentPlayer;
    if(currentPlayer == player1){
        currentPlayer = player2;
        document.getElementById("cell-7").innerHTML="X";
        board[2][1] = "X";
    }else{
        currentPlayer = player1;
        document.getElementById("cell-7").innerHTML="O";
        board[2][1] = "O";
    }
    document.getElementById("winner").innerHTML= checkWinner();
}
});
document.getElementById("cell-8").addEventListener("click",function(){
    if(board[2][2] == "" && gameactive){
    document.getElementById("cell-8").innerHTML = currentPlayer;
    if(currentPlayer == player1){
        currentPlayer = player2;
        document.getElementById("cell-8").innerHTML="X";
        board[2][2] = "X";
    }else{
        currentPlayer = player1;
        document.getElementById("cell-8").innerHTML="O";
        board[2][2] = "O";
    }
    document.getElementById("winner").innerHTML= checkWinner();
    }
});


}







// functionn to know who is the winner
function checkWinner(){
    if(board[0][0] == board[0][1] && board[0][0] == board[0][2] && board[0][0] != ""){
        if(board[0][0] == "X"){
            reset();
            player1score++;
            
            document.getElementById("player1score").innerHTML = "Player 1 :"+player1score;
            return "Player 1 wins";
        }
        else{
            reset();
            player2score++;
            
            document.getElementById("player2score").innerHTML = "Player 2 :"+player2score;
            return "Player 2 wins";
        }
        
    }
    else if(board[1][0] == board[1][1] && board[1][0] == board[1][2] && board[1][0] != ""){
        if(board[1][0] == "X"){
            reset();
            player1score++;
            
            document.getElementById("player1score").innerHTML = "Player 1 :"+player1score;
            return "Player 1 wins";
        }
        else{
            reset();
            player2score++;
            
            document.getElementById("player2score").innerHTML = "Player 2 :"+player2score;
            return "Player 2 wins";
        }
        
    }
    else if(board[2][0] == board[2][1] && board[2][0] == board[2][2] && board[2][0] != ""){
        if(board[2][0] == "X"){
            reset();
            player1score++;
            
            document.getElementById("player1score").innerHTML = "Player 1 :"+player1score;

            return "Player 1 wins";
        }
        else{
            reset();
            player2score++;
            
            document.getElementById("player2score").innerHTML = "Player 2 :"+player2score;
            return "Player 2 wins";
        }
        
        
    }
    else if(board[0][0] == board[1][0] && board[0][0] == board[2][0] && board[0][0] != ""){
        if(board[0][0] == "X"){
            reset();
            player1score++
            
            document.getElementById("player1score").innerHTML = "Player 1 :"+player1score;
            return "Player 1 wins";
        }
        else{
            reset();
            player2score++;
            
            document.getElementById("player2score").innerHTML = "Player 2 :"+player2score;
            return "Player 2 wins";
        }
        
        
    }
    else if(board[0][1] == board[1][1] && board[0][1] == board[2][1] && board[0][1] != ""){
        if(board[0][1] == "X"){
            reset();
            player1score++;
            
            document.getElementById("player1score").innerHTML = "Player 1 :"+player1score;
            return "Player 1 wins";
        }
        else{
            reset();
            player2score++;
            
            document.getElementById("player2score").innerHTML = "Player 2 :"+player2score;
            return "Player 2 wins";
        }
        
        
        
    }
    else if(board[0][2] == board[1][2] && board[0][2] == board[2][2] && board[0][2] != ""){
        if(board[0][2] == "X"){
            reset();
            player1score++;
            document.getElementById("player1score").innerHTML = "Player 1 :"+player1score;
            return "Player 1 wins";
        }
        else{
            reset();
            player2score++;
            document.getElementById("player2score").innerHTML = "Player 2 :"+player2score;
            return "Player 2 wins";
        }
        
        
        
    }
    else if(board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != ""){
        if(board[0][0] == "X"){
            reset();
            player1score++;
            document.getElementById("player1score").innerHTML = "Player 1 :"+player1score;
            return "Player 1 wins";
        }
        else{
            reset();
            player2score++;
            document.getElementById("player2score").innerHTML = "Player 2 :"+player2score;
            return "Player 2 wins";
        }
        
        
        
        
    }
    else if(board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] != ""){
        if(board[0][2] == "X"){
            reset();
            player1score++;
            document.getElementById("player1score").innerHTML = "Player 1 :"+player1score;
            return "Player 1 wins";
        }
        else{
            reset();
            player2score++;
            document.getElementById("player2score").innerHTML = "Player 2 :"+player2score;
            return "Player 2 wins";
        }
        
        
        
    } else if(checkroundDraw()){
        reset();
        return "Round Draw";
    }
    return "";
}

function checkroundDraw(){
let count=0;
console.log(board);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == 'X' || board[i][j] == 'O') {
                count++;
                console.log(count);
            }
        }
    }
    if(count===9){
        
        return true;

    }else{
        return false;
}

}


function countdown() {
    var seconds = 180;
    

    function tick() {
        if (gameactive == true){
        seconds = seconds - 1;
        document.getElementById("countdown").innerHTML =  Math.floor(seconds/60)+":"+seconds%60;

        setTimeout(tick, 1000);
        if( seconds === 0 ) {
            gameactive = false;
            document.getElementById("countdown").innerHTML = "Game Over";
            document.getElementById("reset").style.display = "block";
             
            if (player1score > player2score){
                document.getElementById("winner").innerHTML= "Player 1 Wins";

                window.alert("Player 1 Wins");
                reset(); 
                player1score = 0;
                player2score = 0;
        
            }
            else if(player1score < player2score){
                document.getElementById("winner").innerHTML= "Player 2 Wins";
                window.alert("Player 2 Wins");
                reset();
                player1score = 0;
                 player2score = 0;
            }else{
                document.getElementById("winner").innerHTML= "Draw";
                window.alert("Draw");
                reset();
                player1score = 0;
             player2score = 0;
            }
        }
    }}
    tick();
}
NewGame()
document.getElementById("reset").addEventListener("click", NewGame);