import React, { useState } from 'react';
import { scheduleMessage } from '../slackService';

const ScheduleMessage = ({ onScheduled }) => {
  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState(5);
  const [success, setSuccess] = useState('');

  const handleSchedule = async () => {
    const postAt = Math.floor(Date.now() / 1000) + minutes * 60;
    const result = await scheduleMessage(text, postAt);

    if (result && result.ok) {
      setSuccess('✅ Message scheduled successfully!');
      setText('');
      setMinutes(5);
      onScheduled(); // 🔄 Refresh dropdown/messages in parent
    } else {
      const errorMsg = result.error ? `❌ Failed: ${result.error}` : '❌ Failed to schedule';
      setSuccess(errorMsg);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setSuccess(''); // Clear on new typing
  };

  const handleMinutesChange = (e) => {
    setMinutes(Number(e.target.value));
    setSuccess(''); // Clear on new input
  };

  return (
    <div className="p-4">
      <h2>⏰ Schedule a Message</h2>

      <textarea
        rows={3}
        cols={60}
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your message"
      />
      <br />

      <input
        type="number"
        value={minutes}
        onChange={handleMinutesChange}
        placeholder="Minutes from now"
      />
      <br />

      <button onClick={handleSchedule}>📅 Schedule</button>

      {success && (
        <p style={{ color: success.startsWith('✅') ? 'green' : 'red', marginTop: '10px' }}>
          {success}
        </p>
      )}
    </div>
  );
};

export default ScheduleMessage;
