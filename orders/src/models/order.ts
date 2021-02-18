import mongoose from 'mongoose';
import { ElementDoc } from './element';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';


interface OrderAttrs {
  userId: string;
  element: ElementDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  element: ElementDoc;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    element: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Element',
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

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
