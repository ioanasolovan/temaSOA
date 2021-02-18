import { Subjects } from './subjects';

export interface ElementCreatedEvent {
  subject: Subjects.ElementCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
