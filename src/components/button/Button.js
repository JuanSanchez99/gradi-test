import React from "react";
import "./Button.scss";

const Button = ({ children, type }) => {
  return <button className={`button ${type}`} type="submit">{children}</button>;
};

export const Buttons = ({children}) => {
  return (
    <div className="buttons">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child);
      })}
    </div>
  );
};

export default Button;
