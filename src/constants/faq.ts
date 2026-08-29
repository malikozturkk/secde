import type { FaqEntry } from "@/src/lib/jsonld";

export interface FaqCategory {
  id: string;
  title: string;
  description: string;
  items: readonly FaqEntry[];
}

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: "prayer-basics",
    title: "Namazın Temelleri",
    description:
      "Namaza yeni başlayanların en çok sorduğu sorular: rekat sayıları, farz ve sünnet ayrımı, niyet.",
    items: [
      {
        question: "Namaz nasıl kılınır?",
        answer:
          "Namaz; niyet, iftitah tekbiri (Allâhu ekber), kıyam (ayakta durup Fâtiha ve bir sûre okumak), rükû, secde ve oturuşta Ettehiyyâtü okuyup selam vermek şeklinde kılınır. Her rekat kıyam, rükû ve iki secdeden oluşur. Namaza başlamadan önce abdestli olmak, avret yerlerini örtmek, kıbleye dönmek ve vaktin girmiş olması şarttır. NamazGo'nun adım adım rehberlerinde her hareketi resimli olarak görebilir, sırayla pratik yapabilirsin.",
      },
      {
        question: "Günde kaç vakit namaz vardır ve kaç rekattır?",
        answer:
          "Günde beş vakit namaz vardır: sabah, öğle, ikindi, akşam ve yatsı. Farz rekat sayıları sırasıyla 2, 4, 4, 3 ve 4'tür; yani günde toplam 17 rekat farz namaz kılınır. Sünnetler ve vitir de eklendiğinde Hanefî mezhebinde günlük toplam 40 rekata ulaşır.",
      },
      {
        question: "Farz, vacip, sünnet ve nafile namaz arasındaki fark nedir?",
        answer:
          "Farz, Allah'ın kesin olarak emrettiği ve terk edilmesi büyük günah olan namazdır; beş vaktin farzları buna girer. Vacip, Hanefî mezhebinde farza yakın güçte olan yükümlülüktür ve vitir namazı bunun en bilinen örneğidir. Sünnet, Peygamber'in düzenli olarak kıldığı ve terk edilmesi hoş karşılanmayan namazlardır. Nafile ise tamamen gönüllü kılınan, sevap kazandıran fazladan namazlardır.",
      },
      {
        question: "Namaza yeni başlıyorum, nereden başlamalıyım?",
        answer:
          "Önce abdest almayı öğren, sonra tek bir vakitle başla; genellikle en kolay tutulan vakit akşam namazıdır. Bir vakti birkaç hafta düzenli kıldıktan sonra ikinci vakti ekle. Ezberin eksikse başlangıçta Fâtiha ile birlikte İhlâs gibi kısa bir sûre yeterlidir. NamazGo'da rehberleri sırayla tamamlayıp seri (streak) tutarak alışkanlığı adım adım oturtabilirsin.",
      },
      {
        question: "Namazda hangi duaları ezberlemem gerekir?",
        answer:
          "Namazı kılabilmek için asgari olarak Fâtiha sûresi, kısa bir zamm-ı sûre (İhlâs, Kevser veya Asr gibi) ve Ettehiyyâtü gerekir. Bunlara Sübhâneke, Allâhümme salli, Allâhümme bârik ve Rabbenâ duaları eklendiğinde namaz tam olarak tamamlanmış olur. Duaların Arapçası, okunuşu ve Türkçe anlamı NamazGo'nun namaz duaları sayfasında bir arada bulunuyor.",
      },
      {
        question: "Namaz kılarken ne giymeliyim?",
        answer:
          "Namazın geçerli olması için avret yerlerinin örtülü olması gerekir. Erkeklerde göbek ile diz kapağı arası, kadınlarda el, yüz ve ayaklar dışındaki bedenin tamamı örtülür. Kıyafetin temiz olması ve vücut hatlarını belli edecek kadar dar ya da şeffaf olmaması aranır; özel bir kıyafet zorunluluğu yoktur.",
      },
      {
        question: "Namazı bozan şeyler nelerdir?",
        answer:
          "Namazda kasten konuşmak, gülmek, yiyip içmek, kıbleden yönü çevirmek, abdestin bozulması, namaz dışı fiiller yapmak (amel-i kesîr) ve özürsüz olarak rükün terk etmek namazı bozar. Yanılarak yapılan bazı eksiklikler ise namazı bozmaz, sehiv secdesiyle telafi edilir.",
      },
      {
        question: "Sehiv secdesi nedir, ne zaman yapılır?",
        answer:
          "Sehiv secdesi, namazda unutularak yapılan bir eksiklik veya fazlalığı telafi etmek için son oturuşta yapılan iki fazladan secdedir. Örneğin bir vacibi unutmak, rekat sayısında yanılmak veya birinci oturuşu atlamak sehiv secdesini gerektirir. Ettehiyyâtü okunduktan sonra sağa selam verilir, iki secde yapılır, tekrar oturulup dua okunarak selam verilir.",
      },
    ],
  },
  {
    id: "prayer-times",
    title: "Namaz Vakitleri",
    description:
      "Vakitlerin nasıl hesaplandığı, kaçırılan namazlar ve mezhep farkları.",
    items: [
      {
        question: "Namaz vakitleri nasıl hesaplanır?",
        answer:
          "Namaz vakitleri güneşin gökyüzündeki konumuna göre hesaplanır: sabah vakti fecr-i sâdıkla başlar, öğle güneşin tepe noktasını geçmesiyle, ikindi cismin gölgesinin belirli bir orana ulaşmasıyla, akşam güneşin batmasıyla, yatsı ise şafağın kaybolmasıyla girer. Bu açılar ülkeden ülkeye farklı yöntemlerle belirlenir; NamazGo, Türkiye için Diyanet'in de kullandığı hesaplama yöntemini ve seçtiğin ilin koordinatlarını esas alır.",
      },
      {
        question: "Namaz vakitleri neden şehirden şehre değişiyor?",
        answer:
          "Vakitler güneşin o noktadaki konumuna bağlı olduğu için enlem ve boylam değiştikçe saatler de kayar. Doğudaki iller güneşi daha erken gördüğü için vakitleri daha erken girer; kuzey-güney farkı ise özellikle yaz ve kış aylarında gündüz uzunluğunu değiştirir. Bu yüzden İstanbul ile Van arasında bir saati aşan farklar görülebilir.",
      },
      {
        question: "İmsak ile sabah namazı vakti aynı şey mi?",
        answer:
          "Pratikte ikisi de fecr-i sâdıkın doğuşuna, yani sabah vaktinin girişine denk gelir. İmsak orucu tutanlar için yeme içmenin bittiği andır; aynı an sabah namazının da ilk vaktidir. Sabah namazı bu andan güneş doğana kadar kılınabilir.",
      },
      {
        question: "Namaz vaktini kaçırdım, ne yapmalıyım?",
        answer:
          "Kaçırılan namaz düşmez, kaza edilir. Vakti geçen namazı hatırladığın ilk uygun zamanda, aynı rekat sayısıyla ve kaza niyetiyle kılman gerekir. Güneşin doğduğu, tam tepede olduğu ve battığı üç kerahet vakti dışında kazayı her zaman kılabilirsin. NamazGo, geç işaretlenen namazları da kaydeder; serin devam eder ama o namaz için yarım puan kazanırsın.",
      },
      {
        question: "Hanefî ve Şâfiî mezhebinde ikindi vakti neden farklı?",
        answer:
          "Fark, ikindinin başlangıcının gölge uzunluğuyla belirlenmesinden kaynaklanır. Şâfiî (ve Mâlikî, Hanbelî) mezhebinde bir cismin gölgesi kendi boyu kadar uzadığında ikindi girer; Hanefî mezhebindeki yaygın görüşe göre gölge, cismin iki katı olduğunda girer. Bu yüzden Hanefî ikindisi genelde bir saate yakın daha geç başlar. NamazGo'da mezhebini seçtiğinde vakitler buna göre hesaplanır.",
      },
      {
        question: "Cuma namazı öğle namazının yerine mi geçer?",
        answer:
          "Evet, cuma namazı kılındığında o günün öğle farzı ayrıca kılınmaz. Cuma namazı hutbe ve cemaatle kılınan 2 rekat farzdan oluşur ve üzerine cuma farz olan kişiler için öğle namazının yerine geçer. Cumaya yetişemeyen kişi o gün öğle namazını kılar.",
      },
      {
        question: "Namazı vaktin başında kılmak mı daha faziletli?",
        answer:
          "Genel kural olarak namazı vaktin ilk anlarında kılmak daha faziletlidir. Bunun bilinen istisnaları vardır: çok sıcak günlerde öğleyi biraz serinliğe bırakmak ve yatsıyı gecenin ilk üçte birine kadar geciktirmek gibi. Her hâlükârda vakit çıkmadan kılmak esastır.",
      },
      {
        question: "Yolculukta namaz nasıl kılınır?",
        answer:
          "Yaklaşık 90 kilometreyi aşan bir yolculuğa çıkan kişi seferî sayılır ve dört rekatlı farz namazları (öğle, ikindi, yatsı) iki rekat olarak kısaltarak kılar. Sabahın iki ve akşamın üç rekatlık farzı kısaltılmaz. Sünnetler yolculukta terk edilebilir; kılınırsa tam kılınır.",
      },
      {
        question: "Kerahet vakti nedir, o vakitlerde namaz kılınır mı?",
        answer:
          "Kerahet vakitleri güneşin doğuşu, tam tepe noktasında olduğu an ve batışı sırasındaki kısa zaman dilimleridir. Bu vakitlerde nafile ve kaza namazı kılmak mekruhtur. Tek istisna, o günün ikindi farzının güneş batarken kılınmasıdır — geç kalınmışsa yine de kılınır.",
      },
    ],
  },
  {
    id: "ablution",
    title: "Abdest ve Temizlik",
    description:
      "Abdestin alınışı, abdesti bozan durumlar, gusül ve teyemmüm.",
    items: [
      {
        question: "Abdest nasıl alınır?",
        answer:
          "Abdeste niyet ve besmeleyle başlanır; sonra sırasıyla eller bileklere kadar üç kez, ağız üç kez, burun üç kez yıkanır, yüz üç kez yıkanır, kollar dirseklerle birlikte üç kez yıkanır, ıslak elle başın dörtte biri mesh edilir, kulaklar ve boyun mesh edilir, son olarak ayaklar topuklarla birlikte üç kez yıkanır. Sağdan başlamak ve ara vermeden tamamlamak sünnettir. NamazGo'nun abdest rehberi bu adımları tek tek görsellerle gösterir.",
      },
      {
        question: "Abdesti bozan şeyler nelerdir?",
        answer:
          "Küçük ve büyük abdest bozmak, yellenmek, vücuttan kan veya irin akması, ağız dolusu kusmak, bayılmak, sarhoş olmak ve yatarak ya da dayanarak uyumak abdesti bozar. Hanefî mezhebinde namazda sesli gülmek de abdesti bozar. Sadece uyuklamak veya tırnak kesmek gibi durumlar abdesti bozmaz.",
      },
      {
        question: "Gusül abdesti nasıl alınır?",
        answer:
          "Gusülde üç şey farzdır: ağzın içini yıkamak, burnun içini yıkamak ve vücudun tamamını kuru yer kalmayacak şekilde yıkamak. Sünnet üzere gusül; niyet ve besmeleyle başlayıp elleri ve avret mahallini yıkamak, sonra namaz abdesti almak, ardından üç kez başa ve tüm bedene su dökmek şeklindedir. Saç diplerine ve kıvrım yerlerine suyun ulaşmasına dikkat edilir.",
      },
      {
        question: "Su bulamazsam teyemmüm nasıl yapılır?",
        answer:
          "Su bulunamadığında veya suyu kullanmak sağlık açısından zararlı olduğunda teyemmüm yapılır. Niyet edilir, iki el toprak cinsinden temiz bir yüzeye vurulup silkelenir ve yüz mesh edilir; sonra eller tekrar vurulup önce sağ sonra sol kol dirseklere kadar mesh edilir. Su bulunduğu anda teyemmüm bozulur.",
      },
      {
        question: "Mest üzerine mesh nasıl yapılır ve ne kadar sürer?",
        answer:
          "Abdestli şekilde giyilen, ayakları topuklarla birlikte örten ve su geçirmeyen mest üzerine, ayakları yıkamak yerine ıslak elle mesh edilebilir. Mesh süresi mukim kişi için 24 saat, seferî kişi için 3 gündür ve süre mestin giyilmesinden değil, giydikten sonra abdestin ilk bozulduğu andan itibaren işler. Mest çıkarıldığında mesh de biter.",
      },
      {
        question: "Namaz kılacağım yerin temiz olması şart mı?",
        answer:
          "Evet, namazın geçerlilik şartlarından biri de namaz kılınan yerin, bedenin ve elbisenin necasetten temiz olmasıdır. Seccade zorunlu değildir; temiz olduğu bilinen bir zemin yeterlidir. Şüphe edilen bir zeminde temiz bir örtü sermek en pratik çözümdür.",
      },
    ],
  },
  {
    id: "qibla",
    title: "Kıble Yönü",
    description: "Kâbe yönünün bulunması ve yön hatalarında ne yapılacağı.",
    items: [
      {
        question: "Kıble yönü nasıl bulunur?",
        answer:
          "Kıble, bulunduğun noktadan Kâbe'ye giden en kısa yönün kuzeyle yaptığı açıdır. Türkiye'nin genelinde bu açı yaklaşık 130-160 derece arasında, yani güneydoğu yönündedir; İstanbul için yaklaşık 151, Ankara için yaklaşık 165 derecedir. NamazGo'nun kıble bulucu aracı, seçtiğin ile göre bu açıyı hesaplar ve telefonun pusulasıyla birlikte gösterir.",
      },
      {
        question: "Telefon pusulası kıble için yeterince doğru mu?",
        answer:
          "Genellikle yeterlidir, ancak telefon pusulaları metal eşya, mıknatıs, elektronik cihaz ve bina demirlerinden etkilenir. Pusulayı kullanmadan önce telefonu havada sekiz çizerek kalibre etmek ve metal yüzeylerden uzak durmak sapmayı azaltır. Emin olamadığında yakındaki bir caminin mihrap yönünü referans alabilirsin.",
      },
      {
        question: "Kıbleyi yanlış yöne dönerek namaz kıldıysam namazım geçerli mi?",
        answer:
          "Araştırıp içtihat ettikten sonra yanlış yöne döndüğün ortaya çıkarsa, çoğunluk görüşüne göre namazın geçerlidir ve iade etmen gerekmez. Namaz sırasında yanlışlığı fark edersen, namazı bozmadan doğru yöne dönerek devam edersin. Hiç araştırmadan rastgele yönelmişsen ve yön de yanlışsa namazın iadesi gerekir.",
      },
      {
        question: "Uçakta veya araçta kıble nasıl belirlenir?",
        answer:
          "Farz namazlarda mümkünse araç durdurulup kıbleye dönülerek kılınır. Buna imkân yoksa, gidebildiğin ölçüde kıbleye yönelip namazı kılarsın; imkânsızlık hâlinde yöneldiğin yön kıble sayılır. Nafile namazlar yolculukta gidiş yönüne doğru da kılınabilir.",
      },
    ],
  },
  {
    id: "namazgo",
    title: "NamazGo Uygulaması",
    description:
      "Uygulamanın nasıl çalıştığı, seri sistemi, ücretlendirme ve verilerin.",
    items: [
      {
        question: "NamazGo ücretsiz mi?",
        answer:
          "Evet, NamazGo'nun tamamı ücretsizdir. Namaz vakitleri, kıble bulucu, zikirmatik, zekât hesaplayıcı ve tüm adım adım rehberler ücret ödemeden kullanılabilir. Reklam gösterilmez ve kullanıcı verisi pazarlama amacıyla üçüncü taraflara aktarılmaz.",
      },
      {
        question: "NamazGo nasıl çalışıyor, neden oyunlaştırılmış?",
        answer:
          "NamazGo, namazı bir alışkanlığa dönüştürmeye odaklanır. Her kıldığın vakti işaretlersin, arka arkaya kıldığın günler seri (streak) olarak birikir, XP kazanıp seviye atlarsın ve rehberleri tamamladıkça ilerlersin. Oyunlaştırma ibadetin yerine geçmez; sadece düzenli olmayı kolaylaştıran bir hatırlatma ve takip sistemidir.",
      },
      {
        question: "Namaz kıldığımı nasıl işaretliyorum?",
        answer:
          "Her vaktin kendi zaman aralığında o namaza ait kısa bir quiz çıkar; üç soruyu doğru cevapladığında namaz tamamlanmış olarak kaydedilir ve XP kazanırsın. Quiz, işaretlemeyi hem bilinçli hem öğretici hâle getirir. Vakti geçirip bir sonraki vakit girmeden işaretlersen namaz 'geç' olarak kaydedilir ve puanın yarıya düşer, ama serin bozulmaz.",
      },
      {
        question: "Serim (streak) bozulursa ne oluyor?",
        answer:
          "Seri, bir günü hiç namaz işaretlemeden geçirdiğinde bozulur. NamazGo bozulan seriyi hemen silmez: üç günlük bir kurtarma penceresi içinde seri dondurma hakkını kullanırsan eski serin geri gelir ve devam eden serine eklenir. Pencere kapandıktan sonra seri sıfırdan başlar.",
      },
      {
        question: "Namaz vakitlerini hangi kaynaktan alıyorsunuz?",
        answer:
          "Vakitler, seçtiğin ilin koordinatları üzerinden Türkiye için kullanılan standart hesaplama yöntemiyle ve mezhep tercihine göre hesaplanır. Dakikalık farklar hesaplama yöntemi, rakım ve ilçe konumu nedeniyle resmî takvimlerle karşılaştırıldığında görülebilir; hassas durumlarda bulunduğun yerin resmî takvimini esas al.",
      },
      {
        question: "Konumumu ve GPS iznimi vermem gerekiyor mu?",
        answer:
          "Hayır. NamazGo senden GPS konumu veya kesin koordinat istemez; sadece kayıt olurken yaşadığın ili seçersin. Namaz vakitleri, kıble açısı ve saat dilimi bu ilin merkez koordinatından hesaplanır. Tarayıcının konum izni hiçbir noktada talep edilmez.",
      },
      {
        question: "Verilerim güvende mi, hesabımı silebilir miyim?",
        answer:
          "NamazGo, KVKK kapsamında yalnızca hizmetin gerektirdiği verileri işler; mezhep tercihin ve ibadet kayıtların özel nitelikli veri sayıldığı için ayrıca açık rızanla alınır ve mezhebin başka kullanıcılara gösterilmez. Ayarlar bölümünden verilerinin bir kopyasını JSON olarak indirebilir, hesabını ve tüm kayıtlarını kalıcı olarak silebilirsin.",
      },
      {
        question: "Üye olmadan NamazGo'yu kullanabilir miyim?",
        answer:
          "Evet. Namaz vakitleri sayfaları, adım adım rehberler, kıble bulucu, zikirmatik ve zekât hesaplayıcı üyelik gerektirmez. Seri tutmak, XP kazanmak, namazlarını işaretlemek ve arkadaş eklemek için ücretsiz bir hesap oluşturman gerekir.",
      },
      {
        question: "NamazGo'da namaz vakti bildirimi var mı?",
        answer:
          "Şu an için NamazGo push bildirimi göndermez; uygulamayı açtığında bir sonraki vakte kalan süreyi geri sayımla görürsün. Vakit hatırlatması istiyorsan telefonundaki alarm veya takvim uygulamasını kullanabilirsin.",
      },
    ],
  },
] as const;

export const FAQ_ITEMS: readonly FaqEntry[] = FAQ_CATEGORIES.flatMap(
  (category) => category.items
);
