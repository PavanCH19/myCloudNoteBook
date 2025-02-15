import { useEffect, useState } from "react";
import axios from "axios";
import NoteContext from "./context";
import PropTypes from "prop-types";

const NoteContextProvider = ({ children }) => {
    const [notes, setNote] = useState(null);

    // Set default base URL and headers from environment variables
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['auth-token'] = localStorage.getItem("auth-token") || import.meta.env.VITE_AUTH_TOKEN;

    const fetchNotes = async () => {
        try {
            const response = await axios.get("/notes/fetchNotes");
            setNote(response.data.notes);
        } catch (error) {
            console.error("Error fetching notes:", error.response?.data || error.message);
        }
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const token = localStorage.getItem("auth-token");

    // Function to check if the token is expired
    const isTokenExpired = (token) => {
        if (!token) return true; // If no token, treat it as expired
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
            const expiry = payload.exp * 1000; // Convert expiry time to milliseconds
            return Date.now() > expiry; // Compare with current time
        } catch (error) {
            console.log(error)
            return true; // If decoding fails, consider it expired
        }
    };

    useEffect(() => {
        isTokenExpired(token);
        if (isLoggedIn || token) {
            fetchNotes();
        }
        if (token && !isTokenExpired(token)) {
            setIsLoggedIn(true); // Set user as logged in
            getUser();
        } else {
            localStorage.removeItem('auth-token'); // Remove expired token
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);


    const [editNote, setEditNote] = useState(null);
    const [modalType, setModalType] = useState("");
    const [alertType, setAlertType] = useState(null); // Restore from localStorage
    const [alertMsg, setAlertMsg] = useState(null); // Restore from localStorage

    const handleNoteUpdate = async (Id, note) => {
        try {
            const updateNote = await axios.put(`/notes/updateNote/${Id}`, note);
            setAlertMsg(updateNote.data.msg);
            setAlertType('success');
        } catch (error) {
            const errorMessage = error.response?.data?.errors
                ? error.response.data.errors
                    .map(error => `<strong>${error.msg}</strong> <span>(Field: ${error.path})</span>`)
                    .join('<br/>')
                : "An error occurred while updating the note.";
            setAlertMsg(errorMessage);
            setAlertType('warning');
            console.error(error);
        }
        fetchNotes();
    };

    const handleNoteDelete = async (note) => {
        try {
            await axios.delete(`/notes/deleteNote/${note._id}`);
            setAlertMsg(`Note with ID ${note._id} has been deleted.`);
            setAlertType('success');
        } catch (error) {
            setAlertMsg("An error occurred while deleting the note.");
            setAlertType('danger');
            console.error(error);
        }
        fetchNotes();
    };

    const handleAddNote = async (note) => {
        try {
            const addNote = await axios.post('/notes/createNote', note);
            setAlertMsg(addNote.data.msg);
            setAlertType('success');
        } catch (error) {
            const errorMessage = error.response?.data?.errors
                ? error.response.data.errors
                    .map(error => `<strong>${error.msg}</strong> <span>(Field: ${error.path})</span>`)
                    .join('<br/>')
                : "An error occurred while adding the note.";
            setAlertMsg(errorMessage);
            setAlertType('danger');
            console.error(error);
        }
        fetchNotes();
    };

    const handleCreateUser = async (formData) => {
        try {
            const createUser = await axios.post("/auth/createUser", formData);
            setAlertMsg(createUser.data.msg || "User created successfully.");
            setAlertType('success');
            setIsLoggedIn(false); // Set to false as you might want the user to login again after creation
        } catch (error) {
            const errorMessage = error.response?.data?.errors
                ? error.response.data.errors
                    .map(error => `<strong>${error.msg}</strong> <span>(Field: ${error.path})</span>`)
                    .join('<br/>')
                : "An error occurred during user creation.";
            setAlertMsg(errorMessage);
            setAlertType('danger');
            console.error("Error during user creation:", error.response?.data || error.message);
        }
    };

    const handleLogin = async (formData) => {
        try {
            const response = await axios.post("/auth/login", { email: formData.email, password: formData.password });
            setIsLoggedIn(false);
            localStorage.setItem("auth-token", response.data.token);
            axios.defaults.headers.common["auth-token"] = response.data.token;
            await fetchNotes();
            setIsLoggedIn(true);
            window.location.href = "/";
            // console.log('asdfasdf', response.status)

        } catch (error) {
            setAlertMsg("Login failed. Please check your credentials.");
            setAlertType('danger');
            console.error("Error during login:", error.response?.data || error.message);

        }
    };

    const [user, setUser] = useState({
        username: "",
        profileImage: "../../public/vite.svg" // Updated to use absolute path
    });

    const getUser = async () => {
        try {
            const res = await axios.post('/auth/getUser');
            const useremail = res.data.user.email;
            const userProfileImage = res.data.user.profileImage || "../../public/vite.svg"; // Use the profile image returned by API

            setUser({
                username: useremail,
                profileImage: userProfileImage
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        setIsLoggedIn(false);
        setUser({
            username: "",
            profileImage: "../../public/vite.svg"
        });
    }


    useEffect(() => {
        if (alertMsg && alertType) {
            const timer = setTimeout(() => {
                setAlertMsg(null);
                setAlertType(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alertMsg, alertType]);

    return (
        <NoteContext.Provider value={{
            notes, setNote, editNote, setEditNote, handleNoteDelete, handleNoteUpdate, modalType,
            setModalType, handleAddNote, alertMsg, alertType, handleLogin, handleCreateUser, isLoggedIn, user, handleLogout
        }}>
            {children}
        </NoteContext.Provider>
    );
};

NoteContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default NoteContextProvider;
