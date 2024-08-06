import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function UserInput({
  label,
  placeholder,
  isPassword,
  setStateFunction,
  Icon,
  setEmailVaildationMessage,
}) {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  function handleTextChange(e) {
    setValue(e.target.value);
    setStateFunction(e.target.value);

    if (placeholder === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const status = emailRegex.test(e.target.value);
      setIsEmailValid(status);
      setEmailVaildationMessage(status);
    }
  }

  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label className="text-gray-300 text-sm">{label}</label>
      <div
        className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${
          !isEmailValid &&
          placeholder === "Email" &&
          value.length > 0 &&
          "border-2 border-red-500"
        }`}
      >
        <Icon className="text-text555 text-2xl" />
        <input
          type={isPassword ? (showPass ? "text" : "password") : "text"}
          placeholder={placeholder}
          className="flex-1 w-full h-full py-2 bg-transparent outline-none border-none text-text555 text-lg"
          value={value}
          onChange={(e) => handleTextChange(e)}
        />

        {isPassword && (
          <div
            className="cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <FaEyeSlash className="text-text555 text-2xl" />
            ) : (
              <FaEye className="text-text555 text-2xl" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInput;
