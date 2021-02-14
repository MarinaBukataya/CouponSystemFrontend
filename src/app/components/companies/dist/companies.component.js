"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompaniesComponent = void 0;
var core_1 = require("@angular/core");
var company_create_update_dialog_component_1 = require("../company-create-update-dialog/company-create-update-dialog.component");
var CompaniesComponent = /** @class */ (function () {
    function CompaniesComponent(dialog, adminService, alertService) {
        this.dialog = dialog;
        this.adminService = adminService;
        this.alertService = alertService;
    }
    CompaniesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getAllCompanies().subscribe(function (res) { _this.companies = res; }, function (err) { _this.alertService.error(err.error); });
    };
    CompaniesComponent.prototype.deleteCompany = function (companyId) {
        var _this = this;
        this.adminService.deleteCompany(companyId).subscribe(function () { _this.companies = _this.companies.filter(function (item) { return item.id !== companyId; }); }, function (err) { _this.alertService.error(err.error); });
    };
    CompaniesComponent.prototype.addCompany = function () {
        this.openDialog(null);
    };
    CompaniesComponent.prototype.updateCompany = function (company) {
        this.openDialog(company);
    };
    CompaniesComponent.prototype.openDialog = function (company) {
        var _this = this;
        var type;
        if (company) {
            type = 'Update';
        }
        else {
            type = 'Create';
        }
        var dialogRef = this.dialog.open(company_create_update_dialog_component_1.CompanyCreateUpdateDialogComponent, {
            width: '300px',
            data: { company: company, type: type }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log('*', result, '*');
            _this.resultDialog = result;
            if (type === 'Update') {
                _this.adminService.updateCompany(_this.resultDialog).subscribe(function (res) {
                    var toUpdate = _this.companies.find(function (item) { return item.id === res.id; });
                    var idx = _this.companies.indexOf(toUpdate);
                    _this.companies[idx] = res;
                }, function (err) { _this.alertService.error(err.error); });
            }
            else {
                _this.adminService.addCompany(_this.resultDialog).subscribe(function (res) { _this.companies.push(res); }, function (err) { _this.alertService.error(err.error); }
                // (err) => { alert(err.error); console.log(err)}
                );
            }
        });
    };
    CompaniesComponent = __decorate([
        core_1.Component({
            selector: 'app-companies',
            templateUrl: './companies.component.html',
            styleUrls: ['./companies.component.scss']
        })
    ], CompaniesComponent);
    return CompaniesComponent;
}());
exports.CompaniesComponent = CompaniesComponent;
