package com.education.transit.repository;

import com.education.transit.models.Infraccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InfraccionRepository extends JpaRepository<Infraccion, String> {

    boolean existsById(String id);

    List<Infraccion> findByPlaca(String placa);


    @Query(value = "SELECT i.id, m.placa, p.nombre, i.fecha, i.accionada_por " +
            "FROM infraccion i " +
            "JOIN matricula m ON i.placa = m.placa " +
            "JOIN propietario p ON m.propietario_id = p.identificacion " +
            "WHERE p.identificacion = :identificacion", nativeQuery = true)
    List<Object[]> findInfraccionesByPropietario(@Param("identificacion") String identificacion);
}



