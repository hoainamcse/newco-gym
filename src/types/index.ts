export interface Email {
  id: string;
  threadId: string;
  sender: string;
  subject: string;
  date: string;
  content: string;
  pending: boolean;
  confidence_score: number;
  response: string;
  user_id: string;
}

export interface DriveLink {
  created_at: string;
  updated_at: string;
  id: string;
  google_drive_url: string;
  owner_id: string;
}
