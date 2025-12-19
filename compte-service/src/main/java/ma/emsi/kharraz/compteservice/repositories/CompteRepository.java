package ma.emsi.kharraz.compteservice.repositories;

import ma.emsi.kharraz.compteservice.entities.Compte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompteRepository extends JpaRepository<Compte, Long> {
}
