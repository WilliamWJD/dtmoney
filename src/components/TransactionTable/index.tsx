import { useEffect } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

export function TransactionTable(){
    useEffect(()=>{
        async function loadTransactions(){
            const response = await api.get('/transactions');
            console.log(response.data)
        }

        loadTransactions();
    },[])

    return(
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
                    <tr>
                        <td>Desenvolvimento de web site</td>
                        <td className="deposit">R$: 12.000,00</td>
                        <td>Desenvolvimento</td>
                        <td>20/02/2021</td>
                    </tr>
                    <tr>
                        <td>Aluguél</td>
                        <td className="withdraw">- R$: 750.00</td>
                        <td>Moradia</td>
                        <td>20/02/2021</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    )
}