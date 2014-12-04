define(["exports", "rx"], function (exports, _rx) {
  "use strict";

  var Rx = _rx;


  var StateCarrier = {
    create: function (state) {
      var data_ = new Rx.BehaviorSubject(Object.freeze(state));
      var update_ = new Rx.Subject();

      update_.combineLatest(data_, function (update, state) {
        return ({ update: update, state: state });
      }).sample(update_).map(function (c) {
        return Object.freeze(Object.assign({}, c.state, c.update));
      }).share().multicast(data_).connect();

      return {
        data_: data_,
        update_: update_
      };
    }
  };

  exports["default"] = StateCarrier;
});