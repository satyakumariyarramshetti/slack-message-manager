// backend/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

app.post('/send-message', async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post(
      'https://slack.com/api/chat.postMessage',
      {
        channel: CHANNEL_ID,
        text,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SLACK_TOKEN}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/schedule-message', async (req, res) => {
  const { text, postAt } = req.body;

  try {
    const response = await axios.post(
      'https://slack.com/api/chat.scheduleMessage',
      {
        channel: process.env.SLACK_CHANNEL_ID,
        text,
        post_at: postAt
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data); // ✅ Return proper JSON response
  } catch (error) {
    console.error('Error scheduling message:', error.message);
    res.status(500).json({ error: error.message }); // ✅ Also JSON on error
  }
});


app.get('/messages', async (req, res) => {
  try {
    const result = await axios.get('https://slack.com/api/conversations.history', {
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
      params: {
        channel: process.env.SLACK_CHANNEL_ID, // channel ID goes here
        limit: 10, // get recent 10 messages
      },
    });

    if (result.data.ok) {
      res.json({ messages: result.data.messages });
    } else {
      res.status(400).json({ error: result.data.error });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// EDIT a Slack message
app.post('/edit-message', async (req, res) => {
  const { ts, text } = req.body;

  try {
    const result = await axios.post(
      'https://slack.com/api/chat.update',
      {
        channel: process.env.SLACK_CHANNEL_ID,
        ts,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a Slack message
app.post('/delete-message', async (req, res) => {
  const { ts } = req.body;

  try {
    const result = await axios.post(
      'https://slack.com/api/chat.delete',
      {
        channel: process.env.SLACK_CHANNEL_ID,
        ts,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Slack proxy server running on port ${PORT}`);
});
