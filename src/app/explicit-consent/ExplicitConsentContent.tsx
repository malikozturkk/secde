"use client";

import Link from "next/link";
import LegalLayout from "@/src/components/legal/LegalLayout";
import { LegalSection, LegalList } from "@/src/components/legal/LegalSection";

export default function ExplicitConsentContent() {
  return (
    <LegalLayout
      title="Özel Nitelikli Kişisel Verilerin İşlenmesine İlişkin Açık Rıza Metni"
      lastUpdated="12 Ağustos 2026"
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
            "Namaz vakitlerinin (özellikle ikindi vaktinin) mezhep tercihinize göre hesaplanması",
            "İbadetlerinizin takibi ve size ibadet geçmişinizin/istatistiklerinizin gösterilmesi",
            "Oyunlaştırma özelliklerinin (seri, XP, seviye, quiz) çalıştırılması",
            "İbadet istatistiklerinizin (seri, XP, namaz sayısı — ibadet kayıtlarınızın detayı değil) liderlik tablosunda ve profil sayfanızda diğer kullanıcılara gösterilmesi",
          ]}
        />
        <p>
          Mezhep tercihiniz hiçbir zaman diğer kullanıcılara veya üçüncü
          taraflara açıklanmaz. Bu veriler yurt dışına aktarılmaz, pazarlama
          veya profilleme amacıyla kullanılmaz.
        </p>
      </LegalSection>

      <LegalSection id="rizanin-niteligi" title="3. Rızanın Niteliği ve Geri Çekme">
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
            className="text-[#25B49A] underline hover:text-[#4FC3F7] transition-colors"
          >
            Aydınlatma Metni
          </Link>
          &apos;ni inceleyebilirsiniz.
        </p>
      </LegalSection>

      <LegalSection id="beyan" title="4. Rıza Beyanı">
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
