import { StatisticVariant } from './statisticVariant.type';

export type Statistic = {
  key: string;
  total: number;
  variants: StatisticVariant[];
}[];
