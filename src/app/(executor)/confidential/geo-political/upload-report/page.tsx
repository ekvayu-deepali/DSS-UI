"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Paper, Typography, Input, Stack } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { PageHeader } from "@/components/common";

export default function UploadReport() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    isConfidential: true,
    origin: "",
    originType: "web",
    sourceCode: "",
    dateTime: DateTime.now(),
    description: "",
    summary: "",
    classification: "",
    topic: "",
    file: null,
    fileName: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      dateTime: newValue
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0],
        fileName: e.target.files[0].name
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    console.log("Form submitted:", formData);
    // Submit to API
    router.push("/confidential/geo-political");
  };

  const handleCancel = () => {
    router.push("/confidential/geo-political");
  };

  const topics = [
    "Aircraft Technology",
    "Weapons",
    "Awareness",
    "Close Air Support"
  ];

  return (
    <>
      {/* <PageHeader 
        title="Upload Report" 
        actions={
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleCancel}
          >
            Back
          </Button>
        } 
      /> */}
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 2, 
          mx: 'auto', 
          maxWidth: 900,
          borderRadius: 2
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="600" color="primary" gutterBottom>
                Report Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            {/* First Row - Confidential and Classification */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.isConfidential}
                    onChange={handleChange}
                    name="isConfidential"
                    color="primary"
                  />
                }
                label={
                  <Typography fontWeight="500">
                    Mark as Confidential
                  </Typography>
                }
                sx={{ alignItems: 'flex-start', mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel id="classification-label" shrink>Classification</InputLabel>
                <Select
                  labelId="classification-label"
                  id="classification"
                  name="classification"
                  value={formData.classification}
                  label="Classification"
                  onChange={handleChange}
                  required
                  displayEmpty
                  notched
                >
                  <MenuItem value="" disabled>Select classification</MenuItem>
                  <MenuItem value="threat-warning">Threat Warning</MenuItem>
                  <MenuItem value="immediate-action">Immediate Action</MenuItem>
                  <MenuItem value="information">Information</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Second Row - Origin and Type */}
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
                placeholder="Enter source origin"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Origin Type
                </Typography>
                <RadioGroup
                  row
                  name="originType"
                  value={formData.originType}
                  onChange={handleChange}
                  sx={{ justifyContent: 'space-between' }}
                >
                  <FormControlLabel 
                    value="web" 
                    control={<Radio size="small" />} 
                    label="Web" 
                    sx={{ marginRight: 0 }}
                  />
                  <FormControlLabel 
                    value="mail" 
                    control={<Radio size="small" />} 
                    label="Mail" 
                    sx={{ marginRight: 0 }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Third Row - Source Code and Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Source Code"
                name="sourceCode"
                value={formData.sourceCode}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DateTimePicker
                  label="Date & Time"
                  value={formData.dateTime}
                  onChange={handleDateChange}
                  slotProps={{ 
                    textField: { 
                      fullWidth: true,
                    } 
                  }}
                />
              </LocalizationProvider>
            </Grid>

            {/* Topic Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="topic-label" shrink>Topic</InputLabel>
                <Select
                  labelId="topic-label"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  label="Topic"
                  onChange={handleChange}
                  required
                  displayEmpty
                  notched
                >
                  <MenuItem value="" disabled>Select topic</MenuItem>
                  {topics.map((topic) => (
                    <MenuItem key={topic} value={topic.toLowerCase().replace(/\s+/g, '-')}>
                      {topic}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                placeholder="Enter detailed description of the report"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    alignItems: 'flex-start'
                  }
                }}
              />
            </Grid>

            {/* Summary */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                multiline
                rows={3}
                required
                placeholder="Provide a brief summary"
              />
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  border: '1px dashed',
                  borderColor: 'divider',
                  p: 3, 
                  borderRadius: 1,
                  textAlign: 'center',
                  bgcolor: 'action.hover'
                }}
              >
                <input
                  accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  style={{ display: 'none' }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<AttachFileIcon />}
                    sx={{ mb: 2 }}
                  >
                    Attach Document
                  </Button>
                </label>
                
                {formData.fileName && (
                  <Box mt={2}>
                    <Chip 
                      label={formData.fileName} 
                      onDelete={() => setFormData({...formData, file: null, fileName: ""})}
                      color="primary"
                      variant="outlined"
                      sx={{ maxWidth: '100%' }}
                    />
                  </Box>
                )}
                
                <Typography variant="caption" color="text.secondary" mt={1} display="block">
                  Supported formats: PDF, DOC, DOCX (Max 10MB)
                </Typography>
              </Box>
            </Grid>

            {/* Form Actions */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button 
                  variant="outlined" 
                  onClick={handleCancel}
                  size="large"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  startIcon={<UploadIcon />}
                  size="large"
                >
                  Upload Report
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}