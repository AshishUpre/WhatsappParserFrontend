import { useState } from "react";
import axios from "axios";

const useFetchFiles = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchFiles = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/files`, { withCredentials: true });
            setFiles(response.data);
        } catch (err) {
            setError('Failed to fetch files');
            console.error(err);
        }
        setLoading(false);
    };

    return { files, error, loading, fetchFiles };
};

export default useFetchFiles;
