import { Alert, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import CustomerModal from '../components/CustomerModal';
import { useCustomersViewModel } from '../hooks/useCustomersViewModel';
import { customerMessages } from '../constants/customerMessages';
import ConfirmationDialog from '../../../shared/presentation/components/ConfirmationDialog';

export default function CustomersPage() {
  const viewModel = useCustomersViewModel();
  const { customers, searchTerm, selectedCustomer, customerToDelete, modalOpen, error } = viewModel;
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">{customerMessages.title}</Typography>
      <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
        <TextField label={customerMessages.search} size="small" value={searchTerm} onChange={(event) => viewModel.searchCustomers(event.target.value)} InputProps={{ endAdornment: <SearchIcon color="action" /> }} sx={{ flexGrow: 1, maxWidth: 400 }} />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => viewModel.openModal()}>{customerMessages.newCustomer}</Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead><TableRow><TableCell><b>{customerMessages.name}</b></TableCell><TableCell><b>{customerMessages.cpf}</b></TableCell><TableCell align="center"><b>{customerMessages.actions}</b></TableCell></TableRow></TableHead>
          <TableBody>{customers.length ? customers.map((customer) => (
            <TableRow key={customer.id}><TableCell>{customer.name}</TableCell><TableCell>{customer.cpf}</TableCell><TableCell align="center"><IconButton color="primary" onClick={() => viewModel.openModal(customer)}><EditIcon /></IconButton><IconButton color="error" onClick={() => viewModel.requestDeleteCustomer(customer)}><DeleteIcon /></IconButton></TableCell></TableRow>
          )) : <TableRow><TableCell colSpan={3} align="center">{customerMessages.empty}</TableCell></TableRow>}</TableBody>
        </Table>
      </TableContainer>
      <CustomerModal open={modalOpen} onClose={viewModel.closeModal} onSave={viewModel.saveCustomer} customerToEdit={selectedCustomer} />
      <ConfirmationDialog open={Boolean(customerToDelete)} title={customerMessages.deleteTitle} description={customerMessages.deleteDescription} confirmLabel={customerMessages.confirmDelete} cancelLabel={customerMessages.cancel} onConfirm={viewModel.confirmDeleteCustomer} onCancel={viewModel.cancelDeleteCustomer} />
    </Box>
  );
}
