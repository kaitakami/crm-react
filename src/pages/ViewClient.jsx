import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const ViewClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtainClientAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL }/${id}`;
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
  return loading ? (
    <Loading />
  ) : Object.keys(client).length === 0 ? (
    <p>No results</p>
  ) : (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            View Client: {client.name}
          </h1>
          <p>Client's information</p>
          <p className="text-gray-600 text-4xl mt-10">
            <span className="text-gray-800 uppercase font-bold">Client: </span>
            {client.name}
          </p>
          <p className="text-gray-600 text-2xl mt-4">
            <span className="text-gray-800 uppercase font-bold">Email: </span>
            {client.email}
          </p>
          <p className="text-gray-600 text-2xl mt-4">
            <span className="text-gray-800 uppercase font-bold">Company: </span>
            {client.company}
          </p>
          {client.cellphone && (
            <p className="text-gray-600 text-2xl mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Cellphone:{" "}
              </span>
              {client.cellphone}
            </p>
          )}
          {client.notes && (
            <p className="text-gray-600 text-2xl mt-4">
              <span className="text-gray-800 uppercase font-bold">Notes: </span>
              {client.notes}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ViewClient;
