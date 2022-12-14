import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alert from "./Alert";
import Loading from "./Loading";

const Formulary = ({ client, loading }) => {
  const navigate = useNavigate();

  const newClientSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "The name is too short")
      .max(30, "The name is too large")
      .required("The client's name is required"),
    company: Yup.string().required("The company name is required"),
    email: Yup.string().email().required("The email is required"),
    cellphone: Yup.number()
      .integer()
      .positive()
      .typeError("The number is not valid"),
    notes: "",
  });
  const handleSubmit = async (values) => {
    try {
      let response;
      if (client.id) {
        const url = `${import.meta.env.VITE_API_URL}/${client.id}`;
        response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        const url = import.meta.env.VITE_API_URL;
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {client?.name ? "Edit Client" : "Add Client"}
      </h1>

      <Formik
        initialValues={{
          name: client?.name ?? "",
          company: client?.company ?? "",
          email: client?.email ?? "",
          cellphone: client?.cellphone ?? "",
          notes: client?.notes ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);

          resetForm();
        }}
        validationSchema={newClientSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Name: *
                </label>
                <Field
                  id="name"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Client name"
                  name="name"
                />

                {errors.name && touched.name ? (
                  <Alert children={errors.name} />
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="company">
                  Company: *
                </label>
                <Field
                  id="company"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Company name"
                  name="company"
                />
                {errors.company && touched.company ? (
                  <Alert children={errors.company} />
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email: *
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Client email"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alert children={errors.email} />
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="tel">
                  Cellphone:
                </label>
                <Field
                  id="tel"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Cellphone number"
                  name="cellphone"
                />
                {errors.cellphone && touched.cellphone ? (
                  <Alert children={errors.cellphone} />
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notes">
                  Notes:
                </label>
                <Field
                  as="textarea"
                  id="notes"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Clients note"
                  name="notes"
                />
              </div>
              <input
                type="submit"
                value={client?.name ? "Edit Client" : "Add Client"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulary.defaultProps = {
  client: {},
  loading: false,
};

export default Formulary;
