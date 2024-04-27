import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './BidStatus.css';

function BidStatus() {
  const [biddedItems, setBiddedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:5000/bidded-items') // Endpoint for fetching bidded items
      .then((res) => {
        setBiddedItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage('Error fetching bidded items.');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading bidded items...</p>;
  }

  return (
    <div className="bid-status-container">
      <h2 className="bid-status-title">Your Bids</h2>
      <table className="bid-status-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Your Bid</th>
            <th>Status</th>
            <th>Time Remaining</th>
          </tr>
        </thead>
        <tbody>
          {biddedItems.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="item-image"
                />
              </td>
              <td>{item.itemName}</td>
              <td>${item.yourBid}</td>
              <td>{item.status}</td> {/* e.g., 'Winning', 'Outbid', etc. */}
              <td>{item.timeRemaining}</td> {/* e.g., '2 hours 30 minutes' */}
            </tr>
          ))}
        </tbody>
      </table>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default BidStatus;
