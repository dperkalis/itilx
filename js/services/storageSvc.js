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
                getClient().getTable(entityName).insert(entity);
            },
            query = function (entityName, selectList, whereClause) {
                return getClient().getTable(entityName).select(selectList).where(whereClause)
                    .read();
            }

        return {
            insert: insert,
            query: query
        }
    }]);
})();
