import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

class BillList extends React.Component {
    constructor() {
        super()
    }

    render() {
        let currentLocation = this.props.userLocation
        let listOfBills = this.props.billList
        let billList = Object.keys(listOfBills).map(function(a) { return listOfBills[a] }).filter(function(a) { return a.billLocation.toLowerCase() == currentLocation });
        let billComp = []
        billList.map(function(bill) {
            billComp.push(
                <button>
                    <h4> { bill.billTitle } </h4>
                    <p> { bill.author1 } & { bill.author2 }</p>
                    <p> { bill.school } </p>
                </button>
            )
        })
        return(
            <div>
                <h1>List of Bills</h1>
                <p> { billComp } </p>
            </div>
        )
    }
}

export default BillList
