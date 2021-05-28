import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('should return 404 if a ticket does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404)
});


it('should return ticket if a ticket exists', async () => {

  const title = 'testTicket';
  const price = 100;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title,
      price
    })
    .expect(201)

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .expect(200)

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);

});
