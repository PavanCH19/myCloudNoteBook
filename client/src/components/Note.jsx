import { useContext, useEffect, useState } from "react";
import NoteContext from "../contaxtApi/context";
import NoteItem from "./NoteItem";
import "../componentCSS/Note.css";

const Note = () => {
    const { notes, setNotes } = useContext(NoteContext);
    const [isNote] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [setNotes]);

    const handleNoteClick = (noteId) => {
        // Action when a note is clicked (like opening it)
        alert(`You clicked on note with ID: ${noteId}`);
    };

    const handleNoteUpdate = (noteId) => {
        console.log(`Updating note with ID: ${noteId}`);
        // Here you would usually navigate to the update page or show a form to update
    };

    const handleAddNote = () => {
        console.log("Add a new note");
    };

    const handleNoteDelete = (noteId) => {
        console.log(`Deleting note with ID: ${noteId}`);
        // Logic to delete note goes here
    };

    return (
        <>
            {isNote && (
                <div className="alert-box" role="alert">
                    <i className="fa-duotone fa-solid fa-wifi-weak"></i> Check your internet connection
                </div>
            )}
            <div className="notes-container">
                <div className="notes-content">
                    {notes && notes.length > 0 ? (
                        notes.map((note) => (
                            <div key={note._id} onClick={() => handleNoteClick(note._id)}>
                                <NoteItem
                                    note={note}
                                    loading={isLoading}
                                    handleNoteUpdate={handleNoteUpdate}
                                    handleNoteDelete={handleNoteDelete}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="no-notes">No notes available</p>
                    )}
                </div>

                {/* Add Note Button */}
                <button className="add-note-btn" onClick={handleAddNote}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
        </>
    );
};

export default Note;
