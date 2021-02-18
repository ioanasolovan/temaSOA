import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { ElementCreatedEvent } from './element-created-event';
import { Subjects } from './subjects';

export class ElementCreatedListener extends Listener<ElementCreatedEvent> {
  subject: Subjects.ElementCreated = Subjects.ElementCreated;
  queueGroupName = 'payments-service';

  onMessage(data: ElementCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}
