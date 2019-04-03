import Coor from "./Coor"
import Shape from "./Shape"

interface MyState {
    baseColor: string,
    baseShape: string,
    startCoor: Coor,
    range: number,
    lineWidth: number,
    clicked: boolean,
    text: string,
    selectedShape: number,
    allColors: string[],
    allShapes: Shape[],
    resizing: string,
    polyline: Coor[],
    selectedShapesArr: number[]

}

export default MyState