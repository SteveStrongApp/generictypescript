import { Component, OnInit } from '@angular/core';

import {iObject, foObject, foCollection, foNode } from './generics'

import {myObject, myNode, myList, myComponent } from './generics'

class brick extends myObject {
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  test = [
    new brick(),
    new myList<brick>(5);
  ];

}
