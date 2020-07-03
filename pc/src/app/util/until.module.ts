import { NgModule } from '@angular/core';
import {LimitInputDirective} from './input.directive';

@NgModule({
  declarations: [
      LimitInputDirective
  ],
  exports: [
      LimitInputDirective
  ]
})
export class UntilModule { }
