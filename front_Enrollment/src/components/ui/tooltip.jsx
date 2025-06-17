const Tooltip = ({ text, children }) => (
  <div className="relative group cursor-pointer">
    {children}
    <div className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
      {text}
    </div>
  </div>
);

export default Tooltip;
