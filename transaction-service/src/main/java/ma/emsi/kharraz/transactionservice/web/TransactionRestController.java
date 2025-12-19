package ma.emsi.kharraz.transactionservice.web;

import ma.emsi.kharraz.transactionservice.entities.Transaction;
import ma.emsi.kharraz.transactionservice.repositories.TransactionRepository;
import ma.emsi.kharraz.transactionservice.services.CompteServiceClient;
import ma.emsi.kharraz.transactionservice.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionRestController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CompteServiceClient compteServiceClient;

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public List<Transaction> listTransactions() {
        return transactionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Transaction getTransaction(@PathVariable Long id) {
        Transaction transaction = transactionRepository.findById(id).orElse(null);
        if (transaction != null && transaction.getCompteSourceId() != null) {
            transaction.setCompteSource(compteServiceClient.findCompteById(transaction.getCompteSourceId()));
        }
        return transaction;
    }

    @PostMapping("/depot")
    public void createDeposit(@RequestParam Long compteId, @RequestParam double montant) {
        transactionService.createDeposit(compteId, montant);
    }

    @PostMapping("/retrait")
    public void createWithdraw(@RequestParam Long compteId, @RequestParam double montant) {
        transactionService.createWithdraw(compteId, montant);
    }

    @PostMapping("/virement")
    public void createTransfer(@RequestParam Long source, @RequestParam Long destination,
            @RequestParam double montant) {
        transactionService.createTransfer(source, destination, montant);
    }

    @GetMapping("/compte/{compteId}")
    public List<Transaction> getTransactionsByCompte(@PathVariable Long compteId) {
        return transactionRepository.findByCompteSourceId(compteId);
    }
}
