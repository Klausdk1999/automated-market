import { useContext } from 'react';
import styled from 'styled-components';
import CartContext from '../contexts/CartContext';

import Button from './Support/Button';

export default function Item({ item }) {
  const { cart, addToCart } = useContext(CartContext);
  const { name, description, image, price } = item;

  return (
    <Container>
      <div className="left">
        <div>
          <Title>{name}</Title>
          <Description>{description}</Description>
        </div>
        <Price>
          <span >R$</span> {price.toFixed(2).replace('.', ',')}
        </Price>
      </div>

      <div className="right">
        <img src={image} alt={name} />
        {cart.includes(item) ? (
          'Adicionado'
        ) : (
          <Button noMargin onClick={() => addToCart(item)}>
            Adicionar produto
          </Button>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 2px;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-right: 10px;
  }

  .right {
    flex-shrink: 0;
    width: 128px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      height: 70px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 10px;
    }
  }

  :not(:last-of-type) {
    border-bottom: 2px solid black;
  }
`;

const Title = styled.div`
  font-size: 20px;
  color: black;
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-size: 16px;
  color: #222222;
`;

const Price = styled.div`
  font-size: 20px;
  color: #222222;
  padding-bottom: 20px;

  .unit {
    color: #ff441f;
  }
`;
