import $ from "jquery";
import firebase from "firebase";
import React from "react";
import ReactDOM from "react-dom";

class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            chambers: [],
        }
    }

    generateRandomBill() {
        let randomText = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        let randomBill = {
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
            sponsor: "none",
        }
        this.props.addBill(randomBill);
    }

    navigate(location) {
        this.props.navigate(location);
    }

    componentWillMount() {
        let mainDB = this.props.db.child("sc").child("chambers")
        let chamberList = []
        mainDB.on("child_added", function(snapshot) {
            chamberList.push(snapshot.key);
            this.setState({"chambers": chamberList });
        }.bind(this))
    }

    render() {
        switch(this.props.user) {
            case "director":
                return(
                    <nav>
                        <button>HOME</button>
                        <button onClick={ this.generateRandomBill.bind(this) }>Add Bill</button>
                    </nav>
                )
            case "clerk":
                let nav_components = []
                this.state.chambers.map((x, i) => { nav_components.push(<button onClick={ this.navigate.bind(this, x) }> { x } </button>)});
                return(
                    <nav>
                        { nav_components }
                    </nav>
                )
            case "governor":
                return(
                    <nav>
                    </nav>
                )
            case "resource_staff":
                return(
                    <nav>
                    </nav>
                )
        }
    }
}

export default NavBar
