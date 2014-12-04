define(["exports", "rx", "react", "./components/Buttons", "./components/ThrowButton", "./components/Shape", "./components/Score", "./components/Announcement", "./utils"], function (exports, _rx, _react, _componentsButtons, _componentsThrowButton, _componentsShape, _componentsScore, _componentsAnnouncement, _utils) {
  "use strict";

  var Rx = _rx;
  var React = _react;
  var Buttons = _componentsButtons["default"];
  var ThrowButton = _componentsThrowButton["default"];
  var Shape = _componentsShape["default"];
  var Score = _componentsScore["default"];
  var Announcement = _componentsAnnouncement["default"];
  var utils = _utils["default"];
  function app(config, container) {
    var rounds = 10;
    var getScore = utils.getScore(config.matrix);

    var initialState = {
      player1Shape: null,
      player2Shape: null,
      result: "",
      score: {
        player1: 0,
        player2: 0
      },
      counter: 0,
      winner: null,
      shapesVisible: false
    };

    var buttonEvents_ = new Rx.Subject();

    var score_ = new Rx.BehaviorSubject({
      player1: 0,
      player2: 0
    });

    var updateScore_ = new Rx.Subject();

    var reset_ = new Rx.Subject();
    var gameResult_ = new Rx.BehaviorSubject("");

    // reset the score
    reset_.map(function () {
      return ({
        player1: 0,
        player2: 0
      });
    }).multicast(score_).connect();

    updateScore_.combineLatest(score_, function (update, score) {
      return ({ update: update, score: score });
    }).sample(updateScore_).map(function (c) {
      return ({
        player1: c.score.player1 + c.update.player1,
        player2: c.score.player2 + c.update.player2
      });
    }).multicast(score_).connect();

    var player1Selection_ = buttonEvents_
    // good usecase for skipIf operator
    .combineLatest(gameResult_, function (click, gameResult) {
      return ({ click: click, gameResult: gameResult });
    }).sample(buttonEvents_).filter(function (c) {
      return c.gameResult === "";
    }).map(function (c) {
      return c.click;
    }).take(1).merge(Rx.Observable.empty().delay(2500)).repeat();

    var player2Selection_ = player1Selection_.map(function (e) {
      return utils.getRandomShape(config.shapes).key;
    }).share();

    var result_ = player1Selection_.zip(player2Selection_, getScore);

    var winner_ = result_.map(function (result) {
      if (result.player1 === 1) return "player1";
      if (result.player2 === 1) return "player2";
      return null;
    }).delay(500).merge(result_.map(function () {
      return null;
    })).shareValue(null);

    var endOfThrow_ = result_.delay(1500);
    endOfThrow_.multicast(updateScore_).connect();

    var counter_ = endOfThrow_
    // hack
    .merge(reset_).scan(0, function (aggr, reset) {
      if (reset === null) return 0;
      return aggr + 1;
    }).shareValue(0);

    var endOfGame_ = counter_.filter(function (count) {
      return count === rounds;
    });

    endOfGame_.combineLatest(result_, function (_, result) {
      if (result.player1 > result.player2) return "win";
      if (result.player2 > result.player1) return "lose";
      return "draw";
    }).sample(endOfGame_).merge(reset_.map(function () {
      return "";
    })).multicast(gameResult_).connect();

    endOfGame_.map(function () {
      return null;
    }).delay(2000).multicast(reset_).connect();

    var shapesVisible_ = result_.map(function () {
      return true;
    }).merge(endOfThrow_.map(function () {
      return false;
    })).shareValue(false);

    var player1Shape_ = player1Selection_.shareValue(initialState.player1Shape);

    var player2Shape_ = player2Selection_.shareValue(initialState.player2Shape);

    /*
      Assemble view state
    */
    var state_ = player1Shape_.combineLatest(player2Shape_, counter_, winner_, shapesVisible_, score_, gameResult_, function (player1Shape, player2Shape, counter, winner, shapesVisible, score, gameResult) {
      return ({
        player1Shape: player1Shape,
        player2Shape: player2Shape,
        counter: counter,
        winner: winner,
        shapesVisible: shapesVisible,
        score: score,
        result: gameResult
      });
    }).shareValue(initialState);

    /*
      Render
    */
    state_.subscribe(function (state) {
      var buttonsVisible = !state.shapesVisible && state.result === "";

      React.render(React.createElement("div", null, React.createElement("div", {
        className: "counter"
      }, state.counter, "/", rounds), React.createElement(Announcement, {
        result: state.result
      }), React.createElement(Score, {
        "class": "player1",
        score: state.score.player1
      }), React.createElement(Score, {
        "class": "player2",
        score: state.score.player2
      }), React.createElement(Buttons, {
        events_: buttonEvents_,
        visible: buttonsVisible,
        shapes: config.shapes
      }), React.createElement(Shape, {
        shape: state.player1Shape,
        isWinner: state.winner === "player1",
        isLoser: state.winner === "player2",
        isDraw: state.winner === null,
        visible: state.shapesVisible,
        "class": "player1"
      }), React.createElement(Shape, {
        shape: state.player2Shape,
        isWinner: state.winner === "player2",
        isLoser: state.winner === "player1",
        isDraw: state.winner === null,
        visible: state.shapesVisible,
        "class": "player2"
      })), container);
    });
  }
  exports["default"] = app;
});