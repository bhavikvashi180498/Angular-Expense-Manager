import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InMemoryStorageService } from '../service/in-memory-storage.service';
import { AccountResponse, CreateAccountRequest, AccountType, AccountStatus } from '../../models/account.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    TagModule,
    TextareaModule,
    RippleModule
  ],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
  providers: [ConfirmationService, MessageService]
})
export class Accounts implements OnInit, OnDestroy {
  accounts: AccountResponse[] = [];
  displayDialog: boolean = false;
  isEditMode: boolean = false;
  form!: FormGroup;
  selectedAccount: AccountResponse | null = null;
  
  // Dropdown options
  accountTypeOptions: any[] = [];
  accountStatusOptions: any[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(
    private storageService: InMemoryStorageService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.initializeDropdownOptions();
    
    // Subscribe to account changes
    this.storageService.accounts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(accounts => {
        this.accounts = accounts;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize the form
   */
  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      accountType: [AccountType.WALLET, Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', [Validators.required, Validators.minLength(3)]],
      status: [AccountStatus.ACTIVE, Validators.required],
      description: ['']
    });
  }

  /**
   * Initialize dropdown options
   */
  private initializeDropdownOptions(): void {
    this.accountTypeOptions = [
      { label: 'Wallet', value: AccountType.WALLET },
      { label: 'Credit Card', value: AccountType.CREDIT_CARD },
      { label: 'Savings', value: AccountType.SAVINGS },
      { label: 'Fixed Deposit', value: AccountType.FIXED_DEPOSIT }
    ];

    this.accountStatusOptions = [
      { label: 'Active', value: AccountStatus.ACTIVE },
      { label: 'Inactive', value: AccountStatus.INACTIVE },
      { label: 'Suspended', value: AccountStatus.SUSPENDED }
    ];
  }

  /**
   * Load all accounts
   */
  private loadAccounts(): void {
    this.accounts = this.storageService.getAccounts();
  }

  /**
   * Open dialog for creating new account
   */
  openNew(): void {
    this.selectedAccount = null;
    this.isEditMode = false;
    this.form.reset({
      accountType: AccountType.WALLET,
      status: AccountStatus.ACTIVE,
      currency: 'USD'
    });
    this.displayDialog = true;
  }

  /**
   * Open dialog for editing account
   */
  editAccount(account: AccountResponse): void {
    this.selectedAccount = { ...account };
    this.isEditMode = true;
    this.form.patchValue({
      name: account.name,
      accountType: account.accountType,
      balance: account.balance,
      currency: account.currency,
      status: account.status,
      description: account.description
    });
    this.displayDialog = true;
  }

  /**
   * Save account (create or update)
   */
  saveAccount(): void {
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields correctly',
        life: 3000
      });
      return;
    }

    if (this.isEditMode && this.selectedAccount) {
      this.updateAccount();
    } else {
      this.createAccount();
    }
  }

  /**
   * Create new account
   */
  private createAccount(): void {
    const request: CreateAccountRequest = this.form.value;
    const newAccount = this.storageService.createAccount(request);
    
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Account '${newAccount.name}' created successfully`,
      life: 3000
    });
    
    this.displayDialog = false;
    this.form.reset();
  }

  /**
   * Update existing account
   */
  private updateAccount(): void {
    if (!this.selectedAccount) return;

    const request: Partial<CreateAccountRequest> = this.form.value;
    const updatedAccount = this.storageService.updateAccount(this.selectedAccount.id, request);

    if (updatedAccount) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Account '${updatedAccount.name}' updated successfully`,
        life: 3000
      });
    }

    this.displayDialog = false;
    this.form.reset();
  }

  /**
   * Delete account with confirmation
   */
  deleteAccount(account: AccountResponse): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete account '${account.name}'?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleted = this.storageService.deleteAccount(account.id);
        if (deleted) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Account '${account.name}' deleted successfully`,
            life: 3000
          });
        }
      }
    });
  }

  /**
   * Close dialog
   */
  hideDialog(): void {
    this.displayDialog = false;
    this.form.reset();
    this.selectedAccount = null;
  }

  /**
   * Get account type label
   */
  getAccountTypeLabel(type: AccountType): string {
    const option = this.accountTypeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  }

  /**
   * Get account status label
   */
  getAccountStatusLabel(status: AccountStatus): string {
    const option = this.accountStatusOptions.find(opt => opt.value === status);
    return option ? option.label : status;
  }

  /**
   * Get status severity for styling
   */
  getSeverity(status: AccountStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case AccountStatus.ACTIVE:
        return 'success';
      case AccountStatus.INACTIVE:
        return 'secondary';
      case AccountStatus.SUSPENDED:
        return 'danger';
      default:
        return 'info';
    }
  }
}
