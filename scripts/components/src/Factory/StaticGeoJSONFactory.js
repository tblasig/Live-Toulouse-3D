/**
 */

export class StaticGeoJSONFactory{

    constructor($http){

    }

    static geoJSONLayer($http, url, callback){

      $http.get(url).then(function (data) {
        StaticGeoJSONFactory.successCallback(data.data.features, callback);
      }).catch(
      function (error) {
        StaticGeoJSONFactory.errorCallback(error);
      });
    }

    static successCallback(data, callback){
      for (var i=0; i<data.length; i++) {
        callback.onEachFeature(data[i]);
      }

    }

    static errorCallback(error){
      console.log(error);
    }


}
