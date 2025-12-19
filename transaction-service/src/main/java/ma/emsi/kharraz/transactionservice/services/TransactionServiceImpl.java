package ma.emsi.kharraz.transactionservice.services;

import ma.emsi.kharraz.transactionservice.entities.Transaction;
import ma.emsi.kharraz.transactionservice.entities.TypeTransaction;
import ma.emsi.kharraz.transactionservice.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CompteServiceClient compteServiceClient;

    @Override
    public void createDeposit(Long compteId, double montant) {
        compteServiceClient.credit(compteId, montant);
        Transaction transaction = new Transaction(null, montant, new Date(), TypeTransaction.DEPOT, null, compteId,
                null, null);
        transactionRepository.save(transaction);
    }

    @Override
    public void createWithdraw(Long compteId, double montant) {
        compteServiceClient.debit(compteId, montant);
        Transaction transaction = new Transaction(null, montant, new Date(), TypeTransaction.RETRAIT, compteId, null,
                null, null);
        transactionRepository.save(transaction);
    }

    @Override
    public void createTransfer(Long compteSource, Long compteDestination, double montant) {
        compteServiceClient.debit(compteSource, montant);
        compteServiceClient.credit(compteDestination, montant);
        Transaction transaction = new Transaction(null, montant, new Date(), TypeTransaction.VIREMENT, compteSource,
                compteDestination, null, null);
        transactionRepository.save(transaction);
    }
}
