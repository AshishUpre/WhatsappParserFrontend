import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchFiles from '../hooks/useFetchFiles';
import { Container, List, ListItem, ListItemText, Button, CircularProgress, Alert } from "@mui/material";

const UserFiles = () => {
    const { files, error, loading, fetchFiles } = useFetchFiles();
    const { fileDriveId } = useParams();
    const navigate = useNavigate();

    const handleFileClick = (fileId) => {
        if (fileId !== fileDriveId) {
            navigate(`/chat/${fileId}`);
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
                            button="true"
                            selected={file.second === fileDriveId}
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
