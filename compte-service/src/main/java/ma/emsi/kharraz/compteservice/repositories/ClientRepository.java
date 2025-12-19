package ma.emsi.kharraz.compteservice.repositories;

import ma.emsi.kharraz.compteservice.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClientRepository extends JpaRepository<Client, Long> {
}
