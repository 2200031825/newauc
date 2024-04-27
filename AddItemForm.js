import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddItemForm from './AddItemForm'; // Import the AddItemForm component
import Home from './home';
import ChangePassword from './changepassword';
import AxiosTesting from './axiostesting.js';
import MyProfile from './myprofile';
import ItemsList from './ItemsList.js';
import BiddingPage from './BiddingPage';
import Login from './login.js';
import ViewStatus from '../viewitems.js';

function Website() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/axiostesting" element={<AxiosTesting />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/ItemsList" element={<ItemsList />} />
        <Route path="/ViewStatus" element={<ViewStatus />} />

        <Route path="/bidding" element={<BiddingPage />} />
        <Route path="/additem" element={<AddItemForm />} /> {/* Route for AddItemForm */}
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Website />, document.getElementById('root'));
