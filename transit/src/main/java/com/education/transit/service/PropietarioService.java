package com.education.transit.service;

import com.education.transit.models.Propietario;
import com.education.transit.models.Vehiculo;
import com.education.transit.repository.PropietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class PropietarioService {
    @Autowired
    private PropietarioRepository propietarioRepository;

    public Propietario create(Propietario propietario) {
        return propietarioRepository.save(propietario);
    }

    public List<Propietario> getAllPropietarios() {
        return propietarioRepository.findAll();
    }

    public boolean existsById(String id) {
        return propietarioRepository.existsById(id);
    }

    public List<Propietario> findByIdentificacion(String identificacion) {
        return propietarioRepository.findByIdentificacion(identificacion);
    }

}
