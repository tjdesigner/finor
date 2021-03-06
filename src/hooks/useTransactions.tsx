import { createContext, ReactNode, useState, useContext } from 'react'

interface TransactionProps {
    id: string
    title: string
    amount: number
    type: string
    category: string
    createdAt: Date
}

type TransactionInput = TransactionProps

interface TrasactionsProviderProps {
    children: ReactNode
}

interface TransactionsContextData {
    transactions: TransactionProps[]
    createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({children}: TrasactionsProviderProps) {
    const [transactions, setTransactions] = useLocalStorage<TransactionProps[]>("transactions", []);
    async function createTransaction(transactionInput: TransactionInput) {
        localStorage.setItem("transactions", JSON.stringify(transactionInput))
        setTransactions([...transactions, transactionInput])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)
    return context
}

/// Hook
export function useLocalStorage<T>(key: string, initialValue: T) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue] as const;
  }