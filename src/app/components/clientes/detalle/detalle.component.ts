import { Component, Input, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

    @Input() cliente: Clientes;

    titulo: string = "detalle del cliente";
    urlFoto: string = environment.apiRest
    private fotoSeleccionada: File;
    public progreso: number = 0;

    constructor(
        private clienteService: ClienteService,
        private modalService: ModalService,
        private authService: AuthService
    ) { }

    ngOnInit(): void { }

    //#region obtenerPropiedades

    get disabledBtn(): boolean {
        return !this.fotoSeleccionada;
    }

    get modalServiceProps(): boolean {
        return this.modalService.modal;
    }

    get authServiceGetter(): AuthService {
        return this.authService;
    }

    //#endregion obtenerPropiedades

    //#region funcionesPrincipales

    seleccionarFoto( event: any ) {
        this.fotoSeleccionada = (event.target as HTMLInputElement).files[0];
        this.progreso = 0;
        if (this.fotoSeleccionada.type.indexOf('image')) {
            Swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
            this.fotoSeleccionada = null;
        }
    }

    subirFoto() {

        if (!this.fotoSeleccionada) {
            Swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
        } else {
            this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
            .subscribe( (event: HttpEvent<any>) => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.progreso = Math.round((event.loaded/event.total)*100);
                } else if (event.type === HttpEventType.Response) {
                    let response: any = event.body;
                    this.cliente = response.cliente as Clientes;
                    this.modalService.notificarUpload.emit(this.cliente);
                    Swal.fire("La foto se ha subido completamente!",
                        `La foto se ha subido con éxito: ${this.cliente.foto}`, 'success'
                    )
                }
            });
        }
    }

    cerrarModal() {
        this.fotoSeleccionada = null;
        this.progreso = 0;
        this.modalService.cerrarModal();
    }

    //#endregion funcionesPrincipales

}
