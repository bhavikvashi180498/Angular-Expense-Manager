/**
 * Transaction Type enumeration
 */
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer'
}

/**
 * Income Category enumeration
 */
export enum IncomeCategory {
  SALARY = 'salary',
  BONUS = 'bonus',
  INVESTMENT = 'investment',
  FREELANCE = 'freelance',
  GIFT = 'gift',
  REFUND = 'refund',
  INTEREST = 'interest',
  DIVIDEND = 'dividend',
  OTHER_INCOME = 'other_income'
}

/**
 * Expense Category enumeration
 */
export enum ExpenseCategory {
  FOOD = 'food',
  TRANSPORTATION = 'transportation',
  UTILITIES = 'utilities',
  ENTERTAINMENT = 'entertainment',
  SHOPPING = 'shopping',
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  PERSONAL = 'personal',
  HOUSING = 'housing',
  INSURANCE = 'insurance',
  SUBSCRIPTIONS = 'subscriptions',
  OTHER_EXPENSE = 'other_expense'
}

/**
 * Transfer Category (for transfer transactions)
 */
export enum TransferCategory {
  SAVINGS = 'savings',
  INVESTMENT = 'investment',
  OTHER_ACCOUNT = 'other_account'
}

/**
 * Main Transaction Model
 */
export interface Transaction {
  id?: string;
  type: TransactionType;
  date: Date | string;
  amount: number;
  category: IncomeCategory | ExpenseCategory | TransferCategory | string;
  account: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

/**
 * Income Transaction
 */
export interface IncomeTransaction extends Transaction {
  type: TransactionType.INCOME;
  category: IncomeCategory | string;
}

/**
 * Expense Transaction
 */
export interface ExpenseTransaction extends Transaction {
  type: TransactionType.EXPENSE;
  category: ExpenseCategory | string;
}

/**
 * Transfer Transaction
 */
export interface TransferTransaction extends Transaction {
  type: TransactionType.TRANSFER;
  category: TransferCategory | string;
}

/**
 * Transaction Request DTO (for API calls)
 */
export interface CreateTransactionRequest {
  type: TransactionType;
  date: string;
  amount: number;
  category: IncomeCategory | ExpenseCategory | TransferCategory | string;
  account: string;
  description?: string;
}

/**
 * Income Transaction Request DTO
 */
export interface CreateIncomeTransactionRequest extends CreateTransactionRequest {
  type: TransactionType.INCOME;
  category: IncomeCategory | string;
}

/**
 * Expense Transaction Request DTO
 */
export interface CreateExpenseTransactionRequest extends CreateTransactionRequest {
  type: TransactionType.EXPENSE;
  category: ExpenseCategory | string;
}

/**
 * Transfer Transaction Request DTO
 */
export interface CreateTransferTransactionRequest extends CreateTransactionRequest {
  type: TransactionType.TRANSFER;
  category: TransferCategory | string;
}

/**
 * Transaction Response DTO (from API)
 */
export interface TransactionResponse extends Transaction {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Transaction Summary (for dashboard/statistics)
 */
export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  totalTransfer: number;
  netBalance: number;
  transactionCount: number;
}

/**
 * Transaction Filter
 */
export interface TransactionFilter {
  type?: TransactionType;
  category?: string;
  account?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  minAmount?: number;
  maxAmount?: number;
}
