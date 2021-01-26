import './App.css';
import EventTable from "./components/EventTable";
import PageControls from "./components/PageControls";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setPageData = this.setPageData.bind(this);
        this.state = {
            events: [],
            pagingInfo: {},
            itemsPerPage: 20
        };
    }

    render() {
        return (
            <div className="App">
                <EventTable events={this.state.events} />
                <PageControls
                    pagingInfo={this.state.pagingInfo}
                    onPageChange={this.setPageData}
                />
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

    setPageData(page) {
        if (parseInt(page) === this.state.pagingInfo.currentPage
            && this.state.itemsPerPage === this.state.pagingInfo.itemsPerPage)
            return;

        this.fetchEvents(this.state.itemsPerPage, page)
            .then(data => {
                console.log(data);
                this.setState({
                    events: data.events,
                    pagingInfo: data.pagingInfo
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.setPageData(1);
    }
}

export default App;
