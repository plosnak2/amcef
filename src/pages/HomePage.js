/**
 * Author: Jakub Zaukolec
 * This is component that displays homepage
 */
import Header from "../Components/Header";
import GridComp from "../Components/Grid";
import { ListsRef } from "../firebase"
import { useState, useEffect } from "react";
import CircularIndeterminate from "../Components/Loader";
import { ConfirmProvider } from 'material-ui-confirm';
import Box from '@mui/material/Box';
import NewListDialog from "../Components/NewListDialog";

export default function HomePage() {
    const [loaded, setLoaded] = useState(false)
    const [lists, setLists] = useState([])
    const [search, setSearch] = useState('')

    // fetching data from firebase database (information about lists)
    useEffect( () => {
        async function fetchData() {
            const snapshot = await ListsRef.get();
            const tempLists = []
            if (snapshot.empty) {
                setLoaded(true)
                return;
            }
            snapshot.forEach(doc => {
                tempLists.push(doc.data())
            });
            setLists(tempLists)
            setLoaded(true)
        }

        // if my data are already loaded i don´t need to fetch them again
        if(loaded === false){
            fetchData()
        }

        console.log(lists)
        
    }, [lists, loaded])

    // function that is sent to Grid Component so when the one of the list is deleted re-render happens with new array of lists
    function listDeleted(index){
        const reducedArr = [...lists]
        reducedArr.splice(index, 1);
        setLists(reducedArr)
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
              <Header search={search} setSearch={setSearch}/>
              <Box sx={{textAlign:"center", marginTop:"20px"}}>
                <NewListDialog />
              </Box>
              <GridComp lists={lists} listDeleted={listDeleted} search={search} setSearch={setSearch}/>
            </ConfirmProvider>
          );
    }
}