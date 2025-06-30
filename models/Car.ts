import mongoose, { Schema, Document, Types } from "mongoose";

interface InspectionItem {
  criteriaId: Types.ObjectId;
  is_good: boolean;
  note?: string;
}

export interface CarDocument extends Document {
  name: string;
  status: number; // 0: chưa kiểm tra, 1: đang kiểm tra, 2: đã kiểm tra
  inspection: InspectionItem[];
}

const InspectionSchema = new Schema<InspectionItem>(
  {
    criteriaId: {
      type: Schema.Types.ObjectId,
      ref: "Criteria",
      required: true,
    },
    is_good: {
      type: Boolean,
      required: true,
    },
    note: {
      type: String,
      required: function (this: InspectionItem) {
        return this.is_good === false;
      },
    },
  },
  { _id: false }
);

const CarSchema = new Schema<CarDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    inspection: {
      type: [InspectionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Car ||
  mongoose.model<CarDocument>("Car", CarSchema);
