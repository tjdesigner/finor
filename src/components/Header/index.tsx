

import logoImg from "./../../assets/logo.svg";
import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
  onOpenApp: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt-money" />
        <button onClick={onOpenNewTransactionModal} type="button">Nova transação</button>
        <button onClick={onOpenApp} type="button">OpenApp</button>
      </Content>
    </Container>
  );
}
