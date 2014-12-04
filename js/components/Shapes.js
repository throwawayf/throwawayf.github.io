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

      function className(shape) {
        return shape.key + (shape.key === props.selected ? " selected" : "");
      }

      var buttons = props.shapes.map(function (shape) {
        return React.createElement("button", {
          key: shape.key,
          className: className(shape),
          onClick: _this.click(shape.key)
        }, shape.name);
      });

      return React.createElement("div", {
        className: "buttons"
      }, buttons);
    }
  });

  exports["default"] = Buttons;
});