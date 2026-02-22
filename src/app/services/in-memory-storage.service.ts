import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import {
  Transaction,
  TransactionResponse,
  CreateTransactionRequest,
  TransactionFilter
} from '../models/transaction.model';
import {
  Account,
  AccountResponse,
  CreateAccountRequest,
  AccountFilter,
  AccountType,
  AccountStatus
} from '../models/account.model';

/**
 * In-Memory Storage Service
 * Manages all data in application memory without external API calls
 */
@Injectable({
  providedIn: 'root'
})
export class InMemoryStorageService {
  private transactions: Map<string, TransactionResponse> = new Map();
  private accounts: Map<string, AccountResponse> = new Map();

  private transactionsSubject = new BehaviorSubject<TransactionResponse[]>([]);
  private accountsSubject = new BehaviorSubject<AccountResponse[]>([]);

  public transactions$ = this.transactionsSubject.asObservable();
  public accounts$ = this.accountsSubject.asObservable();

  constructor() {
    this.initializeSampleData();
  }

  /**
   * Initialize with sample data for demo purposes
   */
  private initializeSampleData(): void {
    // Sample accounts
    const sampleAccounts: AccountResponse[] = [
      {
        id: uuid(),
        name: 'My Wallet',
        accountType: AccountType.WALLET,
        balance: 1500,
        currency: 'USD',
        status: AccountStatus.ACTIVE,
        description: 'Personal wallet',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuid(),
        name: 'Visa Card',
        accountType: AccountType.CREDIT_CARD,
        balance: 2500,
        currency: 'USD',
        status: AccountStatus.ACTIVE,
        description: 'Personal Visa card',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuid(),
        name: 'Savings Account',
        accountType: AccountType.SAVINGS,
        balance: 25000,
        currency: 'USD',
        status: AccountStatus.ACTIVE,
        description: 'Primary savings account',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Sample transactions
    const sampleTransactions: TransactionResponse[] = [
      {
        id: uuid(),
        type: 'income',
        date: new Date().toISOString().split('T')[0],
        amount: 5000,
        category: 'salary',
        account: 'My Wallet',
        description: 'Monthly salary',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuid(),
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        amount: 50,
        category: 'food',
        account: 'Visa Card',
        description: 'Lunch',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    sampleAccounts.forEach(account => this.accounts.set(account.id, account));
    sampleTransactions.forEach(transaction => this.transactions.set(transaction.id, transaction));

    this.accountsSubject.next(Array.from(this.accounts.values()));
    this.transactionsSubject.next(Array.from(this.transactions.values()));
  }

  // ==================== TRANSACTION METHODS ====================

  /**
   * Get all transactions
   */
  getTransactions(): TransactionResponse[] {
    return Array.from(this.transactions.values());
  }

  /**
   * Get transaction by ID
   */
  getTransactionById(id: string): TransactionResponse | undefined {
    return this.transactions.get(id);
  }

  /**
   * Create a new transaction
   */
  createTransaction(request: CreateTransactionRequest): TransactionResponse {
    const transaction: TransactionResponse = {
      id: uuid(),
      ...request,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.transactions.set(transaction.id, transaction);
    this.updateTransactionsSubject();
    return transaction;
  }

  /**
   * Update a transaction
   */
  updateTransaction(id: string, updates: Partial<CreateTransactionRequest>): TransactionResponse | undefined {
    const transaction = this.transactions.get(id);
    if (transaction) {
      const updated: TransactionResponse = {
        ...transaction,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.transactions.set(id, updated);
      this.updateTransactionsSubject();
      return updated;
    }
    return undefined;
  }

  /**
   * Delete a transaction
   */
  deleteTransaction(id: string): boolean {
    const deleted = this.transactions.delete(id);
    if (deleted) {
      this.updateTransactionsSubject();
    }
    return deleted;
  }

  /**
   * Filter transactions
   */
  filterTransactions(filter: TransactionFilter): TransactionResponse[] {
    return Array.from(this.transactions.values()).filter(transaction => {
      if (filter.type && transaction.type !== filter.type) return false;
      if (filter.category && transaction.category !== filter.category) return false;
      if (filter.account && transaction.account !== filter.account) return false;
      if (filter.minAmount && transaction.amount < filter.minAmount) return false;
      if (filter.maxAmount && transaction.amount > filter.maxAmount) return false;
      return true;
    });
  }

  /**
   * Get transactions by date range
   */
  getTransactionsByDateRange(startDate: string, endDate: string): TransactionResponse[] {
    return Array.from(this.transactions.values()).filter(t => {
      const transactionDate = new Date(t.date).getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      return transactionDate >= start && transactionDate <= end;
    });
  }

  /**
   * Get transactions by category
   */
  getTransactionsByCategory(category: string): TransactionResponse[] {
    return Array.from(this.transactions.values()).filter(t => t.category === category);
  }

  /**
   * Get transactions by account
   */
  getTransactionsByAccount(account: string): TransactionResponse[] {
    return Array.from(this.transactions.values()).filter(t => t.account === account);
  }

  /**
   * Get transaction summary
   */
  getTransactionSummary() {
    const transactions = Array.from(this.transactions.values());
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalTransfer = transactions
      .filter(t => t.type === 'transfer')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      totalTransfer,
      netBalance: totalIncome - totalExpense,
      transactionCount: transactions.length
    };
  }

  // ==================== ACCOUNT METHODS ====================

  /**
   * Get all accounts
   */
  getAccounts(): AccountResponse[] {
    return Array.from(this.accounts.values());
  }

  /**
   * Get account by ID
   */
  getAccountById(id: string): AccountResponse | undefined {
    return this.accounts.get(id);
  }

  /**
   * Create a new account
   */
  createAccount(request: CreateAccountRequest): AccountResponse {
    const account: AccountResponse = {
      id: uuid(),
      ...request,
      status: AccountStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.accounts.set(account.id, account);
    this.updateAccountsSubject();
    return account;
  }

  /**
   * Update an account
   */
  updateAccount(id: string, updates: Partial<CreateAccountRequest>): AccountResponse | undefined {
    const account = this.accounts.get(id);
    if (account) {
      const updated: AccountResponse = {
        ...account,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.accounts.set(id, updated);
      this.updateAccountsSubject();
      return updated;
    }
    return undefined;
  }

  /**
   * Update account balance
   */
  updateAccountBalance(id: string, newBalance: number): AccountResponse | undefined {
    const account = this.accounts.get(id);
    if (account) {
      const updated: AccountResponse = {
        ...account,
        balance: newBalance,
        updatedAt: new Date().toISOString()
      };
      this.accounts.set(id, updated);
      this.updateAccountsSubject();
      return updated;
    }
    return undefined;
  }

  /**
   * Delete an account
   */
  deleteAccount(id: string): boolean {
    const deleted = this.accounts.delete(id);
    if (deleted) {
      this.updateAccountsSubject();
    }
    return deleted;
  }

  /**
   * Filter accounts
   */
  filterAccounts(filter: AccountFilter): AccountResponse[] {
    return Array.from(this.accounts.values()).filter(account => {
      if (filter.type && account.accountType !== filter.type) return false;
      if (filter.status && account.status !== filter.status) return false;
      if (filter.currency && account.currency !== filter.currency) return false;
      if (filter.minBalance && account.balance < filter.minBalance) return false;
      if (filter.maxBalance && account.balance > filter.maxBalance) return false;
      return true;
    });
  }

  /**
   * Get accounts by type
   */
  getAccountsByType(type: AccountType): AccountResponse[] {
    return Array.from(this.accounts.values()).filter(a => a.accountType === type);
  }

  /**
   * Get account summary
   */
  getAccountSummary() {
    const accounts = Array.from(this.accounts.values());
    const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
    const activeAccounts = accounts.filter(a => a.status === AccountStatus.ACTIVE).length;
    const inactiveAccounts = accounts.filter(a => a.status !== AccountStatus.ACTIVE).length;

    const wallets = accounts.filter(a => a.accountType === AccountType.WALLET).length;
    const creditCards = accounts.filter(a => a.accountType === AccountType.CREDIT_CARD).length;
    const savings = accounts.filter(a => a.accountType === AccountType.SAVINGS).length;
    const fixedDeposits = accounts.filter(a => a.accountType === AccountType.FIXED_DEPOSIT).length;

    const walletsTotalBalance = accounts
      .filter(a => a.accountType === AccountType.WALLET)
      .reduce((sum, a) => sum + a.balance, 0);
    const creditCardsTotalBalance = accounts
      .filter(a => a.accountType === AccountType.CREDIT_CARD)
      .reduce((sum, a) => sum + a.balance, 0);
    const savingsTotalBalance = accounts
      .filter(a => a.accountType === AccountType.SAVINGS)
      .reduce((sum, a) => sum + a.balance, 0);
    const fixedDepositsTotalBalance = accounts
      .filter(a => a.accountType === AccountType.FIXED_DEPOSIT)
      .reduce((sum, a) => sum + a.balance, 0);

    return {
      totalAccounts: accounts.length,
      totalBalance,
      activeAccounts,
      inactiveAccounts,
      accountsByType: {
        wallets,
        creditCards,
        savings,
        fixedDeposits
      },
      accountsBalance: {
        walletsTotalBalance,
        creditCardsTotalBalance,
        savingsTotalBalance,
        fixedDepositsTotalBalance
      }
    };
  }

  /**
   * Get active accounts
   */
  getActiveAccounts(): AccountResponse[] {
    return Array.from(this.accounts.values()).filter(a => a.status === AccountStatus.ACTIVE);
  }

  /**
   * Get total balance across all accounts
   */
  getTotalBalance() {
    const totalBalance = Array.from(this.accounts.values()).reduce((sum, a) => sum + a.balance, 0);
    return {
      totalBalance,
      currency: 'USD' // Default currency
    };
  }

  /**
   * Get account statistics
   */
  getAccountStatistics(accountId: string) {
    const account = this.accounts.get(accountId);
    if (!account) return undefined;

    const transactions = this.getTransactionsByAccount(account.name);
    const totalTransactions = transactions.length;
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalTransfer = transactions
      .filter(t => t.type === 'transfer')
      .reduce((sum, t) => sum + t.amount, 0);
    const averageTransactionAmount = totalTransactions > 0 ? (totalIncome + totalExpense) / totalTransactions : 0;
    const lastTransactionDate = transactions.length > 0 ? transactions[transactions.length - 1].date : undefined;

    return {
      accountId,
      accountName: account.name,
      accountType: account.accountType,
      totalTransactions,
      totalIncome,
      totalExpense,
      totalTransfer,
      averageTransactionAmount,
      lastTransactionDate
    };
  }

  // ==================== PRIVATE HELPER METHODS ====================

  private updateTransactionsSubject(): void {
    this.transactionsSubject.next(Array.from(this.transactions.values()));
  }

  private updateAccountsSubject(): void {
    this.accountsSubject.next(Array.from(this.accounts.values()));
  }

  /**
   * Clear all data (useful for testing/demo reset)
   */
  clearAllData(): void {
    this.transactions.clear();
    this.accounts.clear();
    this.updateTransactionsSubject();
    this.updateAccountsSubject();
  }

  /**
   * Get all data export
   */
  exportData() {
    return {
      accounts: Array.from(this.accounts.values()),
      transactions: Array.from(this.transactions.values()),
      exportDate: new Date().toISOString()
    };
  }

  /**
   * Import data
   */
  importData(data: { accounts: AccountResponse[]; transactions: TransactionResponse[] }): void {
    this.accounts.clear();
    this.transactions.clear();

    data.accounts.forEach(account => this.accounts.set(account.id, account));
    data.transactions.forEach(transaction => this.transactions.set(transaction.id, transaction));

    this.updateAccountsSubject();
    this.updateTransactionsSubject();
  }
}
