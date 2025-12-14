package com.tiago.financedashboard.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tb_transactions")
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Double amount;
    private String type; // Vamos usar "INCOME" (Entrada) ou "EXPENSE" (Saída)
    private LocalDate date;

    // Construtor vazio (obrigatório para o JPA)
    public Transaction() {}

    // Construtor completo
    public Transaction(String description, Double amount, String type, LocalDate date) {
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.date = date;
    }

    // Getters e Setters (Para o Java conseguir ler/escrever os dados)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
} 
