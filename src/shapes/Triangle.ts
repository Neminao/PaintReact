
import Shape from '../interfaces/Shape'
import Coor from '../interfaces/Coor'
import ShapeData from '../interfaces/ShapeData';
import SelectorBox from './SelectorBox';

class RectCustom implements Shape {
    shapeData: ShapeData

    constructor(pro: any) {
        this.shapeData = pro
    }
    updateCanvas(ctx: any) {
        ctx.strokeStyle = this.shapeData.color
        ctx.lineWidth = this.shapeData.lineWidth
        ctx.beginPath()
        /*  ctx.setLineDash([]);
          ctx.rect(this.shapeData.leftStart, this.shapeData.topStart, this.shapeData.left - this.shapeData.leftStart, this.shapeData.top -this.shapeData.topStart)*/
        ctx.moveTo(this.shapeData.leftStart, this.shapeData.topStart);
        ctx.lineTo(this.shapeData.leftStart, this.shapeData.top);
        ctx.lineTo(this.shapeData.left, this.shapeData.top);
        //ctx.lineTo(this.shapeData.left, this.shapeData.top);
        ctx.lineTo(this.shapeData.leftStart, this.shapeData.topStart);

        ctx.stroke();
    }
    isShapeSelected(coords: Coor) {
        return Math.min(this.shapeData.left, this.shapeData.leftStart) <= coords.left
            && Math.max(this.shapeData.left, this.shapeData.leftStart) >= coords.left
            && Math.min(this.shapeData.top, this.shapeData.topStart) <= coords.top
            && Math.max(this.shapeData.top, this.shapeData.topStart) >= coords.top
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
    resize(moveLeft: number, moveTop: number){
        
        return this.shapeData;
    }
}
export default RectCustom