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
exports.CustomerCreateUpdateDialogComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var Customer_1 = require("src/app/models/Customer");
var CustomerCreateUpdateDialogComponent = /** @class */ (function () {
    function CustomerCreateUpdateDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.customer = new Customer_1.Customer();
        this.origin = new Customer_1.Customer();
        this.smartCopy(data.customer);
        this.type = data.type;
    }
    CustomerCreateUpdateDialogComponent.prototype.ngOnInit = function () {
    };
    CustomerCreateUpdateDialogComponent.prototype.smartCopy = function (customer) {
        if (customer) {
            this.customer.id = customer.id;
            this.customer.firstName = customer.firstName;
            this.customer.lastName = customer.lastName;
            this.customer.email = customer.email;
            this.customer.password = customer.password;
            this.origin.id = customer.id;
            this.origin.firstName = customer.firstName;
            this.origin.lastName = customer.lastName;
            this.origin.email = customer.email;
            this.origin.password = customer.password;
        }
        else {
            this.customer.id = 0;
            this.customer.lastName = '';
            this.customer.firstName = '';
            this.customer.email = '';
            this.customer.password = '';
        }
    };
    CustomerCreateUpdateDialogComponent.prototype.checkChanges = function (origin, customer) {
        return JSON.stringify(origin) === JSON.stringify(customer);
    };
    CustomerCreateUpdateDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    CustomerCreateUpdateDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-create-update-dialog',
            templateUrl: './customer-create-update-dialog.component.html',
            styleUrls: ['./customer-create-update-dialog.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], CustomerCreateUpdateDialogComponent);
    return CustomerCreateUpdateDialogComponent;
}());
exports.CustomerCreateUpdateDialogComponent = CustomerCreateUpdateDialogComponent;
