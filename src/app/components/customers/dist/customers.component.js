"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomersComponent = void 0;
var core_1 = require("@angular/core");
var customer_create_update_dialog_component_1 = require("../customer-create-update-dialog/customer-create-update-dialog.component");
var CustomersComponent = /** @class */ (function () {
    function CustomersComponent(dialog, adminService, alertService) {
        this.dialog = dialog;
        this.adminService = adminService;
        this.alertService = alertService;
    }
    CustomersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getAllCustomers().subscribe(function (res) { _this.customers = res; }, function (err) { _this.alertService.error(err.error); });
    };
    CustomersComponent.prototype.deleteCustomer = function (customerId) {
        var _this = this;
        this.adminService.deleteCustomer(customerId).subscribe(function () { _this.customers = _this.customers.filter(function (item) { return item.id !== customerId; }); }, function (err) { _this.alertService.error(err.error); });
    };
    CustomersComponent.prototype.addCustomer = function () {
        this.openDialog(null);
    };
    CustomersComponent.prototype.updateCustomer = function (customer) {
        this.openDialog(customer);
    };
    CustomersComponent.prototype.openDialog = function (customer) {
        var _this = this;
        var type;
        if (customer) {
            type = 'Update';
        }
        else {
            type = 'Create';
        }
        var dialogRef = this.dialog.open(customer_create_update_dialog_component_1.CustomerCreateUpdateDialogComponent, {
            width: '300px',
            data: { customer: customer, type: type }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log('*', result, '*');
            _this.resultDialog = result;
            if (type === 'Update') {
                _this.adminService.updateCustomer(_this.resultDialog).subscribe(function (res) {
                    var toUpdate = _this.customers.find(function (item) { return item.id === res.id; });
                    var idx = _this.customers.indexOf(toUpdate);
                    _this.customers[idx] = res;
                    console.log(toUpdate);
                }, function (err) { _this.alertService.error(err.error); });
            }
            else {
                console.log(result);
                _this.adminService.addCustomer(_this.resultDialog).subscribe(function (res) { _this.customers.push(res); }, function (err) { _this.alertService.error(err.error); });
            }
        });
    };
    CustomersComponent = __decorate([
        core_1.Component({
            selector: 'app-customers',
            templateUrl: './customers.component.html',
            styleUrls: ['./customers.component.scss']
        })
    ], CustomersComponent);
    return CustomersComponent;
}());
exports.CustomersComponent = CustomersComponent;
