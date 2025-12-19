package ma.emsi.kharraz.transactionservice.model;

import lombok.Data;

@Data
public class Compte {
    private Long id;
    private double solde;
    private String type;
}
