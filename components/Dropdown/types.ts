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

export type DropdownItemsProps = {
  item: DropdownDataType<any, any>;
  select: (item: DropdownDataType<any, any>) => void;
};
