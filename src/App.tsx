import React, { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Fila } from "./components/Fila";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { AppTab, TabBar } from "./components/TabBar";
import { PaymentQueueProvider } from "./hooks/usePaymentQueue";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement("#root");

const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

if (IS_MOBILE) {
  console.log("mobile device");
} else {
  console.log("not mobile device");
}

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>("inicio");

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <PaymentQueueProvider>
        <Header
          onOpenNewTransactionModal={handleOpenNewTransactionModal}
          isMobile={IS_MOBILE}
        />
        {activeTab === "inicio" ? <Dashboard /> : <Fila />}
        <TabBar activeTab={activeTab} onChange={setActiveTab} />
        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestCLose={handleCloseNewTransactionModal}
        />
        <GlobalStyle />
      </PaymentQueueProvider>
    </TransactionsProvider>
  );
}
