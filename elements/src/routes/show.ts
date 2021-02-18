import express, { Request, Response } from 'express';
import { Element } from '../models/element';
import { NotFoundError } from '@temasoa/common';

const router = express.Router();

router.get('/api/elements/:id', async (req: Request, res: Response) => {
    const element = await Element.findById(req.params.id);
    if (!element){
        throw new NotFoundError();
    }
    res.send(element);
});

export { router as showElementRouter };