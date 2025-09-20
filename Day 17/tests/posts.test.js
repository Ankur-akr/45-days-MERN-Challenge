const request = require('supertest');
const app = require('../src/app');
const store = require('../src/data/store');

describe('Posts API', () => {
  beforeEach(() => store.reset());

  test('create post -> 201', async () => {
    const user = store.createUser({ name: 'PostAuthor', email: 'pa@example.com' });
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Hello', body: 'World', authorId: user.id });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Hello');
  });

  test('create post with missing fields -> 400', async () => {
    const res = await request(app).post('/api/posts').send({ title: 't' });
    expect(res.status).toBe(400);
  });

  test('get posts -> array', async () => {
    const user = store.createUser({ name: 'X', email: 'x@example.com' });
    store.createPost({ title: 't1', body: 'b1', authorId: user.id });
    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});
