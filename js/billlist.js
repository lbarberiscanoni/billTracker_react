"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _bill = require("./bill");

var _bill2 = _interopRequireDefault(_bill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var currentChamber = "";

var BillList = function (_React$Component) {
    _inherits(BillList, _React$Component);

    function BillList() {
        _classCallCheck(this, BillList);

        var _this = _possibleConstructorReturn(this, (BillList.__proto__ || Object.getPrototypeOf(BillList)).call(this));

        _this.state = {
            docket: [],
            bill: "Select a Bill"
        };
        return _this;
    }

    _createClass(BillList, [{
        key: "listenForNewChamber",
        value: function listenForNewChamber() {
            var mainDB = this.props.db.child("sc").child("chambers");
            var legislation = [];
            currentChamber = this.props.location;
            mainDB.child(this.props.location).child("docket").on("child_added", function (snapshot) {
                legislation.push(snapshot.val().id);
                this.setState({ "docket": legislation });
            }.bind(this));
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            console.log("should udpate: " + this.props.location);
            if (this.props.location != currentChamber) {
                this.listenForNewChamber();
            }
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this.listenForNewChamber();
        }
    }, {
        key: "seeBill",
        value: function seeBill(id) {
            this.setState({ "bill": id });
        }
    }, {
        key: "showBill",
        value: function showBill(id) {
            if (id != "Select a Bill") {
                var mainDB = this.props.db.child("sc").child("bills");
                var billOb = "";
                mainDB.child(id).on("value", function (snapshot) {
                    billOb = snapshot.val();
                });
                return billOb;
            } else {
                return "This is where the bill info will be";
            }
        }
    }, {
        key: "changeBillStatus",
        value: function changeBillStatus(status) {
            console.log("fired");
            var mainDB = this.props.db.child("sc").child("chambers");
            mainDB.child(this.props.location).child(this.state.bill).update({ status: status });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var list_components = [];
            this.state.docket.map(function (x, i) {
                list_components.push(_react2.default.createElement(
                    "button",
                    { onClick: _this2.seeBill.bind(_this2, x) },
                    " ",
                    x
                ));
            });
            return _react2.default.createElement(
                "div",
                { className: "bill_list" },
                _react2.default.createElement(
                    "h2",
                    null,
                    " ",
                    this.props.location,
                    " "
                ),
                _react2.default.createElement(
                    "div",
                    { className: "docket" },
                    list_components
                ),
                _react2.default.createElement(
                    "div",
                    { className: "bill_visualization" },
                    _react2.default.createElement(
                        "h2",
                        null,
                        " ",
                        this.state.bill
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        "Test"
                    ),
                    _react2.default.createElement(_bill2.default, { changeBillStatus: this.changeBillStatus.bind(this), db: this.props.db, bill: this.state.bill })
                )
            );
        }
    }]);

    return BillList;
}(_react2.default.Component);

exports.default = BillList;