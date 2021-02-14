"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CompanyCreateUpdateDialogComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var Company_1 = require("src/app/models/Company");
var CompanyCreateUpdateDialogComponent = /** @class */ (function () {
    function CompanyCreateUpdateDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.company = new Company_1.Company();
        this.origin = new Company_1.Company();
        this.smartCopy(data.company);
        this.type = data.type;
    }
    CompanyCreateUpdateDialogComponent.prototype.ngOnInit = function () {
    };
    CompanyCreateUpdateDialogComponent.prototype.smartCopy = function (company) {
        if (company) {
            this.company.id = company.id;
            this.company.name = company.name;
            this.company.email = company.email;
            this.company.password = company.password;
            this.origin.id = company.id;
            this.origin.name = company.name;
            this.origin.email = company.email;
            this.origin.password = company.password;
        }
        else {
            this.company.id = 0;
            this.company.name = '';
            this.company.email = '';
            this.company.password = '';
        }
    };
    CompanyCreateUpdateDialogComponent.prototype.checkChanges = function (origin, company) {
        return JSON.stringify(origin) === JSON.stringify(company);
    };
    CompanyCreateUpdateDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    CompanyCreateUpdateDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-company-create-update-dialog',
            templateUrl: './company-create-update-dialog.component.html',
            styleUrls: ['./company-create-update-dialog.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], CompanyCreateUpdateDialogComponent);
    return CompanyCreateUpdateDialogComponent;
}());
exports.CompanyCreateUpdateDialogComponent = CompanyCreateUpdateDialogComponent;
