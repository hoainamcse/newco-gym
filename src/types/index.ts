export interface Email {
  sender: string;
  date: string;
  subject: string;
  content: string;
  response: string;
  confidence_score: number;
}

export interface DriveLink {
  created_at: string;
  updated_at: string;
  id: string;
  google_drive_url: string;
  owner_id: string;
}
