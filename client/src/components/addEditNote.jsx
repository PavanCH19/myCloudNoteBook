import { useState, useContext, useEffect } from "react";
import context from "../contaxtApi/context";

function AddEditNote() {
    const { editNote, modalType } = useContext(context);


    const [noteData, setNoteData] = useState({
        title: "",
        description: "",
        tag: ""
    });

    useEffect(() => {
        if (modalType === "editNote" && editNote) {
            setNoteData({
                title: editNote.title || "",
                description: editNote.description || "",
                tag: editNote.tag || ""
            });
        }
    }, [modalType, editNote]);


    // Handle change for form fields
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setNoteData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted Note:", noteData);

        setNoteData({ title: "", description: "", tag: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" className="form-control" value={noteData.title} onChange={handleOnChange} placeholder="Enter note title" required />
            </div>

            {/* Tag Input */}
            <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input type="text" id="tag" name="tag" className="form-control" value={noteData.tag} onChange={handleOnChange} placeholder="Enter note tag" />
            </div>

            {/* Description Input */}
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" className="form-control" value={noteData.description} onChange={handleOnChange} placeholder="Enter note description" rows="4" required />
            </div>

            {/* Submit Button */}
            <div className="form-group text-center mt-3">
                <button type="submit" className="btn btn-primary">Add Note</button>
            </div>
        </form>
    );
}

export default AddEditNote;
