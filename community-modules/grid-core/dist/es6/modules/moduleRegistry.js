/**
 * @ag-grid-community/core - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v22.0.0
 * @link http://www.ag-grid.com/
 * @license MIT
 */
import { _ } from "../utils";
var ModuleRegistry = /** @class */ (function () {
    function ModuleRegistry() {
    }
    ModuleRegistry.register = function (module) {
        this.modulesMap[module.moduleName] = module;
    };
    ModuleRegistry.assertRegistered = function (moduleName, reason) {
        if (this.isRegistered(moduleName)) {
            return true;
        }
        var warningKey = reason + moduleName;
        var warningMessage = "ag-Grid: unable to use " + reason + " as module " + moduleName + " is not present. "
            + ("You need to load the module with: import \"" + moduleName + "\"");
        _.doOnce(function () { console.warn(warningMessage); }, warningKey);
        return false;
    };
    ModuleRegistry.isRegistered = function (moduleName) {
        return !!this.modulesMap[moduleName];
    };
    ModuleRegistry.getRegisteredModules = function () {
        return _.values(this.modulesMap);
    };
    // having in a map a) removes duplicates and b) allows fast lookup
    ModuleRegistry.modulesMap = {};
    return ModuleRegistry;
}());
export { ModuleRegistry };
