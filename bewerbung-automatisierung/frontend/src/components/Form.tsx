import { useState } from "react"
import "../css/form.css"
 
 
 function Form() {

  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(false);

    const url = "http://localhost:5678/webhook-test/automatisierung"

    type Myschema = {
        vorname:string;
        nachname:string;
        email:string;
        Telefonnummer:string;
        position:string;
        sprache:string
    }

    const [data,setData] = useState<Myschema>({
            vorname:"",
            nachname:"",
            email:"",
            Telefonnummer:"",
            position:"Anwendungsentwickler",
            sprache:"Englisch"
    })

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setData(prev => ({
    ...prev,
   [name]: value,
  
  }));
  console.log(data.position)
};

const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setData(prev => ({
    ...prev,
    [e.target.name]:e.target.value
  }));
}


const fetchData = async (data: Myschema) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
 
     if (response.status === 200){
          setSuccess(true);

    setData({
    vorname:"",
    nachname:"",
    email:"",
    Telefonnummer:"",
    position:"Anwendungsentwickler",
    sprache:"Englisch"
        });
     }

  } catch(error) {
    console.log(error);
  }
};

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()      
        setLoading(true);   
        await fetchData(data)
        setLoading(false);
            
      
    }


  return (
    <>   


      <form onSubmit={(e)=>handleSubmit(e)} className="parent">
    {success === true && <p>Vielen Dank!</p>}
      <input type="text" title="name" placeholder="vorname" name="vorname" value={data.vorname}  onChange={(e)=>handleChange(e)} required/>
      <input type="text" title="name" placeholder="nachname" name="nachname" value={data.nachname}  onChange={(e)=>handleChange(e)} required/>
      <input type="email" title="email" placeholder="E-Mail" name="email" value={data.email}   onChange={(e)=>handleChange(e)} required/>
      <input type="text" title="nummer" placeholder="Telefonnummer" name="Telefonnummer" value={data.Telefonnummer}  onChange={(e)=>handleChange(e)} required/>
      <div>
        <label htmlFor="">Gewünschte position. </label>
 <select title="position" name="position" id="" value={data.position}  onChange={(e) => handleSelect(e)} >

<option value="Anwendungsentwickler">Anwendungsentwickler</option>
<option value="Designer">Designer</option>
<option value="Projektmanager">Projektmanager</option>
<option value="Marketing Spezialist">Marketing Spezialist</option>
<option value="Verkäufer">Verkäufer</option>
<option value="Ingenieur">Ingenieur</option>
<option value="Lehrer">Lehrer</option>
<option value="Arzt">Arzt</option>
<option value="Buchhalter">Buchhalter</option>
<option value="Jurist">Jurist</option>
       </select>
      </div>

      <div>

     <label htmlFor="">Kommunikationssprache.</label>
        <select title="sprache" name="sprache" id="" value={data.sprache} onChange={(e) => handleSelect(e)}>
          <option value="Englisch">Englisch</option>
          <option value="Deutsch">Deutsch</option>
          <option value="Spanisch">Spanisch</option>


       </select>

      </div>
      
             <button disabled={loading}>
          {loading ? "Senden..." : "Submit"}
              </button>
     </form>


     </>
  )
}

export default Form;
