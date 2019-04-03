import Coor from './Coor'
import ShapeData from './ShapeData';
import SelectorBox from '../shapes/SelectorBox';

interface Shape {
    updateCanvas(ctx: any): void;
    isShapeSelected(coords: Coor): boolean;
    shapeData: ShapeData;
    surroundWithBox(bool: boolean, ctx: any): SelectorBox;
    isSideEdgeClicked(coords: Coor): any;
    resize(left: number, right: number, position: string): ShapeData;
    isShapeWithinSelector(startCoor: Coor, endCoor: Coor): boolean;
}

export default Shape