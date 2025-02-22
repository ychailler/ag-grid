"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@ag-grid-community/core");
var FilterStage = /** @class */ (function () {
    function FilterStage() {
    }
    FilterStage.prototype.execute = function (params) {
        var rowNode = params.rowNode, changedPath = params.changedPath;
        this.filterService.filter(changedPath);
        this.selectableService.updateSelectableAfterFiltering(rowNode);
    };
    __decorate([
        core_1.Autowired('gridOptionsWrapper')
    ], FilterStage.prototype, "gridOptionsWrapper", void 0);
    __decorate([
        core_1.Autowired('selectableService')
    ], FilterStage.prototype, "selectableService", void 0);
    __decorate([
        core_1.Autowired('filterService')
    ], FilterStage.prototype, "filterService", void 0);
    FilterStage = __decorate([
        core_1.Bean('filterStage')
    ], FilterStage);
    return FilterStage;
}());
exports.FilterStage = FilterStage;
