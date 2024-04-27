import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Inbox.css'; // Ensure you have some basic styles

function Inbox({ userId }) { // Pass userId as a prop or from context
  const [inboxItems, setInboxItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    Axios.get(`/inbox/${userId}`) // Fetch inbox items for the user
      .then((res) => {
        setInboxItems(res.data); // Set the retrieved inbox items
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage('Error fetching inbox items.');
        setIsLoading(false);
      });
  }, [userId]); // Rerun effect when userId changes

  if (isLoading) {
    return <p>Loading inbox...</p>; // Display loading state
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>; // Display error message if there's an issue
  }

  return (
    <div className="inbox-container">
      <h2 className="inbox-title">Inbox</h2>
      {inboxItems.length === 0 ? (
        <p>No inbox items.</p> // Display when there's nothing in the inbox
      ) : (
        <ul>
          {inboxItems.map((item) => (
            <li key={item._id}>
              <strong>{item.title}</strong> {/* Display the title */}
              <p>{item.message}</p> {/* Display the message */}
              <span>{new Date(item.timestamp).toLocaleString()}</span> {/* Display the timestamp */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Inbox;
