import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

interface ITransaction{
    id: number,
    title: string,
    amount: number,
    type: string,
    createdAt: Date,
}

export function TransactionTable() {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        async function loadTransactions() {
            const response = await api.get('/transactions')
            setTransactions(response.data.transactions)
        }

        loadTransactions();
    }, [])

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {transaction.type === 'withdraw' ? '-' : ''}    
                                R$: {transaction.amount}
                            </td>
                            <td>{transaction.type}</td>
                            <td>{transaction.createdAt}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </Container>
    )
}