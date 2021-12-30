import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { FormComponent } from './components/clientes/form/form.component';
import { DetalleComponent } from './components/clientes/detalle/detalle.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full'
    },
    {
        path: 'clientes',
        component: ClientesComponent
    },
    {
        path: 'clientes/page/:page',
        component: ClientesComponent
    },
    {
        path: 'directivas',
        component: DirectivaComponent
    },
    {
        path: 'clientes/form',
        component: FormComponent
    },
    {
        path: 'clientes/form/:id',
        component: FormComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
