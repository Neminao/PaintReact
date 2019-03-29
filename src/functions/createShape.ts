import ShapeData from "../interfaces/ShapeData"
import Shape from "../interfaces/Shape"
import Rect from '../shapes/Rect'
import Circle from '../shapes/Circle'
import RectFilled from '../shapes/RectFilled'
import RectCustom from '../shapes/RectCustom'
import RectCustomFilled from '../shapes/RectCustomFilled'
import Line from '../shapes/Line'
import Text from '../shapes/Text'
import Polyline from "../shapes/Polyline";
import SelectorBox from "../shapes/SelectorBox";


interface S {
    [key: string]: any
}
function createShape(shapeData: ShapeData): Shape {
    if (shapeData.shapeName == 'Pen') {
        if (shapeData.polyline != undefined)
            return new Polyline(shapeData)

    }
    const shapeArr: S =
    {
        'Circle': new Circle(shapeData),
        'Square': new Rect(shapeData),
        'Line': new Line(shapeData),
        'CircleFilled': new Circle(shapeData),
        'FilledSquare': new RectFilled(shapeData),
        'CustomRect': new RectCustom(shapeData),
        'FilledCustomRect': new RectCustomFilled(shapeData),
        'Text': new Text(shapeData),
        'Pen': new Line(shapeData),
        'SelectorBox': new SelectorBox(shapeData)

    }

    return shapeArr[shapeData.shapeName]
}

export default createShape