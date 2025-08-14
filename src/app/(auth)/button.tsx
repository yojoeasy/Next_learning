export default function AuthButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void; }) {
  return (
    <button 
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
