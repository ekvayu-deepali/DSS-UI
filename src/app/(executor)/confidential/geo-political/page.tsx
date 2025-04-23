'use client';

import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    FormControlLabel,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Paper,
    Button,
    RadioGroup,
    Radio,
    FormLabel,
    Stack,
    Divider,
    Container,
    styled
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Styled components for file upload
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 900,
    margin: '24px auto',
    borderRadius: '12px',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
    backgroundImage: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    position: 'relative',
    paddingBottom: theme.spacing(1),
    '&:after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '50px',
        height: '3px',
        backgroundColor: theme.palette.primary.main,
    }
}));

const FormSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
}));

const GeoConfidentialForm = () => {
    const [isConfidential, setIsConfidential] = useState(false);
    const [origin, setOrigin] = useState('web');
    const [sourceCode, setSourceCode] = useState('');
    const [dateTime, setDateTime] = useState<DateTime | null>(DateTime.now());
    const [description, setDescription] = useState('');
    const [summary, setSummary] = useState('');
    const [classification, setClassification] = useState('information');
    const [topic, setTopic] = useState('awareness');
    const [files, setFiles] = useState<FileList | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = {
            isConfidential,
            origin,
            sourceCode,
            dateTime: dateTime?.toISO(),
            description,
            summary,
            classification,
            topic,
            filesCount: files?.length || 0
        };

        console.log('Form data submitted:', formData);
        // Here you would typically send the data to your API
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(event.target.files);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <StyledPaper>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
                    Geo-Political Confidential Information
                </Typography>
                <Divider sx={{ mb: 4 }} />

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    {/* Header Section */}
                    <FormSection>
                        <SectionTitle variant="h6">Classification & Origin</SectionTitle>
                        <Stack spacing={3} direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isConfidential}
                                        onChange={(e) => setIsConfidential(e.target.checked)}
                                        color="primary"
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    />
                                }
                                label={<Typography variant="subtitle1" fontWeight={500}>Confidential</Typography>}
                            />

                            <FormControl component="fieldset" sx={{ ml: { xs: 0, sm: 2 } }}>
                                <FormLabel component="legend" sx={{ fontWeight: 500 }}>Origin</FormLabel>
                                <RadioGroup
                                    row
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                >
                                    <FormControlLabel value="web" control={<Radio />} label="Web" />
                                    <FormControlLabel value="mail" control={<Radio />} label="Mail" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>

                        <TextField
                            fullWidth
                            label="Source Code"
                            value={sourceCode}
                            onChange={(e) => setSourceCode(e.target.value)}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                    </FormSection>

                    {/* Date and Classification Section */}
                    <FormSection>
                        <SectionTitle variant="h6">Date & Classification</SectionTitle>
                        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
                            <Box sx={{ width: '100%' }}>
                                <DateTimePicker
                                    label="Date and Time"
                                    value={dateTime}
                                    onChange={(newValue) => setDateTime(newValue)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: 'outlined',
                                            sx: { mb: { xs: 2, md: 0 } }
                                        }
                                    }}
                                />
                            </Box>

                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="classification-label">Classification</InputLabel>
                                <Select
                                    labelId="classification-label"
                                    value={classification}
                                    onChange={(e) => setClassification(e.target.value)}
                                    label="Classification"
                                >
                                    <MenuItem value="threat-warning">Threat Warning</MenuItem>
                                    <MenuItem value="immediate-action">Immediate Action</MenuItem>
                                    <MenuItem value="information">Information</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </FormSection>

                    {/* Topic Section */}
                    <FormSection>
                        <SectionTitle variant="h6">Topic</SectionTitle>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="topic-label">Topic</InputLabel>
                            <Select
                                labelId="topic-label"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                label="Topic"
                            >
                                <MenuItem value="aircraft-technology">Aircraft Technology</MenuItem>
                                <MenuItem value="weapons">Weapons</MenuItem>
                                <MenuItem value="awareness">Awareness</MenuItem>
                                <MenuItem value="close-air-support">Close Air Support</MenuItem>
                            </Select>
                        </FormControl>
                    </FormSection>

                    {/* Description Section */}
                    <FormSection>
                        <SectionTitle variant="h6">Details</SectionTitle>
                        <TextField
                            fullWidth
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="Enter a detailed description here..."
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            fullWidth
                            label="Summary"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            multiline
                            rows={3}
                            variant="outlined"
                            placeholder="Provide a concise summary..."
                        />
                    </FormSection>

                    {/* Media Upload Section */}
                    <FormSection>
                        <SectionTitle variant="h6">Media Attachments</SectionTitle>
                        <Box sx={{ textAlign: 'center', py: 3, backgroundColor: 'rgba(0, 0, 0, 0.03)', borderRadius: '8px', border: '2px dashed rgba(0, 0, 0, 0.12)' }}>
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    mb: 2,
                                    py: 1.5,
                                    px: 3,
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 500
                                }}
                            >
                                Upload Files
                                <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
                            </Button>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {files && files.length > 0
                                    ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
                                    : 'Supported formats: JPG, PNG, PDF, DOC, MP4'}
                            </Typography>
                        </Box>
                    </FormSection>

                    {/* Submit Button */}
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                px: 6,
                                py: 1.5,
                                borderRadius: '28px',
                                fontSize: '1.1rem',
                                textTransform: 'none',
                                fontWeight: 600,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                '&:hover': {
                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                                }
                            }}
                        >
                            Submit Report
                        </Button>
                    </Box>
                </Box>
            </StyledPaper>
        </LocalizationProvider>
    );
};

export default function GeoConfidentialPage() {
    return (
        <Container maxWidth="lg">
            <GeoConfidentialForm />
        </Container>
    );
} 