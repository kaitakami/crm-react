import Formulary from "../components/Formulary";

const NewClient = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">New client</h1>
      <p>Fill the next fields to register a client</p>
      <Formulary />
    </>
  );
};

export default NewClient;
