import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/styles.ChatViewer.module.css';
import UserFiles from './UserFiles';
import { Switch, CircularProgress } from "@mui/material";

const ChatViewer = () => {
    const { fileDriveId } = useParams();
    const [messages, setMessages] = useState([]);
    const [cursor, setCursor] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageSender, setMessageSender] = useState("");
    const [senderNameFieldValue, setSenderNameFieldValue] = useState("");
    const chatContainerRef = useRef(null);
    const firstLoadRef = useRef(true);
    const isUserAtBottomRef = useRef(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(false);

    const goHomeIfNotAuthenticated = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, { withCredentials: true })
            .then(() => {
            })
            .catch(() => {
                // User is not authenticated, go home
                navigate("/");
            });
    };
  
    useEffect(() => {
        goHomeIfNotAuthenticated();
    }, []);

    const ToggleDarkMode = ({ darkMode, setDarkMode }) => (
        <div className="flex items-center space-x-2">
            <span>🌞</span>
            <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
            <span>🌙</span>
        </div>
    );

    useEffect(() => {
        document.body.classList.toggle(styles.darkMode, darkMode);
        document.body.classList.toggle(styles.lightMode, !darkMode);
    }, [darkMode]);

    const fetchChats = useCallback(async (resetCursor = false) => {
        if (loading) 
            return;
        setLoading(true);

        try {
            const requestCursor = resetCursor ? "" : cursor;
            const response = await axios.get(`${API_BASE_URL}/chats/${fileDriveId}/cursor=${requestCursor}`, {
                withCredentials: true
            });

            let { chatList, cursor: newCursor } = response.data;

            if (chatList.length > 0) {
                const chatContainer = chatContainerRef.current;
                chatList = chatList.reverse();

                if (firstLoadRef.current) {
                    setMessages(chatList);
                    firstLoadRef.current = false;
                } else {
                    const prevScrollHeight = chatContainer.scrollHeight;

                    // append new messages at the start (top)
                    setMessages(prev => [...chatList, ...prev]);

                    requestAnimationFrame(() => {
                        chatContainer.scrollTop = chatContainer.scrollHeight - prevScrollHeight;
                    });
                }
                setCursor(newCursor);
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
        setLoading(false);
    }, [fileDriveId, loading]);


    // first time loading chats
    useEffect(() => {
        setMessages([]);
        firstLoadRef.current = true;
        setCursor("");
        fetchChats(true);
    }, [fileDriveId]);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer && isUserAtBottomRef.current) {
            requestAnimationFrame(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            });
        }
    }, [messages]);

    const handleScroll = () => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer) 
            return;

        isUserAtBottomRef.current = chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight + 10;

        if (chatContainer.scrollTop === 0 && !loading) {
            fetchChats();
        }
    };

    const goingDark = () => {
        if (!darkMode) {
            document.body.classList.toggle(styles.darkMode, !darkMode);
            document.body.classList.toggle(styles.lightMode, darkMode);
        }
    }

    const formatDate = (timestamp) => timestamp.split(", ")[0];

    return (
        <div className={styles.chatWrapper}>
            {/* left panel */}
            <div className={styles.sidebar}>
                {/* Navigation Buttons */}
                <div className={styles.navButtons}>
                    {/* when going out of ChatViewer, set all to darkMode */}
                    <button onClick={() => {
                            goingDark()
                            navigate("/")
                        }
                    } className={styles.navButton}>
                        🏠 Home
                    </button>
                    <button onClick={() => {
                            goingDark()
                            navigate("/dashboard")
                        }
                    } className={styles.navButton}>
                        📊 Dashboard
                    </button>
                </div>

                {/* Chat Info */}
                {/* <h3>Chat Info</h3>
                <p>Details about the chat...</p> */}

                {/* Dark Mode Toggle */}
                <div className={styles.toggleContainer}>
                    <ToggleDarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
                    <p>Current Mode: {darkMode ? "🌙 Dark" : "☀️ Light"}</p>
                </div>

                {/* Sender Selection */}
                <div className={styles.sidebarContent}>
                    <div className={styles.senderForm}>
                        <h2>Choose Sender:</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setMessageSender(senderNameFieldValue);
                        }}>
                            <label>Name:</label>
                            <input type="text" value={senderNameFieldValue} onChange={(e) => setSenderNameFieldValue(e.target.value)} />
                            <button type="submit">Set Sender</button>
                        </form>
                    </div>

                    {/* User Files Section */}
                    <div className={styles.userFilesContainer}>
                        <UserFiles showDeleteButtons = {false} />
                    </div>
                </div>
            </div>



            {/* chat viewing panel */}
            <div className={styles.chatContainer} ref={chatContainerRef} onScroll={handleScroll}>
                {loading && (
                    <div className={styles.loadingContainer}>
                        <CircularProgress size={40} />
                    </div>
                )}

                <div className={styles.chatMessages}>
                    {messages.map((msg, index) => {
                        const currentDate = formatDate(msg.timestamp);
                        const prevDate = index > 0 ? formatDate(messages[index - 1].timestamp) : null;
                        const showDateSeparator = index === 0 || currentDate !== prevDate;

                        return (
                            <React.Fragment key={index}>
                                {showDateSeparator && <div className={styles.dateSeparator}>{currentDate}</div>}
                                <div className={`${styles.chatBubble} ${msg.sender === messageSender ? styles.sent : styles.received}`}>
                                    <div className={styles.chatHeader}>
                                        <strong>{msg.sender}</strong>
                                        <small className={styles.chatTimestamp}>{msg.timestamp.split(", ")[1]}</small>
                                    </div>
                                    <p>{msg.message}</p>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChatViewer;
