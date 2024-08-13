export type AssetType = {
  id: number;
  bill_day: Date;
  repayment_day: Date;
  name: string;
  balance: number;
  is_credit: boolean;
  credit_limit: number;
  is_total_asset: boolean;
  is_no_budget: boolean;
  note: string;
  group: number; //asset group id
};

export type AssetGroupType = {
  id: number;
  book: number; //book id
  name: string;
  assets: AssetType[];
};

export type BookType = {
  id: number;
  groups: AssetGroupType[];
  name: string;
  note: string;
};
