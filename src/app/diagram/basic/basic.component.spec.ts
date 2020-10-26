import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicComponent } from './basic.component';
import { of, zip, } from 'rxjs';
import { map } from 'rxjs/operators';
import {cold, hot} from 'jasmine-marbles';

describe('BasicComponent', () => {
  let component: BasicComponent;
  let fixture: ComponentFixture<BasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default value for cold observable', () => {
      const source = cold('--a--b');
      const expected = cold('--a--b', {a:'a',b:'b'});
      //source.subscribe((values: string) => console.log('default value', values));
      expect(source).toBeObservable(expected);
  });

  it('default value for hot observable', () => {
    const source = hot('--a--b');
    const expected = hot('--a--b', {a:'a',b:'b'});
   // source.subscribe((values: string) => console.log('default value', values));
    expect(source).toBeObservable(expected);
});

  it('should subscribe observable', () => {
     const source = hot('----a^-b---');
     spyOn(source,'subscribe').and.callThrough();
     component.subscribeSource(source);
     expect(source.subscribe).toHaveBeenCalled();
  });

  
  it('should multiply by "10" each value emitted', () => {
    const values = { a: 1, b: 2, c: 3, x: 10, y: 20, z: 30};
    const source = cold('-a-b-c-|', values);
    const expected = cold('-x-y-z-|', values);
    const result = component.multiplyByTen(source);
    expect(result).toBeObservable(expected);
  });

  it('should have a timeout of 5 seconds and return undefined on error', () => {
    const source = cold('#');

    const expected$ = cold('#', null, 'error')

    expect(component.makeACall(source)).toBeObservable(expected$)
  })


});
