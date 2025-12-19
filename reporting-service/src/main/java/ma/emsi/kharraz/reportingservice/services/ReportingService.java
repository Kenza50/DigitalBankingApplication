package ma.emsi.kharraz.reportingservice.services;

import ma.emsi.kharraz.reportingservice.model.Compte;
import ma.emsi.kharraz.reportingservice.model.Report;
import ma.emsi.kharraz.reportingservice.model.TauxChange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class ReportingService {

    @Autowired
    private CompteServiceClient compteServiceClient;

    @Autowired
    private TransactionServiceClient transactionServiceClient;

    @Autowired
    private ExchangeService exchangeService;

    public Report generateReport(Long compteId) {
        Compte compte = compteServiceClient.findCompteById(compteId);
        java.util.List<ma.emsi.kharraz.reportingservice.model.Transaction> transactions = transactionServiceClient
                .findTransactionsByCompteId(compteId);

        StringBuilder content = new StringBuilder();
        content.append("Compte: ").append(compte.getId()).append(" | Solde: ").append(compte.getSolde()).append("\n");
        content.append("Transactions:\n");
        for (ma.emsi.kharraz.reportingservice.model.Transaction t : transactions) {
            content.append("- ").append(t.getMontant()).append("\n");
        }

        TauxChange rate = exchangeService.getRate("MAD", "USD");
        content.append("\nRate (MAD->USD): ").append(rate.getTaux());

        return new Report(UUID.randomUUID().toString(), String.valueOf(compteId), new Date(), content.toString());
    }
}
