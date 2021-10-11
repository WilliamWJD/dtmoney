import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

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
    createTransaction:(transaction: TransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        async function loadTransactions() {
            const response = await api.get('/transactions')
            setTransactions(response.data.transactions)
        }

        loadTransactions();
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context
}