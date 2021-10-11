import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';

interface ITransaction {
    id: number,
    title: string,
    value: number,
    type: string,
    category:string;
    createdAt: Date,
}

interface TransactionInput{
    title: string,
    value: number,
    type: string,
    category:string;
}

interface TransactionsContextData{
    transactions: ITransaction[],
    createTransaction:(transaction: TransactionInput) => void;
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        async function loadTransactions() {
            const response = await api.get('/transactions')
            setTransactions(response.data.transactions)
        }

        loadTransactions();
    }, [])

    function createTransaction(transaction: TransactionInput) {
        api.post('/transactions', transaction);
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}