import { Component, OnInit } from '@angular/core';

import {iObject, foObject, foCollection, foNode } from './generics'

import {myObject, myNode, myList, myComponent } from './generics'

class brick extends myObject {
}

class lego extends myNode {
  description:string = "lego"
}

class wall extends lego {
  description:string = "The Wall Is Red"
}

class house extends lego {
  description:string = "The Wall Is Solid"
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  test = [
    new brick(),
    new myList<brick>(),
  ];

  /**
   *
   */
  constructor() {
    let obj = new house();
    this.test.push(obj);

    obj.addSubcomponent(new wall());
    obj.addSubcomponent(new wall());
    obj.addSubcomponent(new wall());

    // obj.applyToSubComponents( function(item) {
    //   item.description += '  HELL YA';
    // }, true);
  }

}
