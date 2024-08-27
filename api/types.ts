export type AssetType = {
  id?: number;
  bill_day?: number;
  repayment_day?: number;
  name: string;
  balance: number;
  is_credit: boolean;
  credit_limit: number;
  is_total_asset: boolean;
  is_no_budget: boolean;
  note: string;
  //asset group id: UI group will contain group name and the format is "id-name"
  // From backend, it only returns an id.
  group: number | string;
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
  monthly_goal: number | null;
};
