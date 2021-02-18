import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@temasoa/common';
import { Element } from '../models/element';
import { ElementCreatedPublisher } from '../events/publishers/element-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/elements', requireAuth, [
    body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const element = Element.build({
      title, 
      price, 
      userId: req.currentUser!.id
    });
    await element.save();
    await new ElementCreatedPublisher(natsWrapper.client).publish({
      id: element.id,
      title: element.title,
      price: element.price,
      userId: element.userId,
      version: element.version
    });
    res.status(201).send(element);
});

export { router as createElementRouter };
