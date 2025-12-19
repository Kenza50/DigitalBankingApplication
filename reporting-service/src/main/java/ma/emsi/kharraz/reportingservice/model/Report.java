package ma.emsi.kharraz.reportingservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Report {
    private String id;
    private String compteId;
    private Date generatedAt;
    private String content;
}
