package ma.emsi.kharraz.reportingservice.model;

import lombok.Data;

import java.util.Date;

@Data
public class Transaction {
    private Long id;
    private Date date;
    private double montant;
    private Long compteId;
}
