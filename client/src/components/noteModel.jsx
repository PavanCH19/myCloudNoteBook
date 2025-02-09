import { useContext, useState } from "react";
import PropTypes from "prop-types";
import AddEditNote from "./addEditNote";
import context from "../contaxtApi/context";

const MyCloudNoteBookModal = (props) => {
    const { modalType } = useContext(context);
    const { showModal, setShowModal, note } = props;
    const [isClosing, setIsClosing] = useState(false);



    console.log("sdfsdfsdfsdfdsf" + modalType);
    console.log(note);

    const closeModal = () => {
        setIsClosing(true);
        setShowModal(false);
    };

    return (
        <div className="container mt-4">
            {showModal && (
                <div
                    className={`modal fade show d-block ${isClosing ? 'modal-closing' : ''}`}
                    tabIndex="-1"
                    aria-hidden={isClosing ? "true" : "false"}
                >
                    <div className="modal-dialog modal-dialog-centered" style={{ width: "80%", maxWidth: "1000px", height: "90vh", maxHeight: "95vh", overflowY: "auto" }}>
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">MyCloudNoteBook : &quot;{note?.title || 'Untitled Note'}&quot;</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {((modalType === "addNote") || (modalType === "editNote")) ? (
                                    <AddEditNote />
                                ) : (
                                    <>
                                        <p className="note-description">{note?.description || 'No description available'}</p>
                                        <div className="tag-date">
                                            <span className="note-tag">{note?.tag || 'No tag'}</span>
                                            <span className="note-date">{note?.date || 'No date'}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal backdrop */}
            {showModal && <div className="modal-backdrop fade show" onClick={closeModal}></div>}

            <style>{`
                /* Styles for the form and modal */
                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 8px;
                    display: inline-block;
                }

                .form-control {
                    width: 100%;
                    padding: 12px;
                    font-size: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                    background-color: #fff;
                    transition: all 0.3s ease;
                }

                .form-control:focus {
                    border-color: #007bff;
                    outline: none;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
                }

                .form-control::placeholder {
                    color: #aaa;
                }

                textarea.form-control {
                    resize: vertical;
                    min-height: 100px;
                }

                button[type="submit"] {
                    padding: 10px 20px;
                    font-size: 1rem;
                    color: #fff;
                    background-color: #007bff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                button[type="submit"]:hover {
                    background-color: #0056b3;
                }

                button[type="submit"]:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .modal-dialog {
                    opacity: 1;
                }

                .modal-backdrop.fade.show {
                    background-color: rgba(0, 0, 0, 0.7);
                    z-index: 1040;
                }

                .modal-header {
                    position: sticky;
                    top: 0;
                    background-color: #007bff;
                    color: white;
                    z-index: 1050;
                    padding: 10px 15px;
                    border-bottom: 1px solid #ddd;
                }

                .modal-body {
                    word-wrap: break-word;
                    overflow-y: auto;
                    max-height: 70vh;
                    padding: 20px;
                }

                .note-description {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #333;
                    background: #f8f9fa;
                    padding: 12px;
                    border-radius: 4px;
                    margin-bottom: 12px;
                }

                .note-date {
                    font-size: 0.9rem;
                    color: #6c757d;
                    text-align: right;
                }

                .tag-date {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            `}</style>
        </div>
    );
};

MyCloudNoteBookModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    modalType: PropTypes.string,
    note: PropTypes.object
};

export default MyCloudNoteBookModal;
