import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicComponent } from './basic.component';
import { of, zip, } from 'rxjs';
import { map } from 'rxjs/operators';
import {cold, hot} from 'jasmine-marbles';
import { throwError } from 'rxjs'

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

  describe('Marble testing basics', () => {
    it('should understand marble diagram', () => {
      const source = cold('--');
      const expected = cold('--');
  
      expect(source).toBeObservable(expected);
    });
  
    describe('cold observable', () => {
      it('should support basic string values', () => {
        const source = cold('-a-|');
        const expected = cold('-a-|');
  
        expect(source).toBeObservable(expected);
      });
  
      it('should support basic values provided as params (number)', () => {
        const source = cold('-a-|', { a: 1 });
        const expected = cold('-a-|', { a: 1 });
  
        expect(source).toBeObservable(expected);
      });
  
      it('should support basic values provided as params (object)', () => {
        const source = cold('-a-|', { a: { key: 'value' } });
        const expected = cold('-a-|', { a: { key: 'value' } });
  
        expect(source).toBeObservable(expected);
      });
  
      it('should support basic values provided as params (object)', () => {
        const source = cold('-a-|', { a: { key: 'value' } });
        const expected = cold('-a-|', { a: { key: 'value' } });
  
        expect(source).toBeObservable(expected);
      });
  
      it("should support basic errors", () => {
        const source = cold('--#');
        const expected = cold('--#');
  
        expect(source).toBeObservable(expected);
      });
  
      it("should support custom errors", () => {
        const source = cold('--#', null, new Error('Oops!'));
        const expected = cold('--#', null, new Error('Oops!'));
  
        expect(source).toBeObservable(expected);
      });
  
      it("should support custom Observable error", () => {
        const source = throwError(new Error('Oops!'));
        const expected = cold('#', null, new Error('Oops!'));
  
        expect(source).toBeObservable(expected);
      });
  
      it("should support multiple emission in the same time frame", () => {
        const source = of(1, 2, 3);
        const expected = cold('(abc|)', { a: 1, b: 2, c: 3 });
  
        expect(source).toBeObservable(expected);
      });
    });
  
    describe('hot observable', () => {
      it('should support basic hot observable', () => {
        const source = hot('-^a-|', { a: 5 });
        const expected = cold('-a-|', { a: 5 });
  
        expect(source).toBeObservable(expected);
      });
  
      // it('should support testing subscriptions', () => {
      //   const source = hot('-a-^b---c-|');
      //   const subscription =  '^------!';
      //   const expected = cold('-b---c-|');
  
      //   expect(source).toBeObservable(expected);
      //   expect(source).toHaveSubscriptions(subscription);
      // });
    });
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
});
