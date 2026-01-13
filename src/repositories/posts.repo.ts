import { pool } from "../db";
import { Post } from "../types/post";

export async function findPosts(limit: number, offset: number): Promise<Post[]> {
  const result = await pool.query<Post>(
    `
    SELECT id, title, content, author, created_at, updated_at
    FROM posts
    ORDER BY id DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  return result.rows;
}

export async function findPostById(id: number): Promise<Post | null> {
  const result = await pool.query<Post>(
    `
    SELECT id, title, content, author, created_at, updated_at
    FROM posts
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] ?? null;
}