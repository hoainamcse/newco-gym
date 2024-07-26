'use client';

import React from 'react';
import { DriveLink } from "@/app/types";
import SettingsApi from '@/apis/settings';

interface DriveLinkListProps {
  driveLinks: DriveLink[];
  removeDriveLink: (id: string) => void;
}

const DriveLinkList: React.FC<DriveLinkListProps> = ({ driveLinks, removeDriveLink }) => {
  const deleteDriveLink = async (id: string) => {
    try {
      await SettingsApi.delete(id);
      removeDriveLink(id);
    } catch (error) {
      console.error(error);
      alert('Failed to delete Google Drive link');
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Google Drive Links</h2>
      <ul>
        {driveLinks.map((link) => (
          <li key={link.id} className="mb-2 p-2 border-b border-gray-200 flex justify-between">
            <span>{link.google_drive_url}</span>
            <button onClick={() => deleteDriveLink(link.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriveLinkList;
