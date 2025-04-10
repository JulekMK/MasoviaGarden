export function Button({ children, onClick }) {
    return (
        <button 
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
