import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import {
  Account,
  AccountResponse,
  AccountFilter,
  AccountSummary,
  AccountStatistics,
  CreateAccountRequest,
  CreateWalletAccountRequest,
  CreateCreditCardAccountRequest,
  CreateSavingsAccountRequest,
  CreateFixedDepositAccountRequest,
  AccountType
} from '../../models/account.model';
import { InMemoryStorageService } from './in-memory-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // Simulate API delay (ms) for better UX
  private readonly simulatedDelay = 300;

  constructor(private storageService: InMemoryStorageService) {}

  /**
   * Get all accounts
   */
  getAccounts(): Observable<AccountResponse[]> {
    return of(this.storageService.getAccounts()).pipe(
      delay(this.simulatedDelay),
      tap(accounts => console.log(`Loaded ${accounts.length} accounts from memory`))
    );
  }

  /**
   * Get account by ID
   */
  getAccountById(id: string): Observable<AccountResponse> {
    const account = this.storageService.getAccountById(id);
    if (!account) {
      return new Observable(subscriber => {
        setTimeout(() => subscriber.error(new Error('Account not found')), this.simulatedDelay);
      });
    }
    return of(account).pipe(delay(this.simulatedDelay));
  }

  /**
   * Create a new account (generic)
   */
  createAccount(account: CreateAccountRequest): Observable<AccountResponse> {
    return of(this.storageService.createAccount(account)).pipe(
      delay(this.simulatedDelay),
      tap(created => console.log('Account created:', created.id))
    );
  }

  /**
   * Create a wallet account
   */
  createWalletAccount(account: CreateWalletAccountRequest): Observable<AccountResponse> {
    return of(this.storageService.createAccount(account)).pipe(
      delay(this.simulatedDelay),
      tap(created => console.log('Wallet account created:', created.id))
    );
  }

  /**
   * Create a credit card account
   */
  createCreditCardAccount(account: CreateCreditCardAccountRequest): Observable<AccountResponse> {
    return of(this.storageService.createAccount(account)).pipe(
      delay(this.simulatedDelay),
      tap(created => console.log('Credit card account created:', created.id))
    );
  }

  /**
   * Create a savings account
   */
  createSavingsAccount(account: CreateSavingsAccountRequest): Observable<AccountResponse> {
    return of(this.storageService.createAccount(account)).pipe(
      delay(this.simulatedDelay),
      tap(created => console.log('Savings account created:', created.id))
    );
  }

  /**
   * Create a fixed deposit account
   */
  createFixedDepositAccount(account: CreateFixedDepositAccountRequest): Observable<AccountResponse> {
    return of(this.storageService.createAccount(account)).pipe(
      delay(this.simulatedDelay),
      tap(created => console.log('Fixed deposit account created:', created.id))
    );
  }

  /**
   * Update an existing account
   */
  updateAccount(id: string, account: Partial<CreateAccountRequest>): Observable<AccountResponse> {
    const updated = this.storageService.updateAccount(id, account);
    if (!updated) {
      return new Observable(subscriber => {
        setTimeout(() => subscriber.error(new Error('Account not found')), this.simulatedDelay);
      });
    }
    return of(updated).pipe(
      delay(this.simulatedDelay),
      tap(() => console.log('Account updated:', id))
    );
  }

  /**
   * Delete an account
   */
  deleteAccount(id: string): Observable<void> {
    const deleted = this.storageService.deleteAccount(id);
    if (!deleted) {
      return new Observable(subscriber => {
        setTimeout(() => subscriber.error(new Error('Account not found')), this.simulatedDelay);
      });
    }
    return of(void 0).pipe(
      delay(this.simulatedDelay),
      tap(() => console.log('Account deleted:', id))
    );
  }

  /**
   * Get accounts by filter
   */
  filterAccounts(filter: AccountFilter): Observable<AccountResponse[]> {
    return of(this.storageService.filterAccounts(filter)).pipe(
      delay(this.simulatedDelay),
      tap(accounts => console.log(`Found ${accounts.length} matching accounts`))
    );
  }

  /**
   * Get accounts by type
   */
  getAccountsByType(type: AccountType): Observable<AccountResponse[]> {
    return of(this.storageService.getAccountsByType(type)).pipe(
      delay(this.simulatedDelay)
    );
  }

  /**
   * Get account summary for dashboard
   */
  getAccountSummary(): Observable<AccountSummary> {
    return of(this.storageService.getAccountSummary()).pipe(
      delay(this.simulatedDelay)
    );
  }

  /**
   * Get account statistics
   */
  getAccountStatistics(accountId: string): Observable<AccountStatistics> {
    const stats = this.storageService.getAccountStatistics(accountId);
    if (!stats) {
      return new Observable(subscriber => {
        setTimeout(() => subscriber.error(new Error('Account not found')), this.simulatedDelay);
      });
    }
    return of(stats).pipe(delay(this.simulatedDelay));
  }

  /**
   * Update account balance
   */
  updateBalance(id: string, newBalance: number): Observable<AccountResponse> {
    const updated = this.storageService.updateAccountBalance(id, newBalance);
    if (!updated) {
      return new Observable(subscriber => {
        setTimeout(() => subscriber.error(new Error('Account not found')), this.simulatedDelay);
      });
    }
    return of(updated).pipe(
      delay(this.simulatedDelay),
      tap(() => console.log('Balance updated:', id))
    );
  }

  /**
   * Get total balance across all accounts
   */
  getTotalBalance(): Observable<{ totalBalance: number; currency: string }> {
    return of(this.storageService.getTotalBalance()).pipe(
      delay(this.simulatedDelay)
    );
  }

  /**
   * Get active accounts
   */
  getActiveAccounts(): Observable<AccountResponse[]> {
    return of(this.storageService.getActiveAccounts()).pipe(
      delay(this.simulatedDelay)
    );
  }
}

