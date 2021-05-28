import { Publisher, Subjects, TicketCreatedEvent } from '@ticketing30/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}