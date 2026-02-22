import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import {
  Transaction,
  TransactionResponse,
  TransactionFilter,
  CreateTransactionRequest,
  TransactionSummary
} from '../../models/transaction.model';
import { InMemoryStorageService } from './in-memory-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // Simulate API delay (ms) for better UX
  private readonly simulatedDelay = 300;

  constructor(private storageService: InMemoryStorageService) {}

  /**
   * Get all transactions
   */
  getTransactions(): Observable<TransactionResponse[]> {
    return of(this.storageService.getTransactions()).pipe(
      delay(this.simulatedDelay),
      tap(transactions => console.log(`Loaded ${transactions.length} transactions from memory`))
    );
  }

  /**
   * Get transaction by ID
   */
  getTransactionById(id: string): Observable<TransactionResponse> {
    const transaction = this.storageService.getTransactionById(id);
    if (!transaction) {
      return new Observable(subscriber => {
        setTimeout(() => subscriber.error(new Error('Transaction not found')), this.simulatedDelay);
      });
    }
    return of(transaction).pipe(delay(this.simulatedDelay));
  }

  /**
   * Create a new transaction
   */
  createTransaction(transaction: CreateTransactionRequest): Observable<TransactionResponse> {
    return of(this.storageService.createTransaction(transaction)).pipe(
      delay(this.simulatedDelay),
      tap(created => console.log('Transaction created:', created.id))
    );
  }

  /**
   * Update an existing transaction
   */
  updateTransaction(id: string, transaction: Partial<CreateTransactionRequest>): Observable<TransactionResponse> {
    const updated = this.storageService.updateTransaction(id, transaction);
    if (!updated) {
      return new Observable(subscriber => {
        setTimeout(() => subscriber.error(new Error('Transaction not found')), this.simulatedDelay);
      });
    }
    return of(updated).pipe(
      delay(this.simulatedDelay),
      tap(() => console.log('Transaction updated:', id))
    );
  }

  /**
   * Delete a transaction
   */
  deleteTransaction(id: string): Observable<void> {
    const deleted = this.storageService.deleteTransaction(id);
    if (!deleted) {
      return new Observable(subscriber => {
        setTimeout(() => subscriber.error(new Error('Transaction not found')), this.simulatedDelay);
      });
    }
    return of(void 0).pipe(
      delay(this.simulatedDelay),
      tap(() => console.log('Transaction deleted:', id))
    );
  }

  /**
   * Get transactions by filter
   */
  filterTransactions(filter: TransactionFilter): Observable<TransactionResponse[]> {
    return of(this.storageService.filterTransactions(filter)).pipe(
      delay(this.simulatedDelay),
      tap(transactions => console.log(`Found ${transactions.length} matching transactions`))
    );
  }

  /**
   * Get transactions by date range
   */
  getTransactionsByDateRange(startDate: string, endDate: string): Observable<TransactionResponse[]> {
    return of(this.storageService.getTransactionsByDateRange(startDate, endDate)).pipe(
      delay(this.simulatedDelay)
    );
  }

  /**
   * Get transactions by account
   */
  getTransactionsByAccount(account: string): Observable<TransactionResponse[]> {
    return of(this.storageService.getTransactionsByAccount(account)).pipe(
      delay(this.simulatedDelay)
    );
  }

  /**
   * Get transactions by category
   */
  getTransactionsByCategory(category: string): Observable<TransactionResponse[]> {
    return of(this.storageService.getTransactionsByCategory(category)).pipe(
      delay(this.simulatedDelay)
    );
  }

  /**
   * Get transaction summary
   */
  getTransactionSummary(): Observable<TransactionSummary> {
    return of(this.storageService.getTransactionSummary()).pipe(
      delay(this.simulatedDelay)
    );
  }
}

