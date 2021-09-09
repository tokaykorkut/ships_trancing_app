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
  const [file, setFile] = useState<File>();

  const initialValues = {
    file: null
  }
  return (
    <div>
      <Divider/>
      <br/>
      <Formik
      initialValues={initialValues}
      validationSchema={UploadSchema}
      onSubmit={async(value)=>{
        const formData = new FormData();
        if(value.file!==null){
          formData.append(
            'file',
            value.file || {} as Blob,
          )
          console.log(formData)
          await axios.post('http://localhost:4000/ais/upload', formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })
        }
      }
      }
      >
        {(values)=>(
            <Form>
              <Typography variant="h6">You can upload current data of AIS</Typography>
              <br/>
              <input id="file" name="file" type="file" onChange={(event) => {
                values.setFieldValue('file',event.currentTarget.files?.[0]);
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
