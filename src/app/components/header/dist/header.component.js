"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, authorizationService, adminService, companyService, customerService, logoutService) {
        this.router = router;
        this.authorizationService = authorizationService;
        this.adminService = adminService;
        this.companyService = companyService;
        this.customerService = customerService;
        this.logoutService = logoutService;
        this.isUserLoggedIn = 1;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.logoutService.count.subscribe(function (c) {
            _this.isUserLoggedIn = c;
        });
    };
    HeaderComponent.prototype.getToken = function () {
        return this.authorizationService.getToken();
    };
    HeaderComponent.prototype.loginOnClick = function (event) {
        this.logoutService.nextCount(2);
    };
    HeaderComponent.prototype.logoutOnClick = function (event) {
        var _this = this;
        event.preventDefault(); // Prevents browser following the link
        if (this.isUserLoggedIn === 4) {
            this.companyService.logout(this.getToken()).subscribe(function () { _this.authorizationService.deleteToken(); console.log(_this.getToken()); }, function (err) { alert(err.message); });
        }
        else if (this.isUserLoggedIn === 5) {
            this.customerService.logout(this.getToken()).subscribe(function () { _this.authorizationService.deleteToken(); console.log(_this.getToken()); }, function (err) { alert(err.message); });
        }
        else {
            this.adminService.logout(this.getToken()).subscribe(function () { _this.authorizationService.deleteToken(); console.log(_this.getToken()); }, function (err) { alert(err.message); });
        }
        this.logoutService.resetCount();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
