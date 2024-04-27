import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './home';
import ChangePassword from './changepassword';
import AxiosTesting from './axiostesting.js';
import MyProfile from './myprofile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemsList from './ItemsList.js';
import Login from './login.js';
// import ViewStatus from './viewitems.js';

function Website() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/axiostesting' element={<AxiosTesting />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/ItemsList' element={<ItemsList />} />
        {/* <Route exact path="/ViewStatus" component={<ViewStatus/>} /> */}

        {/* Add the route for the BiddingForm component */}
        {/* <Route path='/items/:itemId/bid' element={<BiddingForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Website />, document.getElementById('root'));
