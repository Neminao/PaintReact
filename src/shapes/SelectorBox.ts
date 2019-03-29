import Shape from '../interfaces/Shape'
import Coor from '../interfaces/Coor'
import ShapeData from '../interfaces/ShapeData';

class SelectorBox implements Shape {
    shapeData: ShapeData

    constructor(pro: any) {
        this.shapeData = pro
    }

    updateCanvas(ctx: any) {
        const data = this.shapeData
        const mint = Math.min(data.top, data.topStart);
        const maxt = Math.max(data.top, data.topStart);
        const minl = Math.min(data.left, data.leftStart);
        const maxl = Math.max(data.left, data.leftStart);
        ctx.strokeStyle = "#66ccff"
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(minl, mint);
        ctx.lineTo(minl, maxt);
        ctx.lineTo(maxl, maxt);
        ctx.lineTo(maxl, mint);
        ctx.lineTo(minl, mint);
        ctx.stroke();
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(minl - 1, mint - 1, 3, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(maxl - 1, mint - 1, 3, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(maxl - 1, maxt - 1, 3, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(minl - 1, maxt - 1, 3, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc((maxl - minl) / 2 + minl - 1, maxt - 1, 3, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc((maxl - minl) / 2 + minl - 1, mint - 1, 3, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(maxl - 1, (maxt - mint) / 2 + mint - 1, 3, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(minl - 1, (maxt - mint) / 2 + mint - 1, 3, 0, 2 * Math.PI);
        ctx.stroke();
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
    resize(moveLeft: number, moveTop: number, position: string) {

        return this.shapeData;
    }
}
export default SelectorBox