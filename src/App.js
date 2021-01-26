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
        fetch("https://dmarquardt-modas.azurewebsites.net/api/event/pageSize/10/page/1")
            .then(r => r.json())
            .then(data => {
                console.log(data);
                this.setState({
                    events: data.events
                });
            });
    }
}

export default App;
