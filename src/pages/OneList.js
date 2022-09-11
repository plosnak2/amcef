import * as React from 'react';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Header from "../Components/Header";
import CircularIndeterminate from "../Components/Loader";
import { ListsRef } from '../firebase';
import OneListBox from '../Components/OneListBox';
import { ConfirmProvider } from 'material-ui-confirm';
import { useNavigate } from 'react-router-dom'

export default function OneList(route) {
    const params = useLocation();
    const [list, setList] = useState()
    const [loaded, setLoaded] = useState(false)
    const [searchItem, setSearchItem] = useState('')
    const navigate = useNavigate();

    // fetching data about that particular list while entering subpage /list
    useEffect(() => {
        // if someone tries to enter subpage "/list" manually it will redirect him back onto homepage with lists
        if(params.state === null){
            navigate('/')
        } else {
            ListsRef.doc(params.state.listName).get()
            .then((doc) => {
                setList(doc.data())
                setLoaded(true)
            })
        }
    }, [params.state, navigate])

    if(!loaded){
        return(
            <div>
                <Header searchItem={searchItem} setSearchItem={setSearchItem}/>
                <CircularIndeterminate />
            </div>
        )
    } else{
        return(
            <ConfirmProvider>
                <Header searchItem={searchItem} setSearchItem={setSearchItem}/>
                <OneListBox list={list} searchItem={searchItem}/>
            </ConfirmProvider>
        )
    }
}
