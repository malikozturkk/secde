import type { FaqEntry } from "@/src/lib/jsonld";

export type DuaCategory = "prayer-dua" | "surah" | "tasbih";

export interface Dua {
  slug: string;
  title: string;
  shortTitle: string;
  category: DuaCategory;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  arabic: readonly string[];
  transliteration: readonly string[];
  meaning: readonly string[];
  whenRead: string;
  notes: readonly string[];
  faq: readonly FaqEntry[];
}

export const DUAS: readonly Dua[] = [
  {
    slug: "subhanaka",
    title: "Sübhâneke Duası",
    shortTitle: "Sübhâneke",
    category: "prayer-dua",
    metaTitle: "Sübhâneke Duası — Okunuşu, Arapçası ve Anlamı",
    metaDescription:
      "Sübhâneke duasının Arapça yazılışı, Türkçe okunuşu ve anlamı. Namazda nerede okunur, ne zaman okunmaz? Kısa ve net açıklamasıyla.",
    lede: "Sübhâneke, namaza başlarken iftitah tekbirinden hemen sonra okunan ilk duadır. Allah'ı yüceltme ve tesbih ifadesi taşır.",
    arabic: [
      "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
    ],
    transliteration: [
      "Sübhâneke Allâhümme ve bi-hamdik, ve tebârekesmük, ve teâlâ ceddük, ve lâ ilâhe ğayruk.",
    ],
    meaning: [
      "Allah'ım! Sen her türlü eksiklikten uzaksın; seni hamdinle tesbih ederim. Senin adın mübarektir, şânın yücedir ve senden başka ilah yoktur.",
    ],
    whenRead:
      "Her namazın ilk rekatında, iftitah tekbirinden sonra ve Fâtiha'dan önce okunur. Ayrıca teravih namazında her dört rekatın başında ve cenaze namazının ilk tekbirinden sonra okunur.",
    notes: [
      "Namaz içinde gizli (içinden) okunur, sesli okunmaz.",
      "Cenaze namazında Sübhâneke'nin sonuna 've celle senâük' ilavesi yapılır.",
      "İlk rekat dışındaki rekatlarda tekrar okunmaz.",
    ],
    faq: [
      {
        question: "Sübhâneke namazın neresinde okunur?",
        answer:
          "Sübhâneke, namaza başlarken 'Allâhu ekber' diyerek alınan iftitah tekbirinden hemen sonra, Fâtiha sûresinden önce okunur. Sadece ilk rekatta okunur; sonraki rekatlarda tekrarlanmaz.",
      },
      {
        question: "Sübhâneke okumayı unutursam namazım bozulur mu?",
        answer:
          "Hayır. Sübhâneke sünnettir, farz veya vacip değildir; unutulması namazı bozmaz ve sehiv secdesi gerektirmez. Fâtiha'ya başlandıktan sonra hatırlanırsa geri dönülmez, namaza devam edilir.",
      },
      {
        question: "Sübhâneke duası cenaze namazında da okunur mu?",
        answer:
          "Evet. Cenaze namazının ilk tekbirinden sonra Sübhâneke okunur ve sonuna 've celle senâük' ifadesi eklenir. Cenaze namazında kıraat (Fâtiha ve sûre okuma) yoktur.",
      },
    ],
  },
  {
    slug: "attahiyyat",
    title: "Ettehiyyâtü Duası",
    shortTitle: "Ettehiyyâtü",
    category: "prayer-dua",
    metaTitle: "Ettehiyyâtü Duası — Okunuşu, Arapçası ve Anlamı",
    metaDescription:
      "Ettehiyyâtü (Tahiyyat) duasının Arapçası, Türkçe okunuşu ve anlamı. Namazın oturuşlarında nerede okunduğu ve neden vacip olduğu.",
    lede: "Ettehiyyâtü, namazın her oturuşunda (ka'de) okunan ve şehadet cümlesini içeren duadır. Hanefî mezhebinde okunması vaciptir.",
    arabic: [
      "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ",
      "السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
      "السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ",
      "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    ],
    transliteration: [
      "Ettehiyyâtü lillâhi ves-salavâtü vet-tayyibât.",
      "Esselâmü aleyke eyyühen-nebiyyü ve rahmetullâhi ve berakâtüh.",
      "Esselâmü aleynâ ve alâ ibâdillâhis-sâlihîn.",
      "Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve rasûlüh.",
    ],
    meaning: [
      "Her türlü tazim, dua ve güzellik Allah'a mahsustur.",
      "Ey Peygamber! Allah'ın selamı, rahmeti ve bereketi senin üzerine olsun.",
      "Selam bizim ve Allah'ın sâlih kullarının üzerine olsun.",
      "Şahitlik ederim ki Allah'tan başka ilah yoktur; yine şahitlik ederim ki Muhammed O'nun kulu ve elçisidir.",
    ],
    whenRead:
      "Namazın her oturuşunda okunur: iki rekatlı namazların sonunda, üç ve dört rekatlı namazların hem ikinci rekat sonundaki ilk oturuşta hem de son oturuşta.",
    notes: [
      "Hanefî mezhebinde okunması vaciptir; unutulursa sehiv secdesi gerekir.",
      "Şehadet kısmında işaret parmağını kaldırmak sünnet olarak kabul edilir.",
      "Son oturuşta Ettehiyyâtü'den sonra salavatlar ve Rabbenâ duaları okunur.",
    ],
    faq: [
      {
        question: "Ettehiyyâtü'yü unutursam ne olur?",
        answer:
          "Hanefî mezhebinde Ettehiyyâtü okumak vaciptir. İlk oturuşta unutulup ayağa kalkılırsa namazın sonunda sehiv secdesi yapılır. Son oturuşta unutulursa yine sehiv secdesiyle telafi edilir.",
      },
      {
        question: "Ettehiyyâtü ile Tahiyyat aynı dua mı?",
        answer:
          "Evet, ikisi de aynı duayı ifade eder. 'Tahiyyat' duanın adı, 'Ettehiyyâtü' ise duanın ilk kelimesidir ve Türkiye'de yaygın olarak bu isimle anılır.",
      },
      {
        question: "İlk oturuşta Ettehiyyâtü'den sonra ne okunur?",
        answer:
          "Üç ve dört rekatlı namazların ilk oturuşunda sadece Ettehiyyâtü okunur, ardından tekbir alınarak üçüncü rekata kalkılır. Salavatlar sadece son oturuşta okunur.",
      },
    ],
  },
  {
    slug: "allahumma-salli",
    title: "Allâhümme Salli Duası",
    shortTitle: "Allâhümme Salli",
    category: "prayer-dua",
    metaTitle: "Allâhümme Salli Duası — Okunuşu, Arapçası ve Anlamı",
    metaDescription:
      "Allâhümme salli alâ Muhammed duasının Arapçası, okunuşu ve Türkçe anlamı. Namazın son oturuşunda nerede okunur?",
    lede: "Allâhümme Salli, namazın son oturuşunda Ettehiyyâtü'den sonra okunan ilk salavattır. Peygamber'e ve ailesine rahmet dilenir.",
    arabic: [
      "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
      "كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ",
      "إِنَّكَ حَمِيدٌ مَجِيدٌ",
    ],
    transliteration: [
      "Allâhümme salli alâ Muhammedin ve alâ âli Muhammed.",
      "Kemâ salleyte alâ İbrâhîme ve alâ âli İbrâhîm.",
      "İnneke hamîdün mecîd.",
    ],
    meaning: [
      "Allah'ım! Muhammed'e ve Muhammed'in ailesine rahmet eyle.",
      "İbrâhîm'e ve İbrâhîm'in ailesine rahmet ettiğin gibi.",
      "Şüphesiz sen övgüye lâyıksın, şânı yücesin.",
    ],
    whenRead:
      "Namazın son oturuşunda, Ettehiyyâtü'den hemen sonra okunur. Ardından Allâhümme Bârik duası gelir.",
    notes: [
      "İlk oturuşta okunmaz; sadece son oturuşta okunur.",
      "Okunması sünnettir, unutulması sehiv secdesi gerektirmez.",
      "Namaz dışında da her salavat gibi serbestçe okunabilir.",
    ],
    faq: [
      {
        question: "Allâhümme Salli namazın neresinde okunur?",
        answer:
          "Namazın son oturuşunda Ettehiyyâtü okunduktan sonra okunur. Onun ardından Allâhümme Bârik, sonra da Rabbenâ âtinâ ve Rabbenağfirlî duaları gelir ve selam verilir.",
      },
      {
        question: "Allâhümme Salli ile Allâhümme Bârik arasındaki fark nedir?",
        answer:
          "İki dua neredeyse aynı yapıdadır; farkları fiillerindedir. Salli duasında 'salli' ve 'salleyte' (rahmet et / rahmet ettiğin gibi), Bârik duasında 'bârik' ve 'bârakte' (bereket ver / bereket verdiğin gibi) geçer. Namazda önce Salli, sonra Bârik okunur.",
      },
      {
        question: "Salavat getirmenin fazileti nedir?",
        answer:
          "Peygamber'e salavat getirmek Kur'an'da emredilen bir ibadettir ve hadislerde faziletine dikkat çekilmiştir. Namaz dışında da gün içinde serbestçe okunabilir; NamazGo'nun zikirmatiğinde salavat hazır bir zikir olarak bulunur.",
      },
    ],
  },
  {
    slug: "allahumma-barik",
    title: "Allâhümme Bârik Duası",
    shortTitle: "Allâhümme Bârik",
    category: "prayer-dua",
    metaTitle: "Allâhümme Bârik Duası — Okunuşu, Arapçası ve Anlamı",
    metaDescription:
      "Allâhümme bârik alâ Muhammed duasının Arapçası, Türkçe okunuşu ve anlamı. Namazın son oturuşunda okunuş sırası.",
    lede: "Allâhümme Bârik, namazın son oturuşunda Allâhümme Salli'nin ardından okunan ikinci salavattır.",
    arabic: [
      "اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
      "كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ",
      "إِنَّكَ حَمِيدٌ مَجِيدٌ",
    ],
    transliteration: [
      "Allâhümme bârik alâ Muhammedin ve alâ âli Muhammed.",
      "Kemâ bârakte alâ İbrâhîme ve alâ âli İbrâhîm.",
      "İnneke hamîdün mecîd.",
    ],
    meaning: [
      "Allah'ım! Muhammed'i ve Muhammed'in ailesini mübarek kıl.",
      "İbrâhîm'i ve İbrâhîm'in ailesini mübarek kıldığın gibi.",
      "Şüphesiz sen övgüye lâyıksın, şânı yücesin.",
    ],
    whenRead:
      "Namazın son oturuşunda, Allâhümme Salli duasından hemen sonra okunur.",
    notes: [
      "Sadece son oturuşta okunur.",
      "Okunması sünnettir.",
      "Bârik duasından sonra Rabbenâ duaları okunup selam verilir.",
    ],
    faq: [
      {
        question: "Allâhümme Bârik ne zaman okunur?",
        answer:
          "Namazın son oturuşunda Ettehiyyâtü ve Allâhümme Salli okunduktan sonra okunur. Sonrasında Rabbenâ âtinâ ve Rabbenağfirlî duaları okunarak önce sağa sonra sola selam verilir.",
      },
      {
        question: "İki salavatı da bilmiyorum, namazım olur mu?",
        answer:
          "Namazın farzları ve vacipleri yerine geldiyse namaz geçerlidir; salavatlar sünnettir. Ezberleyene kadar Ettehiyyâtü'den sonra bildiğin bir salavatı veya kısa bir duayı okuyabilirsin.",
      },
      {
        question: "Salavatlar sesli mi okunur?",
        answer:
          "Hayır. Namazın oturuşlarında okunan Ettehiyyâtü, salavatlar ve Rabbenâ duaları — cemaatle kılınan sesli namazlar dâhil — daima gizli okunur.",
      },
    ],
  },
  {
    slug: "rabbana-atina",
    title: "Rabbenâ Âtinâ Duası",
    shortTitle: "Rabbenâ Âtinâ",
    category: "prayer-dua",
    metaTitle: "Rabbenâ Âtinâ Duası — Okunuşu, Arapçası ve Anlamı",
    metaDescription:
      "Rabbenâ âtinâ fid-dünyâ haseneten duasının Arapçası, okunuşu ve Türkçe anlamı. Namazda ve dua sırasında nerede okunur?",
    lede: "Rabbenâ Âtinâ, Bakara sûresinin 201. âyetidir ve namazın son oturuşunda salavatlardan sonra okunur. Dünya ve âhiret iyiliği istenen kapsayıcı bir duadır.",
    arabic: [
      "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    ],
    transliteration: [
      "Rabbenâ âtinâ fid-dünyâ haseneten ve fil-âhirati haseneten ve kınâ azâben-nâr.",
    ],
    meaning: [
      "Rabbimiz! Bize dünyada iyilik, âhirette de iyilik ver ve bizi ateş azabından koru.",
    ],
    whenRead:
      "Namazın son oturuşunda, Allâhümme Bârik duasından sonra okunur. Namaz dışında da her fırsatta okunabilen bir duadır.",
    notes: [
      "Bakara sûresi 201. âyettir.",
      "Hac ve umre dualarında da sıkça okunur.",
      "Ardından Rabbenağfirlî duası okunup selam verilir.",
    ],
    faq: [
      {
        question: "Rabbenâ Âtinâ hangi sûrede geçiyor?",
        answer:
          "Bakara sûresinin 201. âyetidir. Kur'an'da 'Rabbenâ' diye başlayan dua âyetlerinin en bilinenlerinden biridir ve namazın son oturuşunda okunması sünnettir.",
      },
      {
        question: "Namazda Rabbenâ dualarını okumak zorunlu mu?",
        answer:
          "Zorunlu değildir; sünnettir. Okunmaması namazı bozmaz ve sehiv secdesi gerektirmez. Yeni öğrenenler önce Ettehiyyâtü'yü, sonra salavatları, en son Rabbenâ dualarını ezberleyerek ilerleyebilir.",
      },
      {
        question: "Rabbenâ Âtinâ namaz dışında da okunur mu?",
        answer:
          "Evet. Dua ederken, tavaf sırasında ve günlük zikirlerde sıkça okunan kapsayıcı bir duadır; dünya ve âhiret iyiliğini birlikte ister.",
      },
    ],
  },
  {
    slug: "rabbanaghfirli",
    title: "Rabbenağfirlî Duası",
    shortTitle: "Rabbenağfirlî",
    category: "prayer-dua",
    metaTitle: "Rabbenağfirlî Duası — Okunuşu, Arapçası ve Anlamı",
    metaDescription:
      "Rabbenağfirlî ve li-vâlideyye duasının Arapçası, Türkçe okunuşu ve anlamı. Namazın son oturuşunda okunuş sırası.",
    lede: "Rabbenağfirlî, İbrâhîm sûresinin 41. âyetidir. Kişinin kendisi, anne babası ve bütün müminler için bağışlanma dilediği duadır.",
    arabic: [
      "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    ],
    transliteration: [
      "Rabbenağfirlî ve li-vâlideyye ve lil-mü'minîne yevme yekûmül-hisâb.",
    ],
    meaning: [
      "Rabbimiz! Hesabın görüleceği gün beni, anne babamı ve bütün müminleri bağışla.",
    ],
    whenRead:
      "Namazın son oturuşunda, Rabbenâ Âtinâ duasından sonra ve selamdan hemen önce okunur.",
    notes: [
      "İbrâhîm sûresi 41. âyettir.",
      "Anne babası için dua etmek isteyenlerin namaz dışında da okuduğu bir duadır.",
      "Bu duadan sonra önce sağa, sonra sola selam verilerek namaz tamamlanır.",
    ],
    faq: [
      {
        question: "Rabbenağfirlî hangi âyettir?",
        answer:
          "İbrâhîm sûresinin 41. âyetidir. Hz. İbrâhîm'in duası olarak aktarılır ve namazın son oturuşunda Rabbenâ Âtinâ'nın ardından okunması sünnettir.",
      },
      {
        question: "Namazın son oturuşunda dualar hangi sırayla okunur?",
        answer:
          "Sıra şöyledir: Ettehiyyâtü, Allâhümme Salli, Allâhümme Bârik, Rabbenâ Âtinâ ve Rabbenağfirlî. Ardından önce sağa sonra sola 'Esselâmü aleyküm ve rahmetullâh' denilerek selam verilir.",
      },
      {
        question: "Vefat etmiş anne babam için bu duayı okuyabilir miyim?",
        answer:
          "Evet. Dua, anne baba hayatta olsun olmasın onlar için bağışlanma dileme anlamı taşır ve bu yönüyle özellikle vefat etmiş ebeveyn için sıkça okunur.",
      },
    ],
  },
  {
    slug: "qunut-duas",
    title: "Kunut Duaları",
    shortTitle: "Kunut Duaları",
    category: "prayer-dua",
    metaTitle: "Kunut Duaları — Okunuşu, Arapçası ve Anlamı",
    metaDescription:
      "Kunut duası 1 ve 2'nin Arapçası, Türkçe okunuşu ve anlamı. Vitir namazında kunut duaları nerede ve nasıl okunur?",
    lede: "Kunut duaları, vitir namazının üçüncü rekatında zamm-ı sûreden sonra tekbir alınıp eller kaldırılarak okunan iki duadır.",
    arabic: [
      "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ نَشْكُرُكَ وَلَا نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ",
      "اللَّهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ وَإِلَيْكَ نَسْعَى وَنَحْفِدُ نَرْجُو رَحْمَتَكَ وَنَخْشَى عَذَابَكَ إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحِقٌ",
    ],
    transliteration: [
      "Allâhümme innâ nesteînüke ve nestağfirüke ve nestehdîk. Ve nü'minü bike ve netûbü ileyk. Ve netevekkelü aleyke ve nüsnî aleykel-hayra küllehû neşkürüke ve lâ nekfürük. Ve nahleu ve netrukü men yefcürük.",
      "Allâhümme iyyâke na'büdü ve leke nusallî ve nescüd. Ve ileyke nes'â ve nahfid. Nercû rahmeteke ve nahşâ azâbek. İnne azâbeke bil-küffâri mülhik.",
    ],
    meaning: [
      "Allah'ım! Senden yardım ister, bağışlanma diler ve doğru yola iletmeni isteriz. Sana inanır, sana tövbe eder ve sana güveniriz. Seni bütün hayırlarla över, sana şükreder, nankörlük etmeyiz. Sana isyan edenlerden uzaklaşır, onları terk ederiz.",
      "Allah'ım! Yalnız sana kulluk eder, senin için namaz kılar ve secde ederiz. Sana koşar ve yönleniriz. Rahmetini umar, azabından korkarız. Şüphesiz senin azabın inkârcılara ulaşacaktır.",
    ],
    whenRead:
      "Vitir namazının üçüncü rekatında Fâtiha ve zamm-ı sûre okunduktan sonra eller kulak hizasına kaldırılıp tekbir alınır, eller tekrar bağlanır ve iki kunut duası okunur; ardından rükûya gidilir.",
    notes: [
      "Hanefî mezhebinde vitir namazında kunut okumak vaciptir.",
      "Şâfiî mezhebinde kunut, sabah namazının ikinci rekatında rükûdan sonra okunur ve metni farklıdır.",
      "Ezberleyemeyenler, öğrenene kadar 'Rabbenâ âtinâ' duasını veya 'Allâhümmağfirlî' gibi kısa bir istiğfarı okuyabilir.",
    ],
    faq: [
      {
        question: "Kunut duaları hangi namazda okunur?",
        answer:
          "Hanefî mezhebinde kunut duaları yatsıdan sonra kılınan vitir namazının üçüncü rekatında okunur. Şâfiî mezhebinde ise sabah namazının ikinci rekatında rükûdan doğrulduktan sonra farklı bir kunut duası okunur.",
      },
      {
        question: "Kunut dualarını bilmiyorum, ne okumalıyım?",
        answer:
          "Ezberleyene kadar kunutun yerine 'Rabbenâ âtinâ fid-dünyâ haseneten ve fil-âhirati haseneten ve kınâ azâben-nâr' duasını veya üç kez 'Allâhümmağfirlî' demek yeterli kabul edilir. Bu arada duaları öğrenmeye devam etmen tavsiye edilir.",
      },
      {
        question: "Kunut duasını unutursam ne yapmalıyım?",
        answer:
          "Hanefî mezhebinde kunut vaciptir; unutulup rükûya gidilirse geri dönülmez, namazın sonunda sehiv secdesi yapılarak telafi edilir.",
      },
    ],
  },
  {
    slug: "prayer-tasbih",
    title: "Namaz Tesbihleri: Rükû, Kavme, Secde ve Celse",
    shortTitle: "Namaz Tesbihleri",
    category: "tasbih",
    metaTitle: "Namaz Tesbihleri — Rükû ve Secde Tesbihleri, Okunuşu ve Anlamı",
    metaDescription:
      "Sübhâne rabbiyel-azîm, sübhâne rabbiyel-a'lâ, semiallâhü limen hamideh ve rabbenâ lekel-hamd tesbihlerinin okunuşu ve anlamı.",
    lede: "Namazın rükû, doğrulma (kavme), secde ve iki secde arası (celse) bölümlerinde okunan kısa tesbihler. Namazı yeni öğrenenlerin ilk ezberlemesi gereken cümlelerdir.",
    arabic: [
      "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
      "رَبَّنَا لَكَ الْحَمْدُ",
      "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    ],
    transliteration: [
      "Sübhâne rabbiyel-azîm. (Rükûda en az üç kez)",
      "Semiallâhü limen hamideh. (Rükûdan doğrulurken)",
      "Rabbenâ lekel-hamd. (Doğrulduktan sonra)",
      "Sübhâne rabbiyel-a'lâ. (Secdede en az üç kez)",
    ],
    meaning: [
      "Yüce Rabbimi her türlü eksiklikten tenzih ederim.",
      "Allah kendisine hamdedeni işitir.",
      "Rabbimiz! Hamd yalnız sanadır.",
      "En yüce olan Rabbimi her türlü eksiklikten tenzih ederim.",
    ],
    whenRead:
      "Rükûda 'Sübhâne rabbiyel-azîm', rükûdan doğrulurken 'Semiallâhü limen hamideh', ayakta dururken 'Rabbenâ lekel-hamd', her iki secdede de 'Sübhâne rabbiyel-a'lâ' üçer kez okunur.",
    notes: [
      "Tesbihlerin üçer kez okunması sünnettir; tek sefer de yeterli sayılır.",
      "Cemaatle kılarken 'Semiallâhü limen hamideh' imam tarafından sesli, 'Rabbenâ lekel-hamd' cemaat tarafından gizli söylenir.",
      "İki secde arasındaki oturuşta (celse) bir tesbih zorunlu değildir; kısa bir süre beklemek yeterlidir.",
    ],
    faq: [
      {
        question: "Rükûda ne okunur?",
        answer:
          "Rükûda 'Sübhâne rabbiyel-azîm' (Yüce Rabbimi tenzih ederim) en az üç kez okunur. Üç kez okumak sünnettir; daha fazla okumak da mümkündür.",
      },
      {
        question: "Secdede ne okunur?",
        answer:
          "Her iki secdede de 'Sübhâne rabbiyel-a'lâ' (En yüce Rabbimi tenzih ederim) en az üç kez okunur. Secde, kulun Allah'a en yakın olduğu an kabul edildiği için secdede ayrıca dua etmek de tavsiye edilmiştir.",
      },
      {
        question: "Tesbihleri üçten az okursam namazım bozulur mu?",
        answer:
          "Hayır, bozulmaz. Rükû ve secde tesbihlerini üç kez okumak sünnettir; bir kez okumakla da rükûn yerine gelmiş olur. Yeni öğrenenler önce tek tesbihle başlayıp zamanla üçe çıkarabilir.",
      },
    ],
  },
  {
    slug: "surah-al-fatiha",
    title: "Fâtiha Sûresi",
    shortTitle: "Fâtiha Sûresi",
    category: "surah",
    metaTitle: "Fâtiha Sûresi — Okunuşu, Arapçası ve Türkçe Anlamı",
    metaDescription:
      "Fâtiha sûresinin Arapça yazılışı, Türkçe okunuşu ve meali. Namazın her rekatında neden okunduğu ve 7 âyetinin anlamı.",
    lede: "Fâtiha, Kur'an'ın ilk sûresi ve namazın her rekatında okunması gereken bölümdür. 'Kitabın anası' anlamında Ümmü'l-Kitâb olarak da anılır.",
    arabic: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      "الرَّحْمَٰنِ الرَّحِيمِ",
      "مَالِكِ يَوْمِ الدِّينِ",
      "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    ],
    transliteration: [
      "Bismillâhirrahmânirrahîm.",
      "Elhamdü lillâhi rabbil-âlemîn.",
      "Errahmânirrahîm.",
      "Mâliki yevmid-dîn.",
      "İyyâke na'büdü ve iyyâke nesteîn.",
      "İhdinas-sırâtal-müstakîm.",
      "Sırâtallezîne en'amte aleyhim ğayril-mağdûbi aleyhim ve lad-dâllîn.",
    ],
    meaning: [
      "Rahmân ve Rahîm olan Allah'ın adıyla.",
      "Hamd, âlemlerin Rabbi Allah'a mahsustur.",
      "O, Rahmân'dır, Rahîm'dir.",
      "Hesap gününün sahibidir.",
      "Yalnız sana kulluk eder, yalnız senden yardım dileriz.",
      "Bizi doğru yola ilet.",
      "Kendilerine nimet verdiklerinin yoluna; gazaba uğrayanların ve sapkınların yoluna değil.",
    ],
    whenRead:
      "Namazın her rekatında, Sübhâneke ve Eûzü-Besmele'den sonra okunur. Farz namazların üçüncü ve dördüncü rekatlarında sadece Fâtiha okunur, zamm-ı sûre eklenmez.",
    notes: [
      "Yedi âyettir ve Mekke döneminde inmiştir.",
      "Namazda okunması Hanefî mezhebinde vacip, diğer üç mezhepte farz kabul edilir.",
      "Fâtiha'dan sonra okunan kısa sûreye 'zamm-ı sûre' denir.",
    ],
    faq: [
      {
        question: "Fâtiha sûresi namazda kaç kez okunur?",
        answer:
          "Namazın her rekatında bir kez okunur. Örneğin dört rekatlı bir farz namazda Fâtiha dört kez okunur; ilk iki rekatta ardından zamm-ı sûre eklenir, son iki rekatta ise sadece Fâtiha okunur.",
      },
      {
        question: "Fâtiha okumayı unutursam namazım geçerli mi?",
        answer:
          "Hanefî mezhebinde Fâtiha okumak vaciptir; unutulursa namaz bozulmaz ama sehiv secdesi gerekir. Şâfiî, Mâlikî ve Hanbelî mezheplerinde Fâtiha farzdır ve okunmadan rekat geçerli olmaz.",
      },
      {
        question: "Fâtiha'dan sonra hangi sûreyi okumalıyım?",
        answer:
          "Ezberinde olan kısa bir sûre yeterlidir; İhlâs, Kevser, Asr, Nasr ve Fîl sûreleri yeni öğrenenler için en çok tercih edilenlerdir. Zamm-ı sûre sadece ilk iki rekatta okunur.",
      },
    ],
  },
  {
    slug: "surah-al-ikhlas",
    title: "İhlâs Sûresi",
    shortTitle: "İhlâs Sûresi",
    category: "surah",
    metaTitle: "İhlâs Sûresi — Okunuşu, Arapçası ve Türkçe Anlamı",
    metaDescription:
      "İhlâs sûresinin (Kul hüvallâhü ehad) Arapçası, Türkçe okunuşu ve meali. 4 âyetlik en kısa sûrelerden birinin anlamı ve fazileti.",
    lede: "İhlâs sûresi, Allah'ın birliğini en özlü biçimde anlatan dört âyetlik sûredir. Kısalığı sayesinde namaza yeni başlayanların ilk ezberlediği sûredir.",
    arabic: [
      "قُلْ هُوَ اللَّهُ أَحَدٌ",
      "اللَّهُ الصَّمَدُ",
      "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    ],
    transliteration: [
      "Kul hüvallâhü ehad.",
      "Allâhüs-samed.",
      "Lem yelid ve lem yûled.",
      "Ve lem yekün lehû küfüven ehad.",
    ],
    meaning: [
      "De ki: O Allah birdir.",
      "Allah Samed'dir; her şey O'na muhtaçtır, O hiçbir şeye muhtaç değildir.",
      "O doğurmamış ve doğmamıştır.",
      "Hiçbir şey O'nun dengi değildir.",
    ],
    whenRead:
      "Namazın ilk iki rekatında Fâtiha'dan sonra zamm-ı sûre olarak okunur. Namaz dışında da günlük zikirlerde sıkça okunur.",
    notes: [
      "Dört âyettir ve Mekke döneminde inmiştir.",
      "Hadislerde Kur'an'ın üçte birine denk fazileti bulunduğu bildirilmiştir.",
      "Felak ve Nâs sûreleriyle birlikte okunduğunda 'üç Kul' olarak anılır.",
    ],
    faq: [
      {
        question: "İhlâs sûresi kaç âyettir?",
        answer:
          "İhlâs sûresi dört âyettir ve Mekke döneminde inmiştir. Kısa olması ve Allah'ın birliğini özetlemesi nedeniyle namazda en çok okunan sûrelerden biridir.",
      },
      {
        question: "Namazda İhlâs sûresini kaç kez okuyabilirim?",
        answer:
          "İlk iki rekatta Fâtiha'dan sonra birer kez okuyabilirsin; aynı sûreyi iki rekatta da okumakta sakınca yoktur. Farz namazlarda ikinci rekatta birincisinden daha uzun bir sûre okumamaya dikkat edilir.",
      },
      {
        question: "İhlâs sûresinin anlamı nedir?",
        answer:
          "Sûre Allah'ın bir ve eşsiz olduğunu, her şeyin O'na muhtaç olduğunu, O'nun doğmadığını ve doğurmadığını, hiçbir şeyin O'na denk olmadığını bildirir. Bu yönüyle tevhid inancının en özlü ifadesidir.",
      },
    ],
  },
  {
    slug: "surah-al-falaq",
    title: "Felak Sûresi",
    shortTitle: "Felak Sûresi",
    category: "surah",
    metaTitle: "Felak Sûresi — Okunuşu, Arapçası ve Türkçe Anlamı",
    metaDescription:
      "Felak sûresinin (Kul eûzü bi-rabbil-felak) Arapçası, Türkçe okunuşu ve meali. 5 âyetin anlamı ve ne zaman okunduğu.",
    lede: "Felak sûresi, kötülüklerden Allah'a sığınmayı öğreten beş âyetlik sûredir. Nâs sûresiyle birlikte 'Muavvizeteyn' (iki sığınma sûresi) olarak anılır.",
    arabic: [
      "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
      "مِن شَرِّ مَا خَلَقَ",
      "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
      "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    ],
    transliteration: [
      "Kul eûzü bi-rabbil-felak.",
      "Min şerri mâ halak.",
      "Ve min şerri ğâsikın izâ vekab.",
      "Ve min şerrin-neffâsâti fil-ukad.",
      "Ve min şerri hâsidin izâ hased.",
    ],
    meaning: [
      "De ki: Sabahın Rabbine sığınırım.",
      "Yarattığı şeylerin şerrinden,",
      "Karanlığı çöktüğü zaman gecenin şerrinden,",
      "Düğümlere üfleyenlerin şerrinden,",
      "Ve hased ettiği zaman hasetçinin şerrinden.",
    ],
    whenRead:
      "Namazın ilk iki rekatında zamm-ı sûre olarak okunabilir. Ayrıca sabah-akşam zikirlerinde ve uyumadan önce okunması tavsiye edilmiştir.",
    notes: [
      "Beş âyettir.",
      "Nâs sûresiyle birlikte 'Muavvizeteyn' adıyla anılır.",
      "İhlâs, Felak ve Nâs birlikte okunduğunda 'üç Kul' denir.",
    ],
    faq: [
      {
        question: "Felak ve Nâs sûreleri neden birlikte okunur?",
        answer:
          "İkisi de kötülüklerden Allah'a sığınmayı ifade ettiği için 'Muavvizeteyn' yani iki sığınma sûresi olarak anılır ve hadislerde birlikte okundukları aktarılır. Uyumadan önce ve sabah-akşam zikirlerinde birlikte okunması yaygındır.",
      },
      {
        question: "Felak sûresi namazda okunur mu?",
        answer:
          "Evet. Namazın ilk iki rekatında Fâtiha'dan sonra zamm-ı sûre olarak okunabilir. Kısa olduğu için yeni öğrenenler tarafından sıkça tercih edilir.",
      },
      {
        question: "Felak sûresinin anlamı nedir?",
        answer:
          "Sûrede sabahın Rabbine sığınılır; yaratılmışların şerrinden, karanlık çöken gecenin şerrinden, düğümlere üfleyenlerin şerrinden ve haset edenin haset ettiği andaki şerrinden korunma dilenir.",
      },
    ],
  },
  {
    slug: "surah-an-nas",
    title: "Nâs Sûresi",
    shortTitle: "Nâs Sûresi",
    category: "surah",
    metaTitle: "Nâs Sûresi — Okunuşu, Arapçası ve Türkçe Anlamı",
    metaDescription:
      "Nâs sûresinin (Kul eûzü bi-rabbin-nâs) Arapçası, Türkçe okunuşu ve meali. Kur'an'ın son sûresinin 6 âyeti ve anlamı.",
    lede: "Nâs sûresi Kur'an'ın son sûresidir ve vesvesenin şerrinden Allah'a sığınmayı öğretir. Altı âyettir.",
    arabic: [
      "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
      "مَلِكِ النَّاسِ",
      "إِلَٰهِ النَّاسِ",
      "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
      "مِنَ الْجِنَّةِ وَالنَّاسِ",
    ],
    transliteration: [
      "Kul eûzü bi-rabbin-nâs.",
      "Melikin-nâs.",
      "İlâhin-nâs.",
      "Min şerril-vesvâsil-hannâs.",
      "Ellezî yüvesvisü fî sudûrin-nâs.",
      "Minel-cinneti ven-nâs.",
    ],
    meaning: [
      "De ki: İnsanların Rabbine sığınırım.",
      "İnsanların hükümdarına,",
      "İnsanların ilahına.",
      "Sinsice vesvese verenin şerrinden,",
      "O ki insanların gönüllerine vesvese verir,",
      "Cinlerden olsun insanlardan olsun.",
    ],
    whenRead:
      "Namazın ilk iki rekatında zamm-ı sûre olarak okunabilir. Felak sûresiyle birlikte sabah-akşam zikirlerinde ve uykudan önce okunur.",
    notes: [
      "Kur'an'ın 114. ve son sûresidir.",
      "Altı âyettir.",
      "Felak sûresiyle birlikte 'Muavvizeteyn' olarak anılır.",
    ],
    faq: [
      {
        question: "Nâs sûresi kaçıncı sûredir?",
        answer:
          "Nâs sûresi Kur'an'ın 114. ve son sûresidir. Altı âyetten oluşur ve vesvesenin şerrinden Allah'a sığınmayı konu edinir.",
      },
      {
        question: "Nâs sûresi ne zaman okunur?",
        answer:
          "Namazda Fâtiha'dan sonra zamm-ı sûre olarak okunabilir. Ayrıca Felak sûresiyle birlikte sabah-akşam zikirlerinde ve uyumadan önce okunması tavsiye edilmiştir.",
      },
      {
        question: "Nâs sûresinde geçen 'hannâs' ne demek?",
        answer:
          "'Hannâs', sinsice yaklaşıp Allah anıldığında geri çekilen anlamına gelir. Sûre, insanın gönlüne vesvese veren bu etkiden — ister cinlerden ister insanlardan gelsin — Allah'a sığınmayı öğretir.",
      },
    ],
  },
  {
    slug: "surah-al-kawthar",
    title: "Kevser Sûresi",
    shortTitle: "Kevser Sûresi",
    category: "surah",
    metaTitle: "Kevser Sûresi — Okunuşu, Arapçası ve Türkçe Anlamı",
    metaDescription:
      "Kevser sûresinin (İnnâ a'taynâkel-kevser) Arapçası, Türkçe okunuşu ve meali. Kur'an'ın en kısa sûresinin 3 âyeti.",
    lede: "Kevser, Kur'an'ın en kısa sûresidir; üç âyetten oluşur. Kısalığı sayesinde namazda en çok okunan zamm-ı sûrelerden biridir.",
    arabic: [
      "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
      "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
      "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
    ],
    transliteration: [
      "İnnâ a'taynâkel-kevser.",
      "Fesalli li-rabbike venhar.",
      "İnne şânieke hüvel-ebter.",
    ],
    meaning: [
      "Şüphesiz biz sana Kevser'i verdik.",
      "Öyleyse Rabbin için namaz kıl ve kurban kes.",
      "Asıl soyu kesik olan, sana buğzedenin kendisidir.",
    ],
    whenRead:
      "Namazın ilk iki rekatında Fâtiha'dan sonra zamm-ı sûre olarak okunur. Kurban bayramı hutbelerinde de sıkça anılır.",
    notes: [
      "Üç âyettir; Kur'an'ın en kısa sûresidir.",
      "'Kevser' bolluk, çokluk ve cennetteki bir ırmağın adı olarak açıklanır.",
      "Namaz ve kurbanın birlikte anılması bakımından dikkat çekicidir.",
    ],
    faq: [
      {
        question: "Kur'an'ın en kısa sûresi hangisidir?",
        answer:
          "Kevser sûresidir; üç âyetten oluşur. Bu nedenle namaza yeni başlayanların ilk ezberlediği sûreler arasında yer alır.",
      },
      {
        question: "Kevser ne anlama gelir?",
        answer:
          "Sözlükte 'pek çok, bolluk' anlamına gelir. Tefsirlerde ayrıca Peygamber'e verilen cennetteki bir ırmağın adı ve genel olarak kendisine verilen büyük hayır şeklinde açıklanmıştır.",
      },
      {
        question: "Kevser sûresi namazda nerede okunur?",
        answer:
          "Namazın ilk iki rekatında Fâtiha okunduktan sonra zamm-ı sûre olarak okunur. Üçüncü ve dördüncü rekatlarda zamm-ı sûre okunmaz, sadece Fâtiha yeterlidir.",
      },
    ],
  },
  {
    slug: "surah-al-asr",
    title: "Asr Sûresi",
    shortTitle: "Asr Sûresi",
    category: "surah",
    metaTitle: "Asr Sûresi — Okunuşu, Arapçası ve Türkçe Anlamı",
    metaDescription:
      "Asr sûresinin (Vel-asr) Arapçası, Türkçe okunuşu ve meali. 3 âyetlik sûrenin anlamı ve namazda okunuşu.",
    lede: "Asr sûresi üç âyetlik kısa bir sûredir ve insanın hüsrandan kurtuluş şartlarını özetler: iman, sâlih amel, hakkı ve sabrı tavsiye.",
    arabic: [
      "وَالْعَصْرِ",
      "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
      "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
    ],
    transliteration: [
      "Vel-asr.",
      "İnnel-insâne le-fî husr.",
      "İllellezîne âmenû ve amilus-sâlihâti ve tevâsav bil-hakkı ve tevâsav bis-sabr.",
    ],
    meaning: [
      "Asra yemin olsun ki,",
      "İnsan gerçekten hüsrandadır.",
      "Ancak iman edip sâlih amel işleyenler, birbirine hakkı ve sabrı tavsiye edenler müstesna.",
    ],
    whenRead:
      "Namazın ilk iki rekatında zamm-ı sûre olarak okunur. Kısa ve akılda kalıcı olduğu için yeni öğrenenlerin ilk tercihlerindendir.",
    notes: [
      "Üç âyettir ve Mekke döneminde inmiştir.",
      "İmam Şâfiî'nin bu sûre hakkındaki 'Kur'an'da başka bir şey inmeseydi bu yeterdi' sözü meşhurdur.",
      "Kurtuluşu dört şarta bağlaması bakımından özetleyici bir sûredir.",
    ],
    faq: [
      {
        question: "Asr sûresi kaç âyettir?",
        answer:
          "Asr sûresi üç âyettir ve Mekke döneminde inmiştir. Kısalığı ve kapsayıcı mesajı nedeniyle namazda sıkça okunur.",
      },
      {
        question: "Asr sûresi neyi anlatır?",
        answer:
          "Zamana yemin ederek insanın esasen zarar içinde olduğunu bildirir; bundan kurtulanları iman eden, sâlih amel işleyen, birbirine hakkı ve sabrı tavsiye edenler olarak sıralar.",
      },
      {
        question: "Namazda hangi kısa sûreleri ezberlemeliyim?",
        answer:
          "Başlangıç için İhlâs, Kevser, Asr, Nasr ve Fîl sûreleri yeterlidir. Bunlarla birlikte Fâtiha'yı bilmek namazı kılabilmek için gereken asgari ezberi tamamlar.",
      },
    ],
  },
  {
    slug: "ayatul-kursi",
    title: "Âyetü'l-Kürsî",
    shortTitle: "Âyetü'l-Kürsî",
    category: "surah",
    metaTitle: "Âyetü'l-Kürsî — Okunuşu, Arapçası ve Türkçe Anlamı",
    metaDescription:
      "Âyetü'l-Kürsî'nin (Bakara 255) Arapçası, Türkçe okunuşu ve meali. Namazlardan sonra neden okunduğu ve anlamı.",
    lede: "Âyetü'l-Kürsî, Bakara sûresinin 255. âyetidir. Allah'ın sıfatlarını en kapsamlı anlatan âyet olarak bilinir ve farz namazların ardından okunması yaygın bir gelenektir.",
    arabic: [
      "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
      "لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
      "لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
      "مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ",
      "يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ",
      "وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ",
      "وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ",
      "وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    ],
    transliteration: [
      "Allâhü lâ ilâhe illâ hüvel-hayyül-kayyûm.",
      "Lâ te'huzühû sinetün ve lâ nevm.",
      "Lehû mâ fis-semâvâti ve mâ fil-ard.",
      "Men zellezî yeşfeu indehû illâ bi-iznih.",
      "Ya'lemü mâ beyne eydîhim ve mâ halfehüm.",
      "Ve lâ yuhîtûne bi-şey'in min ilmihî illâ bimâ şâe.",
      "Vesia kürsiyyühüs-semâvâti vel-ard.",
      "Ve lâ yeûdühû hıfzuhümâ ve hüvel-aliyyül-azîm.",
    ],
    meaning: [
      "Allah, kendisinden başka ilah olmayandır; O diridir, her şeyin varlığı O'na bağlıdır.",
      "O'nu ne bir uyuklama tutar ne de uyku.",
      "Göklerdeki ve yerdeki her şey O'nundur.",
      "İzni olmadan O'nun katında kim şefaat edebilir?",
      "Onların önlerindekini de arkalarındakini de bilir.",
      "Dilediği kadarı dışında O'nun ilminden hiçbir şeyi kavrayamazlar.",
      "O'nun kürsüsü gökleri ve yeri kaplamıştır.",
      "Onları korumak O'na ağır gelmez. O yücedir, büyüktür.",
    ],
    whenRead:
      "Farz namazların ardından, yatmadan önce ve sabah-akşam zikirlerinde okunması yaygındır. Namazın kendi içinde zamm-ı sûre olarak da okunabilir.",
    notes: [
      "Bakara sûresinin 255. âyetidir.",
      "'Kürsî' kelimesi geçtiği için bu adla anılır.",
      "Farz namazlardan sonra okunması hadislerle teşvik edilmiştir.",
    ],
    faq: [
      {
        question: "Âyetü'l-Kürsî hangi sûrede geçer?",
        answer:
          "Bakara sûresinin 255. âyetidir. Kur'an'da Allah'ın sıfatlarını en kapsamlı anlatan âyet olarak kabul edilir ve tek başına bir sûre değildir.",
      },
      {
        question: "Âyetü'l-Kürsî namazdan sonra mı okunur?",
        answer:
          "Farz namazların ardından okunması hadislerle teşvik edilmiş ve gelenek hâline gelmiştir. Bununla birlikte namaz içinde Fâtiha'dan sonra zamm-ı sûre olarak da okunabilir.",
      },
      {
        question: "Âyetü'l-Kürsî'yi ezberlemek zor mu?",
        answer:
          "Kısa sûrelere göre daha uzundur, ancak cümle cümle çalışılarak birkaç haftada ezberlenebilir. Önce Türkçe anlamını öğrenmek, ezberi belirgin biçimde kolaylaştırır.",
      },
    ],
  },
] as const;

const DUA_BY_SLUG = new Map(DUAS.map((dua) => [dua.slug, dua]));

export const findDuaBySlug = (slug: string): Dua | undefined =>
  DUA_BY_SLUG.get(slug);

export const DUA_CATEGORY_LABELS: Record<
  DuaCategory,
  { title: string; description: string }
> = {
  "prayer-dua": {
    title: "Namaz Duaları",
    description:
      "Namazın içinde belirli yerlerde okunan dualar — başlangıçtan selama kadar sırayla.",
  },
  tasbih: {
    title: "Namaz Tesbihleri",
    description:
      "Rükû, secde ve doğrulma anlarında söylenen kısa tesbihler.",
  },
  surah: {
    title: "Namazda Okunan Sûreler",
    description:
      "Fâtiha ve namazda en çok tercih edilen kısa sûreler; Arapçası, okunuşu ve meali.",
  },
};
