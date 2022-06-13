export interface CostOfFundsRequest {
  correlationId: string;
  loanNumber: string;
  loanAmount: number;
  amortizationType: string;
  amortizationTypeId: number;
  amortizationTermMonths: number;
  loanTermMonths: number;
  paymentsPerYear: number;
  interestOnlyPayments: number;
  rateProduct: string;
  optionCategory: string;
  optionCategoryId: number;
  lockCategory: string;
  lockCategoryId: number;
 
}
export interface Roundingrule {
  Type: string;
  Precision: number;
  BasisPoint: number;
}