import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppTopbar } from '../../layout/component/app.topbar';
import { FeaturesWidget } from '../landing/components/featureswidget';
import { HighlightsWidget } from '../landing/components/highlightswidget';
import { FooterWidget } from '../landing/components/footerwidget';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        RippleModule,
        AppTopbar,
        FeaturesWidget,
        HighlightsWidget,
        FooterWidget
    ],
    template: `
        <div class="landing-wrapper overflow-hidden">
            <app-topbar />
            
            <div class="py-20 px-6 lg:px-20" style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #efe1af 0%, #c3dcfa 100%); clip-path: ellipse(150% 87% at 93% 13%)">
                <div class="flex flex-col items-center text-center">
                    <h1 class="text-6xl font-bold text-gray-900 leading-tight mb-4">
                        Take Control of Your <span class="text-primary" style="color: var(--primary-color)">Expenses</span>
                    </h1>
                    <p class="font-normal text-2xl leading-normal text-gray-700 max-w-3xl mb-8">
                        The smartest way to manage your personal finances. Track every penny, set budgets, and achieve your financial goals with ease.
                    </p>
                    <div class="flex gap-4">
                        <button pButton pRipple label="Get Started Free" class="text-xl px-4 py-3" [rounded]="true" routerLink="/auth/login"></button>
                        <button pButton pRipple label="View Demo" class="text-xl px-4 py-3 p-button-outlined" [rounded]="true" routerLink="/auth/login"></button>
                    </div>
                </div>
            </div>

            <features-widget />
            
            <div class="py-20 bg-surface-0 dark:bg-surface-900">
                <highlights-widget />
            </div>

            <footer-widget />
        </div>
    `,
    styles: [`
        :host {
            display: block;
            background-color: var(--surface-0);
        }
        
        /* Ensure topbar looks good on landing page */
        ::ng-deep .layout-topbar {
            position: static !important;
            width: 100% !important;
            height: auto !important;
            padding: 1.5rem 2rem !important;
            box-shadow: none !important;
            border-bottom: 1px solid var(--surface-border) !important;
        }
    `]
})
export class Home { }
