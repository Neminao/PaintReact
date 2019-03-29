import Shape from '../interfaces/Shape'
import Coor from '../interfaces/Coor'
import ShapeData from '../interfaces/ShapeData';
import SelectorBox from './SelectorBox';
class Text implements Shape {
    shapeData: ShapeData
    
    constructor(pro: any) {
        this.shapeData = pro
    }
    updateCanvas(ctx: any) {
        ctx.fillStyle = this.shapeData.color
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.font = "30px Arial"
        ctx.fillText(this.shapeData.text, this.shapeData.left, this.shapeData.top);
    }
    isShapeSelected(coords: Coor) {
        this.shapeData.leftStart = this.shapeData.left + this.shapeData.text.length * 17;
        this.shapeData.topStart = this.shapeData.top - 31;
        return Math.min(this.shapeData.left, this.shapeData.leftStart) <= coords.left
            && Math.max(this.shapeData.left, this.shapeData.leftStart) >= coords.left
            && Math.min(this.shapeData.top, this.shapeData.topStart) <= coords.top
            && Math.max(this.shapeData.top, this.shapeData.topStart) >= coords.top
      //  return Math.abs(this.shapeData.left - coords.left) < 10 && Math.abs(this.shapeData.top - coords.top) < 10 
    }
    surroundWithBox(bool: boolean, ctx: any){     
        
        let data = this.shapeData;
        
        const box= new SelectorBox(data);
     box.updateCanvas(ctx);
    return box
}  
isSideEdgeClicked(coords: Coor){
    const data = this.shapeData
    let b = 'none';
    if (
        Math.abs(((Math.max(data.top, data.topStart) - Math.min(data.top, data.topStart)) / 2) - coords.top) < 10 &&
        (Math.abs(Math.min(data.left, data.leftStart) - coords.left) < 10 || Math.abs(Math.max(data.left, data.leftStart) - coords.left) < 10)
    ) b = 'left';
    return b;
}
resize(moveLeft: number, moveTop: number, position: string){
    
    return this.shapeData;
}
}

export default Text