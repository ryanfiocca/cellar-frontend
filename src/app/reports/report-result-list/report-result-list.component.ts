import { Component } from '@angular/core';
import { ReportsService } from "../reports.service";
import { Subscription } from 'rxjs';
import { Report } from "../report.model";

@Component({
    selector: 'app-report-result-list',
    templateUrl: './report-result-list.component.html',
    styleUrls: ['./report-result-list.component.css']
})
export class ReportResultListComponent {

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
