import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Item from './Item';
import TopBar from './Tops/TopBar';
import InsertButton from './Support/InsertProductButton';
import CartContext from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import dotenv from 'dotenv';
dotenv.config();

export default function MarketPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [cart, setCart] = useState([]);

  const context = useContext(UserContext);
  const userMaster = context.user.user;

  useEffect(() => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    
    const request = axios.get(process.env.REACT_APP_API_BASE_URL+`/products`, config);

    request.then(response => {
      setItems(response.data);
    });

    request.catch(error => {
      console.log(error);
    });
  }, []);

  function addToCart(item) {
    setCart([...cart, item]);
  }

  const sumPrices = cart.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
  const buyedItems = cart.map(item => item.name).reduce((prev, curr) => prev +  curr + ", ", "");
  
  function BuyItems(){
      function finalizarPedido(){
        let nome=userMaster.name;
          
        let t5=encodeURIComponent("\nOla, me chamo " + nome+ " minha duvida é:"); 
        window.open("https://wa.me/+5547996993721?text="+t5);
      }
      finalizarPedido()
  }

  function buildItems() {
    if (items) {
      return items.map(item => <Item key={item.id} item={item} />);
    }

    return 'Não há items a serem visualizados!';
  }

  if(userMaster.name==="master"){
    return (
      

    
      <CartContext.Provider value={{ cart, addToCart }}>
      <Margin>
      <TopBar />
        <Container>
          <InsertButton onClick={()=>navigate("/createproduct")} >Inserir mais produtos</InsertButton  >
          <InsertButton onClick={()=>navigate("/associate")} >Cadastrar Etiquetas</InsertButton  >
          <ScrollY>
          {buildItems()}
          </ScrollY>
        </Container>
      </Margin>
    </CartContext.Provider>
    
    )
  }
  else{
    return (
      <CartContext.Provider value={{ cart, addToCart }}>
        <Margin>
        <TopBar />
          <Container>
            
            <button onClick={BuyItems}> Suporte via WhatsApp</button>
            <button > Veja os produtos disponíveis abaixo!</button>
            {buildItems()}
          </Container>
        </Margin>
      </CartContext.Provider>
    );
  }

  
}
const ScrollY = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100px;
  overflow-y: scroll;
`;

const Margin = styled.div`
  margin-top: 100px;
  background-color: #38b6ff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  h1{
    font-size: 15px;
  }
  align-items: center;
  margin-top: 100px;
  padding: 20px;
  background-color: #bee1f4;
  button{
    height: 50px;
    width: 100%;
    background-color: ${props =>
      typeof props.active !== 'boolean' || props.active ? "#FFFFFF" : '#FFFFFF'};
    color: #38b6ff;
    font-weight: bold;
    font-size: medium;
    font-family: 'Lexend Deca', sans-serif;
    padding: 14px;
    ${props => !props.noMargin && 'margin-bottom: 10px;'}
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    cursor: pointer;
  }
`;
