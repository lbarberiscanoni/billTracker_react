import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

class NavBar extends React.Component {
    constructor() {
        super()
    }

    generateNav(list) {
        if (this.props.user != "none") {
            let navList = []
            for (let i = 0; i < list.length; i++) {
                navList.push(
                        <button onClick = { this.props.changeLocation.bind(this, list[i]) }>
                            { list[i] } 
                        </button>
                )
            }
            return navList
        } else {
            console.log(this.props);
            let navList = []
            for (let i = 0; i < list.length; i++) {
                navList.push(
                        <button onClick = { this.props.changeStatus.bind(this, list[i]) }>
                            { list[i] } 
                        </button>
                )
            }
            return navList
        }
    }

    render() {
        switch(this.props.user) {
            case "clerk":
                let navList_a = ["premier_a", "premier_b", "premier_c", "premier_d", "premier_e", "premier_f", "premier_g", "upper_a", "upper_b", "upper_c", "upper_d", "upper_e", "upper_f", "premier_house", "premier_senate", "house", "senate"];
                return(
                    <nav>
                        { this.generateNav(navList_a) }
                    </nav>
                )
                break;
            case "resource_staff":
                let navList_b = ["questions", "conference_schedule", "announcements", "bus_schedule"];
                return(
                    <nav>
                        { this.generateNav(navList_b) }
                    </nav>
                )
                break;
            case "director":
                let navList_c = ["executive_changes", "data_visualization", "chamber_assignments"];
                return(
                    <nav>
                        { this.generateNav(navList_c) }
                    </nav>
                )
                break;
            case "governor":
                let navList_d = ["bill_pre-screening", "reserach_questions"];
                return(
                    <nav>
                        { this.generateNav(navList_d) }
                    </nav>
                )
                break;
            case "attorney":
                let navList_e = ["schedule", "round_assignment", "setup"]
                return(
                    <nav>
                        { this.generateNav(navList_e) }
                    </nav>
                )
                break;
            default:
                let navList_f = ["director", "student", "clerk", "governor", "advisor", "resource_staff", "attorney"];
                return(
                    <nav>
                        { this.generateNav(navList_f) }
                    </nav>
                )
        }
    }
}

export default NavBar
