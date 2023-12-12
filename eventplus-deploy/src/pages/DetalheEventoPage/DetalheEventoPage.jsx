import React, { useEffect, useState } from 'react';
import MainContent from '../../components/MainContent/MainContent';
import Title from '../../components/Title/Title';
import api, { eventsResource, eventsTypeResource, institutionResource } from '../../Services/Service';
import Spinner from "../../components/Spinner/Spinner";


const DetalheEventoPage = () => {
    
    const [showSpinner, setShowSpinner] = useState(false);
    const [eventos, setEventos] = useState([]);
 // READ - LIFE CICLE - Carrega os tipos de evento no carregamento do componente
 useEffect(() => {
    async function loadEventsType() {
      setShowSpinner(true);

      try {
        const promise = await api.get(eventsResource);
        const promiseTipoEventos = await api.get(eventsTypeResource);
        const promiseInstituicao = await api.get(institutionResource);
        
        setEventos(promise.data);
      } catch (error) {}
      setShowSpinner(false);
    }

    loadEventsType();
  }, []); //frmEdit[instituicao ]



    return (
        <MainContent>   
            <Title titleText={"Detalhes Evento"}/>
            <section>
                
            </section>
        </MainContent>
    );
};

export default DetalheEventoPage;