const FloatButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 10,
        padding: "10px 12px",
        background: "#111",
        color: "#fff",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      + Crear Incidencia
    </button>
  );
};

export default FloatButton;
