const request = require('supertest');
const app = require('../src/app');
const store = require('../src/data/store');

describe('Users API', () => {
  beforeEach(() => store.reset());

  test('create user -> 201', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Alice');
  });

  test('get users -> empty array initially', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('get user not found -> 404', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
  });

  test('update user -> 200', async () => {
    const u = store.createUser({ name: 'B', email: 'b@example.com' });
    const res = await request(app).put('/api/users/' + u.id).send({ name: 'B2' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('B2');
  });

  test('delete user -> 204', async () => {
    const u = store.createUser({ name: 'C', email: 'c@example.com' });
    const res = await request(app).delete('/api/users/' + u.id);
    expect(res.status).toBe(204);
  });
});
