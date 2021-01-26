import './App.css';
import EventTable from "./components/EventTable";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    render() {
        return (
            <div className="App">
                <EventTable events={this.state.events}/>
            </div>
        );
    }

    componentDidMount() {
        fetchEvents(20, 1)
            .then(data => {
                console.log(data);
                this.setState({
                    events: data.events
                });
            })
            .catch(error => console.log(error));
    }
}

function fetchEvents(numEvents, page) {
    return new Promise((resolve, reject) => {
        fetch(`https://dmarquardt-modas.azurewebsites.net/api/event/pageSize/${numEvents}/page/${page}`)
            .then(r => r.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => reject(error));
    })
}

export default App;
