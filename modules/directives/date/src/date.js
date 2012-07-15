/*
 jQuery UI Datepicker plugin wrapper
 
 @param [ui-date] {object} Options to pass to $.fn.datepicker() merged onto ui.config
*/
angular.module('ui.directives').directive('uiDate', [
  'ui.config', function(uiConfig) {
    var options;
    options = {};
    if (uiConfig.date != null) angular.extend(options, uiConfig.date);
    return {
      require: '?ngModel',
      link: function(scope, element, attrs, controller) {
        var opts, originalRender, updateModel, usersOnSelectHandler;
        opts = angular.extend({}, options, scope.$eval(attrs.uiDate));
        if (controller != null) {
          updateModel = function(value, picker) {
            return scope.$apply(function() {
              return controller.$setViewValue(element.datepicker("getDate"));
            });
          };
          if (opts.onSelect != null) {
            usersOnSelectHandler = opts.onSelect;
            opts.onSelect = function(value, picker) {
              updateModel(value);
              return usersOnSelectHandler(value, picker);
            };
          } else {
            opts.onSelect = updateModel;
          }
          originalRender = controller.$render;
          controller.$render = function() {
            originalRender();
            return element.datepicker("setDate", controller.$viewValue);
          };
        }
        return element.datepicker(opts);
      }
    };
  }
]);
