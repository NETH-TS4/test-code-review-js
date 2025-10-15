import request from 'supertest';
import express from 'express';
import articlesRouter from '../src/routes/articles.js';

const app = express();
app.use(express.json());
app.use('/api/articles', articlesRouter);

describe('articles API', () => {
  it('creates and lists articles', async () => {
    const post = await request(app)
      .post('/api/articles')
      .send({ title: 'T', content: 'C' })
      .expect(201);

    const list = await request(app).get('/api/articles').expect(200);
    expect(list.body).toHaveLength(1);
    expect(list.body[0].id).toBe(post.body.id);
  });
});