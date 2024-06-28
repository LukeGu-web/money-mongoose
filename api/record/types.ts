import { z } from 'zod';

export enum RecordTypes {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export const RecordVariablesSchema = z.object({
  type: z.enum(['expense', 'income']),
  category: z.string(),
  subcategory: z.string().optional(),
  note: z.string(),
  amount: z.number(),
});

export type RecordVariables = z.infer<typeof RecordVariablesSchema>;

export interface Record extends RecordVariables {
  id: number;
  author: string;
  created_at: string;
  updated_at: string;
}

export type RecordsByDay = {
  date: string;
  sum_of_income: number;
  sum_of_expense: number;
  records: Record[];
};
