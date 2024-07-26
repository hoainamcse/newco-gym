"use client";

import React, { useState, useEffect } from "react";
import ConnectFB from "./_components/ConnectFB";
import AddDriveLink from "./_components/AddDriveLink";
import DriveLinkList from "./_components/DriveLinkList";
import { DriveLink } from "@/app/types";
import SettingsApi from "@/apis/settings";

const Settings: React.FC = () => {
  const [driveLinks, setDriveLinks] = useState<DriveLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDriveLinks = async () => {
    setIsLoading(true);
    try {
      const response = await SettingsApi.list();
      setDriveLinks(response.data.setting);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch Google Drive links");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDriveLinks();
  }, []);

  const addDriveLink = (newLink: DriveLink) => {
    setDriveLinks((prevLinks) => [...prevLinks, newLink]);
  };

  const removeDriveLink = (id: string) => {
    setDriveLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>
      <ConnectFB />
      <AddDriveLink addDriveLink={addDriveLink} fetchDriveLinks={fetchDriveLinks} />
      {isLoading ? (
        "Loading ..."
      ) : (
        <DriveLinkList
          driveLinks={driveLinks}
          removeDriveLink={removeDriveLink}
        />
      )}
    </div>
  );
};

export default Settings;
