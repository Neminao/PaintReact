
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
        ctx.setLineDash([]);
        //ctx.rect(this.shapeData.leftStart, this.shapeData.topStart, this.shapeData.left - this.shapeData.leftStart, this.shapeData.top -this.shapeData.topStart)*/
        ctx.moveTo(this.shapeData.leftStart, this.shapeData.topStart);
        ctx.lineTo(this.shapeData.leftStart, this.shapeData.top);
        ctx.lineTo(this.shapeData.left, this.shapeData.top);
        ctx.lineTo(this.shapeData.left, this.shapeData.topStart);
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

        let data = Object.assign({}, this.shapeData);
        console.log(data)
        ctx.clearRect(0, 0, 1800, 800);
        data.lineWidth = 2;
        data.shapeName = "SelectorBox"
        const box = new SelectorBox(data);
        box.updateCanvas(ctx);
        return box;
    }
    isSideEdgeClicked(coords: Coor) {
        const data = this.shapeData;
        const mint = Math.min(data.top, data.topStart);
        const maxt = Math.max(data.top, data.topStart);
        const minl = Math.min(data.left, data.leftStart);
        const maxl = Math.max(data.left, data.leftStart);
        let b = 'none';

        if (Math.abs(((maxt - mint) / 2 + mint) - coords.top) < 10) {
            if (Math.abs(minl - coords.left) < 10) {
                b = 'left';
            }
            else if (Math.abs(maxl - coords.left) < 10) {
                b = 'right';
            }
        }
        else if (Math.abs(((maxl - minl) / 2 + minl) - coords.left) < 10) {
            if (Math.abs(mint - coords.top) < 10) {
                b = 'top';
            }
            else if (Math.abs(maxt - coords.top) < 10) {
                b = 'bot';
            }
        }
        else if (Math.abs(minl - coords.left) < 10) {
            if (Math.abs(mint - coords.top) < 10) {
                b = 'tl';
            }
            else if (Math.abs(maxt - coords.top) < 10) {
                b = 'bl';
            }
        }
        else if (Math.abs(maxl - coords.left) < 10) {
            if (Math.abs(mint - coords.top) < 10) {
                b = 'tr';
            }
            else if (Math.abs(maxt - coords.top) < 10) {
                b = 'br';
            }
        }
        return b;
    }
    resize(moveLeft: number, moveTop: number, position: string) {
        switch (position) {
            case 'left': this.changeMinLeftSize(moveLeft); break;
            case 'right': this.changeMaxLeftSize(moveLeft); break;
            case 'top': this.changeMinTopSize(moveTop); break;
            case 'bot': this.changeMaxTopSize(moveTop); break;
            case 'tl': {
                this.changeMinLeftSize(moveLeft);
                this.changeMinTopSize(moveTop);
            }; break
            case 'tr': {
                this.changeMaxLeftSize(moveLeft);
                this.changeMinTopSize(moveTop);
            }; break
            case 'bl': {
                this.changeMinLeftSize(moveLeft);
                this.changeMaxTopSize(moveTop);
            }; break
            case 'br': {
                this.changeMaxLeftSize(moveLeft);
                this.changeMaxTopSize(moveTop);
            }; break
        }

        return this.shapeData;
    }
    changeMinLeftSize(moveLeft: number) {
        if (this.shapeData.leftStart <= this.shapeData.left) {
            this.shapeData.leftStart = Math.abs(this.shapeData.leftStart + moveLeft);
        }
        else this.shapeData.left = Math.abs(this.shapeData.left + moveLeft);
    }
    changeMaxLeftSize(moveLeft: number) {
        if (this.shapeData.leftStart >= this.shapeData.left) {
            this.shapeData.leftStart = Math.abs(this.shapeData.leftStart + moveLeft);
        }
        else this.shapeData.left = Math.abs(this.shapeData.left + moveLeft);
    }
    changeMaxTopSize(moveTop: number) {
        if (this.shapeData.topStart >= this.shapeData.top) {
            this.shapeData.topStart = Math.abs(this.shapeData.topStart + moveTop);
        }
        else this.shapeData.top = Math.abs(this.shapeData.top + moveTop);
    }
    changeMinTopSize(moveTop: number) {
        if (this.shapeData.topStart <= this.shapeData.top) {
            this.shapeData.topStart = Math.abs(this.shapeData.topStart + moveTop);
        }
        else this.shapeData.top = Math.abs(this.shapeData.top + moveTop);
    }
}
export default RectCustom