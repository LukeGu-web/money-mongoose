import { ReactNode } from 'react';

type TitleType = {
  text: string;
  number: number;
  amount: number;
};

export type GroupTitleProps = {
  id?: number;
  title: TitleType;
  children: ReactNode;
  height?: number;
};
