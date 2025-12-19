package ma.emsi.kharraz.compteservice.services;

import ma.emsi.kharraz.compteservice.entities.Compte;

import java.util.List;

public interface CompteService {
    Compte saveCompte(Compte compte);

    Compte getCompte(Long id);

    List<Compte> getComptes();

    void credit(Long id, double montant);

    void debit(Long id, double montant);

    void deleteCompte(Long id);
}
