package ma.emsi.kharraz.compteservice.services;

import ma.emsi.kharraz.compteservice.entities.Compte;
import ma.emsi.kharraz.compteservice.repositories.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CompteServiceImpl implements CompteService {

    @Autowired
    private CompteRepository compteRepository;

    @Override
    public Compte saveCompte(Compte compte) {
        return compteRepository.save(compte);
    }

    @Override
    public Compte getCompte(Long id) {
        return compteRepository.findById(id).orElseThrow(() -> new RuntimeException("Compte Not Found"));
    }

    @Override
    public List<Compte> getComptes() {
        return compteRepository.findAll();
    }

    @Override
    public void credit(Long id, double montant) {
        Compte compte = getCompte(id);
        compte.setSolde(compte.getSolde() + montant);
        compteRepository.save(compte);
    }

    @Override
    public void debit(Long id, double montant) {
        Compte compte = getCompte(id);
        if (compte.getSolde() < montant) {
            throw new RuntimeException("Solde insuffisant");
        }
        compte.setSolde(compte.getSolde() - montant);
        compteRepository.save(compte);
    }

    @Override
    public void deleteCompte(Long id) {
        compteRepository.deleteById(id);
    }
}
