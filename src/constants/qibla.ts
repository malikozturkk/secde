import type { FaqEntry, HowToStepEntry } from "@/src/lib/jsonld";

export const QIBLA_HOW_TO_STEPS: readonly HowToStepEntry[] = [
  {
    name: "Konumunu belirle",
    text: "Sayfadaki 'Konumumu kullan' düğmesine bas ve tarayıcının konum iznini onayla. İzin vermek istemezsen bulunduğun ili listeden seçebilirsin; kıble açısı o ilin merkezine göre hesaplanır.",
  },
  {
    name: "Kıble açısını oku",
    text: "Ekranda kıble yönü, coğrafi kuzeyden saat yönünde ölçülen derece olarak görünür. Örneğin 152° değeri, kuzeyden başlayıp saat yönünde 152 derece döndüğünde Kâbe'ye baktığın anlamına gelir.",
  },
  {
    name: "Pusulayı çalıştır",
    text: "Telefonunda pusula desteği varsa kadran canlı döner. Telefonu yere paralel, elinde düz tut ve Kâbe işareti üstteki sabit oka gelene kadar kendi etrafında dön.",
  },
  {
    name: "Yönü doğrula",
    text: "Pusula 'Kıbleye dönüksün' yazdığında yüzün Kâbe'ye dönüktür. Metal masa, telefon kılıfındaki mıknatıs, hoparlör ve elektrik panosu pusulayı şaşırtır; şüphelenirsen telefonu havada 8 çizerek kalibre et ve ölçümü tekrarla.",
  },
];

export const QIBLA_FAQ: readonly FaqEntry[] = [
  {
    question: "Kıble yönüm kaç derece?",
    answer:
      "Kıble açısı bulunduğun konuma göre değişir; tek bir sabit değeri yoktur. Bu sayfanın üstündeki araç, konumunu aldıktan sonra açıyı coğrafi kuzeyden saat yönünde derece olarak gösterir. Türkiye'de değerler kabaca 125° ile 165° arasındadır: İstanbul'da yaklaşık 151°, Ankara'da 158°, İzmir'de 147°, Erzurum'da 168°, Antalya'da 152° civarındadır. Aşağıdaki il tablosunda 81 ilin açısını bulabilirsin.",
  },
  {
    question: "Kıble nasıl bulunur?",
    answer:
      "Üç pratik yol vardır. Birincisi telefonun pusulası: konumunu ver, uygulama kıble açısını hesaplasın ve pusulayla eşleştir. İkincisi elle pusula: önce kuzeyi bul, sonra kuzeyden saat yönünde kıble açısı kadar dön — ama manyetik pusula manyetik kuzeyi gösterdiği için Türkiye'de yaklaşık 6° doğuya sapar, bunu hesaba katman gerekir. Üçüncüsü çevredeki referanslar: yakınındaki bir caminin mihrap duvarı veya cemaatin saf tuttuğu yön kıbleyi gösterir; şehirde en güvenilir doğrulama yöntemi budur.",
  },
  {
    question: "Kıble yönü nasıl hesaplanır?",
    answer:
      "Kıble, bulunduğun noktadan Kâbe'ye giden en kısa yolun — küre üzerindeki büyük çemberin (great circle) — başlangıç açısıdır. Düz harita üzerinde cetvelle çizilen çizgi değildir; dünya küre olduğu için ikisi farklı sonuç verir. Formül, iki nokta arasındaki ileri azimut hesabıdır: θ = atan2( sin(Δλ)·cos(φ₂), cos(φ₁)·sin(φ₂) − sin(φ₁)·cos(φ₂)·cos(Δλ) ). Burada φ₁ senin enlemin, φ₂ Kâbe'nin enlemi, Δλ ise iki boylam arasındaki farktır. Sonuç 0–360° aralığına indirgenir ve coğrafi kuzeyden ölçülen kıble açısını verir.",
  },
  {
    question: "Kâbe'nin koordinatları nedir?",
    answer:
      "Kâbe, Suudi Arabistan'ın Mekke şehrinde, Mescid-i Haram'ın ortasında bulunur. Hesaplarda kullanılan koordinatları 21,4225° kuzey enlem ve 39,8252° doğu boylamdır. Bu sayfadaki bütün hesaplar bu iki değere dayanır. Türkiye'den Kâbe'ye kuş uçuşu uzaklık ilden ile değişmekle birlikte yaklaşık 2.200 ile 2.800 kilometre arasındadır.",
  },
  {
    question: "Pusula ile kıble nasıl bulunur?",
    answer:
      "Elindeki manyetik pusulayı yere paralel tut ve iğnenin durulmasını bekle. İğnenin gösterdiği kuzey manyetik kuzeydir; coğrafi kuzey Türkiye'de bundan yaklaşık 6° batıdadır. Yani pusulada okuman gereken değer, buradaki kıble açısından yaklaşık 6° çıkarılmış hâlidir. Örneğin coğrafi kıble açın 151° ise manyetik pusulada 145° civarını hedeflemelisin. Pusulayı metal masa, araç, kalorifer ve elektronik cihazlardan uzak tut.",
  },
  {
    question: "Telefonla kıble nasıl bulunur?",
    answer:
      "Telefonun içindeki manyetometre bir pusula gibi çalışır. Bu sayfayı aç, konum iznini ver, telefonu yere paralel ve düz tut. Kadran canlı dönmeye başlayınca Kâbe işareti ekranın üstündeki sabit oka gelene kadar kendi etrafında dön. Telefon pusulası kılıftaki mıknatıstan, kablosuz şarj pedinden ve metal yüzeylerden etkilenir; ölçüm tuhaf geliyorsa telefonu havada 8 çizerek kalibre et.",
  },
  {
    question: "GPS ile kıble bulmak daha mı doğru?",
    answer:
      "Evet, ama farkı çoğu insanın beklediğinden küçüktür. Kâbe yaklaşık 2.500 km uzakta olduğu için konumundaki her 40 kilometrelik kayma kıble açısında yaklaşık 1° hata demektir. Yani il merkezini kullanmak yerine gerçek konumunu kullanmak, aynı il içindeyken açıyı tipik olarak 1–2° düzeltir. Doğruluğu asıl sınırlayan şey konum değil, telefonun pusulasıdır: manyetometre günlük koşullarda rahatlıkla 5–15° şaşabilir. Bu yüzden en güvenilir kullanım, dereceyi buradan okuyup pusulayı yalnızca kaba yön için kullanmaktır.",
  },
  {
    question: "Konum izni neden gerekli?",
    answer:
      "Kıble açısı tamamen bulunduğun noktaya bağlıdır; konumu bilmeden hesaplanamaz. Tarayıcının konum iznini verdiğinde cihazın enlem ve boylamını okur, açıyı senin cihazında hesaplarız. İzin vermek zorunda değilsin: iznin reddedersen ya da tarayıcın desteklemiyorsa il seçerek devam edebilirsin. Aradaki fark aynı il içinde genellikle 1–2 derecedir.",
  },
  {
    question: "Konum bilgilerim saklanıyor mu?",
    answer:
      "Hayır. Aldığımız koordinat yalnızca açık olan sekmede, tarayıcının belleğinde durur. Sunucularımıza gönderilmez, veritabanına yazılmaz, çerezde veya tarayıcı deposunda tutulmaz. Sayfayı yenilediğinde veya kapattığında koordinat kaybolur ve tekrar sorulur. Kıble hesabının tamamı senin cihazında yapılır. İl seçimi yaptıysan, yalnızca seçtiğin ilin adı tarayıcının yerel deposunda saklanır — koordinat değil, il adı.",
  },
  {
    question: "Kıble yönü neden şehirden şehre değişir?",
    answer:
      "Çünkü kıble sabit bir pusula yönü değil, bulunduğun noktadan Kâbe'ye çizilen yönün açısıdır. Kâbe'ye göre konumun değiştikçe bu açı da değişir. Türkiye'nin batısından bakıldığında Kâbe daha güneydoğuda kalır, doğusundan bakıldığında ise daha güneyde. Bu yüzden Edirne'de yaklaşık 148°, Van'da ise 172° civarında bir açı çıkar. Dünya küre olduğu için değişim düz haritadan tahmin edilenden farklıdır.",
  },
  {
    question: "Manyetik sapma nedir, kıbleyi etkiler mi?",
    answer:
      "Manyetik sapma, pusulanın gösterdiği manyetik kuzey ile haritalardaki coğrafi kuzey arasındaki açı farkıdır. Türkiye'de bu fark yaklaşık 6 derece doğu yönündedir ve ilden ile yarım derece kadar değişir. Kıble açısı coğrafi kuzeye göre hesaplandığı için manyetik pusulayla doğrudan karşılaştırılırsa 6 derecelik sabit bir hata oluşur. Bu sayfadaki pusula bu farkı arka planda düzeltir; elle pusula kullanıyorsan sen hesaba katmalısın.",
  },
  {
    question: "Telefonun pusulası şaşarsa ne yapmalıyım?",
    answer:
      "Önce telefonu havada birkaç kez 8 çizerek kalibre et; bu, işletim sisteminin manyetometreyi yeniden ayarlamasını sağlar. Sonra kılıfını çıkar, telefonu metal masadan, kablosuz şarj pedinden, hoparlörden ve elektrik panosundan uzaklaştır. Aynı yerde farklı yönler okuyorsan başka bir odaya veya açık alana çık. Pusula hiç çalışmıyorsa dereceyi ekrandan okuyup yönü elle bulabilirsin.",
  },
  {
    question: "Kıble yönünde birkaç derece sapma namazı bozar mı?",
    answer:
      "Yaygın kabul gören görüşe göre Mekke'den uzaktaki kişi için Kâbe'nin tam noktasına değil, yönüne (cihet) dönmek yeterlidir; bu yüzden birkaç derecelik sapma namaza zarar vermez. Elinden geleni yapıp yöneldikten sonra sonradan yanıldığını anlamış olman da namazı iade etmeni gerektirmez. Bu açıklama bilgilendirme amaçlıdır ve fetva niteliği taşımaz; tereddüt ettiğin durumda bir ilim ehline danışman en doğrusudur.",
  },
  {
    question: "Kıble bulucu internetsiz çalışır mı?",
    answer:
      "Sayfa bir kez açıldıktan sonra hesabın tamamı cihazında yapıldığı için kıble açısı internet olmadan da hesaplanır; konum ve pusula verisi cihazın kendi donanımından gelir. Ancak sayfayı ilk kez açmak ve GPS'in hızlı konum bulması için bağlantı gerekir — kapalı alanda internetsiz GPS fix'i uzun sürebilir.",
  },
  {
    question: "Bilgisayarda kıble bulunabilir mi?",
    answer:
      "Kısmen. Masaüstü tarayıcılar konumu genellikle Wi-Fi ve IP adresine göre tahmin eder; bu yüzden birkaç yüz metre ile birkaç kilometre arasında sapabilir — kıble açısı için yine de yeterlidir. Ancak masaüstü cihazlarda manyetometre bulunmadığı için canlı pusula çalışmaz. Bilgisayarda dereceyi okuyup yönü elle bulman, canlı pusula için telefon kullanman en pratik yoldur.",
  },
];
