import { useEffect,useState } from "react";
import axios from 'axios';

import api from '../api/client'
export default function DisplayPage(){
     const [customers, setCustomers] = useState([]);
     useEffect(()=>{
    api
    .get('/')



    .then((res)=>{console.log(res);setCustomers(res.data)})
    .catch((e)=>{console.log(e);
       })

  },[])
return(
    <div>
        <h2>customer list</h2>
        {customers.map((c,i)=>(
            <div key={i}>
                <p><strong>{c.name}</strong> - {c.location} - ${c.price}</p>

            </div>
        ))}

    </div>
)

}