package ma.emsi.kharraz.transactionservice.services;

import ma.emsi.kharraz.transactionservice.model.Compte;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "COMPTE-SERVICE")
public interface CompteServiceClient {

    @GetMapping("/comptes/{id}")
    Compte findCompteById(@PathVariable("id") Long id);

    @PostMapping("/comptes/credit/{id}")
    void credit(@PathVariable("id") Long id, @RequestParam("montant") double montant);

    @PostMapping("/comptes/debit/{id}")
    void debit(@PathVariable("id") Long id, @RequestParam("montant") double montant);
}
