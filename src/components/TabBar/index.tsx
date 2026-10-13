import { Container, TabButton } from "./styles";

export type AppTab = "inicio" | "fila";

interface TabBarProps {
  activeTab: AppTab;
  onChange: (tab: AppTab) => void;
}

export function TabBar({ activeTab, onChange }: TabBarProps) {
  return (
    <Container role="tablist" aria-label="Navegação principal">
      <TabButton
        type="button"
        role="tab"
        aria-selected={activeTab === "inicio"}
        isActive={activeTab === "inicio"}
        onClick={() => onChange("inicio")}
      >
        Início
      </TabButton>
      <TabButton
        type="button"
        role="tab"
        aria-selected={activeTab === "fila"}
        isActive={activeTab === "fila"}
        onClick={() => onChange("fila")}
      >
        Fila
      </TabButton>
    </Container>
  );
}
