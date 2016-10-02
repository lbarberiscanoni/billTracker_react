"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _navBar = require("./navBar");

var _navBar2 = _interopRequireDefault(_navBar);

var _billList = require("./billList");

var _billList2 = _interopRequireDefault(_billList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = {
    apiKey: "AIzaSyCo3hTb4DBGevf-S-gMY2rl9kaX-C-xCJQ",
    authDomain: "yig-bill-tracker-25f48.firebaseapp.com",
    databaseURL: "https://yig-bill-tracker-25f48.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "172764194693"
};

var mainApp = _firebase2.default.initializeApp(config);
var mainDB = mainApp.database().ref();

var getFromFirebase = function getFromFirebase(db_selected) {
    var results = [];
    _jquery2.default.ajax({
        async: false,
        url: "https://yig-bill-tracker-25f48.firebaseio.com/sc/" + db_selected + "/.json",
        dataType: "json",
        cache: false,
        success: function success(data) {
            results = data;
        }
    });
    return results;
};

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            userID: "",
            userLevel: "clerk",
            location: "senate",
            logStatus: "in"
        };
        return _this;
    }

    _createClass(App, [{
        key: "addBill",
        value: function addBill(bill) {
            console.log(bill);
            mainDB.child("bills").push(bill);
            console.log("success");
        }
    }, {
        key: "navigate",
        value: function navigate(new_location) {
            this.setState({ "location": new_location });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.logStatus == "in") {
                return _react2.default.createElement(
                    "div",
                    { className: "mainContainer" },
                    _react2.default.createElement(
                        "h1",
                        null,
                        "[",
                        this.state.userLevel,
                        "] ",
                        this.state.location
                    ),
                    _react2.default.createElement(_navBar2.default, { db: mainDB, navigate: this.navigate.bind(this), user: this.state.userLevel, addBill: this.addBill.bind(this) }),
                    _react2.default.createElement(_billList2.default, { db: mainDB, location: this.state.location, user: this.state.userLevel })
                );
            } else {
                return _react2.default.createElement(
                    "h1",
                    null,
                    "Who are you"
                );
            }
        }
    }]);

    return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById("main"));