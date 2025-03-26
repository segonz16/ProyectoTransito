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
      if (!this.propietarios.some((p: any) => p.identificacion === propietario.identificacion)) {
        this.propietarios.push(propietario);
      }
    });

  }

  guardar(): void {
    this.propietarioService.savePropietario(this.propietarioForm.value).subscribe(resp => {
      this.propietarioForm.reset();
      this.propietarios = this.propietarios.filter((propietario: { identificacion: any; }) => resp.identificacion !== propietario.identificacion)
      this.propietarios.push(resp);
    },
      error => { console.error(error) }
    )
  }
  /*
    actualizar(): void {
      this.propietarioService.updatePropietario(this.propietarioForm.value).subscribe(resp => {
        this.propietarioForm.reset();
        this.propietarios.push(resp);
      },
        error => { console.error(error) }
      )
    }
  
    eliminar(profesor: any) {
      this.propietarioService.deletePropietario(profesor.documento).subscribe(resp => {
        console.log(resp)
        if (resp === true) {
          this.propietarios.pop(profesor)
        }
      })
    }
  
    editar(profesor: any) {
      this.propietarioForm.setValue({
        documento: profesor.documento,
        tipoDocumento: profesor.tipoDocumento,
        nombre: profesor.nombre,
        email: profesor.email,
        telefono: profesor.telefono
      })
    }
    
    */
}