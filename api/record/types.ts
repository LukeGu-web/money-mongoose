import { z } from 'zod';

export enum RecordTypes {
  EXPENSE = 'expense',
  INCOME = 'income',
  TRANSFER = 'transfer',
}

// for record state use
export const RecordSchema = z.object({
  id: z.number().optional(),
  book: z.number(),
  date: z.string(),
  type: z.enum(['expense', 'income', 'transfer']),
  category: z.string().trim().min(1, { message: 'Required' }).optional(),
  subcategory: z.string().optional(),
  note: z.string().optional(),
  amount: z.number().gt(0),
  is_marked_tax_return: z.boolean(),
  asset: z.string().optional(),
  // Transfer variables
  from_asset: z.string().optional(),
  to_asset: z.string().optional(),
});

export type Record = z.infer<typeof RecordSchema>;

// for api use
export type RecordAPI = {
  id?: number;
  book: number;
  amount: number;
  date: string;
  asset?: number;
  type: RecordTypes;
  category: string;
  subcategory?: string;
  note?: string;
  is_marked_tax_return: boolean;
};

export type TransferAPI = {
  id?: number;
  book: number;
  amount: number;
  date: string;
  note?: string;
  from_asset: number;
  to_asset: number;
};

export type RecordsByDay = {
  date: string;
  sum_of_income: number;
  sum_of_expense: number;
  records: (RecordAPI | TransferAPI)[];
};
