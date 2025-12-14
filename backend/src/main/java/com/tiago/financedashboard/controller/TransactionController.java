package com.tiago.financedashboard.controller;

import com.tiago.financedashboard.model.Transaction;
import com.tiago.financedashboard.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") // <--- ADICIONE ESTA LINHA AQUI
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository repository;

    // Buscar todas as transações
    @GetMapping
    public List<Transaction> getAll() {
        return repository.findAll();
    }

    // Criar uma nova transação
    @PostMapping
    public Transaction create(@RequestBody Transaction transaction) {
        return repository.save(transaction);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}

    

