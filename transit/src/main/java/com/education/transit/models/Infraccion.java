package com.education.transit.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "infraccion")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Infraccion {
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "fecha")
    private Date fecha;
    @Column(name = "accionada_por")
    private String accionada;
    @Column(name = "placa")
    private String placa;
}
