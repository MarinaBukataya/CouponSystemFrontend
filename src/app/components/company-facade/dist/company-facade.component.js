"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyFacadeComponent = void 0;
var core_1 = require("@angular/core");
var coupon_create_update_dialog_component_1 = require("../coupon-create-update-dialog/coupon-create-update-dialog.component");
var CompanyFacadeComponent = /** @class */ (function () {
    function CompanyFacadeComponent(dialog, companyService, alertService) {
        this.dialog = dialog;
        this.companyService = companyService;
        this.alertService = alertService;
    }
    CompanyFacadeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyService.getAllCoupons().subscribe(function (res) { _this.coupons = res; }, function (err) { alert(err.error); });
    };
    CompanyFacadeComponent.prototype.deleteCoupon = function (couponId) {
        var _this = this;
        this.companyService.deleteCoupon(couponId).subscribe(function () { _this.coupons = _this.coupons.filter(function (item) { return item.id !== couponId; }); }, function (err) { _this.alertService.error(err.error); });
    };
    CompanyFacadeComponent.prototype.addCoupon = function () {
        this.openDialog(null);
    };
    CompanyFacadeComponent.prototype.updateCoupon = function (coupon) {
        this.openDialog(coupon);
    };
    CompanyFacadeComponent.prototype.openDialog = function (coupon) {
        var _this = this;
        var type;
        if (coupon) {
            type = 'Update';
        }
        else {
            type = 'Create';
        }
        var dialogRef = this.dialog.open(coupon_create_update_dialog_component_1.CouponCreateUpdateDialogComponent, {
            width: '300px',
            data: { coupon: coupon, type: type }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log('*', result, '*');
            _this.resultDialog = result;
            if (_this.resultDialog.companyId == 0 || _this.resultDialog.title == '' || _this.resultDialog.description == '' || _this.resultDialog.amount < 0 || _this.resultDialog.price <= 0 || _this.resultDialog.image == '') {
                return;
            }
            if (type === 'Update') {
                _this.companyService.updateCoupon(_this.resultDialog).subscribe(function (res) {
                    var toUpdate = _this.coupons.find(function (item) { return item.id === res.id; });
                    var idx = _this.coupons.indexOf(toUpdate);
                    _this.coupons[idx] = res;
                }, function (err) { _this.alertService.error(err.error); });
            }
            else {
                console.log(result);
                _this.companyService.addCoupon(_this.resultDialog).subscribe(function (res) { _this.coupons.push(res); }, function (err) { _this.alertService.error(err.error); }
                // (err) => { alert(err.message); }
                );
            }
        });
    };
    CompanyFacadeComponent.prototype.onChangeCategory = function (value) {
        var _this = this;
        if (value === 'ALL') {
            this.companyService.getAllCoupons().subscribe(function (res) { _this.coupons = res; }, function (err) { alert(err.error); });
        }
        else {
            this.companyService.getCouponsByCategory(value)
                .subscribe(function (coupons) {
                _this.coupons = coupons;
            }, function (error) {
                console.log(error);
            });
        }
    };
    CompanyFacadeComponent.prototype.onChangePrice = function (value) {
        var _this = this;
        if (value.toString() === '') {
            this.companyService.getAllCoupons().subscribe(function (res) { _this.coupons = res; }, function (err) { alert(err.error); });
        }
        else {
            this.companyService.getCouponsByPrice(value)
                .subscribe(function (coupons) {
                _this.coupons = coupons;
            }, function (error) {
                console.log(error);
            });
        }
    };
    CompanyFacadeComponent = __decorate([
        core_1.Component({
            selector: 'app-company-facade',
            templateUrl: './company-facade.component.html',
            styleUrls: ['./company-facade.component.scss']
        })
    ], CompanyFacadeComponent);
    return CompanyFacadeComponent;
}());
exports.CompanyFacadeComponent = CompanyFacadeComponent;
