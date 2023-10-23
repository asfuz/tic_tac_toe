function dd(data, text = "debug") {
  console.log(text);
  console.log(data);
}
const http = require("http");
const app = require("express")();
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.listen(9091, () => console.log("Listening on http port 9091"));
const websocketServer = require("websocket").server;
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"));
//hashmap clients
const clients = {};
const games = {};
const turn = {};

const wsServer = new websocketServer({
  httpServer: httpServer,
});
wsServer.on("request", (request) => {
  //connect
  const connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("opened!"));
  connection.on("close", () => console.log("closed!"));
  connection.on("message", (message) => {
    const result = JSON.parse(message.utf8Data);
    //I have received a message from the client
    //a user want to create a new game

    //a client want to join
    if (result.method === "join") {
      const con = clients[result.clientId].connection;

      const clientId = result.clientId;
      const gameId = result.game.gameId;
      if (typeof gameId == "undefined") {
        console.log("ERROR: game not found");
      }
      if (games[gameId] == undefined) {
        games[gameId] = {
          id: gameId,
        };
      }

      if (typeof games[gameId].clients == "undefined") {
        games[gameId] = {
          id: gameId,
          clients: [],
        };
        if (typeof games[gameId.state == "undefined"]) {
          let state = games[gameId].state;
          if (!state) state = {};
          state["cell"] = "denied";
          games[gameId].state = state;
        }
      }

      //start the game
      // if (game.clients.length === 3) updateGameState();
      games[gameId].clients.push({
        clientId: clientId,
      });

      const payLoad = {
        method: "join",
        game: games[gameId],
      };
      //loop through all clients and tell them that people has joined
      games[gameId].clients.forEach((c) => {
        clients[c.clientId].connection.send(JSON.stringify(payLoad));
      });

      updateGameState();
    }
    //a user plays
    if (result.method === "play") {
      const gameId = result.gameId;
      let state = games[gameId].state;
      if (!state) state = {};
      state["cell"] = result.cell;
      games[gameId].state = state;
    }
    if (result.method === "player") {
      const gameId = result.gameId;
        let state = games[gameId].state;
        if (!state) state = {};
        state["cell"] = result.cell;
        games[gameId].state = state;
        games[gameId].player = result.player;
    }
  });
  console.log(request);
  //generate a new clientId
  const clientId = guid();
  clients[clientId] = {
    connection: connection,
  };

  const payLoad = {
    method: "connect",
    clientId: clientId,
  };
  //send back the client connect
  connection.send(JSON.stringify(payLoad));
});

function updateGameState() {
  //{"gameid", fasdfsf}
  for (const g of Object.keys(games)) {
    if (games[g].state["cell"] != "denied") {
      const game = games[g];
      const payLoad = {
        method: "update",
        game: game,
      };

      game.clients.forEach((c) => {
        clients[c.clientId].connection.send(JSON.stringify(payLoad));
      });
    }
  }

  setTimeout(updateGameState, 1000);
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const guid = () =>
  (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
