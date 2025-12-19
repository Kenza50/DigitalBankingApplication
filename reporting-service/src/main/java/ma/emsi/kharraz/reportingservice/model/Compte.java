package ma.emsi.kharraz.reportingservice.model;

import lombok.Data;

import java.util.List;

@Data
public class Compte {
    private Long id;
    private double solde;
    private String type;
    private List<Transaction> transactions;
}
