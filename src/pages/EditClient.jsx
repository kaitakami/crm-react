import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Formulary from "../components/Formulary";

const EditClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtainClientAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setClient(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    obtainClientAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Edit client</h1>
      <p>Use this form to edit a client's data</p>
      {client?.name ? (
        <Formulary client={client} loading={loading} />
      ) : (
        "Client ID not valid"
      )}
    </>
  );
};

export default EditClient;
