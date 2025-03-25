package com.education.transit.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "propietario")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Propietario {
    @Column(name = "identificacion")
    @Id
    private String identificacion;
    @Column(name = "tipo_propietario")
    private String tipoPropietario;
    @Column(name = "tipo_documento")
    private String tipoDocumento;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "direccion")
    private String direccion;

}
