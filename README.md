# Shopping List

Bu projede günlük hayatta pratik şekilde kullanılabilecek bir alışveriş listesi uygulaması geliştirdim. Amaç, kullanıcıların listeyi hızlıca yönetebilmesini ve sayfa yenilense bile verilerin kaybolmamasını sağlamaktı. Basit bir arayüzle, temel ama öğretici bir front-end akışı kurmaya odaklandım.

## Özellikler

- Listeye yeni eleman ekleme  
- Elemanları tek tek silme ve tüm listeyi tek seferde temizleme  
- Elemanları “tamamlandı / tamamlanmadı” olarak işaretleme  
- Duruma göre filtreleme:
  - **All**: tüm elemanlar
  - **Incomplete**: tamamlanmamış elemanlar
  - **Completed**: tamamlanmış elemanlar
- localStorage kullanarak verilerin tarayıcıda kalıcı olarak saklanması  
- Tamamlanmamış elemanları tıklayıp **inline olarak düzenleme**
  - Enter’a basınca kaydetme
  - Odak kaybolduğunda (blur) düzenlemeyi bitirme
- Liste durumuna göre uyarı, filtre alanı ve butonların dinamik olarak gösterilip gizlenmesi  

## Bu projede neler öğrendim?

- DOM üzerinde eleman seçme, oluşturma ve güncelleme işlemlerini daha bilinçli yapmayı  
- Farklı event türlerini birlikte kullanmayı (`submit`, `click`, `change`, `blur`, `keydown`)  
- localStorage ile basit bir veri kalıcılığı akışı kurmayı ve JSON ile çalışmayı  
- Uygulama durumunu (state) DOM attribute’ları üzerinden yönetmeyi  
- `data-attributes` kullanarak filtreleme mantığını daha temiz hale getirmeyi  
- Silme işlemleri için event delegation yaklaşımını kullanmayı  
- Bootstrap class’larını JavaScript üzerinden dinamik olarak kontrol etmeyi  
- CSS tarafında hover, transition ve attribute selector kullanarak küçük ama etkili etkileşimler eklemeyi  

## Kurulum / Çalıştırma

Projeyi çalıştırmak için ekstra bir kurulum gerekmiyor. Dosyaları indirdikten sonra `index.html` dosyasını tarayıcıda açmak yeterli. Geliştirme sırasında daha rahat test edebilmek için Live Server kullanmayı tercih ettim.

## Kod Yapısı (Kısaca)

- **loadItems**: Sayfa açıldığında localStorage’daki verileri alıp listeyi oluşturuyor.  
- **saveToLS**: Mevcut listeyi okuyup localStorage’a kaydediyor.  
- **createListItem**: Her bir liste elemanı için checkbox, metin alanı ve silme ikonunu oluşturuyor.  
- **filterItems**: Seçilen filtreye göre elemanları görünür veya gizli hale getiriyor.  
- **updatePage**: Liste boş ya da dolu olma durumuna göre uyarıları, filtreleri ve butonları güncelliyor.  

## Geliştirme Notları

- Tüm localStorage’ı temizlemek yerine sadece ilgili key’i silmek daha doğru bir yaklaşım olur.  
- Event delegation’ı projeye daha erken dahil ederek kodu biraz daha sadeleştirebilirim.  
- Boş input kontrolünde tarayıcı alert’i yerine arayüz içinde bir validasyon mesajı göstermek daha iyi bir deneyim sağlar.  
- Kod büyüdükçe fonksiyonları daha modüler dosyalara ayırmak okunabilirliği artırabilir.  

## Ekran Görüntüsü / Demo



## Lisans
