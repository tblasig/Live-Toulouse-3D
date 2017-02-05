import {StringConstants} from '../src/StringConstants';
import {MaterialFactory} from '../src/Factory/MaterialFactory';
import {Stop} from '../src/Models/Stop';
import {StaticGeoJSONFactory} from '../src/Factory/StaticGeoJSONFactory';

class ContentController {
    constructor($http) {

        this._$http = $http;
        this._buses = new Array();

        this.container = angular.element(document.querySelectorAll('#world'));
        this.initThreeJS();
        this.initWorld($http);

        VIZI.myScene = this.scene;
        VIZI.myWorld = this._world;



    }

    initWorld() {

        this._world = VIZI.world('world', {
            skybox: true,
            postProcessing: false
        }).setView(StringConstants.COORDS_WORLD);

        this._world._engine._renderer = this.renderer;
        this.scene = this._world._engine._scene;

        this.camera = this._world._engine._camera;

        // Set position of sun in sky
        this._world._environment._skybox.setInclination(0.1);

        // Add controls
        VIZI.Controls.orbit().addTo(this._world);



        // CartoDB basemap
        VIZI.imageTileLayer(StringConstants.MAP_TILE_LANDSCAPE, {
          distance: 12000,
    			// base is a yuge plane under the tiles, give it one material instance
    			baseMaterial: MaterialFactory.getTileMaterial(),
    			// this is a material for each tile, each tile needs a separate one (bc texture is different on each)
    			tileMaterial: MaterialFactory.getTileMaterial(),
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(this._world);



        VIZI.topoJSONTileLayer(StringConstants.BUILDING_DATA, {
            output: true,
            interactive: true,

            polygonMaterial: function() {
                return MaterialFactory.getBuildingMaterial();
            },

            style: function(feature) {
                return MaterialFactory.getFeatureStyle(feature);
            },

            filter: function(feature) {
                return MaterialFactory.getFilter(feature);
            },
        }).addTo(this._world);


      //Roads
        VIZI.topoJSONTileLayer(StringConstants.ROAD_DATA, {
            output: true,
            keepFeatures : true,
            interactive : true,
        }).addTo(this._world);

        //Buses stop
        StaticGeoJSONFactory.geoJSONLayer(this._$http, 'https://api.myjson.com/bins/12cs99', {
          onEachFeature : function(feature){
            var lat = feature.geometry.coordinates[1];
            var long = feature.geometry.coordinates[0];
            var latlon = new VIZI.LatLon(lat, long, 0);
            var pt = VIZI.myWorld.latLonToPoint(latlon);

            let stop = new Stop();

            stop.position.x = pt.x;
            stop.position.z = pt.y;
            stop.lookAt(VIZI.myWorld._engine._camera);
            VIZI.myScene.add(stop);
          }
        });



    }

    initThreeJS() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, 1200);
        this.container.append(this.renderer.domElement);
    }

}

export default ContentController;
