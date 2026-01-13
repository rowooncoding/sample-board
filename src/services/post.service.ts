import { findPostById, findPosts } from '../repositories/posts.repo';
import { ListPostsQuery, Post } from '../types/post';

function toInt(value: unknown): number | undefined {
  if (typeof value !== "string") return undefined;

  const n = Number(value);

  if (!Number.isInteger(n)) return undefined;
  
  return n;
}

// 제한된 값 안에서 글 목록 조회
export async function getPosts(query: ListPostsQuery): Promise<Post[]> {
  const limit = Math.min(Math.max(query.limit ?? 20, 1), 100);
  const offset = Math.max(query.offset ?? 0, 0);

  return findPosts(limit, offset);
}

// 글 하나 조회
export async function getPost(id: number): Promise<Post | null> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("INVALID_ID");
  }
  return findPostById(id);
}

// 파싱 헬퍼 제공
// 라우터에서 처리하면 파싱 안전성이 깨질 수 있기 때문에 서비스에서 정수로 파싱해서 DTO로 바꾸기
export function parseListQuery(raw: { limit?: unknown; offset?: unknown }): ListPostsQuery {
  const limit = toInt(raw.limit);
  const offset = toInt(raw.offset);
  return {
    limit: limit === undefined ? undefined : limit,
    offset: offset === undefined ? undefined : offset,
  };
}