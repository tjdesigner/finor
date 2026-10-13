export type PaymentDay = 10 | 15 | 30;

export const PAYMENT_DAYS: PaymentDay[] = [10, 15, 30];

export type TransactionLike = {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date | string;
};

export type PaymentQueueByDay = Record<PaymentDay, string[]>;

export function createEmptyQueue(): PaymentQueueByDay {
  return {
    10: [],
    15: [],
    30: [],
  };
}

export function getMonthKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function isSameMonth(
  value: Date | string,
  reference: Date = new Date()
): boolean {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth()
  );
}

export function getCurrentMonthWithdraws(
  transactions: TransactionLike[],
  reference: Date = new Date()
): TransactionLike[] {
  return transactions.filter(
    (transaction) =>
      transaction.type === "withdraw" &&
      isSameMonth(transaction.createdAt, reference)
  );
}

export function getAssignedTransactionIds(queue: PaymentQueueByDay): Set<string> {
  return new Set(PAYMENT_DAYS.flatMap((day) => queue[day]));
}

export function getAvailableWithdraws(
  transactions: TransactionLike[],
  queue: PaymentQueueByDay,
  reference: Date = new Date()
): TransactionLike[] {
  const assigned = getAssignedTransactionIds(queue);

  return getCurrentMonthWithdraws(transactions, reference).filter(
    (transaction) => !assigned.has(transaction.id)
  );
}

export function assignTransactionToDay(
  queue: PaymentQueueByDay,
  day: PaymentDay,
  transactionId: string
): PaymentQueueByDay {
  const assigned = getAssignedTransactionIds(queue);
  if (assigned.has(transactionId)) {
    return queue;
  }

  if (queue[day].includes(transactionId)) {
    return queue;
  }

  return {
    ...queue,
    [day]: [...queue[day], transactionId],
  };
}

export function removeTransactionFromDay(
  queue: PaymentQueueByDay,
  day: PaymentDay,
  transactionId: string
): PaymentQueueByDay {
  return {
    ...queue,
    [day]: queue[day].filter((id) => id !== transactionId),
  };
}

export function resolveQueuedTransactions(
  transactions: TransactionLike[],
  ids: string[]
): TransactionLike[] {
  const byId = new Map(transactions.map((transaction) => [transaction.id, transaction]));

  return ids
    .map((id) => byId.get(id))
    .filter((transaction): transaction is TransactionLike => Boolean(transaction));
}

export function paymentDayTitle(day: PaymentDay): string {
  return `Pagamentos do dia ${day}`;
}
