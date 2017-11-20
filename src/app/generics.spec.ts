import { TestBed, async } from '@angular/core/testing';
import {foObject, foCollection, foNode } from './generics'

describe('./generics', () => {

  beforeEach(async(() => {

  }));

  it('should create foObject', async(() => {
    const obj =  new foObject();
    expect(obj).toBeTruthy();
  }));


});
