import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { Settings } from './settings/settings';
import { Accounts } from './accounts/accounts';
import { Statistics } from './statistics/statistics';

export default [
    { path: 'empty', component: Empty },
    { path: 'settings', component: Settings },
    { path: 'accounts', component: Accounts },
    { path: 'statistics', component: Statistics },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
