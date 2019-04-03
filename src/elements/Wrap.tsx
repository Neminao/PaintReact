import React from 'react'
import Button from './Button'
import Canvas from './Canvas'
import ShapeButton from './ShapeButton'
import Shape from '../interfaces/Shape'
import Slider from './Slider'
import colorArr from '../ColorData'
import Coor from "../interfaces/Coor"
import ShapeData from "../interfaces/ShapeData"
import MyState from "../interfaces/MyState"
import createShape from "../functions/createShape"
import shapeArr from "../ShapeData"

interface MyProps { }

class Wrap extends React.Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props);
        this.state = {
            baseColor: "Black",
            baseShape: "Line",
            startCoor: {
                left: 0,
                top: 0
            },
            range: 50,
            lineWidth: 2,
            clicked: false,
            text: "",
            selectedShape: -1,
            allColors: colorArr,
            allShapes: [],
            polyline: [],
            resizing: 'none',
            selectedShapesArr: []
        }
    }
    handleKeyDown = (e: any) => {
        if (e.keyCode == 46) {
            if (this.state.selectedShape != -1 && this.state.baseShape.includes("Move")) {
                this.deleteShape(this.state.selectedShape);
            }
            else if (this.state.baseShape.includes("MultiSelect") && this.state.selectedShapesArr != []) {
                for (let i = this.state.selectedShapesArr.length - 1; i >= 0; i--) {
                    this.deleteShape(this.state.selectedShapesArr[i]);
                    console.log(i)
                }
            }
        }
    }
    deleteShape = (index: number) => {
        let arr = this.state.allShapes;
        arr.splice(index, 1);
        this.setState({
            allShapes: arr,
            selectedShape: -1
        })
        this.redrawCanvas();
    }
    getClickedObject = (coords: any) => {
        var tempshape: any;
        this.state.allShapes.forEach(shape => {
            if (shape.isShapeSelected(coords)) {
                tempshape = shape;
            }
        })
        if (tempshape != undefined)
            return this.state.allShapes.indexOf(tempshape)
        return -1;
    }
    createShapeData = (coords: Coor): ShapeData => {
        return {
            shapeName: this.state.baseShape,
            leftStart: this.state.startCoor.left,
            topStart: this.state.startCoor.top,
            left: coords.left,
            top: coords.top,
            color: this.state.baseColor,
            lineWidth: this.state.lineWidth,
            range: this.state.range,
            text: this.state.text,
            polyline: this.state.polyline
        }
    }

    updateSelectedColor = (index: number) => {
        if (index >= 0) {
            const shapes = this.state.allShapes;
            let shape = shapes[index];
            shape.shapeData.color = this.state.baseColor;
            shapes[index] = shape;
            console.log(shape);
            this.setState({
                allShapes: shapes
            })
            this.redrawCanvas();
        }
    }
    resize(index: number, endCoor: Coor) {
        if (index >= 0) {
            const shapes = this.state.allShapes;
            let shape = shapes[index];
            const moveLeft = endCoor.left - this.state.startCoor.left;
            const moveTop = endCoor.top - this.state.startCoor.top;
            shape.resize(moveLeft, moveTop, this.state.resizing);
            shapes[index] = shape;
            this.setState({
                allShapes: shapes
            })
            this.redrawCanvas();
        }
    }
    updateSelectedPosition = (index: number, endCoor: Coor) => {
        if (index >= 0) {
            const shapes = this.state.allShapes;
            let shape = shapes[index];
            const moveLeft = endCoor.left - this.state.startCoor.left;
            const moveTop = endCoor.top - this.state.startCoor.top;
            if (shape.shapeData.shapeName == "Pen") {
                shape.shapeData.polyline.forEach(el => {
                    el.left += moveLeft;
                    el.top += moveTop;
                })
            }
            else {
                shape.shapeData.leftStart += moveLeft;
                shape.shapeData.left += moveLeft;
                shape.shapeData.topStart += moveTop;
                shape.shapeData.top += moveTop;
            }
            shapes[index] = shape;
            this.setState({
                allShapes: shapes
            })
            this.redrawCanvas();
        }
    }
    drawOnCanvas = (pro: ShapeData, ctx: any, clear: boolean) => {
        let shape: Shape | undefined = createShape(pro)
        if (clear) {
            ctx.clearRect(0, 0, 1800, 1000);
        }
        if (shape != undefined) {
            shape.updateCanvas(ctx)
        }
    }

    undo = () => {
        let temp = this.state.allShapes
        temp.pop()
        console.log(temp)
        this.setState({
            allShapes: temp
        })
        const canvas: any = document.getElementById('myCanvas')
        const ctx: any = canvas.getContext('2d');
        this.redrawCanvas()
    }

    redrawCanvas = () => {
        const canvas2: any = document.getElementById('myCanvas2')
        const ctx2: any = canvas2.getContext('2d');
        ctx2.clearRect(0, 0, 1800, 900);
        const canvas: any = document.getElementById('myCanvas')
        const ctx: any = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.state.allShapes.map(shape => {
            this.drawOnCanvas(shape.shapeData, ctx, false)
        })
    }
    onMouseDown = (e: any) => {
        const tempcanvas: any = document.getElementById('myCanvas2')
        const ctx2: any = tempcanvas.getContext('2d')
        ctx2.clearRect(0, 0, 1800, 1000);
        const coord = this.getCursorPosition(e);
        const clickedShape = this.getClickedObject(coord);
        this.setState({
            startCoor: coord,
            clicked: true
        })
        if (this.state.baseShape == 'FillColor') {
            this.updateSelectedColor(clickedShape)
        }
        else if (this.state.baseShape == 'Move') {
            let side = 'none';
            if (this.state.selectedShape != -1) {
                side = this.state.allShapes[this.state.selectedShape].isSideEdgeClicked(coord);
            }
            if (side == 'none') {
                this.setState({
                    selectedShape: clickedShape,
                    resizing: side
                })
            }
            else {
                this.setState({

                    resizing: side
                })
            }
        }
        else if (this.state.baseShape == 'Pen') {
            let lineArr = this.state.polyline;
            lineArr.push(coord)
            this.setState({
                startCoor: coord,
                polyline: lineArr
            })
        }
    }

    onMouseUp = (e: any) => {
        const tempcanvas: any = document.getElementById('myCanvas2')
        const canvas: any = document.getElementById('myCanvas')
        const ctx: any = canvas.getContext('2d')
        const ctx2: any = tempcanvas.getContext('2d')
        ctx2.clearRect(0, 0, 1800, 1000);
        const coord = this.getCursorPosition(e);
        const shapeData = this.createShapeData(coord)
        const shape = createShape(shapeData)
        console.log(shape)
        const s = this.state.baseShape
        let arr = this.state.allShapes
        if (!(s.includes('Move') || s.includes('FillColor') || s.includes('MultiSelect'))) {
            this.updateShapeArray(shape);
            ctx2.clearRect(0, 0, 1800, 1000);
        }
        else if (s.includes('MultiSelect') && arr != []) {
            ctx2.clearRect(0, 0, 1800, 1000);
            let indexArr = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].isShapeWithinSelector(this.state.startCoor, coord)) {
                    arr[i].surroundWithBox(true, ctx2);
                    indexArr.push(i);
                }
            }
            this.setState({
                selectedShapesArr: indexArr
            })
        }
        else {
            if (s.includes('Move') && this.state.selectedShape != -1)
                createShape(this.state.allShapes[this.state.selectedShape].shapeData).surroundWithBox(true, ctx2)
        }
        console.log(this.state.allShapes)
        this.drawOnCanvas(shapeData, ctx, false);
        this.setState({
            clicked: false,
            polyline: []

        })
    }
    getCursorPosition = (e: any): Coor => {
        const canvas: any = document.getElementById('myCanvas2')
        const { top, left } = canvas.getBoundingClientRect();
        return {
            "left": e.clientX - left,
            "top": e.clientY - top
        }
    }
    onMouseMove = (e: any) => {
        const coord = this.getCursorPosition(e);
        const shapeData: ShapeData = this.createShapeData(coord)

        if (this.state.clicked && this.state.baseShape == 'Pen') {
            const canvas: any = document.getElementById('myCanvas')
            const ctx = canvas.getContext('2d')
            shapeData.shapeName = 'Line'
            this.drawOnCanvas(shapeData, ctx, false);
            let lineArr = this.state.polyline

            lineArr.push(coord)
            this.setState({
                startCoor: coord,
                polyline: lineArr
            })
        }
        else if (this.state.baseShape == "Move") {
            var pom = false;
            var side = false;
            const canvas: any = document.getElementById('myCanvas2')
            const ctx = canvas.getContext('2d')
            let position = 'none'
            this.state.allShapes.forEach(shape => {
                if (shape != undefined) {
                    if (shape.isShapeSelected(coord)) {
                        pom = true;
                    }
                }
                if (this.state.selectedShape != -1) {
                    position = this.state.allShapes[this.state.selectedShape].isSideEdgeClicked(coord);
                    if (position != 'none') {
                        side = true;
                    }
                }
                if (side && this.state.selectedShape != -1) {
                    switch (position) {
                        case 'left': canvas.style.cursor = 'ew-resize'; break;
                        case 'right': canvas.style.cursor = 'ew-resize'; break
                        case 'top': canvas.style.cursor = 'ns-resize'; break
                        case 'bot': canvas.style.cursor = 'ns-resize'; break
                        case 'tr': canvas.style.cursor = 'ne-resize'; break
                        case 'tl': canvas.style.cursor = 'nw-resize'; break
                        case 'br': canvas.style.cursor = 'nw-resize'; break
                        case 'bl': canvas.style.cursor = 'ne-resize'; break
                    }

                }
                else if (pom || side) {
                    canvas.style.cursor = 'move';
                }
                else canvas.style.cursor = 'auto';
            })
            if (this.state.clicked) {

                if (this.state.resizing != 'none') {
                    this.resize(this.state.selectedShape, coord);
                }
                else {
                    this.updateSelectedPosition(this.state.selectedShape, coord)
                }
                this.setState({
                    startCoor: coord
                })
                if (this.state.selectedShape != -1)
                    createShape(this.state.allShapes[this.state.selectedShape].shapeData).surroundWithBox(true, ctx)

            }

        }
        else if (this.state.baseShape.includes('MultiSelect')) {
            const canvas: any = document.getElementById('myCanvas2')
            const ctx = canvas.getContext('2d')
            shapeData.shapeName = 'SelectorBox';
            if (this.state.clicked) {
                this.drawOnCanvas(shapeData, ctx, true)
            }
        }
        else if (this.state.clicked) {
            const canvas: any = document.getElementById('myCanvas2');
            const ctx = canvas.getContext('2d');
            this.drawOnCanvas(shapeData, ctx, true);

            // shapeData.shapeName = 'SelectorBox';
            // this.drawOnCanvas(shapeData, ctx, true)
        }
    }
    onTextChange = (e: any) => {
        this.setState({
            text: e.target.value
        })
    }

    updateShapeArray = (shape: Shape) => {

        let arr = this.state.allShapes;

        if (arr.length > 0 && arr[arr.length - 1].shapeData.shapeName.includes("SelectorBox")) {
            arr.pop()
        }
        this.setState({
            allShapes: arr.concat(shape)
        })

        console.log(this.state.allShapes)
    }
    setColor = (e: any) => {
        const { value } = e.target
        this.setState({
            baseColor: value
        })
    }

    mySliderChange = (e: any) => {
        let { value, max } = e.target;
        max == 1000 ?
            this.setState({
                range: value
            }) :
            this.setState({
                lineWidth: value
            });
    }
    setShape = (e: any) => {
        const { value } = e.target;
        this.setState({
            baseShape: value,
            selectedShape: -1
        });
    }
    render() {
        const colorButtons = this.state.allColors.map((c) => {
            return (
                <Button setColor={this.setColor} myColor={c} />
            )
        })

        const shapeButtons = shapeArr.map((s) => {
            return (
                <ShapeButton setShape={this.setShape} myShape={s} />
            )
        })
        return (
            <div>
                <div>
                    <Canvas
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        onMouseMove={this.onMouseMove}

                        id={'myCanvas'}
                        zindex={2}

                    />
                    <Canvas
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        onMouseMove={this.onMouseMove}
                        onKeyDown={this.handleKeyDown}
                        id={'myCanvas2'}
                        zindex={200}
                    />
                </div>
                <div className="colorBoxStyle">
                    {colorButtons}
                </div>
                <br></br>
                <div className="shapeBoxStyle">
                    <div className="tools">
                        {shapeButtons}
                    </div>
                    <div>
                        Select shape size:
                    <Slider mySliderChange={this.mySliderChange} min={1} max={1000} />
                        <hr></hr>
                        Select line size:
                    <Slider mySliderChange={this.mySliderChange} min={1} max={10} />
                        <hr></hr>
                        Enter text:
                    <input type='text' style={{ width: '162px' }} onChange={this.onTextChange} />
                        <button onClick={this.undo}>Undo</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Wrap
