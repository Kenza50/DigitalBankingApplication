package ma.emsi.kharraz.reportingservice.web;

import ma.emsi.kharraz.reportingservice.model.Compte;
import ma.emsi.kharraz.reportingservice.model.Report;
import ma.emsi.kharraz.reportingservice.services.CompteServiceClient;
import ma.emsi.kharraz.reportingservice.services.ReportingService;
import ma.emsi.kharraz.reportingservice.services.TransactionServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reporting")
public class ReportingRestController {

    @Autowired
    private CompteServiceClient compteServiceClient;

    @Autowired
    private TransactionServiceClient transactionServiceClient;

    @Autowired
    private ReportingService reportingService;

    @GetMapping("/comptes/{id}")
    public Compte getCompteWithTransactions(@PathVariable Long id) {
        Compte compte = compteServiceClient.findCompteById(id);
        if (compte != null) {
            compte.setTransactions(transactionServiceClient.findTransactionsByCompteId(id));
        }
        return compte;
    }

    @GetMapping("/report/{compteId}")
    public Report getReport(@PathVariable Long compteId) {
        return reportingService.generateReport(compteId);
    }
}
