import { EResponseState } from './index';

export interface IResponseFormat {
  state: EResponseState;
  msg: string;
  data: any;
}
