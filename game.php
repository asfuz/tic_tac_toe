<?php
session_start();
?>
<!DOCTYPE html>
<html>

<head>
  <title>Tic tac toe</title>
  <meta charset="utf-8">
  <meta name="author" content="dplusplus" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"> </script>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <link rel="stylesheet" type="text/css" href="styles.css">
</head>

<body>
  <div>
    <h1> Tic Tac Toe Game</h1>
    <h1 class="div">
      <?php
      require_once 'DB.php';
      app\DB::connect();
      $game = app\DB::get_game_by_id($_GET['id']);
      $_SESSION['pl_name'] = $game['pl_name'];
      $_SESSION['pl2_name'] = $game['pl2_name'];
      $txt = $game['pl_name'] . ' VS ' . $game['pl2_name'];
      echo $txt;
      ?>
    </h1>
  </div>
  <div class="wrap" id="wrap" hidden="hidden">
    <header>

      <div id="x_win"> <i class="fa fa-times" aria-hidden="true"> </i>
        <div id="xx"> wins </div>
      </div>
      <div id="o_win"> <i class="fa fa-circle-o" aria-hidden="true"></i>
        <div id="ooo"> wins </div>
      </div>
      <div id="draws"> <i class="fa fa-balance-scale" aria-hidden="true"></i>
        <div id="draw0"> draws</div>
      </div>

    </header>
    <table id="board">
      <tr>
        <td class="cell" id="cell_1" onclick="cell_click('cell_1');"></td>
        <td class="cell" id="cell_2" onclick="cell_click('cell_2');"></td>
        <td class="cell" id="cell_3" onclick="cell_click('cell_3');"></td>
      </tr>
      <tr>
        <td class="cell" id="cell_4" onclick="cell_click('cell_4');"></td>
        <td class="cell" id="cell_5" onclick="cell_click('cell_5');"></td>
        <td class="cell" id="cell_6" onclick="cell_click('cell_6');"></td>

      </tr>
      <tr>
        <td class="cell" id="cell_7" onclick="cell_click('cell_7');"></td>
        <td class="cell" id="cell_8" onclick="cell_click('cell_8');"></td>
        <td class="cell" id="cell_9" onclick="cell_click('cell_9');"></td>

      </tr>
    </table>

    <footer>

      <label class="toggleXO">
        <input id="myCheckBox" type="checkbox" onclick="switchxo();">
        <span class="slider"></span>
      </label>

      <div id="around">
        <button id="butt_reset" onclick="reset(), button();" value="RESET"> <i class="fa fa-refresh " aria-hidden="true"></i> </button>
      </div>
      <h3 id="result"> #result </h3>
    </footer>
  </div>

  <h1>Ball Game</h1>
  <button id="btnJoin">Join Game</button>


  <script>
    //HTML elements
    let clientId = "<?= $_SESSION['name'] ?? 'null' ?>";
    let gameId = <?= $_GET['id'] ?? 'null' ?>;

    let ws = new WebSocket("ws://localhost:9090");
    const btnJoin = document.getElementById("btnJoin");

    //wiring events
    btnJoin.addEventListener("click", (e) => {
      if (gameId === null) gameId = "<?= $_GET['id'] ?>";

      let wrap = document.getElementById('wrap');
      wrap.removeAttribute("hidden");

      const payLoad = {
        method: "join",
        clientId: clientId,
        game: {
          gameId: gameId,
          player: '1',
        }
      };
      ws.send(JSON.stringify(payLoad));
    });

    ws.onmessage = (message) => {
      //message.data
      const response = JSON.parse(message.data);
      //connect
      if (response.method === "connect") {
        clientId = response.clientId;
        console.log("Client id Set successfully " + clientId);
      }


      //update
      if (response.method === "update") {
        //{1: "red", 1}
        if (!response.game.state) return;
        for (const b of Object.keys(response.game.state)) {
          cell_click_js(response.game, clientId);
        }
      }

      //join
      if (response.method === "join") {
        const game = response.game;
        gameId = <?= $_GET['id'] ?>;

      }
    };


    function cell_click(cell) {
      const payLoad = {
        method: "play",
        clientId: clientId,
        gameId: gameId,
        cell: cell,
      };
      ws.send(JSON.stringify(payLoad))
    }
  </script>
  <?php
  require_once 'javascript.php';
  ?>
  <!-- <script type="text/javascript" src="javascript.js"></script> -->
</body>

</html>