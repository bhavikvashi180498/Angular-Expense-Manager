import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from './auth.service';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule, CardModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px; min-width: 380px;">
                        <div class="text-center mb-8">
                            <div class="flex items-center justify-center mb-6">
                                <div class="w-24 h-24 rounded-full bg-primary flex items-center justify-center"
                                     style="background: var(--primary-color);">
                                    <i class="pi pi-user text-white" style="font-size: 2.5rem;"></i>
                                </div>
                            </div>
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-2">
                                {{ user()?.name }}
                            </div>
                            <span class="text-muted-color font-medium">{{ user()?.role }}</span>
                        </div>

                        <div class="surface-border border rounded-xl p-4 mb-6">
                            <div class="flex items-center gap-3 mb-4">
                                <i class="pi pi-envelope text-primary" style="color: var(--primary-color);"></i>
                                <div>
                                    <div class="text-xs text-muted-color mb-1">Email</div>
                                    <div class="text-surface-900 dark:text-surface-0 font-medium">{{ user()?.email }}</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <i class="pi pi-shield text-primary" style="color: var(--primary-color);"></i>
                                <div>
                                    <div class="text-xs text-muted-color mb-1">Role</div>
                                    <div class="text-surface-900 dark:text-surface-0 font-medium">{{ user()?.role }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-3">
                            <p-button
                                label="Go to Dashboard"
                                icon="pi pi-home"
                                styleClass="w-full"
                                routerLink="/"
                            ></p-button>
                            <p-button
                                label="Logout"
                                icon="pi pi-sign-out"
                                severity="danger"
                                [outlined]="true"
                                styleClass="w-full"
                                (onClick)="logout()"
                            ></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Profile {
    private authService = inject(AuthService);
    private router = inject(Router);

    user = this.authService.currentUser;

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
