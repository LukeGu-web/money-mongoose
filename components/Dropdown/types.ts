export type DropdownDataType<T, U> = {
  key: T;
  value: U;
};

export type DropdownProps = {
  testID?: string;
  testIDDropdown?: string;
  data: DropdownDataType<any, any>[];
  placeholder: string;
  selected: DropdownDataType<any, any> | null;
  setSelected: (selected: DropdownDataType<any, any> | null) => void;
};

export type DropdownItemProps = {
  item: DropdownDataType<any, any>;
  select: (item: DropdownDataType<any, any>) => void;
};

export type CountryType = {
  country: string;
  currency_code: string;
  iso2: string;
};

export type CurrencyItemProps = {
  item: CountryType;
  onSelect: (item: CountryType) => void;
};
