package com.education.transit.repository;

import com.education.transit.models.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MatriculaRepository extends JpaRepository<Matricula, String> {

    boolean existsByPlaca(String placa);
    List<Matricula> findByPlaca(String placa);

}
