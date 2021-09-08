import React from "react"
import {Field, Form, Formik} from "formik";
import { PortDto } from "@oceanvoyapp/dtos";
import { useQueryClient } from "react-query";
import { useEffect } from "react";
import { useApiVesselsOfSearch } from "../hooks/useLocations";
import * as Yup from 'yup';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

interface SearchFieldProps {
  ports: PortDto[] | undefined;
}

const SearchSchema  = Yup.object().shape({
  port: Yup.string().required('Required'),
  idle: Yup.boolean(),
  portCountry: Yup.string().required('Required'),
  portLocation: Yup.string().required('Required'),
  distance: Yup.number().positive().required('Required'),
  beginDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
})

const SearchField = ({ports=[]}: SearchFieldProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: searchVessels,
    error: vesselsError,
    isSuccess,
    isLoading,
} = useApiVesselsOfSearch()

  const initialValues = {
    port: "",
    idle: false,
    portCountry: "",
    portLocation: "",
    distance: 0,
    beginDate:"",
    endDate:""
  }
  return (
    <div>
      <Formik
      initialValues={initialValues}
      validationSchema={SearchSchema}
      onSubmit={(payload)=>{
        console.log(payload);
        // searchVessels(payload)
      }} >
        {({values,touched,errors})=>(
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>

              </Grid>
              <br />
              <Grid item xs={12} md={6}>
                  <Button
                      // startIcon={}
                      size="large"
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isLoading}
                  >
                      Search Vessels
                  </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SearchField;

