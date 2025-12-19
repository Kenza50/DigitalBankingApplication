package ma.emsi.kharraz.transactionservice.services;

import ma.emsi.kharraz.transactionservice.entities.Transaction;
import ma.emsi.kharraz.transactionservice.entities.TypeTransaction;

public interface TransactionService {
    void createDeposit(Long compteId, double montant);

    void createWithdraw(Long compteId, double montant);

    void createTransfer(Long compteSource, Long compteDestination, double montant);
}
