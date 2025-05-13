function Button({
  onClick,
  children,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      className="cursor-pointer bg-black text-white px-3 py-2 border border-black rounded hover:bg-white hover:text-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
