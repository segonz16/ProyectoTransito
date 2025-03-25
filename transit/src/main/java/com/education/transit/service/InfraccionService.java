package com.education.transit.service;

import com.education.transit.models.Infraccion;
import com.education.transit.models.InfraccionDTO;
import com.education.transit.models.Vehiculo;
import com.education.transit.repository.InfraccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InfraccionService {

    @Autowired
    private InfraccionRepository infraccionRepository;

    public Infraccion create(Infraccion infraccion) {
        return infraccionRepository.save(infraccion);
    }

    public boolean existsById(String id) {
        return infraccionRepository.existsById(id);
    }

    public List findByPlaca(String placa) {
        return infraccionRepository.findByPlaca(placa);
    }

    public List<InfraccionDTO> obtenerInfraccionesPorPropietario(String identificacion) {
        List<Object[]> resultados = infraccionRepository.findInfraccionesByPropietario(identificacion);

        return resultados.stream()
                .map(row -> new InfraccionDTO(
                        ((Integer) row[0]),
                        (String) row[1],
                        (String) row[2],
                        (Date) row[3],
                        (String) row[4]))
                .collect(Collectors.toList());
    }

    public List<Infraccion> getAllInfracciones() {
        return infraccionRepository.findAll();
    }


}
