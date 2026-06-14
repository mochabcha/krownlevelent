import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

process.env.RESEND_API_KEY = '';

vi.mock('../src/db/connect.js', () => ({
  isDatabaseConnected: () => false,
}));

const { createApp } = await import('../src/app.js');

describe('public API', () => {
  it('returns fallback content when Mongo is unavailable', async () => {
    const response = await request(createApp()).get('/api/site-content').expect(200);
    expect(response.body.blocks.hero.headingAccent).toBe('Personal Sovereignty.');
    expect(response.body.events).toHaveLength(3);
  });

  it('validates contact submissions', async () => {
    await request(createApp())
      .post('/api/contact')
      .send({ name: '', email: 'bad', interest: '' })
      .expect(400);
  });

  it('accepts a valid contact submission without Resend in development', async () => {
    const response = await request(createApp())
      .post('/api/contact')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        interest: 'Plant Klub',
        message: 'Hello',
      })
      .expect(200);

    expect(response.body.ok).toBe(true);
  });
});
