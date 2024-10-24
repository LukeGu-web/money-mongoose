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
  groups?: AssetGroupType[];
  name: string;
  note: string;
  monthly_goal: number | null;
};

export type UserType = {
  id: number;
  user: {
    id: number;
    last_login: string | null;
    is_superuser: false;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    groups: [];
    user_permissions: [];
  };
  account_id: string | null;
  avatar: string | null;
  nickname: string;
  account_status: string;
};

export type PieChartDataType = {
  value: number;
  color: string;
  text: string;
}[];

export enum OAuthProviderTypes {
  APPLE = 'apple',
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}
