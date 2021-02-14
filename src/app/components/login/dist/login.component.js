"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var LoginDetails_1 = require("src/app/models/LoginDetails");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, authorizationService, adminService, companyService, customerService, logoutService, alertService) {
        this.router = router;
        this.authorizationService = authorizationService;
        this.adminService = adminService;
        this.companyService = companyService;
        this.customerService = customerService;
        this.logoutService = logoutService;
        this.alertService = alertService;
        this.loginDetails = new LoginDetails_1.LoginDetails();
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.logoutService.count.subscribe(function (c) {
            _this.isUserLoggedIn = c;
        });
    };
    LoginComponent.prototype.RouteOnClick = function () {
        var _this = this;
        if (this.loginDetails.type === 'admin') {
            this.adminService.login(this.loginDetails).subscribe(function (loginRes) {
                var loginResponse;
                loginResponse = loginRes;
                var myToken = loginResponse.token;
                console.log(myToken);
                _this.logoutService.nextCount(3);
                _this.authorizationService.setToken(myToken);
                _this.router.navigateByUrl('/admin');
            }, function (err) { _this.alertService.error(err.error); });
        }
        else if (this.loginDetails.type === 'company') {
            this.companyService.login(this.loginDetails).subscribe(function (loginRes) {
                var loginResponse;
                loginResponse = loginRes;
                var myToken = loginResponse.token;
                _this.logoutService.nextCount(4);
                _this.authorizationService.setToken(myToken);
                _this.router.navigateByUrl('/company');
            }, function (err) { _this.alertService.error(err.error); });
        }
        else {
            this.customerService.login(this.loginDetails).subscribe(function (loginRes) {
                var loginResponse;
                loginResponse = loginRes;
                var myToken = loginResponse.token;
                _this.logoutService.nextCount(5);
                _this.authorizationService.setToken(myToken);
                _this.router.navigateByUrl('/customer');
            }, function (err) { _this.alertService.error(err.error); });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
