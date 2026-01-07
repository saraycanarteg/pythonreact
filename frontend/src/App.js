import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Box
} from '@mui/material';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3007/customer';
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          {error}
          <Button size="small" onClick={fetchCustomers} sx={{ ml: 2 }}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3}>
        <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h5">Customer List</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Total: {customers.length} customers
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Total Sales</TableCell>
                <TableCell align="right">Discount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer._id} hover>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.fullName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={customer.type}
                      color={customer.type === 'Frquent' ? 'success' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">${customer.totalSale}</TableCell>
                  <TableCell align="right">{customer.discount}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default App;