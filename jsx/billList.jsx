import $ from "jquery";
import firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";
import Bill from "./bill";

let currentChamber = "";

class BillList extends React.Component {
    constructor() {
        super();
        this.state = {
            docket: [],
            bill: "Select a Bill",
            position: "",
        }
    }

    listenForNewChamber() {
        let mainDB = this.props.db.child("sc").child("chambers")
        let legislation = [];
        let position_keys = [];
        currentChamber = this.props.location
        mainDB.child(this.props.location).child("docket").on("child_added", function(snapshot) {
            legislation.push(snapshot.val().id);
            position_keys.push(snapshot.key);
            this.setState({"docket": legislation, "position": position_keys });
        }.bind(this));
    }

    componentDidUpdate () {
        console.log("should udpate: "+ this.props.location);
        if(this.props.location != currentChamber){
            this.listenForNewChamber();
        }
    }

    componentWillMount () {
        this.listenForNewChamber();
    }

    seeBill(id) {
        this.setState({ "bill": id });
    }

    showBill(id) {
        if (id != "Select a Bill") {
            let mainDB = this.props.db.child("sc").child("bills")
            let billOb = ""
            mainDB.child(id).on("value", function(snapshot) {
                billOb = snapshot.val()
            })  
            return billOb
        } else {
            return "This is where the bill info will be"
        }
    }

    changeBillStatus(status) {
        let mainDB = this.props.db.child("sc")

        //find the id on the chamber side of the db
        let docketList = this.state.docket;
        let index = docketList.indexOf(this.state.bill);
        let billPosition = this.state.position[index];

        //update the status on the chamber side of the db
        mainDB.child("chambers").child(this.props.location).child("docket").child(billPosition).update({ status });

        //update teh status on the bill side of the db
        mainDB.child("bills").child(this.state.bill).update({"billStatus": status });

        //push a bill to the next chamber 
        if (status == "passed") {
            let division = this.props.location.split("-")[0];
            let current_chamber = this.props.location.split("-")[1];
            let current_bill = this.state.bill;
            switch(current_chamber) {
                case "house":
                    mainDB.child("chambers").child(division + "-senate").child("docket").push({"id": current_bill, "status": "todo" });
                    mainDB.child("bills").child(this.state.bill).update({"billLocation": "senate"})
                    break;
                case "senate":
                    mainDB.child("chambers").child("governor-desk").child("docket").push({"id": current_bill, "status": "todo" });
                    mainDB.child("bills").child(this.state.bill).update({"billLocation": "governor-desk"})
                    break;
                default:
                    mainDB.child("chambers").child(division + "-house").child("docket").push({"id": current_bill, "status": "todo" });
                    mainDB.child("bills").child(this.state.bill).update({"billLocation": "house"})
            }
            console.log("update went through");
        }
         
        //clean up the interface
        this.setState({"bill": "Select a Bill"})
    }

    render() {
        switch(this.props.user) {
            case "clerk":
                let list_components = []
                this.state.docket.map((x, i) => { list_components.push(<button onClick={ this.seeBill.bind(this, x) }> { x }</button>) })
                return(
                    <div className="bill_list">
                        <h2> { this.props.location } </h2>
                        <div className="docket">
                            { list_components }
                        </div>
                        <div className="bill_visualization">
                            <h2> { this.state.bill }</h2>
                            <Bill changeBillStatus={ this.changeBillStatus.bind(this) } db={ this.props.db } bill={ this.state.bill }/>
                        </div>
                    </div>
                )
                break;
            case "governor":
                let list_components = []
                this.state.docket.map((x, i) => { list_components.push(<button onClick={ this.seeBill.bind(this, x) }> { x }</button>) })
                return(
                    <div className="bill_list">
                        <h2> { this.props.location } </h2>
                        <div className="docket">
                            { list_components }
                        </div>
                        <div className="bill_visualization">
                            <h2> { this.state.bill }</h2>
                            <Bill changeBillStatus={ this.changeBillStatus.bind(this) } db={ this.props.db } bill={ this.state.bill }/>
                        </div>
                    </div>
                )
                break;
        }
    }
}

export default BillList
