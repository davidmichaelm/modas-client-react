import './App.css';
import EventTable from "./components/EventTable";
import PageControls from "./components/PageControls";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            pagingInfo: {}
        };
    }

    render() {
        return (
            <div className="App">
                <EventTable events={this.state.events} />
                <PageControls pagingInfo={this.state.pagingInfo} />
            </div>
        );
    }

    fetchEvents(numEvents, page) {
        return new Promise((resolve, reject) => {
            fetch(`https://dmarquardt-modas.azurewebsites.net/api/event/pageSize/${numEvents}/page/${page}`)
                .then(r => r.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => reject(error));
        })
    }

    componentDidMount() {
        this.fetchEvents(20, 1)
            .then(data => {
                console.log(data);
                this.setState({
                    events: data.events,
                    pagingInfo: data.pagingInfo
                });
            })
            .catch(error => console.log(error));
    }
}

export default App;
