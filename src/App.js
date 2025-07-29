import React, { useState } from 'react';
import SlackMessagesRe from "./components/Retrieve";
import ScheduleMessage from "./components/ScheduleMessage";
import SlackMessenger from "./components/SlackMessenger";
import './App.css'
const App = () => {
  const [refreshSignal, setRefreshSignal] = useState(0);

  const triggerRefresh = () => {
    setRefreshSignal((prev) => prev + 1); // ✅ Changes whenever a message is sent/scheduled
  };
    return (
    <div className="App">
      <h1>Slack API Assignment</h1>
      <SlackMessenger onSent={triggerRefresh}/>
      <ScheduleMessage onScheduled={triggerRefresh}/>
      <SlackMessagesRe refreshSignal={refreshSignal}/>
    </div>
  );
}

export default App;
