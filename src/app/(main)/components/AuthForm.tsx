import SubmitButton from "./SubmitButton";

type Props = {
  title: string;
  titleText: string;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
};

const AuthForm = ({ handleSubmit, title, titleText, children }: Props) => {
  return (
    <form
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
      onSubmit={handleSubmit}
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-white/70">{titleText}</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">{children}</div>

      {/* Submit Button */}
      <SubmitButton text="Submit" />
    </form>
  );
};

export default AuthForm;
