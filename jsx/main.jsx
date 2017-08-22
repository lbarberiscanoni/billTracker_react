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
            userLevel: "governor",
            location: "governor-desk",
            logStatus: "in",
        }
    }

    addBill(bill) {
        console.log(bill);
        let chamber_location = bill.division + "-" + bill.billLocation
        console.log(chamber_location);

        //add it to teh bill side of the db
        let thisBill = mainDB.child("sc").child("bills").push(bill);
        let bill_ID = thisBill.key
        console.log(bill_ID);
        console.log("success");

        //add it to the refernce to the side of the db
        mainDB.child("sc").child("chambers").child(chamber_location).child("docket").push({"id": bill_ID, "status": "todo"})
        console.log("done");
    }

    navigate(new_location) {
        this.setState({"location": new_location});
    }

    generateChambers() {
        console.log("fired4");
        let listOfChambers = {"governor-desk": {"a": "a"}}
        let letterList = ["a", "b", "c", "d", "e", "f", "g", "house", "senate"]
        letterList.map((x) => { let key = "premier-" + x; listOfChambers[key] = {"a": "a"} })
        letterList.map((x) => { let key = "upper-" + x; listOfChambers[key] = {"a": "a"} })
        console.log(listOfChambers);
        mainDB.child("sc").child("chambers").set(listOfChambers);
    }

    render() {
        if (this.state.logStatus == "in") {
            switch(this.state.userLevel) {
                case "clerk":
                    return(
                        <div className="mainContainer">
                            <h1>[{ this.state.userLevel }] { this.state.location }</h1>
                            <button onClick={ this.generateChambers.bind(this) }>Generate Chambers</button>
                            <NavBar db={ mainDB } navigate={ this.navigate.bind(this) } user={ this.state.userLevel } addBill={ this.addBill.bind(this) }/>
                            <BillList db={ mainDB } location={ this.state.location } user={ this.state.userLevel }/>
                        </div>
                    )
                    break;
                case "governor":
                    return(
                        <div className="mainContainer">
                            <h1>[{ this.state.userLevel }] { this.state.location }</h1>
                            <button onClick={ this.generateChambers.bind(this) }>Generate Chambers</button>
                            <NavBar db={ mainDB } navigate={ this.navigate.bind(this) } user={ this.state.userLevel } addBill={ this.addBill.bind(this) }/>
                            <BillList db={ mainDB } location={ this.state.location } user={ this.state.userLevel }/>
                        </div>
                    )
                    break;
            }
        } else {
            return(
                <h1>Who are you</h1>
            )
        }
    }
}
ReactDOM.render(<App />, document.getElementById("main"))
