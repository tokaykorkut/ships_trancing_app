
import {Field, Form, Formik} from "formik";
import { PortDto } from "@oceanvoyapp/dtos";
import { useQueryClient } from "react-query";
import { useEffect } from "react";
import { useApiVesselsOfSearch } from "../hooks/useLocations";
import * as Yup from 'yup';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Checkbox , TextField} from 'formik-material-ui';
import { MenuItem, Typography } from "@material-ui/core";
import { DatePicker } from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment-timezone";
import { SEARCH_LOCATIONS } from "../hooks";
interface SearchFieldProps {
  ports: PortDto[] | undefined;
}

const convertDateToIsoString = (date: string) => moment(date).toISOString();

const SearchSchema  = Yup.object().shape({
  port: Yup.string().required('Required'),
  idle: Yup.boolean().notRequired(),
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
} = useApiVesselsOfSearch({ onSuccess: () => queryClient.invalidateQueries(SEARCH_LOCATIONS)})

  const initialValues = {
    port: '',
    idle: false,
    distance: 1,
    beginDate:"",
    endDate:""
  }
  return (
    <div>
      <br/>
      <Formik
      initialValues={initialValues}
      validationSchema={SearchSchema}
      onSubmit={(payload)=>{
        const {port, idle, distance, beginDate, endDate} = payload;
        const tempPortData = JSON.parse(port);
        const data = {
          port:tempPortData.Name,
          portLocation:tempPortData.Location,
          portCountry:tempPortData.Country,
          idle,
          distance,
          beginDate:convertDateToIsoString(beginDate),
          endDate:convertDateToIsoString(endDate)
        }
        searchVessels(data);

      }} >
        {({errors,submitForm})=>(
          <Form>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                <Field
                    component={TextField}
                    label="distance"
                    name="distance"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                {ports && (<Grid item xs={6}>
                <Field
                    component={TextField}
                    type="text"
                    name="port"
                    label="port"
                    select
                    variant="standard"
                    helperText="Please select a Port"
                    margin="normal"
                    fullWidth
                  >
                    {ports.map((port,index) => (
                      <MenuItem key={index} value={JSON.stringify({...port})}>
                        {port.Name} , {port.Country}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>)}
                <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Field component={DatePicker} label="beginDate" name="beginDate" fullWidth/>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Field component={DatePicker} label="endDate" name="endDate" fullWidth/>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Search also idle vessels or not</Typography>
                  <Field component={Checkbox} label='idle' type="checkbox" name="idle"/>
                </Grid>
              <br />
              <Grid item xs={12} md={6}>
                  <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      type="submit"
                      // onClick={submitForm}
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

