define(["exports", "react"], function (exports, _react) {
  "use strict";

  var React = _react;


  var ThrowButton = React.createClass({
    displayName: "ThrowButton",


    click: function (e) {
      this.props.events_.onNext(e);
    },

    render: function () {
      var props = this.props;

      function className() {
        return "button-throw" + (props.visible ? "" : " hidden");
      }

      return React.createElement("button", {
        className: className(),
        onClick: this.click
      }, "THROW");
    }
  });

  exports["default"] = ThrowButton;
});