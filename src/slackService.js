// src/slackService.js

export async function sendMessage(text) {
  try {
    const response = await fetch('http://localhost:5000/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function scheduleMessage(text, postAt) {
  try {
    const response = await fetch('http://localhost:5000/schedule-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, postAt }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function fetchMessages() {
  try {
    const response = await fetch('http://localhost:5000/messages');
    const data = await response.json();
    return data; // Should contain { messages: [...] }
  } catch (error) {
    return { error: error.message };
  }
}

