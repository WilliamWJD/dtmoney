import { useContext } from 'react';
import { TransactionsContext } from '../../TransactionsContext';
import { Container } from './styles';

export function TransactionTable() {
    const data = useContext(TransactionsContext)

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
                    {data.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {transaction.type === 'withdraw' ? '-' : ''}
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transaction.amount)}
                            </td>
                            <td>{transaction.type}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </Container>
    )
}