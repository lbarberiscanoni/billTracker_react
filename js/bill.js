"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bill = function (_React$Component) {
    _inherits(Bill, _React$Component);

    function Bill() {
        _classCallCheck(this, Bill);

        return _possibleConstructorReturn(this, (Bill.__proto__ || Object.getPrototypeOf(Bill)).apply(this, arguments));
    }

    _createClass(Bill, [{
        key: "showBill",
        value: function showBill(id) {
            var _this2 = this;

            if (id != "Select a Bill") {
                var _ret = function () {
                    var mainDB = _this2.props.db.child("sc").child("bills");
                    var billOb = "";
                    mainDB.child(id).on("value", function (snapshot) {
                        billOb = snapshot.val();
                    });
                    var bill_components = [];
                    Object.keys(billOb).map(function (x) {
                        bill_components.push(_react2.default.createElement(
                            "p",
                            null,
                            " ",
                            billOb[x],
                            " "
                        ));
                    });
                    return {
                        v: bill_components
                    };
                }();

                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            } else {
                return "This is where the bill info will be";
            }
        }
    }, {
        key: "evalBill",
        value: function evalBill(status) {
            this.props.changeBillStatus(status);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.bill != "Select a Bill") {
                return _react2.default.createElement(
                    "div",
                    null,
                    this.showBill(this.props.bill),
                    _react2.default.createElement(
                        "button",
                        { onClick: this.evalBill.bind(this, "failed") },
                        "Fail"
                    ),
                    _react2.default.createElement(
                        "button",
                        { onClick: this.evalBill.bind(this, "passed") },
                        "Pass"
                    )
                );
            } else {
                return _react2.default.createElement("div", null);
            }
        }
    }]);

    return Bill;
}(_react2.default.Component);

exports.default = Bill;