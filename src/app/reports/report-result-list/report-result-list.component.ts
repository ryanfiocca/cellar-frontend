import { Component } from '@angular/core';
import { ReportsService } from "../reports.service";
import { Subscription } from 'rxjs';
import { Report } from "../report.model";
import { Review } from 'src/app/posts/post.model';

@Component({
    selector: 'app-report-result-list',
    templateUrl: './report-result-list.component.html',
    styleUrls: ['./report-result-list.component.css']
})
export class ReportResultListComponent {

    report: Report;
    private reportSub: Subscription;

    constructor(public reportsService: ReportsService) {}

    constructWineLabel(review: Review) {
        var label: string = review.rating + ' - ' + review.wine.winery;
        if (review.wine.varietal != null) {
            return label += ' ' + review.wine.varietal;
        } else if (review.wine.color != null) {
            return label += ' ' + review.wine.color;
        }
        return label;
    }
    
    ngOnDestroy() {
        this.reportSub.unsubscribe();
    }

    ngOnInit() {
        this.reportSub = this.reportsService.getReportUpdateListener().subscribe((report: Report) => {
            this.report = report;
        });
    }
}
