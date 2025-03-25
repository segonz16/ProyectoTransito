import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';


import { ProfesoresComponent } from './components/profesores/profesores.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { SalonesComponent } from './components/salones/salones.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort'
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';


import { PropietarioComponent } from './components/propietario/propietario.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { InfraccionComponent } from './components/infraccion/infraccion.component';

const routes: Routes = [
  { path: 'profesores', component: ProfesoresComponent },
  { path: 'propietario', component: PropietarioComponent },
  { path: 'vehiculo', component: VehiculoComponent },
  { path: 'infraccion', component: InfraccionComponent },
  { path: 'salones', component: SalonesComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'home', component: HomeComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfesoresComponent,
    ReservasComponent,
    SalonesComponent,
    HomeComponent,
    PropietarioComponent,
    VehiculoComponent,
    InfraccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
