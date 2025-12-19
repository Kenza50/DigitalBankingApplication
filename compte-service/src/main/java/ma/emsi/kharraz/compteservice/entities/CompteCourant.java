package ma.emsi.kharraz.compteservice.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@DiscriminatorValue("CC")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompteCourant extends Compte {
    private double decouvert;

    public CompteCourant(Long id, double solde, Date dateCreation, String state, Client client, double decouvert) {
        super(id, solde, dateCreation, state, client);
        this.decouvert = decouvert;
    }
}
