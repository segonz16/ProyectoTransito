package com.education.transit.rest;

import com.education.transit.models.Matricula;
import com.education.transit.service.MatriculaService;
import com.education.transit.service.PropietarioService;
import com.education.transit.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/matricula")
public class MatriculaRest {

    @Autowired
    MatriculaService matriculaService;
    @Autowired
    PropietarioService propietarioService;

    private final WebSocketService webSocketService;


    @GetMapping("/{placa}")
    public ResponseEntity<?> ListarMatriculaPorId(@PathVariable String placa) {
        List<Matricula> matriculas = matriculaService.findByPlaca(placa);

        if (matriculas == null || matriculas.isEmpty()) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No se encuentra registrado ningún vehiculo con la placa: " + placa);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return ResponseEntity.ok(matriculas);
    }

    @GetMapping(value = "")
    private ResponseEntity<List<Matricula>> listarMatriculas() {
        return ResponseEntity.ok(matriculaService.getAllMatricula());
    }

    @PostMapping(value = "/save")
    private ResponseEntity<?> save(@RequestBody Matricula matricula) {
        try {
            if (!propietarioService.existsById(matricula.getPropietarioId())) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El propietario con identificación " + matricula.getPropietarioId() + " no está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            if (matriculaService.existsByPlaca(matricula.getPlaca())) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El vehículo con placa " + matricula.getPlaca() + " ya está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            Matricula temp = matriculaService.create(matricula);
            webSocketService.sendVehiculoUpdate(temp);
            return ResponseEntity.ok(temp);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al guardar la matrícula.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Boolean> eliminarMatriculaById(@PathVariable String id) {
        if (matriculaService.existsByPlaca(id)) {
            matriculaService.deleteById(id);
            return ResponseEntity.ok(matriculaService.findByPlaca(id)!=null);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/actualizar")
    private ResponseEntity<?> actualizarMatricula(@RequestBody Matricula matricula) {
        try {
            if (!propietarioService.existsById(matricula.getPropietarioId())) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El propietario con identificación " + matricula.getPropietarioId() + " no está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            if (matriculaService.existsByPlaca(matricula.getPlaca())) {
                Matricula temp = matriculaService.create(matricula);
                webSocketService.sendVehiculoUpdate(temp);
                return ResponseEntity.ok(temp);
            }else{

                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El vehículo con placa " + matricula.getPlaca() + " no está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al guardar la matrícula.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    public MatriculaRest(MatriculaService matriculaService, WebSocketService webSocketService) {
        this.matriculaService = matriculaService;
        this.webSocketService = webSocketService;
    }
}
