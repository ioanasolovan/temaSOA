import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ElementUpdatedEvent } from '@temasoa/common';
import { Element } from '../../models/element';
import { queueGroupName } from './queue-group-name';

export class ElementUpdatedListener extends Listener<ElementUpdatedEvent> {
  subject: Subjects.ElementUpdated = Subjects.ElementUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ElementUpdatedEvent['data'], msg: Message) {
    
    const element = await Element.findByEvent(data);
    
    if (!element){
        throw new Error('Element not found');
    }

    const { title, price } = data;
    element.set({ title, price });
    await element.save();
    
    msg.ack();
  }
}
