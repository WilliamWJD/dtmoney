import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';

interface ITransaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    createdAt: Date,
}

interface TransactionsProviderProps{
    children: ReactNode
}

export const TransactionsContext = createContext<ITransaction[]>([]);

export function TransactionsProvider({ children }:TransactionsProviderProps){
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        async function loadTransactions() {
            const response = await api.get('/transactions')
            setTransactions(response.data.transactions)
        }

        loadTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={transactions}>
            {children}
        </TransactionsContext.Provider>
    )
}