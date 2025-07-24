import React from "react";

const SubmitButton = ({ text }: { text: string }) => {
  return (
    <button
      type="submit"
      className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] cursor-pointer"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
