import { Injectable, computed, signal } from '@angular/core';

export interface User {
    name: string;
    email: string;
    role: string;
}

const DEMO_USERS: { email: string; password: string; user: User }[] = [
    {
        email: 'admin@demo.com',
        password: 'admin123',
        user: { name: 'Bhavik Vashi', email: 'admin@demo.com', role: 'Admin' }
    },
    {
        email: 'user@demo.com',
        password: 'user123',
        user: { name: 'Demo User', email: 'user@demo.com', role: 'User' }
    }
];

const STORAGE_KEY = 'expense_manager_user';
const USERS_LIST_KEY = 'expense_manager_users_list';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _currentUser = signal<User | null>(this._loadFromStorage());
    private _registeredUsers = signal<{ email: string; password: string; user: User }[]>(this._loadRegisteredUsers());

    readonly currentUser = this._currentUser.asReadonly();
    readonly isLoggedIn = computed(() => this._currentUser() !== null);

    login(email: string, password: string): boolean {
        const emailLower = email.trim().toLowerCase();

        // Search in demo users + registered users
        const allUsers = [...DEMO_USERS, ...this._registeredUsers()];
        const match = allUsers.find(
            (u) => u.email === emailLower && u.password === password
        );

        if (match) {
            this._currentUser.set(match.user);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(match.user));
            return true;
        }
        return false;
    }

    register(name: string, email: string, password: string): boolean {
        const emailLower = email.trim().toLowerCase();
        const allUsers = [...DEMO_USERS, ...this._registeredUsers()];

        if (allUsers.some(u => u.email === emailLower)) {
            return false; // Email already exists
        }

        const newUserAccount = {
            email: emailLower,
            password: password,
            user: { name, email: emailLower, role: 'User' }
        };

        const updatedList = [...this._registeredUsers(), newUserAccount];
        this._registeredUsers.set(updatedList);
        localStorage.setItem(USERS_LIST_KEY, JSON.stringify(updatedList));

        // Auto-login after registration
        return this.login(emailLower, password);
    }

    logout(): void {
        this._currentUser.set(null);
        localStorage.removeItem(STORAGE_KEY);
    }

    private _loadFromStorage(): User | null {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? (JSON.parse(stored) as User) : null;
        } catch {
            return null;
        }
    }

    private _loadRegisteredUsers(): { email: string; password: string; user: User }[] {
        try {
            const stored = localStorage.getItem(USERS_LIST_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }
}
