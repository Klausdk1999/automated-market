import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {React, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from "axios";
import GenericTopBar from "../Tops/GenericTopBar";
import { ThreeDots } from 'react-loader-spinner';
import dotenv from 'dotenv'; 

dotenv.config();

export default function RfidAssociate({ onCreateNewRecommendation = () => 0, disabled = false }) {
  const [code, setcode] = useState("");
  const [product_id, setproduct_id] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {token} = user;

  const [items, setItems] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

    function postRfid(event){

        event.preventDefault();
        setIsLoading(true);
        const postRfid={
          product_id: Number(product_id),
          code
        }
        console.log(postRfid);
        const promise=axios.post(process.env.REACT_APP_API_BASE_URL+"/associate", postRfid, config);

        promise.then(resposta => {
          alert("Associado")
          setcode("");
          setproduct_id("");
          setIsLoading(false);
        });

        promise.catch(error => {
            if(error){
            alert(error);
            window.location.reload()
            }
        });

        
    }

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

      console.log(items)


  return (
    <Container>
            <GenericTopBar></GenericTopBar>

            {isLoading ? (   
                <Form background={"#f2f2f2"} color={"#afafaf"} >
                    <input disabled type="text" id="name" placeholder="tag do produto" value={code} onChange={e => setcode(e.target.value)}/>
                    <input disabled type="text" id="name" placeholder="id do produto (consulte abaixo)" value={product_id} onChange={e => setproduct_id(e.target.value)}/>
                    <button disabled id="submit" opacity={0.7} >{<ThreeDots color={"#ffffff"} width={51} />}  </button>
                </Form>
            ):(
                <Form background={"#ffffff"} color={"#666666"} onSubmit={postRfid}>
                    <input type="text" id="name" placeholder="tag do produto" value={code} onChange={e => setcode(e.target.value)} disabled={disabled} />
                    <input type="text" id="name" placeholder="id do produto (consulte abaixo)" value={product_id} onChange={e => setproduct_id(e.target.value)} disabled={disabled} />
                    <button id="submit">Ler tag</button>
                </Form>
            )}
           
            <ItensRender>
                {items.map((item, index)=>(
                                    <Recommendation>
                                        <Titles>
                                            <h1>nome: {item.name}</h1>
                                            <h3>id do produto: {item.id}</h3>
                                            <h3>Pre??o: R${item.price} </h3>
                                        </Titles>
                                    </Recommendation>
                ))}
            </ItensRender>
            

            <Warning>
                <h3>
                Cuidado ao postar!
                </h3>
            </Warning>
            <Back onClick={()=>navigate("/market")}>
                Clique aqui para voltar
            </Back>
    </Container>
  );
}
const ItensRender=styled.div`
  overflow-y: scroll;
  max-height: 320px;
` 

const Recommendation = styled.div`
  margin-top: 8px;
  border: 2px solid black;
  min-width: 300px;
  min-height: 80px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-sizing: border-box;
  
  
  img{
    height: 100px;
    width: 100px;
  }
  h2{
    display: flex;
    flex-direction: row;
    font-size: 20px;
    h1{
      color:red;
      font-size: 20px;
      margin-right: 2px;
    }
  }
`
const Titles = styled.div`
  display: flex;
  flex-direction: column;
  h1{
    color:black;
    font-size: 15px;
  }
  h3{
    margin: 3px 3px 3px 0;
  }
`


const Rfid = styled.div`

    width: 80%;
    height: 20px;
`

const Back=styled.div`
    width: 100%;
    height: 40px;
    position: fixed;
    display: flex;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;

`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-bottom: 15px;
`;

const Warning =styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        font-size: 15px;
    }
    margin-top: 30px;
    h3{
        color: red;

    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    input {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        height: 45px;
        margin-right: 10px;
        margin-left: 10px;
        min-width:  100px;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px solid #D4D4D4; 
        padding-left:11px ;
        color: ${props => props.color};
        background-color: ${props => props.background};
    }
    input::placeholder {
        
        color: darkgray;
        font-size: 20px;
        font-style: italic;
    }
    button {
        font-weight: 700;
        min-width: 100px;
        height: 45px;
        margin-right: 10px;
        margin-left: 10px;
        text-align: center;
        background-color: black;
        color: #FFFFFF;
        font-size: 21px;
        border: none;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        a{
            text-decoration: none;
        }
        cursor: pointer;

    }
`