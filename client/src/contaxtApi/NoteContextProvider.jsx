import { useEffect, useState } from "react";
import axios from "axios";
import NoteContext from "./context";
import PropTypes from "prop-types";

const NoteContextProvider = ({ children }) => {
    const [notes, setNote] = useState(null);

    // Set default base URL
    axios.defaults.baseURL = 'http://localhost:3000/api';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['auth-token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTZkZWIzY2RmNTYyODE2NmM3NDA1OSIsImlhdCI6MTczOTI1Mjk4MywiZXhwIjoxNzM5MjU2NTgzfQ.38CMPPPziMp3zGjBh2ZZxdn1rJ3v5AFD9eJsNtAZW1o";
    const fetchNotes = async () => {
        try {
            const response = await axios.get("/notes/fetchNotes");
            setNote(response.data.notes);
        } catch (error) {
            console.error("Error fetching notes:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const [editNote, setEditNote] = useState(null);
    const [modalType, setModalType] = useState("");
    const [alertType, setAlertType] = useState(null);
    const [alertMsg, setAlertMsg] = useState(null);

    const handleNoteUpdate = async (Id, note) => {
        try {
            const addNote = await axios.put(`/notes/updateNote/${Id}`, note);
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
            console.log(error);
        }
        fetchNotes();
    };

    const handleNoteDelete = async (note) => {
        try {
            await axios.delete(`/notes/deleteNote/${note._id}`)
            setAlertMsg(`Note with ID ${note._id} has been deleted.`);
            setAlertType('success');
        } catch (error) {
            setAlertMsg("An error occurred while deleting the note.");
            setAlertType('danger');
            console.log(error);
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
            console.log(error);
        }
        fetchNotes();
    };

    return (
        <NoteContext.Provider value={{ notes, setNote, editNote, setEditNote, handleNoteDelete, handleNoteUpdate, modalType, setModalType, handleAddNote, alertMsg, alertType }}>
            {children}
        </NoteContext.Provider>
    );
};

NoteContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default NoteContextProvider;
