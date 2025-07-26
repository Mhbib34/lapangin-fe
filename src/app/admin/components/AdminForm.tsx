"use client";

import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import AuthForm from "@/app/(main)/components/AuthForm";
import { XCircle } from "lucide-react";
import PremiumGlassLoader from "@/components/LoadingAnimations";

type Props = {
  title: string;
  titleText: string;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
};

const AdminForm = ({
  title,
  children,
  titleText,
  handleSubmit,
  setShowAddModal,
  isSubmitting,
}: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const modalContent = (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-[9999] ">
        {!isSubmitting ? (
          <>
            <XCircle
              className="absolute top-4 right-4 cursor-pointer text-white w-8 h-8"
              onClick={() => setShowAddModal(false)}
            />
            <AuthForm
              title={title}
              titleText={titleText}
              handleSubmit={handleSubmit}
            >
              {children}
            </AuthForm>
          </>
        ) : (
          <PremiumGlassLoader />
        )}
      </div>
    </>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  );
};

export default AdminForm;
