import React, { useContext, useEffect, useState } from 'react';
import MainContent from '../../components/MainContent/MainContent';
import Title from '../../components/Title/Title';
import api, { commentaryEventResource, commentaryExibEventResource, eventsResource, eventsTypeResource, institutionResource } from '../../Services/Service';
import Spinner from "../../components/Spinner/Spinner";
import { useParams } from 'react-router-dom';
import { truncateDateFromDb } from '../../Utils/stringFunctions';
import Table from './TableDe/TableDe';
import Container from '../../components/Container/Container';

import "./DetalheEventoPage.css";
import { UserContext } from '../../context/AuthContext';
import Notification from '../../components/Notification/Notification';


const DetalheEventoPage = () => {
  const { userData } = useContext(UserContext);

  const { idEvento } = useParams(); // Retrieve idEvento from route parameters
  const [showSpinner, setShowSpinner] = useState(false);
  // const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [comentariosExibe, setComentariosExibe] = useState([]);

  const [notifyUser, setNotifyUser] = useState({}); //Componente Notification
  // READ - LIFE CICLE - Carrega os tipos de evento no carregamento do componente
  useEffect(() => {
    async function loadEventsType() {
      setShowSpinner(true);

      try {
        // const promise = await api.get(eventsResource);
        const buscaEventos = await api.get(`${eventsResource}/${idEvento}`);
        const comentariosPromise = await api.get(`${commentaryEventResource}?id=${idEvento}`)
        const comentariosExibePromise = await api.get(`${commentaryExibEventResource}?id=${idEvento}`)
        // const promiseTipoEventos = await api.get(eventsTypeResource);
        // const promiseInstituicao = await api.get(institutionResource);

        // setEventos(promise.data);
        setEvento(buscaEventos.data);
        setComentarios(comentariosPromise.data);
        setComentariosExibe(comentariosExibePromise.data);
      } catch (error) { }
      setShowSpinner(false);
    }

    loadEventsType();
  }, [idEvento]); //frmEdit[instituicao ]

 // DELETE
 async function handleDelete(idElemento) {
  if (!window.confirm("Confirma Exclusão?")) {
    return; //retorna a função sem executar o restante do código
  }

  setShowSpinner(true);
  try {
    const promise = await api.delete(`${commentaryEventResource}/${idElemento}`);

    if (promise.status === 204) {
      setNotifyUser({
        titleNote: "Sucesso!",
        textNote: "Comentário excluído com sucesso!",
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      const buscaComentario = await api.get(`${commentaryExibEventResource}?id=${idEvento}`)
      // console.log(buscaEventos.data);
      setComentariosExibe(buscaComentario.data); //aqui retorna um array, então de boa!
    } else {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `O servidor bitolou, verifique se o Evento foi apagado corretamente`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
        showMessage: true,
      });
      throw new Error(
        "O servidor bitolou, verifique se o Evento foi apagado corretamente"
      );
    }
  } catch (error) {
    setNotifyUser({
      titleNote: "Erro",
      textNote: `Problemas ao apagar`,
      imgIcon: "danger",
      imgAlt:
        "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
      showMessage: true,
    });
    throw new Error(`Problemas ao apagar: ${error}`);
  }
  setShowSpinner(false);
}

  return (
    <MainContent>
      <section className="section-detalhes">
        <Container>
          <div className="align">
            <Title titleText={"Detalhes do Evento"} />
            <section className="card-detalhe">
              <section className='detalhes-evento'>
                <p className='card-detalhe--title'>Nome do Evento: {evento.nomeEvento}</p>
                <p className='card-detalhe--description'>Descrição do Evento: {evento.descricao}</p>
                <p className='card-detalhe--description'>Data do Evento: {new Date(evento.dataEvento).toLocaleDateString()}</p>
              </section>
            </section>
          </div>
        </Container>
      </section>
      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista de Comentários"} color="white" />
          {userData.nome && userData.role === "Administrador" ? (
            <>
              <Table
                dados={comentarios}
              fnDelete={handleDelete}
              // fnUpdate={showUpdateForm}
              />
            </>
          ) : userData.nome && userData.role === "Comum" ? (
            <Table
              dados={comentariosExibe}
            fnDelete={handleDelete}
            // fnUpdate={showUpdateForm}
            />
          ) : null}

        </Container>
      </section>
            {/* CARD NOTIFICATION */}
            {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
    </MainContent>

);
};

export default DetalheEventoPage;