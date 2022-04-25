import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {getComic, getCharacter, clearError, status, setStatus} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComic(id).then(onDataLoaded).then(() => setStatus('confirmed'));
                    break;
                case 'character':
                    getCharacter(id).then(onDataLoaded).then(() => setStatus('confirmed'));
                    break;
                default : ;
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        return (
            <>
                <AppBanner/>
                {setContent(status, Component, data)}
            </>
        )
}

export default SinglePage;