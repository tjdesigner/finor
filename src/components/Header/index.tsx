
import logoImg from "./../../assets/logo.svg";
import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
  isMobile: boolean;
}

export function Header({ onOpenNewTransactionModal, isMobile }: HeaderProps) {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt-money" />
        <div>
          <button onClick={onOpenNewTransactionModal} type="button">Nova transação</button>
          {isMobile && (
            <a href="viajeguanabara://">OpenApp</a>
          )}
        </div>
      </Content>
    </Container>
  );
}
