import $ from "jquery";
import firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./navBar";
import BillList from "./billList";

let config = {
    apiKey: "AIzaSyCo3hTb4DBGevf-S-gMY2rl9kaX-C-xCJQ",
    authDomain: "yig-bill-tracker-25f48.firebaseapp.com",
    databaseURL: "https://yig-bill-tracker-25f48.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "172764194693"
};

let mainApp = firebase.initializeApp(config);
let mainDB = mainApp.database().ref()

let getFromFirebase = function(db_selected) {
    let results = []
    $.ajax({
        async: false,
        url: "https://yig-bill-tracker-25f48.firebaseio.com/sc/" + db_selected + "/.json",
        dataType: "json",
        cache: false,
        success: function(data) {
            results = data
        }
    })
    return results
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            userID: "",
            userLevel: "clerk",
            location: "senate",
            logStatus: "in",
        }
    }

    addBill(bill) {
        console.log(bill);
        mainDB.child("bills").push(bill);
        console.log("success");
    }

    navigate(new_location) {
        this.setState({"location": new_location});
    }

    render() {
        if (this.state.logStatus == "in") {
            return(
                <div className="mainContainer">
                    <h1>[{ this.state.userLevel }] { this.state.location }</h1>
                    <NavBar db={ mainDB } navigate={ this.navigate.bind(this) } user={ this.state.userLevel } addBill={ this.addBill.bind(this) }/>
                    <BillList db={ mainDB } location={ this.state.location } user={ this.state.userLevel }/>
                </div>
            )
        } else {
            return(
                <h1>Who are you</h1>
            )
        }
    }
}
ReactDOM.render(<App />, document.getElementById("main"))
