import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemBidding = ({ itemId, currentBid }) => {
  const [newBid, setNewBid] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    const bidValue = parseFloat(newBid);

    if (isNaN(bidValue) || bidValue <= currentBid) {
      setMessage('Bid must be greater than the current bid.');
      return;
    }

    try {
      await axios.post(`/api/items/${itemId}/bid`, { bidAmount: bidValue });
      setMessage('Bid placed successfully!');
      setTimeout(() => {
        // Redirect to a "View Status" page to see the bidding status
        navigate('/bid-status');
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error(error);
      setMessage('Failed to place bid');
    }
  };

  return (
    <div>
      <h2>Current Bid: ${currentBid}</h2>
      <form onSubmit={handleBidSubmit}>
        <label>New Bid Amount: </label>
        <input
          type="number"
          min={currentBid + 1}
          value={newBid}
          onChange={(e) => setNewBid(e.target.value)}
        />
        <button type="submit">Place Bid</button>
      </form>
      {message && <p>{message}</p>} {/* Display message to the user */}
    </div>
  );
};

export default ItemBidding;
