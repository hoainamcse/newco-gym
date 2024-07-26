"use client";

import React from "react";
import GmailApi from "@/apis/gmail";

const ControlPanel: React.FC = () => {
  const startWatching = async () => {
    try {
      await GmailApi.startWatching();
      alert("Started watching for notifications");
    } catch (error) {
      console.error(error);
      alert("Failed to start watching for notifications");
    }
  };

  const stopWatching = async () => {
    try {
      await GmailApi.stopWatching();
      alert("Stopped watching for notifications");
    } catch (error) {
      console.error(error);
      alert("Failed to stop watching for notifications");
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={startWatching}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
      >
        Start Watching
      </button>
      <button
        onClick={stopWatching}
        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
      >
        Stop Watching
      </button>
    </div>
  );
};

export default ControlPanel;
