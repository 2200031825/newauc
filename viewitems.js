import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewStatus.css';

function ViewStatus() {
  const [userBids, setUserBids] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the items the user has bid on and all items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bidsResponse, itemsResponse] = await Promise.all([
          Axios.get('http://localhost:5000/user/bids'), // Endpoint for user bids
          Axios.get('http://localhost:5000/items'), // Endpoint for all items
        ]);

        setUserBids(bidsResponse.data);
        setAllItems(itemsResponse.data);
        setIsLoading(false);
      } catch (err) {
        setError('Error fetching bid status.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading bid status...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Find the items the user hasn't bid on
  const nonBiddedItems = allItems.filter(
    (item) => !userBids.some((bid) => bid.itemId === item._id)
  );

  return (
    <div className="view-status-container">
      <h2>Bid Status</h2>
      
      <h3>Items You Have Bid On</h3>
      {userBids.length > 0 ? (
        <ul>
          {userBids.map((bid) => (
            <li key={bid._id}>
              <Link to={`/item/${bid.itemId}`}> {/* Link to the item details */}
                {bid.itemName}: ${bid.bidAmount} ({bid.status})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bids placed yet.</p>
      )}

      <h3>Items You Have Not Bid On</h3>
      {nonBiddedItems.length > 0 ? (
        <ul>
          {nonBiddedItems.map((item) => (
            <li key={item._id}>
              <Link to={`/item/${item._id}`}> {/* Link to the item details */}
                {item.itemName}: ${item.price}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>All items have been bid on.</p>
      )}
    </div>
  );
}

export default ViewStatus;
