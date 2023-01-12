import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import UserListTable from './table';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <UserListTable />
    </div>
  );
}

/*
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
*/

export default App;
