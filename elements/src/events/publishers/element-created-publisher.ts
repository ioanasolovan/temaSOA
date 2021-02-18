import { Publisher, Subjects, ElementCreatedEvent } from '@temasoa/common';

export class ElementCreatedPublisher extends Publisher<ElementCreatedEvent> {
  subject: Subjects.ElementCreated = Subjects.ElementCreated;
}
