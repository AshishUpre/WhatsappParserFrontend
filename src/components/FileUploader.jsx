import React, { useState } from "react";
import axios from "axios";
import {
    Button,
    CircularProgress,
    Container,
    Typography,
    Alert,
    Card,
    CardContent,
    Box,
    LinearProgress
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            setMessage("");
            setProgress(10);

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/drive/upload`,
                formData,
                {
                    withCredentials: true,
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    },
                }
            );

            setMessage(response.data || "File uploaded successfully!");
        } catch (error) {
            setMessage(`Upload failed: ${error.response?.data || error.message}`);
        } finally {
            setLoading(false);
            setProgress(0);
        }
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 3, mt: 5, textAlign: "center", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Upload a File
                    </Typography>

                    <Box
                        sx={{
                            border: "2px dashed #aaa",
                            borderRadius: 2,
                            p: 3,
                            mb: 2,
                            cursor: "pointer",
                            bgcolor: "#f9f9f9",
                            "&:hover": { bgcolor: "#eee" },
                        }}
                        onClick={() => document.getElementById("fileInput").click()}
                    >
                        <CloudUploadIcon sx={{ fontSize: 50, color: "#666" }} />
                        <Typography variant="body1" color="textSecondary">
                            {file ? file.name : "Click to select a file"}
                        </Typography>
                    </Box>

                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />

                    {loading && <LinearProgress sx={{ my: 2 }} variant="determinate" value={progress} />}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={loading}
                        startIcon={!loading && <CloudUploadIcon />}
                        sx={{ mt: 2, width: "100%" }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
                    </Button>

                    {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
                </CardContent>
            </Card>
        </Container>
    );
};

export default FileUploader;
