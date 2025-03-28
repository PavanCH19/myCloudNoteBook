import { useContext, useState } from "react";
import NoteContext from "../contaxtApi/context";
import NoteItem from "./NoteItem";
import "../componentCSS/Note.css";
import NoteModel from "./noteModel";
import AlertBox from "./alert";

const Note = () => {
    const { notes, setModalType } = useContext(NoteContext);
    const [isLoading] = useState(false);
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
            <AlertBox />
            <div className="notes-container mx-3 mt-2 p-2">
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

                {showModal && <NoteModel showModal={showModal} setShowModal={setShowModal} note={showNote} />}
            </div>
        </>
    );
};

export default Note;
