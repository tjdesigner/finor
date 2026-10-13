import Modal from "react-modal";
import { TransactionLike } from "../../utils/paymentQueue";
import { EmptyState, ItemButton, ItemList, ModalBody } from "./styles";

interface AddPaymentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  dayLabel: string;
  availableItems: TransactionLike[];
  onSelect: (transactionId: string) => void;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function AddPaymentModal({
  isOpen,
  onRequestClose,
  dayLabel,
  availableItems,
  onSelect,
}: AddPaymentModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        aria-label="Fechar"
      >
        ×
      </button>

      <ModalBody>
        <h2>Adicionar à fila — {dayLabel}</h2>
        <p>Escolha um débito do mês atual para quitar nesta data.</p>

        {availableItems.length === 0 ? (
          <EmptyState>
            Não há débitos disponíveis no mês atual. Cadastre saídas em Início
            ou remova itens de outra data da fila.
          </EmptyState>
        ) : (
          <ItemList>
            {availableItems.map((item) => (
              <li key={item.id}>
                <ItemButton
                  type="button"
                  onClick={() => {
                    onSelect(item.id);
                    onRequestClose();
                  }}
                >
                  <strong>{item.title}</strong>
                  <span>
                    {item.category} · {formatCurrency(item.amount)}
                  </span>
                </ItemButton>
              </li>
            ))}
          </ItemList>
        )}
      </ModalBody>
    </Modal>
  );
}
