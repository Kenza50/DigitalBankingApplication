package ma.emsi.kharraz.reportingservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TauxChange {
    private String deviseSource;
    private String deviseCible;
    private double taux;
    private Date dateMaj;
}
