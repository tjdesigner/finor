import { createContext, ReactNode, useContext } from "react";
import {
  assignTransactionToDay,
  createEmptyQueue,
  getMonthKey,
  PaymentDay,
  PaymentQueueByDay,
  removeTransactionFromDay,
} from "../utils/paymentQueue";
import { useLocalStorage } from "./useTransactions";

type StoredPaymentQueue = {
  monthKey: string;
  days: PaymentQueueByDay;
};

interface PaymentQueueContextData {
  monthKey: string;
  queue: PaymentQueueByDay;
  addToDay: (day: PaymentDay, transactionId: string) => void;
  removeFromDay: (day: PaymentDay, transactionId: string) => void;
}

interface PaymentQueueProviderProps {
  children: ReactNode;
}

const PaymentQueueContext = createContext<PaymentQueueContextData>(
  {} as PaymentQueueContextData
);

function normalizeStoredQueue(
  stored: StoredPaymentQueue | PaymentQueueByDay | null | undefined,
  monthKey: string
): PaymentQueueByDay {
  if (!stored) {
    return createEmptyQueue();
  }

  if ("monthKey" in stored && "days" in stored) {
    if (stored.monthKey !== monthKey) {
      return createEmptyQueue();
    }

    return {
      ...createEmptyQueue(),
      ...stored.days,
    };
  }

  return {
    ...createEmptyQueue(),
    ...(stored as PaymentQueueByDay),
  };
}

export function PaymentQueueProvider({ children }: PaymentQueueProviderProps) {
  const monthKey = getMonthKey();
  const [stored, setStored] = useLocalStorage<StoredPaymentQueue>("payment-queue", {
    monthKey,
    days: createEmptyQueue(),
  });

  const queue = normalizeStoredQueue(stored, monthKey);

  function persist(nextQueue: PaymentQueueByDay) {
    setStored({
      monthKey,
      days: nextQueue,
    });
  }

  function addToDay(day: PaymentDay, transactionId: string) {
    persist(assignTransactionToDay(queue, day, transactionId));
  }

  function removeFromDay(day: PaymentDay, transactionId: string) {
    persist(removeTransactionFromDay(queue, day, transactionId));
  }

  return (
    <PaymentQueueContext.Provider
      value={{ monthKey, queue, addToDay, removeFromDay }}
    >
      {children}
    </PaymentQueueContext.Provider>
  );
}

export function usePaymentQueue() {
  return useContext(PaymentQueueContext);
}
