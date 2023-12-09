import { Routes } from '@angular/router';
import { ReviewEntryPageComponent } from './posts/review-entry-page/review-entry-page.component';
import { ReportPageComponent } from './reports/report-page/report-page.component';

const appRoutes: Routes = [
    {
        path: '', 
        redirectTo: '/reviews', 
        pathMatch: 'full' 
    },
    {
        path: 'reviews', 
        component: ReviewEntryPageComponent
    },
    {
        path: 'reports',
        component: ReportPageComponent
    }
];
export default appRoutes;