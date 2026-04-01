import { useNavigate } from 'react-router';

export function ButtonLinkWithDetail({ to, label, detail, className }) {
    const navigate = useNavigate();
    const labelArray = label.split('\n');

    return (
        <button
            onClick={() => navigate(to)}
            className={`cursor-pointer rounded-xl font-bold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${className}`}
        >
            <div>
                {labelArray.map((line) => (
                    <div key={line}>{line}</div>
                ))}
            </div>
            {detail && <div className="block text-sm font-normal">{detail}</div>}
        </button>
    );
};