"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useOtpVerify } from "@/src/hooks/auth/useOtpVerify";
import { useOtpResend } from "@/src/hooks/auth/useOtpResend";
import { useAuthStore } from "@/src/store/auth.store";
import { Button } from "@/src/components/ui/Button";
import Link from "next/link";

const RESEND_COOLDOWN = 180;
const OTP_LENGTH = 6;

export default function VerifyOtpPage() {
  const router = useRouter();
  const { tempToken } = useAuthStore();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [rootError, setRootError] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(OTP_LENGTH).fill(null)
  );

  // Guard: no tempToken → back to register
  useEffect(() => {
    if (!tempToken) router.replace("/register");
  }, [tempToken, router]);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Clear errors when user starts typing again
  const clearErrors = () => {
    setFieldError(null);
    setRootError(null);
  };

  const focusIndex = (index: number) => {
    inputRefs.current[Math.max(0, Math.min(OTP_LENGTH - 1, index))]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    // Allow only digits
    const digit = value.replace(/\D/g, "").slice(-1);
    clearErrors();
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < OTP_LENGTH - 1) focusIndex(index + 1);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      clearErrors();
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        focusIndex(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusIndex(index - 1);
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  // Paste: fill all boxes from pasted string
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    clearErrors();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    setDigits(next);
    // Focus the box after the last pasted digit (or last box)
    focusIndex(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const codeValue = digits.join("");

  const { mutate: verifyOtp, isPending: isVerifying } = useOtpVerify({
    setError: (field, error) => {
      if (field === "root") setRootError(error.message ?? null);
      else setFieldError(error.message ?? null);
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useOtpResend({
    onSuccess: () => {
      setResendError(null);
      setResendSuccess(true);
      setCooldown(RESEND_COOLDOWN);
      // Clear boxes on resend so user starts fresh
      setDigits(Array(OTP_LENGTH).fill(""));
      focusIndex(0);
    },
    onError: (message) => {
      setResendSuccess(false);
      setResendError(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codeValue.length < OTP_LENGTH) {
      setFieldError("Lütfen 6 haneli kodu eksiksiz girin.");
      return;
    }
    verifyOtp({ code: codeValue });
  };

  const handleResend = () => {
    if (cooldown > 0 || isResending) return;
    setResendError(null);
    setResendSuccess(false);
    resendOtp();
  };

  const formatCooldown = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}:${sec.toString().padStart(2, "0")}` : `${sec}s`;
  };

  return (
    <div className="min-h-screen bg-[#131f24] flex flex-col">
      <header className="w-full flex items-center justify-between px-6 py-5 flex-shrink-0">
        <Link
          href="/"
          className="text-2xl text-white hover:opacity-80 transition-opacity select-none"
          style={{
            fontFamily: "'Fredoka One', cursive",
            letterSpacing: "0.5px",
          }}
        >
          NamazGo
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[400px] flex flex-col gap-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#1a2b2a] border-2 border-[#25B49A]/30 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z"
                  stroke="#25B49A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="#25B49A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Title & description */}
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-white text-2xl font-bold">E-posta Doğrulama</h1>
            <p
              className="text-[rgba(255,255,255,0.5)] text-[14px] leading-relaxed"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              E-posta adresinize gönderilen
              <br />
              <span className="text-[rgba(255,255,255,0.75)] font-bold">
                6 haneli kodu
              </span>{" "}
              giriniz.
            </p>
          </div>

          {/* Root error */}
          {rootError && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3">
              <span
                className="text-red-400 text-sm font-semibold"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {rootError}
              </span>
            </div>
          )}

          {/* Resend success */}
          {resendSuccess && (
            <div className="flex items-center gap-2 bg-[#25B49A]/10 border border-[#25B49A]/30 rounded-2xl px-4 py-3">
              <span
                className="text-[#25B49A] text-sm font-semibold"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                ✓ Yeni kod e-posta adresinize gönderildi.
              </span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            noValidate
          >
            {/* 6-box OTP input */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 justify-center">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onFocus={(e) => e.target.select()}
                    className={[
                      "w-12 h-14 text-center text-white text-xl font-bold",
                      "bg-[#1a2b2a] border-2 rounded-2xl outline-none",
                      "transition-colors duration-150 caret-transparent",
                      "disabled:opacity-40",
                      // autofill override
                      "[&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#1a2b2a_inset!important]",
                      "[&:-webkit-autofill]:[-webkit-text-fill-color:white!important]",
                      fieldError
                        ? "border-red-500"
                        : digit
                        ? "border-[#25B49A]"
                        : "border-[#2a3d3b] focus:border-[#25B49A]",
                    ].join(" ")}
                    style={{ fontFamily: "'Fredoka One', cursive" }}
                    aria-label={`${index + 1}. hane`}
                  />
                ))}
              </div>

              {fieldError && (
                <p
                  className="flex items-center justify-center gap-1.5 text-red-400 text-[13px] font-semibold"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                  role="alert"
                >
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex-shrink-0">
                    !
                  </span>
                  {fieldError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isVerifying || codeValue.length < OTP_LENGTH}
            >
              {isVerifying ? "Doğrulanıyor..." : "DOĞRULA"}
            </Button>
          </form>

          {/* Resend */}
          <div className="flex flex-col items-center gap-2">
            {resendError && (
              <p
                className="text-red-400 text-[13px] font-semibold"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {resendError}
              </p>
            )}

            <p
              className="text-[rgba(255,255,255,0.45)] text-[14px]"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Kod gelmedi mi?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || isResending}
                className={[
                  "font-extrabold transition-colors",
                  cooldown > 0 || isResending
                    ? "text-[rgba(255,255,255,0.25)] cursor-not-allowed"
                    : "text-[#25B49A] hover:text-[#4FC3F7] cursor-pointer",
                ].join(" ")}
              >
                {isResending
                  ? "Gönderiliyor..."
                  : cooldown > 0
                  ? `Tekrar gönder (${formatCooldown(cooldown)})`
                  : "Tekrar gönder"}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
