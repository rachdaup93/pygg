export interface BankInfo {
  title: string,
  totalValue: number,
  date: any,
  dateFormatted: string,
  payments: {
    startDate: any;
    remainingCost: number,
    period: number,
    numberPaymentsLeft: number
  }
}
