"use client";

import LegalLayout from "@/src/components/legal/LegalLayout";
import {
  LegalSection,
  LegalSubSection,
  LegalList,
} from "@/src/components/legal/LegalSection";

export default function PrivacyContent() {
  return (
    <LegalLayout title="Gizlilik Politikası" lastUpdated="19 Mayıs 2026">
      <LegalSection id="giris" title="1. Giriş ve Kapsam">
        <p>
          İşbu Gizlilik Politikası (&quot;Politika&quot;), NamazGo platformunun
          (&quot;Uygulama&quot;, &quot;Platform&quot;) kişisel verilerinizi
          nasıl topladığını, kullandığını, sakladığını ve koruduğunu açıklar. Bu
          Politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve
          Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) ilkeleriyle uyumlu
          olarak hazırlanmıştır.
        </p>
        <p>
          NamazGo&apos;yu kullanarak, işbu Politika&apos;da belirtilen veri
          işleme uygulamalarını kabul ettiğinizi beyan edersiniz.
          Politika&apos;yı kabul etmiyorsanız, Platform&apos;u kullanmamanızı
          rica ederiz.
        </p>
      </LegalSection>

      <LegalSection id="veri-sorumlusu" title="2. Veri Sorumlusu">
        <p>
          Kişisel verileriniz bakımından veri sorumlusu NamazGo&apos;dur. Veri
          sorumlusuna aşağıdaki kanallardan ulaşabilirsiniz:
        </p>
        <LegalList
          items={[
            "E-posta: info@namazgo.com",
            "Uygulama içi: Ayarlar → Yardım Merkezi",
          ]}
        />
      </LegalSection>

      <LegalSection id="toplanan-veriler" title="3. Toplanan Kişisel Veriler">
        <LegalSubSection title="3.1. Kimlik ve İletişim Verileri">
          <p>
            Hesap oluşturma ve doğrulama süreçlerinde aşağıdaki veriler
            toplanır:
          </p>
          <LegalList
            items={[
              "Ad ve soyad",
              "Kullanıcı adı",
              "E-posta adresi",
              "Telefon numarası (OTP doğrulama için isteğe bağlı)",
              "Şifre (tek yönlü şifrelenerek — hash — saklanır)",
              "Cinsiyet bilgisi (avatar özelleştirmesi için isteğe bağlı)",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="3.2. Profil ve Avatar Verileri">
          <LegalList
            items={[
              "Avatar renk ve görünüm tercihleri (iris, saç, ten, dudak, kıyafet, arka plan vb. 10 ayrı renk alanı)",
              "Satın alınan avatar aksesuarları",
              "Profil fotoğrafı (kullanılması halinde)",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="3.3. Kullanım ve Aktivite Verileri">
          <LegalList
            items={[
              "Namaz streak (seri) verileri ve geçmişi",
              "Tamamlanan görevler ve görev ilerleme durumları",
              "Puan, XP ve lig bilgileri",
              "Liderlik tablosu sıralama verileri",
              "Öğrenme modülü ilerleme verileri (abdest, gusül, namaz rehberleri)",
              "Her bir rehberdeki adım tamamlanma durumları ve quiz yanıtları",
              "Uygulama içi etkileşim verileri (tıklama, gezinme, özellik kullanımı)",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="3.4. Sosyal Etkileşim Verileri">
          <LegalList
            items={[
              "Arkadaş listesi ve takipçi/takip edilen bilgileri",
              "Gönderilen ve alınan davetler",
              "Kullanıcı arama geçmişi",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="3.5. Teknik ve Cihaz Verileri">
          <LegalList
            items={[
              "IP adresi",
              "Cihaz türü, modeli ve işletim sistemi",
              "Tarayıcı türü ve sürümü",
              "Ekran çözünürlüğü",
              "Uygulama sürümü",
              "Zaman dilimi ve dil tercihi",
              "Benzersiz cihaz tanımlayıcısı",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="3.6. Ödeme Verileri">
          <p>
            Uygulama içi satın alımlar ve abonelik işlemleri sırasında ödeme
            işlemleri üçüncü parti ödeme sağlayıcılar (Apple App Store, Google
            Play Store veya diğer ödeme altyapıları) tarafından
            gerçekleştirilir. NamazGo, kredi kartı numarası veya banka hesap
            bilgisi gibi hassas ödeme verilerini doğrudan toplamaz ve saklamaz.
            Yalnızca işlem referans numarası, satın alınan ürün bilgisi ve işlem
            tarihi gibi meta veriler işlenir.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection
        id="kullanim-amaclari"
        title="4. Verilerin Kullanım Amaçları"
      >
        <LegalSubSection title="4.1. Hizmet Sunumu">
          <LegalList
            items={[
              "Hesap oluşturma, kimlik doğrulama ve oturum yönetimi",
              "OTP doğrulama kodlarının SMS, WhatsApp veya e-posta ile iletilmesi",
              "Namaz rehberlerinin ve öğrenme içeriklerinin sunulması",
              "Streak takibi ve görev yönetimi işlevlerinin sağlanması",
              "Avatar oluşturma ve özelleştirme hizmetinin sunulması",
              "Arkadaş ekleme, arama ve davet özelliklerinin çalıştırılması",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="4.2. Kişiselleştirme">
          <LegalList
            items={[
              "Kullanıcı tercihlerine göre bildirim içeriklerinin özelleştirilmesi",
              "Öğrenme deneyiminin kullanıcı ilerlemesine göre uyarlanması",
              "Avatar ve profil deneyiminin kişiselleştirilmesi",
              "Görev ve ödül önerilerinin kullanım alışkanlıklarına göre ayarlanması",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="4.3. İstatistik ve Analiz">
          <LegalList
            items={[
              "Puan, lig ve liderlik tablosu hesaplamalarının yapılması",
              "Kullanım istatistiklerinin derlenmesi ve hizmet kalitesinin ölçülmesi",
              "Anonim ve toplu istatistiksel analizlerle ürün geliştirme çalışmaları",
              "Hata tespiti, performans izleme ve teknik sorun giderme",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="4.4. Bildirim Gönderimi">
          <LegalList
            items={[
              "Namaz vakti hatırlatmaları",
              "Streak uyarıları ve motivasyon bildirimleri",
              "Görev güncellemeleri ve tamamlanma hatırlatmaları",
              "Sosyal etkileşim bildirimleri (arkadaşlık istekleri, takip bildirimleri)",
              "Platform güncellemeleri, duyurular ve hizmet bildirimleri",
              "Abonelik ve ödeme durum bildirimleri",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="4.5. Güvenlik ve Hukuki Yükümlülükler">
          <LegalList
            items={[
              "Hesap güvenliğinin sağlanması ve yetkisiz erişimin önlenmesi",
              "Dolandırıcılık ve kötüye kullanımın tespiti",
              "Yasal yükümlülüklerin yerine getirilmesi ve resmi makam taleplerinin karşılanması",
            ]}
          />
        </LegalSubSection>
      </LegalSection>

      <LegalSection id="loglama" title="5. Loglama ve İşlem Kayıtları">
        <p>
          NamazGo, platform güvenliğini sağlamak, hataları tespit etmek ve
          hizmet kalitesini artırmak amacıyla tüm kullanıcı işlemlerini kayıt
          altına alır (loglama). Loglanan veriler şunları içerebilir:
        </p>
        <LegalList
          items={[
            "Oturum açma ve kapatma işlemleri",
            "OTP doğrulama girişimleri ve sonuçları",
            "Hesap ayarlarında yapılan değişiklikler",
            "Streak kaydı oluşturma ve güncelleme işlemleri",
            "Satın alma işlemleri ve abonelik değişiklikleri",
            "Arkadaş ekleme, silme ve davet işlemleri",
            "Avatar özelleştirme değişiklikleri",
            "Hata ve çökme raporları",
            "API erişim kayıtları (IP adresi, zaman damgası, istek türü)",
          ]}
        />
        <p>
          Log verileri, ilgili yasal saklama süreleri boyunca veya güvenlik ve
          hata analizi amacıyla gerekli olan süre boyunca muhafaza edilir.
        </p>
      </LegalSection>

      <LegalSection id="cerezler" title="6. Çerez (Cookie) Kullanımı">
        <p>
          NamazGo, hizmetin düzgün çalışmasını sağlamak, kullanıcı deneyimini
          iyileştirmek ve analiz yapmak amacıyla çerezler ve benzeri
          teknolojiler kullanır.
        </p>

        <LegalSubSection title="6.1. Zorunlu Çerezler">
          <p>
            Platform&apos;un temel işlevleri için gereklidir ve devre dışı
            bırakılamaz. Bu çerezler; oturum yönetimi (auth-token), güvenlik
            doğrulaması, dil tercihi ve çerez onay tercihlerinizin saklanması
            gibi işlevleri kapsar.
          </p>
        </LegalSubSection>

        <LegalSubSection title="6.2. Analitik Çerezler">
          <p>
            Platform kullanımını analiz etmek, hizmet kalitesini ölçmek ve ürün
            geliştirme çalışmalarını desteklemek için kullanılır. Bu çerezler;
            sayfa görüntüleme sayıları, oturum süreleri, özellik kullanım
            oranları ve hata raporları gibi anonim istatistiksel veriler toplar.
            Analitik çerezlerin kullanımı için açık rızanız alınır.
          </p>
        </LegalSubSection>

        <LegalSubSection title="6.3. Pazarlama ve Takip Çerezleri">
          <p>
            Kişiselleştirilmiş reklam ve tanıtım içerikleri sunmak, kampanya
            etkinliğini ölçmek amacıyla kullanılabilir. Bu çerezler yalnızca
            açık rızanızla aktifleştirilir. Üçüncü parti reklam ağlarıyla
            etkileşim içerebilir.
          </p>
        </LegalSubSection>

        <LegalSubSection title="6.4. Bildirim ve Kişiselleştirme Çerezleri">
          <p>
            Bildirim tercihlerinizi, tema ayarlarınızı ve kişiselleştirme
            seçeneklerinizi hatırlamak için kullanılır. Bu çerezler, her
            ziyaretinizde tercihlerinizi yeniden belirlemenize gerek kalmadan
            özelleştirilmiş bir deneyim sunar. Kullanımları rızanıza tabidir.
          </p>
        </LegalSubSection>

        <LegalSubSection title="6.5. Çerez Yönetimi">
          <p>
            İlk ziyaretinizde çerez tercihlerinizi belirlemeniz için bir onay
            ekranı gösterilir. Tercihlerinizi dilediğiniz zaman sayfa altındaki
            &quot;Çerez Tercihleri&quot; bağlantısından veya Ayarlar bölümünden
            güncelleyebilirsiniz. Zorunlu çerezler hariç tüm çerez
            kategorilerini kabul veya reddetme hakkınız bulunmaktadır.
          </p>
        </LegalSubSection>

        <LegalSubSection title="6.6. Üçüncü Parti Çerezler">
          <p>Aşağıdaki üçüncü parti hizmetler çerez kullanabilir:</p>
          <LegalList
            items={[
              "Firebase (Google): Uygulama analitik, push bildirim altyapısı ve hata raporlama",
              "Ödeme sağlayıcılar: Satın alma işlemlerinin doğrulanması",
              "Bildirim servisleri: Push bildirim teslimatının yönetimi",
            ]}
          />
          <p>
            Bu hizmetlerin kendi gizlilik politikaları ve çerez uygulamaları
            bulunmaktadır. İlgili hizmetlerin gizlilik politikalarını
            incelemenizi öneririz.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection
        id="veri-paylasimi"
        title="7. Verilerin Üçüncü Taraflarla Paylaşımı"
      >
        <p>
          NamazGo, kişisel verilerinizi yalnızca aşağıdaki durumlarda ve
          belirtilen taraflarla paylaşır:
        </p>

        <LegalSubSection title="7.1. Hizmet Sağlayıcılar">
          <LegalList
            items={[
              "Firebase (Google LLC): Kimlik doğrulama, veritabanı, push bildirim, analitik ve çökme raporlama hizmetleri",
              "SMS/WhatsApp sağlayıcıları: OTP doğrulama kodlarının iletimi",
              "E-posta hizmet sağlayıcıları: İşlem e-postalarının ve bildirim e-postalarının gönderimi",
              "Ödeme altyapısı sağlayıcıları: Abonelik ve satın alma işlemlerinin gerçekleştirilmesi",
              "Bulut altyapısı sağlayıcıları: Verilerin güvenli şekilde barındırılması",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="7.2. Yasal Zorunluluklar">
          <p>
            Mahkeme kararı, savcılık talebi veya yasal düzenleme gereği yetkili
            resmi kurumlara veri aktarımı yapılabilir.
          </p>
        </LegalSubSection>

        <LegalSubSection title="7.3. Paylaşılmayan Veriler">
          <p>
            NamazGo, kişisel verilerinizi reklam amaçlı üçüncü taraflara satmaz,
            kiralamaz veya ticari amaçla devretmez.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection
        id="veri-saklama"
        title="8. Veri Saklama Süreleri ve Güvenlik"
      >
        <LegalSubSection title="8.1. Saklama Süreleri">
          <LegalList
            items={[
              "Aktif hesap verileri: Hesabınız aktif olduğu sürece saklanır.",
              "Hesap silme sonrası: Kişisel veriler 30 gün içinde silinir.",
              "İşlem logları: Güvenlik ve hukuki yükümlülükler kapsamında 2 yıla kadar saklanabilir.",
              "Anonim istatistiksel veriler: Kişisel veri niteliği taşımadığı için süresiz saklanabilir.",
              "Ödeme kayıtları: İlgili vergi ve ticaret mevzuatının öngördüğü süreler boyunca saklanır.",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="8.2. Güvenlik Önlemleri">
          <p>
            NamazGo, kişisel verilerinizi korumak için aşağıdaki teknik ve idari
            önlemleri uygular:
          </p>
          <LegalList
            items={[
              "Veri aktarımında TLS/SSL şifreleme",
              "Şifrelerin tek yönlü hash algoritmasıyla saklanması",
              "Erişim yetkilendirme ve kimlik doğrulama mekanizmaları (Bearer token, OTP)",
              "Düzenli güvenlik güncellemeleri ve zafiyet taramaları",
              "Yetkisiz erişim girişimlerinin izlenmesi ve loglanması",
              "Veri tabanı yedekleme ve felaket kurtarma planları",
              "Üçüncü parti hizmet sağlayıcıların güvenlik standartlarının değerlendirilmesi",
            ]}
          />
        </LegalSubSection>
      </LegalSection>

      <LegalSection
        id="kullanici-haklari"
        title="9. Kullanıcı Hakları (KVKK / GDPR)"
      >
        <p>6698 sayılı KVKK ve GDPR kapsamında aşağıdaki haklara sahipsiniz:</p>

        <LegalSubSection title="9.1. Erişim Hakkı">
          <p>
            Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna
            ilişkin bilgi talep etme hakkına sahipsiniz. Ayarlar bölümündeki
            &quot;Verileri Dışa Aktar&quot; özelliğini kullanarak verilerinizin
            bir kopyasını alabilirsiniz.
          </p>
        </LegalSubSection>

        <LegalSubSection title="9.2. Düzeltme Hakkı">
          <p>
            Eksik veya yanlış işlenmiş kişisel verilerinizin düzeltilmesini
            talep edebilirsiniz. Profil bilgilerinizi Ayarlar → Profil
            bölümünden doğrudan güncelleyebilirsiniz.
          </p>
        </LegalSubSection>

        <LegalSubSection title="9.3. Silme Hakkı (Unutulma Hakkı)">
          <p>
            Kişisel verilerinizin silinmesini talep edebilirsiniz. Hesap silme
            işlemi Ayarlar → &quot;Hesabımı Sil&quot; bölümünden
            gerçekleştirilebilir. Yasal saklama yükümlülükleri kapsamındaki
            veriler hariç olmak üzere, tüm verileriniz 30 gün içinde
            sistemlerimizden kalıcı olarak silinir.
          </p>
        </LegalSubSection>

        <LegalSubSection title="9.4. İşlemenin Kısıtlanması">
          <p>
            Belirli koşullarda kişisel verilerinizin işlenmesinin kısıtlanmasını
            talep edebilirsiniz. Örneğin, verilerinizin doğruluğunu itiraz
            ettiğiniz süre boyunca işleme kısıtlanabilir.
          </p>
        </LegalSubSection>

        <LegalSubSection title="9.5. Veri Taşınabilirliği">
          <p>
            Kişisel verilerinizi yapılandırılmış, yaygın kullanılan ve makine
            tarafından okunabilir bir formatta alma hakkına sahipsiniz.
            &quot;Verileri Dışa Aktar&quot; özelliği bu hakkınızı kullanmanızı
            kolaylaştırır.
          </p>
        </LegalSubSection>

        <LegalSubSection title="9.6. İtiraz Hakkı">
          <p>
            Kişisel verilerinizin işlenmesine itiraz edebilir, bildirim
            tercihlerinizi yönetebilir ve belirli veri işleme faaliyetlerine
            verdiğiniz onayı geri çekebilirsiniz. Bildirim ayarlarınızı Ayarlar
            → Bildirimler bölümünden güncelleyebilirsiniz.
          </p>
        </LegalSubSection>

        <LegalSubSection title="9.7. Şikayet Hakkı">
          <p>
            Kişisel verilerinizin işlenmesiyle ilgili şikayetlerinizi Kişisel
            Verileri Koruma Kurumu&apos;na (KVKK) veya AB vatandaşları için
            ilgili veri koruma otoritesine iletebilirsiniz.
          </p>
        </LegalSubSection>

        <LegalSubSection title="9.8. Hak Kullanım Yöntemi">
          <p>
            Yukarıdaki haklarınızı kullanmak için info@namazgo.com adresine
            e-posta göndererek veya uygulama içi Yardım Merkezi aracılığıyla
            talepte bulunabilirsiniz. Talepleriniz en geç 30 gün içinde
            değerlendirilir ve sonuçlandırılır.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection id="cocuklar" title="10. Çocukların Gizliliği">
        <p>
          NamazGo, 13 yaşın altındaki çocuklardan bilerek kişisel veri toplamaz.
          13-18 yaş arasındaki kullanıcıların, ebeveyn veya yasal vasi onayıyla
          Platform&apos;u kullanmaları önerilir. Bir çocuğun izinsiz olarak
          kişisel veri sağladığını fark etmemiz halinde, ilgili veriler derhal
          silinir. Bu konuda bilgi sahibiyseniz lütfen info@namazgo.com adresine
          bildirin.
        </p>
      </LegalSection>

      <LegalSection id="uluslararasi" title="11. Uluslararası Veri Aktarımı">
        <p>
          NamazGo, hizmet sağlayıcılarının (Firebase/Google, bildirim servisleri
          vb.) altyapıları gereği kişisel verileriniz Türkiye dışındaki
          sunucularda işlenebilir. Bu tür aktarımlarda KVKK&apos;nın 9. maddesi
          ve GDPR&apos;ın 46. maddesi kapsamındaki güvencelere (standart
          sözleşme hükümleri, yeterlilik kararları vb.) uyulur.
        </p>
      </LegalSection>

      <LegalSection
        id="hukuki-dayanak"
        title="12. Veri İşlemenin Hukuki Dayanağı"
      >
        <p>
          Kişisel verileriniz aşağıdaki hukuki dayanaklara istinaden işlenir:
        </p>
        <LegalList
          items={[
            "Açık rıza: Analitik çerezler, pazarlama bildirimleri ve kişiselleştirme çerezleri.",
            "Sözleşmenin ifası: Hesap oluşturma, hizmet sunumu, streak takibi, görev yönetimi ve ödeme işlemleri.",
            "Meşru menfaat: Hizmet güvenliği, dolandırıcılık önleme, loglama ve ürün geliştirme.",
            "Hukuki yükümlülük: Vergi mevzuatı, resmi makam talepleri ve yasal saklama yükümlülükleri.",
          ]}
        />
      </LegalSection>

      <LegalSection id="degisiklikler" title="13. Politika Değişiklikleri">
        <p>
          NamazGo, işbu Gizlilik Politikası&apos;nı zaman zaman güncelleyebilir.
          Önemli değişikliklerde kullanıcılara uygulama içi bildirim veya
          e-posta yoluyla bilgilendirme yapılır. Güncellenmiş Politika, Platform
          üzerinde yayımlandığı anda yürürlüğe girer. &quot;Son güncelleme&quot;
          tarihini düzenli olarak kontrol etmenizi öneririz.
        </p>
      </LegalSection>

      <LegalSection id="iletisim" title="14. İletişim">
        <p>
          Gizlilik Politikası hakkında soru, görüş veya veri koruma talepleriniz
          için:
        </p>
        <LegalList
          items={[
            "Genel destek: info@namazgo.com",
            "Uygulama içi: Ayarlar → Yardım Merkezi",
          ]}
        />
      </LegalSection>
    </LegalLayout>
  );
}
