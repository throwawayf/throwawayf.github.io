define(["exports", "react"], function (exports, _react) {
  "use strict";

  var React = _react;


  var Score = React.createClass({
    displayName: "Score",


    render: function () {
      var className = "score " + this.props["class"];
      return React.createElement("div", {
        className: className
      }, this.props.score);
    }
  });

  exports["default"] = Score;
});