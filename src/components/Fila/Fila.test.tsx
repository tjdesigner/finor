import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fila } from "./index";
import { PaymentQueueProvider } from "../../hooks/usePaymentQueue";
import { TransactionsProvider } from "../../hooks/useTransactions";

const currentMonth = new Date();

const seedTransactions = [
  {
    id: "tx-aluguel",
    title: "Aluguel",
    amount: 1500,
    type: "withdraw",
    category: "Moradia",
    createdAt: currentMonth,
  },
  {
    id: "tx-internet",
    title: "Internet",
    amount: 120,
    type: "withdraw",
    category: "Casa",
    createdAt: currentMonth,
  },
  {
    id: "tx-salary",
    title: "Salário",
    amount: 5000,
    type: "deposit",
    category: "Renda",
    createdAt: currentMonth,
  },
];

function renderFila() {
  window.localStorage.setItem("transactions", JSON.stringify(seedTransactions));
  window.localStorage.removeItem("payment-queue");

  return render(
    <TransactionsProvider>
      <PaymentQueueProvider>
        <Fila />
      </PaymentQueueProvider>
    </TransactionsProvider>
  );
}

describe("Fila screen", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the three payment day boxes", () => {
    renderFila();

    expect(screen.getByText("Pagamentos do dia 10")).toBeInTheDocument();
    expect(screen.getByText("Pagamentos do dia 15")).toBeInTheDocument();
    expect(screen.getByText("Pagamentos do dia 30")).toBeInTheDocument();
  });

  it("adds a current-month withdraw to a day and removes it from availability", () => {
    renderFila();

    const day10 = screen.getByTestId("payment-day-10");
    userEvent.click(
      within(day10).getByRole("button", { name: /adicionar da lista do mês/i })
    );

    expect(screen.getByText("Aluguel")).toBeInTheDocument();
    expect(screen.getByText("Internet")).toBeInTheDocument();
    expect(screen.queryByText("Salário")).not.toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /aluguel/i }));

    expect(within(day10).getByText("Aluguel")).toBeInTheDocument();

    const day15 = screen.getByTestId("payment-day-15");
    userEvent.click(
      within(day15).getByRole("button", { name: /adicionar da lista do mês/i })
    );

    const picker = screen.getByRole("dialog");
    expect(within(picker).queryByRole("button", { name: /aluguel/i })).not.toBeInTheDocument();
    expect(within(picker).getByRole("button", { name: /internet/i })).toBeInTheDocument();
  });

  it("removes an item from the queue", () => {
    renderFila();

    const day30 = screen.getByTestId("payment-day-30");
    userEvent.click(
      within(day30).getByRole("button", { name: /adicionar da lista do mês/i })
    );
    userEvent.click(screen.getByRole("button", { name: /internet/i }));

    expect(within(day30).getByText("Internet")).toBeInTheDocument();

    userEvent.click(
      within(day30).getByRole("button", {
        name: /remover internet da fila do dia 30/i,
      })
    );

    expect(within(day30).queryByText("Internet")).not.toBeInTheDocument();
  });
});
