import React, { useEffect, useState } from 'react';
import { fetchMessages } from '../slackService';
import axios from 'axios';

const SlackMessagesRe = ({ refreshSignal }) => {
  const [messages, setMessages] = useState([]);
  const [selectedTs, setSelectedTs] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadMessages = async () => {
    const res = await fetchMessages();
    if (res.messages) setMessages(res.messages);
  };

  useEffect(() => {
    loadMessages();
  }, [refreshSignal]);

  const handleSelect = (e) => {
    const ts = e.target.value;
    setSelectedTs(ts);
    const msg = messages.find((m) => m.ts === ts);
    setSelectedMessage(msg);
    setEditText(msg.text || '');
    setSuccess('');
    setError('');
  };

  const handleEdit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/edit-message', {
        ts: selectedTs,
        text: editText,
      });

      if (res.data.ok) {
        setSuccess('✅ Message edited successfully!');
        // ⛔ Clear old selection
        setSelectedMessage(null);
        setSelectedTs('');
        setEditText('');
        await loadMessages(); // 🔄 Refresh from server
      } else {
        setError(`❌ Failed: ${res.data.error}`);
      }
    } catch (err) {
      setError(`❌ ${err.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.post('http://localhost:5000/delete-message', {
        ts: selectedTs,
      });

      if (res.data.ok) {
        setSuccess('🗑️ Message deleted successfully!');
        setSelectedMessage(null);
        setSelectedTs('');
        setEditText('');
        await loadMessages(); // 🔄 Refresh after deletion
      } else {
        setError(`❌ Failed: ${res.data.error}`);
      }
    } catch (err) {
      setError(`❌ ${err.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2>🛠️ Edit/Delete Slack Message</h2>

      {messages.length > 0 ? (
        <select onChange={handleSelect} value={selectedTs}>
          <option value="" disabled>-- Select a recent message --</option>
          {messages.map((msg) => (
            <option key={msg.ts} value={msg.ts}>
              {msg.text?.slice(0, 50)} — {msg.ts}
            </option>
          ))}
        </select>
      ) : (
        <p>Loading messages...</p>
      )}

      {selectedMessage && (
        <div style={{ marginTop: '20px' }}>
          <textarea
            rows={3}
            cols={60}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <br />
          <button onClick={handleEdit}>✏️ Edit</button>
          <button
            onClick={handleDelete}
            style={{ marginLeft: '10px', color: 'red' }}
          >
            🗑️ Delete
          </button>
        </div>
      )}

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SlackMessagesRe;
