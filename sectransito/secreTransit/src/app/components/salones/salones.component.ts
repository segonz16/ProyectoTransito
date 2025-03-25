import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SalonesService } from '../../services/salones/salones.service'
import { error } from 'console';

@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.css']
})
export class SalonesComponent implements OnInit {


  salonForm: any;
  salones: any;


  constructor(
    public fb: FormBuilder,
    public salonesService: SalonesService
  ) {

  }
  ngOnInit(): void {

    this.salonForm = this.fb.group({
      codigoSalon: ['', Validators.required],
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidad: ['', Validators.required],
      descripcion: ['',]

    });

    this.salonesService.getAllsalones().subscribe(resp => {
      this.salones = resp;

    },
      error => { console.error(error) }
    )

  }
  guardar(): void {
    this.salonesService.savesalon(this.salonForm.value).subscribe(resp => {
      this.salonForm.reset();
      this.salones = this.salones.filter((salon: { codigoSalon: any; }) => resp.codigoSalon !== salon.codigoSalon)
      this.salones.push(resp);
    },
      error => { console.error(error) }
    )
  }

  actualizar(): void {
    this.salonesService.updatesalon(this.salonForm.value).subscribe(resp => {
      this.salonForm.reset();
      this.salones.push(resp);
    },
      error => { console.error(error) }
    )
  }

  eliminar(salon: any) {
    this.salonesService.deletesalon(salon.codigoSalon).subscribe(resp => {
      console.log(resp)

      if (resp === true) {
        this.salones.pop(salon)
      }
    })
  }

  editar(salon: any) {
    this.salonForm.setValue({
      codigoSalon: salon.codigoSalon,
      nombre: salon.nombre,
      ubicacion: salon.ubicacion,
      capacidad: salon.capacidad,
      descripcion: salon.descripcion
    })
  }


}
