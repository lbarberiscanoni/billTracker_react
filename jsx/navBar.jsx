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
        let chamber_list = ["a", "b", "c", "d", "e", "f", "g"]
        let location = chamber_list[Math.floor(Math.random() * chamber_list.length)];
        let randomText = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        let randomBill = {
            author1: randomText,
            author2: randomText,
            author1Location: "none",
            author2Location: "none",
            billLocation: location,
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
        let nav_components = []
        switch(this.props.user) {
            case "director":
                return(
                    <nav>
                        <button>HOME</button>
                        <button onClick={ this.generateRandomBill.bind(this) }>Add Bill</button>
                    </nav>
                )
            case "clerk":
                this.state.chambers.map((x) => { nav_components.push(<button onClick={ this.navigate.bind(this, x) }> { x } </button>)});
                return(
                    <nav>
                        <button onClick={ this.generateRandomBill.bind(this) }>Add Bill</button>
                        { nav_components }
                    </nav>
                )
            case "governor":
                let gov_pages = ["pre-screening", "governor-desk", "questions"]
                gov_pages.map((x) => { nav_components.push(<button onClick={ this.navigate.bind(this, x) }> { x }</button>)});
                return(
                    <nav>
                        { nav_components }
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
