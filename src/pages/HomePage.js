import Header from "../Components/Header";
import GridComp from "../Components/Grid";
import { ListsRef } from "../firebase"
import { useState, useEffect } from "react";
import CircularIndeterminate from "../Components/Loader";
import { ConfirmProvider } from 'material-ui-confirm';

export default function HomePage() {
    const [loaded, setLoaded] = useState(false)
    const [lists, setLists] = useState([])

    // fetching data from firebase database (information about lists)
    useEffect( () => {
        async function fetchData() {
            const snapshot = await ListsRef.get();
            const tempLists = []
            if (snapshot.empty) {
                // TODO dorobit ked nebudu žiadne listy
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(doc => {
                tempLists.push(doc.data())
            });
            setLists(tempLists)
            setLoaded(true)
        }

        // if my data are already loaded i don´t need to revoke useEffect again
        if(loaded === false){
            fetchData()
        }
        
    }, [lists, loaded])

    // function that is sent to Grid Component so when the one of the list is deleted re-render happens
    function listDeleted(){
        setLoaded(false)
    }

    if(!loaded){
        return(
            <div>
                <Header />
                <CircularIndeterminate />
            </div>
            
        )
    } else {
        return (
            <ConfirmProvider>
              <Header />
              <GridComp lists={lists} listDeleted={listDeleted}/>
            </ConfirmProvider>
          );
    }

    
  }