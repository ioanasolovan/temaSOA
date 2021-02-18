import { Publisher } from './base-publisher';
import { ElementCreatedEvent } from './element-created-event';
import { Subjects } from './subjects';

export class ElementCreatedPublisher extends Publisher<ElementCreatedEvent> {
  subject: Subjects.ElementCreated = Subjects.ElementCreated;
}
