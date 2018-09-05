(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./pinkbike/article.js":
/*!*****************************!*\
  !*** ./pinkbike/article.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PbArticle = /** @class */ (function () {
    
    function PbArticle() {
        this.id = null;
        this.title = null;
        this.category = null;
        this.imageUrl = null;
        this.url = null;
        this.postId = null;
        this.description = null;
        return this;
    }
})

exports.PbArticle = PbArticle;

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<post-list [data]=\"postList\" (open)=\"openUrl($event)\"></post-list>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/index.js");
/* harmony import */ var _pinkbike_article__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pinkbike/article */ "./pinkbike/article.js");
/* harmony import */ var _pinkbike_article__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_pinkbike_article__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(_es, _cd) {
        this._es = _es;
        this._cd = _cd;
        this.posts = [];
        this.postList = immutable__WEBPACK_IMPORTED_MODULE_3__["List"]();
        // this.posts.push(new Post("1", "#", "2018 Trek Remedy 8 Large 19.5\"", "Bike is in excellent condition and has been well maintained. It has less than 200 miles on it. There is a slight ding...", "https://ep1.pinkbike.org/p1pb15729556/p1pb15729556.jpg"));
        // this.posts.push(new Post("2", "#", "Post two", "Some info", "https://ep1.pinkbike.org/p1pb15961123/p1pb15961123.jpg"));
        // this.posts.push(new Post("3", "#", "Post three", "Some info", "https://ep1.pinkbike.org/p1pb15681934/p1pb15681934.jpg"));
        // this.posts.push(new Post("4", "#", "Post four", "Some info", "https://ep1.pinkbike.org/p1pb15940369/p1pb15940369.jpg"));
        // this.posts.push(new Post("5", "#", "Post five", "Some info", "https://ep1.pinkbike.org/p1pb15552210/p1pb15552210.jpg"));
        // this.posts.push(new Post("6", "#", "Post six", "Some info", "https://ep1.pinkbike.org/p1pb12817658/p1pb12817658.jpg"));
    }
    AppComponent.prototype.addPost = function (post) {
        this.postList = this.postList.insert(0, post);
    };
    AppComponent.prototype.openUrl = function (article) {
        this._es.shell.openExternal(article.url, null, function (err) {
            if (err)
                console.log("Unable to open url " + article.url);
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(function () {
            if (_this.postList.has) {
                _this.postList.forEach(function (value, key, iter) {
                    console.log(value);
                });
            }
        }, 2000);
        if (this._es.isElectronApp) {
            var pong = this._es.ipcRenderer.sendSync('synchronous-message', 'ping');
            console.log(pong);
            this._es.ipcRenderer.on('new-posts', function (event, article) {
                var newArticle = new _pinkbike_article__WEBPACK_IMPORTED_MODULE_2__["PbArticle"]();
                newArticle.id = article['id'];
                newArticle.title = article['title'];
                newArticle.category = article['category'];
                newArticle.imageUrl = article['imageUrl'];
                newArticle.postId = article['postId'];
                newArticle.url = article['url'];
                newArticle.description = article['description'];
                _this.addPost(newArticle);
            });
            this._es.ipcRenderer.send('asynchronous-message', 'ping');
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
            providers: [ngx_electron__WEBPACK_IMPORTED_MODULE_1__["ElectronService"]],
        }),
        __metadata("design:paramtypes", [ngx_electron__WEBPACK_IMPORTED_MODULE_1__["ElectronService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/index.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_post__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/post */ "./src/app/components/post/index.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared */ "./src/app/shared/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _shared__WEBPACK_IMPORTED_MODULE_6__["ReversePipe"],
                _components_post__WEBPACK_IMPORTED_MODULE_5__["PostComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                ngx_electron__WEBPACK_IMPORTED_MODULE_3__["NgxElectronModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/post/index.ts":
/*!******************************************!*\
  !*** ./src/app/components/post/index.ts ***!
  \******************************************/
/*! exports provided: PostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _post_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post.component */ "./src/app/components/post/post.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostComponent", function() { return _post_component__WEBPACK_IMPORTED_MODULE_0__["PostComponent"]; });




/***/ }),

/***/ "./src/app/components/post/post.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/post/post.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".post {\n\n}"

/***/ }),

/***/ "./src/app/components/post/post.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/post/post.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"list-group\">\n    <div class=\"post container\" *ngFor=\"let post of data; index as i\">\n            <div (click)=\"openArticle(post)\" class=\"row\">\n                <div class=\"col-4\">\n                    <img [src]=\"post.imageUrl || 'assets/no-image.png'\" class=\"img-thumbnail\" style=\"width: 150px; height: 150px;\">\n                </div>\n                <div class=\"col-8\">\n                    <div class=\"d-flex w-100 justify-content-between\">\n                        <h5 class=\"mb-1 title\">{{ post.title }}</h5>\n                        <small>{{ post.postId }}</small>\n                    </div>\n                    <p class=\"mb-1\">{{ post.description }}</p>\n                </div>\n            </div>\n    </div>\n</div>\n    "

/***/ }),

/***/ "./src/app/components/post/post.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/post/post.component.ts ***!
  \***************************************************/
/*! exports provided: PostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostComponent", function() { return PostComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PostComponent = /** @class */ (function () {
    function PostComponent() {
        this.open = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    PostComponent.prototype.ngOnInit = function () {
    };
    PostComponent.prototype.openArticle = function (article) {
        this.open.emit(article);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], PostComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PostComponent.prototype, "open", void 0);
    PostComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'post-list',
            template: __webpack_require__(/*! ./post.component.html */ "./src/app/components/post/post.component.html"),
            styles: [__webpack_require__(/*! ./post.component.css */ "./src/app/components/post/post.component.css")],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
        }),
        __metadata("design:paramtypes", [])
    ], PostComponent);
    return PostComponent;
}());



/***/ }),

/***/ "./src/app/shared/index.ts":
/*!*********************************!*\
  !*** ./src/app/shared/index.ts ***!
  \*********************************/
/*! exports provided: ReversePipe, Post */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ "./src/app/shared/models/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Post", function() { return _models__WEBPACK_IMPORTED_MODULE_0__["Post"]; });

/* harmony import */ var _pipes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pipes */ "./src/app/shared/pipes/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReversePipe", function() { return _pipes__WEBPACK_IMPORTED_MODULE_1__["ReversePipe"]; });





/***/ }),

/***/ "./src/app/shared/models/index.ts":
/*!****************************************!*\
  !*** ./src/app/shared/models/index.ts ***!
  \****************************************/
/*! exports provided: Post */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _post_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post.model */ "./src/app/shared/models/post.model.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Post", function() { return _post_model__WEBPACK_IMPORTED_MODULE_0__["Post"]; });




/***/ }),

/***/ "./src/app/shared/models/post.model.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/models/post.model.ts ***!
  \*********************************************/
/*! exports provided: Post */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Post", function() { return Post; });
var Post = /** @class */ (function () {
    function Post(id, url, title, description, imgUrl) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
        this.id = id || null;
        this.url = url || null;
        this.title = title || null;
        this.description = description || null;
        this.imgUrl = imgUrl || null;
    }
    return Post;
}());



/***/ }),

/***/ "./src/app/shared/pipes/index.ts":
/*!***************************************!*\
  !*** ./src/app/shared/pipes/index.ts ***!
  \***************************************/
/*! exports provided: ReversePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sortBy_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sortBy.pipe */ "./src/app/shared/pipes/sortBy.pipe.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReversePipe", function() { return _sortBy_pipe__WEBPACK_IMPORTED_MODULE_0__["ReversePipe"]; });




/***/ }),

/***/ "./src/app/shared/pipes/sortBy.pipe.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/pipes/sortBy.pipe.ts ***!
  \*********************************************/
/*! exports provided: ReversePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReversePipe", function() { return ReversePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ReversePipe = /** @class */ (function () {
    function ReversePipe() {
    }
    ReversePipe.prototype.transform = function (array) {
        // let newArray = array.sort((a,b) => {
        //     var x = a[key]; var y = b[key];
        //     let out = ((x < y) ? -1 : ((x > y) ? 1 : 0));
        //     if(reverse && out != 0) out * -1;
        //     return out;
        // });
        return array.reverse();
    };
    ReversePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'reverse' })
    ], ReversePipe);
    return ReversePipe;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/max/Documents/Racktop/dev/angular-x/pinkbike-notify/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map