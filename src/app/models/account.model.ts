/**
 * Account Type enumeration
 */
export enum AccountType {
  WALLET = 'wallet',
  CREDIT_CARD = 'credit_card',
  SAVINGS = 'savings',
  FIXED_DEPOSIT = 'fixed_deposit'
}

/**
 * Account Status enumeration
 */
export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CLOSED = 'closed',
  SUSPENDED = 'suspended'
}

/**
 * Currency enumeration (common currencies)
 */
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  INR = 'INR',
  JPY = 'JPY',
  AUD = 'AUD',
  CAD = 'CAD'
}

/**
 * Main Account Model
 */
export interface Account {
  id?: string;
  name: string;
  accountType: AccountType;
  balance: number;
  currency: Currency | string;
  status: AccountStatus;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  lastTransactionDate?: Date | string;
}

/**
 * Wallet Account (for cash/mobile payments)
 */
export interface WalletAccount extends Account {
  accountType: AccountType.WALLET;
  provider?: string; // e.g., PayPal, Google Pay, Apple Pay
  limit?: number; // Transaction limit
}

/**
 * Credit Card Account
 */
export interface CreditCardAccount extends Account {
  accountType: AccountType.CREDIT_CARD;
  cardNumber?: string; // Last 4 digits: ****1234
  issuer?: string; // e.g., Visa, Mastercard, Amex
  creditLimit: number;
  availableCredit: number;
  interestRate?: number; // Annual percentage rate
  dueDate?: number; // Day of month (e.g., 15)
  minimumPayment?: number;
}

/**
 * Savings Account
 */
export interface SavingsAccount extends Account {
  accountType: AccountType.SAVINGS;
  interestRate: number; // Annual percentage rate
  accountNumber?: string;
  bankName?: string;
  withdrawalLimit?: number; // Monthly withdrawal limit
  minimumBalance?: number;
}

/**
 * Fixed Deposit Account (Certificate of Deposit)
 */
export interface FixedDepositAccount extends Account {
  accountType: AccountType.FIXED_DEPOSIT;
  principalAmount: number; // Original deposit amount
  interestRate: number; // Annual percentage rate
  maturityDate: Date | string;
  tenure: number; // In months
  bankName?: string;
  autoRenewal?: boolean;
  penaltyForEarlyWithdrawal?: number; // Percentage
}

/**
 * Account Request DTO (for API calls)
 */
export interface CreateAccountRequest {
  name: string;
  accountType: AccountType;
  balance: number;
  currency: Currency | string;
  description?: string;
}

/**
 * Wallet Account Request DTO
 */
export interface CreateWalletAccountRequest extends CreateAccountRequest {
  accountType: AccountType.WALLET;
  provider?: string;
  limit?: number;
}

/**
 * Credit Card Account Request DTO
 */
export interface CreateCreditCardAccountRequest extends CreateAccountRequest {
  accountType: AccountType.CREDIT_CARD;
  cardNumber?: string;
  issuer?: string;
  creditLimit: number;
  availableCredit: number;
  interestRate?: number;
  dueDate?: number;
  minimumPayment?: number;
}

/**
 * Savings Account Request DTO
 */
export interface CreateSavingsAccountRequest extends CreateAccountRequest {
  accountType: AccountType.SAVINGS;
  interestRate: number;
  accountNumber?: string;
  bankName?: string;
  withdrawalLimit?: number;
  minimumBalance?: number;
}

/**
 * Fixed Deposit Account Request DTO
 */
export interface CreateFixedDepositAccountRequest extends CreateAccountRequest {
  accountType: AccountType.FIXED_DEPOSIT;
  principalAmount: number;
  interestRate: number;
  maturityDate: string;
  tenure: number;
  bankName?: string;
  autoRenewal?: boolean;
  penaltyForEarlyWithdrawal?: number;
}

/**
 * Account Response DTO (from API)
 */
export interface AccountResponse extends Account {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Account Summary (for dashboard)
 */
export interface AccountSummary {
  totalAccounts: number;
  totalBalance: number;
  activeAccounts: number;
  inactiveAccounts: number;
  accountsByType: {
    wallets: number;
    creditCards: number;
    savings: number;
    fixedDeposits: number;
  };
  accountsBalance: {
    walletsTotalBalance: number;
    creditCardsTotalBalance: number;
    savingsTotalBalance: number;
    fixedDepositsTotalBalance: number;
  };
}

/**
 * Account Filter
 */
export interface AccountFilter {
  type?: AccountType;
  status?: AccountStatus;
  currency?: Currency | string;
  minBalance?: number;
  maxBalance?: number;
}

/**
 * Account Statistics
 */
export interface AccountStatistics {
  accountId: string;
  accountName: string;
  accountType: AccountType;
  totalTransactions: number;
  totalIncome: number;
  totalExpense: number;
  totalTransfer: number;
  averageTransactionAmount: number;
  lastTransactionDate?: Date | string;
}
