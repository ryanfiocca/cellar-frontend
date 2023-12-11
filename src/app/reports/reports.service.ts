import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Report } from "./report.model";

@Injectable({providedIn: 'root'})
export class ReportsService {

    private varietals: string[] = [];
    private report: Report;
    private reportUpdated = new Subject<Report>();

    getReportUpdateListener() {
        return this.reportUpdated.asObservable();
    }

    updateReport(newReport: Report) {
        this.report = newReport;
        this.reportUpdated.next(this.report);
    }

}
