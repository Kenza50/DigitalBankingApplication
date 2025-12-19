package ma.emsi.kharraz.compteservice.repositories;

import ma.emsi.kharraz.compteservice.entities.Client;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;

@Configuration
public interface ClientRepository extends JpaRepository<Client, Long> {
}
