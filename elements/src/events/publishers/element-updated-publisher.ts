import { Publisher, Subjects, ElementUpdatedEvent } from '@temasoa/common';

export class ElementUpdatedPublisher extends Publisher<ElementUpdatedEvent> {
  subject: Subjects.ElementUpdated = Subjects.ElementUpdated;
}
