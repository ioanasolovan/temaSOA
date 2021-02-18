import express, { Request, Response } from 'express';
import { Element } from '../models/element';

const router = express.Router();

router.get('/api/elements', async (req: Request, res: Response) => {
    const elements = await Element.find({});

    res.send(elements);
});

export { router as indexElementRouter };