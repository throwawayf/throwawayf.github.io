define(["exports", "react", "../utils"], function (exports, _react, _utils) {
  "use strict";

  var React = _react;
  var utils = _utils["default"];


  var Announcement = React.createClass({
    displayName: "Announcement",


    render: function () {
      var classes = utils.cx({
        announcement: true,
        hidden: this.props.result === "",
        win: this.props.result === "win",
        draw: this.props.result === "draw",
        lose: this.props.result === "lose"
      });

      var text = ({
        win: "You Win!",
        draw: "Draw!",
        lose: "You Lose!"
      })[this.props.result];

      return React.createElement("div", {
        className: classes
      }, text);
    }
  });

  exports["default"] = Announcement;
});