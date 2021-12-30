import { Component, OnInit } from '@angular/core';
import { Clientes } from './clientes';
import { ClienteService } from './cliente.service';
import { tap} from 'rxjs/operators'
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

    clientes: Clientes[];
    paginador: any;
    clienteSeleccionado: Clientes;
    urlFoto: string = environment.apiRest

    constructor(
        private clienteService: ClienteService,
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService
    ) { }


    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe( params => {
            let page: number = +params.get('page');

            if (!page) { page = 0 };

            this.clienteService.getClientesPage(page)
                .pipe( tap(response => {
                    console.log(ClientesComponent.name + ': tap 3');
                    (response.content as Clientes[]).forEach(cliente => console.log(cliente.nombre));
                }))
                .subscribe( response => {
                    this.clientes = response.content as Clientes[];
                    this.paginador = response;
                });
        });
        this.modalService.notificarUpload.subscribe(cliente => {
            this.clientes = this.clientes.map(clienteOriginal => {
                if (clienteOriginal.id == cliente.id) {
                    clienteOriginal.foto = cliente.foto;
                }
                return clienteOriginal;
            })
        })
    }

    delete(cliente: Clientes): void {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Está seguro?',
            text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.clienteService.delete(cliente.id).subscribe(resp => {
                    this.clientes = this.clientes.filter(cli => cli !== cliente);
                    swalWithBootstrapButtons.fire(
                        'Cliente Eliminado!',
                        `Cliente ${cliente.nombre} eliminado con éxito.`,
                        'success'
                    )
                })
            }
        })
    }

    abrirModal( cliente: Clientes) {
        this.clienteSeleccionado = cliente;
        this.modalService.abrirModal();
    }

}
