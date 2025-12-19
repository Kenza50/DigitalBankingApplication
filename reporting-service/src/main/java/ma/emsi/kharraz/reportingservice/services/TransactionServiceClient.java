package ma.emsi.kharraz.reportingservice.services;

import ma.emsi.kharraz.reportingservice.model.Transaction;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "TRANSACTION-SERVICE")
public interface TransactionServiceClient {

    @GetMapping("/transactions/compte/{compteId}")
    List<Transaction> findTransactionsByCompteId(@PathVariable("compteId") Long compteId);
}
