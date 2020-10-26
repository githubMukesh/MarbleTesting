import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, timeout, retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  public values: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  subscribeSource(source: Observable<any>){
     source.subscribe((value) => this.values.push(value),err => {});
  }

  multiplyByTen(source: Observable<any>){
    return source.pipe(map((value)=> value * 10));
  }

  makeACall(source: Observable<any>): Observable<any> {
    return source.pipe(
      catchError(err => {console.log(err); return of(err)})
    )
}

}
