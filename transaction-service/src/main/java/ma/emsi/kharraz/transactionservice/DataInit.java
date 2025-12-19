package ma.emsi.kharraz.transactionservice;

import ma.emsi.kharraz.transactionservice.entities.Transaction;
import ma.emsi.kharraz.transactionservice.entities.TypeTransaction;
import ma.emsi.kharraz.transactionservice.repositories.TransactionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataInit {

        @Bean
        CommandLineRunner start(TransactionRepository transactionRepository) {
                return args -> {
                        java.util.Random random = new java.util.Random();
                        for (int i = 0; i < 40; i++) {
                                Transaction t = new Transaction();
                                t.setMontant(100 + random.nextDouble() * 10000);
                                t.setDateTransaction(new java.util.Date());

                                int typeIdx = random.nextInt(3);
                                if (typeIdx == 0) {
                                        t.setType(TypeTransaction.DEPOT);
                                        t.setCompteDestinationId((long) (1 + random.nextInt(20)));
                                } else if (typeIdx == 1) {
                                        t.setType(TypeTransaction.RETRAIT);
                                        t.setCompteSourceId((long) (1 + random.nextInt(20)));
                                } else {
                                        t.setType(TypeTransaction.VIREMENT);
                                        t.setCompteSourceId((long) (1 + random.nextInt(20)));
                                        t.setCompteDestinationId((long) (1 + random.nextInt(20)));
                                }
                                transactionRepository.save(t);
                        }
                };
        }
}
