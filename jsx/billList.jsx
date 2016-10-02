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
        }
    }

    listenForNewChamber() {
        let mainDB = this.props.db.child("sc").child("chambers")
        let legislation = [];
        currentChamber = this.props.location
        mainDB.child(this.props.location).child("docket").on("child_added", function(snapshot) {
            legislation.push(snapshot.val().id);
            this.setState({"docket": legislation });
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
        console.log("fired");
        let mainDB = this.props.db.child("sc").child("chambers")
        mainDB.child(this.props.location).child(this.state.bill).update({ status });

    }

    render() {
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
                    <p>Test</p>
                    <Bill changeBillStatus={ this.changeBillStatus.bind(this) } db={ this.props.db } bill={ this.state.bill }/>
                </div>
            </div>
        )
    }
}

export default BillList
