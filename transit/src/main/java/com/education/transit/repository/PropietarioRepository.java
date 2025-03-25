package com.education.transit.repository;

import com.education.transit.models.Propietario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropietarioRepository extends JpaRepository<Propietario, String> {

    boolean existsById(String identificacion);

    List<Propietario> findByIdentificacion(String identificacion);
}
