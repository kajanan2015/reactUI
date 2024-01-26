
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';



const StudentManagement = () => {

 
const theme = createTheme({
  
  palette: {
    mode: 'light', 
  },
  
}); 
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    student_id: '',
    age: '',
    grade: '',
    parents_phone_number: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  const handleAddStudent = async () => {
    try {
      await axios.post('http://localhost:8000/api/students', formData);
      fetchStudents();
      setFormData({
        first_name: '',
        last_name: '',
        student_id: '',
        age: '',
        grade: '',
        parents_phone_number: '',
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };
  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/students/${studentId}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    console.log(student)
    // setFormData({...formData,
    //   first_name: student.first_name,
    //   last_name: student.last_name,
    //   student_id: student.student_id,
    //   age: student.age,
    //   grade: student.grade,
    //   parents_phone_number: student.parents_phone_number,
    // });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setFormData({
      first_name: '',
      last_name: '',
      student_id: '',
      age: '',
      grade: '',
      parents_phone_number: '',
    });
  };

  const handleUpdate = async () => {
    try {
      if (editingStudent) {
        await axios.put(`http://localhost:8000/api/students/${editingStudent.id}`, formData);
        fetchStudents();
        handleCancelEdit();
      } else {
        console.error('No student is being edited.');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };
  

  const renderTableRows = () => {
    return students.map((student) => (
      <ThemeProvider theme={theme}>

      <TableRow key={student.id}>
        <TableCell>{student.first_name}</TableCell>
        <TableCell>{student.last_name}</TableCell>
        <TableCell>{student.student_id}</TableCell>
        <TableCell>{student.age}</TableCell>
        <TableCell>{student.grade}</TableCell>
        <TableCell>{student.parents_phone_number}</TableCell>
        <TableCell>
          {editingStudent && editingStudent.id === student.id ? (
            <>
              <Button color="primary" onClick={handleUpdate}>
                Save
              </Button>
              <Button color="secondary" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </>
          ) : (
            <>
            <button onClick={() => handleEdit(student)}>
              Edit
            </button>
             <Button color="secondary" onClick={() => handleDelete(student.id)}>
             Delete
           </Button>
           </>
          )}
        </TableCell>
      </TableRow>
      </ThemeProvider>

    ));
  };

  return (
    <>
     <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Student Management System</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} style={{ padding: '20px' }}>
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Parents Phone Number</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            {editingStudent ? 'Edit Student' : 'Add Student'}
          </Typography>
          <form>
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Student ID"
              name="student_id"
              value={formData.student_id}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Parents Phone Number"
              name="parents_phone_number"
              value={formData.parents_phone_number}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color={editingStudent ? 'default' : 'primary'}
              onClick={editingStudent ? handleCancelEdit : handleAddStudent}
              style={{ marginTop: '20px' }}
            >
              {editingStudent ? 'Cancel' : 'Add Student'}
            </Button>
          </form>
        </Grid>
      </Grid>
      </ThemeProvider>
    </>
  );
};

export default StudentManagement;
