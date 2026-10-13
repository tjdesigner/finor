import { useState } from "react";
import { usePaymentQueue } from "../../hooks/usePaymentQueue";
import { useTransactions } from "../../hooks/useTransactions";
import {
  PAYMENT_DAYS,
  PaymentDay,
  getAvailableWithdraws,
  paymentDayTitle,
  resolveQueuedTransactions,
} from "../../utils/paymentQueue";
import { AddPaymentModal } from "./AddPaymentModal";
import { PaymentDayBox } from "./PaymentDayBox";
import { Container, Intro, Stack } from "./styles";

export function Fila() {
  const { transactions } = useTransactions();
  const { queue, addToDay, removeFromDay } = usePaymentQueue();
  const [selectedDay, setSelectedDay] = useState<PaymentDay | null>(null);

  const availableItems = getAvailableWithdraws(transactions, queue);

  return (
    <Container>
      <Intro>
        <h1>Fila de pagamentos</h1>
        <p>
          Organize quais débitos do mês atual serão quitados nos dias 10, 15 e
          30.
        </p>
      </Intro>

      <Stack>
        {PAYMENT_DAYS.map((day) => (
          <PaymentDayBox
            key={day}
            day={day}
            items={resolveQueuedTransactions(transactions, queue[day])}
            onAddClick={() => setSelectedDay(day)}
            onRemove={(transactionId) => removeFromDay(day, transactionId)}
          />
        ))}
      </Stack>

      <AddPaymentModal
        isOpen={selectedDay !== null}
        onRequestClose={() => setSelectedDay(null)}
        dayLabel={selectedDay ? paymentDayTitle(selectedDay) : ""}
        availableItems={availableItems}
        onSelect={(transactionId) => {
          if (selectedDay !== null) {
            addToDay(selectedDay, transactionId);
          }
        }}
      />
    </Container>
  );
}
