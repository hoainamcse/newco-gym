"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Health from "@/apis/health"

export default function Page() {
  const [healthStatus, setHealthStatus] = useState("unknown");

  useEffect(() => {
    async function checkHealth() {
      try {
        const res: any = await Health.check();
        setHealthStatus(res.data.ping);
      } catch (e) {
        console.error("Backend is not healthy", e);
        setHealthStatus("error");
      }
    }

    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {healthStatus === "error" && <p>Error checking backend health</p>}
      {healthStatus !== "error" && <p>Ping: {healthStatus}</p>}
    </div>
  );
}
