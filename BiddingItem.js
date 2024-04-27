import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './BiddingItem.css';

function BiddingItem() {
  const [items, setItems] = useState([]);
  const [bid, setBid] = useState({});
  const [bidderName, setBidderName] = useState('');

  useEffect(() => {
    // Fetch auction items
    Axios.get('http://localhost:5000/items')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching auction items:', error);
      });
  }, []);

  const handleBidChange = (itemId, value) => {
    setBid((prevBid) => ({
      ...prevBid,
      [itemId]: parseFloat(value),
    }));
  };

  const handleBid = (itemId) => {
    const bidAmount = bid[itemId];

    Axios.post('http://localhost:5000/bid', {
      itemId,
      bidAmount,
      bidderName,
    })
      .then((response) => {
        // Refresh items after successful bid
        Axios.get('http://localhost:5000/items')
          .then((res) => {
            setItems(res.data);
          })
          .catch((err) => {
            console.error('Error fetching items after bidding:', err);
          });
      })
      .catch((error) => {
        console.error('Error placing bid:', error);
      });
  };

  return (
    <div className="bidding-item-container"> {/* Update the class name */}
      <h2 className="bidding-item-title">Auction Items</h2>
      <table className="bidding-item-table"> {/* Update the class name */}
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Current Bid</th>
            <th>Bidder Name</th>
            <th>New Bid</th>
            <th>Bid</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.currentBid}</td>
              <td>{item.currentBidder}</td>
              <td>
                <input
                  type="number"
                  value={bid[item._id] || ''}
                  onChange={(e) => handleBidChange(item._id, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleBid(item._id)}>Place Bid</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BiddingItem;
