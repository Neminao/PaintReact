import Coor from '../interfaces/Coor'
import Shape from '../interfaces/Shape';
import ShapeData from '../interfaces/ShapeData';
import SelectorBox from './SelectorBox';

class Polyline implements Shape {

    shapeData: ShapeData
    allCoords: Coor[]
    minLeft: number;
    minTop: number;
    maxLeft: number;
    maxTop: number;
    constructor(shapeData: ShapeData) {
        this.shapeData = shapeData
        this.allCoords = this.shapeData.polyline;
        this.minLeft = this.allCoords[0].left;
        this.minTop = this.allCoords[0].top;
        this.maxLeft = this.allCoords[0].left;
        this.maxTop = this.allCoords[0].top;
    }
    updateCanvas(ctx: any) {
        ctx.strokeStyle = this.shapeData.color;
        ctx.lineWidth = this.shapeData.lineWidth
        ctx.beginPath()
        ctx.setLineDash([]);
        ctx.lineJoin = 'round';
        ctx.moveTo(this.allCoords[0].left, this.allCoords[0].top);
        for (var i = 0; i < this.allCoords.length; i++) {
            ctx.lineTo(this.allCoords[i].left, this.allCoords[i].top);
        }
        ctx.stroke();
    }
    isShapeSelected(coords: Coor) {
        let isSelected = false;

        for (var i = 0; i < this.allCoords.length - 1; i++) {
            if (
                Math.min(this.allCoords[i + 1].left, this.allCoords[i].left) <= coords.left
                && Math.max(this.allCoords[i + 1].left, this.allCoords[i].left) >= coords.left
                && Math.min(this.allCoords[i + 1].top, this.allCoords[i].top) <= coords.top
                && Math.max(this.allCoords[i + 1].top, this.allCoords[i].top) >= coords.top
                && Math.floor(((this.allCoords[i + 1].left - this.allCoords[i].left) * (coords.top - this.allCoords[i].top)) / (10000 * this.shapeData.range))
                == Math.floor(((this.allCoords[i + 1].top - this.allCoords[i].top) * (coords.left - this.allCoords[i].left)) / (10000 * this.shapeData.range))
            )
                isSelected = true
        }
        return isSelected;
    }
    surroundWithBox(bool: boolean, ctx: any) {
        for (var i = 0; i < this.allCoords.length; i++) {
            if (this.allCoords[i].left < this.minLeft) { this.minLeft = this.allCoords[i].left; }
            if (this.allCoords[i].left > this.maxLeft) { this.maxLeft = this.allCoords[i].left; }
            if (this.allCoords[i].top < this.minTop) { this.minTop = this.allCoords[i].top; }
            if (this.allCoords[i].top > this.maxTop) { this.maxTop = this.allCoords[i].top; }
        }
        let data = this.shapeData;
        data.leftStart = this.minLeft;
        data.topStart = this.minTop;
        data.left = this.maxLeft;
        data.top = this.maxTop;
        const box = new SelectorBox(data);
        box.updateCanvas(ctx);
        return box
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
        let minLeft = this.allCoords[0].left;
        let maxLeft = this.allCoords[0].left;
        let minTop = this.allCoords[0].top;
        let maxTop = this.allCoords[0].top;
        for (var i = 0; i < this.allCoords.length; i++) {
            if (this.allCoords[i].left < minLeft) { minLeft = this.allCoords[i].left; }
            if (this.allCoords[i].left > maxLeft) { maxLeft = this.allCoords[i].left; }
            if (this.allCoords[i].top < minTop) { minTop = this.allCoords[i].top; }
            if (this.allCoords[i].top > maxTop) { maxTop = this.allCoords[i].top; }
        }
        this.minLeft = minLeft;
        this.minTop = minTop;
        this.maxLeft = maxLeft;
        this.maxTop = maxTop;
        switch (position) {
            case 'left': this.changeMaxLeftSize(moveLeft); break;
            case 'right': this.changeMinLeftSize(moveLeft); break;
            case 'top': this.changeMaxTopSize(moveTop); break;
            case 'bot': this.changeMinTopSize(moveTop); break;
            case 'tl': {
                this.changeMaxLeftSize(moveLeft);
                this.changeMaxTopSize(moveTop);
            }; break;
            case 'tr': {
                this.changeMinLeftSize(moveLeft);
                this.changeMaxTopSize(moveTop);
            }; break;
            case 'bl': {
                this.changeMaxLeftSize(moveLeft);
                this.changeMinTopSize(moveTop);
            }; break;
            case 'br': {
                this.changeMinLeftSize(moveLeft);
                this.changeMinTopSize(moveTop);
            }; break;
        }



        return this.shapeData;
    }
    
    changeMinLeftSize(moveLeft: number) {
        const k = (this.shapeData.left + moveLeft - this.shapeData.leftStart) / (this.shapeData.left - this.shapeData.leftStart)
        //console.log(k)
        for (var i = 0; i < this.allCoords.length; i++) {
            if (k != Infinity && this.allCoords[i].left != this.minLeft) {
                this.allCoords[i].left = (this.allCoords[i].left - this.minLeft) * k + this.minLeft;
            }
        }
        this.shapeData.left = this.maxLeft * k;
        this.shapeData.leftStart = this.minLeft;
    }
    changeMaxLeftSize(moveLeft: number) {
        const k = (this.shapeData.left + moveLeft - this.shapeData.leftStart) / (this.shapeData.left - this.shapeData.leftStart)
        //console.log(k)
        for (var i = 0; i < this.allCoords.length; i++) {
            if (k != Infinity && this.allCoords[i].left != this.maxLeft) {
                this.allCoords[i].left = this.maxLeft - (this.maxLeft - this.allCoords[i].left) / k;
            }
        }
        this.shapeData.leftStart = this.minLeft * k;
        this.shapeData.left = this.maxLeft;
    }
    changeMaxTopSize(moveTop: number) {
        const k = (this.shapeData.top + moveTop - this.shapeData.topStart) / (this.shapeData.top - this.shapeData.topStart)
        // console.log(k)
        for (var i = 0; i < this.allCoords.length; i++) {
            if (k != Infinity && this.allCoords[i].top != this.maxTop) {
                this.allCoords[i].top = this.maxTop - (this.maxTop - this.allCoords[i].top) / k;
            }
        }
    }
    changeMinTopSize(moveTop: number) {
        const k = (this.shapeData.top + moveTop - this.shapeData.topStart) / (this.shapeData.top - this.shapeData.topStart)
        // console.log(k)
        for (var i = 0; i < this.allCoords.length; i++) {
            if (k != Infinity && this.allCoords[i].top != this.minTop) {
                this.allCoords[i].top = (this.allCoords[i].top - this.minTop) * k + this.minTop;
            }
        }
    }
}

export default Polyline