import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfesoresService } from '../../services/profesores/profesores.service'
import { error } from 'console';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  profesorForm: any;
  profesores: any;


  constructor(
    public fb: FormBuilder,
    public profesoresService: ProfesoresService
  ) {

  }
  ngOnInit(): void {

    this.profesorForm = this.fb.group({
      documento: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.email],
      telefono: ['']

    });

    this.profesoresService.getAllProfesores().subscribe(resp => {
      this.profesores = resp;

    },
      error => { console.error(error) }
    )

  }



  guardar(): void {
    this.profesoresService.saveProfesor(this.profesorForm.value).subscribe(resp => {
      this.profesorForm.reset();
      this.profesores = this.profesores.filter((profesor: { documento: any; }) => resp.documento !== profesor.documento)
      this.profesores.push(resp);
    },
      error => { console.error(error) }
    )
  }

  actualizar(): void {
    this.profesoresService.updateProfesor(this.profesorForm.value).subscribe(resp => {
      this.profesorForm.reset();
      this.profesores.push(resp);
    },
      error => { console.error(error) }
    )
  }

  eliminar(profesor: any) {
    this.profesoresService.deleteProfesor(profesor.documento).subscribe(resp => {
      console.log(resp)
      if (resp === true) {
        this.profesores.pop(profesor)
      }
    })
  }

  editar(profesor: any) {
    this.profesorForm.setValue({
      documento: profesor.documento,
      tipoDocumento: profesor.tipoDocumento,
      nombre: profesor.nombre,
      email: profesor.email,
      telefono: profesor.telefono
    })
  }
}
