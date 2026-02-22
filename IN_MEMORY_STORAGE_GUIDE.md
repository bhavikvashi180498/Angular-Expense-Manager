# In-Memory Storage Guide

## Overview
The application now uses **in-memory storage** instead of external APIs. All transaction and account data is stored in application memory using RxJS Observables for reactive programming.

## Architecture

### Service Structure
```
services/
├── in-memory-storage.service.ts    (Main storage service)
└── pages/service/
    ├── transaction.service.ts      (Transaction API wrapper)
    └── account.service.ts          (Account API wrapper)
```

## Key Features

### ✅ In-Memory Storage Service
- **File**: `src/app/services/in-memory-storage.service.ts`
- **Purpose**: Central hub for all data management
- **Features**:
  - Map-based storage for O(1) lookups
  - BehaviorSubject for reactive updates
  - Transaction and Account management
  - Filtering, sorting, and statistics
  - Data export/import functionality
  - Sample data initialization

### ✅ Transaction Service
- **File**: `src/app/pages/service/transaction.service.ts`
- **Purpose**: Transaction API wrapper (no HTTP calls)
- **Methods**:
  - `getTransactions()` - Get all transactions
  - `createTransaction()` - Create new transaction
  - `updateTransaction()` - Update existing transaction
  - `deleteTransaction()` - Delete transaction
  - `filterTransactions()` - Filter by criteria
  - `getTransactionsByDateRange()` - Filter by date
  - `getTransactionsByCategory()` - Filter by category
  - `getTransactionsByAccount()` - Filter by account
  - `getTransactionSummary()` - Get summary stats

### ✅ Account Service
- **File**: `src/app/pages/service/account.service.ts`
- **Purpose**: Account API wrapper (no HTTP calls)
- **Methods**:
  - `getAccounts()` - Get all accounts
  - `createAccount()` - Create new account
  - `updateAccount()` - Update account details
  - `deleteAccount()` - Delete account
  - `filterAccounts()` - Filter by criteria
  - `getAccountsByType()` - Filter by type
  - `updateBalance()` - Update account balance
  - `getAccountSummary()` - Get summary stats
  - `getAccountStatistics()` - Get detailed stats
  - `getTotalBalance()` - Get total balance across all accounts
  - `getActiveAccounts()` - Get only active accounts

## Usage Examples

### Create a Transaction
```typescript
import { TransactionService } from './pages/service/transaction.service';
import { TransactionType, IncomeCategory } from './models/transaction.model';

export class MyComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

  createIncome(): void {
    const transaction: CreateIncomeTransactionRequest = {
      type: TransactionType.INCOME,
      date: '2026-02-22',
      amount: 5000,
      category: IncomeCategory.SALARY,
      account: 'My Wallet',
      description: 'Monthly salary'
    };

    this.transactionService.createTransaction(transaction).subscribe({
      next: (response) => console.log('Created:', response),
      error: (error) => console.error('Error:', error)
    });
  }
}
```

### Create an Account
```typescript
import { AccountService } from './pages/service/account.service';
import { AccountType, Currency } from './models/account.model';

export class MyComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  createWallet(): void {
    const wallet: CreateWalletAccountRequest = {
      name: 'My PayPal',
      accountType: AccountType.WALLET,
      balance: 500,
      currency: Currency.USD,
      provider: 'PayPal'
    };

    this.accountService.createWalletAccount(wallet).subscribe({
      next: (response) => console.log('Created:', response),
      error: (error) => console.error('Error:', error)
    });
  }
}
```

### Get Summary Data
```typescript
// Get transaction summary
this.transactionService.getTransactionSummary().subscribe({
  next: (summary) => {
    console.log(`Income: $${summary.totalIncome}`);
    console.log(`Expense: $${summary.totalExpense}`);
    console.log(`Net: $${summary.netBalance}`);
  }
});

// Get account summary
this.accountService.getAccountSummary().subscribe({
  next: (summary) => {
    console.log(`Total Balance: $${summary.totalBalance}`);
    console.log(`Active Accounts: ${summary.activeAccounts}`);
    console.log(`By Type:`, summary.accountsByType);
  }
});
```

### Filter Data
```typescript
// Filter transactions by date range
this.transactionService.getTransactionsByDateRange('2026-01-01', '2026-12-31').subscribe({
  next: (transactions) => console.log('Transactions:', transactions)
});

// Filter accounts by type
this.accountService.getAccountsByType(AccountType.SAVINGS).subscribe({
  next: (accounts) => console.log('Savings Accounts:', accounts)
});
```

## Simulated API Delay

All services include a **300ms simulated delay** to mimic real API calls and provide better UX:
```typescript
private readonly simulatedDelay = 300; // milliseconds
```

This can be adjusted in the respective service files if needed.

## Sample Data

The service initializes with sample data for demo purposes:
- 3 sample accounts (Wallet, Credit Card, Savings)
- 2 sample transactions (Income, Expense)

To clear all data:
```typescript
private storageService: InMemoryStorageService;

clearData(): void {
  this.storageService.clearAllData();
}
```

## Data Export/Import

### Export Data
```typescript
const data = this.storageService.exportData();
// Returns: { accounts: [...], transactions: [...], exportDate: "..." }
// Can be saved to localStorage or file
```

### Import Data
```typescript
this.storageService.importData({
  accounts: [...],
  transactions: [...]
});
```

## Observable Streams

The service provides reactive data streams:
```typescript
// Subscribe to transaction changes
this.storageService.transactions$.subscribe({
  next: (transactions) => console.log('Transactions updated:', transactions)
});

// Subscribe to account changes
this.storageService.accounts$.subscribe({
  next: (accounts) => console.log('Accounts updated:', accounts)
});
```

## Migration to Real API

When ready to use a real backend:

### Step 1: Update Transaction Service
```typescript
constructor(private http: HttpClient) {}

createTransaction(transaction: CreateTransactionRequest): Observable<TransactionResponse> {
  return this.http.post<TransactionResponse>('/api/transactions', transaction);
}
```

### Step 2: Update Account Service
```typescript
constructor(private http: HttpClient) {}

createAccount(account: CreateAccountRequest): Observable<AccountResponse> {
  return this.http.post<AccountResponse>('/api/accounts', account);
}
```

### Step 3: Deprecate In-Memory Service
- Keep `in-memory-storage.service.ts` for reference or testing
- Remove its usage from Transaction/Account services

**No component changes needed** - Services maintain the same interface!

## Performance Notes

- **Lookup Time**: O(1) for direct ID lookups (Map-based)
- **Filter Time**: O(n) where n = number of items
- **Memory Usage**: Grows with data size (all stored in RAM)
- **Data Persistence**: Lost on page refresh (add localStorage if needed)

## Best Practices

1. ✅ Always use services, not direct storage service
2. ✅ Subscribe to Observables with proper error handling
3. ✅ Use filtering methods for large datasets
4. ✅ Unsubscribe in `ngOnDestroy` or use `async` pipe
5. ✅ Keep component logic in services

## Troubleshooting

### Data Not Updating
- Ensure you're subscribing to the service methods
- Check that changes trigger the `updateTransactionsSubject()` or `updateAccountsSubject()`

### IDs Not Unique
- The service uses UUID v4 for automatic ID generation
- Don't manually set IDs unless needed

### Lost Data on Refresh
- In-memory storage doesn't persist
- Add localStorage or implement backend API
- See "Data Export/Import" section for manual persistence

## Testing

The in-memory storage is perfect for unit testing:
```typescript
describe('TransactionService', () => {
  let service: TransactionService;
  let storageService: InMemoryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionService, InMemoryStorageService]
    });
    service = TestBed.inject(TransactionService);
    storageService = TestBed.inject(InMemoryStorageService);
  });

  it('should create transaction', (done) => {
    const transaction = { type: 'income', ... };
    service.createTransaction(transaction).subscribe(result => {
      expect(result.id).toBeDefined();
      done();
    });
  });
});
```

## Next Steps

1. ✅ Build UI components using the services
2. ✅ Test with sample data
3. ✅ Add localStorage persistence (optional)
4. ✅ When ready, connect to real backend API
5. ✅ All components will work seamlessly after upgrade
