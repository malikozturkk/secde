import type { FaqEntry } from "@/src/lib/jsonld";
import { locative, timeLocativeSuffix } from "@/src/lib/turkish";
import {
  buildQiblaReading,
  describeDirection,
  formatBearing,
  formatDistance,
} from "@/src/lib/qibla-utils";
import type { CityRoute } from "@/src/constants/cities";
import type { PublicPrayerTimes } from "@/src/types/prayer-times.types";

export function buildCityFaq(
  city: CityRoute,
  data: PublicPrayerTimes
): FaqEntry[] {
  const inCity = locative(city.city);
  const { times } = data.today;
  const qibla = buildQiblaReading(city.latitude, city.longitude);

  const at = (time: string): string => `${time}'${timeLocativeSuffix(time)}`;

  return [
    {
      question: `${inCity} bugün akşam ezanı saat kaçta okunuyor?`,
      answer: `${data.today.gregorianLabel} ${data.today.weekdayName} günü ${inCity} akşam ezanı ${at(times.maghrib)} okunur. Akşam namazının vakti bu anda başlar ve yatsı ezanına (${times.isha}) kadar sürer. Aynı an oruç tutanlar için iftar vaktidir.`,
    },
    {
      question: `${inCity} sabah namazı ve imsak vakti saat kaçta?`,
      answer: `${inCity} imsak, yani sabah namazının ilk vakti ${at(times.fajr)} girer. Sabah namazı bu andan güneşin doğduğu ${times.sunrise} saatine kadar kılınabilir; güneş doğduktan sonra sabah namazının vakti çıkar.`,
    },
    {
      question: `${inCity} öğle ve ikindi namazı saat kaçta?`,
      answer: `${inCity} öğle namazının vakti ${at(times.dhuhr)}, ikindi namazının vakti ise ${at(times.asr)} başlar. Öğle namazı ikindi vakti girene kadar, ikindi namazı da akşam ezanına (${times.maghrib}) kadar kılınabilir.`,
    },
    {
      question: `${inCity} yatsı namazı saat kaçta kılınır?`,
      answer: `${inCity} yatsı vakti ${at(times.isha)} başlar ve ertesi günün imsak vaktine kadar devam eder. Yatsıyı gecenin ilk üçte birinde kılmak daha faziletli kabul edilir; vitir namazı da yatsıdan sonra kılınır.`,
    },
    {
      question: `${inCity} kıble yönü kaç derece?`,
      answer: `${inCity} kıble yönü kuzeyden itibaren yaklaşık ${formatBearing(
        qibla.bearing
      )}, yani ${describeDirection(
        qibla.bearing
      )} yönündedir. ${city.city} ile Kâbe arasındaki kuş uçuşu mesafe yaklaşık ${formatDistance(
        qibla.distanceKm
      )}'dir. Pusulanı metal eşyalardan uzakta ve kalibre ederek kullanırsan sapma en aza iner.`,
    },
    {
      question: `${city.city} namaz vakitleri neye göre hesaplanıyor?`,
      answer: `Vakitler ${city.city} il merkezinin koordinatları (${city.latitude.toFixed(
        4
      )}, ${city.longitude.toFixed(
        4
      )}) ve ${data.timezone} saat dilimi üzerinden, Türkiye için kullanılan standart hesaplama yöntemiyle bulunur. İlçelerde ve rakımı çok farklı yerlerde birkaç dakikalık sapma olabilir; hassas durumlarda bulunduğun yerin resmî takvimini esas al.`,
    },
  ];
}

export function buildCityIntro(
  city: CityRoute,
  data: PublicPrayerTimes
): string {
  const inCity = locative(city.city);
  const { times } = data.today;

  return `${inCity} bugün imsak ${times.fajr}, güneş ${times.sunrise}, öğle ${times.dhuhr}, ikindi ${times.asr}, akşam ${times.maghrib} ve yatsı ${times.isha} saatlerinde. Aşağıdaki tabloda önümüzdeki yedi günün vakitlerini, hicri karşılıklarıyla birlikte görebilirsin.`;
}
