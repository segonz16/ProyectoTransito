package com.education.transit.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "matricula")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Matricula {
    @Column(name = "placa")
    @Id
    private String placa;
    @Column(name = "marca")
    private String marca;
    @Column(name = "fecha_matricula")
    private Date fechaMatricula;
    @Column(name = "propietario_id")
    private String propietarioId;
    @Column(name = "vehiculo_id")
    private int vehiculoId;


}
