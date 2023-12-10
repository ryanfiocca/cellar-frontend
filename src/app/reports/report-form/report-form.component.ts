import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportsService } from "../reports.service";
import { Report } from "../report.model";
import axios from 'axios';

@Component({
    selector: 'app-report-form',
    templateUrl: './report-form.component.html',
    styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {

    varietalValues: string[] = [];

    constructor(public reportsService: ReportsService) {}

    onSubmitReport(postForm: NgForm) {
        if (this.fieldIsBlank(postForm.value.rating) && this.fieldIsBlank(postForm.value.color) && this.fieldIsBlank(postForm.value.varietal)) {
            alert('Please enter at least one field to filter on');
            return;
        }

        axios.get('http://localhost:8080/report', { params: {
            rating: this.nullIfBlank(postForm.value.rating),
            color: this.nullIfBlank(postForm.value.color),
            varietal: this.nullIfBlank(postForm.value.varietal)
        }})
        .then((response) => {
            this.reportsService.updateReport(response.data as Report);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getPossibleVarietals(): void {
        axios.delete('http://localhost:8080/report/varietalValues', {responseType: 'json'})
        .then((response) => {
            this.varietalValues = response.data as string[];
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    nullIfBlank(value: any) {
        if (this.fieldIsBlank(value)) {
            return null;
        }
        return typeof value == 'number' ? value : value.toString().trim();
    }

    fieldIsBlank(value: any): boolean {
        return value == null || !value.toString().trim();
    }
}
