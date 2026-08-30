"use client";

import Link from "next/link";
import LegalLayout from "@/src/components/legal/LegalLayout";
import type { LegalDocumentMeta } from "@/src/types/legal.types";
import { LegalSection, LegalList } from "@/src/components/legal/LegalSection";

export default function ExplicitConsentContent({
  version,
  effectiveDate,
}: LegalDocumentMeta) {
  return (
    <LegalLayout
      title="Özel Nitelikli Kişisel Verilerin İşlenmesine İlişkin Açık Rıza Metni"
      version={version}
      effectiveDate={effectiveDate}
    >
      <LegalSection id="kapsam" title="1. Rızanın Konusu">
        <p>
          NamazGo, temel işlevi gereği ibadet takibi sunan bir uygulamadır. Bu
          nedenle aşağıdaki verileriniz, 6698 sayılı KVKK&apos;nın 6. maddesi
          kapsamında dini inanca ilişkin <strong>özel nitelikli kişisel
          veri</strong> niteliğindedir ve yalnızca bu metinle vereceğiniz açık
          rızaya dayanılarak işlenir:
        </p>
        <LegalList
          items={[
            "Mezhep tercihiniz (Hanefî/Şâfiî)",
            "Namaz/ibadet tamamlama kayıtlarınız (hangi vakti, hangi tarihte, vaktinde veya geç işaretlediğiniz)",
            "Namaz sonrası quiz yanıtlarınız ve sonuçları",
            "Bu kayıtlardan türetilen seri (streak), XP/seviye ve ibadet istatistikleriniz",
          ]}
        />
      </LegalSection>

      <LegalSection id="amac" title="2. İşleme Amaçları">
        <LegalList
          items={[
            "İbadet rehberi içeriğinin (rekât sayıları, adım adım anlatımlar) mezhep tercihinize göre gösterilmesi",
            "İbadetlerinizin takibi ve size ibadet geçmişinizin/istatistiklerinizin gösterilmesi",
            "Oyunlaştırma özelliklerinin (seri, XP, seviye, quiz) çalıştırılması",
            "İbadet istatistiklerinizin (seri, XP, namaz sayısı — ibadet kayıtlarınızın detayı değil) liderlik tablosunda ve profil sayfanızda diğer kullanıcılara gösterilmesi",
          ]}
        />
        <p>
          Mezhep tercihiniz hiçbir zaman diğer kullanıcılara veya üçüncü
          taraflara açıklanmaz. Bu veriler pazarlama veya profilleme amacıyla
          kullanılmaz ve yurt dışına aktarılmaz. Tek istisnası, aşağıdaki 3.
          bölümde açıklanan ve tamamen isteğe bağlı olan bildirim
          özelliğidir.
        </p>
      </LegalSection>

      <LegalSection
        id="bildirimler"
        title="3. Bildirimler — Ayrı ve İsteğe Bağlı Rıza"
      >
        <p>
          Namaz vakti ve işaretleme hatırlatması bildirimleri de dinî
          pratiğinize ilişkin olduğu için özel nitelikli veri işleme sayılır.
          Ancak bu, <strong>bu metinle verdiğiniz rızanın kapsamı dışındadır</strong>{" "}
          ve uygulamanın temel işlevi için zorunlu değildir:
        </p>
        <LegalList
          items={[
            "Bildirimler varsayılan olarak kapalıdır. Kayıt olurken bildirimlere rıza vermiş olmazsınız.",
            "Her bildirim başlığı için ayrı ayrı rıza verirsiniz; yalnızca istediklerinizi açabilirsiniz.",
            "Rızanızı Ayarlar › Bildirimler bölümünden tek tıkla geri çekebilirsiniz. Geri çekmek hesabınızı etkilemez, hiçbir veri silinmez ve gönderim derhâl durur.",
            "Bildirim açtığınızda, bildirim iletisi tarayıcınızın bildirim sağlayıcısına (Google, Mozilla veya Apple) iletilir; bu sağlayıcıların sunucuları yurt dışındadır. İletinin içeriği RFC 8291 uyarınca uçtan uca şifrelenir, sağlayıcı içeriği okuyamaz.",
            "Bildirimleri hiç açmazsanız bu aktarım hiç gerçekleşmez.",
          ]}
        />
      </LegalSection>

      <LegalSection id="rizanin-niteligi" title="4. Rızanın Niteliği ve Geri Çekme">
        <p>
          Bu verilerin işlenmesi, uygulamanın temel işlevinin (ibadet takibi)
          sunulabilmesi için zorunludur; bu verileri işlemeden NamazGo
          hizmetini sunmak mümkün değildir. Açık rıza vermek istemiyorsanız
          kayıt işlemi tamamlanmaz ve hakkınızda hiçbir özel nitelikli veri
          işlenmez.
        </p>
        <p>
          Rızanızı dilediğiniz zaman geri çekebilirsiniz. Geri çekme hâlinde
          bu verilerin işlenmesine devam edilemeyeceğinden hesabınız ve tüm
          ibadet kayıtlarınız silinir. Bunun için hesabınızı Ayarlar
          bölümünden silebilir veya info@namazgo.com adresine e-posta
          gönderebilirsiniz. Geri çekme, geri çekme anına kadar yapılmış
          işlemenin hukuka uygunluğunu etkilemez.
        </p>
        <p>
          Bu verilerin kim tarafından, nasıl işlendiğine ilişkin ayrıntılı
          bilgilendirme için{" "}
          <Link
            href="/privacy"
            className="text-[var(--ng-green)] underline hover:text-[var(--ng-sky)] transition-colors"
          >
            Aydınlatma Metni
          </Link>
          &apos;ni inceleyebilirsiniz.
        </p>
      </LegalSection>

      <LegalSection id="beyan" title="5. Rıza Beyanı">
        <p>
          Kayıt ekranındaki &quot;Açık Rıza Metni&apos;nde açıklanan özel
          nitelikli kişisel verilerimin (mezhep tercihim ve ibadet kayıtlarım)
          belirtilen amaçlarla işlenmesine açık rıza veriyorum.&quot;
          kutusunu işaretlemeniz hâlinde, yukarıda kapsamı, amaçları ve
          sonuçları açıklanan işleme faaliyetine özgür iradenizle,
          bilgilendirilmiş olarak ve belirli bir konuya ilişkin açık rıza
          vermiş olursunuz.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
