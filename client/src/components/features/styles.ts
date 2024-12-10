import styled from "styled-components";

export const FeaturesContainer = styled.div`
    padding: 2rem;
    max-width: 900px;
    margin: 2rem auto;
    background-color: ${props => props.theme.colors.bg2};
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;

    h2 {
        text-align: center;
        margin-bottom: 1rem;
        color: #333;
    }

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;

        div {
            display: flex;
            align-items: center;
            color: #555;
            font-size: 1.2rem;

            p {
                color: #4b692a;
                font-weight: bold;
            }

            .icon {
                font-size: 2rem;
                margin-right: 0.5rem;
                color: #333;
            }
        }
    }


`;