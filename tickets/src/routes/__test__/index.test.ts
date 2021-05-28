import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
  return request(app)
  .post('/api/tickets')
  .set('Cookie', global.signup())
  .send({
    title: 'asda',
    price: 20
  });
}

it('should return list of all created tickets', async () => {

  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
   .get('/api/tickets')
   .send()
   .expect(200)

  expect(response.body.length).toEqual(3);
});