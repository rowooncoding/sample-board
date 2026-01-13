import { NextFunction, Router } from 'express';
import { addPost, getPost, getPosts, parseListQuery } from '../services/post.service';

export const postsRouter = Router();

// GET /posts?limit=20&offset=0
postsRouter.get("/", async (req, res, next) => {
  try {
    const query = parseListQuery({
      limit: req.query.limit,
      offset: req.query.offset,
    });

    const posts = await getPosts(query);
    res.json({ items: posts, count: posts.length });
  } catch (err) {
    next(err);
  }
});

// GET /posts/:id
postsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const post = await getPost(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    next(err);
  }
});

// POST /posts
postsRouter.post("/", async (req, res, next) => {
  try {
    const post = await addPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "TITLE_REQUIRED") return res.status(400).json({ message: "title is required" });
      if (err.message === "TITLE_TOO_LONG") return res.status(400).json({ message: "title must be <= 200 chars" });
      if (err.message === "CONTENT_REQUIRED") return res.status(400).json({ message: "content is required" });
    }
    next(err);
  }
});