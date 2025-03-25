import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservasService } from '../../services/reservas/reservas.service'
import { ProfesoresService } from '../../services/profesores/profesores.service'
import { SalonesService } from '../../services/salones/salones.service'
import { error } from 'console';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  reservaForm: any;
  reservas: any;
  salones: any;
  profesores: any;
  minDate: any;
  selectedDate: any;

  horaInicio: string = '';
  horaFin: string = '';
  mensajeError: string = '';

  // Rango para hora de inicio
  horaInicioMin: string = '06:00'; // 6:00 AM
  horaInicioMax: string = '21:30'; // 9:30 PM

  // Rango para hora de fin
  horaFinMin: string = '06:30'; // 6:30 AM
  horaFinMax: string = '22:00'; // 10:00 PM


  constructor(
    public fb: FormBuilder,
    public reservasService: ReservasService,
    public profesoresService: ProfesoresService,
    public salonesService: SalonesService,
  ) {

  }
  ngOnInit(): void {

    this.reservaForm = this.fb.group({
      id: [''],
      idProfesor: ['', Validators.required],
      codigoSalon: ['', Validators.required],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required]

    });

    this.reservasService.getAllreservas().subscribe(resp => {
      this.reservas = resp;

    },
      error => { console.error(error) }
    )

    this.salonesService.getAllsalones().subscribe(resp => {
      this.salones = resp;
    },
      error => { console.error(error) }
    );

    this.profesoresService.getAllProfesores().subscribe(resp => {
      this.profesores = resp;
    },
      error => { console.error(error) }
    );

    const today = new Date();
    // Formatear la fecha en formato 'YYYY-MM-DD'
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Añadir 0 si el mes es menor a 10
    const day = String(today.getDate()).padStart(2, '0'); // Añadir 0 si el día es menor a 10

    this.minDate = `${year}-${month}-${day}`;

  }


  guardar(): void {

    const horaInicio = this.formatearHora(this.reservaForm.get('horaInicio').value);
    const horaFin = this.formatearHora(this.reservaForm.get('horaFin').value);
    const datosReserva = {
      ...this.reservaForm.value,
      horaInicio: horaInicio,
      horaFin: horaFin
    };
    this.reservasService.savereserva(datosReserva).subscribe(resp => {

      this.reservaForm.reset();
      this.reservas = this.reservas.filter((reserva: { id: any; }) => resp.id !== reserva.id)
      this.reservas.push(resp);
    },
      error => { console.error(error) }
    )
  }


  actualizar(): void {
    this.reservasService.updatereserva(this.reservaForm.value).subscribe(resp => {
      this.reservaForm.reset();
      this.reservas.push(resp);
    },
      error => { console.error(error) }
    )
  }

  eliminar(reserva: any) {
    this.reservasService.deletereserva(reserva.id).subscribe(resp => {
      console.log(resp)
      if (resp === true) {
        this.reservas.pop(reserva)
      }
    })
  }

  editar(reserva: any) {
    this.reservaForm.setValue({
      id: reserva.id,
      idProfesor: reserva.idProfesor,
      codigoSalon: reserva.codigoSalon,
      fecha: reserva.fecha,
      horaInicio: reserva.horaInicio,
      horaFin: reserva.horaFin
    })
  }

  validarHoras(): void {
    if (this.horaInicio && this.horaFin) {
      if (this.horaFin <= this.horaInicio) {
        this.mensajeError = 'La hora de fin debe ser mayor que la hora de inicio.';
      } else {
        this.mensajeError = '';
      }
    }
  }
  private formatearHora(hora: string): string {
    const [hours, minutes] = hora.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  }

}
