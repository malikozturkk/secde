import {
  PrayerKey,
  CalculationMethod,
  Madhab,
} from "../types/enums/worship.enums";
import type { City } from "../types/worship.types";

export interface PrayerConfig {
  key: PrayerKey;
  label: string;
  shortLabel: string;
  iconName: PrayerIconName;
  color: string;
  shadow: string;
  order: number;
}

export type PrayerIconName =
  | "fajr"
  | "sunrise"
  | "dhuhr"
  | "asr"
  | "maghrib"
  | "isha";

export const PRAYER_ORDER: readonly PrayerKey[] = [
  PrayerKey.Fajr,
  PrayerKey.Sunrise,
  PrayerKey.Dhuhr,
  PrayerKey.Asr,
  PrayerKey.Maghrib,
  PrayerKey.Isha,
] as const;

export const PRAYER_CONFIG: Record<PrayerKey, PrayerConfig> = {
  [PrayerKey.Fajr]: {
    key: PrayerKey.Fajr,
    label: "İmsak",
    shortLabel: "İmsak",
    iconName: "fajr",
    color: "#F59E0B",
    shadow: "#7C4509",
    order: 0,
  },
  [PrayerKey.Sunrise]: {
    key: PrayerKey.Sunrise,
    label: "Güneş",
    shortLabel: "Güneş",
    iconName: "sunrise",
    color: "#FACC15",
    shadow: "#7E5C12",
    order: 1,
  },
  [PrayerKey.Dhuhr]: {
    key: PrayerKey.Dhuhr,
    label: "Öğle",
    shortLabel: "Öğle",
    iconName: "dhuhr",
    color: "#F97316",
    shadow: "#7E3A0F",
    order: 2,
  },
  [PrayerKey.Asr]: {
    key: PrayerKey.Asr,
    label: "İkindi",
    shortLabel: "İkindi",
    iconName: "asr",
    color: "#FB923C",
    shadow: "#7E2D0E",
    order: 3,
  },
  [PrayerKey.Maghrib]: {
    key: PrayerKey.Maghrib,
    label: "Akşam",
    shortLabel: "Akşam",
    iconName: "maghrib",
    color: "#E11D48",
    shadow: "#7B0E2A",
    order: 4,
  },
  [PrayerKey.Isha]: {
    key: PrayerKey.Isha,
    label: "Yatsı",
    shortLabel: "Yatsı",
    iconName: "isha",
    color: "#6366F1",
    shadow: "#2D2C7E",
    order: 5,
  },
};

export const PRAYER_STATE_LABEL: Record<string, string> = {
  passed: "Geçti",
  current: "Şu an",
  upcoming: "Bekliyor",
};

export const MONTHS_TR: readonly string[] = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
] as const;

export const DAYS_LONG_TR: readonly string[] = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
] as const;

export const DAYS_SHORT_TR: readonly string[] = [
  "Paz",
  "Pzt",
  "Sal",
  "Çar",
  "Per",
  "Cum",
  "Cmt",
] as const;

export const HIJRI_MONTH_NAMES: readonly string[] = [
  "Muharrem",
  "Safer",
  "Rebiülevvel",
  "Rebiülahir",
  "Cemaziyelevvel",
  "Cemaziyelahir",
  "Recep",
  "Şaban",
  "Ramazan",
  "Şevval",
  "Zilkade",
  "Zilhicce",
] as const;

export const DEFAULT_CITY: City = {
  id: "istanbul",
  name: "İstanbul",
  lat: 41.0082,
  lng: 28.9784,
  timezone: "Europe/Istanbul",
};

export const TURKISH_CITIES: readonly City[] = [
  {
    id: "adana",
    name: "Adana",
    lat: 37.0,
    lng: 35.3213,
    timezone: "Europe/Istanbul",
  },
  {
    id: "ankara",
    name: "Ankara",
    lat: 39.9334,
    lng: 32.8597,
    timezone: "Europe/Istanbul",
  },
  {
    id: "antalya",
    name: "Antalya",
    lat: 36.8969,
    lng: 30.7133,
    timezone: "Europe/Istanbul",
  },
  {
    id: "balikesir",
    name: "Balıkesir",
    lat: 39.6484,
    lng: 27.8826,
    timezone: "Europe/Istanbul",
  },
  {
    id: "bursa",
    name: "Bursa",
    lat: 40.1828,
    lng: 29.067,
    timezone: "Europe/Istanbul",
  },
  {
    id: "diyarbakir",
    name: "Diyarbakır",
    lat: 37.9144,
    lng: 40.2306,
    timezone: "Europe/Istanbul",
  },
  {
    id: "edirne",
    name: "Edirne",
    lat: 41.6772,
    lng: 26.5557,
    timezone: "Europe/Istanbul",
  },
  {
    id: "erzurum",
    name: "Erzurum",
    lat: 39.9,
    lng: 41.27,
    timezone: "Europe/Istanbul",
  },
  {
    id: "eskisehir",
    name: "Eskişehir",
    lat: 39.7767,
    lng: 30.5206,
    timezone: "Europe/Istanbul",
  },
  {
    id: "gaziantep",
    name: "Gaziantep",
    lat: 37.0662,
    lng: 37.3833,
    timezone: "Europe/Istanbul",
  },
  {
    id: "izmir",
    name: "İzmir",
    lat: 38.4192,
    lng: 27.1287,
    timezone: "Europe/Istanbul",
  },
  {
    id: "istanbul",
    name: "İstanbul",
    lat: 41.0082,
    lng: 28.9784,
    timezone: "Europe/Istanbul",
  },
  {
    id: "kayseri",
    name: "Kayseri",
    lat: 38.7312,
    lng: 35.4787,
    timezone: "Europe/Istanbul",
  },
  {
    id: "kocaeli",
    name: "Kocaeli",
    lat: 40.7654,
    lng: 29.9408,
    timezone: "Europe/Istanbul",
  },
  {
    id: "konya",
    name: "Konya",
    lat: 37.8746,
    lng: 32.4932,
    timezone: "Europe/Istanbul",
  },
  {
    id: "malatya",
    name: "Malatya",
    lat: 38.3554,
    lng: 38.3335,
    timezone: "Europe/Istanbul",
  },
  {
    id: "manisa",
    name: "Manisa",
    lat: 38.6191,
    lng: 27.4289,
    timezone: "Europe/Istanbul",
  },
  {
    id: "mersin",
    name: "Mersin",
    lat: 36.8121,
    lng: 34.6415,
    timezone: "Europe/Istanbul",
  },
  {
    id: "rize",
    name: "Rize",
    lat: 41.0201,
    lng: 40.5234,
    timezone: "Europe/Istanbul",
  },
  {
    id: "samsun",
    name: "Samsun",
    lat: 41.2867,
    lng: 36.33,
    timezone: "Europe/Istanbul",
  },
  {
    id: "sanliurfa",
    name: "Şanlıurfa",
    lat: 37.1591,
    lng: 38.7969,
    timezone: "Europe/Istanbul",
  },
  {
    id: "sivas",
    name: "Sivas",
    lat: 39.7477,
    lng: 37.0179,
    timezone: "Europe/Istanbul",
  },
  {
    id: "tekirdag",
    name: "Tekirdağ",
    lat: 40.9833,
    lng: 27.5167,
    timezone: "Europe/Istanbul",
  },
  {
    id: "trabzon",
    name: "Trabzon",
    lat: 41.0027,
    lng: 39.7168,
    timezone: "Europe/Istanbul",
  },
  {
    id: "van",
    name: "Van",
    lat: 38.4942,
    lng: 43.38,
    timezone: "Europe/Istanbul",
  },
] as const;

export const CALCULATION_METHOD_LABEL: Record<string, string> = {
  [CalculationMethod.Turkey]: "Türkiye (Diyanet)",
  [CalculationMethod.MuslimWorldLeague]: "Dünya İslam Birliği",
  [CalculationMethod.Egyptian]: "Mısır",
  [CalculationMethod.Karachi]: "Karaçi",
  [CalculationMethod.UmmAlQura]: "Ümmü'l-Kura",
  [CalculationMethod.Tehran]: "Tahran",
  [CalculationMethod.Singapore]: "Singapur",
};

export const MADHAB_LABEL: Record<string, string> = {
  [Madhab.Shafi]: "Şafi",
  [Madhab.Hanafi]: "Hanefi",
};

export const WORSHIP_QUERY_KEYS = {
  all: ["worship"] as const,
  times: (params: { lat: number; lng: number; date: string; tz: string }) =>
    ["worship", "times", params] as const,
};

export const WORSHIP_STALE_TIME = 60 * 1000;
export const WORSHIP_REFRESH_INTERVAL = 5 * 60 * 1000;
export const COUNTDOWN_TICK_MS = 1000;
export const DAY_CHANGE_CHECK_MS = 30 * 1000;

export const COORDINATE_PRECISION = 4;
export const ARC_RADIUS = 84;
export const ARC_WIDTH = 620;
export const ARC_HEIGHT = 200;

export const TEXTS = {
  pageTitle: "Namaz Vakitleri",
  todayLabel: "Bugün",
  tomorrowLabel: "Yarın",
  yesterdayLabel: "Dün",
  nextPrayerEyebrow: "SIRADAKİ NAMAZ",
  saatLabel: "Saat",
  dakikaLabel: "Dakika",
  saniyeLabel: "Saniye",
  currentPrayerTag: "ŞU AN",
  nextPrayerTag: "SIRADAKİ",
  dayFlowTitle: "Gün Akışı",
  dayFlowSubtitle: "Güneş'in doğuştan batıma yolculuğu — günün şu anki konumu.",
  dayLength: "Gün Uzunluğu",
  todayPrayersTitle: "Bugünün Vakitleri",
  todayPrayersSubtitle: "Sabah'tan yatsıya günün altı vakti.",
  hijriTitle: "Hicri Tarih",
  hijriMonthSuffix: " ayı",
  locationTitle: "Konum",
  latitudeLabel: "Enlem",
  longitudeLabel: "Boylam",
  methodTitle: "Hesaplama",
  methodKeyLabel: "Yöntem",
  madhabKeyLabel: "Mezhep",
  changeSettingsLabel: "Ayarları Değiştir",
  refreshLabel: "Yenile",
  prevDayLabel: "Önceki gün",
  nextDayLabel: "Sonraki gün",
  fastingTitle: "Oruç",
  fastingTodayLabel: "Bugün oruç",
  ramadanLabel: "Ramazan ayı",
  iftarRemainingPrefix: "İftar'a ",
  iftarRemainingSuffix: " kaldı",
  imsakLabel: "İmsak",
  iftarLabel: "İftar",
  fastingCompletedSuffix: "% tamamlandı",
  noRamadanTitle: "Ramazan ayında değiliz",
  noRamadanBody:
    "Bugün Ramazan ayına denk gelmiyor. Yine de nafile oruç tutabilir, vaktinde kıldığın namazlarla manevi yolculuğuna devam edebilirsin.",
  noRamadanBadge: "Nafile oruca açık",
  errorTitle: "Vakitler şu an yüklenemiyor",
  errorBody:
    "Bağlantını kontrol et ve tekrar dene. Sorun devam ederse biraz sonra tekrar baktığında çözülmüş olabilir.",
  errorRetry: "Tekrar dene",
  errorSecondary: "Yardım merkezi",
  emptyTitle: "Bu tarih için vakit bulunmuyor",
  emptyBody: "Seçili gün için kayıt bulamadık. Başka bir gün ya da konum dene.",
  emptyAction: "Bugüne dön",
  geoDeniedTitle: "Konum izni gerekli",
  geoDeniedBody:
    "Yaşadığın yerin namaz vakitlerini gösterebilmemiz için tarayıcı konum iznini açman gerekiyor.",
  geoDeniedAction: "Tekrar izin iste",
  geoDeniedSecondary: "Konumu elle seç",
  noLocationTitle: "Konum bilgisi alınamadı",
  noLocationBody:
    "Konum servislerine ulaşamıyoruz. İstanbul varsayılan olarak kullanılabilir ya da konumunu kendin seçebilirsin.",
  noLocationAction: "Konum seç",
  noLocationSecondary: "Varsayılan kullan",
  locationModalTitle: "Konum Seç",
  locationModalSearchPlaceholder: "Şehir ara…",
  locationModalUseGeo: "Otomatik konum kullan",
  locationModalEmpty: "Sonuç bulunamadı",
  passedSuffix: " önce",
  upcomingSuffix: " sonra",
} as const;
