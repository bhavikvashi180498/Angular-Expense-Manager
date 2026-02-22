# Accounts Component Guide

## Overview
The Accounts component has been fully built with complete CRUD (Create, Read, Update, Delete) functionality using PrimeNG and the Sakai template.

## Features Implemented

### 1. **Display Accounts** 
- Paginated table showing all accounts
- Columns: Name, Type, Balance, Currency, Status, Actions
- Sortable columns (by name, type, balance, currency, status)
- Responsive design that adapts to different screen sizes
- Empty state message when no accounts exist

### 2. **Create Account**
- "New Account" button to open create dialog
- Form validation:
  - Account name (required, min 3 characters)
  - Account type (required dropdown)
  - Balance (required, non-negative)
  - Currency (required, max 3 characters)
  - Status (required dropdown)
  - Description (optional)
- Success notification after account creation

### 3. **Update Account**
- Edit button on each account row
- Pre-populated form with existing account data
- Same validation rules as create
- Success notification after update

### 4. **Delete Account**
- Delete button on each account row
- Confirmation dialog before deletion
- Success notification after deletion

## Component Structure

### Component File: `accounts.ts`
```typescript
- Implements OnInit, OnDestroy lifecycle hooks
- Manages form with Reactive Forms
- Subscribes to account changes via Observable
- Handles all CRUD operations
```

### Template File: `accounts.html`
- PrimeNG Table with pagination and sorting
- PrimeNG Dialog for add/edit forms
- Form validation and error messages
- Action buttons with icons and tooltips
- Toast notifications and confirmation dialogs

### Styles File: `accounts.scss`
- Card styling
- Table styling with hover effects
- Dialog customization
- Button and input styling
- Responsive breakpoints

## PrimeNG Components Used

| Component | Module | Purpose |
|-----------|--------|---------|
| p-table | TableModule | Display accounts list |
| p-dialog | DialogModule | Add/Edit account form |
| p-button | ButtonModule | Action buttons |
| p-inputtext | InputTextModule | Text input fields |
| p-inputnumber | InputNumberModule | Balance input |
| p-select | SelectModule | Dropdown for type/status |
| p-tag | TagModule | Status badge |
| p-toast | ToastModule | Success/error messages |
| p-confirmDialog | ConfirmDialogModule | Delete confirmation |
| p-tooltip | TooltipModule | Button tooltips |
| textarea | TextareaModule | Description field |

## Form Fields

### Account Name
- **Type:** Text Input
- **Validation:** Required, min length 3
- **Placeholder:** "Enter account name"

### Account Type
- **Type:** Dropdown Select
- **Options:**
  - Wallet
  - Credit Card
  - Savings
  - Fixed Deposit
- **Default:** Wallet

### Balance
- **Type:** Currency Input Number
- **Validation:** Required, min value 0
- **Currency:** USD

### Currency
- **Type:** Text Input (max 3 characters)
- **Validation:** Required
- **Placeholder:** "e.g., USD, EUR, GBP"

### Status
- **Type:** Dropdown Select
- **Options:**
  - Active (success badge - green)
  - Inactive (secondary badge - gray)
  - Suspended (danger badge - red)
- **Default:** Active

### Description
- **Type:** Textarea
- **Validation:** Optional
- **Rows:** 4

## Key Methods

### Data Management
- `loadAccounts()` - Fetch all accounts from service
- `openNew()` - Open create dialog
- `editAccount(account)` - Open edit dialog with account data
- `deleteAccount(account)` - Delete account with confirmation
- `saveAccount()` - Save (create or update) account

### Form & Validation
- `initializeForm()` - Setup reactive form with validators
- `initializeDropdownOptions()` - Initialize dropdown data
- `hideDialog()` - Close dialog and reset form

### Helper Methods
- `getAccountTypeLabel(type)` - Convert enum to display text
- `getAccountStatusLabel(status)` - Convert status enum to text
- `getSeverity(status)` - Determine badge color based on status

## Table Features

- **Pagination:** 10 rows per page
- **Sorting:** Click column headers to sort
- **Global Filter Fields:** name, currency, status
- **Responsive:** Adjusts layout on smaller screens
- **Empty State:** Shows message when no accounts exist

## Dialog Features

- **Title:** Changes based on mode (New/Edit Account)
- **Modal:** Dialog blocks interaction with page behind it
- **Responsive:** Adjusts width on different screen sizes:
  - Desktop: 50vw width
  - Tablet (960px): 75vw width
  - Mobile (640px): 90vw width

## Notifications

### Toast Messages
- **Success Create:** "Account '[name]' created successfully"
- **Success Update:** "Account '[name]' updated successfully"
- **Success Delete:** "Account '[name]' deleted successfully"
- **Error:** "Please fill in all required fields correctly"

### Confirmation Dialog
- Asks user to confirm before deleting account
- Shows account name in confirmation message

## Integration with InMemoryStorageService

The component uses the `InMemoryStorageService` for:
- `createAccount(request)` - Add new account
- `updateAccount(id, updates)` - Modify existing account
- `deleteAccount(id)` - Remove account
- `getAccounts()` - Fetch all accounts
- `accounts$` - Observable to track account changes

## Usage in Routes

Add the Accounts component to your routing configuration:

```typescript
import { Accounts } from '@/app/pages/accounts/accounts';

// In your routes
{ path: 'accounts', component: Accounts }
```

## Future Enhancements

Potential improvements:
1. Add account search functionality
2. Implement bulk actions (delete multiple)
3. Add account filtering by type/status
4. Export accounts to CSV/PDF
5. Add account image/icon upload
6. Implement account archiving instead of deletion
7. Add transaction history for each account
8. Budget limits and alerts

## Styling Notes

The component uses:
- **Tailwind CSS** for layout and responsive design
- **PrimeUI Theme Variables** for colors and spacing
- **Dark mode** support via CSS variables
- **Custom SCSS** for specific component styling

## Accessibility

Features included:
- Semantic HTML structure
- ARIA labels for form fields
- Keyboard navigation support
- Focus indicators on interactive elements
- Proper color contrast ratios
- Screen reader friendly labels

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
