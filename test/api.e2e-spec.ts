import * as request from 'supertest';
import { app, db } from './setup';

describe('APIController (e2e)', () => {
  afterAll(async () => {
    await db.collection('data').drop();
  });

  it('/ (takeWebData): It should persist a web data into the database', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/payloads')
      .send({
        ts: '20200208',
        sender: 'first-e2e-user',
        message: {
          foo: 'bar',
          baz: 'bang',
        },
        sent_from_ip: '19.117.63.126',
        priority: 4,
      })
      .expect(201)
      .set('created', 'application/json');
    expect(response.body).toEqual({});
  });

  it('/ (takeWebData): It should persist another web data into the database', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/payloads')
      .send({
        ts: '2020-02-08T0',
        sender: 'second-e2e-user',
        message: {
          foo: 'foo without baz',
        },
        sent_from_ip: '19.117.63.126',
        priority: 4,
      })
      .expect(201)
      .set('created', 'application/json');
    expect(response.body).toEqual({});
  });

  it('/ (takeWebData): It should be rejected, because message should have at least one field', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/payloads')
      .send({
        ts: '20200208',
        sender: 'first-e2e-user',
        sent_from_ip: '19.117.63.126',
        priority: 4,
      })
      .expect(400)
      .set('created', 'application/json');
  });

  it('/ (takeWebData): It should be rejected, because sent_from_ip is `Ipv6` NOT `Ipv4`', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/payloads')
      .send({
        ts: '20200208',
        sender: 'first-e2e-user',
        message: {
          foo: 'bar',
          baz: 'bang',
        },
        sent_from_ip: '684D:1111:222:3333:4444:5555:6:77',
        priority: 4,
      })
      .expect(400)
      .set('created', 'application/json');
  });

  it('/ (takeWebData): It should be rejected, because of non-whitelisted property', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/payloads')
      .send({
        ts: '20200208',
        sender: 'first-e2e-user',
        message: {
          foo: 'bar',
          baz: 'bang',
        },
        sent_from_ip: '19.117.63.126',
        priority: 4,
        non_whitelisted: 'Poor field, pity!',
      })
      .expect(400)
      .set('created', 'application/json');
  });
});
