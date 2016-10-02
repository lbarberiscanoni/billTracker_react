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

var NavBar = function (_React$Component) {
    _inherits(NavBar, _React$Component);

    function NavBar() {
        _classCallCheck(this, NavBar);

        var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this));

        _this.state = {
            chambers: []
        };
        return _this;
    }

    _createClass(NavBar, [{
        key: "generateRandomBill",
        value: function generateRandomBill() {
            var randomText = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            var randomBill = {
                author1: randomText,
                author2: randomText,
                author1Location: "none",
                author2Location: "none",
                billLocation: "none",
                billStatus: "none",
                billText: randomText,
                billTitle: randomText,
                division: "upper",
                governorEval: "none",
                rocketDocketStatus: "none",
                school: "riverside",
                sponsor: "none"
            };
            this.props.addBill(randomBill);
        }
    }, {
        key: "navigate",
        value: function navigate(location) {
            this.props.navigate(location);
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            var mainDB = this.props.db.child("sc").child("chambers");
            var chamberList = [];
            mainDB.on("child_added", function (snapshot) {
                chamberList.push(snapshot.key);
                this.setState({ "chambers": chamberList });
            }.bind(this));
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _ret = function () {
                switch (_this2.props.user) {
                    case "director":
                        return {
                            v: _react2.default.createElement(
                                "nav",
                                null,
                                _react2.default.createElement(
                                    "button",
                                    null,
                                    "HOME"
                                ),
                                _react2.default.createElement(
                                    "button",
                                    { onClick: _this2.generateRandomBill.bind(_this2) },
                                    "Add Bill"
                                )
                            )
                        };
                    case "clerk":
                        var nav_components = [];
                        _this2.state.chambers.map(function (x, i) {
                            nav_components.push(_react2.default.createElement(
                                "button",
                                { onClick: _this2.navigate.bind(_this2, x) },
                                " ",
                                x,
                                " "
                            ));
                        });
                        return {
                            v: _react2.default.createElement(
                                "nav",
                                null,
                                nav_components
                            )
                        };
                    case "governor":
                        return {
                            v: _react2.default.createElement("nav", null)
                        };
                    case "resource_staff":
                        return {
                            v: _react2.default.createElement("nav", null)
                        };
                }
            }();

            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
    }]);

    return NavBar;
}(_react2.default.Component);

exports.default = NavBar;