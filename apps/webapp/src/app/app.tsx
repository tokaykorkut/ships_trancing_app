import { Box, Grid, Paper } from "@mui/material";
import MapField from "./components/MapField";
import SearchField from "./components/SearchField";
import { useApiPorts } from "./hooks";

export function App() {
  const {
    data: ports,
    error: portsError,
    isLoading: portsLoading,
} = useApiPorts();

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Box
                sx={{
                  mx: 'auto',
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                    m: 1,
                    width: 800,
                    height: 800,
                  },
                  textAlign: 'center',
                }}
              >
            <Paper elevation={12}>
              <MapField/>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
              sx={{
                mx: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 800,
                  height: 800,
                },
                textAlign: 'center',
              }}
            >
            <Paper elevation={12}>
              <SearchField/>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
