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

    selectedVarietal: string = null;
    selectedRating: number = null;
    selectedColor: string = null;
    varietalVals: string[] = [];
    ratingVals: number[] = [];
    colorVals: string[] = [];

    constructor(public reportsService: ReportsService) {}

    onSubmitReport() {
        axios.get('http://localhost:8080/report', { params: {
            rating: this.nullIfBlank(this.selectedRating),
            color: this.nullIfBlank(this.selectedColor),
            varietal: this.nullIfBlank(this.selectedVarietal)
        }})
        .then((response) => {
            this.reportsService.updateReport(response.data as Report);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getPossibleVarietals(): void {
        axios.get('http://localhost:8080/report/varietalValues', {responseType: 'json'})
        .then((response) => {
            this.varietalVals = response.data as string[];
            if (this.varietalVals.indexOf(null) < 0) {
                this.varietalVals.splice(0, 0, null);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getPossibleRatings(): void {
        axios.get('http://localhost:8080/report/ratingValues', {responseType: 'json'})
        .then((response) => {
            this.ratingVals = response.data as number[];
            if (this.ratingVals.indexOf(null) < 0) {
                this.ratingVals.splice(0, 0, null);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getPossibleColors(): void {
        axios.get('http://localhost:8080/report/colorValues', {responseType: 'json'})
        .then((response) => {
            this.colorVals = response.data as string[];
            if (this.colorVals.indexOf(null) < 0) {
                this.colorVals.splice(0, 0, null);
            }
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
