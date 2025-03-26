import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { VehiculoService } from '../../services/vehiculo/vehiculo.service'
import { PropietarioService } from '../../services/propietario/propietario.service'
import { error } from 'console';
import { WebSocketService } from '../../services/websocket/websocket.service';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  vehiculoForm: any;
  vehiculos: any;
  propietario: any;
  tipoVehiculos: any;
  mensaje: string = '';
  maxFecha: string = '';



  constructor(
    public fb: FormBuilder,
    public vehiculoService: VehiculoService,
    public propietarioService: PropietarioService,
    public webSocketService: WebSocketService
  ) {

  }
  ngOnInit(): void {
    this.vehiculoForm = this.fb.group({
      placa: ['', Validators.required],
      marca: ['', Validators.required],
      fechaMatricula: ['', Validators.required],
      propietarioId: ['', Validators.required],
      vehiculoId: ['', Validators.required]
    });

    this.vehiculoService.getAllVehiculos().subscribe(resp => {
      this.tipoVehiculos = resp;

    },
      error => { console.error(error) }
    );

    this.vehiculoService.getAllMatricula().subscribe(resp => {
      this.vehiculos = resp;
    },
      error => { console.error(error) }
    );
    const hoy = new Date();
    this.maxFecha = hoy.toISOString().split('T')[0];

    ['placa', 'marca'].forEach((campo) => {
      this.vehiculoForm.get(campo)?.valueChanges.subscribe((value: string) => {
        if (value) {
          const update: any = {};
          update[campo] = value.toUpperCase();
          this.vehiculoForm.patchValue(update, { emitEvent: false });
        }
      });
    });

    this.webSocketService.getVehiculoObservable().subscribe(vehiculo => {
      const index = this.vehiculos.findIndex((v: any) => v.placa === vehiculo.placa);
      if (index !== -1) {
        if (JSON.stringify(this.vehiculos[index]) !== JSON.stringify(vehiculo)) {
          this.vehiculos[index] = vehiculo;
        }
      } else {
        this.vehiculos.push(vehiculo);
      }
    });



    this.vehiculoForm.get('propietarioId')?.valueChanges
      .pipe(debounceTime(500))
      .subscribe((propietarioId: string) => {
        if (propietarioId && propietarioId.trim() !== '') {
          this.buscar(propietarioId);
        } else {
          this.propietario = null;
          this.mensaje = '';
        }
      });

  }

  guardar(): void {
    this.vehiculoService.saveVehiculo(this.vehiculoForm.value).subscribe(resp => {
      this.mensaje = '¡Vehiculo registrado correctamente!';
      this.vehiculoForm.reset();
      this.vehiculos = this.vehiculos.filter((vehiculo: { placa: any; }) => resp.placa !== vehiculo.placa)
      this.vehiculos.push(resp);
      setTimeout(() => {
        this.mensaje = '';
      }, 3000);
    },
      (error) => {
        this.mensaje = error.message;
      }
    )

  }


  buscar(documento: string): void {
    const id = this.vehiculoForm.value.propietarioId;

    this.propietarioService.getPropietarioById(id).subscribe(
      (resp) => {
        console.log('Propietario encontrado:', resp);
        this.mensaje = '';
      },
      (error) => {
        this.mensaje = error.message;
      }
    );

  }
  actualizar(): void {
    this.vehiculoService.updateVehiculo(this.vehiculoForm.value).subscribe(resp => {
      this.vehiculoForm.reset();
      this.vehiculos = this.vehiculos.filter((vehiculo: { placa: any; }) => resp.placa !== vehiculo.placa)
      this.vehiculos.push(resp);
    },
      error => { console.error(error) }
    )
  }

  editar(vehiculo: any) {
    this.vehiculoForm.setValue({
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      fechaMatricula: vehiculo.fechaMatricula,
      propietarioId: vehiculo.propietarioId,
      vehiculoId: vehiculo.vehiculoId
    })
  }
}