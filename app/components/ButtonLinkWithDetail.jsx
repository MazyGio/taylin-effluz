import { useNavigate } from 'react-router';
import { replaceNewLine } from '../utils/formatter';

export function ButtonLinkWithDetail({ to, label, detail, className }) {
    const navigate = useNavigate();
    const formattedLabel = replaceNewLine(label);
    const formattedDetail = detail
        ? `<span className="block text-sm font-normal mt-1 opacity-90">(${replaceNewLine(detail)})</span>`
        : '';
    const combinedHtml = formattedLabel + formattedDetail;

    return (
        <button
            onClick={() => navigate(to)}
            className={`cursor-pointer rounded-xl font-bold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${className}`}
            dangerouslySetInnerHTML={{ __html: combinedHtml }}
        >
            {/* {detail && <span className="block text-sm font-normal mt-1 opacity-90">({detail})</span>} */}
        </button>
    );
};