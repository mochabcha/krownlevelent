import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/db/connect.js', () => ({
  isDatabaseConnected: () => false,
}));

const { createApp } = await import('../src/app.js');

describe('auth routes without Mongo', () => {
  it('reports setup required and Mongo dependency when no database is connected', async () => {
    const response = await request(createApp()).get('/api/auth/state').expect(200);
    expect(response.body).toMatchObject({ setupRequired: true, mongoRequired: true });
  });

  it('rejects setup when Mongo is unavailable', async () => {
    const response = await request(createApp())
      .post('/api/auth/setup')
      .send({
        username: 'admin',
        setupCode: 'code',
        password: 'twelve chars',
        confirmPassword: 'twelve chars',
      })
      .expect(503);

    expect(response.body.error).toContain('MongoDB');
  });
});
