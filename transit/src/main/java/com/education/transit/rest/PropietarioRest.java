package com.education.transit.rest;

import com.education.transit.models.Matricula;
import com.education.transit.models.Propietario;
import com.education.transit.service.PropietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/propietario")
public class PropietarioRest {

    @Autowired
    PropietarioService propietarioService;

    @GetMapping(value = "")
    private ResponseEntity<List<Propietario>> listAllPropietario() {
        return ResponseEntity.ok(propietarioService.getAllPropietarios());
    }

    @GetMapping("/{identificacion}")
    public ResponseEntity<?> listarPropietarioPorId(@PathVariable String identificacion) {
        List<Propietario> propietarios = propietarioService.findByIdentificacion(identificacion);

        if (propietarios == null || propietarios.isEmpty()) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No se encuentra registrado ningún propietario con la identificación: " + identificacion);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return ResponseEntity.ok(propietarios);
    }

    @PostMapping(value = "/save")
    private ResponseEntity<?> save(@RequestBody Propietario propietario) {
        try {
            if (!propietarioService.existsById(propietario.getIdentificacion())) {
                Propietario temp = propietarioService.create(propietario);
                return ResponseEntity.ok(temp);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El propietario con identificación " + propietario.getIdentificacion() + " ya está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al guardar el propietario.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
