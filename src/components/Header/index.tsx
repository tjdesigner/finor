
import logoImg from "./../../assets/logo.svg";
import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt-money" />
        <div>
          <button onClick={onOpenNewTransactionModal} type="button">Nova transação</button>
          <a href="viajeguanabara://">OpenApp</a>
        </div>
      </Content>
    </Container>
  );
}
