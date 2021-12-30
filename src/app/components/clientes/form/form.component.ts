import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from '../region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
    public titulo: string = 'Crear Cliente'
    public cliente: Clientes = new Clientes();
    public regiones: Region[] = [];
    public errors: string[] = [];

    constructor(
        private readonly _clienteServer: ClienteService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.cargarCliente();
        this._clienteServer.getRegiones().subscribe( regiones => this.regiones = regiones);
    }

    cargarCliente(): void {
        this.activatedRoute.params.subscribe(params => {
            let id = params['id'];
            if (id) {
                this._clienteServer.getSingle(id).subscribe( (cliente) => this.cliente = cliente);
            }
        })
    }

    create(): void {
        this._clienteServer.create(this.cliente)
            .subscribe( cliente => {
                this.router.navigate(["/clientes"]);
                Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success');
            }, err => {
                this.errors = err.error.errors as string[];
                console.error('Código del error desde el backend ' + err.status);
                console.error(err.error.errors);
            });
    }

    update(): void {
        this._clienteServer.update(this.cliente, this.cliente.id)
            .subscribe( cliente => {
                this.router.navigate(["/clientes"]);
                Swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success');
            }, err => {
                this.errors = err.error.errors as string[];
                console.error('Código del error desde el backend ' + err.status);
                console.error(err.error.errors);
            })
    }


    compararRegion(o1: Region, o2: Region): boolean {
        console.log(o1, o2)
        if (o1 === undefined && o2 === undefined) {
            return true;
        }
        console.log(o1, o2)
        const compareObjects = o1 === null || o2 === null || o1 === undefined || o2 === undefined;
        return compareObjects ? false : o1.id === o2.id;
    }

}
