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
  created_at: string;
  updated_at: string;

  name: string;
  labels: string[];
}

export interface Setting {
  auto_reply: boolean;
  confidence_threshold: number;
  created_at: string;
  updated_at: string;
  id: string;
  google_drive_url: string;
  owner_id: string;
}
