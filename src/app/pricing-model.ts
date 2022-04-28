export interface PricingModel{
  applicationName:string;
  phoneNumber: string;
  address: string;
  loanDate: string;
  loanOfficer:string ;
  branchOffice:string ;
  branchaddress:string ;
  branchPhone:string;
  calcDate: string;
  fsaguarantee: number;
  loantype: number;
  lienpos: number;
  loanAmnt: string;
  paymentfreq: number;
  pd: number;
  ballonyrs:number;
  locateral: number;
  feeAmnt: string;
  stockAmnt:string;
  lgd: number;
  ballon: number;
  AmorType1: string;
  AmorTerm1: number;
  loanProd1: number;
  TransferOption1:string;
  IntRate1: string;
  PayAmnt1: string;
  AmorType2: string;
  AmorTerm2: number;
  loanProd2: number;
  TransferOption2: string;
  IntRate2: string;
  PayAmnt2: string;
  AmorType3: string
  AmorTerm3: number;
  loanProd3: number;
  TransferOption3: string;
  IntRate3: string;
  PayAmnt3: string;
  RecomRate1: string;
  RecomSpread1: string;
  Variance1: number;
  finalSpread1: string;
  RecomRate2: string;
  RecomSpread2: string;
  Variance2:number;
  finalSpread2: string;
  RecomRate3: string;
  RecomSpread3: string;
  Variance3: number;
  finalSpread3: string;
  COF1:string;
  COF2:string;
  COF3:string;
}