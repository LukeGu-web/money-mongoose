export type AccountType = {
  accountName: string;
  group: string;
  balance: string;
  isCredit: boolean;
  creditLimit: string;
  billDay: Date;
  repaymentDay: Date;
  isTotalAssets: boolean;
  isNoBudget: boolean;
  note: string;
};
