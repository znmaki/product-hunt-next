import styled from "@emotion/styled";

const Button = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;    
    padding: .8rem 2rem;
    margin: 2rem auto;
    text-align: center;
    background-color: ${props => props.bgColor ? '#da552f' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};

    &:last-of-type{
        border: 1px solid #d1d1d1;
        margin-right: 0;
    }

    &:hover{
        cursor: pointer;
    }
`;


export default Button;
