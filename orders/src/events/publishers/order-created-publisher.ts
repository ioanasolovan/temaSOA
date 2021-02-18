import { Publisher, OrderCreatedEvent, Subjects } from '@temasoa/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
