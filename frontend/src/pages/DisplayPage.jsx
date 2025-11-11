import { useEffect,useState } from "react";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export default function DisplayPage(){
     const [customers, setCustomers] = useState([]);
     useEffect(()=>{
    axios
    .get(`${API_URL}/api`)
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