(function() {
    'use strict';

    angular.module('users')
        .service('userService', ['$window', '$cookies', UserService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model;
     *
     */
    function UserService($window, $cookies) {
        function get_user() {
            var user_id = $cookies.get('user_id');
            if (!user_id) {
                return 0;
            }

            return user_id;
        };

        function save_user(user) {
            var saved = get_user();

            if (saved == user.id) {
                return;
            }

            var now = new $window.Date();
            var exp = new $window.Date(now.getFullYear(), now.getMonth() + 6, now.getDate());

            $cookies.put('user_id', user.id, { expires: exp });
        };

        return {
            save: save_user,
            get: get_user
        };
    }

})();
