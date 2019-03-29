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
}

export default Shape