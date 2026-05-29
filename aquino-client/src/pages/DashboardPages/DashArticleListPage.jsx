import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
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

const getApiUrl = () => {
  try {
    const meta = Function('return import.meta')();
    return meta?.env?.VITE_API_URL || 'http://localhost:8000/api';
  } catch {
    return 'http://localhost:8000/api';
  }
};

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const normalizeParagraphInput = (value) =>
  value
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);

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

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [formErrors, setFormErrors] = useState({});

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
      console.error('Error fetching articles:', err);
      setError('Unable to load articles from the database.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const nextNumericId = useMemo(() => {
    const numericIds = articles
      .map((article) => Number(article.id))
      .filter((value) => Number.isFinite(value));

    return numericIds.length ? Math.max(...numericIds) + 1 : 1;
  }, [articles]);

  const openModal = (article = null) => {
    if (article) {
      setForm({
        id: article.id ?? '',
        slug: article.slug ?? '',
        title: article.title ?? '',
        preview: article.preview ?? '',
        image: article.image ?? '',
        paragraphs: Array.isArray(article.paragraphs)
          ? article.paragraphs
          : [],
        status: article.status ?? 'enabled',
      });

      setModal({ open: true, id: article._id });
    } else {
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

  const handleFormChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!String(form.id).trim()) {
      errors.id = 'ID is required.';
    }

    if (!form.slug.trim()) {
      errors.slug = 'Slug is required.';
    }

    if (!form.title.trim()) {
      errors.title = 'Title is required.';
    }

    if (!form.preview.trim()) {
      errors.preview = 'Preview is required.';
    }

    const existing = articles.find(
      (article) =>
        Number(article.id) === Number(form.id) &&
        article._id !== modal.id
    );

    if (existing) {
      errors.id = 'This ID is already used by another article.';
    }

    return errors;
  };

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
        await axios.put(
          `${getApiUrl()}/articles/${modal.id}`,
          payload,
          getHeaders()
        );
      } else {
        await axios.post(
          `${getApiUrl()}/articles`,
          payload,
          getHeaders()
        );
      }

      await loadArticles();
      closeModal();
    } catch (err) {
      console.error('Error saving article:', err);

      setFormErrors({
        submit:
          err.response?.data?.message ||
          'Save failed. Try again.',
      });
    }
  };

  const handleToggleStatus = async (article) => {
    const nextStatus =
      article.status === 'enabled' ? 'disabled' : 'enabled';

    try {
      await axios.put(
        `${getApiUrl()}/articles/${article._id}`,
        { status: nextStatus },
        getHeaders()
      );

      await loadArticles();
    } catch (err) {
      console.error('Error updating article status:', err);
      setError('Failed to update article status.');
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        'Permanently delete this article? This action cannot be undone.'
      )
    ) {
      try {
        await axios.delete(
          `${getApiUrl()}/articles/${id}`,
          getHeaders()
        );

        await loadArticles();
      } catch (err) {
        console.error('Error deleting article:', err);
        setError('Failed to delete article.');
      }
    }
  };

  const filteredArticles = articles.filter((article) => {
    const searchLower = search.toLowerCase();

    const paragraphCount = Array.isArray(article.paragraphs)
      ? article.paragraphs.length
      : 0;

    const matchesSearch =
      String(article.id || '').toLowerCase().includes(searchLower) ||
      String(article.slug || '').toLowerCase().includes(searchLower) ||
      String(article.title || '').toLowerCase().includes(searchLower) ||
      String(article.preview || '').toLowerCase().includes(searchLower) ||
      String(paragraphCount).toLowerCase().includes(searchLower) ||
      String(article.status || '').toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === '' || article.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'slug',
      headerName: 'Slug',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Title',
      minWidth: 180,
      flex: 1.2,
    },
    {
      field: 'paragraphsCount',
      headerName: 'Paragraphs',
      width: 120,
      valueGetter: (_, row) =>
        Array.isArray(row.paragraphs)
          ? row.paragraphs.length
          : 0,
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
      width: 130,
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
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => openModal(row)}
            sx={{
              backgroundColor: "rgba(2, 136, 209, 0.12)",
              color: "#01579b",
              boxShadow: "none",

              '&:hover': {
                backgroundColor: "rgba(2, 136, 209, 0.22)",
                boxShadow: "none",
              },
            }}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => handleToggleStatus(row)}
            sx={{
              backgroundColor:
                row.status === 'enabled'
                  ? "rgba(46, 125, 50, 0.12)"
                  : "rgba(117, 117, 117, 0.15)",

              color:
                row.status === 'enabled'
                  ? "#1b5e20"
                  : "#424242",

              boxShadow: "none",

              '&:hover': {
                backgroundColor:
                  row.status === 'enabled'
                    ? "rgba(46, 125, 50, 0.22)"
                    : "rgba(117, 117, 117, 0.25)",

                boxShadow: "none",
              },
            }}
          >
            {row.status === 'enabled' ? 'Enabled' : 'Disabled'}
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
        <Typography variant="h4">
          Articles
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add Article
        </Button>
      </Box>

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
          placeholder="Search articles by ID, name, title, preview..."
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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              py: 4,
            }}
          >
            <CircularProgress size={20} />
            <Typography>Loading articles...</Typography>
          </Box>
        ) : filteredArticles.length ? (
          <Box sx={{ height: { xs: 400, sm: 520 }, width: '100%' }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              getRowId={(row) => row._id}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                    page: 0,
                  },
                },
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

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <DialogTitle>
            {modal.id ? 'Edit Article' : 'Add Article'}
          </DialogTitle>

          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                name="id"
                label="ID"
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
                label="Name"
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
                label="Preview"
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
                        status: e.target.checked
                          ? 'enabled'
                          : 'disabled',
                      }))
                    }
                  />
                }
                label={
                  form.status === 'enabled'
                    ? 'Status: Enabled'
                    : 'Status: Disabled'
                }
              />

              {formErrors.submit && (
                <Alert severity="error">
                  {formErrors.submit}
                </Alert>
              )}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>
              Cancel
            </Button>

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