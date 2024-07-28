import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            View Audience
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={showPopup ? 'blur' : ''}>
        <Button
          variant="contained"
          color="primary"
          onClick={togglePopup}
          style={{ marginTop: '20px', marginLeft: '20px' }}
        >
          Save segment
        </Button>
      </Container>
      {showPopup && <Popup togglePopup={togglePopup} />}
    </div>
  );
}

function Popup({ togglePopup }) {
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');

  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ];

  const addSchema = () => {
    if (selectedSchema) {
      setSchemas([...schemas, selectedSchema]);
      setSelectedSchema('');
    }
  };

  const removeSchema = (index) => {
    setSchemas(schemas.filter((_, i) => i !== index));
  };

  const handleSaveSegment = async () => {
    const payload = {
      segment_name: segmentName,
      schema: schemas.map(schemaValue => {
        const schemaOption = schemaOptions.find(option => option.value === schemaValue);
        return { [schemaValue]: schemaOption.label };
      }),
    };


    try {
      const response = await fetch('http://localhost:8080/https://webhook.site/dd9b0388-d25c-49cf-ba36-6f0ced557d56', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const textResponse = await response.text();
      console.log('Segment saved successfully:', textResponse);
    } catch (error) {
      console.error('Error:', error);
    }
    finally {
      console.log(payload);
    }
  };

  return (
    <Dialog open onClose={togglePopup} fullWidth maxWidth="sm" PaperProps={{ style: { position: 'absolute', right: 0, top: 0, margin: 0, height: '100%' } }}>
      <DialogTitle>
        <Typography variant="h6">Saving Segment</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Enter the Name of the Segment"
          fullWidth
          margin="normal"
          value={segmentName}
          onChange={e => setSegmentName(e.target.value)}
        />
        <Typography variant="body2" gutterBottom>
          To save your segment, you need to add the schemas to build the query
        </Typography>
        <Box
          sx={{
            border: '2px solid blue',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '4px'
          }}
        >
          {schemas.map((schema, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Select
                value={schema}
                disabled
                fullWidth
                sx={{ mr: 1 }}
              >
                <MenuItem value={schema}>{schemaOptions.find(option => option.value === schema).label}</MenuItem>
              </Select>
              <IconButton onClick={() => removeSchema(index)}>
                <RemoveIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <FormControl fullWidth margin="normal">
          <InputLabel>Add schema to segment</InputLabel>
          <Select
            value={selectedSchema}
            onChange={e => setSelectedSchema(e.target.value)}
          >
            {schemaOptions
              .filter(option => !schemas.includes(option.value))
              .map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button onClick={addSchema} color="primary" startIcon={<AddIcon />}>
          Add new schema
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveSegment} color="primary" variant="contained">
          Save the segment
        </Button>
        <Button onClick={togglePopup} color="secondary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default App;
