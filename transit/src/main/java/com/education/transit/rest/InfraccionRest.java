package com.education.transit.rest;

import com.education.transit.models.Infraccion;
import com.education.transit.models.InfraccionDTO;
import com.education.transit.models.Matricula;
import com.education.transit.models.Propietario;
import com.education.transit.service.InfraccionService;
import com.education.transit.service.MatriculaService;
import com.education.transit.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/infraccion")
public class InfraccionRest {

    @Autowired
    InfraccionService infraccionService;

    @Autowired
    MatriculaService matriculaService;

    private final WebSocketService webSocketService;

    @GetMapping("/{placa}")
    private ResponseEntity<List<Infraccion>> ListarInfraccionporPlaca(@PathVariable String placa) {
        return ResponseEntity.ok(infraccionService.findByPlaca(placa));
    }

    @GetMapping(value = "")
    private ResponseEntity<List<Infraccion>> listAllInfracciones() {
        return ResponseEntity.ok(infraccionService.getAllInfracciones());
    }

    @PostMapping(value = "/save")
    private ResponseEntity<?> save(@RequestBody Infraccion infraccion) {
        try {
            if (!matriculaService.existsByPlaca(infraccion.getPlaca())) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El vehículo con placa " + infraccion.getPlaca() + " no está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
            Infraccion temporal = infraccionService.create(infraccion);
            webSocketService.sendVehiculoUpdate(temporal);
            return ResponseEntity.created(new URI("/api/infraccion/save" + temporal.getId())).body(temporal);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al guardar el propietario.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }


    @GetMapping("/propietario/{identificacion}")
    public ResponseEntity<?> obtenerInfracciones(@PathVariable String identificacion) {
        List<InfraccionDTO> infracciones = infraccionService.obtenerInfraccionesPorPropietario(identificacion);

        if (infracciones == null || infracciones.isEmpty()) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No hay infracciones para el propietario con identificación: " + identificacion);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return ResponseEntity.ok(infracciones);
    }

    public InfraccionRest(InfraccionService infraccionService, WebSocketService webSocketService) {
        this.infraccionService = infraccionService;
        this.webSocketService = webSocketService;
    }

   @PostMapping(value = "/actualizar")
    private ResponseEntity<?> actualizarInfraccion(@RequestBody Infraccion infraccion) {
        try {
            if (!matriculaService.existsByPlaca(infraccion.getPlaca())) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El vehículo con placa " + infraccion.getPlaca() + " no está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            if (infraccionService.existsById(String.valueOf(infraccion.getId()))) {
                Infraccion temp = infraccionService.update(infraccion);
                webSocketService.sendInfraccionUpdate(temp);
                return ResponseEntity.ok(temp);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "La infracción con id " + infraccion.getId() + " no está registrada.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al actualizazr la infracción.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

   @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Boolean> eliminarInfraccionById(@PathVariable String id) {
        if (infraccionService.existsById(id)) {
            infraccionService.deleteById(id);
            return ResponseEntity.ok(infraccionService.finById(id)!=null);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
