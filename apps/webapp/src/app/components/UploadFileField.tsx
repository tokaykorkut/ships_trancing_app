import { Divider, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

const UploadSchema = Yup.object().shape({
  file: Yup.mixed()
})


const UploadFileField = () => {
  const [file, setFile] = useState<unknown>();
  const initialValues = {
    file:null
  }
  return (
    <div>
      <Divider/>
      <br/>
      <Formik
      initialValues={initialValues}
      validationSchema={UploadSchema}
      onSubmit={async()=>{
        if(file){
          await axios.post('localhost:4000/ais/upload', file, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res=>{
            console.log(res)
          })
        }
      }}
      >
        {()=>(
            <Form>
              <Typography variant="h6">You can upload current data of AIS</Typography>
              <br/>
              <input id="file" name="file" type="file" onChange={(event) => {
                setFile(event.currentTarget.files?.[0]);
              }} />
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Upload File
              </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UploadFileField;
