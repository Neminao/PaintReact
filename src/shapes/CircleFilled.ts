import Shape from '../interfaces/Shape'
import Coor from '../interfaces/Coor'
import ShapeData from '../interfaces/ShapeData';
import SelectorBox from './SelectorBox';

class CircleFilled implements Shape {
    shapeData: ShapeData
    constructor(pro: ShapeData) {
        this.shapeData = pro
    }
    updateCanvas(ctx: any) {
        ctx.fillStyle = this.shapeData.color
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(this.shapeData.left, this.shapeData.top, this.shapeData.range / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    isShapeSelected(coords: Coor) {
        return Math.pow(this.shapeData.left - coords.left, 2) + Math.pow(this.shapeData.top - coords.top, 2) <= Math.pow(this.shapeData.range / 2, 2)
    } 
  /*  isShapeSelected(coords: Coor) {
        return (this.shapeData.left - this.shapeData.range / 2) <= coords.left
            && (this.shapeData.left + this.shapeData.range / 2) >= coords.left
            && (this.shapeData.top - this.shapeData.range / 2) <= coords.top
            && (this.shapeData.top + this.shapeData.range / 2) >= coords.top
    } */
    surroundWithBox(bool: boolean, ctx: any) {

        let data = Object.assign({}, this.shapeData);
       // console.log(data)
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

        if (position == 'left' || position == 'right') {
            this.shapeData.range = Math.abs(this.shapeData.range + moveLeft);
        }
        else if (position == 'top' || position == 'bot') {
            this.shapeData.range = Math.abs(this.shapeData.range + moveTop);
        }
        else if (position != 'none'){
            this.shapeData.range = Math.abs(this.shapeData.range +  moveLeft);
        }
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

export default CircleFilled