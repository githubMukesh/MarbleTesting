import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic/basic.component';



@NgModule({
  declarations: [BasicComponent],
  imports: [
    CommonModule,
  ],
  exports: [BasicComponent]
})
export class DiagramModule { }
