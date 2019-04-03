import Shape from '../interfaces/Shape'
import Coor from '../interfaces/Coor'
import ShapeData from '../interfaces/ShapeData';
import SelectorBox from './SelectorBox';

class Default implements Shape {
    shapeData: ShapeData


    constructor(pro: any) {
        this.shapeData = pro

    }
    updateCanvas(ctx: any) {

    }
    isShapeSelected(coords: Coor) {
        return false
    }
    surroundWithBox(bool: boolean, ctx: any) {

        let data = this.shapeData;
        data.leftStart = data.leftStart + 3
        const box = new SelectorBox(data);
        box.updateCanvas(ctx);
        return box
    }
    isSideEdgeClicked(coords: Coor) {
        const data = this.shapeData
        return (
            Math.abs(((Math.max(data.top, data.topStart) - Math.min(data.top, data.topStart)) / 2) - coords.top) < 10 &&
            (Math.abs(Math.min(data.left, data.leftStart) - coords.left) < 10 || Math.abs(Math.max(data.left, data.leftStart) - coords.left) < 10)
        )
    }
    resize(moveLeft: number, moveRight: number) {

        return this.shapeData;
    }
    isShapeWithinSelector(startCoor: Coor, endCoor: Coor) {
        const data = this.shapeData;
        return Math.min(startCoor.left, endCoor.left) < Math.min(data.left, data.leftStart) &&
            Math.min(startCoor.top, endCoor.top) < Math.min(data.top, data.topStart) &&
            Math.max(startCoor.left, endCoor.left) > Math.max(data.left, data.leftStart) &&
            Math.max(startCoor.top, endCoor.top) > Math.max(data.top, data.topStart)
    }
}

export default Default