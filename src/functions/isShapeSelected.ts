import Coor from "../interfaces/Coor"

import Shape from "../interfaces/Shape";

function isShapeSelected(coords: Coor, shape: Shape): boolean {
    return shape.isShapeSelected(coords);
}

export default isShapeSelected