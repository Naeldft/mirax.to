/* Patrôn Studio — accueil : intro, écrans qui changent de métier, inclinaison 3D, langue, thème.
   Tout est facultatif : sans JavaScript la page reste complète et lisible. */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function store(key, value) { try { localStorage.setItem('export:' + key, JSON.stringify(value)); } catch (e) {} }
  function load(key, fallback) { try { var v = JSON.parse(localStorage.getItem('export:' + key) || 'null'); return v == null ? fallback : v; } catch (e) { return fallback; } }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- 1. Intro : une fois par session, accueil seulement ---------- */
  function intro() {
    var seen = false;
    try { seen = sessionStorage.getItem('ps-intro') === '1'; sessionStorage.setItem('ps-intro', '1'); } catch (e) { seen = true; }
    if (seen || reduce.matches || location.hash) return;
    var o = document.createElement('div');
    o.className = 'intro';
    var word = 'Patrôn Studio';
    var html = '';
    for (var i = 0; i < word.length; i++) {
      var c = word[i];
      var cls = c === ' ' ? 'sp' : (c === 'ô' ? 'o' : (i > 6 ? 'light' : ''));
      html += '<span class="' + cls + '" style="animation-delay:' + (120 + i * 55) + 'ms">' + (c === ' ' ? '&nbsp;' : c) + '</span>';
    }
    o.innerHTML = '<div class="intro-half l"></div><div class="intro-half r"></div>' +
      '<p class="intro-word" aria-hidden="true">' + html + '</p>' +
      '<button type="button" class="intro-skip">' + t('skipIntro') + '</button>';
    document.body.insertBefore(o, document.body.firstChild);
    root.classList.add('intro-lock');
    var done = false, timers = [];
    function finish(fast) {
      if (done) return; done = true;
      timers.forEach(clearTimeout);
      o.classList.add('is-open');
      root.classList.remove('intro-lock');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { o.remove(); }, fast ? 450 : 900);
    }
    function onKey(e) { if (e.key === 'Escape') finish(true); }
    document.addEventListener('keydown', onKey);
    o.querySelector('.intro-skip').addEventListener('click', function () { finish(true); });
    timers.push(setTimeout(function () { finish(false); }, 1650));
    // Filet de sécurité : rien ne doit bloquer le site au-delà de 3 s.
    setTimeout(function () { if (document.body.contains(o)) { root.classList.remove('intro-lock'); o.remove(); } }, 3000);
  }

  /* ---------- 2. Traductions ---------- */
  var I18N = {
    en: {futurSnackS:'Snack bar & fast food',futurSnackP:'A 3D burger that stacks up layer by layer, and takeaway ordering.',futurConseilS:'Consulting',futurConseilP:'A 3D compass and growth curve, and an express business check-up.',futurCoifS:'Hair & beauty',futurCoifP:'Chrome scissors in 3D that snip locks of hair as you scroll.',futurBoulS:'Bakery & pastry',futurBoulP:'A loaf that rises and bakes before your eyes, with flour falling.',futurCoachS:'Personal trainer',futurCoachP:'A 3D kettlebell swinging to the beat of a heart.',futurBoutS:'Shop & retail',futurBoutP:'A linen shirt floating in the wind, and a real shopping cart.',futurPhotoS:'Photographer',futurPhotoP:'A 3D camera: zoom, shutter and flash as you scroll.',futurAssoS:'Non-profit',futurAssoP:'A tree that grows as you scroll, one leaf per member.',futurNote:'Fictional businesses, demo websites made by Patrôn Studio.',futurWrite:'Write to us',futurOtherP:'More demos are coming. Write to us: we will imagine yours.',futurOtherT:'Your sector is not listed?',futurOtherS:'Other trade',futurBtpP:'A house built floor by floor as you scroll.',futurBtpS:'Construction',futurAutoP:'A car spinning in 3D: choose the model and the colour.',futurAutoS:'Car rental',futurPlombP:'Copper pipes that assemble as you scroll, and running water.',futurPlombS:'Plumbing',futurRestoP:'Wood-fired pizzeria: a 3D pizza that changes its toppings.',futurRestoS:'Restaurants',futurSee:'View the demo',futurQ:'What is your sector?',futurLead:'Pick your sector: you visit a real demo website, in 3D and motion, designed for your trade. Yours can look like it.',futurB:'before you even order it.',futurA:'Your website,',futurKicker:'01 / Discover your future website',skip:'Skip to content',navMockup:'Your future website',navOffers:'Pricing',navExamples:'Examples',navStudio:'The studio',navContact:'Contact us',ctaStart:'Discover your future website',lang:'Language',theme:'Change theme',
      kicker:'Independent web studio · Lille',h1a:'Your trade.',h1b:'Your website.',lead:'Bakers, hairdressers, tradespeople, coaches, shops, non-profits, freelancers: Patrôn Studio builds showcase websites and online shops for every kind of business, all over France.',
      ctaFree:'Discover your future website',seeOffers:'Websites from €80',proof1:'Free quote',proof2:'No commitment',proof3:'Mobile and desktop',fictional:'Fictional example',pause:'Pause',play:'Play',pick:'Pick a trade',bandLabel:'Some of the trades we work with',
      band:['Bakers','Hairdressers','Tradespeople','Coaches','Shops','Restaurants','Non-profits','Freelancers','Photographers','Plumbers','Florists','Therapists'],
      whatKicker:'02 / What we build',whatA:'A clear website,',whatB:'for every kind of business.',whatLead:'Shopkeeper, craftsperson, restaurant, hairdresser, coach, non-profit or small company: we start from your trade and your customers, not from a ready-made template.',
      c1t:'Showcase website',c1p:'Present your business, services and opening hours, and make it easy to get in touch.',c2t:'Online shop',c2p:'Sell your products online with a simple checkout. Quote on request.',c3t:'Redesign and care',c3p:'Refresh an existing website, then keep it updated, hosted and maintained every month.',more:'Learn more',
      stepsKicker:'03 / How it works',stepsA:'You know where you are going',stepsB:'before you decide.',s1t:'You tell us',s1p:'Your trade, your customers, what you want to show. A few minutes are enough.',s2t:'We show you',s2p:'Demo websites for your trade, then a clear, free quote.',s3t:'We go live',s3p:'Your website is published, mobile-friendly, with SEO basics.',
      priceKicker:'04 / Pricing',priceA:'A clear price.',priceB:'No surprises.',priceLead:'The showcase website is a one-off payment. The optional, no-commitment Patrôn subscription takes care of everything else.',
      o1tag:'Showcase website',o1t:'The build',once:'one-off payment',o1a:'A polished website that looks like you',o1b:'Works on mobile and desktop',o1c:'Contact form and SEO basics',o1cta:'Request a quote',
      o2tag:'Patrôn subscription · Essential',recommended:'Recommended',o2t:'We handle everything',month:'per month',subA:'Hosting and domain name',subB:'Maintenance and updates',o2c:'Up to 2 changes included per month',o2cta:'Choose Essential',
      o3tag:'Patrôn subscription · Complete',o3t:'For frequent updates',o3c:'Up to 3 changes included per month',o3cta:'Choose Complete',
      p1:'Free quote',p2:'No commitment',p3:'Demos to explore before you decide',fine:'Online shops, booking systems and specific content: quote on request. Cancel the subscription at any time.',
      faqKicker:'05 / Your questions',faqA:'A question',faqB:'before you start?',ask:'Write to the studio',
      q1:'What does the €80 showcase website include?',a1:'A polished website for mobile and desktop, presenting your business, with a way to contact you and SEO basics. It is paid once.',
      q2:'What is the Patrôn subscription for?',a2:'It covers hosting, the domain name and maintenance. The €30 plan includes up to 2 changes per month, the €40 plan up to 3.',
      q3:'Am I locked in?',a3:'No. The subscription has no commitment and the quote is free: you decide with full knowledge.',
      q4:'My trade is a bit unusual, is that OK?',a4:'Yes. We work with every kind of business. Online shops, booking systems and specific content are quoted before any agreement.',
      closeKicker:'The best start is your trade',closeA:'Shall we give it',closeB:'a great website?',footA:'Websites for every trade.',footB:'Independent studio in Lille, open to your ideas.',
      fImagine:'Imagine',fMockup:'Your future website',fInspi:'Inspiration',fTools:'Free tools',fBrief:'Detailed brief',fBuild:'Build',fOffers:'Pricing',fPartner:'Become a partner',fRes:'Resources',fExplore:'Explore',fResto:'Restaurants in Lille',fHair:'Hairdressers in Lille',fCraft:'Tradespeople in Lille',fAll:'All trades in Lille',fLegal:'Legal notice',fPrivacy:'Privacy',fTerms:'Terms',skipIntro:'Skip',
      trades:{boulangerie:'Bakery',coiffeur:'Hairdresser',plombier:'Plumber',coach:'Fitness coach',boutique:'Shop',restaurant:'Restaurant',association:'Non-profit',photographe:'Photographer'}},
    es: {futurSnackS:'Snack y comida rápida',futurSnackP:'Una hamburguesa en 3D que se monta capa a capa, y el pedido para llevar.',futurConseilS:'Consultoría',futurConseilP:'Una brújula y una curva de crecimiento en 3D, y un diagnóstico exprés.',futurCoifS:'Peluquería y belleza',futurCoifP:'Unas tijeras cromadas en 3D que cortan mechones al desplazarte.',futurBoulS:'Panadería y pastelería',futurBoulP:'Un pan que sube y se dora ante tus ojos, con la harina cayendo.',futurCoachS:'Entrenador personal',futurCoachP:'Una pesa rusa en 3D que se balancea al ritmo del corazón.',futurBoutS:'Tienda y comercio',futurBoutP:'Una camisa de lino que flota al viento, y un carrito de compra real.',futurPhotoS:'Fotógrafo',futurPhotoP:'Una cámara en 3D: zoom, disparo y flash al desplazarte.',futurAssoS:'Asociación',futurAssoP:'Un árbol que crece al desplazarte, una hoja por socio.',futurNote:'Empresas ficticias, sitios de demostración realizados por Patrôn Studio.',futurWrite:'Escríbenos',futurOtherP:'Llegan más demos. Escríbenos: imaginamos la tuya.',futurOtherT:'¿Tu sector no aparece?',futurOtherS:'Otro oficio',futurBtpP:'Una casa que se construye piso a piso mientras te desplazas.',futurBtpS:'Construcción',futurAutoP:'Un coche que gira en 3D: elige el modelo y el color.',futurAutoS:'Alquiler de coches',futurPlombP:'Tuberías de cobre que se montan al desplazarte, y el agua que corre.',futurPlombS:'Fontanería',futurRestoP:'Pizzería de horno de leña: una pizza en 3D que cambia de ingredientes.',futurRestoS:'Restauración',futurSee:'Ver la demo',futurQ:'¿Cuál es tu sector?',futurLead:'Elige tu sector: visitas un sitio de demostración real, en 3D y con animaciones, pensado para tu oficio. El tuyo puede parecerse.',futurB:'antes incluso de encargarlo.',futurA:'Tu sitio,',futurKicker:'01 / Descubre tu futuro sitio',skip:'Ir al contenido',navMockup:'Tu futuro sitio',navOffers:'Tarifas',navExamples:'Ejemplos',navStudio:'El estudio',navContact:'Escríbenos',ctaStart:'Descubre tu futuro sitio',lang:'Idioma',theme:'Cambiar tema',
      kicker:'Estudio web independiente · Lille',h1a:'Tu oficio.',h1b:'Tu web.',lead:'Panaderos, peluqueros, artesanos, entrenadores, tiendas, asociaciones, autónomos: Patrôn Studio crea webs y tiendas online para todo tipo de actividad, en toda Francia.',
      ctaFree:'Descubre tu futuro sitio',seeOffers:'Web desde 80 €',proof1:'Presupuesto gratis',proof2:'Sin compromiso',proof3:'Móvil y ordenador',fictional:'Ejemplo ficticio',pause:'Pausa',play:'Reanudar',pick:'Elegir un oficio',bandLabel:'Algunos oficios con los que trabajamos',
      band:['Panaderos','Peluqueros','Artesanos','Entrenadores','Tiendas','Restaurantes','Asociaciones','Autónomos','Fotógrafos','Fontaneros','Floristas','Terapeutas'],
      whatKicker:'02 / Lo que creamos',whatA:'Una web clara,',whatB:'para cualquier actividad.',whatLead:'Comercio, artesano, restaurante, peluquería, entrenador, asociación o pequeña empresa: partimos de tu oficio y de tus clientes, no de una plantilla.',
      c1t:'Web escaparate',c1p:'Presenta tu actividad, tus servicios y tus horarios, y facilita el contacto.',c2t:'Tienda online',c2p:'Vende tus productos en internet con una compra sencilla. Bajo presupuesto.',c3t:'Rediseño y mantenimiento',c3p:'Moderniza una web existente y mantenla actualizada, alojada y cuidada cada mes.',more:'Saber más',
      stepsKicker:'03 / Cómo funciona',stepsA:'Sabes adónde vas',stepsB:'antes de decidir.',s1t:'Nos cuentas',s1p:'Tu oficio, tus clientes, lo que quieres mostrar. Bastan unos minutos.',s2t:'Te la mostramos',s2p:'Sitios de demostración para tu oficio y luego un presupuesto claro y gratuito.',s3t:'La publicamos',s3p:'Tu web se publica, adaptada al móvil, con las bases del SEO.',
      priceKicker:'04 / Tarifas',priceA:'Un precio claro.',priceB:'Sin sorpresas.',priceLead:'La web escaparate se paga una sola vez. La suscripción Patrôn, opcional y sin compromiso, se encarga del resto.',
      o1tag:'Web escaparate',o1t:'La creación',once:'pago único',o1a:'Una web cuidada, a tu imagen',o1b:'Adaptada a móvil y ordenador',o1c:'Formulario de contacto y bases SEO',o1cta:'Pedir presupuesto',
      o2tag:'Suscripción Patrôn · Esencial',recommended:'Recomendado',o2t:'Nos ocupamos de todo',month:'al mes',subA:'Alojamiento y dominio',subB:'Mantenimiento y actualizaciones',o2c:'Hasta 2 cambios incluidos al mes',o2cta:'Elegir Esencial',
      o3tag:'Suscripción Patrôn · Completa',o3t:'Para cambiar a menudo',o3c:'Hasta 3 cambios incluidos al mes',o3cta:'Elegir Completa',
      p1:'Presupuesto gratis',p2:'Sin compromiso',p3:'Demos para descubrir antes de decidir',fine:'Tiendas online, reservas y contenidos específicos: bajo presupuesto. Suscripción cancelable en cualquier momento.',
      faqKicker:'05 / Tus preguntas',faqA:'¿Una pregunta',faqB:'antes de empezar?',ask:'Escribir al estudio',
      q1:'¿Qué incluye la web escaparate de 80 €?',a1:'Una web cuidada para móvil y ordenador, que presenta tu actividad, con un medio de contacto y las bases del SEO. Se paga una sola vez.',
      q2:'¿Para qué sirve la suscripción Patrôn?',a2:'Incluye alojamiento, dominio y mantenimiento. La fórmula de 30 € al mes incluye hasta 2 cambios al mes; la de 40 €, hasta 3.',
      q3:'¿Hay permanencia?',a3:'No. La suscripción no tiene permanencia y el presupuesto es gratuito: decides con conocimiento de causa.',
      q4:'Mi oficio es particular, ¿es posible?',a4:'Sí. Trabajamos con todo tipo de actividad. Tiendas online, reservas y contenidos específicos se presupuestan antes de cualquier acuerdo.',
      closeKicker:'El mejor comienzo es tu oficio',closeA:'¿Le damos',closeB:'una buena web?',footA:'Webs para todos los oficios.',footB:'Estudio independiente en Lille, abierto a tus ideas.',
      fImagine:'Imaginar',fMockup:'Tu futuro sitio',fInspi:'Inspiración',fTools:'Herramientas gratis',fBrief:'Brief detallado',fBuild:'Construir',fOffers:'Tarifas',fPartner:'Ser socio',fRes:'Recursos',fExplore:'Explorar',fResto:'Restaurantes en Lille',fHair:'Peluquerías en Lille',fCraft:'Artesanos en Lille',fAll:'Todos los oficios en Lille',fLegal:'Aviso legal',fPrivacy:'Privacidad',fTerms:'Condiciones',skipIntro:'Saltar',
      trades:{boulangerie:'Panadería',coiffeur:'Peluquería',plombier:'Fontanero',coach:'Entrenador',boutique:'Tienda',restaurant:'Restaurante',association:'Asociación',photographe:'Fotógrafo'}},
    ar: {futurSnackS:'الوجبات السريعة',futurSnackP:'برغر ثلاثي الأبعاد يُركَّب طبقة بعد طبقة، وطلب للاستلام.',futurConseilS:'الاستشارات',futurConseilP:'بوصلة ومنحنى نمو ثلاثي الأبعاد، وتشخيص سريع.',futurCoifS:'تصفيف الشعر والتجميل',futurCoifP:'مقص كروم ثلاثي الأبعاد يقص خصلات الشعر أثناء التمرير.',futurBoulS:'المخابز والحلويات',futurBoulP:'خبز ينتفخ وينضج أمام عينيك، مع تساقط الطحين.',futurCoachS:'مدرب رياضي',futurCoachP:'كرة حديدية ثلاثية الأبعاد تتأرجح على إيقاع القلب.',futurBoutS:'المتاجر والتجارة',futurBoutP:'قميص كتان يرفرف في الريح، وسلة تسوق حقيقية.',futurPhotoS:'مصور فوتوغرافي',futurPhotoP:'كاميرا ثلاثية الأبعاد: تكبير والتقاط وفلاش أثناء التمرير.',futurAssoS:'جمعية',futurAssoP:'شجرة تنمو أثناء التمرير، ورقة لكل عضو.',futurNote:'شركات خيالية، مواقع تجريبية من إنجاز Patrôn Studio.',futurWrite:'راسلنا',futurOtherP:'المزيد من النماذج قادم. راسلنا: سنتخيل نموذجك.',futurOtherT:'قطاعك غير موجود؟',futurOtherS:'مهنة أخرى',futurBtpP:'منزل يُبنى طابقاً بعد طابق أثناء التمرير.',futurBtpS:'البناء',futurAutoP:'سيارة تدور بتقنية ثلاثية الأبعاد: اختر الطراز واللون.',futurAutoS:'تأجير السيارات',futurPlombP:'أنابيب نحاسية تُركَّب أثناء التمرير، وماء يتدفق.',futurPlombS:'السباكة',futurRestoP:'مطعم بيتزا بفرن الحطب: بيتزا ثلاثية الأبعاد تتغير مكوناتها.',futurRestoS:'المطاعم',futurSee:'شاهد النموذج',futurQ:'ما هو قطاعك؟',futurLead:'اختر قطاعك: ستزور موقعاً تجريبياً حقيقياً، ثلاثي الأبعاد ومتحركاً، مصمماً لمهنتك. يمكن لموقعك أن يشبهه.',futurB:'حتى قبل أن تطلبه.',futurA:'موقعك،',futurKicker:'01 / اكتشف موقعك المستقبلي',skip:'انتقل إلى المحتوى',navMockup:'موقعك المستقبلي',navOffers:'الأسعار',navExamples:'أمثلة',navStudio:'الاستوديو',navContact:'راسلنا',ctaStart:'اكتشف موقعك المستقبلي',lang:'اللغة',theme:'تغيير المظهر',
      kicker:'استوديو ويب مستقل · ليل',h1a:'مهنتك.',h1b:'موقعك.',lead:'خبّازون، حلّاقون، حرفيون، مدرّبون، متاجر، جمعيات، مستقلون: يصمّم Patrôn Studio مواقع تعريفية ومتاجر إلكترونية لكل أنواع النشاط، في كل فرنسا.',
      ctaFree:'اكتشف موقعك المستقبلي',seeOffers:'موقع بدءًا من 80 €',proof1:'عرض سعر مجاني',proof2:'بدون التزام',proof3:'للهاتف والحاسوب',fictional:'مثال وهمي',pause:'إيقاف',play:'تشغيل',pick:'اختر مهنة',bandLabel:'بعض المهن التي نعمل معها',
      band:['خبّازون','حلّاقون','حرفيون','مدرّبون','متاجر','مطاعم','جمعيات','مستقلون','مصوّرون','سبّاكون','بائعو زهور','معالجون'],
      whatKicker:'02 / ما نصنعه',whatA:'موقع واضح،',whatB:'لكل نوع من النشاط.',whatLead:'تاجر، حرفي، مطعم، حلّاق، مدرّب، جمعية أو شركة صغيرة: ننطلق من مهنتك وزبائنك، لا من قالب جاهز.',
      c1t:'موقع تعريفي',c1p:'قدّم نشاطك وخدماتك ومواعيدك، وسهّل التواصل معك.',c2t:'متجر إلكتروني',c2p:'بِع منتجاتك عبر الإنترنت بمسار شراء بسيط. حسب عرض سعر.',c3t:'تجديد ومتابعة',c3p:'حدّث موقعًا قائمًا، ثم حافظ عليه محدّثًا ومستضافًا كل شهر.',more:'اعرف المزيد',
      stepsKicker:'03 / كيف يتم ذلك',stepsA:'تعرف إلى أين تتجه',stepsB:'قبل أن تقرّر.',s1t:'تحكي لنا',s1p:'مهنتك، زبائنك، وما تريد عرضه. تكفي دقائق قليلة.',s2t:'نريك',s2p:'مواقع تجريبية لمهنتك، ثم عرض سعر واضح ومجاني.',s3t:'ننشر',s3p:'يُنشر موقعك متوافقًا مع الهاتف مع أساسيات تحسين الظهور.',
      priceKicker:'04 / الأسعار',priceA:'سعر واضح.',priceB:'بلا مفاجآت.',priceLead:'يُدفع الموقع التعريفي مرة واحدة. اشتراك Patrôn الاختياري وبدون التزام يتكفّل بالباقي.',
      o1tag:'موقع تعريفي',o1t:'الإنشاء',once:'دفعة واحدة',o1a:'موقع أنيق يشبهك',o1b:'متوافق مع الهاتف والحاسوب',o1c:'نموذج تواصل وأساسيات SEO',o1cta:'اطلب عرض سعر',
      o2tag:'اشتراك Patrôn · الأساسي',recommended:'موصى به',o2t:'نتكفّل بكل شيء',month:'شهريًا',subA:'الاستضافة واسم النطاق',subB:'الصيانة والتحديثات',o2c:'حتى تعديلين شهريًا',o2cta:'اختر الأساسي',
      o3tag:'اشتراك Patrôn · الكامل',o3t:'للتحديث المتكرر',o3c:'حتى 3 تعديلات شهريًا',o3cta:'اختر الكامل',
      p1:'عرض سعر مجاني',p2:'بدون التزام',p3:'نماذج تجريبية تكتشفها قبل أن تقرر',fine:'المتاجر الإلكترونية والحجوزات والمحتويات الخاصة: حسب عرض سعر. يمكن إلغاء الاشتراك في أي وقت.',
      faqKicker:'05 / أسئلتكم',faqA:'سؤال',faqB:'قبل أن تبدأ؟',ask:'راسل الاستوديو',
      q1:'ماذا يشمل الموقع التعريفي بـ 80 €؟',a1:'موقع أنيق للهاتف والحاسوب يعرض نشاطك، مع وسيلة تواصل وأساسيات تحسين الظهور. يُدفع مرة واحدة.',
      q2:'ما فائدة اشتراك Patrôn؟',a2:'يشمل الاستضافة واسم النطاق والصيانة. صيغة 30 € شهريًا تشمل حتى تعديلين، وصيغة 40 € حتى 3 تعديلات.',
      q3:'هل أنا ملزم لمدة معيّنة؟',a3:'لا. الاشتراك بدون التزام، وعرض السعر مجاني: تقرر وأنت على دراية كاملة.',
      q4:'مهنتي خاصة قليلًا، هل هذا ممكن؟',a4:'نعم. نعمل مع كل أنواع النشاط. المتاجر والحجوزات والمحتويات الخاصة تُسعَّر قبل أي اتفاق.',
      closeKicker:'أفضل بداية هي مهنتك',closeA:'هل نمنحها',closeB:'موقعًا جميلًا؟',footA:'مواقع لكل المهن.',footB:'استوديو مستقل في ليل، منفتح على أفكارك.',
      fImagine:'تخيّل',fMockup:'موقعك المستقبلي',fInspi:'إلهام',fTools:'أدوات مجانية',fBrief:'الملف المفصّل',fBuild:'بناء',fOffers:'الأسعار',fPartner:'كن شريكًا',fRes:'موارد',fExplore:'استكشف',fResto:'مطاعم في ليل',fHair:'حلّاقون في ليل',fCraft:'حرفيون في ليل',fAll:'كل المهن في ليل',fLegal:'إشعار قانوني',fPrivacy:'الخصوصية',fTerms:'الشروط',skipIntro:'تخطَّ',
      trades:{boulangerie:'مخبزة',coiffeur:'حلّاق',plombier:'سبّاك',coach:'مدرّب رياضي',boutique:'متجر',restaurant:'مطعم',association:'جمعية',photographe:'مصوّر'}}
  };
  var FR = {}; // rempli depuis le HTML (texte d’origine)
  var FR_TRADES = {boulangerie:'Boulangerie',coiffeur:'Coiffeur',plombier:'Plombier',coach:'Coach sportif',boutique:'Boutique',restaurant:'Restaurant',association:'Association',photographe:'Photographe'};
  var locale = 'fr';
  function t(key) { var d = I18N[locale]; return (d && d[key] != null) ? d[key] : (FR[key] != null ? FR[key] : ({skipIntro:'Passer', pause:'Pause', play:'Reprendre'})[key] || key); }
  function tradeLabel(id) { var d = I18N[locale]; return (d && d.trades[id]) || FR_TRADES[id]; }

  function applyLocale(l) {
    locale = I18N[l] ? l : 'fr';
    root.lang = locale; root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (!(k in FR)) FR[k] = el.textContent; el.textContent = t(k); });
    $$('[data-i18n-label]').forEach(function (el) { var k = el.getAttribute('data-i18n-label'); if (!(k in FR)) FR[k] = el.getAttribute('aria-label'); el.setAttribute('aria-label', t(k)); });
    $$('[data-i18n-list]').forEach(function (ul) {
      var k = ul.getAttribute('data-i18n-list');
      if (!(k in FR)) FR[k] = $$('li', ul).map(function (li) { return li.textContent; });
      var items = t(k);
      $$('li', ul).forEach(function (li, i) { if (items[i]) li.textContent = items[i]; });
    });
    var sel = $('#lang'); if (sel) sel.value = locale;
    if (typeof refreshTrades === 'function') refreshTrades();
  }

  /* ---------- 3. Thème et menu ---------- */
  function setupChrome() {
    var dark = load('patron-theme', 'light') !== 'light';
    root.dataset.theme = dark ? 'dark' : 'light';
    var themeBtn = $('#theme');
    if (themeBtn) themeBtn.addEventListener('click', function () {
      dark = !dark; root.dataset.theme = dark ? 'dark' : 'light'; store('patron-theme', dark ? 'dark' : 'light');
    });
    var menu = $('#menu'), nav = $('#nav');
    if (menu && nav) {
      menu.addEventListener('click', function () { var open = !nav.classList.contains('open'); nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); });
      nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); } });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus(); } });
    }
    var sel = $('#lang');
    if (sel) sel.addEventListener('change', function () { store('patron-locale', sel.value); applyLocale(sel.value); });
  }

  /* ---------- 4. Un site, tous les métiers ---------- */
  var TRADES = [
    {id:'boulangerie', name:'Maison Farine', initials:'MF', city:'Lille', title:'Le bon pain, chaque matin.', text:'Levain maison, viennoiseries et gâteaux sur commande.', cta:'Voir nos horaires', bg:'#f6efe3', ink:'#3a2a1c', accent:'#a9662f', soft:'#ead8bd'},
    {id:'coiffeur', name:'Atelier Mèche', initials:'AM', city:'Roubaix', title:'Votre style, notre savoir-faire.', text:'Coupes, couleurs et soins, avec ou sans rendez-vous.', cta:'Prendre rendez-vous', bg:'#f7eff0', ink:'#35242a', accent:'#9c4f63', soft:'#efd9de'},
    {id:'plombier', name:'Clé de Douze', initials:'CD', city:'Tourcoing', title:'Une fuite ? On arrive vite.', text:'Dépannage, installation et entretien dans la métropole.', cta:'Appeler maintenant', bg:'#eaf1f5', ink:'#142a38', accent:'#1d6690', soft:'#d3e3ec'},
    {id:'coach', name:'Élan Coaching', initials:'ÉC', city:'Lille', title:'L’énergie, séance après séance.', text:'Coaching individuel, en salle ou en extérieur.', cta:'Réserver une séance', bg:'#eef4e6', ink:'#1d2b1a', accent:'#467a26', soft:'#d9e7c8'},
    {id:'boutique', name:'Comptoir Linné', initials:'CL', city:'Lille', title:'Des objets choisis avec soin.', text:'Déco, papeterie et idées cadeaux, en boutique et en ligne.', cta:'Découvrir la boutique', bg:'#f4efe8', ink:'#2b2621', accent:'#85563a', soft:'#e7dccd'},
    {id:'restaurant', name:'La Table d’Opale', initials:'TO', city:'Lille', title:'Une cuisine de saison, à deux pas.', text:'Le midi en semaine, le soir du jeudi au samedi.', cta:'Voir la carte', bg:'#f8f1ea', ink:'#2d1f1a', accent:'#a8402b', soft:'#efd9cc'},
    {id:'association', name:'Les Mains Vertes', initials:'MV', city:'Villeneuve-d’Ascq', title:'Ensemble, faisons pousser le quartier.', text:'Jardins partagés, ateliers et rencontres toute l’année.', cta:'Nous rejoindre', bg:'#edf4ee', ink:'#18301f', accent:'#2c6f41', soft:'#d5e7d9'},
    {id:'photographe', name:'Studio Grain', initials:'SG', city:'Lille', title:'Vos plus beaux moments, en lumière.', text:'Portraits, mariages et photos pour les entreprises.', cta:'Voir le portfolio', bg:'#1d1e1c', ink:'#f1efe9', accent:'#c99a3c', soft:'#34352f', img:'photographe-2'}
  ];
  var photos = ((window.PATRON_EXPORT_CONFIG || {}).photos) || [];
  var current = 0, timer = null, paused = false, rig, refreshTrades;

  function imageFor(tr) {
    if (photos.indexOf(tr.id) !== -1) return './assets/photos/' + tr.id + '.webp';
    return './assets/illustrations/' + (tr.img || tr.id) + '.svg';
  }
  function show(i, instant) {
    current = (i + TRADES.length) % TRADES.length;
    var tr = TRADES[current];
    function fill() {
      rig.style.setProperty('--bg', tr.bg); rig.style.setProperty('--ink', tr.ink); rig.style.setProperty('--accent', tr.accent); rig.style.setProperty('--soft', tr.soft);
      $$('[data-f]', rig).forEach(function (el) {
        var f = el.getAttribute('data-f');
        if (f === 'img') { el.src = imageFor(tr); return; }
        el.textContent = f === 'label' ? FR_TRADES[tr.id] + ' · ' + tr.city : tr[f];
      });
      var n = $('#trade-name'); if (n) n.textContent = tradeLabel(tr.id);
      $$('#trades button').forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === current)); });
      rig.classList.remove('is-switching');
    }
    if (instant || reduce.matches) { fill(); return; }
    rig.classList.add('is-switching');
    setTimeout(fill, 320);
  }
  function schedule() {
    clearInterval(timer);
    if (paused || reduce.matches) return;
    timer = setInterval(function () { if (!document.hidden) show(current + 1); }, 3200);
  }
  function setupTrades() {
    rig = $('#rig'); if (!rig) return;
    TRADES.forEach(function (tr) { var im = new Image(); im.src = imageFor(tr); });
    var box = $('#trades');
    box.innerHTML = TRADES.map(function (tr, k) { return '<button type="button" aria-pressed="' + (k === 0) + '" data-k="' + k + '"></button>'; }).join('');
    refreshTrades = function () {
      $$('#trades button').forEach(function (b, k) { b.textContent = tradeLabel(TRADES[k].id); });
      var n = $('#trade-name'); if (n) n.textContent = tradeLabel(TRADES[current].id);
      var p = $('#pause span'); if (p) p.textContent = paused || reduce.matches ? t('play') : t('pause');
    };
    refreshTrades();
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      show(+b.getAttribute('data-k')); paused = true; updatePause(); schedule();
    });
    var pb = $('#pause');
    function updatePause() { pb.setAttribute('aria-pressed', String(paused)); refreshTrades(); }
    if (reduce.matches) { pb.hidden = true; }
    pb.addEventListener('click', function () { paused = !paused; updatePause(); schedule(); });
    show(0, true); schedule();
  }

  /* ---------- 5. Inclinaison 3D (souris, inclinaison du téléphone ou défilement) ---------- */
  function setupTilt() {
    var stage = $('#stage'); if (!stage || !rig || reduce.matches) return;
    var tx = 6, ty = -12, cx = 6, cy = -12, raf = null;
    function loop() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      rig.style.setProperty('--rx', cx.toFixed(2) + 'deg'); rig.style.setProperty('--ry', cy.toFixed(2) + 'deg');
      raf = (Math.abs(tx - cx) > 0.02 || Math.abs(ty - cy) > 0.02) ? requestAnimationFrame(loop) : null;
    }
    function aim(x, y) { tx = Math.max(-4, Math.min(14, x)); ty = Math.max(-24, Math.min(6, y)); if (!raf) raf = requestAnimationFrame(loop); }
    rig.style.transition = 'none';
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine) {
      var hero = $('.hero');
      hero.addEventListener('pointermove', function (e) {
        var r = stage.getBoundingClientRect();
        var px = (e.clientX - (r.left + r.width / 2)) / window.innerWidth, py = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        aim(6 - py * 12, -12 + px * 22);
      });
      hero.addEventListener('pointerleave', function () { aim(6, -12); });
    } else {
      var oriented = false;
      window.addEventListener('deviceorientation', function (e) {
        if (e.beta == null || e.gamma == null) return;
        oriented = true;
        aim(6 + (e.beta - 45) * 0.18, -12 + e.gamma * 0.35);
      }, { passive: true });
      window.addEventListener('scroll', function () {
        if (oriented) return;
        var r = stage.getBoundingClientRect(), p = (r.top + r.height / 2) / window.innerHeight - 0.5;
        aim(6 + p * 14, -12 - p * 10);
      }, { passive: true });
    }
  }

  /* ---------- 6. Bande des métiers ---------- */
  function setupBand() {
    var band = $('.band'); if (!band || reduce.matches) return;
    var list = $('.band-list', band), clone = list.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true'); clone.removeAttribute('data-i18n-list');
    $('.band-track', band).appendChild(clone);
    band.classList.add('is-moving');
    var sync = function () { $$('li', clone).forEach(function (li, i) { li.textContent = $$('li', list)[i].textContent; }); };
    new MutationObserver(sync).observe(list, { subtree: true, characterData: true, childList: true });
  }

  function start() {
    try { setupChrome(); } catch (e) {}
    try { setupTrades(); } catch (e) {}
    try { applyLocale(load('patron-locale', 'fr')); } catch (e) {}
    try { setupTilt(); } catch (e) {}
    try { setupBand(); } catch (e) {}
    try { intro(); } catch (e) { root.classList.remove('intro-lock'); }
    root.classList.remove('ps-intro');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
