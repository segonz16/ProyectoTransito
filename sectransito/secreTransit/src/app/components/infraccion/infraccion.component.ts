import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { InfraccionService } from '../../services/infraccion/infraccion.service'
import { VehiculoService } from '../../services/vehiculo/vehiculo.service'
import { error } from 'console';

@Component({
  selector: 'app-infraccion',
  templateUrl: './infraccion.component.html',
  styleUrls: ['./infraccion.component.css']
})
export class InfraccionComponent implements OnInit {

  infraccionForm: any;
  infracciones: any;
  infraccionesPropietario: any;
  consultaForm: any;
  mensajeI: string = '';
  vehiculo: any;
  maxFecha: any;


  constructor(
    public fb: FormBuilder,
    public infraccionService: InfraccionService,
    public vehiculoService: VehiculoService
  ) {

  }
  ngOnInit(): void {
    this.infraccionForm = this.fb.group({
      id: [''],
      fecha: ['', Validators.required],
      accionada: ['', Validators.required],
      placa: ['', Validators.required]
    });

    this.consultaForm = this.fb.group({
      identificacion: ['']
    });

    this.infraccionService.getAllinfracciones().subscribe(resp => {
      this.infracciones = resp;

    },
      error => { console.error(error) }
    );

    const hoy = new Date();
    this.maxFecha = hoy.toISOString().split('T')[0];

    this.infraccionForm.get('placa')?.valueChanges
      .pipe(debounceTime(500))
      .subscribe((placa: string) => {
        if (placa) {
          this.infraccionForm.patchValue({ placa: placa.toUpperCase() }, { emitEvent: false });
        }
        if (placa && placa.trim() !== '') {
          this.buscar(placa);
        } else {
          this.vehiculo = null;
          this.mensajeI = '';
        }
      });

  }

  guardar(): void {
    this.infraccionService.saveInfraccion(this.infraccionForm.value).subscribe(resp => {
      this.mensajeI = 'Infracción registrado correctamente!';
      this.infraccionForm.reset();
      this.infracciones = this.infracciones.filter((infraccion: { id: any; }) => resp.id !== infraccion.id)
      this.infracciones.push(resp);
      setTimeout(() => {
        this.mensajeI = '';
      }, 30000);
    },
      (error) => {
        this.mensajeI = error.message;
      }
    )
  }

  consultar(): void {
    const identificacion = this.consultaForm.value.identificacion;
    this.infraccionService.getInfracionByPropietario(identificacion).subscribe(
      (resp) => {
        if (resp.length === 0) {
          this.mensajeI = 'No se encontraron infracciones para este propietario.';
          this.infraccionesPropietario = [];
        } else {
          this.infraccionesPropietario = resp;
          this.mensajeI = '';
        }
      },
      (error) => {
        this.mensajeI = error.message;
      }
    );
  }

  buscar(placa: string): void {
    const id = this.infraccionForm.value.placa;

    this.vehiculoService.getVehiculoById(id).subscribe(
      (resp) => {
        console.log('Vehiculo encontrado:', resp);
        this.mensajeI = '';
      },
      (error) => {
        this.mensajeI = error.message;
      }
    );
  }
}
