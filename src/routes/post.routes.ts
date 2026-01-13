import { NextFunction, Router } from 'express';
import { getPost, getPosts, parseListQuery } from '../services/post.service';

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