'use client';

import React, { useState } from "react";
import { DriveLink } from "@/app/types";
import SettingsApi from "@/apis/settings";

interface AddDriveLinkProps {
  addDriveLink: (newLink: DriveLink) => void;
  fetchDriveLinks: any,
}

const AddDriveLink: React.FC<AddDriveLinkProps> = ({ addDriveLink, fetchDriveLinks }) => {
  const [googleDriveUrl, setGoogleDriveUrl] = useState("");

  const submitDriveLink = async () => {
    try {
      const response = await SettingsApi.create({
        google_drive_url: googleDriveUrl,
      });
      // addDriveLink(response.data.data);
      fetchDriveLinks();
      setGoogleDriveUrl("");
    } catch (error) {
      console.error(error);
      alert("Failed to add Google Drive link");
    }
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        value={googleDriveUrl}
        onChange={(e) => setGoogleDriveUrl(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        placeholder="Google Drive Folder URL"
      />
      <button
        onClick={submitDriveLink}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add Google Drive Link
      </button>
    </div>
  );
};

export default AddDriveLink;
