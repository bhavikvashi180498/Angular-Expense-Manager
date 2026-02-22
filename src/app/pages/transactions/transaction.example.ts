// import { Component, OnInit } from '@angular/core';
// import { TransactionService } from '../service/transaction.service';
// import {
//   Transaction,
//   TransactionType,
//   IncomeCategory,
//   ExpenseCategory,
//   TransferCategory,
//   IncomeTransaction,
//   ExpenseTransaction,
//   TransferTransaction,
//   CreateIncomeTransactionRequest,
//   CreateExpenseTransactionRequest,
//   CreateTransferTransactionRequest,
//   TransactionFilter
// } from '../../models/transaction.model';

// /**
//  * Example component showing how to use the Transaction model and service
//  * with separate categories for Income, Expense, and Transfer transactions
//  */
// @Component({
//   selector: 'app-transaction-example',
//   template: `
//     <div class="transaction-container">
//       <h2>Transaction Management Example</h2>
      
//       <!-- You can use these patterns in your components -->
//     </div>
//   `,
//   styles: []
// })
// export class TransactionExampleComponent implements OnInit {
//   transactions: Transaction[] = [];
//   loading = false;

//   constructor(private transactionService: TransactionService) {}

//   ngOnInit(): void {
//     this.loadTransactions();
//   }

//   /**
//    * Load all transactions
//    */
//   loadTransactions(): void {
//     this.loading = true;
//     this.transactionService.getTransactions().subscribe({
//       next: (data) => {
//         this.transactions = data;
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Error loading transactions:', error);
//         this.loading = false;
//       }
//     });
//   }

//   // ============== INCOME TRANSACTIONS ==============

//   /**
//    * Create a new income transaction with INCOME category
//    */
//   createIncomeTransaction(): void {
//     const income: CreateIncomeTransactionRequest = {
//       type: TransactionType.INCOME,
//       date: new Date().toISOString().split('T')[0],
//       amount: 5000,
//       category: IncomeCategory.SALARY,
//       account: 'Checking Account',
//       description: 'Monthly salary payment'
//     };

//     this.transactionService.createTransaction(income).subscribe({
//       next: (response) => {
//         console.log('Income transaction created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating income transaction:', error)
//     });
//   }

//   /**
//    * Create a bonus income transaction
//    */
//   createBonusTransaction(): void {
//     const bonus: CreateIncomeTransactionRequest = {
//       type: TransactionType.INCOME,
//       date: new Date().toISOString().split('T')[0],
//       amount: 1500,
//       category: IncomeCategory.BONUS,
//       account: 'Checking Account',
//       description: 'Annual bonus'
//     };

//     this.transactionService.createTransaction(bonus).subscribe({
//       next: (response) => {
//         console.log('Bonus transaction created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating bonus transaction:', error)
//     });
//   }

//   /**
//    * Create freelance income transaction
//    */
//   createFreelanceIncome(): void {
//     const freelance: CreateIncomeTransactionRequest = {
//       type: TransactionType.INCOME,
//       date: new Date().toISOString().split('T')[0],
//       amount: 800,
//       category: IncomeCategory.FREELANCE,
//       account: 'Checking Account',
//       description: 'Project payment'
//     };

//     this.transactionService.createTransaction(freelance).subscribe({
//       next: (response) => {
//         console.log('Freelance income created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating freelance income:', error)
//     });
//   }

//   /**
//    * Create investment income transaction
//    */
//   createInvestmentIncome(): void {
//     const investment: CreateIncomeTransactionRequest = {
//       type: TransactionType.INCOME,
//       date: new Date().toISOString().split('T')[0],
//       amount: 250,
//       category: IncomeCategory.DIVIDEND,
//       account: 'Investment Account',
//       description: 'Dividend received'
//     };

//     this.transactionService.createTransaction(investment).subscribe({
//       next: (response) => {
//         console.log('Investment income created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating investment income:', error)
//     });
//   }

//   // ============== EXPENSE TRANSACTIONS ==============

//   /**
//    * Create a new expense transaction with EXPENSE category
//    */
//   createExpenseTransaction(): void {
//     const expense: CreateExpenseTransactionRequest = {
//       type: TransactionType.EXPENSE,
//       date: new Date().toISOString().split('T')[0],
//       amount: 50,
//       category: ExpenseCategory.FOOD,
//       account: 'Credit Card',
//       description: 'Lunch at restaurant'
//     };

//     this.transactionService.createTransaction(expense).subscribe({
//       next: (response) => {
//         console.log('Expense created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating expense:', error)
//     });
//   }

//   /**
//    * Create a utilities expense transaction
//    */
//   createUtilityExpense(): void {
//     const utility: CreateExpenseTransactionRequest = {
//       type: TransactionType.EXPENSE,
//       date: new Date().toISOString().split('T')[0],
//       amount: 120,
//       category: ExpenseCategory.UTILITIES,
//       account: 'Checking Account',
//       description: 'Monthly electricity bill'
//     };

//     this.transactionService.createTransaction(utility).subscribe({
//       next: (response) => {
//         console.log('Utility expense created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating utility expense:', error)
//     });
//   }

//   /**
//    * Create a transportation expense transaction
//    */
//   createTransportationExpense(): void {
//     const transport: CreateExpenseTransactionRequest = {
//       type: TransactionType.EXPENSE,
//       date: new Date().toISOString().split('T')[0],
//       amount: 45,
//       category: ExpenseCategory.TRANSPORTATION,
//       account: 'Credit Card',
//       description: 'Gas for car'
//     };

//     this.transactionService.createTransaction(transport).subscribe({
//       next: (response) => {
//         console.log('Transportation expense created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating transportation expense:', error)
//     });
//   }

//   /**
//    * Create a healthcare expense transaction
//    */
//   createHealthcareExpense(): void {
//     const healthcare: CreateExpenseTransactionRequest = {
//       type: TransactionType.EXPENSE,
//       date: new Date().toISOString().split('T')[0],
//       amount: 150,
//       category: ExpenseCategory.HEALTHCARE,
//       account: 'Credit Card',
//       description: 'Doctor visit'
//     };

//     this.transactionService.createTransaction(healthcare).subscribe({
//       next: (response) => {
//         console.log('Healthcare expense created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating healthcare expense:', error)
//     });
//   }

//   /**
//    * Create an entertainment expense transaction
//    */
//   createEntertainmentExpense(): void {
//     const entertainment: CreateExpenseTransactionRequest = {
//       type: TransactionType.EXPENSE,
//       date: new Date().toISOString().split('T')[0],
//       amount: 30,
//       category: ExpenseCategory.ENTERTAINMENT,
//       account: 'Credit Card',
//       description: 'Movie tickets'
//     };

//     this.transactionService.createTransaction(entertainment).subscribe({
//       next: (response) => {
//         console.log('Entertainment expense created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating entertainment expense:', error)
//     });
//   }

//   // ============== TRANSFER TRANSACTIONS ==============

//   /**
//    * Create a transfer transaction with TRANSFER category (Savings)
//    */
//   createTransferToSavings(): void {
//     const transfer: CreateTransferTransactionRequest = {
//       type: TransactionType.TRANSFER,
//       date: new Date().toISOString().split('T')[0],
//       amount: 1000,
//       category: TransferCategory.SAVINGS,
//       account: 'Savings Account',
//       description: 'Transfer to savings'
//     };

//     this.transactionService.createTransaction(transfer).subscribe({
//       next: (response) => {
//         console.log('Transfer to savings created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating transfer:', error)
//     });
//   }

//   /**
//    * Create an investment transfer transaction
//    */
//   createInvestmentTransfer(): void {
//     const investment: CreateTransferTransactionRequest = {
//       type: TransactionType.TRANSFER,
//       date: new Date().toISOString().split('T')[0],
//       amount: 2000,
//       category: TransferCategory.INVESTMENT,
//       account: 'Investment Account',
//       description: 'Transfer to investment account'
//     };

//     this.transactionService.createTransaction(investment).subscribe({
//       next: (response) => {
//         console.log('Investment transfer created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating investment transfer:', error)
//     });
//   }

//   /**
//    * Create a transfer to another account
//    */
//   createOtherAccountTransfer(): void {
//     const transfer: CreateTransferTransactionRequest = {
//       type: TransactionType.TRANSFER,
//       date: new Date().toISOString().split('T')[0],
//       amount: 500,
//       category: TransferCategory.OTHER_ACCOUNT,
//       account: 'Money Market Account',
//       description: 'Transfer between accounts'
//     };

//     this.transactionService.createTransaction(transfer).subscribe({
//       next: (response) => {
//         console.log('Account transfer created:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error creating account transfer:', error)
//     });
//   }

//   // ============== FILTERING ==============

//   /**
//    * Filter transactions by date range
//    */
//   filterByDateRange(): void {
//     const startDate = '2025-01-01';
//     const endDate = '2025-12-31';

//     this.transactionService.getTransactionsByDateRange(startDate, endDate).subscribe({
//       next: (data) => {
//         console.log('Filtered transactions:', data);
//       },
//       error: (error) => console.error('Error filtering transactions:', error)
//     });
//   }

//   /**
//    * Filter income transactions by category
//    */
//   filterByIncomeCategory(category: IncomeCategory): void {
//     this.transactionService.getTransactionsByCategory(category).subscribe({
//       next: (data) => {
//         console.log(`${category} income transactions:`, data);
//       },
//       error: (error) => console.error('Error filtering by income category:', error)
//     });
//   }

//   /**
//    * Filter expense transactions by category
//    */
//   filterByExpenseCategory(category: ExpenseCategory): void {
//     this.transactionService.getTransactionsByCategory(category).subscribe({
//       next: (data) => {
//         console.log(`${category} expense transactions:`, data);
//       },
//       error: (error) => console.error('Error filtering by expense category:', error)
//     });
//   }

//   /**
//    * Filter transfer transactions by category
//    */
//   filterByTransferCategory(category: TransferCategory): void {
//     this.transactionService.getTransactionsByCategory(category).subscribe({
//       next: (data) => {
//         console.log(`${category} transfer transactions:`, data);
//       },
//       error: (error) => console.error('Error filtering by transfer category:', error)
//     });
//   }

//   /**
//    * Get transaction summary for dashboard
//    */
//   getSummary(): void {
//     this.transactionService.getTransactionSummary().subscribe({
//       next: (summary) => {
//         console.log('Transaction Summary:', {
//           ...summary,
//           message: `Income: $${summary.totalIncome}, Expense: $${summary.totalExpense}, Net: $${summary.netBalance}`
//         });
//       },
//       error: (error) => console.error('Error getting summary:', error)
//     });
//   }

//   /**
//    * Update a transaction
//    */
//   updateTransaction(id: string): void {
//     const updates = {
//       amount: 75,
//       description: 'Updated lunch expense'
//     };

//     this.transactionService.updateTransaction(id, updates).subscribe({
//       next: (response) => {
//         console.log('Transaction updated:', response);
//         this.loadTransactions();
//       },
//       error: (error) => console.error('Error updating transaction:', error)
//     });
//   }

//   /**
//    * Delete a transaction
//    */
//   deleteTransaction(id: string): void {
//     if (confirm('Are you sure you want to delete this transaction?')) {
//       this.transactionService.deleteTransaction(id).subscribe({
//         next: () => {
//           console.log('Transaction deleted');
//           this.loadTransactions();
//         },
//         error: (error) => console.error('Error deleting transaction:', error)
//       });
//     }
//   }
// }
