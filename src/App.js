import './App.css';
import Table from 'react-bootstrap/Table';

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
      </Table>
    </div>
  );
}

export default App;
