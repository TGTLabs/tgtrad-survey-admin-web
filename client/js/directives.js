'use strict';

angular.module('angular-client-side-auth').directive('imageDropzone', function () {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '='
    },
    link: function (scope, element, attrs) {
      var validMimeTypes = attrs.fileDropzone;

      var processDragOverOrEnter = function (event) {
        if (event != null) {
          event.preventDefault();
        }
        event.dataTransfer.effectAllowed = 'copy';
        return false;
      };

      var checkSize = function (size) {
        var _ref;
        if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
          return true;
        } else {
          alert("File must be smaller than " + attrs.maxFileSize + " MB");
          return false;
        }
      };

      var isTypeValid = function (type) {
        if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
          return true;
        } else {
          alert("Invalid file type.  File must be one of following types " + validMimeTypes);
          return false;
        }
      };
      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);
      return element.bind('drop', function (event) {
        var file, name, reader, size, type;
        if (event != null) {
          event.preventDefault();
        }
        reader = new FileReader();
        reader.onload = function (evt) {
          if (checkSize(size) && isTypeValid(type)) {
            return scope.$apply(function () {
              scope.file = evt.target.result;
              if (angular.isString(scope.fileName)) {
                return scope.fileName = name;
              }
            });
          }
        };
        file = event.dataTransfer.files[0];
        name = file.name;
        type = file.type;
        size = file.size;
        reader.readAsDataURL(file);
        return false;
      });
    }
  };
});

angular.module('angular-client-side-auth')
  .directive('accessLevel', ['Auth', function (Auth) {
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var prevDisp = element.css('display')
          , userRole
          , accessLevel;

        $scope.user = Auth.user;
        $scope.$watch('user', function (user) {
          if (user.role)
            userRole = user.role;
          updateCSS();
        }, true);

        attrs.$observe('accessLevel', function (al) {
          if (al) accessLevel = $scope.$eval(al);
          updateCSS();
        });

        function updateCSS() {
          if (userRole && accessLevel) {
            if (!Auth.authorize(accessLevel, userRole))
              element.css('display', 'none');
            else
              element.css('display', prevDisp);
          }
        }
      }
    };
  }]);

angular.module('angular-client-side-auth').directive('activeNav', ['$location', function ($location) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var anchor = element[0];
      if (element[0].tagName.toUpperCase() != 'A')
        anchor = element.find('a')[0];
      var path = anchor.href;

      scope.location = $location;
      scope.$watch('location.absUrl()', function (newPath) {
        path = normalizeUrl(path);
        newPath = normalizeUrl(newPath);

        if (path === newPath ||
          (attrs.activeNav === 'nestedTop' && newPath.indexOf(path) === 0)) {
          element.addClass('active');
        } else {
          element.removeClass('active');
        }
      });
    }

  };

  function normalizeUrl(url) {
    if (url[url.length - 1] !== '/')
      url = url + '/';
    return url;
  }

}]);