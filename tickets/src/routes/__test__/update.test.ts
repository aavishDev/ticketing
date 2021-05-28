import request from 'supertest';
import { app } from '../../app';
import mongoose  from 'mongoose';


it('returns 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signup())
    .send({
      title: 'testticket',
      price: 200
    })
    .expect(404)
})

it('returns 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'testticket',
      price: 200
    })
    .expect(401)
})

it('returns 401 if the user is not owner of the ticket', async () => {
  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', global.signup())
    .send({
      title: 'testticket',
      price: 200
    })
    .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signup())
    .send({
      title: 'testticketChanged',
      price: 100
    })
    .expect(401)
})

it('returns 400 if the user provides invalid title or price', async () => {
  const cookie = global.signup();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', cookie)
    .send({
      title: 'testticket',
      price: 200
    })
    .expect(201)
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 100
    })
    .expect(400)
})

it('returns 200 if the user provides valid inputs to update a ticket', async () => {
  const cookie = global.signup();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', cookie)
    .send({
      title: 'testticket',
      price: 200
    })
    .expect(201)
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'ticketUpdated',
      price: 100
    })
    .expect(200)

  const updatedTicketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200)

  expect(updatedTicketResponse.body.title).toEqual('ticketUpdated');
  expect(updatedTicketResponse.body.price).toEqual(100);

})
