import { darken } from "polished";
import styled from "styled-components";

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1rem 7rem;
`;

export const Intro = styled.section`
  margin-top: -8rem;
  margin-bottom: 1.5rem;
  color: #fff;

  h1 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.85);
    max-width: 36rem;
    line-height: 1.5;
  }
`;

export const Stack = styled.section`
  display: grid;
  gap: 1.5rem;
`;

export const DayBox = styled.article`
  background: var(--shape);
  border-radius: 0.25rem;
  padding: 1.5rem;
  color: var(--text-title);
`;

export const DayHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7ef;

  h2 {
    font-size: 1.25rem;
    color: var(--text-title);
  }

  span {
    display: block;
    margin-top: 0.35rem;
    color: var(--red);
    font-weight: 600;
  }
`;

export const QueuedList = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const QueuedItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  background: var(--background);
  border-radius: 0.25rem;

  strong {
    display: block;
    color: var(--text-title);
  }

  span {
    display: block;
    margin-top: 0.25rem;
    color: var(--text-body);
    font-size: 0.9rem;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const RemoveButton = styled.button`
  border: 0;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  background: var(--red);
  color: var(--shape);
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.1, "#E52E4D")};
  }
`;

export const AddButton = styled.button`
  width: 100%;
  height: 3rem;
  border: 0;
  border-radius: 0.25rem;
  background: var(--blue-light);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const EmptyState = styled.p`
  color: var(--text-body);
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const ModalBody = styled.div`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: var(--text-body);
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

export const ItemList = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.75rem;
  max-height: 20rem;
  overflow-y: auto;
`;

export const ItemButton = styled.button`
  width: 100%;
  text-align: left;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;
  background: #e7e9ee;
  padding: 1rem 1.25rem;
  transition: border-color 0.2s, filter 0.2s;

  strong {
    display: block;
    color: var(--text-title);
  }

  span {
    display: block;
    margin-top: 0.25rem;
    color: var(--text-body);
  }

  &:hover {
    border-color: ${darken(0.1, "#D7D7D7")};
    filter: brightness(0.98);
  }
`;
