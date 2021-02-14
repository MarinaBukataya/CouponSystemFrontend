"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CouponsComponent = void 0;
var core_1 = require("@angular/core");
var CouponsComponent = /** @class */ (function () {
    function CouponsComponent(customerService, alertService) {
        this.customerService = customerService;
        this.alertService = alertService;
    }
    CouponsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.customerService.getCouponsCatalogue().subscribe(function (res) { _this.coupons = res; }, function (err) { _this.alertService.error(err.error); });
    };
    CouponsComponent.prototype.purchaseCoupon = function (coupon) {
        var _this = this;
        this.customerService.purchaseCoupon(coupon).subscribe(function () {
            var couponA = _this.coupons.find(function (coup) { return coup.title === coupon.title; });
            couponA.amount = couponA.amount - 1;
        }, function (err) { _this.alertService.error(err.error); });
    };
    CouponsComponent = __decorate([
        core_1.Component({
            selector: 'app-coupons',
            templateUrl: './coupons.component.html',
            styleUrls: ['./coupons.component.scss']
        })
    ], CouponsComponent);
    return CouponsComponent;
}());
exports.CouponsComponent = CouponsComponent;
