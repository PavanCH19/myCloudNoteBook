import { useState } from "react";
import NoteContext from "./context";
import PropTypes from "prop-types";

const NoteContextProvider = ({ children }) => {
    const [notes, setNote] = useState([
        {
            "_id": "67a72c3f9a62c879ffb46398",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjasddddddddddsffsdfsdfdsfsdfasdfasdfasdfasdfasdfasdfasdfasfdasdfasdfadfasdfadsfafsdfafasffasffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfasafdadsfjdsfjasdfdasfnpaosiudfnpoiasdufmpaosdiufpasofiuasofdiuasoimfdupasdfudsmfsmdiofupasodifupaosidfumpasoidfumpasomdimfumapsoidfuaposidfumaosmiufsmidufaosfduasdumfsdmufasidufasumfdasmufdsdiufmaudfdmfaiufmpoidufkdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:47.527Z",
            "__v": 0
        }
    ]);

    const [editNote, setEditNote] = useState(null);
    const [modalType, setModalType] = useState("");

    const handleNoteUpdate = (Id, note) => {
        console.log(Id);
        console.log(note);
    }

    const handleNoteDelete = (note) => {
        console.log(note);
    }

    const handleAddNote = (note) => {
        console.log(note);
        notes.push(note);
    }



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
