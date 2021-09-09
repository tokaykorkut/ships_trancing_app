import { Divider, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Form, Formik } from "formik";
import { MouseEventHandler, useState } from "react";
import * as Yup from 'yup';


const UploadFileField = () => {
  const [result,setResult] = useState('');
  const [file,setFile] = useState<File | undefined>();

  const submitForm = async function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const formData = new FormData();
    if(file){
      formData.append("file", file);
      const final = await axios.post('http://localhost:4000/ais/upload', formData);
      await setResult(final.data);
    }
  };
  return (
    <div>
      <Divider/>
      <br/>
        <Typography variant="h6">You can upload current data of AIS</Typography>
        <br/>
        <input id="file" name="file" type="file" onChange={(event) => {
          setFile(event.target.files?.[0]);
        }} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={submitForm}
          >
          Upload File
        </Button>
        <br/>
        <Typography>{result}</Typography>
    </div>
  )
}

export default UploadFileField;
