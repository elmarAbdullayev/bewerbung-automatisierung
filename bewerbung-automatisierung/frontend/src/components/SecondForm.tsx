import { useEffect, useState } from "react";
import "../css/form.css";

function Form() {

  const [success,setSuccess] = useState(false)

  const postData = "http://localhost:5678/webhook-test/aktualisierung";
  const getData = "http://localhost:5678/webhook-test/secondform";

  type Myschema = {
    vorname: string;
    nachname: string;
    email: string;
    Telefonnummer: string;
    arbeit: string;
    sprache: string;
    Gehaltsvorstellung: string;
    Eintrittstermin: string;
    Berufserfahrung: string;
    Selbstbeschreibung: string;
    Lebenslauf: File | null;
  };


  const [data, setData] = useState<Myschema>({
    vorname: "",
    nachname: "",
    email: "",
    Telefonnummer: "",
    arbeit: "Anwendungsentwickler",
    sprache: "Englisch",
    Gehaltsvorstellung: "",
    Eintrittstermin: "",
    Berufserfahrung: "",
    Selbstbeschreibung: "",
    Lebenslauf: null
  });


  const token = new URLSearchParams(window.location.search).get("token");


  type FirstForm = {
    vorname: string;
    nachname: string;
    email: string;
    telefonnummer: string;
    position:string;
    sprache:string;
  };


  useEffect(() => {


    const loadData = async () => {

      if (!token) return;

      try {

        const response = await fetch(getData, {
          method: "GET",
          headers: {
            Authorization: token
          }
        });


        if (!response.ok) {
          throw new Error("Fehler beim Laden");
        }


        const result: FirstForm | FirstForm[] = await response.json();


        const user = Array.isArray(result)
          ? result[0]
          : result;

         

        setData(prev => ({
          ...prev,
          vorname: user.vorname,
          nachname: user.nachname,
          email: user.email,
          Telefonnummer: user.telefonnummer,
          arbeit: user.position,
          sprache:user.sprache
        }));


      } catch(error) {
        console.log(error);
      }

    };


    loadData();

  }, [token]);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const {name,value} = e.target;


    setData(prev => ({
      ...prev,
      [name]: value
    }));

  };



  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0] ?? null;


    setData(prev => ({
      ...prev,
      Lebenslauf:file
    }));

  };



  const handleSelect = (
    e:React.ChangeEvent<HTMLSelectElement>
  ) => {

    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  };





const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {

  e.preventDefault();


  const formData = new FormData();

  formData.append("token", token ?? "");
  formData.append("vorname", data.vorname);
  formData.append("nachname", data.nachname);
  formData.append("email", data.email);
  formData.append("Telefonnummer", data.Telefonnummer);
  formData.append("arbeit", data.arbeit);
  formData.append("sprache", data.sprache);
  formData.append("Gehaltsvorstellung", data.Gehaltsvorstellung);
  formData.append("Eintrittstermin", data.Eintrittstermin);
  formData.append("Berufserfahrung", data.Berufserfahrung);
  formData.append("Selbstbeschreibung", data.Selbstbeschreibung);


  if (data.Lebenslauf) {
    formData.append("Lebenslauf", data.Lebenslauf);
  }


  await fetch(postData, {
    method: "POST",
    body: formData
  });

   setData({
     vorname: "",
    nachname: "",
    email: "",
    Telefonnummer: "",
    arbeit: "Anwendungsentwickler",
    sprache: "Englisch",
    Gehaltsvorstellung: "",
    Eintrittstermin: "",
    Berufserfahrung: "",
    Selbstbeschreibung: "",
    Lebenslauf: null
   })
   setSuccess(true)

  console.log(data);

};



return (

<form 
onSubmit={handleSubmit}
className="parent"
>

      {success === true && <p>Vielen Dank! Ihre Bewerbung wurde erfolgreich übermittelt.</p>}



<input
name="vorname"
placeholder="Vorname"
value={data.vorname}
onChange={handleChange}
required
/>


<input
name="nachname"
placeholder="Nachname"
value={data.nachname}
onChange={handleChange}
required
/>


<input
type="email"
name="email"
placeholder="E-Mail"
value={data.email}
onChange={handleChange}
required
/>



<input
name="Telefonnummer"
placeholder="Telefonnummer"
value={data.Telefonnummer}
onChange={handleChange}
required
/>



<input
name="Gehaltsvorstellung"
placeholder="Gehaltsvorstellung"
value={data.Gehaltsvorstellung}
onChange={handleChange}
required
/>



<label>
Frühestmöglicher Eintrittstermin
</label>

<input
type="date"
name="Eintrittstermin"
value={data.Eintrittstermin}
onChange={handleChange}
required
/>



<input
name="Berufserfahrung"
placeholder="Berufserfahrung"
value={data.Berufserfahrung}
onChange={handleChange}
required
/>



<textarea
name="Selbstbeschreibung"
placeholder="Beschreiben Sie sich kurz..."
value={data.Selbstbeschreibung}
onChange={handleChange}
required
/>



<input
type="file"
name="Lebenslauf"
onChange={handleFileChange}
required
/>



<select
name="arbeit"
value={data.arbeit}
onChange={handleSelect}
>

<option value="Anwendungsentwickler">
Anwendungsentwickler
</option>

<option value="Designer">
Designer
</option>

<option value="Projektmanager">
Projektmanager
</option>

<option value="Marketing Spezialist">
Marketing Spezialist
</option>

</select>



<select
name="sprache"
value={data.sprache}
onChange={handleSelect}
>

<option value="Englisch">
Englisch
</option>

<option value="Deutsch">
Deutsch
</option>

<option value="Spanisch">
Spanisch
</option>

</select>


<button type="submit">
Senden
</button>


</form>

)

}

export default Form;