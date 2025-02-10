import { useEffect, useState } from "react";
import axios from "axios";
import NoteContext from "./context";
import PropTypes from "prop-types";

const NoteContextProvider = ({ children }) => {
    const [notes, setNote] = useState(null);

    // Set default base URL
    axios.defaults.baseURL = 'http://localhost:3000/api';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['auth-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTZkZWIzY2RmNTYyODE2NmM3NDA1OSIsImlhdCI6MTczOTE2NTMwNiwiZXhwIjoxNzM5MTY4OTA2fQ.gHzv4dBKrmU94NkKdw95Bbxoar1--USDsXJWgSBLKMM';

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

    const handleNoteUpdate = async (Id, note) => {

        try {
            const addNote = await axios.put(`/notes/updateNote/${Id}`, note);
            alert(addNote.data.msg);
        } catch (error) {
            if (error.response.data.errors) {
                const errorMessage = error.response.data.errors.map(error => `${error.msg} (Field: ${error.path})`).join('\n');
                alert(errorMessage);
            } else {
                alert("An error occurred while adding the note.");
            }
            console.log(error);
        }
        fetchNotes();
    };

    const handleNoteDelete = async (note) => {

        try {
            const deleteRes = await axios.delete(`/notes/deleteNote/${note._id}`)
            alert(`${deleteRes} note Id is ${note._id} `)
        } catch (error) {
            console.log(error);
        }
        fetchNotes();
    };

    const handleAddNote = async (note) => {

        try {
            const addNote = await axios.post('/notes/createNote', note);
            alert(addNote.data.msg);
        } catch (error) {
            if (error.response.data.errors) {
                const errorMessage = error.response.data.errors.map(error => `${error.msg} (Field: ${error.path})`).join('\n');
                alert(errorMessage);
            } else {
                alert("An error occurred while adding the note.");
            }
            console.log(error);
        }
        fetchNotes();
    };



    return (
        <NoteContext.Provider value={{ notes, setNote, editNote, setEditNote, handleNoteDelete, handleNoteUpdate, modalType, setModalType, handleAddNote }}>
            {children}
        </NoteContext.Provider>
    );
};

NoteContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default NoteContextProvider;
