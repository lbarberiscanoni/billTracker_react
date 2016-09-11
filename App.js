import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import NavBar from "./View";
import BillList from "./Components";

let getFromFirebase = function(db_selected) {
    let results = [];
    $.ajax({
        async: false,
        url: "https://yig-bill-tracker.firebaseio.com/" + db_selected + "/.json",
        dataType: "json",
        cache: false,
        success: function(data) {
            results.push(data);
        }
    });
    return results[0]
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "lorenzo",
            bills: getFromFirebase("").bills,
            location: "home",
            userStatus: "none",
            logStatus: "false",
        }

    }

    changeLocation(newLocation) {
        this.setState({ location: newLocation });
    }

    changeStatus(newStatus) {
        this.setState({ userStatus: newStatus});
        let newLog = this.state.logStatus.toString() == "true" ? "false" : "true";
        this.setState({ logStatus: newLog });
        this.setState({ location: "home" });
    }

    ex(a) {
        console.log(a);
    };

    render() {
        switch(this.state.logStatus.toString()) {
            case "true":
                return( 
                    <div>
                        <h1>Hello { this.state.userName }!</h1>
                        <button onClick = { this.changeStatus.bind(this, "none") }>LOG OUT</button>
                        <h2>You are logged in as { this.state.userStatus } </h2>
                        <BillList billList = { this.state.bills } userLocation = { this.state.location }/>
                        <button onClick={ this.ex.bind(this, this.state.bills) }>click me</button>
                        <NavBar user = { this.state.userStatus } changeLocation = { this.changeLocation.bind(this) }/>
                    </div>
                )
                break;
            case "false":
                return(
                    <div>
                        <h1>You are currently logged out!</h1>
                        <NavBar user = { this.state.userStatus } changeStatus = { this.changeStatus.bind(this) } />
                    </div>
                )
        }
    }
}

export default App
