define(["exports", "react"], function (exports, _react) {
  "use strict";

  var React = _react;


  var Shape = React.createClass({
    displayName: "Shape",


    render: function () {
      var shapeClass = this.props.shape !== null ? this.props.shape : "";
      var resultClass = "";
      var hiddenClass = this.props.visible ? "" : "hidden";

      if (this.props.isWinner === true) {
        resultClass = "winner";
      }

      if (this.props.isLoser === true) {
        resultClass = "loser";
      }

      var classes = ["shape-box", this.props["class"], shapeClass, resultClass, hiddenClass];
      var className = classes.join(" ");

      return React.createElement("div", {
        className: className
      });
    }
  });

  exports["default"] = Shape;
});