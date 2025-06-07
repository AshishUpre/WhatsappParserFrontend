import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchFiles from '../hooks/useFetchFiles';
import { Container, List, ListItem, ListItemText, Button, CircularProgress, Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const UserFiles = ({ showDeleteButtons }) => {
    const { files, error, loading, fetchFiles } = useFetchFiles();
    const { fileDriveId } = useParams();
    const navigate = useNavigate();

    const handleFileClick = (fileId) => {
        if (fileId !== fileDriveId) {
            navigate(`/chat/${fileId}`);
        }
    };

    const handleDelete = async (fileId) => {
        if (!window.confirm("Are you sure you want to delete this file? The corresponding chats will also be deleted and this can't be undone")) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/drive/${fileId}`, { method: "DELETE", credentials: "include" });
            if (!res.ok) throw new Error("Failed to delete file");
            const respText = await res.text()
            console.log("response of delete is : ", respText);
            fetchFiles(); // Refresh the list
        } catch (err) {
            alert("Error deleting file: " + err.message);
        }
    };
    

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <Container maxWidth="sm">
            <h3>Your Files:</h3>

            <Button variant="contained" color="primary" onClick={fetchFiles} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Refresh Files'}
            </Button>

            {error && <Alert severity="error">{error}</Alert>}

            {files.length === 0 ? (
                <p>No files found.</p>
            ) : (
                <List>
                {files.map((file, index) => (
                    <ListItem
                    key={index}
                    selected={file.second === fileDriveId}
                    secondaryAction = { showDeleteButtons ? (
                        <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(file.second)
                        }}
                        startIcon={<DeleteIcon />}
                        >
                        Delete
                        </Button>
                    ) : null}
                    button
                    onClick={() => handleFileClick(file.second)}
                    >
                    <ListItemText primary={file.first} />
                    </ListItem>
                ))}
                </List>
            )}
        </Container>
    );
};

export default UserFiles;
