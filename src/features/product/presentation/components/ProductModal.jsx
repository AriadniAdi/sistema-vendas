import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { productMessages } from '../constants/productMessages';

export default function ProductModal({ open, handleClose, onSave, productToEdit }) {
  const [name, setName] = useState(productToEdit ? productToEdit.name : '');
  const [price, setPrice] = useState(productToEdit ? productToEdit.price : '');
  const [stock, setStock] = useState(productToEdit ? productToEdit.stock : '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || price === '' || stock === '') {
      setError(productMessages.allFieldsRequired);
      return;
    }

    if (Number(price) < 0 || Number(stock) < 0) {
      setError(productMessages.negativeValues);
      return;
    }

    onSave({
      id: productToEdit ? productToEdit.id : undefined,
      name,
      price: Number(price),
      stock: Number(stock),
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{productToEdit ? productMessages.editProduct : productMessages.newProduct}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {error && <Box color="error.main" fontSize="0.875rem">{error}</Box>}
            
            <TextField
              label={productMessages.productName}
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            <TextField
              label={productMessages.unitPrice}
              variant="outlined"
              type="number"
              fullWidth
              inputProps={{ min: 0, step: '0.01' }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            
            <TextField
              label={productMessages.stockQuantity}
              variant="outlined"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">{productMessages.cancel}</Button>
          <Button type="submit" variant="contained" color="primary">{productMessages.save}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
