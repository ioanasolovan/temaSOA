import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError, requireAuth, NotAuthorizedError} from '@temasoa/common';
import { Element } from '../models/element';
import { ElementUpdatedPublisher } from '../events/publishers/element-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/elements/:id', requireAuth, [
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
    const element = await Element.findById(req.params.id);
   
   if (!element){
       throw new NotFoundError();
   }
   if (element.userId !== req.currentUser!.id){
       throw new NotAuthorizedError();
   }

   element.set({
    title: req.body.title,
    price: req.body.price
   });
   await element.save();

   new ElementUpdatedPublisher(natsWrapper.client).publish({
    id: element.id,
    title: element.title,
    price: element.price,
    userId: element.userId,
    version: element.version
   });

   res.send(element);
});

export { router as updateElementRouter };