package com.org.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.org.demo.modele.Proprietaire;

public interface ProprietaireRepo extends JpaRepository<Proprietaire, Long> {
}
