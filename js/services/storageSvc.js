(function () {
    var module = angular.module("itilxApp");
    module.factory("storageSvc", ["globalSettings", function (globalSettings) {

        var getClient = function () {
                return new WindowsAzure.MobileServiceClient(
                    globalSettings.apiUrl,
                    globalSettings.apiKey
                );
            },
            insert = function (entityName, entity) {
                return getClient().getTable(entityName).insert(entity);
            },
            update = function (entityName, entity) {
                return getClient().getTable(entityName).update(entity);
            },
            query = function (entityName, selectList, whereClause) {
                return getClient().getTable(entityName).select(selectList).where(whereClause)
                    .read();
            },
            del = function(entityName, whereClause) {
                return getClient().getTable(entityName).del(whereClause);
            };

        return {
            insert: insert,
            update: update,
            query: query,
            del: del
        }
    }]);
})();
