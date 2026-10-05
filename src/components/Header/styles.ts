import styled from 'styled-components';

export const Container = styled.header`
    background: var(--blue);
`;

export const Content = styled.header`
    max-width: 1120px;
    margin: 0 auto;
    padding: 2rem 1rem 12rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        max-width: 140px;
    }

    div {
        display: flex;
        gap: 1rem;
    }

    button,
    a {
        font-size: 1rem;
        color: #fff;
        background: var(--blue-light);
        border: 0;
        padding: 0 1rem;
        border-radius: .25rem;
        height: 3rem;
        transition: 0.2s;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        &:hover {
            filter: brightness(0.9);
        }
    }
`;