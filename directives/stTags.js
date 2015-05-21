/**
 * TODO: search exact substrings !!
 */

titanApp.directive('tagSearch', ['$compile', function ($compile) {
    return {
        restrict: "AE",
        require: '^stTable',
        replace: true,
        compile: function (element, attr) {
            var tagsSuffix = "Tags";
            var optionsName = attr["options"];

            var placeHolderName = optionsName + tagsSuffix;
            var placeholderText = "Click to filter " + optionsName.split("Options")[0];

            var taggerText = '<tagger ng-model="' + placeHolderName + '" options="' + optionsName + '" placeholder="' + placeholderText +'"></tagger>';

            //<tag-search options="TechnologyOptions" st-tags-col-name="Technology"></tag-search>

            var compiledElementFunction = $compile(taggerText);

            return {
                post: function postLink(scope, element, attributes, ctrl) {
                    // create place-holder for the tags
                    var tagsSuffix = "Tags";
                    var optionsName = attr["options"];
                    var placeHolderName = optionsName + tagsSuffix;
                    scope[placeHolderName] = [];

                    var containerElementId = attributes["stTagsContainerId"];
                    var compiledTagger = compiledElementFunction(scope);

                    if (containerElementId) {
                        angular.element(document.querySelector("#" + attributes["stTagsContainerId"])).prepend(compiledTagger);
                    } else {
                        element.replaceWith(compiledTagger);
                    }

                    //// NOT ANGULAR WAY
                    //$(element).click(function() {
                    //    alert("CLICK");})

                    scope.$watchCollection(function (scope) {
                        return scope[placeHolderName];
                    }, function (newValue, oldValue) {
                        var predicateObject = ctrl.tableState().search.predicateObject || {};
                        var colName = attr["stTagsColName"];
                        var predicate = predicateObject[colName] || [];

                        if (!Array.isArray(predicate)) {
                            // you can either have stTags or stSearch!
                            // TODO: add better explanation
                            throw "Cannot have stTags and stSearch on the same column!"
                        } else {
                            if (newValue && newValue.length > 0) {
                                predicate = newValue;
                                predicateObject[colName] = predicate;
                                ctrl.tableState().search.predicateObject = predicateObject;
                            } else {
                                delete predicateObject[colName];
                                ctrl.tableState().search.predicateObject = predicateObject;
                                //console.log("AFTER: " + ctrl.tableState().search.predicateObject);
                            }
                            ctrl.search();
                        }
                    });
                }
            }
        }
    }
}]);