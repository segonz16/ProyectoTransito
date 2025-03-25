package com.education.transit.service;

import com.education.transit.models.Matricula;
import com.education.transit.models.Propietario;
import com.education.transit.models.Vehiculo;
import com.education.transit.repository.MatriculaRepository;
import com.education.transit.repository.PropietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatriculaService {

    @Autowired
    private MatriculaRepository matriculaRepository;
    public Matricula create(Matricula matricula){
        return matriculaRepository.save(matricula);
    }


    public List<Matricula> getAllMatricula() {
        return matriculaRepository.findAll();
    }

    public boolean existsByPlaca(String placa) {
        return matriculaRepository.existsByPlaca(placa);
    }

    public List findByPlaca(String placa) {
        return matriculaRepository.findByPlaca(placa);
    }

}
