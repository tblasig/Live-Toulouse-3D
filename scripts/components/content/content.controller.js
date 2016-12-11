class ContentController {
    constructor() {

        // Toulouse
        this._coords = [43.600000, 1.433333];
        this.initWorld();
    }

    initWorld() {

        this._world = VIZI.world('world', {
            skybox: true,
            postProcessing: false
        }).setView(this._coords);

        // Set position of sun in sky
        this._world._environment._skybox.setInclination(0.1);

        // Add controls
        VIZI.Controls.orbit().addTo(this._world);

        // CartoDB basemap
        VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(this._world);

        // Buildings and roads from Mapzen (polygons and linestrings)
        var topoJSONTileLayer = VIZI.topoJSONTileLayer('https://vector.mapzen.com/osm/buildings,roads/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw', {
            interactive: false,
            style: function(feature) {
                var height;

                if (feature.properties.height) {
                    height = feature.properties.height;
                } else {
                    height = 10 + Math.random() * 10;
                }

                return {
                    height: height,
                    lineColor: '#f7c616',
                    lineWidth: 1,
                    lineTransparent: true,
                    lineOpacity: 0.2,
                    lineBlending: THREE.AdditiveBlending,
                    lineRenderOrder: 2
                };
            },
            filter: function(feature) {
                // Don't show points
                return feature.geometry.type !== 'Point';
            },
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://whosonfirst.mapzen.com#License">Who\'s On First</a>.'
        }).addTo(this._world);
    }
}

export default ContentController;