package ma.emsi.kharraz.compteservice;

import ma.emsi.kharraz.compteservice.entities.Client;
import ma.emsi.kharraz.compteservice.entities.CompteCourant;
import ma.emsi.kharraz.compteservice.entities.CompteEpargne;
import ma.emsi.kharraz.compteservice.repositories.ClientRepository;
import ma.emsi.kharraz.compteservice.repositories.CompteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.Stream;

@Component
public class DataInit {

    @Bean
    CommandLineRunner start(ClientRepository clientRepository,
            CompteRepository compteRepository) {
        return args -> {
            Stream.of("Hassan", "Yassine", "Aicha", "Omar", "Fatima", "Khalid", "Salma", "Rachid", "Noura", "Mehdi")
                    .forEach(name -> {
                        Client client = new Client();
                        client.setNom(name);
                        client.setEmail(name.toLowerCase() + "@gmail.com");
                        clientRepository.save(client);

                        CompteCourant cc = new CompteCourant();
                        cc.setSolde(Math.random() * 90000);
                        cc.setDateCreation(new Date());
                        cc.setState("ACTIVE");
                        cc.setClient(client);
                        cc.setDecouvert(6000);
                        compteRepository.save(cc);

                        CompteEpargne ce = new CompteEpargne();
                        ce.setSolde(Math.random() * 120000);
                        ce.setDateCreation(new Date());
                        ce.setState("ACTIVE");
                        ce.setClient(client);
                        ce.setTauxInteret(5.5);
                        compteRepository.save(ce);
                    });

            compteRepository.findAll().forEach(c -> {
                System.out.println(c.toString());
            });
        };
    }
}
