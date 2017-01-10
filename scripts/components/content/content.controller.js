import {StringConstants} from '../src/StringConstants';
import {MaterialFactory} from '../src/Factory/MaterialFactory';

class ContentController {
    constructor() {

        this._buses = new Array();
        this._coords = StringConstants.COORDS_WORLD;

        this.container = angular.element(document.querySelectorAll('#world'));
        this.initThreeJS();
        this.initWorld();

    }

    initWorld() {

        this._world = VIZI.world('world', {
            skybox: true,
            postProcessing: false
        }).setView(this._coords);

        this._world._engine._renderer = this.renderer;
        this.scene = this._world._engine._scene;

        this.camera = this._world._engine._camera;

        // Set position of sun in sky
        this._world._environment._skybox.setInclination(0.1);

        // Add controls
        VIZI.Controls.orbit().addTo(this._world);

        // CartoDB basemap
        VIZI.imageTileLayer(StringConstants.MAP_TILE_LANDSCAPE, {
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

        //1/6 of geojson came from (perf issues) https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=arrets-de-bus0'
        VIZI.geoJSONLayer('https://api.myjson.com/bins/12cs99', {
            output: true,
            style: {
                color: '#ff0000',
                lineColor: '#ff0000',
                lineRenderOrder: 1,
                pointColor: '#00cc00'
            },
            pointGeometry: function(feature) {
                var geometry = new THREE.BoxGeometry( 12, 200, 50 );
                return geometry;
            },
            onEachFeature: function(feature, layer) {
                layer.on('click', function (layer, point2d, point3d, intersects) {
                    var id = layer.feature.properties.LAD11CD;
                    var value = layer.feature.properties.POPDEN;

                    console.log(id + ': ' + value, layer, point2d, point3d, intersects);
                })
            }
        }).addTo(this._world);

    }

    initThreeJS() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, 1200);
        this.container.append(this.renderer.domElement);
    }

}

export default ContentController;
