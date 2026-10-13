import {
  PaymentDay,
  TransactionLike,
  paymentDayTitle,
} from "../../utils/paymentQueue";
import {
  AddButton,
  DayBox,
  DayHeader,
  EmptyState,
  QueuedItem,
  QueuedList,
  RemoveButton,
} from "./styles";

interface PaymentDayBoxProps {
  day: PaymentDay;
  items: TransactionLike[];
  onAddClick: () => void;
  onRemove: (transactionId: string) => void;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function PaymentDayBox({
  day,
  items,
  onAddClick,
  onRemove,
}: PaymentDayBoxProps) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <DayBox data-testid={`payment-day-${day}`}>
      <DayHeader>
        <div>
          <h2>{paymentDayTitle(day)}</h2>
          <span>{formatCurrency(total)}</span>
        </div>
      </DayHeader>

      {items.length === 0 ? (
        <EmptyState>Nenhum pagamento na fila deste dia.</EmptyState>
      ) : (
        <QueuedList>
          {items.map((item) => (
            <QueuedItem key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <span>
                  {item.category} · {formatCurrency(item.amount)}
                </span>
              </div>
              <RemoveButton
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`Remover ${item.title} da fila do dia ${day}`}
              >
                Remover
              </RemoveButton>
            </QueuedItem>
          ))}
        </QueuedList>
      )}

      <AddButton type="button" onClick={onAddClick}>
        Adicionar da lista do mês
      </AddButton>
    </DayBox>
  );
}
