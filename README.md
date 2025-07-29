# 🚀 Slack API 

This project is a full-stack Web application built with the MERN stack (MongoDB not used here, but React + Node.js used) that integrates with the Slack API to **send**, **schedule**, **retrieve**, **edit**, and **delete** messages in a Slack channel.

---

## 📁 Project Structure

```
slack/
│
├── backend/
│   ├── .env                 # Slack credentials
│   ├── index.js             # Express server & Slack API handlers
│   └── package.json         # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css          # UI styling
│   │   ├── slackService.js  # Axios API calls to backend
│   │   └── components/
│   │       ├── SlackMessenger.js  # Send message
│   │       ├── ScheduleMessage.js # Schedule message
│   │       └── Retrieve.js        # Fetch/edit/delete messages
│   └── package.json         # Frontend dependencies
│
└── README.md
```

---

## ⚙️ Features

- 📤 Send instant messages to Slack
- 🗓️ Schedule messages for later
- 🔁 View recent Slack messages
- ✏️ Edit previously sent messages
- 🗑️ Delete messages from the channel
- 🔄 Real-time UI updates after every action

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/satyakumariyarramshetti/slack-message-manager.git
cd slack-message-manager

2. Backend Setup

cd backend
npm install

Create .env file

SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_CHANNEL_ID=your-channel-id

node index.js

Server runs at: http://localhost:5000

3. Frontend Setup

cd ../frontend
npm install
npm start
React App runs at: http://localhost:3000

🔗 API Routes (Backend)
Route	Method	Description
/send-message	POST	Sends a message to Slack
/schedule-message	POST	Schedules a message
/messages	GET	Retrieves recent messages
/edit-message	POST	Edits a message by timestamp
/delete-message	POST	Deletes a message by timestamp
##✨ Technologies Used

    Frontend: React.js, Axios

    Backend: Node.js, Express

    API: Slack Web API (chat.postMessage, chat.scheduleMessage, etc.)

    Styling: CSS (App.css)

📌 Notes

    All operations use Slack API with a bot token.

    Refresh of message list is automatic after any operation.

    No database is used; Slack is the single source of truth.

Created by 
Satya Kumari
