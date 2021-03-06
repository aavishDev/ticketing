import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a route handler listening to /api/tickets for post request', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})
  expect(response.status).not.toEqual(404);
});

it('can only be accessed if a user is signed in', async () => {
  return await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)
});

it('does not return 401 if a user is signed in', async () => {
  return await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'asda',
      price: 20
    })
    .expect(201)
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: '',
      price: 20
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: '',
      price: 20
    })
    .expect(400)
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'sadaad',
      price: -20
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'asdadad'
    })
    .expect(400)
});

it('creates a ticket with valid inputs', async () => {

  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'testTicket',
      price: 100
    })
    .expect(201)

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual('testTicket');
  expect(tickets[0].price).toEqual(100);
});