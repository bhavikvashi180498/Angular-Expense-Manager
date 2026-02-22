import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '@/app/layout/service/layout.service';
import { AuthService } from '@/app/pages/auth/auth.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    styles: [`
        .profile-dropdown {
            position: absolute;
            right: 0;
            top: calc(100% + 0.5rem);
            min-width: 180px;
            background: var(--surface-overlay);
            border: 1px solid var(--surface-border);
            border-radius: var(--border-radius);
            box-shadow: 0 4px 16px rgba(0,0,0,.12);
            z-index: 1000;
            overflow: hidden;
        }
        .profile-dropdown-header {
            padding: 0.75rem 1rem 0.5rem;
            font-weight: 600;
            font-size: 0.85rem;
            color: var(--text-color-secondary);
            border-bottom: 1px solid var(--surface-border);
        }
        .profile-dropdown-item {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            width: 100%;
            padding: 0.65rem 1rem;
            background: transparent;
            border: none;
            cursor: pointer;
            color: var(--text-color);
            font-size: 0.9rem;
            transition: background 0.15s;
            text-align: left;
        }
        .profile-dropdown-item:hover {
            background: var(--surface-hover);
        }
        .profile-dropdown-item.danger {
            color: var(--red-500);
        }
        .profile-dropdown-item.danger:hover {
            background: var(--red-50);
        }
        .profile-dropdown-separator {
            height: 1px;
            background: var(--surface-border);
            margin: 0.25rem 0;
        }
    `],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <i class="pi pi-fw pi-wallet"></i>
                <span>Expense Manager</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">

                    <!-- Profile icon area -->
                    @if (authService.isLoggedIn()) {
                        <!-- Logged in: show user icon that opens inline dropdown -->
                        <div class="relative">
                            <button
                                type="button"
                                class="layout-topbar-action"
                                pStyleClass="@next"
                                enterFromClass="hidden"
                                enterActiveClass="animate-scalein"
                                leaveToClass="hidden"
                                leaveActiveClass="animate-fadeout"
                                [hideOnOutsideClick]="true"
                            >
                                <i class="pi pi-user"></i>
                                <span>{{ authService.currentUser()?.name }}</span>
                            </button>

                            <!-- Inline dropdown — lives inside component, destroyed with it -->
                            <div class="profile-dropdown hidden">
                                <div class="profile-dropdown-header">
                                    <i class="pi pi-user mr-2"></i>{{ authService.currentUser()?.email }}
                                </div>
                                <button class="profile-dropdown-item" (click)="goToProfile()">
                                    <i class="pi pi-id-card"></i>
                                    Profile
                                </button>
                                <div class="profile-dropdown-separator"></div>
                                <button class="profile-dropdown-item danger" (click)="logout()">
                                    <i class="pi pi-sign-out"></i>
                                    Logout
                                </button>
                            </div>
                        </div>
                    } @else {
                        <!-- Logged out: clicking goes straight to login -->
                        <button type="button" class="layout-topbar-action" (click)="goToLogin()">
                            <i class="pi pi-sign-in"></i>
                            <span>Login</span>
                        </button>
                    }

                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    layoutService = inject(LayoutService);
    authService = inject(AuthService);
    private router = inject(Router);

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }

    goToProfile(): void {
        this.router.navigate(['/auth/profile']);
    }

    goToLogin(): void {
        this.router.navigate(['/auth/login']);
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
