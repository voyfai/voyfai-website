import { COLORS, RADIUS } from "../constants/colors";

export default function DepartmentFilter({ departments, selected, onSelect }) {
  return (
    <div
      role="tablist"
      aria-label="Filter by department"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center",
        marginBottom: 40,
      }}
    >
      {departments.map((dep) => {
        const isActive = dep === selected;
        return (
          <button
            key={dep}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(dep)}
            className="cta-btn"
            style={{
              padding: "9px 18px",
              fontSize: 13,
              fontWeight: 500,
              borderRadius: RADIUS.pill,
              background: isActive ? COLORS.navy : COLORS.white,
              color: isActive ? COLORS.white : COLORS.text,
              border: `1px solid ${isActive ? COLORS.navy : COLORS.border}`,
              cursor: "pointer",
            }}
          >
            {dep}
          </button>
        );
      })}
    </div>
  );
}
