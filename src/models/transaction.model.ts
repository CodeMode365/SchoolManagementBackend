import { TransactionStatusType } from '@/config/enums.config';
import type { TransactionSchemaType } from '@/types/model';
import { model, Schema } from 'mongoose';

const transactionSchema = new Schema<TransactionSchemaType>(
    {
        amount: {
            type: Number,
            required: [true, 'Transaction amount is required'],
            min: [0, 'Transaction amount cannot be negative'],
        },
        type: {
            type: String,
            required: [true, 'Transaction type is required'],
            enum: ['credit', 'debit'],
        },
        status: {
            type: String,
            enum: TransactionStatusType,
            required: [true, 'Transaction status is required'],
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        organization: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

transactionSchema.index({

})



const Transaction = model('Transaction', transactionSchema);
export default Transaction