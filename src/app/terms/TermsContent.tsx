"use client";

import LegalLayout from "@/src/components/legal/LegalLayout";
import {
  LegalSection,
  LegalSubSection,
  LegalList,
} from "@/src/components/legal/LegalSection";

export default function TermsContent() {
  return (
    <LegalLayout title="Kullanım Şartları" lastUpdated="19 Mayıs 2026">
      <LegalSection id="giris" title="1. Genel Hükümler ve Kabul">
        <p>
          İşbu Kullanım Şartları (&quot;Sözleşme&quot;), NamazGo platformunu
          (&quot;Uygulama&quot;, &quot;Platform&quot; veya &quot;Hizmet&quot;)
          kullanmanıza ilişkin koşulları düzenler. NamazGo; namaz öğrenme,
          ibadet takibi ve oyunlaştırılmış dini eğitim hizmeti sunan bir dijital
          platformdur.
        </p>
        <p>
          Uygulamaya kayıt olarak, hesap oluşturarak veya Hizmeti herhangi bir
          şekilde kullanarak işbu Sözleşme&apos;nin tüm hükümlerini okuduğunuzu,
          anladığınızı ve kabul ettiğinizi beyan ve taahhüt edersiniz. Bu
          şartları kabul etmiyorsanız, Uygulamayı kullanmamanız gerekmektedir.
        </p>
        <p>
          NamazGo, işbu Sözleşme&apos;yi önceden bildirimde bulunmaksızın
          güncelleme hakkını saklı tutar. Güncellenmiş şartlar Uygulama
          üzerinden yayımlandığı anda yürürlüğe girer. Uygulamayı kullanmaya
          devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.
        </p>
      </LegalSection>

      <LegalSection id="tanimlar" title="2. Tanımlar">
        <LegalList
          items={[
            '"Kullanıcı": NamazGo platformuna kayıt olan ve/veya Hizmeti kullanan gerçek kişi.',
            '"Hesap": Kullanıcının platforma erişim sağladığı, kişisel bilgilerinin ve uygulama verilerinin barındırıldığı dijital kimlik.',
            '"İçerik": Uygulama içerisinde sunulan namaz rehberleri, eğitim materyalleri, avatar öğeleri, görseller ve tüm dijital varlıklar.',
            '"Dijital Ürün": Uygulama içi satın alıma konu olan avatar aksesuarları, streak freeze hakları ve benzeri sanal ürünler.',
            '"Streak": Kullanıcının kesintisiz namaz takip serisini ifade eden oyunlaştırma mekanizması.',
            '"Avatar": Kullanıcının profil görünümünü temsil eden, özelleştirilebilir dijital karakter.',
          ]}
        />
      </LegalSection>

      <LegalSection id="hesap" title="3. Hesap Oluşturma ve Yönetimi">
        <LegalSubSection title="3.1. Kayıt Süreci">
          <p>
            NamazGo&apos;yu tam kapsamlı kullanabilmek için bir hesap
            oluşturmanız gerekmektedir. Kayıt sırasında ad, soyad, kullanıcı
            adı, e-posta adresi ve şifre gibi bilgiler talep edilir.
            Sağladığınız tüm bilgilerin doğru, güncel ve eksiksiz olduğunu
            taahhüt edersiniz.
          </p>
        </LegalSubSection>

        <LegalSubSection title="3.2. OTP Doğrulama">
          <p>
            Hesabınızı aktifleştirmek için tek kullanımlık doğrulama kodu (OTP)
            ile kimlik doğrulaması yapmanız gerekir. Doğrulama kodları SMS,
            WhatsApp veya e-posta kanallarından biri aracılığıyla iletilir.
            Doğrulama işlemini tamamlamadan hesabınız aktifleştirilmez ve
            Platform&apos;un korunan özelliklerine erişim sağlayamazsınız.
          </p>
        </LegalSubSection>

        <LegalSubSection title="3.3. Hesap Güvenliği">
          <p>
            Hesabınızın güvenliğinden münhasıran siz sorumlusunuz. Şifrenizi
            üçüncü kişilerle paylaşmamanız, güçlü bir şifre seçmeniz ve
            hesabınızda yetkisiz bir erişim tespit ettiğinizde derhal NamazGo
            ekibine bildirmeniz gerekmektedir. Hesabınız üzerinden
            gerçekleştirilen tüm işlemlerden siz sorumlu tutulursunuz.
          </p>
        </LegalSubSection>

        <LegalSubSection title="3.4. Hesap Silme">
          <p>
            Hesabınızı dilediğiniz zaman Ayarlar bölümündeki &quot;Hesabımı
            Sil&quot; seçeneğini kullanarak kapatabilirsiniz. Hesap silme işlemi
            geri alınamaz. Hesabınız silindiğinde tüm kişisel verileriniz,
            streak geçmişiniz, puan ve lig bilgileriniz, avatar
            özelleştirmeleriniz ve satın aldığınız dijital ürünler kalıcı olarak
            kaldırılır. Yasal zorunluluklar kapsamında saklanması gereken
            veriler hariç olmak üzere, verileriniz silme talebinden itibaren en
            geç 30 (otuz) gün içinde sistemlerimizden tamamen silinir.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection id="hizmet" title="4. Hizmet Kapsamı ve Kullanım">
        <LegalSubSection title="4.1. Namaz Öğrenme ve Rehberler">
          <p>
            NamazGo, abdest, gusül abdesti, beş vakit namaz ve cuma namazı dahil
            olmak üzere ibadetlerin adım adım öğrenilmesini sağlayan interaktif
            rehberler sunar. Bu rehberler dini fetva niteliği taşımaz; eğitim ve
            bilgilendirme amaçlıdır. Dini konularda kesin hüküm için ehil
            kişilere başvurmanız tavsiye edilir.
          </p>
        </LegalSubSection>

        <LegalSubSection title="4.2. Streak (Seri) Sistemi">
          <p>
            Namaz streak sistemi, kullanıcıların günlük ibadet alışkanlıklarını
            takip etmelerini sağlayan bir oyunlaştırma mekanizmasıdır. Streak
            serisi; günlük namaz kayıtlarının düzenli tutulmasıyla artar, kayıt
            yapılmayan günlerde sıfırlanabilir. Streak freeze hakkı satın alarak
            belirli koşullarda serinizin korunmasını sağlayabilirsiniz. Streak
            verileri tamamen platform içi istatistiksel amaçlıdır ve dini bir
            değerlendirme ya da yargı içermez.
          </p>
        </LegalSubSection>

        <LegalSubSection title="4.3. Görevler ve Görev Takibi">
          <p>
            Platform, kullanıcılara günlük ve haftalık görevler atayabilir. Bu
            görevler; namaz takibi, öğrenme modüllerinin tamamlanması ve sosyal
            etkileşim gibi aktiviteleri kapsar. Görevlerin tamamlanması puan ve
            deneyim puanı (XP) kazandırabilir. NamazGo, görev içeriklerini ve
            ödül mekanizmalarını dilediği zaman değiştirme hakkını saklı tutar.
          </p>
        </LegalSubSection>

        <LegalSubSection title="4.4. Puan, Lig ve Liderlik Tablosu">
          <p>
            Kullanıcılar, uygulama içi aktiviteleri aracılığıyla puan ve XP
            kazanır. Kazanılan puanlar, kullanıcıların liglere yerleştirilmesi
            ve liderlik tablosunda (leaderboard) sıralanması için kullanılır.
            Liderlik tablosu verileri diğer kullanıcılar tarafından
            görüntülenebilir. NamazGo, puan hesaplama yöntemlerini, lig yapısını
            ve sıralama algoritmalarını tek taraflı olarak güncelleme hakkını
            saklı tutar.
          </p>
        </LegalSubSection>

        <LegalSubSection title="4.5. Bildirim Sistemi">
          <p>
            NamazGo, size push bildirim, e-posta, SMS ve WhatsApp kanalları
            üzerinden bildirim gönderebilir. Bildirimler; namaz vakti
            hatırlatmaları, streak uyarıları, görev güncellemeleri, sosyal
            etkileşim bildirimleri ve Platform duyurularını içerebilir. Bildirim
            tercihlerinizi Ayarlar bölümünden dilediğiniz zaman yönetebilir,
            belirli kanalları kapatabilir veya tamamen devre dışı
            bırakabilirsiniz.
          </p>
        </LegalSubSection>

        <LegalSubSection title="4.6. Sosyal Özellikler">
          <p>
            Platform; arkadaş ekleme, kullanıcı arama, davet gönderme ve takip
            etme gibi sosyal etkileşim özellikleri sunar. Profilinizde kullanıcı
            adınız, avatarınız ve belirli istatistikleriniz diğer kullanıcılar
            tarafından görüntülenebilir. Sosyal özellikleri kullanırken diğer
            kullanıcılara karşı saygılı davranmanız, taciz, spam veya rahatsız
            edici içerik paylaşmamanız gerekmektedir. NamazGo, uygunsuz davranış
            sergileyen kullanıcıların hesaplarını uyarı vermeksizin askıya alma
            veya kalıcı olarak kapatma hakkını saklı tutar.
          </p>
        </LegalSubSection>

        <LegalSubSection title="4.7. Avatar Sistemi">
          <p>
            NamazGo, kullanıcıların kişisel profil görünümlerini temsil eden
            özelleştirilebilir bir avatar sistemi sunar. Avatar sistemi
            kapsamında; avatar oluşturma ve düzenleme, iris, saç, ten, dudak,
            kıyafet ve arka plan gibi renk özelleştirmeleri ile aksesuar ekleme
            (güneş gözlüğü, takke vb.) işlemleri yapılabilir. Belirli avatar
            aksesuarları ücretsiz sunulurken, bazıları uygulama içi satın alma
            yoluyla edinilebilir. Satın alınan aksesuarlar hesabınıza tanımlıdır
            ve başka kullanıcılara devredilemez.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection id="odeme" title="5. Ödeme, Abonelik ve Dijital Ürünler">
        <LegalSubSection title="5.1. Abonelik Sistemi">
          <p>
            NamazGo, belirli premium özelliklere erişim sağlayan abonelik
            planları sunabilir. Abonelik koşulları, ücretlendirme ve kapsam
            bilgisi satın alma sırasında açıkça belirtilir. Abonelikler, iptal
            edilmediği sürece otomatik olarak yenilenir. Aboneliğinizi yenileme
            tarihinden önce iptal etmeniz halinde, mevcut dönemin sonuna kadar
            premium erişiminiz devam eder.
          </p>
        </LegalSubSection>

        <LegalSubSection title="5.2. Uygulama İçi Satın Alımlar">
          <p>
            Platform üzerinden avatar aksesuarları (güneş gözlüğü, takke, özel
            kıyafetler vb.) ve streak freeze hakları gibi dijital ürünler satın
            alınabilir. Tüm satın alımlar, ilgili uygulama mağazasının (Apple
            App Store, Google Play Store) veya NamazGo&apos;nun kendi ödeme
            altyapısının koşullarına tabidir.
          </p>
        </LegalSubSection>

        <LegalSubSection title="5.3. İade Politikası">
          <p>
            Dijital ürünler, doğaları gereği teslim edildiği anda tüketilmiş
            sayılır. Bu nedenle, satın alınan dijital ürünler (avatar
            aksesuarları, streak freeze hakları vb.) için iade yapılmaz. Ancak
            teknik bir hata nedeniyle ürünün hesabınıza tanımlanmaması veya
            satın alma işleminin mükerrer gerçekleşmesi gibi durumlarda destek
            ekibimize başvurabilirsiniz. Abonelik iadelerinde, ilgili uygulama
            mağazasının iade politikaları geçerlidir.
          </p>
        </LegalSubSection>

        <LegalSubSection title="5.4. Fiyat Değişiklikleri">
          <p>
            NamazGo, abonelik ücretlerini ve dijital ürün fiyatlarını değiştirme
            hakkını saklı tutar. Fiyat değişiklikleri mevcut abonelik dönemini
            etkilemez; bir sonraki yenileme döneminden itibaren geçerli olur.
            Önemli fiyat değişikliklerinde kullanıcılar önceden bilgilendirilir.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection id="fikri-mulkiyet" title="6. Fikri Mülkiyet Hakları">
        <p>
          NamazGo platformundaki tüm içerik, tasarım, kaynak kodu, görseller,
          ikonlar, avatar tasarımları, karakter çizimleri, animasyonlar, eğitim
          materyalleri ve diğer dijital varlıklar NamazGo&apos;nun veya lisans
          verenlerinin fikri mülkiyetidir. Bu materyallerin NamazGo&apos;nun
          yazılı izni olmaksızın kopyalanması, dağıtılması, değiştirilmesi veya
          ticari amaçla kullanılması yasaktır.
        </p>
        <p>
          Kullanıcılar, Platform&apos;u kullanarak oluşturdukları avatar
          konfigürasyonları üzerinde kişisel kullanım hakkına sahiptir; ancak
          avatar bileşenlerinin (görseller, renkler, aksesuarlar) fikri
          mülkiyeti NamazGo&apos;ya aittir.
        </p>
      </LegalSection>

      <LegalSection
        id="yukumlulukler"
        title="7. Kullanıcı Yükümlülükleri ve Yasaklar"
      >
        <p>Platform&apos;u kullanırken aşağıdaki davranışlar yasaktır:</p>
        <LegalList
          items={[
            "Sahte veya yanıltıcı bilgilerle hesap oluşturmak.",
            "Başka bir kişinin kimliğine bürünerek hesap açmak veya hesabını kullanmak.",
            "Platform'un güvenlik önlemlerini atlatmaya, manipüle etmeye veya devre dışı bırakmaya çalışmak.",
            "Puan, streak veya liderlik tablosu verilerini hile, otomasyon araçları (bot) veya diğer usulsüz yöntemlerle manipüle etmek.",
            "Diğer kullanıcılara yönelik taciz, hakaret, tehdit veya spam içerikli mesajlar göndermek.",
            "Platform üzerinden dini, siyasi veya ticari propaganda yapmak.",
            "Uygulamanın kaynak kodunu tersine mühendislik (reverse engineering) ile çözümlemeye çalışmak.",
            "Platform API'larını yetkisiz şekilde kullanmak veya otomatik veri toplama araçları çalıştırmak.",
            "Uygulamayı yasa dışı amaçlarla kullanmak.",
          ]}
        />
        <p>
          NamazGo, bu yükümlülüklerin ihlali halinde kullanıcı hesabını geçici
          veya kalıcı olarak askıya alma, dijital varlıklarını iptal etme ve
          gerekli hallerde yasal işlem başlatma hakkını saklı tutar.
        </p>
      </LegalSection>

      <LegalSection id="sorumluluk" title="8. Sorumluluk Sınırlandırması">
        <LegalSubSection title="8.1. Hizmet Kesintileri">
          <p>
            NamazGo, platformun kesintisiz ve hatasız çalışacağını garanti
            etmez. Bakım, güncelleme, teknik arıza, altyapı sağlayıcı kaynaklı
            sorunlar veya mücbir sebep halleri nedeniyle hizmette geçici
            kesintiler yaşanabilir. Bu kesintiler nedeniyle oluşabilecek streak
            kayıpları, puan kayıpları veya diğer veri kayıplarından NamazGo
            sorumlu tutulamaz.
          </p>
        </LegalSubSection>

        <LegalSubSection title="8.2. Veri Kaybı">
          <p>
            NamazGo, kullanıcı verilerinin güvenliğini sağlamak için endüstri
            standartlarında önlemler alır; ancak hiçbir sistemin mutlak
            güvenliği garanti edilemez. Teknik arıza, siber saldırı veya mücbir
            sebepler nedeniyle yaşanabilecek veri kayıplarından NamazGo&apos;nun
            sorumluluğu, ilgili mevzuatın izin verdiği azami ölçüde
            sınırlandırılmıştır.
          </p>
        </LegalSubSection>

        <LegalSubSection title="8.3. Kullanıcı Davranışları">
          <p>
            NamazGo, kullanıcıların birbirleriyle olan etkileşimlerinden, sosyal
            özellikler aracılığıyla paylaştıkları içeriklerden veya Platform
            dışında gerçekleştirdikleri eylemlerden sorumlu değildir. Her
            kullanıcı, kendi hesabı üzerinden gerçekleştirdiği tüm işlemlerden
            bireysel olarak sorumludur.
          </p>
        </LegalSubSection>

        <LegalSubSection title="8.4. Dini İçerik Sorumluluğu">
          <p>
            NamazGo&apos;da sunulan namaz rehberleri ve dini eğitim materyalleri
            bilgilendirme amaçlıdır. Bu içerikler fetva ya da bağlayıcı dini
            hüküm niteliği taşımaz. Kullanıcılar, dini konularda kesin bilgi
            için ehil alimlere başvurmalıdır. NamazGo, dini içeriklerden doğan
            yorum farklılıkları veya uygulamalar nedeniyle sorumluluk kabul
            etmez.
          </p>
        </LegalSubSection>
      </LegalSection>

      <LegalSection
        id="degisiklikler"
        title="9. Hizmet Değişiklikleri ve Fesih"
      >
        <p>
          NamazGo, platformun herhangi bir özelliğini, hizmetini veya içeriğini
          önceden bildirimde bulunarak veya bulunmaksızın değiştirme, askıya
          alma veya sonlandırma hakkını saklı tutar. Özellikle puan sistemi, lig
          yapısı, görev mekanizması, mağaza içerikleri ve bildirim sistemi gibi
          oyunlaştırma öğeleri sürekli geliştirme kapsamında değişikliğe
          açıktır.
        </p>
        <p>
          NamazGo, işbu Sözleşme&apos;yi ihlal eden kullanıcıların hesaplarını
          geçici veya kalıcı olarak askıya almaya ya da tamamen sonlandırmaya
          yetkilidir. Hesap feshi durumunda kullanılmamış dijital ürünler için
          iade yapılmaz.
        </p>
      </LegalSection>

      <LegalSection
        id="hukuk"
        title="10. Uygulanacak Hukuk ve Uyuşmazlık Çözümü"
      >
        <p>
          İşbu Sözleşme, Türkiye Cumhuriyeti hukukuna tabidir ve bu hukuka göre
          yorumlanır. Sözleşme&apos;den doğabilecek her türlü uyuşmazlıkta
          İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
        </p>
        <p>
          Kullanıcılar, uyuşmazlık durumunda öncelikle NamazGo destek kanalları
          aracılığıyla iletişime geçerek sorunu çözmeye çalışmayı kabul eder.
        </p>
      </LegalSection>

      <LegalSection id="iletisim" title="11. İletişim">
        <p>
          Kullanım Şartları hakkında soru, görüş veya talepleriniz için
          aşağıdaki kanallardan bize ulaşabilirsiniz:
        </p>
        <LegalList
          items={[
            "E-posta: info@namazgo.com",
            "Uygulama içi: Ayarlar → Yardım Merkezi",
          ]}
        />
      </LegalSection>
    </LegalLayout>
  );
}
