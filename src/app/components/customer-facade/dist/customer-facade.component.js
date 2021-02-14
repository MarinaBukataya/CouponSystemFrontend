"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerFacadeComponent = void 0;
var core_1 = require("@angular/core");
var CustomerFacadeComponent = /** @class */ (function () {
    function CustomerFacadeComponent(customerService, alertService) {
        this.customerService = customerService;
        this.alertService = alertService;
    }
    CustomerFacadeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerService.getAllCoupons().subscribe(function (res) { _this.coupons = res; }, function (err) { alert(err.error); });
        this.customerService.getCustomerDetails().subscribe(function (res) { _this.customer = res; }, function (err) { alert(err.error); });
    };
    CustomerFacadeComponent.prototype.onChangeCategory = function (value) {
        var _this = this;
        if (value === 'ALL') {
            this.customerService.getAllCoupons().subscribe(function (res) { _this.coupons = res; }, function (err) { alert(err.error); });
        }
        else {
            this.customerService.getCouponsByCategory(value)
                .subscribe(function (coupons) {
                _this.coupons = coupons;
            }, function (err) {
                _this.alertService.error(err.error);
            });
        }
    };
    CustomerFacadeComponent.prototype.onChangePrice = function (value) {
        var _this = this;
        if (value.toString() === '') {
            this.customerService.getAllCoupons().subscribe(function (res) { _this.coupons = res; }, function (err) { alert(err.error); });
        }
        else {
            this.customerService.getCouponsByPrice(value)
                .subscribe(function (coupons) {
                _this.coupons = coupons;
            }, function (err) {
                _this.alertService.error(err.error);
            });
        }
    };
    CustomerFacadeComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-facade',
            templateUrl: './customer-facade.component.html',
            styleUrls: ['./customer-facade.component.scss']
        })
    ], CustomerFacadeComponent);
    return CustomerFacadeComponent;
}());
exports.CustomerFacadeComponent = CustomerFacadeComponent;
