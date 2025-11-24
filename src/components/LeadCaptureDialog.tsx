"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import LeadRegistrationForm from "./LeadRegistrationForm";

const DISMISS_KEY = "ipcExpoLeadDialogDismissed";

export default function LeadCaptureDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timer = window.setTimeout(() => {
      try {
        const hasDismissed = window.localStorage.getItem(DISMISS_KEY);
        if (!hasDismissed) {
          setIsOpen(true);
        }
      } catch (error) {
        console.warn("Lead dialog localStorage unavailable", error);
        setIsOpen(true);
      }
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  const persistDismissal = useCallback(() => {
    try {
      window.localStorage.setItem(DISMISS_KEY, new Date().toISOString());
    } catch (error) {
      console.warn("Unable to persist dialog dismissal", error);
    }
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    persistDismissal();
  }, [persistDismissal]);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeDialog]);

  const handleClose = closeDialog;

  const handleSuccess = closeDialog;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Register for the 74th IPC Pharma Expo"
    >
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <button
          type="button"
          onClick={handleClose}
          className="fixed right-6 top-6 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl font-semibold text-gray-700 shadow-lg transition hover:bg-white"
          aria-label="Close registration dialog"
        >
          ×
        </button>

        <div className="relative z-[105] w-full max-w-3xl space-y-4 py-10">
          <LeadRegistrationForm onSuccess={handleSuccess} onCancel={handleClose} />
          <p className="text-center text-sm text-gray-100">
            Prefer the full page? Visit the{" "}
            <Link
              href="/registration"
              className="font-semibold text-white underline-offset-4 hover:underline"
              onClick={handleClose}
            >
              registration hub
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export {
  hearAboutOptions,
  interestOptions,
  stateOptions,
} from "./LeadRegistrationForm";
