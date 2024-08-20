import { z } from 'zod';

export enum RecordTypes {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export const RecordSchema = z.object({
  id: z.number().optional(),
  type: z.enum(['expense', 'income']),
  category: z.string().trim().min(1, { message: 'Required' }),
  subcategory: z.string().optional(),
  note: z.string(),
  amount: z.number().gt(0),
  date: z.string(),
  asset: z.number().nullable(),
  book: z.number(),
  is_marked_tax_return: z.boolean(),
});

export type Record = z.infer<typeof RecordSchema>;

export type RecordsByDay = {
  date: string;
  sum_of_income: number;
  sum_of_expense: number;
  records: Record[];
};
