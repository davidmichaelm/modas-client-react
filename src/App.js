import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import EventTable from "./components/EventTable";
import PageControls from "./components/PageControls";
import React from "react";
import PageHeader from "./components/PageHeader";
import Toasts from "./components/Toasts";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setPageData = this.setPageData.bind(this);
        this.handleItemsPerPageChange = this.handleItemsPerPageChange.bind(this);
        this.handleFlagChange = this.handleFlagChange.bind(this);
        this.state = {
            events: [],
            pagingInfo: {},
            itemsPerPage: 20,
            toasts: []
        };
    }

    render() {
        return (
            <div className="App text-white">
                <PageHeader onItemsPerPageChange={this.handleItemsPerPageChange}/>
                <EventTable events={this.state.events} onFlagChange={this.handleFlagChange}><Toasts toasts={this.state.toasts}/></EventTable>
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
                this.setState({
                    events: data.events,
                    pagingInfo: data.pagingInfo
                });
            })
            .catch(error => console.log(error));
    }

    handleItemsPerPageChange(itemsNum) {
        this.setState({
            itemsPerPage: itemsNum
        }, () => this.setPageData(1));
    }

    handleFlagChange(flagged, id) {
        this.updateEventFlag(flagged, id);
        const url = `https://dmarquardt-modas.azurewebsites.net/api/event/${id}`;
        fetch(url,
            {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                mode: "cors",
                body: JSON.stringify([{
                    "op": "replace",
                    "path": "Flagged",
                    "value": flagged
                }])
            })
            .then(() => this.addToast("Update Complete", `Event flag ${flagged ? "added" : "removed"}.`))
            .catch(e => console.log(e));
    }

    updateEventFlag(flagged, id) {
        const newEvents = [...this.state.events];
        const eventIndex = newEvents.findIndex(e => e.id === id);
        newEvents[eventIndex].flag = flagged;
        this.setState({
            events: newEvents
        })
    }

    addToast(header, text) {
        const newToasts = [...this.state.toasts];
        const id = newToasts.length;
        newToasts.push({
            id: id,
            header: header,
            text: text
        });
        this.setState({
            toasts: newToasts
        });
        // setTimeout(this.removeToast.bind(this, id), 2000);
    }

    removeToast(id) {
        const newToasts = [...this.state.toasts];
        newToasts.splice(id);
        this.setState({
            toasts: newToasts
        });
    }

    componentDidMount() {
        this.setPageData(1);
    }
}

export default App;
