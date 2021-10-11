import { useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';

import { TransactionsProvider } from './hooks/useTransactions';

import 'react-toastify/dist/ReactToastify.css';

import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <GlobalStyle />
      <ToastContainer />
      <Header
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
      />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <Dashboard />
    </TransactionsProvider>
  );
}