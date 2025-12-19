package ma.emsi.kharraz.transactionservice.repositories;

import ma.emsi.kharraz.transactionservice.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByCompteSourceId(Long compteId);
}
