import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import EventTable from "./components/EventTable";
import PageControls from "./components/PageControls";
import React from "react";
import PageHeader from "./components/PageHeader";
import Toasts from "./components/Toasts";
import soundFile from "./assets/toast.wav";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setPageData = this.setPageData.bind(this);
        this.handleItemsPerPageChange = this.handleItemsPerPageChange.bind(this);
        this.handleFlagChange = this.handleFlagChange.bind(this);
        this.handleAutoRefreshChange = this.handleAutoRefreshChange.bind(this);
        this.state = {
            events: [],
            pagingInfo: {},
            itemsPerPage: 20,
            toasts: [],
            autoRefresh: false,
            refreshInterval: {},
            sound: new Audio(soundFile)
        };
    }

    render() {
        return (
            <div className="App text-white">
                <PageHeader
                    onItemsPerPageChange={this.handleItemsPerPageChange}
                    onAutoRefreshChange={this.handleAutoRefreshChange}
                />
                <EventTable events={this.state.events} onFlagChange={this.handleFlagChange} />
                <PageControls
                    pagingInfo={this.state.pagingInfo}
                    onPageChange={this.setPageData}
                />
                <Toasts toasts={this.state.toasts} onToastClose={this.removeToast.bind(this)}/>
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

    setPageData(page, override = false) {
        if (parseInt(page) === this.state.pagingInfo.currentPage
            && this.state.itemsPerPage === this.state.pagingInfo.itemsPerPage
            && override === false)
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

    handleAutoRefreshChange(value) {
        if (value) {
            this.initAutoRefresh();
        } else {
            clearInterval(this.state.refreshInterval);
        }
    }

    initAutoRefresh() {
        this.setState({
            refreshInterval: setInterval(this.refreshEvents.bind(this), 2000)
        });
    }

    refreshEvents() {
        console.log("refreshing...");
        fetch("https://dmarquardt-modas.azurewebsites.net/api/event/count")
            .then(r => r.json())
            .then(count => {
                if (count !== this.state.pagingInfo.totalItems) {
                    this.setPageData(this.state.pagingInfo.currentPage, true);
                    this.addToast("Motion Detected", "New motion alert detected!");
                    this.state.sound.play();
                }
            })
            .catch(e => console.log(e));
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
