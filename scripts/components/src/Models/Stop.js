import {MaterialFactory} from '../Factory/MaterialFactory';

/**
* Created by thomasblasig on 28/01/2016.
* Represents a Bus line
*/

export class Stop extends THREE.Mesh{


  constructor(){
    super(new THREE.CylinderGeometry(50, 50, 20, 32), new THREE.MeshBasicMaterial({map : MaterialFactory.getStopTexture()}));
  }

  //Todo



}
