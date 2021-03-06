/**
 * Created by thomasblasig on 27/12/2016.
 */

export class MaterialFactory{

    constructor(){

    }

    static getFeatureStyle(feature) {

        var height =0;
        if (feature.properties.height) {
            height = feature.properties.height;
        } else {
            height = 20 + Math.random() * 12;
        }

        return {
            height: height,
            color: 0xffffff
        };
    }

    static getBuildingMaterial() {
        return new THREE.MeshPhongMaterial({
            vertexColors: THREE.VertexColors,
            side: THREE.BackSide,
            transparent: false,
            opacity: 1,
            blending: false
        });
    }


    static getRoadMaterial() {

      return new THREE.LineBasicMaterial({
    	   color: 0x00ff00
       });

    }


    static getTileMaterial() {
        return new THREE.MeshBasicMaterial({
            depthWrite: true
        });
    }

    static getFilter(feature){
        // Don't show points
        return feature.geometry.type !== 'Point';
    }

    static getStopTexture(){
      if (MaterialFactory.cacheTexture == undefined){
        MaterialFactory.cacheTexture = THREE.ImageUtils.loadTexture('./scripts/components/vendor/bus.png');
      }
      return MaterialFactory.cacheTexture;
    }


}

MaterialFactory.cacheTexture = undefined;
