import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Report } from "../report.model";
import { ReportsService } from '../reports.service';

@Component({
    selector: 'app-report-result-statistics',
    templateUrl: './report-result-statistics.component.html',
    styleUrls: ['./report-result-statistics.component.css']
})
export class ReportResultStatisticsComponent {

    report: Report;
    private reportSub: Subscription;

    constructor(public reportsService: ReportsService) {}
    
    ngOnDestroy() {
        this.reportSub.unsubscribe();
    }

    ngOnInit() {
        this.reportSub = this.reportsService.getReportUpdateListener().subscribe((report: Report) => {
            this.report = report;
        });
    }
}
