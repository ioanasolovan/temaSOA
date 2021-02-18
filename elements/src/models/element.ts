import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ElementAttrs {
    title: string;
    price: number;
    userId: string;
}

interface ElementDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
    version: number;
}

interface ElementModel extends mongoose.Model<ElementDoc> {
    build(attrs: ElementAttrs): ElementDoc;
}

const elementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

elementSchema.set('versionKey', 'version');
elementSchema.plugin(updateIfCurrentPlugin);

elementSchema.statics.build = (attrs: ElementAttrs) => {
    return new Element(attrs);
};

const Element = mongoose.model<ElementDoc, ElementModel>('Element', elementSchema);

export { Element };