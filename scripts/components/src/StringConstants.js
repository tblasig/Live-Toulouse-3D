/**
 * Created by thomasblasig on 26/12/2016.
 */


export class StringConstants {


    static get MAP_TILE_LANDSCAPE() {
        https://umap.openstreetmap.fr/fr/map/carte-sans-nom_118560#16/43.5840/1.4190
        return 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        //return 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png';
    }

    static get MAP_TILE_TRANSPORT() {
        return 'http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png';
    }

    static get BUILDING_DATA() {
        return "https://vector.mapzen.com/osm/buildings/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw";
    }

    static get ROAD_DATA() {
        return "https://vector.mapzen.com/osm/roads/{z}/{x}/{y}.topojson?api_key=vector-tiles-NT5Emiw";
    }

    //Plug on Toulouse
    static get COORDS_WORLD() {
        return [43.600000, 1.433333];
    }




}
