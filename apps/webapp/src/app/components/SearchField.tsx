import React from "react"
import {Form, Formik} from "formik";
import Grid from "@mui/material/Grid";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { PortDto } from "@oceanvoyapp/dtos";

const SearchField = () => {

  const initialValues = {
    port: {} as PortDto,
    idle: false,
  }
  return (
    <div>
      <Formik
      initialValues={initialValues}
      onSubmit={(payload)=>{
        console.log(payload);
      }} >
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Checkbox name='idle' />
            </Grid>
            <br />
            <Grid item xs={12} md={6}>
                <Button
                    startIcon={<SearchIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    // disabled={isLoading}
                >
                    Search Vessels
                </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
}

export default SearchField;
