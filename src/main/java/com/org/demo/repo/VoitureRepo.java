package com.org.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.org.demo.modele.Voiture;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface VoitureRepo extends CrudRepository<Voiture, Long> {
    //Lister Voitures par marque
    List<Voiture> findByModele(@Param("modele") String modele);
//Lister Voitures par couleur

    List<Voiture> findByCouleur(@Param("couleur") String couleur);
}
