import { Publisher, Subjects, TicketUpdatedEvent } from '@ticketing30/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}