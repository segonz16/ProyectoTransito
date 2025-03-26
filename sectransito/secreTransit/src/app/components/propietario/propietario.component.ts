import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PropietarioService } from '../../services/propietario/propietario.service'
import { error } from 'console';
import { WebSocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {

  propietarioForm: any;
  propietarios: any;
  mensaje: string = '';


  constructor(
    public fb: FormBuilder,
    public propietarioService: PropietarioService,
    public webSocketService: WebSocketService
  ) {

  }
  ngOnInit(): void {
    this.propietarioForm = this.fb.group({
      identificacion: ['', Validators.required],
      tipoPropietario: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    this.propietarioService.getAllPropietario().subscribe(resp => {
      this.propietarios = resp;

    },
      error => { console.error(error) }
    );

    this.webSocketService.getPropietarioObservable().subscribe(propietario => {
      const index = this.propietarios.findIndex((p: any) => p.identificacion === propietario.identificacion);

      if (index !== -1) {
        if (JSON.stringify(this.propietarios[index]) !== JSON.stringify(propietario)) {
          this.propietarios[index] = propietario;
        }
      } else {
        this.propietarios.push(propietario);
      }
    });

  }

  guardar(): void {
    this.propietarioService.savePropietario(this.propietarioForm.value).subscribe(resp => {
      this.mensaje = '¡Vehiculo registrado correctamente!';
      this.propietarioForm.reset();
      this.propietarios = this.propietarios.filter((propietario: { identificacion: any; }) => resp.identificacion !== propietario.identificacion)
      this.propietarios.push(resp);
      setTimeout(() => {
        this.mensaje = '';
      }, 3000);
    },
      (error) => {
        this.mensaje = error.message;
      }
    )
  }

  actualizar(): void {
    this.propietarioService.updatePropietario(this.propietarioForm.value).subscribe(resp => {
      this.propietarioForm.reset();
      this.propietarios = this.propietarios.filter((propietario: { identificacion: any; }) => resp.identificacion !== propietario.identificacion)
      this.propietarios.push(resp);
    },
      error => { console.error(error) }
    )
  }

  editar(propietario: any) {
    this.propietarioForm.setValue({
      identificacion: propietario.identificacion,
      tipoPropietario: propietario.tipoPropietario,
      tipoDocumento: propietario.tipoDocumento,
      nombre: propietario.nombre,
      direccion: propietario.direccion
    })
  }

}