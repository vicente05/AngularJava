import { NgModule } from '@angular/core';
import { InputNullVacioDirective } from './helpers/input-null-vacio.directive';
import { EmptyNullValuePipe } from './pipes/empty-null-value.pipe';


const components = [ InputNullVacioDirective, EmptyNullValuePipe];

@NgModule({
    declarations: components,
    exports: components
})
export class CommonModule { }
