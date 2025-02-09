import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const MyCloudNoteBookModal = ({ showModal, openModal, setShowModal, modalType, note }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (note && modalType) {
            console.log(modalType);
            console.log(note);
        }
    }, [note, modalType]);

    const closeModal = () => {
        setIsClosing(true);
        setShowModal(false);
    };

    return (
        <div className="container mt-4">
            <button className="btn btn-primary" onClick={openModal}>
                Open MyCloudNoteBook Modal
            </button>

            {showModal && (
                <div
                    className={`modal fade show d-block ${isClosing ? 'modal-closing' : ''}`}
                    tabIndex="-1"
                    aria-hidden={isClosing ? "true" : "false"}
                >
                    <div className="modal-dialog modal-dialog-centered" style={{ width: "80%", maxWidth: "1000px", height: "90vh", maxHeight: "95vh", overflowY: "auto" }}>
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">MyCloudNoteBook : &quot;{note.title}&quot;</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {(modalType === "addNote") ? (
                                    <></>
                                ) : (
                                    <>
                                        <p className="note-description">{note?.description || 'No description available'}</p>
                                        <p className="note-tag">{note?.tag || 'No tag'}</p>
                                        <p className="note-date">{note?.date || 'No date'}</p>
                                    </>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal backdrop (to darken background) */}
            {showModal && <div className="modal-backdrop fade show" onClick={closeModal}></div>}

            {/* Internal CSS for modal without sliding effect */}
            <style>{`
                .modal-dialog {
                    opacity: 1; /* No sliding, just appear */
                }

                .modal-backdrop.fade.show {
                    background-color: rgba(0, 0, 0, 0.7); /* Darkened background */
                    z-index: 1040;
                }

                /* Make header sticky */
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
                    max-height: 70vh; /* Limit height to allow for scrolling */
                    padding: 20px;
                }

                /* Styling for p tags */
                .note-tag {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #007bff;
                    margin-bottom: 12px;
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

                /* Make footer buttons consistent */
                .modal-footer button {
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
};

MyCloudNoteBookModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
    modalType: PropTypes.string,
    note: PropTypes.object
};

export default MyCloudNoteBookModal;
