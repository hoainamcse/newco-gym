export interface Email {
  id: string;
  threadId: string;
  sender: string;
  subject: string;
  date: string;
  content: string;
  html_content: string | null;
  pending: boolean;
  confidence_score: number;
  response: string;
  user_id: string;
  status: string | null;
  created_at: string;
  updated_at: string;

  read: boolean;
  labels: string[];
}

export interface Setting {
  auto_reply: boolean;
  confidence_threshold: number;
  created_at: string;
  updated_at: string;
  id: string;
  google_drive_url: string | null;
  owner_id: string;
}
