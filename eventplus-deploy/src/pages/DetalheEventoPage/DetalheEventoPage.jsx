import React, { useEffect, useState } from 'react';
import MainContent from '../../components/MainContent/MainContent';
import Title from '../../components/Title/Title';
import api, { commentaryEventResource, eventsResource, eventsTypeResource, institutionResource } from '../../Services/Service';
import Spinner from "../../components/Spinner/Spinner";
import { useParams } from 'react-router-dom';
import { truncateDateFromDb } from '../../Utils/stringFunctions';
import Table from './TableDe/TableDe';
import Container from '../../components/Container/Container';


const DetalheEventoPage = () => {
  const { idEvento } = useParams(); // Retrieve idEvento from route parameters
  const [showSpinner, setShowSpinner] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  // READ - LIFE CICLE - Carrega os tipos de evento no carregamento do componente
  useEffect(() => {
    async function loadEventsType() {
      setShowSpinner(true);

      try {
        const promise = await api.get(eventsResource);
        const buscaEventos = await api.get(`${eventsResource}/${idEvento}`);
        const comentariosPromise = await api.get(`${commentaryEventResource}`)
        // const promiseTipoEventos = await api.get(eventsTypeResource);
        // const promiseInstituicao = await api.get(institutionResource);

        setEventos(promise.data);
        setEvento(buscaEventos.data);
        setComentarios(comentariosPromise.data)
      } catch (error) { }
      setShowSpinner(false);
    }

    loadEventsType();
  }, [idEvento]); //frmEdit[instituicao ]



  return (
    <MainContent>
          <Title titleText={"Detalhes Evento"} />
      <section className='detalhes-evento'>
        <Container>
          <p>Nome do Evento: {evento.nomeEvento}</p>
          <p>Descrição do Evento: {evento.descricao}</p>
          <p>Data do Evento: {new Date(evento.dataEvento).toLocaleDateString()}</p>
        </Container>
      </section>
      <section className="lista-eventos-section">
        <Container>
          <Table
            dados={comentarios}
          // fnDelete={handleDelete}
          // fnUpdate={showUpdateForm}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default DetalheEventoPage;