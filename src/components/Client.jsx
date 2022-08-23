import { useNavigate } from 'react-router-dom'

const Client = ({ client, handleDelete }) => {

  const navigate = useNavigate()

  const { name, company, email, cellphone, notes, id } = client;

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{name}</td>
      <td className="p-3">
        <p className="text-gray-800 uppercase font-bold">Email: {email}</p>
        <p className="text-gray-800 uppercase font-bold">Number: {cellphone}</p>
      </td>
      <td className="p-3">{company}</td>
      <td className="p-3">
        <button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs transition-all rounded-sm"
          onClick={() => navigate(`/clients/${id}`)}
        >
          Notes
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs transition-all mt-3 rounded-sm"
          onClick={() => navigate(`edit/${id}`)}
        >
          Edit
        </button>
        <button
          type="button"
          className="bg-red-700 hover:bg-red-800 block w-full text-white p-2 uppercase font-bold text-xs mt-3 transition-all rounded-sm"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Client;
