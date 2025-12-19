package ma.emsi.kharraz.compteservice.web;

import ma.emsi.kharraz.compteservice.entities.Compte;
import ma.emsi.kharraz.compteservice.services.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comptes")
public class CompteRestController {

    @Autowired
    private CompteService compteService;

    @GetMapping
    public List<Compte> listComptes() {
        return compteService.getComptes();
    }

    @GetMapping("/{id}")
    public Compte getCompte(@PathVariable Long id) {
        return compteService.getCompte(id);
    }

    @PostMapping
    public Compte saveCompte(@RequestBody Compte compte) {
        return compteService.saveCompte(compte);
    }

    @PostMapping("/credit/{id}")
    public void credit(@PathVariable Long id, @RequestParam double montant) {
        compteService.credit(id, montant);
    }

    @PostMapping("/debit/{id}")
    public void debit(@PathVariable Long id, @RequestParam double montant) {
        compteService.debit(id, montant);
    }

    @DeleteMapping("/{id}")
    public void deleteCompte(@PathVariable Long id) {
        compteService.deleteCompte(id);
    }
}
