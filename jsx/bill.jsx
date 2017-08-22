import $ from "jquery";
import firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";

class Bill extends React.Component {
    showBill(id) {
        if (id != "Select a Bill") {
            let mainDB = this.props.db.child("sc").child("bills")
            let billOb = ""
            mainDB.child(id).on("value", function(snapshot) {
                billOb = snapshot.val()
            })  
            let bill_components = []
            Object.keys(billOb).map((x) => { bill_components.push(<p> { billOb[x] } </p>) })
            return bill_components
        } else {
            return "This is where the bill info will be"
        }
    }

    evalBill(status) {
        this.props.changeBillStatus(status)
    }

    render() {
        if (this.props.bill != "Select a Bill") {
            return(
                <div>
                    { this.showBill(this.props.bill) }
                    <button onClick={ this.evalBill.bind(this, "failed")}>Fail</button>

                    <button onClick={ this.evalBill.bind(this, "passed")}>Pass</button>
                </div>
            )
        } else {
            return(
                <div></div>
            )
        }
    }
}

export default Bill
