import mongoose, { Schema, Document } from 'mongoose';

export interface CriteriaDocument extends Document {
  name: string;
}

const CriteriaSchema = new Schema<CriteriaDocument>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Criteria || mongoose.model<CriteriaDocument>('Criteria', CriteriaSchema);
