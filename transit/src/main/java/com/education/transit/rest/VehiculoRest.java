package com.education.transit.rest;

import com.education.transit.models.Vehiculo;
import com.education.transit.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoRest {

    @Autowired
    VehiculoService vehiculoService;

    @GetMapping(value = "")
    private ResponseEntity<List<Vehiculo>> listAllVehiculos() {
        return ResponseEntity.ok(vehiculoService.getAllVehiculos());
    }
}
