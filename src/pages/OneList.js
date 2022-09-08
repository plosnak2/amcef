import * as React from 'react';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Header from "../Components/Header";
import CircularIndeterminate from "../Components/Loader";
import { ListsRef } from '../firebase';
import OneListBox from '../Components/OneListBox';
import { ConfirmProvider } from 'material-ui-confirm';

export default function OneList(route) {
    const params = useLocation();
    const [list, setList] = useState()
    const [loaded, setLoaded] = useState(false)
    const [searchItem, setSearchItem] = useState('')

    useEffect(() => {
        ListsRef.doc(params.state.listName).get()
        .then((doc) => {
            setList(doc.data())
            setLoaded(true)
        })
    }, [])

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
