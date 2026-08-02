import {
  getApiErrorMessage,
  getDomainErrorCode,
  getHttpStatus,
} from "@/src/lib/api-error";

const ERROR_MESSAGES: Record<string, string> = {
  USER_NOT_FOUND: "Kullanıcı bulunamadı.",
  LOCATION_CHANGE_LIMIT_REACHED:
    "Konum değiştirme hakkını daha önce kullandın. Konumun artık değiştirilemez.",
  MADHAB_CHANGE_LIMIT_REACHED:
    "Mezhep değiştirme hakkını daha önce kullandın. Mezhebin artık değiştirilemez.",
  INCOMPLETE_LOCATION_UPDATE:
    "Konum güncellenirken şehir ve koordinatlar birlikte gönderilmeli.",
  UNAUTHORIZED: "Oturumun süresi doldu. Lütfen tekrar giriş yap.",
  TOKEN_EXPIRED: "Oturumun süresi doldu. Lütfen tekrar giriş yap.",
  INVALID_TOKEN: "Oturumun geçersiz. Lütfen tekrar giriş yap.",
  FORBIDDEN: "Bu işlem için yetkin yok.",

  QUIZ_ANSWER_INCORRECT: "Cevap yanlış. Bu vakit yarına kadar işaretlenemeyecek.",
  INCORRECT_ANSWER: "Cevap yanlış. Bu vakit yarına kadar işaretlenemeyecek.",
  WRONG_ANSWER: "Cevap yanlış. Bu vakit yarına kadar işaretlenemeyecek.",
  QUIZ_FAILED: "Cevap yanlış. Bu vakit yarına kadar işaretlenemeyecek.",
  PRAYER_QUIZ_FAILED: "Cevap yanlış. Bu vakit yarına kadar işaretlenemeyecek.",
  QUIZ_EXPIRED: "Soruların süresi doldu. Yeni sorular yükleniyor.",
  QUIZ_SESSION_EXPIRED: "Soruların süresi doldu. Yeni sorular yükleniyor.",
  QUIZ_NOT_FOUND: "Sorular bulunamadı. Yeni sorular yükleniyor.",
  INVALID_QUIZ_ANSWERS: "Cevaplar geçersiz. Lütfen tekrar dene.",
  QUIZ_QUESTION_NOT_FOUND: "Soru bulunamadı.",
  QUIZ_QUESTION_NOT_STARTABLE:
    "Bu soru artık başlatılamıyor. Lütfen tekrar dene.",
  QUIZ_QUESTION_NOT_STARTED: "Soru henüz başlatılmadı. Lütfen tekrar dene.",
  QUIZ_QUESTION_ALREADY_ANSWERED: "Bu soru zaten cevaplandı.",
  QUIZ_OPTION_INVALID: "Geçersiz seçenek.",
  INSUFFICIENT_PRAYER_QUESTIONS:
    "Yeterli soru havuzu yok. Lütfen daha sonra tekrar dene.",

  PRAYER_ALREADY_COMPLETED: "Bu vakit zaten işaretlenmiş.",
  ALREADY_COMPLETED: "Bu vakit zaten işaretlenmiş.",
  PRAYER_WINDOW_CLOSED: "Bu vaktin işaretleme süresi kapandı.",
  PRAYER_NOT_IN_WINDOW: "Bu vakit şu an işaretlenemez.",
  PRAYER_WINDOW_NOT_OPEN: "Bu vaktin işaretleme süresi henüz açılmadı.",
  PRAYER_WINDOW_NOT_OPEN_YET: "Bu vaktin işaretleme süresi henüz açılmadı.",
  PRAYER_MARKING_LOCKED:
    "Bu vakit için işaretleme kapatıldı. Bir sonraki güne kadar tekrar açılmayacak.",
  TOO_EARLY: "Bu vakit için henüz erken.",

  STREAK_FREEZE_NOT_AVAILABLE: "Kullanılabilir seri dondurma hakkın yok.",
  NO_FREEZE_AVAILABLE: "Kullanılabilir seri dondurma hakkın yok.",
  FREEZE_NOT_AVAILABLE: "Kullanılabilir seri dondurma hakkın yok.",
  STREAK_FREEZE_WINDOW_EXPIRED: "Seri dondurma için süre doldu.",
  FREEZE_WINDOW_EXPIRED: "Seri dondurma için süre doldu.",
  STREAK_FREEZE_ALREADY_USED: "Bu gün için seri dondurma zaten kullanılmış.",
  ALREADY_FROZEN: "Bu gün için seri dondurma zaten kullanılmış.",

  NO_STREAK_FREEZE_AVAILABLE: "Kullanılabilir seri dondurma hakkın yok.",
  STREAK_NOT_AT_RISK: "Serin şu an risk altında değil.",
  STREAK_NOT_FOUND: "Seri bilgin bulunamadı.",
  UNKNOWN_GAMIFICATION_ACTION: "Bu işlem desteklenmiyor.",
  PRAYER_NOT_AVAILABLE_TODAY: "Bu vakit bugün için geçerli değil.",
  PRAYER_ATTEMPT_LIMIT_REACHED:
    "Süreyi iki kez kaçırdın. Bu vakit yarına kadar işaretlenemeyecek.",
  INVALID_DATE_RANGE: "Seçtiğin tarih aralığı geçersiz.",
  PRAYER_HISTORY_RANGE_TOO_LARGE:
    "Tarih aralığı çok geniş. En fazla 62 günlük aralık seçebilirsin.",

  CANNOT_FOLLOW_YOURSELF: "Kendini takip edemezsin.",
  CONSENT_OUTDATED: "Bu metnin güncel sürümünü onaylaman gerekiyor.",

  INVALID_CURRENT_PASSWORD: "Mevcut şifren hatalı.",
  PASSWORD_FIELDS_REQUIRED: "Mevcut ve yeni şifreyi birlikte girmelisin.",
  PASSWORDS_DO_NOT_MATCH: "Şifreler eşleşmiyor.",
  PASSWORD_TOO_WEAK:
    "Şifren en az 8 karakter olmalı; büyük harf, küçük harf, rakam ve özel karakter içermeli.",
  PASSWORD_TOO_SHORT: "Şifren en az 8 karakter olmalı.",
  PASSWORD_TOO_LONG: "Şifren en fazla 72 karakter olabilir.",
  USERNAME_TOO_SHORT: "Kullanıcı adı en az 3 karakter olmalı.",
  USERNAME_TOO_LONG: "Kullanıcı adı en fazla 20 karakter olabilir.",
  USERNAME_ALREADY_EXISTS: "Bu kullanıcı adı zaten kullanılıyor.",
  USERNAME_CHANGE_COOLDOWN_ACTIVE:
    "Kullanıcı adını yakın zamanda değiştirdin. 30 gün geçmeden tekrar değiştiremezsin.",
  USER_ALREADY_EXISTS: "Bu e-posta adresi zaten kayıtlı.",
  ACTIVE_REGISTRATION_EXISTS:
    "Bu hesap için zaten aktif bir kayıt süreci var. E-postana gönderilen kodu kullan.",
  NO_PENDING_REGISTRATION:
    "Bekleyen bir kayıt bulunamadı. Lütfen yeniden kayıt ol.",
  INVALID_OR_EXPIRED_TOKEN: "Bağlantının süresi dolmuş veya geçersiz.",
  ACTIVE_RESET_EXISTS:
    "Zaten aktif bir şifre sıfırlama isteğin var. E-postanı kontrol et.",
  EMAIL_SEND_FAILED: "E-posta gönderilemedi. Lütfen tekrar dene.",
  ACCOUNT_TEMPORARILY_LOCKED:
    "Çok fazla hatalı deneme yapıldı. Hesabın 15 dakika boyunca kilitli.",
  TOKEN_REVOKED_BY_PASSWORD_CHANGE:
    "Şifren değiştirildiği için oturumun kapatıldı. Lütfen tekrar giriş yap.",

  GUIDE_NOT_FOUND: "Bu rehber bulunamadı.",
  QUESTION_NOT_FOUND: "Soru bulunamadı.",
  VALIDATION_ERROR: "Gönderilen bilgilerde bir hata var.",
  BAD_REQUEST: "Gönderilen bilgilerde bir hata var.",
  LOCATION_REQUIRED: "Konum bilgisi gerekli.",
  USER_LOCATION_NOT_SET:
    "Konumun ayarlı değil. Namaz vakitleri için ayarlardan konumunu belirle.",
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
