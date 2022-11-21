import { Institution } from './institutions';

export interface Account {
  holderId: string,
  holderName: string,
  number: string,
  type: string,
  institution: Institution,
}
