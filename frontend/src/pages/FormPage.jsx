import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {InputGroup} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
 
import api from '../api/client'



export default function FormPage(){
      const [form, setForm] = useState({
  name: '',
  location: '',
  price: ''
});
const navigate=useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  try{

    const res=await api.post('/api/first',form);


    //     setData(prev => [...prev, res.data.data]); // immediately update list
    // setForm({ name:'', location:'', price:'' });
  navigate('/display')
}
  catch(e){console.error(e);
  }}
    
    return(
        <div>
            <div>
      <div style={{ padding: "20px" }}>
      <h2>Add Customer</h2>
      <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                Name
                </InputGroup.Text>
                <Form.Control
                type="text"
                placeholder="Name"
                name='name'
                value={form.name}
                onChange={(e) => setForm({...form,[e.target.name]:e.target.value})}
                aria-label="Name"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          price
        </InputGroup.Text>
        <Form.Control
        type="number"
          placeholder="Price"
          name='price'
          value={form.price}
          onChange={(e) => setForm({...form,[e.target.name]:e.target.value})}
          aria-label="price"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          location
        </InputGroup.Text>
        <Form.Control
        type="text"
          placeholder="Location"
          name='location'
          value={form.location}
          onChange={(e) => setForm({...form,[e.target.name]:e.target.value})}
          aria-label="location"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
        <button type="submit">Send to Backend</button>
      </Form>
    </div>
    </div>

        </div>
    )
}