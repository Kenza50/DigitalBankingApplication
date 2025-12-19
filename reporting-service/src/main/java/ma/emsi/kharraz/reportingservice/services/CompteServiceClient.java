package ma.emsi.kharraz.reportingservice.services;

import ma.emsi.kharraz.reportingservice.model.Compte;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "COMPTE-SERVICE")
public interface CompteServiceClient {

    @GetMapping("/comptes/{id}")
    Compte findCompteById(@PathVariable("id") Long id);

    @GetMapping("/comptes")
    List<Compte> findAll();
}
