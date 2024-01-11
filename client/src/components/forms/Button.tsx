import { ThreeDots } from "react-loader-spinner";
import { FC } from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./button.scss";
interface ButtonProps {
  handleSubmit?: React.MouseEventHandler<HTMLButtonElement>;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  name?: string;
  text?: string;
  email?: string;
  password?: string;
  loading?: boolean;

}
const Button: FC<ButtonProps> = ({ handleSubmit, handleClick, name = "", email = "", password = "", loading = false, text }: ButtonProps) => {
  return (
    <button
      onClick={handleSubmit || handleClick}
      type="submit"
      className="main-btn primary-button"
    // disabled={(name && !name) || !email || email.length < 6 || password.length < 6}
    >
      {loading ? (
        <ThreeDots
          height="25"
          width="25"
          color="var(--accent-color)"
          ariaLabel="rotating-square-loading"
          radius="6"
          wrapperStyle={{ position: "absolute", right: "-40px" }}
          wrapperClass=""
          visible={true}
        />
      ) : (
        void 0
      )}
      <span>{text ?? "Submit"}</span>
    </button>
  );
};

export default Button;
