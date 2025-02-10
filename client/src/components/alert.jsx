import { useContext } from 'react';
import "../componentCSS/alert.css";
import context from '../contaxtApi/context';

const AlertBox = () => {
    const { alertMsg, alertType } = useContext(context);

    if (!alertMsg) return null;
    const alertClass = `alert alert-${alertType} alert-dismissible fade show mx-3 mt-2 p-2`;

    return (
        <div className={alertClass} role="alert">
            <i className="fa-duotone fa-solid fa-wifi-weak me-2"></i>
            <strong>{alertType.charAt(0).toUpperCase() + alertType.slice(1)}!</strong>____
            <div dangerouslySetInnerHTML={{ __html: alertMsg }} />
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
};

export default AlertBox;
