"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOtpVerify } from "@/src/hooks/auth/useOtpVerify";
import { useOtpResend } from "@/src/hooks/auth/useOtpResend";
import { useAuthStore } from "@/src/store/auth.store";
import {
  otpSchema,
  type OtpFormValues,
} from "@/src/validations/auth.validation";

const RESEND_COOLDOWN = 180;

export default function VerifyOtpPage() {
  const router = useRouter();
  const { tempToken } = useAuthStore();

  const [resendError, setResendError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (!tempToken) {
      router.replace("/register");
    }
  }, [tempToken, router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const { mutate: verifyOtp, isPending: isVerifying } = useOtpVerify({
    setError,
  });

  const { mutate: resendOtp, isPending: isResending } = useOtpResend({
    onSuccess: () => {
      setResendError(null);
      setResendSuccess(true);
      setCooldown(RESEND_COOLDOWN);
    },
    onError: (message) => {
      setResendSuccess(false);
      setResendError(message);
    },
  });

  const onSubmit = (data: OtpFormValues) => {
    verifyOtp(data);
  };

  const handleResend = () => {
    if (cooldown > 0 || isResending) return;
    setResendError(null);
    setResendSuccess(false);
    resendOtp();
  };

  return (
    <div>
      <h1>E-posta Doğrulama</h1>
      <p>E-posta adresinize gönderilen 6 haneli kodu giriniz.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="code">Doğrulama Kodu</label>
          <input
            id="code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            {...register("code")}
          />
          {errors.code && <p style={{ color: "red" }}>{errors.code.message}</p>}
        </div>

        {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}

        <button type="submit" disabled={isVerifying}>
          {isVerifying ? "Doğrulanıyor..." : "Doğrula"}
        </button>
      </form>

      <div>
        {resendSuccess && (
          <p style={{ color: "green" }}>
            Yeni kod e-posta adresinize gönderildi.
          </p>
        )}
        {resendError && <p style={{ color: "red" }}>{resendError}</p>}

        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || isResending}
        >
          {isResending
            ? "Gönderiliyor..."
            : cooldown > 0
            ? `Tekrar gönder (${cooldown}s)`
            : "Kodu tekrar gönder"}
        </button>
      </div>
    </div>
  );
}
