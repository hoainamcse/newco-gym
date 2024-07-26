'use client';

import React, { useState } from 'react';
import ControlPanel from './_components/ControlPanel';
import EmailList from './_components/EmailList';
import EmailView from './_components/EmailView';
import { Email } from '@/app/types';

function App() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex">
      <div className="w-1/3 p-4">
        <ControlPanel />
        <EmailList setSelectedEmail={setSelectedEmail} />
      </div>
      <div className="w-2/3 p-4">
        <EmailView email={selectedEmail} />
      </div>
    </div>
  );
}

export default App;
