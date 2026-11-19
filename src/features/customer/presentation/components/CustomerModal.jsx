import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { customerMessages } from '../constants/customerMessages';

export default function CustomerModal({ open, onClose, onSave, customerToEdit }) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // The form mirrors the selected customer whenever the dialog opens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(customerToEdit?.name || ''); setCpf(customerToEdit?.cpf || ''); setError('');
  }, [customerToEdit, open]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !cpf.trim()) { setError(customerMessages.required); return; }
    onSave({ id: customerToEdit?.id, name: name.trim(), cpf: cpf.trim() });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{customerToEdit ? customerMessages.edit : customerMessages.newCustomer}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'grid', gap: 2, pt: 2 }}>
          {error && <span style={{ color: '#d32f2f' }}>{error}</span>}
          <TextField label={customerMessages.customerName} value={name} onChange={(event) => setName(event.target.value)} required fullWidth />
          <TextField label={customerMessages.cpf} value={cpf} onChange={(event) => setCpf(event.target.value)} required fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">{customerMessages.cancel}</Button>
          <Button type="submit" variant="contained">{customerMessages.save}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
