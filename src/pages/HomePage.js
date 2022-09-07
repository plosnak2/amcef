import Header from "../Components/Header";
import GridComp from "../Components/Grid";
import { ListsRef } from "../firebase"
import { useState, useEffect } from "react";
import CircularIndeterminate from "../Components/Loader";

export default function HomePage() {
    const [loaded, setLoaded] = useState(false)
    const [lists, setLists] = useState([])

    useEffect( () => {
        async function fetchData() {
            const snapshot = await ListsRef.get();
            const tempLists = []
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(doc => {
                tempLists.push(doc.data())
            });
            setLists(tempLists)
            setLoaded(true)
        }
        if(loaded === false){
            fetchData()
        }
        
    }, [lists, loaded])

    if(!loaded){
        return(
            <div>
                <Header />
                <CircularIndeterminate />
            </div>
            
        )
    } else {
        return (
            <div>
              <Header />
              <GridComp lists={lists}/>
            </div>
          );
    }

    
  }