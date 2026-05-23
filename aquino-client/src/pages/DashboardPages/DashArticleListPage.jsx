import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';

// ---------- Helper: API URL ----------
const getApiUrl = () => {
  try {
    const meta = Function('return import.meta')();
    return meta?.env?.VITE_API_URL || 'http://localhost:8000/api';
  } catch {
    return 'http://localhost:8000/api';
  }
};

// ---------- Helper: Auth headers ----------
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// ---------- Normalize paragraphs from multiline text ----------
const normalizeParagraphInput = (value) =>
  value
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);

// ---------- Initial blank form ----------
const blankForm = {
  id: '',
  slug: '',
  title: '',
  preview: '',
  image: '',
  paragraphs: [],
  status: 'enabled',
};

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters & search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal (add/edit)
  const [modal, setModal] = useState({ open: false, id: null }); // id = article._id when editing
  const [form, setForm] = useState(blankForm);
  const [formErrors, setFormErrors] = useState({});

  // ---------- Data fetching ----------
  const loadArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await axios.get(
        `${getApiUrl()}/articles?includeDisabled=true`,
        getHeaders()
      );
      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
      setError('Unable to load articles from the database.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  // ---------- Helper: next numeric ID suggestion ----------
  const nextNumericId = useMemo(() => {
    const numericIds = articles
      .map((a) => Number(a.id))
      .filter((v) => Number.isFinite(v));
    return numericIds.length ? Math.max(...numericIds) + 1 : 1;
  }, [articles]);

  // ---------- Modal handlers ----------
  const openModal = (article = null) => {
    if (article) {
      // Edit mode
      setForm({
        id: article.id ?? '',
        slug: article.slug ?? '',
        title: article.title ?? '',
        preview: article.preview ?? '',
        image: article.image ?? '',
        paragraphs: Array.isArray(article.paragraphs) ? article.paragraphs : [],
        status: article.status ?? 'enabled',
      });
      setModal({ open: true, id: article._id });
    } else {
      // Add mode
      setForm({
        ...blankForm,
        id: String(nextNumericId),
      });
      setModal({ open: true, id: null });
    }
    setFormErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankForm);
    setFormErrors({});
  };

  // ---------- Form field change ----------
  const handleFormChange = ({ target: { name, value, checked, type } }) => {
    let newValue = type === 'checkbox' ? checked : value;
    // For paragraphs field (multiline) -> keep as raw string in form, but we'll normalize on submit
    if (name === 'paragraphs') {
      newValue = value; // keep as string for editing
    }
    setForm((prev) => ({ ...prev, [name]: newValue }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // ---------- Validation ----------
  const validateForm = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = 'Title is required.';
    if (!form.slug.trim()) errors.slug = 'Slug is required.';
    if (!form.preview.trim()) errors.preview = 'Preview is required.';
    if (!form.id.toString().trim()) errors.id = 'ID is required.';
    // Check unique numeric id? We'll check against existing articles (excluding current if editing)
    const existing = articles.find(
      (a) => a.id === Number(form.id) && a._id !== modal.id
    );
    if (existing) errors.id = 'This ID is already used by another article.';
    return errors;
  };

  // ---------- Save (Create or Update) ----------
  const handleSave = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      id: Number(form.id),
      slug: form.slug.trim(),
      title: form.title.trim(),
      preview: form.preview.trim(),
      image: form.image.trim(),
      paragraphs: Array.isArray(form.paragraphs)
        ? form.paragraphs
        : normalizeParagraphInput(form.paragraphs || ''),
      status: form.status,
    };

    try {
      if (modal.id) {
        // Update existing
        await axios.put(`${getApiUrl()}/articles/${modal.id}`, payload, getHeaders());
      } else {
        // Create new
        await axios.post(`${getApiUrl()}/articles`, payload, getHeaders());
      }
      await loadArticles();
      closeModal();
    } catch (err) {
      console.error(err);
      setFormErrors({ submit: err.response?.data?.message || 'Save failed. Try again.' });
    }
  };

  // ---------- Enable/Disable toggle ----------
  const handleToggleStatus = async (article) => {
    const newStatus = article.status === 'enabled' ? 'disabled' : 'enabled';
    try {
      await axios.put(
        `${getApiUrl()}/articles/${article._id}`,
        { status: newStatus },
        getHeaders()
      );
      await loadArticles();
    } catch (err) {
      console.error(err);
      setError('Failed to update article status.');
    }
  };

  // ---------- Delete article ----------
  const handleDelete = async (id) => {
    if (window.confirm('Permanently delete this article? This action cannot be undone.')) {
      try {
        await axios.delete(`${getApiUrl()}/articles/${id}`, getHeaders());
        await loadArticles();
      } catch (err) {
        console.error(err);
        setError('Failed to delete article.');
      }
    }
  };

  // ---------- Filter articles ----------
  const filteredArticles = articles.filter((article) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      String(article.id).includes(searchLower) ||
      article.slug.toLowerCase().includes(searchLower) ||
      article.title.toLowerCase().includes(searchLower) ||
      article.preview.toLowerCase().includes(searchLower);

    const matchesStatus = statusFilter === '' || article.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ---------- DataGrid Columns ----------
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'slug', headerName: 'Slug', minWidth: 150, flex: 1 },
    { field: 'title', headerName: 'Title', minWidth: 180, flex: 1.2 },
    {
      field: 'paragraphsCount',
      headerName: 'Paragraphs',
      width: 110,
      valueGetter: (_, row) => (row.paragraphs?.length ?? 0),
    },
    {
      field: 'preview',
      headerName: 'Preview',
      minWidth: 220,
      flex: 1.5,
      renderCell: ({ value }) => (
        <Typography variant="body2" noWrap sx={{ maxWidth: '100%' }}>
          {value}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: ({ row }) => (
        <Chip
          label={row.status === 'enabled' ? 'Enabled' : 'Disabled'}
          color={row.status === 'enabled' ? 'success' : 'default'}
          variant={row.status === 'enabled' ? 'filled' : 'outlined'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 280,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => openModal(row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.status === 'enabled' ? 'warning' : 'success'}
            onClick={() => handleToggleStatus(row)}
          >
            {row.status === 'enabled' ? 'Disable' : 'Enable'}
          </Button>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* Header + Add Button */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4">Articles</Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add Article
        </Button>
      </Box>

      {/* Filters: Search + Status */}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <TextField
          placeholder="Search articles by ID, slug, title, preview..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ minWidth: 200, flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="enabled">Enabled</MenuItem>
          <MenuItem value="disabled">Disabled</MenuItem>
        </TextField>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* DataGrid */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography>Loading articles...</Typography>
          </Box>
        ) : filteredArticles.length ? (
          <Box sx={{ height: { xs: 400, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              getRowId={(row) => row._id}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No articles found. Click "Add Article" to create your first one.
          </Alert>
        )}
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                name="id"
                label="ID (numeric)"
                type="number"
                value={form.id}
                onChange={handleFormChange}
                error={!!formErrors.id}
                helperText={formErrors.id}
                fullWidth
                required
              />
              <TextField
                name="slug"
                label="Slug (URL identifier)"
                value={form.slug}
                onChange={handleFormChange}
                error={!!formErrors.slug}
                helperText={formErrors.slug}
                fullWidth
                required
              />
              <TextField
                name="title"
                label="Title"
                value={form.title}
                onChange={handleFormChange}
                error={!!formErrors.title}
                helperText={formErrors.title}
                fullWidth
                required
              />
              <TextField
                name="preview"
                label="Preview (short description)"
                multiline
                rows={2}
                value={form.preview}
                onChange={handleFormChange}
                error={!!formErrors.preview}
                helperText={formErrors.preview}
                fullWidth
                required
              />
              <TextField
                name="image"
                label="Image URL"
                value={form.image}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                name="paragraphs"
                label="Paragraphs (one per line)"
                multiline
                rows={4}
                value={
                  Array.isArray(form.paragraphs)
                    ? form.paragraphs.join('\n')
                    : form.paragraphs
                }
                onChange={handleFormChange}
                helperText="Each line becomes a separate paragraph."
                fullWidth
              />
              <FormControlLabel
                control={
                  <Switch
                    name="status"
                    checked={form.status === 'enabled'}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        status: e.target.checked ? 'enabled' : 'disabled',
                      }))
                    }
                  />
                }
                label={form.status === 'enabled' ? 'Status: Enabled' : 'Status: Disabled'}
              />
              {formErrors.submit && (
                <Alert severity="error">{formErrors.submit}</Alert>
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;