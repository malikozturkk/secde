import {
  getApiErrorMessage,
  getDomainErrorCode,
  getHttpStatus,
} from "@/src/lib/api-error";

const ERROR_MESSAGES: Record<string, string> = {
  USER_NOT_FOUND: "Kullanıcı bulunamadı.",
  UNAUTHORIZED: "Oturumun süresi doldu. Lütfen tekrar giriş yap.",
  TOKEN_EXPIRED: "Oturumun süresi doldu. Lütfen tekrar giriş yap.",
  INVALID_TOKEN: "Oturumun geçersiz. Lütfen tekrar giriş yap.",
  FORBIDDEN: "Bu işlem için yetkin yok.",

  QUIZ_ANSWER_INCORRECT:
    "Cevaplardan biri hatalı. Vakit işaretlenemedi — tekrar deneyebilirsin.",
  INCORRECT_ANSWER:
    "Cevaplardan biri hatalı. Vakit işaretlenemedi — tekrar deneyebilirsin.",
  WRONG_ANSWER:
    "Cevaplardan biri hatalı. Vakit işaretlenemedi — tekrar deneyebilirsin.",
  QUIZ_FAILED:
    "Cevaplardan biri hatalı. Vakit işaretlenemedi — tekrar deneyebilirsin.",
  PRAYER_QUIZ_FAILED:
    "Cevaplardan biri hatalı. Vakit işaretlenemedi — tekrar deneyebilirsin.",
  QUIZ_EXPIRED: "Soruların süresi doldu. Yeni sorular yükleniyor.",
  QUIZ_SESSION_EXPIRED: "Soruların süresi doldu. Yeni sorular yükleniyor.",
  QUIZ_NOT_FOUND: "Sorular bulunamadı. Yeni sorular yükleniyor.",
  INVALID_QUIZ_ANSWERS: "Cevaplar geçersiz. Lütfen tekrar dene.",

  PRAYER_ALREADY_COMPLETED: "Bu vakit zaten işaretlenmiş.",
  ALREADY_COMPLETED: "Bu vakit zaten işaretlenmiş.",
  PRAYER_WINDOW_CLOSED: "Bu vaktin işaretleme süresi kapandı.",
  PRAYER_NOT_IN_WINDOW: "Bu vakit şu an işaretlenemez.",
  PRAYER_WINDOW_NOT_OPEN: "Bu vaktin işaretleme süresi henüz açılmadı.",
  TOO_EARLY: "Bu vakit için henüz erken.",

  STREAK_FREEZE_NOT_AVAILABLE: "Kullanılabilir seri dondurma hakkın yok.",
  NO_FREEZE_AVAILABLE: "Kullanılabilir seri dondurma hakkın yok.",
  FREEZE_NOT_AVAILABLE: "Kullanılabilir seri dondurma hakkın yok.",
  STREAK_FREEZE_WINDOW_EXPIRED: "Seri dondurma için süre doldu.",
  FREEZE_WINDOW_EXPIRED: "Seri dondurma için süre doldu.",
  STREAK_FREEZE_ALREADY_USED: "Bu gün için seri dondurma zaten kullanılmış.",
  ALREADY_FROZEN: "Bu gün için seri dondurma zaten kullanılmış.",

  VALIDATION_ERROR: "Gönderilen bilgilerde bir hata var.",
  BAD_REQUEST: "Gönderilen bilgilerde bir hata var.",
  LOCATION_REQUIRED: "Konum bilgisi gerekli.",
  INVALID_COORDINATES: "Konum bilgisi geçersiz.",
  RATE_LIMITED: "Çok fazla deneme yaptın. Lütfen biraz bekle.",
  TOO_MANY_REQUESTS: "Çok fazla deneme yaptın. Lütfen biraz bekle.",
  INTERNAL_SERVER_ERROR: "Sunucuda bir hata oluştu. Lütfen tekrar dene.",
  INTERNAL_ERROR: "Sunucuda bir hata oluştu. Lütfen tekrar dene.",
};

const GENERIC_FALLBACK = "Bir şeyler ters gitti. Lütfen tekrar dene.";

const statusMessage = (status: number | undefined): string | undefined => {
  if (status === undefined) return undefined;
  if (status === 401) return ERROR_MESSAGES.UNAUTHORIZED;
  if (status === 403) return ERROR_MESSAGES.FORBIDDEN;
  if (status === 404) return "Aradığın içerik bulunamadı.";
  if (status === 409) return "Bu işlem zaten yapılmış görünüyor.";
  if (status === 400 || status === 422)
    return "Gönderilen bilgilerde bir hata var.";
  if (status === 429) return ERROR_MESSAGES.RATE_LIMITED;
  if (status >= 500) return "Sunucuda bir hata oluştu. Lütfen tekrar dene.";
  return undefined;
};

const UPPER_SNAKE = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

export const resolveApiErrorMessage = (
  error: unknown,
  fallback?: string
): string => {
  const code = getDomainErrorCode(error);
  if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];

  const byStatus = statusMessage(getHttpStatus(error));
  if (byStatus) return byStatus;

  const backendMsg = getApiErrorMessage(error);
  if (
    backendMsg &&
    !UPPER_SNAKE.test(backendMsg) &&
    !/request failed/i.test(backendMsg)
  ) {
    return backendMsg;
  }

  return fallback ?? GENERIC_FALLBACK;
};
