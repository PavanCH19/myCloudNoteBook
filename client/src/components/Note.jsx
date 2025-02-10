import { useContext, useState } from "react";
import NoteContext from "../contaxtApi/context";
import NoteItem from "./NoteItem";
import "../componentCSS/Note.css";
import NoteModel from "./noteModel"

const Note = () => {
    const { notes, setModalType } = useContext(NoteContext);
    const [isNote] = useState(true);
    const [isLoading] = useState(false);
    const [showNoteModel] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showNote, setShowNote] = useState(null);

    const addNoteModal = () => {
        setShowModal(true);
        setModalType("addNote");
    };


    const handleNoteClick = (note) => {
        setShowModal(true);
        setModalType("showNote");
        setShowNote(note);
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
                            <div key={note._id} onClick={() => handleNoteClick(note)}>
                                <NoteItem key={note._id} note={note} loading={isLoading} setShowModal={setShowModal} />
                            </div>
                        ))
                    ) : (
                        <p className="no-notes">No notes available</p>
                    )}
                </div>


                <button className="add-note-btn" onClick={addNoteModal}>
                    <i className="fa fa-plus"></i>
                </button>

                {showNoteModel && <NoteModel showModal={showModal} setShowModal={setShowModal} note={showNote} />}
            </div>
        </>
    );
};

export default Note;
