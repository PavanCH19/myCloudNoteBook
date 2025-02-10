import PropTypes from "prop-types";
import { useContext } from "react";
import context from "../contaxtApi/context";
import "../componentCSS/NoteItem.css";

const NoteItem = (props) => {
    const { setEditNote, handleNoteDelete, setModalType } = useContext(context);
    const { note, loading, setShowModal } = props;

    if (loading) {
        return <div className="noteItemContainer">Loading...</div>;
    }

    return (
        <div className="noteItemContainer">
            <div className="note-header">
                <h4>{note.title}</h4>
                <i className="fa-regular fa-pen-to-square" onClick={(e) => {
                    e.stopPropagation();
                    setEditNote(note);
                    setModalType("editNote")
                    setShowModal(true);
                }}></i>
                <i className="fa-solid fa-trash-can" onClick={(e) => {
                    e.stopPropagation();
                    handleNoteDelete(note);
                }}></i>
            </div>

            <p>{note.description}</p>
            <span className="note-tag">{note.tag}</span>
            <small className="note-date">
                {new Date(note.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })} {new Date(note.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                })}

            </small>
        </div>
    );
};

NoteItem.propTypes = {
    note: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        tag: PropTypes.string,
        date: PropTypes.string.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    handleNoteUpdate: PropTypes.func.isRequired,
    handleNoteDelete: PropTypes.func.isRequired,
    setShowModal: PropTypes.func
};

export default NoteItem;
