import './App.css';
import Table from 'react-bootstrap/Table';
import EventRow from "./components/EventRow";

function App() {
  return (
    <div className="App">
      <Table>
        <thead>
            <tr>
                <th>Flag</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
            </tr>
        </thead>
          <EventRow
              flagged={"false"}
              date={"today"}
              time={"now"}
              location={"thermostat"}
          />
      </Table>
    </div>
  );
}

export default App;
