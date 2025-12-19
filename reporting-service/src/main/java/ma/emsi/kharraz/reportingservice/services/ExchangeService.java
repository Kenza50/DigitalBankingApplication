package ma.emsi.kharraz.reportingservice.services;

import ma.emsi.kharraz.reportingservice.model.TauxChange;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ExchangeService {

    public TauxChange getRate(String source, String cible) {
        // Mock implementation
        return new TauxChange(source, cible, 10.5, new Date());
    }
}
