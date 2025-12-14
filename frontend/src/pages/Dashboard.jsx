import { useEffect, useState } from 'react';
import api from '../services/api';
import '../index.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'; // <--- NOVOS IMPORTS

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ income: 0, expense: 0, total: 0 });
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('INCOME');

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = () => {
        api.get('/transactions').then(response => {
            setTransactions(response.data);
            calculateSummary(response.data);
        });
    };

    const calculateSummary = (data) => {
        let income = 0;
        let expense = 0;
        data.forEach(t => {
            if (t.type === 'INCOME') income += t.amount;
            else expense += t.amount;
        });
        setSummary({ income, expense, total: income - expense });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !amount) return alert("Preencha todos os campos!");

        const newTransaction = {
            description,
            amount: parseFloat(amount),
            type,
            date: new Date().toISOString().split('T')[0]
        };

        try {
            await api.post('/transactions', newTransaction);
            setDescription('');
            setAmount('');
            loadTransactions(); 
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Tem certeza que deseja excluir?");
        if (!confirm) return;

        try {
            await api.delete(`/transactions/${id}`);
            loadTransactions(); 
        } catch (error) {
            console.error("Erro ao deletar:", error);
        }
    };

    // --- DADOS PARA O GRÁFICO ---
    const chartData = [
        { name: 'Entradas', value: summary.income },
        { name: 'Saídas', value: summary.expense },
    ];
    
    // Cores do gráfico (Verde e Vermelho)
    const COLORS = ['#2ecc71', '#e74c3c'];

    return (
        <div className="container">
            {/* Placar de Saldos */}
            <div className="summary-board">
                <div className="box">
                    <h3>Entradas</h3>
                    <p className="income-text">R$ {summary.income.toFixed(2)}</p>
                </div>
                <div className="box">
                    <h3>Saídas</h3>
                    <p className="expense-text">R$ {summary.expense.toFixed(2)}</p>
                </div>
                <div className="box total-box">
                    <h3>Saldo Total</h3>
                    <p>R$ {summary.total.toFixed(2)}</p>
                </div>
            </div>

            {/* --- NOVO GRÁFICO DE PIZZA --- */}
            <div className="chart-container" style={{ width: '100%', height: 300, marginBottom: '2rem' }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Formulário */}
            <div className="form-box">
                <h3>Nova Transação</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder="Descrição (ex: Aluguel)" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder="Valor (R$)" 
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                    <select value={type} onChange={e => setType(e.target.value)}>
                        <option value="INCOME">Entrada</option>
                        <option value="EXPENSE">Saída</option>
                    </select>
                    <button type="submit">Adicionar</button>
                </form>
            </div>

            <h2>Últimas Movimentações</h2>
            <div className="transactions-list">
                {transactions.map(t => (
                    <div key={t.id} className={`card ${t.type === 'EXPENSE' ? 'expense-border' : 'income-border'}`}>
                        <div className="card-info">
                            <h3>{t.description}</h3>
                            <span className="date">{t.date}</span>
                        </div>
                        <div className="card-actions">
                            <span className={t.type === 'EXPENSE' ? 'expense-text' : 'income-text'}>
                                R$ {t.amount.toFixed(2)}
                            </span>
                            <button className="delete-btn" onClick={() => handleDelete(t.id)}>🗑️</button>
                        </div>
                    </div>
                )).reverse()}
            </div>
        </div>
    );
}

export default Dashboard;