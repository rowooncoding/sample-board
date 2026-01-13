export interface CreatePostBody {
  title: string;
  content: string;
  author?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string | null;
  created_at: string;
  updated_at: string;
}

export interface ListPostQuery {
  limit?: number;
  offest?: number;
}