import { Component, OnInit } from '@angular/core';

import {iObject, foObject, foCollection, foNode } from './generics'

class lego extends foObject {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  test:foObject = new foObject();
  test1:lego = new lego();


}
