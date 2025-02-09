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
        },
        {
            "_id": "67a72c409a62c879ffb4639a",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:48.402Z",
            "__v": 0
        },
        {
            "_id": "67a72c419a62c879ffb4639c",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:49.004Z",
            "__v": 0
        },
        {
            "_id": "67a72c419a62c879ffb4639e",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:49.332Z",
            "__v": 0
        },
        {
            "_id": "67a72c419a62c879ffb463a0",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:49.554Z",
            "__v": 0
        },
        {
            "_id": "67a72c419a62c879ffb463a2",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:49.757Z",
            "__v": 0
        },
        {
            "_id": "67a72c419a62c879ffb463a4",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:49.973Z",
            "__v": 0
        },
        {
            "_id": "67a72c429a62c879ffb463a6",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:50.181Z",
            "__v": 0
        },
        {
            "_id": "67a72c429a62c879ffb463a8",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:50.382Z",
            "__v": 0
        },
        {
            "_id": "67a72c429a62c879ffb463aa",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:50.565Z",
            "__v": 0
        },
        {
            "_id": "67a72c429a62c879ffb463ac",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:50.911Z",
            "__v": 0
        },
        {
            "_id": "67a72c439a62c879ffb463ae",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:51.111Z",
            "__v": 0
        },
        {
            "_id": "67a72c439a62c879ffb463b0",
            "user": "67a6deb3cdf5628166c74059",
            "title": "my new note",
            "description": "hkasdjfkajdfkjaskdjfkjfdajfakdjfaldskjfdlskfjdkfjadlskjflkfjaldkjfaldkfjaldfkj",
            "tag": "personal",
            "date": "2025-02-08T10:04:51.329Z",
            "__v": 0
        }
    ]);

    const [editNote, setEditNote] = useState(null);
    const [modalType, setModalType] = useState("");

    console.log(modalType)
    console.log(editNote)

    const handleNoteUpdate = (note) => {
        console.log(note);
    }

    const handleNoteDelete = (note) => {
        console.log(note);
    }



    return (
        <NoteContext.Provider value={{ notes, setNote, editNote, setEditNote, handleNoteDelete, handleNoteUpdate, modalType, setModalType }}>
            {children}
        </NoteContext.Provider>
    );
};

NoteContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default NoteContextProvider;
