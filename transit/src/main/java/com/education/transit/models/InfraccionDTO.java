package com.education.transit.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InfraccionDTO {
    private Integer id;
    private String placa;
    private String propietario;
    private Date fecha;
    private String accionadaPor;

}
