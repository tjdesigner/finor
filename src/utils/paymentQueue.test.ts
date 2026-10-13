import {
  assignTransactionToDay,
  createEmptyQueue,
  getAvailableWithdraws,
  getCurrentMonthWithdraws,
  getMonthKey,
  paymentDayTitle,
  removeTransactionFromDay,
  resolveQueuedTransactions,
} from "./paymentQueue";

const now = new Date(2026, 9, 5);

function tx(
  overrides: Partial<{
    id: string;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: Date;
  }> = {}
) {
  return {
    id: "1",
    title: "Aluguel",
    amount: 1200,
    type: "withdraw",
    category: "Moradia",
    createdAt: now,
    ...overrides,
  };
}

describe("paymentQueue utils", () => {
  it("builds month key as YYYY-MM", () => {
    expect(getMonthKey(now)).toBe("2026-10");
  });

  it("filters only withdraws from the current month", () => {
    const transactions = [
      tx({ id: "a", title: "Aluguel" }),
      tx({
        id: "b",
        title: "Salário",
        type: "deposit",
        amount: 5000,
      }),
      tx({
        id: "c",
        title: "Conta antiga",
        createdAt: new Date(2026, 8, 10),
      }),
    ];

    expect(getCurrentMonthWithdraws(transactions, now).map((item) => item.id)).toEqual([
      "a",
    ]);
  });

  it("assigns a transaction to a day and keeps it unavailable elsewhere", () => {
    const queue = assignTransactionToDay(createEmptyQueue(), 10, "a");
    const next = assignTransactionToDay(queue, 15, "a");

    expect(queue[10]).toEqual(["a"]);
    expect(next[15]).toEqual([]);
    expect(next[10]).toEqual(["a"]);
  });

  it("removes a transaction from a day", () => {
    const queue = assignTransactionToDay(createEmptyQueue(), 30, "z");
    expect(removeTransactionFromDay(queue, 30, "z")[30]).toEqual([]);
  });

  it("returns available withdraws excluding already queued ones", () => {
    const transactions = [
      tx({ id: "a", title: "Aluguel" }),
      tx({ id: "b", title: "Internet", amount: 99 }),
    ];
    const queue = assignTransactionToDay(createEmptyQueue(), 10, "a");

    expect(
      getAvailableWithdraws(transactions, queue, now).map((item) => item.id)
    ).toEqual(["b"]);
  });

  it("resolves queued ids preserving order and skipping missing ones", () => {
    const transactions = [
      tx({ id: "a", title: "Aluguel" }),
      tx({ id: "b", title: "Internet", amount: 99 }),
    ];

    expect(
      resolveQueuedTransactions(transactions, ["b", "missing", "a"]).map(
        (item) => item.title
      )
    ).toEqual(["Internet", "Aluguel"]);
  });

  it("builds day titles in Portuguese", () => {
    expect(paymentDayTitle(10)).toBe("Pagamentos do dia 10");
    expect(paymentDayTitle(15)).toBe("Pagamentos do dia 15");
    expect(paymentDayTitle(30)).toBe("Pagamentos do dia 30");
  });
});
