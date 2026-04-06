"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import AppLayout from "@/src/components/layout/AppLayout";
import DefaultAvatar from "@/src/app/profile/[username]/DefaultAvatar";
import { useAuthStore } from "@/src/store/auth.store";
import { useUpdateProfile } from "@/src/hooks/auth/useUpdateProfile";
import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "@/src/validations/auth.validation";
import { useQueryClient } from "@tanstack/react-query";
import type { Gender, AvatarCustomization } from "@/src/types/auth.types";
import { Tooltip } from "@/src/components/ui/Tooltip";
import { Button } from "@/src/components/ui/Button";
import ColorSwatch from "@/src/components/settings/avatar/ColorSwatch";
import { COLOR_FIELD_CONFIGS } from "@/src/lib/avatar-utils";
import {
  ACTIVE_COLOR,
  AvatarColorKey,
  AvatarColors,
  INACTIVE_COLOR,
} from "@/src/types/settings/avatar.types";
import HexInput from "@/src/components/settings/avatar/HexInput";

const TabIcons: Record<AvatarColorKey, React.FC<{ color: string }>> = {
  skin: ({ color }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3C8.5 3 6 6 6 9.5v2C6 15 8.5 18 12 18s6-3 6-6.5v-2C18 6 15.5 3 12 3z" />
      <path d="M6 10c-1.5 0-2.5 1-2.5 2.5S4.5 15 6 15" />
      <path d="M18 10c1.5 0 2.5 1 2.5 2.5S19.5 15 18 15" />
    </svg>
  ),
  hair: ({ color }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10c0-5 2-7 5-7s5 2 5 7" />
      <path d="M5 12c0-4 1.5-8 7-8s7 4 7 8" />
      <path d="M7 10c-1 1-2 3-2 5 0 1 .5 2 1 3" />
      <path d="M17 10c1 1 2 3 2 5 0 1-.5 2-1 3" />
    </svg>
  ),
  iris: ({ color }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="12" rx="9" ry="5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  pupil: ({ color }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="12" rx="9" ry="5" />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  ),
  eyebrow: ({ color }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10c2-3 5-4 8-4s6 1 8 4" />
    </svg>
  ),
  lips: ({ color }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 14c1-1 2.5-1.5 5-1.5S18 13 19 14" />
      <path d="M5 13c1-2 3-3 7-3s6 1 7 3" />
      <path d="M7 14c1 2 3 3 5 3s4-1 5-3" />
      <path d="M12 12.5v1" />
    </svg>
  ),
  nose: ({ color }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v9" />
      <path d="M12 14c-1.5 0-4 1-4 3s2 2 4 2 4 0 4-2-2.5-3-4-3z" />
    </svg>
  ),
  earInner: ({ color }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4c0 2-1 3.5-2 4.5-.5.5-1 2-1 2.5" />
      <path d="M10 14c0 1 .5 1.5 1.5 1.5" />
    </svg>
  ),
  outfit: ({ color }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7l3-3 2 2a4 4 0 0 0 6 0l2-2 3 3-2 3v9H6v-9L4 7z" />
    </svg>
  ),
  background: ({ color }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
};

export default function AvatarSettingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState<AvatarColorKey>("skin");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initialColors: AvatarColors = {
    iris: user?.avatarCustomization?.colors?.iris || "",
    pupil: user?.avatarCustomization?.colors?.pupil || "",
    hair: user?.avatarCustomization?.colors?.hair || "",
    skin: user?.avatarCustomization?.colors?.skin || "",
    lips: user?.avatarCustomization?.colors?.lips || "",
    nose: user?.avatarCustomization?.colors?.nose || "",
    earInner: user?.avatarCustomization?.colors?.earInner || "",
    eyebrow: user?.avatarCustomization?.colors?.eyebrow || "",
    outfit: user?.avatarCustomization?.colors?.outfit || "",
    background: user?.avatarCustomization?.colors?.background || "",
  };

  const [colors, setColors] = useState<AvatarColors>(initialColors);

  const changedColors = useMemo(() => {
    const diff: Partial<AvatarColors> = {};
    (Object.keys(colors) as AvatarColorKey[]).forEach((key) => {
      if (colors[key].toUpperCase() !== initialColors[key].toUpperCase()) {
        diff[key] = colors[key];
      }
    });
    return diff;
  }, [colors, initialColors]);

  const isDirty = Object.keys(changedColors).length > 0;

  const { setError: setFormError } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
  });

  const { mutate: updateProfile, isPending } = useUpdateProfile({
    setError: setFormError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setSuccessMessage("Avatar başarıyla güncellendi.");
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  const handleColorChange = (key: AvatarColorKey, color: string) => {
    setColors((prev) => ({ ...prev, [key]: color }));
  };

  const handleSave = () => {
    if (!isDirty) return;
    updateProfile({
      avatarColors: changedColors,
    } as unknown as UpdateProfileFormValues);
  };

  const previewConfig: AvatarCustomization = {
    gender: (user?.avatarCustomization?.gender ?? "male") as Gender,
    accessories: user?.avatarCustomization?.accessories ?? {},
    colors,
  };

  const activeConfig = COLOR_FIELD_CONFIGS.find((c) => c.key === activeTab)!;

  return (
    <AppLayout mainClassName="lg:!overflow-y-hidden">
      <div className="flex flex-col gap-8 lg:h-[calc(100vh-48px)] lg:min-h-0 lg:gap-3 lg:overflow-hidden">
        <div className="flex shrink-0 items-center gap-3">
          <Button onClick={() => router.back()} variant="ghost" size="xs">
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-2xl font-extrabold text-white">
            Avatarı Düzenle
          </h1>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-6 md:flex-row md:items-start lg:flex-1 lg:items-stretch">
          <div className="flex w-full shrink-0 flex-col items-center gap-4 md:sticky md:top-6 md:w-1/2 lg:static lg:max-h-full lg:min-h-0 lg:self-stretch lg:justify-between">
            <div
              className="flex h-80 w-full min-h-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl md:h-auto md:min-h-[280px] lg:h-auto lg:min-h-0 lg:max-h-full lg:flex-1"
              style={{ backgroundColor: colors.background }}
            >
              {user && (
                <DefaultAvatar
                  username={user.username || "A"}
                  config={previewConfig}
                />
              )}
            </div>
            <Button
              disabled={!isDirty || isPending}
              onClick={handleSave}
              className="w-full shrink-0"
              variant="lightBlue"
            >
              {isPending ? "KAYDEDİLİYOR..." : "KAYDET"}
            </Button>

            {successMessage && (
              <p
                className="shrink-0 text-center text-sm font-bold"
                style={{ color: "#25B49A" }}
              >
                {successMessage}
              </p>
            )}

            {isDirty && !isPending && (
              <Button
                variant="ghost"
                className="w-full shrink-0"
                onClick={() => setColors(initialColors)}
              >
                Sıfırla
              </Button>
            )}
          </div>

          <div
            className="flex max-w-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border-2 border-white/10 lg:min-h-0"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div
              className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-white/10 px-3 py-2"
              style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
            >
              {COLOR_FIELD_CONFIGS.map((config) => {
                const isActive = activeTab === config.key;
                const Icon = TabIcons[config.key];
                return (
                  <Tooltip
                    key={config.key}
                    content={config.label}
                    placement="bottom"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveTab(config.key)}
                      className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-all"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(79,195,247,0.12)"
                          : "transparent",
                      }}
                    >
                      <Icon color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR} />
                      {isActive && (
                        <span
                          className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
                          style={{ backgroundColor: ACTIVE_COLOR }}
                        />
                      )}
                    </button>
                  </Tooltip>
                );
              })}
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-6 lg:p-4">
              <div className="mb-2 flex shrink-0 items-center gap-3 lg:mb-3">
                <div className="min-w-0 flex-1">
                  <div className="text-base font-extrabold text-white">
                    {activeConfig.label}
                  </div>
                  <div className="text-xs text-white/40">
                    Seçili:{" "}
                    <span className="font-mono text-white/60">
                      {colors[activeConfig.key].toUpperCase()}
                    </span>
                  </div>
                </div>
                <div
                  className="h-8 w-8 shrink-0 rounded-lg border-2 border-white/20"
                  style={{ backgroundColor: colors[activeConfig.key] }}
                />
              </div>

              <div className="grid min-h-0 flex-1 p-2 auto-rows-min grid-cols-6 gap-2 overflow-hidden content-start">
                {activeConfig.palette.map((color) => (
                  <ColorSwatch
                    key={color}
                    color={color}
                    isSelected={
                      colors[activeConfig.key].toUpperCase() ===
                      color.toUpperCase()
                    }
                    onClick={() => handleColorChange(activeConfig.key, color)}
                  />
                ))}
              </div>

              <div className="shrink-0">
                <HexInput
                  value={colors[activeConfig.key]}
                  onChange={(hex) => handleColorChange(activeConfig.key, hex)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
