"use client";

import React, { useEffect, useState } from "react";
import { Email } from "@/app/types";
import GmailApi from "@/apis/gmail";

interface EmailViewProps {
  email: Email | null;
}

const EmailView: React.FC<EmailViewProps> = ({ email }) => {
  const [replyContent, setReplyContent] = useState("");

  const replyToEmail = async () => {
    alert("Reply to email functionality is not yet implemented");
    return;
    // if (email) {
    //   try {
    //     await GmailApi.sendEmail({
    //       to: email.sender,
    //       subject: `Re: ${email.subject}`,
    //       body: replyContent,
    //     });
    //     alert("Reply sent successfully");
    //     setReplyContent("");
    //   } catch (error) {
    //     console.error(error);
    //     alert("Failed to send reply");
    //   }
    // }
  };

  useEffect(() => {
    if (email) {
      setReplyContent(email.response);
    }
  }, [email]);

  if (!email) {
    return (
      <div className="text-center text-gray-500">Select an email to view</div>
    );
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-md h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-4">Email Details</h2>
        <p>
          <strong>From:</strong> {email.sender}
        </p>
        <p>
          <strong>Date:</strong> {email.date}
        </p>
        <p>
          <strong>Subject:</strong> {email.subject}
        </p>
        <p>
          <strong>Content:</strong> {email.content}
        </p>
        <p>
          <strong>Confidence score:</strong> {email.confidence_score}
        </p>
      </div>
      <div>
        <textarea
          rows={6}
          defaultValue={email.response}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Type your reply here"
        />
        <button
          onClick={replyToEmail}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send Reply
        </button>
      </div>
    </div>
  );
};

export default EmailView;
