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
exports.CouponCreateUpdateDialogComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var Category_1 = require("src/app/models/Category");
var Coupon_1 = require("src/app/models/Coupon");
var CouponCreateUpdateDialogComponent = /** @class */ (function () {
    function CouponCreateUpdateDialogComponent(dialogRef, data, companyService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.companyService = companyService;
        this.coupon = new Coupon_1.Coupon();
        this.origin = new Coupon_1.Coupon();
        this.tmpCoupon = new Coupon_1.Coupon();
        this.todayDate = new Date();
        this.tmpCoupon = data.coupon;
        this.type = data.type;
    }
    CouponCreateUpdateDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyService.getCompanyDetails().subscribe(function (companyServer) { _this.company = companyServer; console.log(_this.company); _this.companyId = _this.company.id; _this.smartCopy(_this.tmpCoupon); }, function (err) { alert(err.error); });
    };
    CouponCreateUpdateDialogComponent.prototype.smartCopy = function (coupon) {
        if (coupon) {
            this.coupon.id = coupon.id;
            this.coupon.companyId = coupon.companyId;
            this.coupon.category = coupon.category;
            this.coupon.title = coupon.title;
            this.coupon.description = coupon.description;
            this.coupon.startDate = coupon.startDate;
            this.coupon.endDate = coupon.endDate;
            this.coupon.amount = coupon.amount;
            this.coupon.price = coupon.price;
            this.coupon.image = coupon.image;
            this.origin.id = coupon.id;
            this.origin.companyId = coupon.companyId;
            this.origin.category = coupon.category;
            this.origin.title = coupon.title;
            this.origin.description = coupon.description;
            this.origin.startDate = new Date(coupon.startDate);
            this.origin.endDate = new Date(coupon.endDate);
            this.origin.amount = coupon.amount;
            this.origin.price = coupon.price;
            this.origin.image = coupon.image;
        }
        else {
            this.coupon.id = 0;
            this.coupon.companyId = this.companyId;
            this.coupon.category = Category_1.Category.ELECTRICITY;
            this.coupon.title = '';
            this.coupon.description = '';
            this.coupon.startDate = new Date();
            this.coupon.endDate = new Date();
            this.coupon.amount = 0;
            this.coupon.price = 0;
            this.coupon.image = '';
        }
    };
    CouponCreateUpdateDialogComponent.prototype.checkChanges = function (origin, coupon) {
        return JSON.stringify(origin) === JSON.stringify(coupon);
    };
    CouponCreateUpdateDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    CouponCreateUpdateDialogComponent.prototype.inputEventStart = function (event) {
        console.log(event.value);
        this.coupon.startDate = new Date(event.value);
    };
    CouponCreateUpdateDialogComponent.prototype.changeEventStart = function (event) {
        console.log(event.value);
        this.coupon.startDate = new Date(event.value);
    };
    CouponCreateUpdateDialogComponent.prototype.inputEventEnd = function (event) {
        console.log(event.value);
        this.coupon.endDate = new Date(event.value);
    };
    CouponCreateUpdateDialogComponent.prototype.changeEventEnd = function (event) {
        console.log(event.value);
        this.coupon.endDate = new Date(event.value);
    };
    CouponCreateUpdateDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-coupon-create-update-dialog',
            templateUrl: './coupon-create-update-dialog.component.html',
            styleUrls: ['./coupon-create-update-dialog.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], CouponCreateUpdateDialogComponent);
    return CouponCreateUpdateDialogComponent;
}());
exports.CouponCreateUpdateDialogComponent = CouponCreateUpdateDialogComponent;
