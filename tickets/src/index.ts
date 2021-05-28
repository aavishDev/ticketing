import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';


const start = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await natsWrapper.connect('ticketing', 'aavish', 'http://nats-srv:4222');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed for Ticketing Service');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    console.log('Connected to Tickets Mongo');
    app.listen(3001, () => console.log('Tickets service running on 3001'));
  } catch (err) {
    console.error(err);
  }
}

start();
