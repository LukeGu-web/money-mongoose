import { z } from 'zod';

export enum RecordTypes {
  EXPENSE = 'expense',
  INCOME = 'income',
}

// export type RecordVariables = {
//   type: RecordTypes;
//   category: string;
//   subcategory: string;
//   note: string;
//   amount: number;
// };

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
}
