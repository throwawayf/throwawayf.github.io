define(["exports", "react"], function (exports, _react) {
  "use strict";

  var React = _react;


  var Buttons = React.createClass({
    displayName: "Buttons",


    click: function (shape) {
      return function (e) {
        this.props.events_.onNext(shape);
      }.bind(this);
    },

    render: function () {
      var _this = this;
      var props = this.props;
      var visibleClass = this.props.visible ? "" : "hidden";
      var containerClass = ["buttons", visibleClass].join(" ");

      var buttons = props.shapes.map(function (shape) {
        return React.createElement("button", {
          key: shape.key,
          className: shape.key,
          onClick: _this.click(shape.key)
        }, shape.name);
      });

      return React.createElement("div", {
        className: containerClass
      }, buttons);
    }
  });

  exports["default"] = Buttons;
});