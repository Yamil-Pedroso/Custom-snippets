import styled from "styled-components";

export const FeaturesContainer = styled.div`
     display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 2rem;
    margin: 2rem auto;
    border-radius: 8px;
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
                color: #ff7226;
            }

            .icon {
                font-size: 2rem;
                margin-right: 0.5rem;
                color: #333;
            }
        }
    }


`;
