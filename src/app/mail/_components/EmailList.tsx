"use client";

import React, { useState, useEffect } from "react";
import { Email } from "@/app/types";
import GmailApi from "@/apis/gmail";

interface EmailListProps {
  setSelectedEmail: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({ setSelectedEmail }) => {
  const [emails, setEmails] = useState<Email[]>([]);

  const getPendingEmails = async () => {
    try {
      const response = await GmailApi.pendingEmail();
      const sortedEmails = response.data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setEmails(sortedEmails);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch pending emails");
    }
  };

  useEffect(() => {
    getPendingEmails();

    const interval = setInterval(getPendingEmails, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // useEffect(() => {
  //   getPendingEmails();
  // }, []);

  return (
    <>
      {/* <button
        onClick={getPendingEmails}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Get Pending Emails
      </button> */}
      <div className="bg-white p-4 shadow-md rounded-md ">
        <h2 className="text-xl font-semibold mb-4">Pending Emails</h2>
        <ul className="overflow-auto h-[500px]">
          {emails?.map((email, index) => (
            <li
              key={index}
              onClick={() => setSelectedEmail(email)}
              className="mb-2 p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            >
              <p>
                <strong>From:</strong> {email.sender}
              </p>
              <p>
                <strong>Date:</strong> {email.date}
              </p>
              <p>
                <strong>Subject:</strong> {email.subject}
              </p>
              {/* <p><strong>Content:</strong> {email.content}</p> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EmailList;
