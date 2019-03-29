
import Shape from '../interfaces/Shape'
import Coor from '../interfaces/Coor'
import ShapeData from '../interfaces/ShapeData';
import SelectorBox from './SelectorBox';

class RectFilled implements Shape {
    shapeData: ShapeData
    constructor(pro: any) {
        this.shapeData = pro
    }
    updateCanvas(ctx: any) {
        ctx.fillStyle = this.shapeData.color
        ctx.setLineDash([]);
        ctx.fillRect(this.shapeData.left - this.shapeData.range / 2, this.shapeData.top - this.shapeData.range / 2, this.shapeData.range, this.shapeData.range)
    }
    isShapeSelected(coords: Coor) {
        return (this.shapeData.left - this.shapeData.range / 2) <= coords.left
            && (this.shapeData.left + this.shapeData.range / 2) >= coords.left
            && (this.shapeData.top - this.shapeData.range / 2) <= coords.top
            && (this.shapeData.top + this.shapeData.range / 2) >= coords.top
    }
    surroundWithBox(bool: boolean, ctx: any) {

        let data = Object.assign({}, this.shapeData);
        console.log(data)
        ctx.clearRect(0, 0, 1800, 800);
        data.lineWidth = 2;
        data.shapeName = "SelectorBox"
        data.leftStart = data.left - 1 - data.range / 2;
        data.topStart = data.top - 1 - data.range / 2;
        data.left = data.left + data.range / 2 + 1;
        data.top = data.top + data.range / 2 + 1;
        const box = new SelectorBox(data);
        box.updateCanvas(ctx);
        return box;
    }
    isSideEdgeClicked(coords: Coor) {
        const data = this.shapeData
        let b = 'none';
        if (Math.abs(data.top - coords.top) < 10) {
            if (Math.abs(data.left - data.range / 2 - coords.left) < 10) {
                b = 'left';
            }
            else if (Math.abs(data.left + data.range / 2 - coords.left) < 10) {
                b = 'right';
            }
        }
        else if (Math.abs(data.left - coords.left) < 10) {
            if (Math.abs(data.top - data.range / 2 - coords.top) < 10) {
                b = 'top';
            }
            else if (Math.abs(data.top + data.range / 2 - coords.top) < 10) {
                b = 'bot';
            }
        }
        else if (Math.abs(data.left - data.range / 2 - coords.left) < 10) {
            if (Math.abs(data.top - data.range / 2 - coords.top) < 10) {
                b = 'tl';
            }
            else if (Math.abs(data.top + data.range / 2 - coords.top) < 10) {
                b = 'bl';
            }
        }
        else if (Math.abs(data.left + data.range / 2 - coords.left) < 10) {
            if (Math.abs(data.top - data.range / 2 - coords.top) < 10) {
                b = 'tr';
            }
            else if (Math.abs(data.top + data.range / 2 - coords.top) < 10) {
                b = 'br';
            }
        }
        return b;
    }
    resize(moveLeft: number, moveTop: number, position: string) {

        if (position == 'right' || position == 'tr') {
            this.shapeData.range = Math.abs(this.shapeData.range + moveLeft);
        }
        else if (position == 'left') {
            this.shapeData.range = Math.abs(this.shapeData.range - moveLeft);
        }
        else if (position == 'bot' || position == 'br') {
            this.shapeData.range = Math.abs(this.shapeData.range + moveTop);
        }
        else if (position == 'top') {
            this.shapeData.range = Math.abs(this.shapeData.range - moveTop);
        }
        else if (position != 'none') {
            this.shapeData.range = Math.abs(this.shapeData.range - moveLeft);
        }
        return this.shapeData;
    }
}
export default RectFilled