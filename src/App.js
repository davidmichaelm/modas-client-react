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
import Cookies from "js-cookie";

function App() {
    const [events, setEvents] = useState([]);
    const [pagingInfo, setPagingInfo] = useState({});
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [serverCount, setServerCount] = useState(0);
    const [toasts, setToasts] = useState([]);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [loggedIn, setLoggedIn] = useState(!!Cookies.get("token"));
    const [openSignIn, setOpenSignIn] = useState(false);
    const [sortBy, setSortBy] = useState("stamp");
    const [order, setOrder] = useState("desc");
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
            const response = await fetch(`https://dmarquardt-modas.azurewebsites.net/api/event/pageSize/${itemsPerPage}/page/${currentPage}?sortBy=${sortBy}&order=${order}`,
                {
                    headers: {
                        "Authorization": "Bearer " + Cookies.get("token")
                    }
                });

            if (!response.ok) {
                if (response.status === 401) {
                    setLoggedIn(false);
                    setOpenSignIn(true);
                    return;
                }
            }
            const json = await response.json();
            setEvents(json.events);
            setPagingInfo(json.pagingInfo);
        }

        if (loggedIn) {
            fetchEvents();
        } else {
            Cookies.remove("token");
            setEvents([]);
            setOpenSignIn(true);
        }
    }, [currentPage, itemsPerPage, serverCount, loggedIn, sortBy, order]);

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
                <SignIn
                    onLogin={setLoggedIn}
                    open={openSignIn}
                    setOpen={setOpenSignIn}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                />
                <Settings
                    onItemsPerPageChange={setItemsPerPage}
                    onAutoRefreshChange={setAutoRefresh}
                    autoRefresh={autoRefresh}
                    itemsPerPage={itemsPerPage}
                />
            </PageHeader>
            <EventTable
                events={events}
                sortBy={sortBy}
                order={order}
                onFlagChange={updateEventFlag}
                onSortChange={setSortBy}
                onOrderChange={setOrder}/>
            <PageControls
                pagingInfo={pagingInfo}
                onPageChange={setCurrentPage}
            />
            <Toasts toasts={toasts} onToastClose={removeToast}/>
        </div>
    );
}

export default App;
