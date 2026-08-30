"use client";

import Link from "next/link";
import LegalLayout from "@/src/components/legal/LegalLayout";
import type { LegalDocumentMeta } from "@/src/types/legal.types";
import {
  LegalSection,
  LegalSubSection,
  LegalList,
} from "@/src/components/legal/LegalSection";

const tableWrapClass = "overflow-x-auto rounded-[var(--ng-radius)] border-[length:var(--ng-stroke)] border-[var(--ng-edge)]";
const tableClass = "w-full text-left text-[13px] leading-relaxed";
const thClass =
  "px-3 py-2 font-bold text-white bg-white/[0.06] border-b border-[var(--ng-edge)] align-top";
const tdClass =
  "px-3 py-2 border-b border-[var(--ng-edge)] text-[var(--ng-text-2)] align-top";

export default function PrivacyContent({
  version,
  effectiveDate,
}: LegalDocumentMeta) {
  return (
    <LegalLayout
      title="Kişisel Verilere İlişkin Aydınlatma Metni"
      version={version}
      effectiveDate={effectiveDate}
    >
      <LegalSection id="giris" title="1. Amaç ve Kapsam">
        <p>
          İşbu Aydınlatma Metni; NamazGo platformunda (&quot;Uygulama&quot;)
          hangi kişisel verilerinizin, hangi amaçlarla, hangi hukuki sebeplere
          dayanılarak işlendiği, kimlere aktarıldığı ve 6698 sayılı Kişisel
          Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamındaki
          haklarınız konusunda sizi bilgilendirmek amacıyla, KVKK&apos;nın 10.
          maddesi ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak
          Usul ve Esaslar Hakkında Tebliğ uyarınca hazırlanmıştır.
        </p>
        <p>
          Bu metin yalnızca bilgilendirme amaçlıdır; herhangi bir onay veya
          rıza beyanı içermez. Açık rızanıza tabi işleme faaliyetleri için
          rızanız, bu metinden ayrı olarak{" "}
          <Link
            href="/explicit-consent"
            className="text-[var(--ng-green)] underline hover:text-[var(--ng-sky)] transition-colors"
          >
            Açık Rıza Metni
          </Link>{" "}
          üzerinden alınır.
        </p>
      </LegalSection>

      <LegalSection id="veri-sorumlusu" title="2. Veri Sorumlusu">
        <p>
          Kişisel verileriniz bakımından veri sorumlusu, NamazGo platformunu işleten Namazgo — İstanbul/Türkiye (&quot;NamazGo&quot;) olup veri sorumlusuna aşağıdaki kanallardan ulaşabilirsiniz:
        </p>
        <LegalList items={["E-posta: info@namazgo.com"]} />
      </LegalSection>

      <LegalSection id="toplanan-veriler" title="3. İşlenen Kişisel Veriler">
        <p>
          NamazGo, yalnızca aşağıda sayılan kişisel verileri işler. Bu listede
          yer almayan hiçbir veri (ad-soyad, telefon numarası, ödeme bilgisi,
          cihaz kimliği, reklam tanımlayıcısı vb.) toplanmaz.
        </p>

        <LegalSubSection title="3.1. Hesap ve Kimlik Doğrulama Verileri">
          <LegalList
            items={[
              "Kullanıcı adı",
              "E-posta adresi",
              "Şifre (yalnızca tek yönlü — bcrypt + sunucu tarafı ek gizli değer (pepper) — özetlenmiş hâlde saklanır; düz metin şifreniz hiçbir zaman kaydedilmez)",
              "E-posta doğrulama (OTP) sürecine ait geçici kayıt (en fazla 10 dakika saklanır; doğrulama kodu da özetlenmiş hâlde tutulur)",
              "Oturum yenileme anahtarlarının (refresh token) özetlenmiş hâli",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="3.2. Profil Verileri">
          <LegalList
            items={[
              "Cinsiyet (yalnızca avatar görünümünün oluşturulması için; kayıt sırasında zorunludur)",
              "Avatar renk ve aksesuar tercihleri",
              "Dil tercihi",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="3.3. Konum Verileri">
          <LegalList
            items={[
              "Ülke ve il (şehir) bilgisi — namaz vakitlerinin, kıble yönünün ve saat diliminizin hesaplanabilmesi için kayıt sırasında seçtiğiniz ilden ibarettir",
            ]}
          />
          <p>
            NamazGo, kesin konumunuzu (GPS enlem/boylam){" "}
            <strong>toplamaz, sunucularına iletmez ve saklamaz</strong>. Namaz
            vakitleri, saat dilimi ve hesabınıza bağlı tüm hesaplamalar yalnızca
            seçtiğiniz il üzerinden yapılır. İl bilginiz, liderlik tablosunun il
            bazlı görünümünde diğer kullanıcılar tarafından görülebilir.
          </p>
          <p>
            Tek istisna, <strong>Kıble Bulucu aracıdır</strong> (
            <strong>/tools/qibla</strong>). Bu sayfada, yalnızca siz
            &quot;Konumumu kullan&quot; düğmesine bastığınızda ve tarayıcınızın
            izin kutusunu onayladığınızda, cihazınızın anlık koordinatları
            tarayıcının Geolocation API&apos;si üzerinden okunur. Bu veriye
            ilişkin kurallarımız şunlardır:
          </p>
          <LegalList
            items={[
              "Koordinat yalnızca açık olan sekmede, tarayıcınızın belleğinde tutulur; sayfayı kapattığınızda veya yenilediğinizde silinir",
              "Koordinat NamazGo sunucularına gönderilmez, veritabanına yazılmaz, çerezde veya tarayıcı deposunda (localStorage) saklanmaz",
              "Kıble açısı hesabının tamamı cihazınızda yapılır; bu işlem için hiçbir ağ isteği atılmaz",
              "Konum izni vermek zorunda değilsiniz — izni reddederseniz il seçerek aracı kullanmaya devam edebilirsiniz, bu durumda yalnızca seçtiğiniz ilin adı tarayıcınızda saklanır",
            ]}
          />
          <p>
            Koordinat sunucularımıza hiç ulaşmadığı ve tarafımızca kaydedilmediği
            için bu işlem üzerinde bir veri sorumlusu sıfatıyla saklama yapmıyoruz;
            veri cihazınızdan çıkmaz. Konum izni tarayıcı ayarlarınızdan istediğiniz
            an geri alınabilir.
          </p>
        </LegalSubSection>

        <LegalSubSection title="3.4. Özel Nitelikli Kişisel Veriler (Din/İnanç)">
          <p>
            Uygulamanın temel işlevi ibadet takibi olduğundan, aşağıdaki
            veriler KVKK&apos;nın 6. maddesi kapsamında dini inanca ilişkin{" "}
            <strong>özel nitelikli kişisel veri</strong> olarak kabul edilir ve
            yalnızca ayrıca vereceğiniz açık rızaya dayanılarak işlenir:
          </p>
          <LegalList
            items={[
              "Mezhep tercihi (Hanefî/Şâfiî) — namaz vakitlerinin mezhebinize göre hesaplanması için",
              "Namaz/ibadet tamamlama kayıtları (hangi vakti, hangi tarihte, vaktinde veya geç işaretlediğiniz)",
              "Namaz sonrası quiz yanıtları ve sonuçları",
              "Seri (streak), XP/seviye ve ibadet istatistikleri (ibadet kayıtlarınızdan türetilir)",
            ]}
          />
          <p>
            Mezhep bilginiz yalnızca size gösterilir; diğer kullanıcılara ve
            üçüncü taraflara açıklanmaz. İbadet istatistikleriniz (seri, XP,
            namaz sayısı) ise Uygulamanın sosyal özellikleri gereği liderlik
            tablosunda ve profil istatistiklerinizde diğer kullanıcılara
            görünür; bu görünürlük, açık rıza metninde ayrıca belirtilmiştir.
          </p>
        </LegalSubSection>

        <LegalSubSection title="3.5. Sosyal Etkileşim Verileri">
          <LegalList
            items={[
              "Takip ettiğiniz ve sizi takip eden kullanıcılar",
              "Kullanıcı arama sorgularınız (kayıt altına alınmaz; yalnızca aramanın çalıştırılması için işlenir)",
            ]}
          />
        </LegalSubSection>

        <LegalSubSection title="3.6. Bildirim Verileri">
          <LegalList
            items={[
              "Bildirim tercihleriniz (hangi bildirim başlığını açtığınız/kapattığınız ve bu tercihi ne zaman değiştirdiğiniz)",
              "Tarayıcı bildirim aboneliğiniz (bildirim sağlayıcısının ürettiği abonelik adresi, şifreleme anahtarları ve cihazınızın tarayıcı bilgisi — user-agent)",
              "Gönderim kayıtları (hangi bildirim başlığının size ne zaman gönderildiği; bildirimin içeriği saklanmaz)",
            ]}
          />
          <p>
            Namaz vakti ve işaretleme hatırlatmaları, dinî pratiğinize ilişkin
            olduğu için özel nitelikli kişisel veri niteliğindedir ve yalnızca
            açık rızanızla gönderilir. Bildirimler varsayılan olarak kapalıdır;
            hiçbir bildirim, siz açıkça açmadan gönderilmez.
          </p>
        </LegalSubSection>

        <LegalSubSection title="3.7. İşlem Güvenliği ve Teknik Veriler">
          <LegalList
            items={[
              "IP adresi ve istek kayıtları (erişim logları: istek yolu, zaman damgası, istek kimliği, kullanıcı kimliği)",
              "Başarısız giriş denemesi sayısı ve hesap kilitlenme durumu",
              "Uygulama hatası raporları (hata mesajı, sayfa yolu, tarayıcı bilgisi — user-agent; bu raporlara kimlik bilgisi ve sorgu parametresi eklenmez)",
            ]}
          />
        </LegalSubSection>
      </LegalSection>

      <LegalSection
        id="amac-hukuki-sebep"
        title="4. İşleme Amaçları, Hukuki Sebepler ve Alıcılar"
      >
        <p>
          Hangi veri kategorisinin hangi amaçla, hangi hukuki sebebe
          dayanılarak işlendiği ve kimlere aktarıldığı aşağıdaki tabloda
          gösterilmiştir (KVKK m.5, m.6 ve m.10):
        </p>
        <div className={tableWrapClass}>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>Veri</th>
                <th className={thClass}>Amaç</th>
                <th className={thClass}>Hukuki Sebep</th>
                <th className={thClass}>Alıcı / Aktarım</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdClass}>E-posta, kullanıcı adı, şifre özeti</td>
                <td className={tdClass}>
                  Hesap oluşturma, kimlik doğrulama, oturum yönetimi, zorunlu
                  hizmet e-postaları (doğrulama kodu, şifre sıfırlama)
                </td>
                <td className={tdClass}>
                  KVKK m.5/2-c — sözleşmenin kurulması ve ifası
                </td>
                <td className={tdClass}>
                  E-posta iletimi için Mailjet (bkz. Bölüm 5)
                </td>
              </tr>
              <tr>
                <td className={tdClass}>Ülke, il (şehir)</td>
                <td className={tdClass}>
                  Namaz vakitlerinin, kıble yönünün ve saat diliminin
                  seçtiğiniz ile göre hesaplanması
                </td>
                <td className={tdClass}>
                  KVKK m.5/2-c — sözleşmenin ifası
                </td>
                <td className={tdClass}>Aktarılmaz</td>
              </tr>
              <tr>
                <td className={tdClass}>Mezhep tercihi</td>
                <td className={tdClass}>
                  Namaz vakitlerinin (özellikle ikindi vaktinin) mezhebinize
                  göre hesaplanması
                </td>
                <td className={tdClass}>
                  KVKK m.6/2 — açık rıza (ayrı Açık Rıza Metni ile)
                </td>
                <td className={tdClass}>Aktarılmaz</td>
              </tr>
              <tr>
                <td className={tdClass}>
                  İbadet kayıtları, quiz yanıtları, seri/XP
                </td>
                <td className={tdClass}>
                  İbadet takibi, oyunlaştırma (seri, XP, seviye), liderlik
                  tablosu ve profil istatistikleri
                </td>
                <td className={tdClass}>
                  KVKK m.6/2 — açık rıza (ayrı Açık Rıza Metni ile)
                </td>
                <td className={tdClass}>
                  Üçüncü taraflara aktarılmaz; istatistikler Uygulama içinde
                  diğer kullanıcılara görünür
                </td>
              </tr>
              <tr>
                <td className={tdClass}>Cinsiyet, avatar tercihleri</td>
                <td className={tdClass}>Avatar görünümünün oluşturulması</td>
                <td className={tdClass}>
                  KVKK m.5/2-c — sözleşmenin ifası
                </td>
                <td className={tdClass}>
                  Avatar görünümü diğer kullanıcılara görünür; üçüncü taraflara
                  aktarılmaz
                </td>
              </tr>
              <tr>
                <td className={tdClass}>Takip ilişkileri</td>
                <td className={tdClass}>Sosyal özelliklerin sunulması</td>
                <td className={tdClass}>
                  KVKK m.5/2-c — sözleşmenin ifası
                </td>
                <td className={tdClass}>Aktarılmaz</td>
              </tr>
              <tr>
                <td className={tdClass}>IP adresi, erişim logları</td>
                <td className={tdClass}>
                  Hizmet güvenliği, kötüye kullanımın ve yetkisiz erişimin
                  önlenmesi, hata tespiti
                </td>
                <td className={tdClass}>
                  KVKK m.5/2-f — meşru menfaat; ilgili mevzuattan doğan
                  yükümlülükler bakımından m.5/2-a ve m.5/2-ç
                </td>
                <td className={tdClass}>
                  Yalnızca yetkili kamu kurumlarının hukuka uygun talebi
                  hâlinde
                </td>
              </tr>
              <tr>
                <td className={tdClass}>
                  Bildirim tercihleri, abonelik ve gönderim kayıtları
                </td>
                <td className={tdClass}>
                  Namaz vakti, işaretleme süresi, seri ve takipçi
                  bildirimlerinin gönderilmesi
                </td>
                <td className={tdClass}>
                  KVKK m.5/1 ve m.6/2 — açık rıza (bildirimler varsayılan
                  olarak kapalıdır)
                </td>
                <td className={tdClass}>
                  Tarayıcınızın bildirim sağlayıcısı (bkz. 5. bölüm)
                </td>
              </tr>
              <tr>
                <td className={tdClass}>Hata raporları</td>
                <td className={tdClass}>
                  Uygulama hatalarının tespiti ve giderilmesi
                </td>
                <td className={tdClass}>KVKK m.5/2-f — meşru menfaat</td>
                <td className={tdClass}>Aktarılmaz (kendi sunucumuza gider)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          NamazGo; pazarlama, reklam veya profilleme amaçlı veri işlemez, veri
          satmaz ve üçüncü taraflarla ticari amaçla veri paylaşmaz.
        </p>
      </LegalSection>

      <LegalSection
        id="veri-paylasimi"
        title="5. Verilerin Aktarıldığı Taraflar ve Yurt Dışına Aktarım"
      >
        <p>
          Kişisel verileriniz yalnızca aşağıdaki hizmet sağlayıcılara,
          yalnızca belirtilen amaçla sınırlı olarak aktarılır:
        </p>
        <LegalList
          items={[
            "Mailjet (e-posta iletim hizmeti): Hesap doğrulama kodu ve şifre sıfırlama e-postalarının gönderilebilmesi için e-posta adresiniz ve kullanıcı adınız iletilir. Sunucuları yurt dışındadır.",
            "Tarayıcınızın bildirim (push) sağlayıcısı: Bildirimleri açmanız hâlinde, bildirim iletisi tarayıcınızın bağlı olduğu sağlayıcıya (Chrome/Edge için Google, Firefox için Mozilla, Safari için Apple) iletilir. Bildirim içeriği RFC 8291 uyarınca uçtan uca şifrelenir; sağlayıcı içeriği okuyamaz, yalnızca cihazınıza iletir. Bu sağlayıcıların sunucuları yurt dışındadır. Bildirimleri kapattığınızda bu aktarım tamamen sona erer.",
            "Barındırma altyapısı: Uygulama ve veritabanı, Bulutova'nın Türkiye/Bursa'daki sunucuları üzerinde barındırılmaktadır.",
            "Yetkili kamu kurum ve kuruluşları: Yalnızca hukuka uygun ve usulüne göre yapılmış talepler hâlinde (KVKK m.8/2, m.28).",
          ]}
        />
        <p>
          Yurt dışında yerleşik hizmet sağlayıcılara yapılan aktarımlar,
          KVKK&apos;nın 9. maddesinde öngörülen mekanizmalara (yeterlilik
          kararı bulunmayan hâllerde, Kişisel Verilerin Yurt Dışına
          Aktarılmasına İlişkin Usul ve Esaslar Hakkında Yönetmelik uyarınca
          imzalanan ve Kurum&apos;a bildirilen standart sözleşmeler gibi uygun
          güvenceler) dayanılarak gerçekleştirilir.
        </p>
      </LegalSection>

      <LegalSection id="veri-saklama" title="6. Saklama Süreleri">
        <p>
          Kişisel veriler, KVKK m.4/2-d ve m.7 uyarınca kategori bazında
          yalnızca amaç için gerekli süre boyunca saklanır; işleme şartlarının
          tamamı ortadan kalktığında silinir, yok edilir veya anonim hâle
          getirilir:
        </p>
        <div className={tableWrapClass}>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>Veri</th>
                <th className={thClass}>Saklama Süresi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdClass}>
                  Hesap, profil, konum, mezhep ve ibadet verileri
                </td>
                <td className={tdClass}>
                  Hesabınız var olduğu sürece; hesabınızı sildiğinizde derhâl
                  ve geri alınamaz şekilde silinir
                </td>
              </tr>
              <tr>
                <td className={tdClass}>
                  E-posta doğrulama (OTP) geçici kayıtları
                </td>
                <td className={tdClass}>
                  En fazla 10 dakika; süresi dolan kayıtlar her dakika çalışan
                  otomatik temizlikle silinir
                </td>
              </tr>
              <tr>
                <td className={tdClass}>Şifre sıfırlama kayıtları</td>
                <td className={tdClass}>
                  En fazla 30 dakika; süresi dolan kayıtlar otomatik silinir
                </td>
              </tr>
              <tr>
                <td className={tdClass}>Oturum yenileme anahtarları</td>
                <td className={tdClass}>
                  En fazla 1 gün; süresi dolan kayıtlar saatlik otomatik
                  temizlikle silinir
                </td>
              </tr>
              <tr>
                <td className={tdClass}>Bildirim tercihleri</td>
                <td className={tdClass}>
                  Hesabınız var olduğu sürece; rızanızı geri çektiğinizde kayıt
                  silinmez, rızanın geri alındığı an işlenir (rıza geçmişinin
                  ispatı için) ve bildirim gönderimi derhâl durur
                </td>
              </tr>
              <tr>
                <td className={tdClass}>Bildirim aboneliği (cihaz kaydı)</td>
                <td className={tdClass}>
                  Aboneliği kaldırana kadar; bildirim sağlayıcısı aboneliği
                  geçersiz kıldığında kayıt otomatik silinir
                </td>
              </tr>
              <tr>
                <td className={tdClass}>Bildirim gönderim kayıtları</td>
                <td className={tdClass}>
                  30 gün; aynı bildirimin iki kez gönderilmemesi için tutulur ve
                  günlük otomatik temizlikle silinir
                </td>
              </tr>
              <tr>
                <td className={tdClass}>
                  Erişim/güvenlik logları (IP adresi dâhil)
                </td>
                <td className={tdClass}>
                  Güvenlik ve ilgili mevzuattan doğan yükümlülükler (5651
                  sayılı Kanun dâhil) için gerekli süre boyunca, her hâlde en
                  fazla 2 yıl
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection id="cerezler" title="7. Çerezler ve Yerel Depolama">
        <p>
          NamazGo <strong>analitik, pazarlama veya reklam çerezi kullanmaz</strong>;
          üçüncü taraf takip teknolojisi barındırmaz. Kullanılan çerez ve yerel
          depolama kayıtlarının tamamı aşağıdadır:
        </p>
        <LegalSubSection title="7.1. Zorunlu Kayıtlar">
          <LegalList
            items={[
              "auth-token (çerez): Oturumunuzun sürdürülmesi için erişim anahtarını tutar; oturum kapatıldığında silinir.",
              "namazgo-cookie-consent (çerez): Çerez tercihlerinizi hatırlar (365 gün).",
              "auth-storage (localStorage): Oturum yenileme anahtarı ve profil bilgileriniz (mezhep tercihiniz dâhil), her açılışta yeniden giriş yapmanızı önlemek için tarayıcınızda saklanır; çıkış yaptığınızda temizlenir.",
            ]}
          />
        </LegalSubSection>
        <LegalSubSection title="7.2. Tercihe Bağlı Kişiselleştirme Kayıtları">
          <LegalList
            items={[
              "Zikirmatik sayacı ve seri bildirimi tercihi (localStorage): Yalnızca ilgili aracı kullandığınızda, sayaç durumunuzu tarayıcınızda hatırlamak için tutulur. Sunucuya gönderilmez.",
            ]}
          />
        </LegalSubSection>
        <p>
          Çerez tercihlerinizi ilk ziyaretinizde gösterilen tercih ekranından
          veya ana sayfa altındaki &quot;Çerez Tercihleri&quot; bağlantısından
          yönetebilirsiniz.
        </p>
      </LegalSection>

      <LegalSection id="loglama" title="8. Loglama">
        <p>
          Hizmet güvenliğinin sağlanması ve hataların tespiti amacıyla API
          istekleri; IP adresi, istek yolu, zaman damgası, istek kimliği ve
          (oturum açmışsanız) kullanıcı kimliğinizle birlikte kayıt altına
          alınır. Log kayıtlarına şifre, oturum anahtarı, e-posta içeriği ve
          istek gövdesi yazılmaz; e-posta adresleri log satırlarında
          maskelenir.
        </p>
      </LegalSection>

      <LegalSection id="guvenlik" title="9. Veri Güvenliği Önlemleri">
        <p>KVKK m.12 kapsamında alınan başlıca teknik tedbirler:</p>
        <LegalList
          items={[
            "Tüm veri aktarımında TLS/SSL şifreleme",
            "Şifrelerin bcrypt ve sunucu tarafı ek gizli değer (pepper) ile tek yönlü özetlenmesi",
            "OTP kodlarının, oturum yenileme ve şifre sıfırlama anahtarlarının veritabanında yalnızca özet (hash) olarak tutulması",
            "İstek sınırlama (rate limiting) ve art arda başarısız girişlerde hesap kilitleme",
            "Log kayıtlarında kişisel verilerin maskelenmesi ve hassas alanların log dışı bırakılması",
            "Süresi dolan geçici kayıtların otomatik silinmesi",
          ]}
        />
      </LegalSection>

      <LegalSection id="kullanici-haklari" title="10. KVKK Kapsamındaki Haklarınız">
        <p>
          KVKK&apos;nın 11. maddesi uyarınca veri sorumlusuna başvurarak şu
          haklara sahipsiniz:
        </p>
        <LegalList
          items={[
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
            "İşlenmişse buna ilişkin bilgi talep etme",
            "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
            "Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme",
            "Eksik veya yanlış işlenmişse düzeltilmesini isteme (profil bilgilerinizi Ayarlar bölümünden doğrudan da güncelleyebilirsiniz)",
            "KVKK m.7'deki şartlar çerçevesinde silinmesini veya yok edilmesini isteme (hesabınızı Ayarlar bölümünden silebilir veya bize e-posta ile başvurabilirsiniz)",
            "Düzeltme, silme ve yok etme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme",
            "İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
            "Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
          ]}
        />
        <p>
          Açık rızanıza dayanan işleme faaliyetlerine ilişkin rızanızı her
          zaman geri çekebilirsiniz. Mezhep ve ibadet kayıtlarının işlenmesi
          Uygulamanın temel işlevi olduğundan, bu rızanın geri çekilmesi
          hâlinde hesabınızın ve ilişkili verilerin silinmesi gerekir; bunu
          Ayarlar bölümünden veya e-posta ile talep edebilirsiniz.
        </p>
        <LegalSubSection title="10.1. Başvuru Yöntemi">
          <p>
            Taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında
            Tebliğ&apos;e uygun olarak info@namazgo.com adresine (hesabınıza
            kayıtlı e-posta adresinizden) iletebilirsiniz. Başvurularınız,
            KVKK m.13/2 uyarınca talebin niteliğine göre en kısa sürede ve en
            geç otuz gün içinde ücretsiz olarak sonuçlandırılır.
          </p>
          <p>
            Başvurunuzun reddedilmesi, verilen cevabı yetersiz bulmanız veya
            süresinde cevap verilmemesi hâllerinde KVKK m.14 uyarınca Kişisel
            Verileri Koruma Kurulu&apos;na şikâyette bulunma hakkınız saklıdır.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection id="gdpr" title="11. AB'de Bulunan Kullanıcılar (GDPR)">
        <p>
          Avrupa Birliği&apos;nde bulunuyorsanız, Genel Veri Koruma Tüzüğü
          (GDPR) kapsamında yukarıdaki haklara ek olarak; işlemenin
          kısıtlanmasını isteme (m.18), veri taşınabilirliği (m.20), itiraz
          (m.21) ve bulunduğunuz üye devletin denetim makamına şikâyette
          bulunma (m.77) haklarına sahipsiniz. Bu hakları da yukarıdaki
          başvuru kanallarından kullanabilirsiniz.
        </p>
      </LegalSection>

      <LegalSection id="cocuklar" title="12. Çocukların Verileri">
        <p>
          NamazGo, 13 yaşın altındaki çocuklardan bilerek kişisel veri
          toplamaz. Bir çocuğun velisinin/vasisinin bilgisi dışında kişisel
          veri sağladığını fark etmemiz hâlinde ilgili veriler derhâl silinir.
          Bu konuda bilgi sahibiyseniz lütfen info@namazgo.com adresine
          bildirin.
        </p>
      </LegalSection>

      <LegalSection id="degisiklikler" title="13. Metin Değişiklikleri">
        <p>
          Veri işleme faaliyetlerinde değişiklik olması hâlinde bu metin
          güncellenir ve önemli değişikliklerde Uygulama içinde
          bilgilendirilirsiniz. &quot;Son güncelleme&quot; tarihini düzenli
          olarak kontrol etmenizi öneririz.
        </p>
      </LegalSection>

      <LegalSection id="iletisim" title="14. İletişim">
        <p>
          Bu metin ve kişisel verilerinizin işlenmesi hakkındaki her türlü
          soru ve talebiniz için: info@namazgo.com
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
