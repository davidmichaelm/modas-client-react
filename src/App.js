import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import EventTable from "./components/EventTable";
import PageControls from "./components/PageControls";
import React, {useState, useEffect} from "react";
import PageHeader from "./components/PageHeader";
import Toasts from "./components/Toasts";
import soundFile from "./assets/toast.wav";
import Settings from "./components/Settings";
import SignIn from "./components/SignIn";
import useInterval from "./hooks/useInterval";

function App() {
    const [events, setEvents] = useState([]);
    const [pagingInfo, setPagingInfo] = useState({});
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [serverCount, setServerCount] = useState(0);
    const [toasts, setToasts] = useState([]);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const sound = new Audio(soundFile);

    useInterval(() => {
        console.log("refreshing...");
        fetch("https://dmarquardt-modas.azurewebsites.net/api/event/count")
            .then(r => r.json())
            .then(count => {
                if (count !== pagingInfo.totalItems) {
                    setServerCount(count);
                    addToast("Motion Detected", "New motion alert detected!");
                    sound.play();
                }
            })
            .catch(e => console.log(e));
    }, autoRefresh ? 2000 : null);

    useEffect(() => {
        async function fetchEvents() {
            const response = await fetch(`https://dmarquardt-modas.azurewebsites.net/api/event/pageSize/${itemsPerPage}/page/${currentPage}`);
            const json = await response.json();
            setEvents(json.events);
            setPagingInfo(json.pagingInfo);
        }

        fetchEvents();
    }, [currentPage, itemsPerPage, serverCount]);

    const updateEventFlag = (flagged, id) => {
        const newEvents = [...events];
        const eventIndex = newEvents.findIndex(e => e.id === id);
        newEvents[eventIndex].flag = flagged;
        setEvents(newEvents);
        addToast("Update Complete", `Event flag ${flagged ? "added" : "removed"}.`)
    };

    const addToast = (header, text) => {
        const newToasts = [...toasts];
        const id = newToasts.length;
        newToasts.push({
            id: id,
            header: header,
            text: text
        });
        setToasts(newToasts);
    };

    const removeToast = (id) => {
        const newToasts = [...toasts];
        newToasts.splice(id);
        setToasts(newToasts);
    };

    return (
        <div className="App text-white">
            <PageHeader>
                <SignIn />
                <Settings
                    onItemsPerPageChange={(itemsNum) => setItemsPerPage(itemsNum)}
                    onAutoRefreshChange={(value) => setAutoRefresh(value)}
                />
            </PageHeader>
            <EventTable events={events} onFlagChange={updateEventFlag}/>
            <PageControls
                pagingInfo={pagingInfo}
                onPageChange={setCurrentPage}
            />
            <Toasts toasts={toasts} onToastClose={removeToast}/>
        </div>
    );
}

export default App;
