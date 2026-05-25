import { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const getApiUrl = () => {
  try {
    const meta = Function("return import.meta")();
    return meta?.env?.VITE_API_URL || "http://localhost:8000/api";
  } catch {
    return "http://localhost:8000/api";
  }
};

const disableAutoFill = {
  autoComplete: "off",
  inputProps: {
    autoComplete: "off",
    spellCheck: false,
  },
};

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFieldName] = useState(() =>
    `users-search-${Math.random().toString(36).slice(2, 10)}`
  );

  const [roleFilter, setRoleFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    address: "",
    type: "editor",
    isActive: true,
  });

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
  };

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${getApiUrl()}/users`,
        getHeaders()
      );

      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const resetForm = () => {
    setNewUser({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      contactNumber: "",
      email: "",
      username: "",
      password: "",
      address: "",
      type: "editor",
      isActive: true,
    });

    setErrors({});
    setShowPassword(false);
  };

  const handleOpen = () => {
    setIsEditing(false);
    setEditUserId(null);
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
    resetForm();
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((u) => u._id === id);

    if (userToEdit) {
      setNewUser({
        firstName: userToEdit.firstName || "",
        lastName: userToEdit.lastName || "",
        age: userToEdit.age || "",
        gender: userToEdit.gender || "",
        contactNumber: userToEdit.contactNumber || "",
        email: userToEdit.email || "",
        username: userToEdit.username || "",
        password: "",
        address: userToEdit.address || "",
        type: userToEdit.type || "editor",
        isActive: userToEdit.isActive !== false,
      });

      setErrors({});
      setEditUserId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await axios.put(
        `${getApiUrl()}/users/${id}`,
        { isActive: !isActive },
        getHeaders()
      );

      loadUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const validate = () => {
    const nextErrors = {};

    const email = newUser.email.trim().toLowerCase();
    const username = newUser.username.trim().toLowerCase();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["username", "Username"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!String(newUser[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!isEditing && !newUser.password.trim()) {
      nextErrors.password = "Password is required.";
    }

    if (newUser.password && newUser.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (
      !nextErrors.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (
      !nextErrors.email &&
      users.some(
        (user) =>
          user._id !== editUserId &&
          user.email?.toLowerCase() === email
      )
    ) {
      nextErrors.email = "Email already exists.";
    }

    if (
      !nextErrors.username &&
      users.some(
        (user) =>
          user._id !== editUserId &&
          user.username?.toLowerCase() === username
      )
    ) {
      nextErrors.username = "Username already exists.";
    }

    if (
      !nextErrors.contactNumber &&
      !/^\d{11}$/.test(newUser.contactNumber.trim())
    ) {
      nextErrors.contactNumber = "Contact number must be exactly 11 digits.";
    }

    if (!nextErrors.age && !/^\d+$/.test(String(newUser.age).trim())) {
      nextErrors.age = "Age must contain numbers only.";
    }

    if (!nextErrors.username && /\s/.test(newUser.username)) {
      nextErrors.username = "Username must not contain spaces.";
    }

    return nextErrors;
  };

  const handleSaveUser = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const payload = {
        firstName: newUser.firstName.trim(),
        lastName: newUser.lastName.trim(),
        age: Number(newUser.age),
        gender: newUser.gender,
        contactNumber: newUser.contactNumber.trim(),
        email: newUser.email.trim().toLowerCase(),
        username: newUser.username.trim().toLowerCase(),
        password: newUser.password,
        address: newUser.address.trim(),
        type: newUser.type,
        isActive: newUser.isActive,
      };

      if (isEditing) {
        if (!payload.password) {
          delete payload.password;
        }

        await axios.put(
          `${getApiUrl()}/users/${editUserId}`,
          payload,
          getHeaders()
        );
      } else {
        await axios.post(`${getApiUrl()}/users`, payload, getHeaders());
      }

      loadUsers();
      handleClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter((user) => {
    const fullName =
      `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();

    const q = searchQuery.toLowerCase();

    const matchesSearch =
      fullName.includes(q) ||
      (user.email || "").toLowerCase().includes(q) ||
      (user.username || "").toLowerCase().includes(q);

    const matchesRole = roleFilter ? user.type === roleFilter : true;

   const matchesGender = genderFilter
  ? String(user.gender || "").toLowerCase() === genderFilter.toLowerCase()
  : true;

    const matchesStatus =
      statusFilter === ""
        ? true
        : statusFilter === "active"
        ? user.isActive !== false
        : user.isActive === false;

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fieldError = (field) => ({
    error: Boolean(errors[field]),
    helperText: errors[field],
  });

  return (
    <>
      <Stack
        direction="row"
        sx={{
          mb: 5,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#ffffff" }}>
          Users Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add User
        </Button>
      </Stack>

      <Box
  sx={{
    mb: 3,
    width: "100%",
    minWidth: 0,
  }}
>
  <Box
    sx={{
      display: "flex",
      gap: 2,
      flexWrap: "wrap",
      alignItems: "center",
      width: "100%",
    }}
  >
    {/* SEARCH BAR */}
    <Box
      sx={{
        position: "relative",
        flex: "1 1 320px",
        minWidth: {
          xs: "100%",
          md: 320,
        },
      }}
    >
      <SearchIcon
        sx={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: "text.secondary",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <TextField
        variant="outlined"
        type="text"
        placeholder="Search users by name, email, or username..."
        value={searchQuery}
        name={searchFieldName}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setPage(0);
        }}
        autoComplete="new-password"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
            borderRadius: 1,
          },

          "& .MuiInputBase-input": {
            pl: 6,
            color: "#000000",
          },
        }}
        slotProps={{
          htmlInput: {
            autoComplete: "new-password",
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: false,
          },
        }}
      />
    </Box>

    {/* ROLE */}
    <TextField
      select
      label="Role"
      value={roleFilter}
      onChange={(e) => {
        setRoleFilter(e.target.value);
        setPage(0);
      }}
      size="small"
      sx={{
        minWidth: 160,
        backgroundColor: "#ffffff",
        borderRadius: 1,
      }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="admin">Admin</MenuItem>
      <MenuItem value="editor">Editor</MenuItem>
      <MenuItem value="viewer">Viewer</MenuItem>
    </TextField>

    {/* GENDER */}
    <TextField
      select
      label="Gender"
      value={genderFilter}
      onChange={(e) => {
        setGenderFilter(e.target.value);
        setPage(0);
      }}
      size="small"
      sx={{
        minWidth: 160,
        backgroundColor: "#ffffff",
        borderRadius: 1,
      }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="Male">Male</MenuItem>
      <MenuItem value="Female">Female</MenuItem>
    </TextField>

    {/* STATUS */}
    <TextField
      select
      label="Status"
      value={statusFilter}
      onChange={(e) => {
        setStatusFilter(e.target.value);
        setPage(0);
      }}
      size="small"
      sx={{
        minWidth: 160,
        backgroundColor: "#ffffff",
        borderRadius: 1,
      }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="inactive">Inactive</MenuItem>
    </TextField>
  </Box>
</Box>

      <TableContainer
        component={Paper}
        sx={{
          mb: 5,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography>Loading users...</Typography>
                </TableCell>
              </TableRow>
            ) : paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Alert severity="info">No users found.</Alert>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>
                    {row.firstName} {row.lastName}
                  </TableCell>

                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.email}</TableCell>

                  <TableCell>
                    <Chip label={row.type} />
                  </TableCell>

                  <TableCell>{row.contactNumber}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.address}</TableCell>

                  <TableCell>
                    <Chip
                      label={row.isActive !== false ? "Active" : "Inactive"}
                      color={row.isActive !== false ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(row._id)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        color={row.isActive !== false ? "error" : "success"}
                        onClick={() =>
                          handleToggleActive(row._id, row.isActive !== false)
                        }
                      >
                        {row.isActive !== false ? "Active" : "Inactive"}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        count={filteredUsers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: "#ffffff",
          "& .MuiTablePagination-selectLabel": {
            color: "#ffffff",
          },
          "& .MuiTablePagination-displayedRows": {
            color: "#ffffff",
          },
          "& .MuiTablePagination-select": {
            color: "#ffffff",
          },
          "& .MuiIconButton-root": {
            color: "#ffffff",
          },
        }}
      />

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5">
            {isEditing ? "Edit User" : "Add User"}
          </Typography>

          <form autoComplete="off">
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      firstName: e.target.value,
                    })
                  }
                  {...fieldError("firstName")}
                  {...disableAutoFill}
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      lastName: e.target.value,
                    })
                  }
                  {...fieldError("lastName")}
                  {...disableAutoFill}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={newUser.age}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      age: e.target.value,
                    })
                  }
                  {...fieldError("age")}
                  {...disableAutoFill}
                />

                <FormControl fullWidth error={Boolean(errors.gender)}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={newUser.gender}
                    label="Gender"
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        gender: e.target.value,
                      })
                    }
                    IconComponent={ExpandMoreIcon}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>

                  {errors.gender && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, ml: 2 }}
                    >
                      {errors.gender}
                    </Typography>
                  )}
                </FormControl>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  value={newUser.contactNumber}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      contactNumber: e.target.value,
                    })
                  }
                  {...fieldError("contactNumber")}
                  {...disableAutoFill}
                />

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      email: e.target.value,
                    })
                  }
                  {...fieldError("email")}
                  {...disableAutoFill}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={newUser.type}
                    label="Type"
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        type: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="editor">Editor</MenuItem>
                    <MenuItem value="viewer">Viewer</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      username: e.target.value,
                    })
                  }
                  {...fieldError("username")}
                  autoComplete="off"
                  inputProps={{
                    autoComplete: "off",
                    name: "random-user-field",
                  }}
                />
              </Stack>

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    password: e.target.value,
                  })
                }
                {...fieldError("password")}
                autoComplete="new-password"
                inputProps={{
                  autoComplete: "new-password",
                  name: "random-pass-field",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Address"
                multiline
                rows={3}
                value={newUser.address}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: e.target.value,
                  })
                }
                {...fieldError("address")}
                {...disableAutoFill}
              />

              <Stack direction="row" spacing={2}>
                <Button onClick={handleClose}>Cancel</Button>

                <Button variant="contained" onClick={handleSaveUser}>
                  {isEditing ? "Save" : "Add"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UsersPage;