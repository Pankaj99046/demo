
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";


function App() {
  const [pan, setPan] = useState([])
  const [aa, setAa] = useState({ userId: '', id: '', title: '', body: '' })
  const [ed, setEd] = useState(-1)

  const SignupSchema = Yup.object().shape({
    userId: Yup.number('please enter').required('Required'),
    id: Yup.number('please enter').required('Required'),
    title: Yup.string('please enter').required('Required'),
    body: Yup.string('please enter').required('Required'),
  });

  const getData = async () => {
    try {
      let aaa = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPan(aaa.data);
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  // const editTry = async () => {
  //   try {

  //   }
  //   catch (error) {
  //     console.log(error.message)
  //   }
  // }

  const deleteHandle = (i) => {
    let copyyPan = [...pan]
    copyyPan.splice(i, 1)
    setPan(copyyPan)
    // deleteData();
  }
  // const deleteData = async (i) => {
  // try {
  //   let bbb= await axios.delete('https://jsonplaceholder.typicode.com/posts/'+i)  
  //  console.log(bbb.data)
  //  } catch (error) {
  //    console.log(error.message)
  //  }
  // }
  const maineditHandle = (values, i) => {
    setAa(values)
    setEd(i)
  }

  return (
    <>
      <Formik
        initialValues={aa}
        enableReinitialize
        validationSchema={SignupSchema}

        onSubmit={async (values, {resetForm}) => {
          console.log(values);
          // if (ed >= 0) {
          //   console.log(values)
          //   // editTry()
            
          // }
          // else {
          //   console.log(values)
          //   // editTry()
          // }
          setAa({ userId: '', id: '', title: '', body: '' })
          resetForm()
        }}
      >
        <Form>
          <label htmlFor="userId">User Id</label>
          <Field id="userId" name="userId" placeholder="Jane" />
          <ErrorMessage name="userId" />

          <label htmlFor="id">id</label>
          <Field id="id" name="id" placeholder="Doe" />
          <ErrorMessage name="id" />

          <label htmlFor="title">title</label>
          <Field
            id="title"
            name="title"
            placeholder="jane@acme.com"
          />
          <ErrorMessage name="title" />

          <label htmlFor="body">body</label>
          <Field
            id="body"
            name="body"
            placeholder="jane@acme.com"
          />
          <ErrorMessage name="body" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <table><tr>
        <th>name</th>
        <th>sub</th>
        <th>mark</th>
        <th>grade</th>
      </tr>
        {pan.map((nn, i) => {
          return <tr key={"pp" + i}>
            <td>{nn.userId}</td>
            <td>{nn.id}</td>
            <td>{nn.title}</td>
            <td>{nn.body}</td>
            <td>
              <button onClick={() => deleteHandle(i)}>Delete</button>
              <button onClick={() => maineditHandle(nn, i)}>Edit</button>
            </td>
          </tr>
        })}
      </table>
    </>
  );
}

export default App;
