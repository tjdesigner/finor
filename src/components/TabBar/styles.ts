import styled from "styled-components";

export const Container = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding: 0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom));
  background: var(--shape);
  border-top: 1px solid #e5e7ef;
  box-shadow: 0 -4px 16px rgba(24, 2, 145, 0.06);
`;

interface TabButtonProps {
  isActive: boolean;
}

export const TabButton = styled.button<TabButtonProps>`
  height: 3rem;
  border: 0;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.isActive ? "#fff" : "var(--text-title)")};
  background: ${(props) =>
    props.isActive ? "var(--blue)" : "transparent"};
  transition: filter 0.2s, background 0.2s;

  &:hover {
    filter: brightness(0.96);
  }
`;
