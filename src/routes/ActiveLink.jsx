import { NavLink } from "react-router";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-secondary font-semibold"
          : "hover:text-hoverAccent duration-300"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
