import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ElementCreatedEvent } from '@temasoa/common';
import { Element } from '../../models/element';
import { queueGroupName } from './queue-group-name';

export class ElementCreatedListener extends Listener<ElementCreatedEvent> {
  subject: Subjects.ElementCreated = Subjects.ElementCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ElementCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const element = Element.build({
      id,
      title,
      price,
    });
    await element.save();

    msg.ack();
  }
}
