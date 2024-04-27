import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ItemsList.css';

function ItemsList() {
  const [items, setItems] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate for redirecting

  useEffect(() => {
    Axios.get('http://localhost:5000/items')
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setMessage('Error fetching items');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Ensure this function is defined to handle bid changes
  const handleBidChange = (itemId, value) => {
    const bidValue = parseFloat(value);
    if (isNaN(bidValue) || bidValue <= 0) {
      setMessage('Invalid bid amount');
      return;
    }
    setBidAmounts((prev) => ({ ...prev, [itemId]: bidValue }));
  };

  const placeBid = (itemId) => {
    const bidValue = parseFloat(bidAmounts[itemId]);

    const item = items.find((i) => i._id === itemId);

    if (bidValue > item.price) {
      Axios.post(`/items/${itemId}/bid`, { bidAmount: bidValue, userId: 'USER_ID' }) // Ensure a valid user ID
        .then(() => {
          setMessage('Bid placed successfully.');
          Axios.get('http://localhost:5000/items') // Refresh items after bid
            .then((res) => setItems(res.data))
            .catch((err) => setMessage('Error fetching updated items.'));
        })
        .catch((err) => setMessage('Error placing bid.'));
    } else {
      setMessage('Bid must be greater than the current price.');
    }
  };

  if (isLoading) {
    return <p>Loading items...</p>;
  }

  return (
    <div className="auction-container">
      <h2 className="auction-title">Auction Items</h2>
      <table className="auction-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Current Price</th>
            <th>Your Bid</th>
            <th>Action</th>
            <th>End Time</th> {/* Display auction end time */}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.imageUrl} alt={item.itemName} className="item-image" />
              </td>
              <td>{item.itemName}</td>
              <td>{`₹${item.price}`}</td>
              <td>
                <input
                  type="number"
                  min={item.price + 1}
                  value={bidAmounts[item._id] || ''}
                  onChange={(e) => handleBidChange(item._id, e.target.value)} // Corrected function reference
                />
              </td>
              <td>
                <button onClick={() => placeBid(item._id)}>Place Bid</button>
              </td>
              <td>{new Date(item.endTime).toLocaleString()}</td> {/* Display auction end time */}
            </tr>
          ))}
        </tbody>
      </table>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ItemsList;
