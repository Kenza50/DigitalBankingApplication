package ma.emsi.kharraz.transactionservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.emsi.kharraz.transactionservice.model.Compte;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double montant;
    private Date dateTransaction;
    @Enumerated(EnumType.STRING)
    private TypeTransaction type;
    private Long compteSourceId;
    private Long compteDestinationId;
    @Transient
    private Compte compteSource;
    @Transient
    private Compte compteDestination;
}
