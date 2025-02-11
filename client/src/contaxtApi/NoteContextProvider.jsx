import { useEffect, useState } from "react";
import axios from "axios";
import NoteContext from "./context";
import PropTypes from "prop-types";


const NoteContextProvider = ({ children }) => {
    const [notes, setNote] = useState(null);


    // Set default base URL
    axios.defaults.baseURL = 'http://localhost:3000/api';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['auth-token'] = localStorage.getItem("auth-token");

    const fetchNotes = async () => {
        try {
            const response = await axios.get("/notes/fetchNotes");
            setNote(response.data.notes);
        } catch (error) {
            console.error("Error fetching notes:", error.response?.data || error.message);
        }
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        if (isLoggedIn || localStorage.getItem("auth-token")) {
            fetchNotes();
        }
    }, [isLoggedIn]);

    const [editNote, setEditNote] = useState(null);
    const [modalType, setModalType] = useState("");
    const [alertType, setAlertType] = useState(null);
    const [alertMsg, setAlertMsg] = useState(null);

    const handleNoteUpdate = async (Id, note) => {
        try {
            const updateNote = await axios.put(`/notes/updateNote/${Id}`, note);
            setAlertMsg(updateNote.data.msg);
            setAlertType('success');
        } catch (error) {
            if (error.response.data.errors) {
                const errorMessage = error.response.data.errors
                    .map(error => `<strong>${error.msg}</strong> <span>(Field: ${error.path})</span>`)
                    .join('<br/>');
                setAlertMsg(errorMessage);
                setAlertType('warning');
            } else {
                setAlertMsg("An error occurred while updating the note.");
                setAlertType('danger');
            }
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
            if (error.response.data.errors) {
                const errorMessage = error.response.data.errors
                    .map(error => `<strong>${error.msg}</strong> <span>(Field: ${error.path})</span>`)
                    .join('<br/>');
                setAlertMsg(errorMessage);
                setAlertType('warning');
            } else {
                setAlertMsg("An error occurred while adding the note.");
                setAlertType('danger');
            }
            console.error(error);
        }
        fetchNotes();
    };

    const handleLogin = async (formData) => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", { email: formData.email, password: formData.password });
            setIsLoggedIn(false)
            localStorage.setItem("auth-token", response.data.token);
            console.log(localStorage.getItem("auth-token"));
            setIsLoggedIn(true);
            return true;
        } catch (error) {
            console.error("Error during login:", error.response?.data || error.message);
        }
    };

    return (
        <NoteContext.Provider value={{
            notes, setNote, editNote, setEditNote, handleNoteDelete, handleNoteUpdate, modalType,
            setModalType, handleAddNote, alertMsg, alertType, handleLogin
        }}>
            {children}
        </NoteContext.Provider>
    );
};

NoteContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default NoteContextProvider;
