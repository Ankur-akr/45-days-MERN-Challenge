const request = require('supertest');
const app = require('../src/app');
const store = require('../src/data/store');

describe('Search API', () => {
  beforeEach(() => store.reset());

  test('search users and posts', async () => {
    const u = store.createUser({ name: 'Finder', email: 'find@example.com' });
    store.createPost({ title: 'Find me', body: 'nothing', authorId: u.id });

    const res = await request(app).get('/api/search').query({ q: 'find' });
    expect(res.status).toBe(200);
    expect(res.body.users.length).toBeGreaterThanOrEqual(1);
    expect(res.body.posts.length).toBeGreaterThanOrEqual(1);
  });
});
