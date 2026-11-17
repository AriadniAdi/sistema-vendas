import {
  Alert, Box, Button, IconButton, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography, Pagination,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import ProductModal from '../components/ProductModal';
import { useProductsViewModel } from '../hooks/useProductsViewModel';
import ConfirmationDialog from '../../../shared/presentation/components/ConfirmationDialog';
import { productMessages } from '../constants/productMessages';

export default function ProductsPage() {
  const {
    products, searchTerm, modalOpen, selectedProduct, productToDelete, error,
    page, setPage, itemsPerPage,
    searchProducts, openModal, closeModal, saveProduct,
    requestDeleteProduct, cancelDeleteProduct, confirmDeleteProduct,
  } = useProductsViewModel();

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentPage = Math.min(page, Math.max(totalPages, 1));
  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  const productsOnPage = products.slice(firstItemIndex, firstItemIndex + itemsPerPage);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">{productMessages.pageTitle}</Typography>
      <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
        <TextField
          label={productMessages.searchLabel}
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(event) => searchProducts(event.target.value)}
          InputProps={{ endAdornment: <SearchIcon color="action" /> }}
          sx={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => openModal()}>
          {productMessages.newProduct}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><b>{productMessages.name}</b></TableCell>
              <TableCell align="right"><b>{productMessages.unitPrice}</b></TableCell>
              <TableCell align="right"><b>{productMessages.stock}</b></TableCell>
              <TableCell align="center"><b>{productMessages.actions}</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsOnPage.length > 0 ? productsOnPage.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell align="right">
                  {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => openModal(product)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => requestDeleteProduct(product)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={4} align="center">{productMessages.noProducts}</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, selectedPage) => setPage(selectedPage)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      <ProductModal
        open={modalOpen}
        handleClose={closeModal}
        onSave={saveProduct}
        productToEdit={selectedProduct}
      />
      <ConfirmationDialog
        open={Boolean(productToDelete)}
        title={productMessages.deleteTitle}
        description={productMessages.deleteDescription}
        confirmLabel={productMessages.deleteConfirm}
        cancelLabel={productMessages.cancel}
        onConfirm={confirmDeleteProduct}
        onCancel={cancelDeleteProduct}
      />
    </Box>
  );
}
