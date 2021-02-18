import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotFoundError, BadRequestError } from '@temasoa/common';
import { body } from 'express-validator';
import { Element } from '../models/element';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('elementId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('ElementId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { elementId } = req.body;
    console.log('aici');
    // Find the element the user is trying to order in the database
    const element = await Element.findById(elementId);
    if (!element) {
      throw new NotFoundError();
    }

     // Build the order and save it to the database
     const order = Order.build({
      userId: req.currentUser!.id,
      element
    });
    await order.save();

    // Publish an event saying that an order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      userId: order.userId,
      version: element.version,
      element: {
        id: element.id,
        price: element.price,
      },
    });


   
    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
