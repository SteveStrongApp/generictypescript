import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

import { iObject, foObject, foCollection, foNode } from './generics'

import { myObject, myNode, myList, myComponent } from './generics'

function doAnimate(mySelf) {
  function animate() {
    requestAnimationFrame(animate);
    mySelf.render(mySelf.context);
  }
  animate();
}

export class Sceen2D {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  render: (context: CanvasRenderingContext2D) => void;

  go() {
    doAnimate(this);
  }

  setRoot(nativeElement: HTMLCanvasElement, width: number, height: number): HTMLCanvasElement {
    this.canvas = nativeElement;
    this.context = this.canvas.getContext("2d");

    // set the width and height
    this.canvas.width = width;
    this.canvas.height = height;

    // set some default properties about the line
    this.context.lineWidth = 3;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#000';
    return nativeElement;
  }

}

class brick extends myObject {
}

interface xxx<T extends myObject> {
  things: myList<T>;
}

class legoCore extends myNode {
  description: string = "legoCore";

  _subcomponents: myList<legoCore> = new myList<legoCore>();

  public render = (ctx: CanvasRenderingContext2D, deep: boolean = true): void => {
    this.draw(ctx);
    deep && this._subcomponents.applyToAll(part => {
      part.render(ctx);
    });
  }

  public drawHover = (ctx: CanvasRenderingContext2D): void => { }

  public drawSelected = (ctx: CanvasRenderingContext2D): void => { }

  public draw = (ctx: CanvasRenderingContext2D): void => { }
}

class lego extends legoCore {
  description: string = "lego"

  public drawHover = (ctx: CanvasRenderingContext2D): void => { }

  public drawSelected = (ctx: CanvasRenderingContext2D): void => { }

  public draw = (ctx: CanvasRenderingContext2D): void => {

    ctx.save();
    ctx.fillStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.globalAlpha = .8;
    ctx.fillRect(30, 60, 100, 150);

    //http://junerockwell.com/end-of-line-or-line-break-in-html5-canvas/
    let fontsize = 20;
    ctx.font = `${fontsize}px Calibri`;
    ctx.fillStyle = 'blue';

    // let text = `x1=${x} y1=${y}|x2=${x+width} y2=${y+height}|`;
    // let array = text.split('|');
    // let dx = x + 10;
    // let dy = y + 20;
    // for (var i = 0; i < array.length; i++) {
    //     ctx.fillText(array[i], dx, dy);
    //     dy += (fontsize + 4);
    //  }

    ctx.restore();
  }
}


class door extends lego {
  description: string = "The Door Is Red";

  public draw = (ctx: CanvasRenderingContext2D): void => {

    ctx.save();
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;
    ctx.globalAlpha = .8;
    ctx.fillRect(130, 200, 100, 250);

    ctx.restore();
  }

}


class wall extends lego {
  description: string = "The Wall Is Red";

  _subcomponents:myList<door> = new myList<door>();

  public draw = (ctx: CanvasRenderingContext2D): void => {

    ctx.save();
    ctx.fillStyle = 'green';
    ctx.lineWidth = 1;
    ctx.globalAlpha = .8;
    ctx.fillRect(130, 60, 100, 150);

    ctx.restore();
  }

}

class house extends lego {
  description: string = "The Wall Is Solid"
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') public canvasRef: ElementRef;
  @Input() public width = 800;
  @Input() public height = 400;
  screen2D: Sceen2D = new Sceen2D();

  test = [
    new brick(),
    new myList<brick>(),
  ];

  myHouse: house = new house();


  constructor() {
    let obj = this.myHouse
    this.test.push(obj);

    let wa = new wall();
    wa.addSubcomponent(new door())

    obj.addSubcomponent(wa);
    obj.addSubcomponent(new wall());
    obj.addSubcomponent(new wall());

  }

  ngOnInit() {
  }

  public ngAfterViewInit() {

    let canvas = this.screen2D.setRoot(this.canvasRef.nativeElement, this.width, this.height);
    // we'll implement this method to start capturing mouse events

    this.screen2D.render = (context: CanvasRenderingContext2D) => {
      context.fillStyle = "yellow";
      context.fillRect(0, 0, this.width, this.height);

      this.myHouse.render(context);

      // for (var i: number = 0; i < this.shapelist.length; i++) {
      //   let shape: iShape = this.shapelist[i];
      //   shape.draw(context);
      // }
    }

    this.screen2D.go();

  }

}
