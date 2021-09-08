import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MapField from "./components/MapField";
import SearchField from "./components/SearchField";
import { useApiPorts } from "./hooks";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
  }),
);

export function App() {
  const classes = useStyles();

  const {
    data: ports,
    error: portsError,
    isLoading: portsLoading,
} = useApiPorts();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
            <MapField/>
        </Grid>
        <Grid item xs={12} md={6}>
            <SearchField ports={ports}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
