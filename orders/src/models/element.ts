import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ElementAttrs {
  id: string;
  title: string;
  price: number;
}

export interface ElementDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
}

interface ElementModel extends mongoose.Model<ElementDoc> {
  build(attrs: ElementAttrs): ElementDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<ElementDoc | null>;
}

const elementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

elementSchema.set('versionKey', 'version');
elementSchema.plugin(updateIfCurrentPlugin);

elementSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Element.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

elementSchema.statics.build = (attrs: ElementAttrs) => {
  return new Element({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price
  });
};

const Element = mongoose.model<ElementDoc, ElementModel>('Element', elementSchema);

export { Element };
