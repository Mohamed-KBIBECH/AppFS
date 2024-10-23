package com.org.demo;

import com.org.demo.modele.Proprietaire;
import com.org.demo.modele.Voiture;
import com.org.demo.repo.ProprietaireRepo;
import com.org.demo.repo.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringDataRestApplication {
	@Autowired
    ProprietaireRepo proprietaireRepo ;

	@Autowired
	private VoitureRepo repository;
	public static void main(String[] args) {
		SpringApplication.run(SpringDataRestApplication.class, args);

	}
	@Bean
	CommandLineRunner runner(){
		return args -> {

			Proprietaire proprietaire1 = new Proprietaire("Ali" , "Hassan");
			Proprietaire proprietaire2 = new Proprietaire("Najat" , "Bani");
			proprietaireRepo.save(proprietaire1);
			proprietaireRepo.save(proprietaire2);
			repository.save(new Voiture("Toyota", "Corolla", "Grise", "A-1-9090", 2018, 95000,	proprietaire1));
			repository.save(new Voiture("Ford", "Fiesta", "Rouge", "A-2-8090", 2015, 90000,proprietaire1));
			repository.save(new Voiture("Honda", "CRV", "Bleu", "A-3-7090", 2016, 140000,proprietaire2));

		};
	}

}
/*
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
@RunWith(SpringRunner.class)
@SpringBootTest
//indique que c’est une classe de test régulier qui exécute les tests à base de Spring boot
class SpringbootReactPart1ApplicationTests {
    @Autowired
    VoitureController voitureController;
    @Test
//indique que cette méthode peut être exécutée comme un cas de test
    void contextLoads() {
        assertThat(voitureController).isNotNull();
//on teste si l’instance du contrôleur a été créé et injectée avec succès.
    }
}
*/