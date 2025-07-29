// src/components/SlackMessenger.js
import React, { useState } from 'react';
import { sendMessage } from '../slackService';

const SlackMessenger = ({ onSent }) => {
  const [text, setText] = useState('');
  const [success, setSuccess] = useState('');

  const handleSend = async () => {
    const result = await sendMessage(text);
    if (result && result.ok) {
      setSuccess('✅ Message sent successfully!');
      setText('');
      onSent(); // 🔄 Refresh dropdown
    } else {
      const errorMsg = result.error ? `❌ Failed: ${result.error}` : '❌ Message failed';
      setSuccess(errorMsg);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setSuccess(''); // Clear previous success/error message when user types again
  };

  return (
    <div className="p-4">
      <h2>✉️ Send Message to Slack</h2>

      <textarea
        value={text}
        onChange={handleTextChange}
        rows={4}
        cols={50}
        placeholder="Type your Slack message here"
      />
      <br />

      <button onClick={handleSend}>Send</button>

      {success && (
        <p style={{ color: success.startsWith('✅') ? 'green' : 'red', marginTop: '10px' }}>
          {success}
        </p>
      )}
    </div>
  );
};

export default SlackMessenger;
