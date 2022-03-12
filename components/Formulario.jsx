import styled from "@emotion/styled";

export const ConjuntoCampo = styled.fieldset`
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
`;

export const Campo = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }

  input,
  textarea {
    flex: 1;
    padding: 1rem;    
  }

  textarea {
        height: 400px;
  }
`;

export const InputSubmit = styled.input`
  background-color: var(--primary);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: 1px solid var(--primary);
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  transition: background-color 0.5s ease;

  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: var(--primary);
    border: 1px solid var(--primary);
  }
`;