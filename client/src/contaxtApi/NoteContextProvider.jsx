import NoteContext from "./contaxt"
import PropTypes from "prop-types";

// Create a provider component
const NoteContextProvider = ({ children }) => {

    return (
        <NoteContext.Provider value={{}}>
            {children}
        </NoteContext.Provider>
    );
};

NoteContextProvider.propTypes = {
    children: PropTypes.isrequired
}

export default NoteContextProvider;
