package ma.emsi.kharraz.compteservice.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@DiscriminatorValue("CE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompteEpargne extends Compte {
    private double tauxInteret;

    public CompteEpargne(Long id, double solde, Date dateCreation, String state, Client client, double tauxInteret) {
        super(id, solde, dateCreation, state, client);
        this.tauxInteret = tauxInteret;
    }
}
