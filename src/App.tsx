import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, animate } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  FlaskConical,
  Scale,
  Thermometer,
  Wind,
  Beaker,
  Microscope,
  Settings,
  Wrench,
  FileText,
  Headphones,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Sun,
  Moon,
  Globe,
  Search,
  MessageCircle,
  Star,
  Calendar,
  User,
  HelpCircle,
  ArrowUp,
  Cookie,
  Expand,
  FileDown,
  Grid3X3,
  List,
  ChevronDown,
  ChevronLeft,
  Package,
  Zap,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react'
// html2pdf loaded dynamically when needed
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import './App.css'

// Translation data
const translations = {
  tr: {
    nav: {
      home: 'Anasayfa',
      about: 'Kurumsal',
      products: 'Ürünlerimiz',
      services: 'Hizmetlerimiz',
      contact: 'İletişim',
      catalog: 'Katalog'
    },
    hero: {
      badge: 'Laboratuvar Çözümleri',
      title: 'Laboratuvarınız İçin',
      titleHighlight: 'En İyi Cihazlar',
      description: '30 yılı aşkın deneyimimizle analitik ve endüstriyel test cihazlarında Türkiye\'nin lider tedarikçisi. Dünya markaları, uzman teknik servis ve kesintisiz destek hizmeti.',
      explore: 'Ürünleri Keşfet',
      contact: 'Bize Ulaşın',
      stats: {
        experience: 'Yıllık Deneyim',
        customers: 'Mutlu Müşteri',
        brands: 'Marka'
      }
    },
    about: {
      badge: 'Hakkımızda',
      title: 'Antest: Güvenilirlik ve Kalitenin Adresi',
      description1: '1988 yılından bu yana analitik ve endüstriyel test cihazları sektöründe hizmet veren Antest, dünyanın önde gelen markalarının Türkiye distribütörü olarak faaliyet göstermektedir.',
      description2: 'İzmir merkezli firmamız, tüm Türkiye\'ye satış, teknik servis ve danışmanlık hizmeti sunmaktadır. Gıda, ilaç, kimya, üniversite ve araştırma laboratuvarlarına özel çözümler üretiyoruz.',
      features: [
        'ISO 9001 Kalite Yönetim Sistemi',
        'Uzman teknik servis ekibi',
        '7/24 destek hattı',
        'Orijinal yedek parça garantisi'
      ],
      stats: {
        products: 'Ürün Çeşidi',
        support: 'Teknik Destek',
        certificates: 'Sertifika',
        cities: 'İl Hizmeti'
      }
    },
    products: {
      badge: 'Ürünlerimiz',
      title: 'Laboratuvar Ekipmanları',
      description: 'Dünya markalarının en kaliteli laboratuvar cihazlarını uygun fiyatlarla sizlere sunuyoruz.',
      viewAll: 'Tüm Ürünleri Gör',
      details: 'Detaylı Bilgi',
      search: 'Ürün ara...',
      categories: {
        ovens: 'Etüvler',
        balances: 'Analitik Teraziler',
        centrifuges: 'Santrifüjler',
        incubators: 'İnkübatörler'
      }
    },
    brands: {
      badge: 'İş Ortaklarımız',
      title: 'Dünya Markaları',
      description: 'Dünyanın önde gelen laboratuvar ekipmanı üreticilerinin Türkiye distribütörüyüz.'
    },
    services: {
      badge: 'Hizmetlerimiz',
      title: 'Kapsamlı Çözümler',
      description: 'Satış öncesi ve sonrası tüm ihtiyaçlarınız için yanınızdayız.',
      items: {
        technical: {
          title: 'Teknik Servis',
          description: 'Uzman ekibimizle cihazlarınızın bakım, onarım ve kalibrasyon hizmetleri'
        },
        installation: {
          title: 'Kurulum & Eğitim',
          description: 'Cihaz kurulumu ve kullanıcı eğitimi hizmetleri'
        },
        consumables: {
          title: 'Sarf Malzeme',
          description: 'Orijinal sarf malzeme ve yedek parça temini'
        },
        consulting: {
          title: 'Danışmanlık',
          description: 'Laboratuvar kurulumu ve cihaz seçimi konusunda uzman desteği'
        }
      }
    },
    testimonials: {
      badge: 'Müşteri Yorumları',
      title: 'Müşterilerimiz Ne Diyor?',
      description: 'Bizi tercih eden değerli müşterilerimizin deneyimleri'
    },
    faq: {
      badge: 'SSS',
      title: 'Sık Sorulan Sorular',
      description: 'En çok merak edilen sorular ve cevapları'
    },
    blog: {
      badge: 'Blog & Haberler',
      title: 'Son Güncellemeler',
      description: 'Sektörden haberler, ürün tanıtımları ve uzman makaleler',
      readMore: 'Devamını Oku'
    },
    cta: {
      title: 'Ücretsiz Teklif Alın',
      description: 'Laboratuvarınız için en uygun çözümleri ve fiyat teklifini almak için bize ulaşın.',
      call: 'Hemen Ara',
      email: 'Mail Gönder'
    },
    contact: {
      badge: 'İletişim',
      title: 'Bize Ulaşın',
      description: 'Sorularınız ve teklif talepleriniz için bize ulaşabilirsiniz. Uzman ekibimiz en kısa sürede size dönüş yapacaktır.',
      address: 'Adres',
      phone: 'Telefon',
      email: 'E-posta',
      form: {
        title: 'Bize Mesaj Gönderin',
        firstName: 'Adınız',
        lastName: 'Soyadınız',
        email: 'E-posta',
        phone: 'Telefon',
        message: 'Mesajınız',
        send: 'Gönder'
      }
    },
    footer: {
      description: 'Analitik ve endüstriyel test cihazlarında 30+ yıllık deneyim. Türkiye\'nin lider laboratuvar ekipmanı tedarikçisi.',
      quickLinks: 'Hızlı Bağlantılar',
      categories: 'Ürün Kategorileri',
      contact: 'İletişim',
      rights: 'Tüm hakları saklıdır.',
      company: 'Antest Analitik ve Endüstriyel Test Cihazları Paz. San. Ve Tic. Ltd. Şti.'
    },
    catalog: {
      title: 'Ürün Kataloğu',
      subtitle: 'Tüm laboratuvar ekipmanlarımızı keşfedin',
      allCategories: 'Tüm Kategoriler',
      allBrands: 'Tüm Markalar',
      search: 'Ürün, marka veya model ara...',
      filters: 'Filtreler',
      results: 'ürün bulundu',
      noResults: 'Aramanızla eşleşen ürün bulunamadı.',
      clearFilters: 'Filtreleri Temizle',
      getQuote: 'Teklif Al',
      details: 'Detaylar',
      brand: 'Marka',
      model: 'Model',
      specs: 'Teknik Özellikler',
      backToCatalog: 'Kataloğa Dön',
      new: 'Yeni',
      popular: 'Popüler',
      gridView: 'Izgara Görünüm',
      listView: 'Liste Görünüm',
      sortBy: 'Sırala',
      sortDefault: 'Varsayılan',
      sortNameAZ: 'İsim (A-Z)',
      sortNameZA: 'İsim (Z-A)',
      sortBrand: 'Marka'
    },
    whatsapp: 'Canlı Destek',
    liveStatus: 'Çevrimiçi',
    downloadPdf: 'PDF Olarak İndir'
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      services: 'Services',
      contact: 'Contact',
      catalog: 'Catalog'
    },
    hero: {
      badge: 'Laboratory Solutions',
      title: 'Best Equipment For',
      titleHighlight: 'Your Laboratory',
      description: 'Turkey\'s leading supplier of analytical and industrial test equipment with over 30 years of experience. World brands, expert technical service and uninterrupted support.',
      explore: 'Explore Products',
      contact: 'Contact Us',
      stats: {
        experience: 'Years Experience',
        customers: 'Happy Customers',
        brands: 'Brands'
      }
    },
    about: {
      badge: 'About Us',
      title: 'Antest: Address of Reliability and Quality',
      description1: 'Serving in the analytical and industrial test equipment sector since 1988, Antest operates as the Turkey distributor of the world\'s leading brands.',
      description2: 'Our Izmir-based company provides sales, technical service and consultancy services to all of Turkey. We produce special solutions for food, pharmaceutical, chemical, university and research laboratories.',
      features: [
        'ISO 9001 Quality Management System',
        'Expert technical service team',
        '7/24 support line',
        'Original spare parts guarantee'
      ],
      stats: {
        products: 'Product Types',
        support: 'Technical Support',
        certificates: 'Certificates',
        cities: 'Cities Served'
      }
    },
    products: {
      badge: 'Our Products',
      title: 'Laboratory Equipment',
      description: 'We offer the highest quality laboratory equipment from world brands at affordable prices.',
      viewAll: 'View All Products',
      details: 'More Details',
      search: 'Search products...',
      categories: {
        ovens: 'Ovens',
        balances: 'Analytical Balances',
        centrifuges: 'Centrifuges',
        incubators: 'Incubators'
      }
    },
    brands: {
      badge: 'Our Partners',
      title: 'World Brands',
      description: 'We are the Turkey distributor of the world\'s leading laboratory equipment manufacturers.'
    },
    services: {
      badge: 'Our Services',
      title: 'Comprehensive Solutions',
      description: 'We are with you for all your pre and post-sales needs.',
      items: {
        technical: {
          title: 'Technical Service',
          description: 'Maintenance, repair and calibration services for your devices with our expert team'
        },
        installation: {
          title: 'Installation & Training',
          description: 'Device installation and user training services'
        },
        consumables: {
          title: 'Consumables',
          description: 'Original consumables and spare parts supply'
        },
        consulting: {
          title: 'Consulting',
          description: 'Expert support for laboratory setup and equipment selection'
        }
      }
    },
    testimonials: {
      badge: 'Testimonials',
      title: 'What Our Customers Say?',
      description: 'Experiences of our valued customers who prefer us'
    },
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked Questions',
      description: 'Most curious questions and answers'
    },
    blog: {
      badge: 'Blog & News',
      title: 'Latest Updates',
      description: 'Industry news, product introductions and expert articles',
      readMore: 'Read More'
    },
    cta: {
      title: 'Get Free Quote',
      description: 'Contact us to get the most suitable solutions and price quote for your laboratory.',
      call: 'Call Now',
      email: 'Send Email'
    },
    contact: {
      badge: 'Contact',
      title: 'Get In Touch',
      description: 'You can contact us for your questions and quote requests. Our expert team will get back to you as soon as possible.',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      form: {
        title: 'Send Us a Message',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        send: 'Send'
      }
    },
    footer: {
      description: '30+ years of experience in analytical and industrial test equipment. Turkey\'s leading laboratory equipment supplier.',
      quickLinks: 'Quick Links',
      categories: 'Product Categories',
      contact: 'Contact',
      rights: 'All rights reserved.',
      company: 'Antest Analytical and Industrial Test Equipment Marketing Industry and Trade Ltd. Co.'
    },
    catalog: {
      title: 'Product Catalog',
      subtitle: 'Explore all our laboratory equipment',
      allCategories: 'All Categories',
      allBrands: 'All Brands',
      search: 'Search product, brand or model...',
      filters: 'Filters',
      results: 'products found',
      noResults: 'No products matching your search.',
      clearFilters: 'Clear Filters',
      getQuote: 'Get Quote',
      details: 'Details',
      brand: 'Brand',
      model: 'Model',
      specs: 'Specifications',
      backToCatalog: 'Back to Catalog',
      new: 'New',
      popular: 'Popular',
      gridView: 'Grid View',
      listView: 'List View',
      sortBy: 'Sort',
      sortDefault: 'Default',
      sortNameAZ: 'Name (A-Z)',
      sortNameZA: 'Name (Z-A)',
      sortBrand: 'Brand'
    },
    whatsapp: 'Live Support',
    liveStatus: 'Online',
    downloadPdf: 'Download as PDF'
  }
}

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      })
      return controls.stop
    }
  }, [isInView, value, count])

  return <span ref={ref}>{displayValue}{suffix}</span>
}

// Scroll reveal component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Custom hook for dark mode with localStorage and system preference
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('antest-theme')
    if (saved) {
      return saved === 'dark'
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // Save to localStorage
    localStorage.setItem('antest-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set preference
      if (!localStorage.getItem('antest-theme')) {
        setIsDarkMode(e.matches)
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggle = () => setIsDarkMode(prev => !prev)

  return { isDarkMode, toggle, setIsDarkMode }
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode()
  const [language, setLanguage] = useState<'tr' | 'en'>('tr')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showCookieBanner, setShowCookieBanner] = useState(() => !localStorage.getItem('antest-cookie-consent'))
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [showCatalog, setShowCatalog] = useState(false)
  const [catalogCategory, setCatalogCategory] = useState('all')
  const [catalogBrand, setCatalogBrand] = useState('all')
  const [catalogSearch, setCatalogSearch] = useState('')
  const [catalogView, setCatalogView] = useState<'grid' | 'list'>('grid')
  const [catalogSort, setCatalogSort] = useState('default')
  const [selectedCatalogProduct, setSelectedCatalogProduct] = useState<number | null>(null)
  const t = translations[language]

  const handleDownloadPdf = useCallback(async () => {
    setIsGeneratingPdf(true)
    try {
      const element = document.getElementById('main-content')
      if (!element) return
      const opt = {
        margin: 0,
        filename: 'Antest-Katalog.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      }
      const html2pdf = (await import('html2pdf.js')).default
      await html2pdf().set(opt).from(element).save()
    } finally {
      setIsGeneratingPdf(false)
    }
  }, [])

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.products, href: '#products' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const products = [
    {
      title: t.products.categories.ovens,
      description: language === 'tr'
        ? 'Laboratuvar tipi kurutma etüvleri, vakumlu etüvler ve endüstriyel fırınlar'
        : 'Laboratory drying ovens, vacuum ovens and industrial furnaces',
      image: '/images/product-etuv.jpg',
      icon: <Thermometer className="w-6 h-6" />,
      details: language === 'tr'
        ? { specs: ['Sıcaklık: 50°C - 300°C', 'Kapasite: 30L - 720L', 'Hassasiyet: ±0.5°C', 'Dijital PID kontrol'], brands: ['JSR', 'Protherm', 'Nüve'] }
        : { specs: ['Temperature: 50°C - 300°C', 'Capacity: 30L - 720L', 'Accuracy: ±0.5°C', 'Digital PID control'], brands: ['JSR', 'Protherm', 'Nüve'] }
    },
    {
      title: t.products.categories.balances,
      description: language === 'tr'
        ? 'Yüksek hassasiyetli analitik teraziler ve hassas tartım cihazları'
        : 'High precision analytical balances and precision weighing devices',
      image: '/images/product-balance.jpg',
      icon: <Scale className="w-6 h-6" />,
      details: language === 'tr'
        ? { specs: ['Hassasiyet: 0.0001g', 'Kapasite: 120g - 32kg', 'Dahili kalibrasyon', 'USB/RS232 bağlantı'], brands: ['Mettler Toledo', 'Radwag'] }
        : { specs: ['Readability: 0.0001g', 'Capacity: 120g - 32kg', 'Internal calibration', 'USB/RS232 connectivity'], brands: ['Mettler Toledo', 'Radwag'] }
    },
    {
      title: t.products.categories.centrifuges,
      description: language === 'tr'
        ? 'Laboratuvar ve endüstriyel kullanıma uygun santrifüj cihazları'
        : 'Centrifuge devices suitable for laboratory and industrial use',
      image: '/images/product-centrifuge.jpg',
      icon: <Wind className="w-6 h-6" />,
      details: language === 'tr'
        ? { specs: ['Hız: 500 - 15.000 rpm', 'Kapasite: 6x15ml - 4x750ml', 'Soğutmalı modeller', 'Otomatik dengeleme'], brands: ['Hettich', 'Thermo Scientific'] }
        : { specs: ['Speed: 500 - 15,000 rpm', 'Capacity: 6x15ml - 4x750ml', 'Refrigerated models', 'Auto balancing'], brands: ['Hettich', 'Thermo Scientific'] }
    },
    {
      title: t.products.categories.incubators,
      description: language === 'tr'
        ? 'CO2 inkübatörler, bakteri inkübatörleri ve iklimlendirme dolapları'
        : 'CO2 incubators, bacteria incubators and climate chambers',
      image: '/images/product-incubator.jpg',
      icon: <FlaskConical className="w-6 h-6" />,
      details: language === 'tr'
        ? { specs: ['Sıcaklık: 5°C - 60°C', 'CO2: 0-20%', 'Nem kontrolü', 'HEPA filtre'], brands: ['Thermo Scientific', 'Nüve'] }
        : { specs: ['Temperature: 5°C - 60°C', 'CO2: 0-20%', 'Humidity control', 'HEPA filter'], brands: ['Thermo Scientific', 'Nüve'] }
    }
  ]

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const brands = [
    'Merck Millipore', 'Thermo Scientific', 'Mettler Toledo',
    'Heidolph', 'Pharma Test', 'Lauda', 'Tuttnauer',
    'JSR', 'Nüve', 'Protherm'
  ]

  // Comprehensive catalog products database
  const catalogProducts = [
    // Etüvler / Ovens
    {
      id: 1,
      name: language === 'tr' ? 'JSR Kurutma Etüvü JSOF-150' : 'JSR Drying Oven JSOF-150',
      category: language === 'tr' ? 'Etüvler' : 'Ovens',
      categoryKey: 'ovens',
      brand: 'JSR',
      model: 'JSOF-150',
      description: language === 'tr'
        ? 'Doğal konveksiyonlu laboratuvar tipi kurutma etüvü. 150 litre kapasite, dijital PID kontrol.'
        : 'Natural convection laboratory drying oven. 150 liter capacity, digital PID control.',
      specs: language === 'tr'
        ? ['Sıcaklık: 50-300°C', 'Kapasite: 150L', 'Hassasiyet: ±0.5°C', 'İç Boyut: 50x50x60 cm', 'Dijital PID kontrol', 'Zamanlayıcı: 0-999 dk']
        : ['Temperature: 50-300°C', 'Capacity: 150L', 'Accuracy: ±0.5°C', 'Inner Size: 50x50x60 cm', 'Digital PID control', 'Timer: 0-999 min'],
      isNew: false,
      isPopular: true,
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      id: 2,
      name: language === 'tr' ? 'JSR Vakumlu Etüv JSVD-100' : 'JSR Vacuum Oven JSVD-100',
      category: language === 'tr' ? 'Etüvler' : 'Ovens',
      categoryKey: 'ovens',
      brand: 'JSR',
      model: 'JSVD-100',
      description: language === 'tr'
        ? 'Yüksek performanslı vakumlu kurutma etüvü. Hassas malzemelerin kurutulması için ideal.'
        : 'High performance vacuum drying oven. Ideal for drying sensitive materials.',
      specs: language === 'tr'
        ? ['Sıcaklık: RT+10 - 250°C', 'Kapasite: 100L', 'Vakum: 133 Pa', 'Hassasiyet: ±1°C', 'Paslanmaz çelik iç hazne', 'Dijital vakum göstergesi']
        : ['Temperature: RT+10 - 250°C', 'Capacity: 100L', 'Vacuum: 133 Pa', 'Accuracy: ±1°C', 'Stainless steel chamber', 'Digital vacuum display'],
      isNew: true,
      isPopular: false,
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      id: 3,
      name: language === 'tr' ? 'Protherm Kül Fırını PLF-160' : 'Protherm Muffle Furnace PLF-160',
      category: language === 'tr' ? 'Etüvler' : 'Ovens',
      categoryKey: 'ovens',
      brand: 'Protherm',
      model: 'PLF-160',
      description: language === 'tr'
        ? '1600°C\'ye kadar çalışabilen yüksek sıcaklık kül fırını. Seramik ve metalürji uygulamaları için.'
        : 'High temperature muffle furnace up to 1600°C. For ceramic and metallurgy applications.',
      specs: language === 'tr'
        ? ['Sıcaklık: 100-1600°C', 'Kapasite: 8L', 'Isıtma hızı: 10°C/dk', '30 segment programlama', 'Çift cidarlı yapı', 'RS232 bağlantı']
        : ['Temperature: 100-1600°C', 'Capacity: 8L', 'Heating rate: 10°C/min', '30 segment programming', 'Double wall structure', 'RS232 connection'],
      isNew: false,
      isPopular: true,
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      id: 4,
      name: language === 'tr' ? 'Nüve FN-120 Etüv' : 'Nüve FN-120 Oven',
      category: language === 'tr' ? 'Etüvler' : 'Ovens',
      categoryKey: 'ovens',
      brand: 'Nüve',
      model: 'FN-120',
      description: language === 'tr'
        ? 'Zorlanmış konveksiyonlu genel amaçlı laboratuvar etüvü. Homojen sıcaklık dağılımı.'
        : 'Forced convection general purpose laboratory oven. Homogeneous temperature distribution.',
      specs: language === 'tr'
        ? ['Sıcaklık: 5-300°C', 'Kapasite: 120L', 'Hassasiyet: ±0.5°C', 'Zorlanmış hava sirkülasyonu', 'Ayarlanabilir raflar', 'USB veri kaydı']
        : ['Temperature: 5-300°C', 'Capacity: 120L', 'Accuracy: ±0.5°C', 'Forced air circulation', 'Adjustable shelves', 'USB data logging'],
      isNew: false,
      isPopular: false,
      icon: <Thermometer className="w-5 h-5" />
    },
    // Analitik Teraziler / Balances
    {
      id: 5,
      name: language === 'tr' ? 'Mettler Toledo XPR205 Analitik Terazi' : 'Mettler Toledo XPR205 Analytical Balance',
      category: language === 'tr' ? 'Analitik Teraziler' : 'Analytical Balances',
      categoryKey: 'balances',
      brand: 'Mettler Toledo',
      model: 'XPR205',
      description: language === 'tr'
        ? 'Yüksek doğrulukta analitik terazi. Otomatik kapı, statik elektrik giderici, dahili kalibrasyon.'
        : 'High accuracy analytical balance. Automatic doors, static eliminator, internal calibration.',
      specs: language === 'tr'
        ? ['Hassasiyet: 0.00001g', 'Kapasite: 220g', 'Dahili kalibrasyon', 'Dokunmatik ekran', 'GLP/GMP uyumlu', 'StatusLight göstergesi']
        : ['Readability: 0.00001g', 'Capacity: 220g', 'Internal calibration', 'Touchscreen display', 'GLP/GMP compliant', 'StatusLight indicator'],
      isNew: true,
      isPopular: true,
      icon: <Scale className="w-5 h-5" />
    },
    {
      id: 6,
      name: language === 'tr' ? 'Mettler Toledo ME204 Analitik Terazi' : 'Mettler Toledo ME204 Analytical Balance',
      category: language === 'tr' ? 'Analitik Teraziler' : 'Analytical Balances',
      categoryKey: 'balances',
      brand: 'Mettler Toledo',
      model: 'ME204',
      description: language === 'tr'
        ? 'Ekonomik seri analitik terazi. Kompakt tasarım, kolay kullanım.'
        : 'Economy series analytical balance. Compact design, easy to use.',
      specs: language === 'tr'
        ? ['Hassasiyet: 0.0001g', 'Kapasite: 220g', 'Dahili kalibrasyon', 'Rüzgarlık dahil', 'RS232 bağlantı', 'Kompakt boyut']
        : ['Readability: 0.0001g', 'Capacity: 220g', 'Internal calibration', 'Draft shield included', 'RS232 connection', 'Compact size'],
      isNew: false,
      isPopular: true,
      icon: <Scale className="w-5 h-5" />
    },
    {
      id: 7,
      name: language === 'tr' ? 'Radwag AS 310.R2 Analitik Terazi' : 'Radwag AS 310.R2 Analytical Balance',
      category: language === 'tr' ? 'Analitik Teraziler' : 'Analytical Balances',
      categoryKey: 'balances',
      brand: 'Radwag',
      model: 'AS 310.R2',
      description: language === 'tr'
        ? 'Çift kefeli mekanizmalı hassas analitik terazi. Hızlı stabilizasyon.'
        : 'Dual range precise analytical balance. Fast stabilization.',
      specs: language === 'tr'
        ? ['Hassasiyet: 0.0001g', 'Kapasite: 310g', '5" dokunmatik ekran', 'WiFi bağlantı', 'Çift kefe aralığı', 'Otomatik kalibrasyon']
        : ['Readability: 0.0001g', 'Capacity: 310g', '5" touchscreen', 'WiFi connectivity', 'Dual range', 'Auto calibration'],
      isNew: false,
      isPopular: false,
      icon: <Scale className="w-5 h-5" />
    },
    {
      id: 8,
      name: language === 'tr' ? 'Radwag PS 4500.R2 Hassas Terazi' : 'Radwag PS 4500.R2 Precision Balance',
      category: language === 'tr' ? 'Analitik Teraziler' : 'Analytical Balances',
      categoryKey: 'balances',
      brand: 'Radwag',
      model: 'PS 4500.R2',
      description: language === 'tr'
        ? 'Yüksek kapasiteli hassas terazi. Endüstriyel ve laboratuvar kullanımı için ideal.'
        : 'High capacity precision balance. Ideal for industrial and laboratory use.',
      specs: language === 'tr'
        ? ['Hassasiyet: 0.01g', 'Kapasite: 4500g', 'Dahili kalibrasyon', 'Dokunmatik ekran', 'USB/RS232/Ethernet', 'Paslanmaz çelik kefe']
        : ['Readability: 0.01g', 'Capacity: 4500g', 'Internal calibration', 'Touchscreen', 'USB/RS232/Ethernet', 'Stainless steel pan'],
      isNew: false,
      isPopular: false,
      icon: <Scale className="w-5 h-5" />
    },
    // Santrifüjler / Centrifuges
    {
      id: 9,
      name: language === 'tr' ? 'Hettich MIKRO 220R Soğutmalı Santrifüj' : 'Hettich MIKRO 220R Refrigerated Centrifuge',
      category: language === 'tr' ? 'Santrifüjler' : 'Centrifuges',
      categoryKey: 'centrifuges',
      brand: 'Hettich',
      model: 'MIKRO 220R',
      description: language === 'tr'
        ? 'Soğutmalı mikrosantrifüj. Moleküler biyoloji ve biyokimya uygulamaları için.'
        : 'Refrigerated microcentrifuge. For molecular biology and biochemistry applications.',
      specs: language === 'tr'
        ? ['Hız: 18.000 rpm', 'RCF: 31.514 x g', 'Soğutma: -20 ile 40°C', 'Kapasite: 24x1.5ml', 'Sessiz çalışma', 'Otomatik rotor tanıma']
        : ['Speed: 18,000 rpm', 'RCF: 31,514 x g', 'Cooling: -20 to 40°C', 'Capacity: 24x1.5ml', 'Silent operation', 'Auto rotor recognition'],
      isNew: false,
      isPopular: true,
      icon: <Wind className="w-5 h-5" />
    },
    {
      id: 10,
      name: language === 'tr' ? 'Hettich ROTANTA 460R Santrifüj' : 'Hettich ROTANTA 460R Centrifuge',
      category: language === 'tr' ? 'Santrifüjler' : 'Centrifuges',
      categoryKey: 'centrifuges',
      brand: 'Hettich',
      model: 'ROTANTA 460R',
      description: language === 'tr'
        ? 'Yüksek kapasiteli soğutmalı santrifüj. Kan bankası ve klinik uygulamalar için.'
        : 'High capacity refrigerated centrifuge. For blood bank and clinical applications.',
      specs: language === 'tr'
        ? ['Hız: 15.000 rpm', 'RCF: 24.400 x g', 'Kapasite: 4x750ml', 'Soğutma: -20 ile 40°C', 'Programlanabilir', '10 hızlanma profili']
        : ['Speed: 15,000 rpm', 'RCF: 24,400 x g', 'Capacity: 4x750ml', 'Cooling: -20 to 40°C', 'Programmable', '10 acceleration profiles'],
      isNew: false,
      isPopular: false,
      icon: <Wind className="w-5 h-5" />
    },
    {
      id: 11,
      name: language === 'tr' ? 'Thermo Scientific Heraeus Megafuge 8' : 'Thermo Scientific Heraeus Megafuge 8',
      category: language === 'tr' ? 'Santrifüjler' : 'Centrifuges',
      categoryKey: 'centrifuges',
      brand: 'Thermo Scientific',
      model: 'Megafuge 8',
      description: language === 'tr'
        ? 'Çok yönlü masa üstü santrifüj. Klinik ve araştırma laboratuvarları için.'
        : 'Versatile benchtop centrifuge. For clinical and research laboratories.',
      specs: language === 'tr'
        ? ['Hız: 15.200 rpm', 'RCF: 21.921 x g', 'Kapasite: 4x400ml', 'Otomatik kilit', 'Kolay rotor değişimi', 'Düşük gürültü seviyesi']
        : ['Speed: 15,200 rpm', 'RCF: 21,921 x g', 'Capacity: 4x400ml', 'Auto lock', 'Easy rotor exchange', 'Low noise level'],
      isNew: true,
      isPopular: false,
      icon: <Wind className="w-5 h-5" />
    },
    // İnkübatörler / Incubators
    {
      id: 12,
      name: language === 'tr' ? 'Thermo Scientific Heracell VIOS 160i CO2 İnkübatör' : 'Thermo Scientific Heracell VIOS 160i CO2 Incubator',
      category: language === 'tr' ? 'İnkübatörler' : 'Incubators',
      categoryKey: 'incubators',
      brand: 'Thermo Scientific',
      model: 'Heracell VIOS 160i',
      description: language === 'tr'
        ? 'Gelişmiş CO2 inkübatör. Hücre kültürü çalışmaları için optimum koşullar.'
        : 'Advanced CO2 incubator. Optimum conditions for cell culture work.',
      specs: language === 'tr'
        ? ['Sıcaklık: RT+5 - 55°C', 'CO2: 0-20%', 'Kapasite: 165L', 'HEPA filtrasyon', 'Nem kontrolü', 'Bakır iç yüzey (kontaminasyon önleme)']
        : ['Temperature: RT+5 - 55°C', 'CO2: 0-20%', 'Capacity: 165L', 'HEPA filtration', 'Humidity control', 'Copper interior (contamination prevention)'],
      isNew: false,
      isPopular: true,
      icon: <FlaskConical className="w-5 h-5" />
    },
    {
      id: 13,
      name: language === 'tr' ? 'Nüve EC 160 İnkübatör' : 'Nüve EC 160 Incubator',
      category: language === 'tr' ? 'İnkübatörler' : 'Incubators',
      categoryKey: 'incubators',
      brand: 'Nüve',
      model: 'EC 160',
      description: language === 'tr'
        ? 'Konveksiyonlu bakteri inkübatörü. Mikrobiyoloji laboratuvarları için ekonomik çözüm.'
        : 'Convection bacteria incubator. Economical solution for microbiology laboratories.',
      specs: language === 'tr'
        ? ['Sıcaklık: 5-80°C', 'Kapasite: 160L', 'Hassasiyet: ±0.2°C', 'Dijital PID kontrol', 'Paslanmaz çelik iç hazne', 'Ayarlanabilir raflar']
        : ['Temperature: 5-80°C', 'Capacity: 160L', 'Accuracy: ±0.2°C', 'Digital PID control', 'Stainless steel chamber', 'Adjustable shelves'],
      isNew: false,
      isPopular: false,
      icon: <FlaskConical className="w-5 h-5" />
    },
    {
      id: 14,
      name: language === 'tr' ? 'Thermo Scientific Heratherm IGS 100 İnkübatör' : 'Thermo Scientific Heratherm IGS 100 Incubator',
      category: language === 'tr' ? 'İnkübatörler' : 'Incubators',
      categoryKey: 'incubators',
      brand: 'Thermo Scientific',
      model: 'Heratherm IGS 100',
      description: language === 'tr'
        ? 'Genel amaçlı inkübatör. Mikrobiyoloji, gıda testi ve kalite kontrol için.'
        : 'General purpose incubator. For microbiology, food testing and quality control.',
      specs: language === 'tr'
        ? ['Sıcaklık: 5-105°C', 'Kapasite: 100L', 'Yerçekimi konveksiyon', 'Dijital kontrol paneli', 'Alarm sistemi', 'USB veri aktarımı']
        : ['Temperature: 5-105°C', 'Capacity: 100L', 'Gravity convection', 'Digital control panel', 'Alarm system', 'USB data transfer'],
      isNew: false,
      isPopular: false,
      icon: <FlaskConical className="w-5 h-5" />
    },
    // Ek ürünler - Su banyoları, pH metreler, vb.
    {
      id: 15,
      name: language === 'tr' ? 'Lauda Alpha RA 12 Su Banyosu' : 'Lauda Alpha RA 12 Water Bath',
      category: language === 'tr' ? 'Su Banyoları' : 'Water Baths',
      categoryKey: 'waterbaths',
      brand: 'Lauda',
      model: 'Alpha RA 12',
      description: language === 'tr'
        ? 'Hassas sıcaklık kontrollü su banyosu. Laboratuvar uygulamaları için güvenilir çözüm.'
        : 'Precise temperature controlled water bath. Reliable solution for laboratory applications.',
      specs: language === 'tr'
        ? ['Sıcaklık: 20-100°C', 'Kapasite: 12L', 'Hassasiyet: ±0.05°C', 'Dijital kontrol', 'Paslanmaz çelik hazne', 'Aşırı ısınma koruması']
        : ['Temperature: 20-100°C', 'Capacity: 12L', 'Accuracy: ±0.05°C', 'Digital control', 'Stainless steel bath', 'Overheating protection'],
      isNew: false,
      isPopular: false,
      icon: <Beaker className="w-5 h-5" />
    },
    {
      id: 16,
      name: language === 'tr' ? 'Mettler Toledo SevenExcellence pH Metre' : 'Mettler Toledo SevenExcellence pH Meter',
      category: language === 'tr' ? 'pH Metreler' : 'pH Meters',
      categoryKey: 'phmeters',
      brand: 'Mettler Toledo',
      model: 'SevenExcellence S400',
      description: language === 'tr'
        ? 'Çok kanallı masa üstü pH metre. pH, iletkenlik ve çözünmüş oksijen ölçümü.'
        : 'Multi-channel benchtop pH meter. pH, conductivity and dissolved oxygen measurement.',
      specs: language === 'tr'
        ? ['pH Aralığı: -2.000 - 20.000', 'Hassasiyet: ±0.001 pH', 'Dokunmatik ekran', '3 kanallı ölçüm', 'GLP uyumlu', 'USB/Ethernet bağlantı']
        : ['pH Range: -2.000 - 20.000', 'Accuracy: ±0.001 pH', 'Touchscreen', '3-channel measurement', 'GLP compliant', 'USB/Ethernet connection'],
      isNew: true,
      isPopular: true,
      icon: <Microscope className="w-5 h-5" />
    },
    {
      id: 17,
      name: language === 'tr' ? 'Heidolph Hei-TORQUE 400 Karıştırıcı' : 'Heidolph Hei-TORQUE 400 Overhead Stirrer',
      category: language === 'tr' ? 'Karıştırıcılar' : 'Stirrers',
      categoryKey: 'stirrers',
      brand: 'Heidolph',
      model: 'Hei-TORQUE 400',
      description: language === 'tr'
        ? 'Yüksek torklu overhead karıştırıcı. Viskoz sıvıların karıştırılması için ideal.'
        : 'High torque overhead stirrer. Ideal for stirring viscous liquids.',
      specs: language === 'tr'
        ? ['Hız: 10-2000 rpm', 'Tork: 400 Ncm', 'Kapasite: 200L (H₂O)', 'Dijital gösterge', 'USB bağlantı', 'Zamanlayıcı']
        : ['Speed: 10-2000 rpm', 'Torque: 400 Ncm', 'Capacity: 200L (H₂O)', 'Digital display', 'USB connection', 'Timer'],
      isNew: false,
      isPopular: false,
      icon: <Settings className="w-5 h-5" />
    },
    {
      id: 18,
      name: language === 'tr' ? 'Tuttnauer 3870EA Otoklav' : 'Tuttnauer 3870EA Autoclave',
      category: language === 'tr' ? 'Otoklavlar' : 'Autoclaves',
      categoryKey: 'autoclaves',
      brand: 'Tuttnauer',
      model: '3870EA',
      description: language === 'tr'
        ? 'Tam otomatik masa üstü otoklav. Laboratuvar ve klinik sterilizasyon için.'
        : 'Fully automatic benchtop autoclave. For laboratory and clinical sterilization.',
      specs: language === 'tr'
        ? ['Kapasite: 85L', 'Sıcaklık: 121-134°C', 'Basınç: 2.2 bar', 'Tam otomatik', 'Kurutma fonksiyonu', 'Yazıcı çıkışı']
        : ['Capacity: 85L', 'Temperature: 121-134°C', 'Pressure: 2.2 bar', 'Fully automatic', 'Drying function', 'Printer output'],
      isNew: false,
      isPopular: true,
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      id: 19,
      name: language === 'tr' ? 'Merck Millipore Milli-Q IQ 7005 Su Saflaştırma' : 'Merck Millipore Milli-Q IQ 7005 Water Purification',
      category: language === 'tr' ? 'Su Saflaştırma' : 'Water Purification',
      categoryKey: 'purification',
      brand: 'Merck Millipore',
      model: 'Milli-Q IQ 7005',
      description: language === 'tr'
        ? 'Ultra saf su üretim sistemi. Analitik ve moleküler biyoloji uygulamaları için Type 1 su.'
        : 'Ultrapure water production system. Type 1 water for analytical and molecular biology applications.',
      specs: language === 'tr'
        ? ['Saflık: 18.2 MΩ·cm', 'Debi: 5 L/dk', 'TOC: <5 ppb', 'Dokunmatik ekran', 'Gerçek zamanlı izleme', 'IoT bağlantı']
        : ['Purity: 18.2 MΩ·cm', 'Flow: 5 L/min', 'TOC: <5 ppb', 'Touchscreen', 'Real-time monitoring', 'IoT connectivity'],
      isNew: true,
      isPopular: true,
      icon: <Beaker className="w-5 h-5" />
    },
    {
      id: 20,
      name: language === 'tr' ? 'Pharma Test PTWS 820D Çözünme Test Cihazı' : 'Pharma Test PTWS 820D Dissolution Tester',
      category: language === 'tr' ? 'Farmasötik Test' : 'Pharmaceutical Testing',
      categoryKey: 'pharma',
      brand: 'Pharma Test',
      model: 'PTWS 820D',
      description: language === 'tr'
        ? 'USP 1-2-5-6 uyumlu çözünme test cihazı. İlaç sektörü kalite kontrol laboratuvarları için.'
        : 'USP 1-2-5-6 compliant dissolution tester. For pharmaceutical QC laboratories.',
      specs: language === 'tr'
        ? ['8 test kabı', 'USP 1,2,5,6 uyumlu', 'Otomatik numune alma', 'Sıcaklık: 25-45°C', '21 CFR Part 11 uyumlu', 'Dokunmatik kontrol']
        : ['8 vessels', 'USP 1,2,5,6 compliant', 'Auto sampling', 'Temperature: 25-45°C', '21 CFR Part 11 compliant', 'Touch control'],
      isNew: false,
      isPopular: false,
      icon: <Microscope className="w-5 h-5" />
    },
    // Spektrometre Sistemleri
    {
      id: 21,
      name: language === 'tr' ? 'SPECTRO ARCOS ICP-OES Spektrometre' : 'SPECTRO ARCOS ICP-OES Spectrometer',
      category: language === 'tr' ? 'Spektrometreler' : 'Spectrometers',
      categoryKey: 'spectrometers',
      brand: 'SPECTRO',
      model: 'ARCOS',
      description: language === 'tr'
        ? 'Benzersiz optik sistemi ile üstün çözünürlük, doğruluk ve stabilite sunan ICP-OES spektrometre.'
        : 'ICP-OES spectrometer offering superior resolution, accuracy and stability with unique optical system.',
      specs: language === 'tr'
        ? ['ICP-OES teknolojisi', 'Çift görüntüleme (radial/aksiyel)', 'Otomatik profilleme', 'Geniş dalga boyu aralığı', 'Eşzamanlı çoklu element analizi', 'Yüksek çözünürlük']
        : ['ICP-OES technology', 'Dual view (radial/axial)', 'Auto profiling', 'Wide wavelength range', 'Simultaneous multi-element analysis', 'High resolution'],
      isNew: false,
      isPopular: true,
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 22,
      name: language === 'tr' ? 'SPECTRO SPECTROMAXx Metal Analizör' : 'SPECTRO SPECTROMAXx Metal Analyzer',
      category: language === 'tr' ? 'Spektrometreler' : 'Spectrometers',
      categoryKey: 'spectrometers',
      brand: 'SPECTRO',
      model: 'SPECTROMAXx',
      description: language === 'tr'
        ? 'Sabit metal analizörü. Döküm tesisleri ve metal endüstrisinde malzeme testleri için.'
        : 'Stationary metal analyzer. For material testing in foundries and metal industry.',
      specs: language === 'tr'
        ? ['Karbon, fosfor, kükürt, azot analizi', 'Tüm metal elementleri', 'Yüksek hassasiyet', 'Hızlı analiz', 'Döküm kontrol', 'iCAL 2.0 kalibrasyon']
        : ['Carbon, phosphorus, sulfur, nitrogen analysis', 'All metal elements', 'High precision', 'Fast analysis', 'Foundry control', 'iCAL 2.0 calibration'],
      isNew: false,
      isPopular: false,
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 23,
      name: language === 'tr' ? 'SPECTRO XEPOS XRF Spektrometre' : 'SPECTRO XEPOS XRF Spectrometer',
      category: language === 'tr' ? 'Spektrometreler' : 'Spectrometers',
      categoryKey: 'spectrometers',
      brand: 'SPECTRO',
      model: 'XEPOS',
      description: language === 'tr'
        ? 'Polarizasyon ve ikincil hedeflerle optimum uyarım sağlayan XRF spektrometre.'
        : 'XRF spectrometer providing optimum excitation with polarization and secondary targets.',
      specs: language === 'tr'
        ? ['XRF teknolojisi', 'Polarizasyon uyarımı', 'İkincil hedef optimizasyonu', 'Yüksek hassasiyet', 'Hızlı tarama', 'Düşük algılama limiti']
        : ['XRF technology', 'Polarization excitation', 'Secondary target optimization', 'High sensitivity', 'Fast scanning', 'Low detection limit'],
      isNew: true,
      isPopular: false,
      icon: <Zap className="w-5 h-5" />
    },
    // Olfaktometre - Koku Ölçüm
    {
      id: 24,
      name: language === 'tr' ? 'Scentroid SM100i Mobil Olfaktometre' : 'Scentroid SM100i Mobile Olfactometer',
      category: language === 'tr' ? 'Olfaktometreler' : 'Olfactometers',
      categoryKey: 'olfactometers',
      brand: 'Scentroid',
      model: 'SM100i',
      description: language === 'tr'
        ? 'EN13725 standardına tam uyumlu kişisel olfaktometre. YES/NO ve Hedonic Tone test modları.'
        : 'Fully EN13725 compliant personal olfactometer. YES/NO and Hedonic Tone test modes.',
      specs: language === 'tr'
        ? ['EN13725 uyumlu', '2-11.000 OU seyreltme', 'YES/NO test modu', 'Hedonic Tone modu', 'Mikro-bilgisayar kontrol', 'Portatif kullanım']
        : ['EN13725 compliant', '2-11,000 OU dilution', 'YES/NO test mode', 'Hedonic Tone mode', 'Micro-computer control', 'Portable use'],
      isNew: false,
      isPopular: true,
      icon: <Wind className="w-5 h-5" />
    },
    {
      id: 25,
      name: language === 'tr' ? 'Scentroid SC300 Portatif Olfaktometre' : 'Scentroid SC300 Portable Olfactometer',
      category: language === 'tr' ? 'Olfaktometreler' : 'Olfactometers',
      categoryKey: 'olfactometers',
      brand: 'Scentroid',
      model: 'SC300',
      description: language === 'tr'
        ? 'Dünyanın en gelişmiş mobil olfaktometresi. Tüm uluslararası standartlara uyumlu.'
        : 'World\'s most advanced mobile olfactometer. Compliant with all international standards.',
      specs: language === 'tr'
        ? ['Tüm uluslararası standartlar', 'Siemens 8" dokunmatik ekran', 'Otomatik kalibrasyon', 'Veri kaydı', 'GPS entegrasyon', 'Batarya ile çalışma']
        : ['All international standards', 'Siemens 8" touchscreen', 'Auto calibration', 'Data logging', 'GPS integration', 'Battery operated'],
      isNew: true,
      isPopular: false,
      icon: <Wind className="w-5 h-5" />
    },
    // Derin Dondurucu
    {
      id: 26,
      name: language === 'tr' ? 'Nuaire Blizzard Ultra Derin Dondurucu' : 'Nuaire Blizzard Ultra Low Freezer',
      category: language === 'tr' ? 'Derin Dondurucular' : 'Ultra Low Freezers',
      categoryKey: 'freezers',
      brand: 'Nuaire',
      model: 'Blizzard NU-99728VFi',
      description: language === 'tr'
        ? '-86°C ultra derin dondurucu. Hidrokarbon soğutucu ile %60 enerji tasarrufu.'
        : '-86°C ultra low freezer. 60% energy savings with hydrocarbon refrigerant.',
      specs: language === 'tr'
        ? ['Sıcaklık: -86°C', 'Kapasite: 728L', 'Hidrokarbon soğutucu', '%60 enerji tasarrufu', 'Dokunmatik ekran', 'USB veri kaydı']
        : ['Temperature: -86°C', 'Capacity: 728L', 'Hydrocarbon refrigerant', '60% energy savings', 'Touchscreen', 'USB data logging'],
      isNew: false,
      isPopular: true,
      icon: <Thermometer className="w-5 h-5" />
    },
    // Spektrofotometre
    {
      id: 27,
      name: language === 'tr' ? 'Jenway 7310 VIS Spektrofotometre' : 'Jenway 7310 VIS Spectrophotometer',
      category: language === 'tr' ? 'Spektrofotometreler' : 'Spectrophotometers',
      categoryKey: 'spectrophotometers',
      brand: 'Jenway',
      model: '7310',
      description: language === 'tr'
        ? 'İkon tabanlı yazılımlı VIS spektrofotometre. Kolay kullanım ve gelişmiş özellikler.'
        : 'VIS spectrophotometer with icon-driven software. Easy use and advanced features.',
      specs: language === 'tr'
        ? ['Dalga boyu: 320-1000 nm', 'Bant genişliği: 5 nm', 'Dokunmatik ekran', 'USB bağlantı', 'Kinetik ölçüm', 'Dahili yazıcı çıkışı']
        : ['Wavelength: 320-1000 nm', 'Bandwidth: 5 nm', 'Touchscreen', 'USB connection', 'Kinetic measurement', 'Built-in printer output'],
      isNew: false,
      isPopular: false,
      icon: <Microscope className="w-5 h-5" />
    },
    {
      id: 28,
      name: language === 'tr' ? 'Hach DR1900 Portatif Spektrofotometre' : 'Hach DR1900 Portable Spectrophotometer',
      category: language === 'tr' ? 'Spektrofotometreler' : 'Spectrophotometers',
      categoryKey: 'spectrophotometers',
      brand: 'Hach',
      model: 'DR1900',
      description: language === 'tr'
        ? 'Saha kullanımına uygun portatif VIS spektrofotometre. 220+ önceden yüklenmiş method.'
        : 'Field-ready portable VIS spectrophotometer. 220+ pre-loaded methods.',
      specs: language === 'tr'
        ? ['Dalga boyu: 340-800 nm', '220+ hazır method', 'IP67 koruma', 'Şarj edilebilir batarya', 'Bluetooth bağlantı', 'Kompakt tasarım']
        : ['Wavelength: 340-800 nm', '220+ ready methods', 'IP67 protection', 'Rechargeable battery', 'Bluetooth connection', 'Compact design'],
      isNew: false,
      isPopular: false,
      icon: <Microscope className="w-5 h-5" />
    }
  ]

  // Get unique brands for filters
  const catalogBrandList = [...new Set(catalogProducts.map(p => p.brand))]

  // Filter and sort catalog products
  const filteredCatalogProducts = catalogProducts
    .filter(p => {
      const matchesCategory = catalogCategory === 'all' || p.categoryKey === catalogCategory
      const matchesBrand = catalogBrand === 'all' || p.brand === catalogBrand
      const matchesSearch = catalogSearch === '' ||
        p.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        p.brand.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        p.model.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(catalogSearch.toLowerCase())
      return matchesCategory && matchesBrand && matchesSearch
    })
    .sort((a, b) => {
      if (catalogSort === 'nameAZ') return a.name.localeCompare(b.name)
      if (catalogSort === 'nameZA') return b.name.localeCompare(a.name)
      if (catalogSort === 'brand') return a.brand.localeCompare(b.brand)
      return 0
    })

  // Category keys for filter
  const categoryFilterOptions = [
    { key: 'all', label: t.catalog.allCategories },
    { key: 'ovens', label: language === 'tr' ? 'Etüvler' : 'Ovens' },
    { key: 'balances', label: language === 'tr' ? 'Analitik Teraziler' : 'Analytical Balances' },
    { key: 'centrifuges', label: language === 'tr' ? 'Santrifüjler' : 'Centrifuges' },
    { key: 'incubators', label: language === 'tr' ? 'İnkübatörler' : 'Incubators' },
    { key: 'spectrometers', label: language === 'tr' ? 'Spektrometreler' : 'Spectrometers' },
    { key: 'spectrophotometers', label: language === 'tr' ? 'Spektrofotometreler' : 'Spectrophotometers' },
    { key: 'olfactometers', label: language === 'tr' ? 'Olfaktometreler' : 'Olfactometers' },
    { key: 'freezers', label: language === 'tr' ? 'Derin Dondurucular' : 'Ultra Low Freezers' },
    { key: 'waterbaths', label: language === 'tr' ? 'Su Banyoları' : 'Water Baths' },
    { key: 'phmeters', label: language === 'tr' ? 'pH Metreler' : 'pH Meters' },
    { key: 'stirrers', label: language === 'tr' ? 'Karıştırıcılar' : 'Stirrers' },
    { key: 'autoclaves', label: language === 'tr' ? 'Otoklavlar' : 'Autoclaves' },
    { key: 'purification', label: language === 'tr' ? 'Su Saflaştırma' : 'Water Purification' },
    { key: 'pharma', label: language === 'tr' ? 'Farmasötik Test' : 'Pharmaceutical Testing' },
  ]

  const services = [
    {
      title: t.services.items.technical.title,
      description: t.services.items.technical.description,
      icon: <Wrench className="w-8 h-8" />
    },
    {
      title: t.services.items.installation.title,
      description: t.services.items.installation.description,
      icon: <Settings className="w-8 h-8" />
    },
    {
      title: t.services.items.consumables.title,
      description: t.services.items.consumables.description,
      icon: <Beaker className="w-8 h-8" />
    },
    {
      title: t.services.items.consulting.title,
      description: t.services.items.consulting.description,
      icon: <Headphones className="w-8 h-8" />
    }
  ]

  const testimonials = [
    {
      name: 'Dr. Ahmet Yılmaz',
      role: language === 'tr' ? 'Laboratuvar Müdürü' : 'Laboratory Director',
      company: 'Ege Üniversitesi',
      content: language === 'tr'
        ? 'Antest ile 10 yılı aşkın süredir çalışıyoruz. Teknik servis hizmetleri ve ürün kalitesi mükemmel. Her zaman güvenle tercih ediyoruz.'
        : 'We have been working with Antest for over 10 years. Technical service and product quality are excellent. We always prefer with confidence.',
      rating: 5
    },
    {
      name: 'Selin Kaya',
      role: language === 'tr' ? 'Kalite Müdürü' : 'Quality Manager',
      company: 'Pharma Co.',
      content: language === 'tr'
        ? 'Cihaz kurulumu ve eğitim hizmetleri çok profesyoneldi. Ekibin ilgisi ve uzmanlığı sayesinde laboratuvarımızı çok kısa sürede kurduk.'
        : 'Device installation and training services were very professional. Thanks to the team\'s attention and expertise, we set up our laboratory in a very short time.',
      rating: 5
    },
    {
      name: 'Mehmet Demir',
      role: language === 'tr' ? 'Araştırma Görevlisi' : 'Research Assistant',
      company: 'İTÜ',
      content: language === 'tr'
        ? 'Fiyat performans açısından en iyi seçenek. Ürün çeşitliliği çok geniş ve her bütçeye uygun alternatifler var.'
        : 'The best option in terms of price performance. Product variety is very wide and there are alternatives suitable for every budget.',
      rating: 5
    }
  ]

  const faqItems = [
    {
      question: language === 'tr' ? 'Cihazların garanti süresi ne kadar?' : 'What is the warranty period for devices?',
      answer: language === 'tr' 
        ? 'Tüm cihazlarımız 2 yıl garantilidir. Garanti süresi içinde teknik servis hizmetleri ücretsizdir.'
        : 'All our devices have a 2-year warranty. Technical service services are free during the warranty period.'
    },
    {
      question: language === 'tr' ? 'Teknik servis hizmeti veriyor musunuz?' : 'Do you provide technical service?',
      answer: language === 'tr'
        ? 'Evet, uzman teknik servis ekibimiz tüm Türkiye\'de 7/24 hizmet vermektedir.'
        : 'Yes, our expert technical service team serves 7/24 all over Turkey.'
    },
    {
      question: language === 'tr' ? 'Kurulum ve eğitim hizmeti var mı?' : 'Is there installation and training service?',
      answer: language === 'tr'
        ? 'Evet, tüm cihazlarımız için kurulum ve kullanıcı eğitimi hizmeti sunuyoruz.'
        : 'Yes, we offer installation and user training services for all our devices.'
    },
    {
      question: language === 'tr' ? 'Nasıl sipariş verebilirim?' : 'How can I order?',
      answer: language === 'tr'
        ? 'Telefon, e-posta veya web sitemiz üzerinden bizimle iletişime geçebilirsiniz. Size özel fiyat teklifi hazırlıyoruz.'
        : 'You can contact us by phone, email or through our website. We prepare a special price quote for you.'
    }
  ]

  const blogPosts = [
    {
      title: language === 'tr' ? '2024 Laboratuvar Ekipmanları Trendleri' : '2024 Laboratory Equipment Trends',
      excerpt: language === 'tr'
        ? 'Yeni nesil laboratuvar cihazlarında otomasyon, yapay zeka ve sürdürülebilirlik öne çıkıyor...'
        : 'Automation, artificial intelligence and sustainability stand out in new generation laboratory devices...',
      date: '15 Şubat 2024',
      author: 'Antest Ekibi',
      category: language === 'tr' ? 'Sektör' : 'Industry',
      image: '/images/hero-lab.jpg'
    },
    {
      title: language === 'tr' ? 'Analitik Terazi Seçim Rehberi' : 'Analytical Balance Selection Guide',
      excerpt: language === 'tr'
        ? 'Laboratuvarınız için en uygun analitik teraziyi seçerken dikkat etmeniz gerekenler...'
        : 'What you need to consider when choosing the most suitable analytical balance for your laboratory...',
      date: '10 Şubat 2024',
      author: 'Teknik Ekibimiz',
      category: language === 'tr' ? 'Rehber' : 'Guide',
      image: '/images/product-balance.jpg'
    },
    {
      title: language === 'tr' ? 'Yeni Ürün: JSR Vakumlu Etüv Serisi' : 'New Product: JSR Vacuum Oven Series',
      excerpt: language === 'tr'
        ? 'Yüksek hassasiyetli vakumlu etüv serisi laboratuvarlarınıza güç katıyor...'
        : 'High precision vacuum oven series adds power to your laboratories...',
      date: '5 Şubat 2024',
      author: 'Ürün Ekibi',
      category: language === 'tr' ? 'Yeni Ürün' : 'New Product',
      image: '/images/product-etuv.jpg'
    }
  ]

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6">
            <Microscope className="w-14 h-14 text-white" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-2"
          >
            ANTEST
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-sm mb-8"
          >
            {language === 'tr' ? 'Analitik & Test Cihazları' : 'Analytical & Test Equipment'}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.6, duration: 1.2, ease: 'easeInOut' }}
            className="h-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div id="main-content" className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950' : 'bg-white'}`}>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+902323434949" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+90 (232) 343 49 49</span>
            </a>
            <a href="mailto:info@antest.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@antest.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {/* Live Status */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs hidden sm:inline">{t.liveStatus}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden md:inline">Bornova, İzmir</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/95 backdrop-blur-md shadow-lg'
          : isDarkMode 
            ? 'bg-slate-900' 
            : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Microscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>ANTEST</h1>
                <p className={`text-xs -mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {language === 'tr' ? 'Analitik & Test Cihazları' : 'Analytical & Test Equipment'}
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-medium transition-colors relative group ${
                    isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
                </a>
              ))}
              
              {/* Search Button */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </button>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <Button onClick={() => setShowCatalog(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                <Package className="w-4 h-4 mr-2" />
                {t.nav.catalog}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className={`w-6 h-6 ${isDarkMode ? 'text-white' : ''}`} /> : <Menu className={`w-6 h-6 ${isDarkMode ? 'text-white' : ''}`} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`block py-2 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  onClick={() => { setShowCatalog(true); setIsMobileMenuOpen(false) }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                  <Package className="w-4 h-4 mr-2" />
                  {t.nav.catalog}
                </Button>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
                  >
                    <Globe className="w-5 h-5" />
                    {language === 'tr' ? 'English' : 'Türkçe'}
                  </button>
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    {isDarkMode ? (language === 'tr' ? 'Aydınlık' : 'Light') : (language === 'tr' ? 'Karanlık' : 'Dark')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className={`sm:max-w-lg ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : ''}>{t.products.search}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder={t.products.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : ''}
            />
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                  }`}
                  onClick={() => {
                    setIsSearchOpen(false)
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : ''}`}>{product.title}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{product.description}</p>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <p className={`text-center py-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {language === 'tr' ? 'Sonuç bulunamadı' : 'No results found'}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-lab.jpg" 
            alt="Modern Laboratory" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">{t.hero.badge}</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {t.hero.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {t.hero.titleHighlight}
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-300 mb-8 leading-relaxed"
            >
              {t.hero.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                {t.hero.explore}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                {t.hero.contact}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-8"
            >
              <div>
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={30} suffix="+" />
                </div>
                <div className="text-slate-400 text-sm">{t.hero.stats.experience}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={500} suffix="+" />
                </div>
                <div className="text-slate-400 text-sm">{t.hero.stats.customers}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter value={50} suffix="+" />
                </div>
                <div className="text-slate-400 text-sm">{t.hero.stats.brands}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t.about.badge}
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.about.title}
              </h2>
              <p className={`leading-relaxed mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.about.description1}
              </p>
              <p className={`leading-relaxed mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.about.description2}
              </p>
              
              <div className="space-y-4">
                {t.about.features.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-20 blur-2xl" />
                <div className={`relative rounded-2xl shadow-xl p-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                      <Microscope className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                      <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <AnimatedCounter value={1000} suffix="+" />
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.about.stats.products}</div>
                    </div>
                    <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                      <Settings className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                      <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>24/7</div>
                      <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.about.stats.support}</div>
                    </div>
                    <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                      <FileText className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                      <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <AnimatedCounter value={50} suffix="+" />
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.about.stats.certificates}</div>
                    </div>
                    <div className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                      <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                      <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        <AnimatedCounter value={81} />
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.about.stats.cities}</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className={`py-20 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t.products.badge}
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.products.title}
              </h2>
              <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.products.description}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                  isDarkMode ? 'bg-slate-800' : 'bg-white'
                }`} onClick={() => setSelectedProduct(index)}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="bg-blue-600/90 backdrop-blur-sm p-2 rounded-lg inline-flex mb-2">
                        {product.icon}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                        <Expand className="w-4 h-4 text-slate-700" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{product.title}</h3>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{product.description}</p>
                    <span className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
                      {t.products.details}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="rounded-full px-8 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" onClick={() => setShowCatalog(true)}>
                {t.products.viewAll}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Brands Section with Carousel */}
      <section className="py-20 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t.brands.badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t.brands.title}
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                {t.brands.description}
              </p>
            </div>
          </ScrollReveal>

          {/* Scrolling Brands */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10" />
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
              className="flex gap-6"
            >
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-8 py-6 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <span className="text-white font-semibold whitespace-nowrap">{brand}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-20 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t.services.badge}
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.services.title}
              </h2>
              <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.services.description}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div 
                  className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group ${
                    isDarkMode ? 'bg-slate-800' : 'bg-white'
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                  <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{service.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t.testimonials.badge}
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.testimonials.title}
              </h2>
              <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.testimonials.description}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className={`h-full ${isDarkMode ? 'bg-slate-800 border-slate-700' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className={`mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{testimonial.content}</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{testimonial.name}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{testimonial.role}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t.faq.badge}
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.faq.title}
              </h2>
              <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.faq.description}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className={isDarkMode ? 'border-slate-700' : ''}>
                  <AccordionTrigger className={`text-left ${isDarkMode ? 'text-white hover:text-blue-400' : ''}`}>
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      {item.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t.blog.badge}
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.blog.title}
              </h2>
              <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.blog.description}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card className={`group overflow-hidden h-full ${isDarkMode ? 'bg-slate-800 border-slate-700' : ''}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className={`flex items-center gap-4 text-sm mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {post.title}
                    </h3>
                    <p className={`mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{post.excerpt}</p>
                    <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                      {t.blog.readMore}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
              <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {t.cta.title}
                </h2>
                <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                  {t.cta.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8">
                    <Phone className="w-5 h-5 mr-2" />
                    {t.cta.call}
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                    <Mail className="w-5 h-5 mr-2" />
                    {t.cta.email}
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t.contact.badge}
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.contact.title}
              </h2>
              <p className={`mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.contact.description}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.contact.address}</h4>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                      538 Sokak No:48/101-102<br />
                      Mehmet İnce Sitesi C Blok<br />
                      35040 Bornova, İzmir
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.contact.phone}</h4>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                      <a href="tel:+902323434949" className="hover:text-blue-600 transition-colors">
                        +90 (232) 343 49 49
                      </a>
                    </p>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                      <a href="tel:+902323436324" className="hover:text-blue-600 transition-colors">
                        +90 (232) 343 63 24
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.contact.email}</h4>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                      <a href="mailto:info@antest.com" className="hover:text-blue-600 transition-colors">
                        info@antest.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className={`rounded-2xl shadow-lg p-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.contact.form.title}</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.contact.form.firstName}</label>
                      <Input 
                        type="text" 
                        className={`rounded-xl ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
                        placeholder={t.contact.form.firstName}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.contact.form.lastName}</label>
                      <Input 
                        type="text" 
                        className={`rounded-xl ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
                        placeholder={t.contact.form.lastName}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.contact.form.email}</label>
                    <Input 
                      type="email" 
                      className={`rounded-xl ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.contact.form.phone}</label>
                    <Input 
                      type="tel" 
                      className={`rounded-xl ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{t.contact.form.message}</label>
                    <textarea 
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500' 
                          : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      }`}
                      placeholder={t.contact.form.message}
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3">
                    {t.contact.form.send}
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Google Maps */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.5!2d27.2167!3d38.4667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd8a1a7a0d0d1%3A0x0!2sBornova%2C%20%C4%B0zmir!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Antest Location"
                className="w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Microscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">ANTEST</h3>
                </div>
              </div>
              <p className="text-slate-400 mb-6">
                {t.footer.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a 
                      href={item.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">{t.footer.categories}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t.products.categories.ovens}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t.products.categories.balances}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t.products.categories.centrifuges}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t.products.categories.incubators}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">pH {language === 'tr' ? 'Metreler' : 'Meters'}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">{t.footer.contact}</h4>
              <ul className="space-y-3 text-slate-400">
                <li>538 Sokak No:48/101-102</li>
                <li>Mehmet İnce Sitesi C Blok</li>
                <li>35040 Bornova, İzmir</li>
                <li className="pt-2">
                  <a href="tel:+902323434949" className="hover:text-white transition-colors">
                    +90 (232) 343 49 49
                  </a>
                </li>
                <li>
                  <a href="mailto:info@antest.com" className="hover:text-white transition-colors">
                    info@antest.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 ANTEST. {t.footer.rights}
            </p>
            <p className="text-slate-500 text-sm">
              {t.footer.company}
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/902323434949"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </div>
      </motion.a>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* PDF Download Floating Button */}
      <motion.button
        onClick={handleDownloadPdf}
        disabled={isGeneratingPdf}
        className="fixed bottom-20 right-6 z-50 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={t.downloadPdf}
      >
        <div className="relative">
          {isGeneratingPdf ? (
            <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FileDown className="w-7 h-7" />
          )}
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {t.downloadPdf}
        </span>
      </motion.button>

      {/* KVKK / Cookie Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 border-t ${
              isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-slate-200'
            } backdrop-blur-md`}
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
              <Cookie className={`w-8 h-8 flex-shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <p className={`text-sm flex-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'tr'
                  ? 'Bu web sitesi, deneyiminizi iyileştirmek için çerezler kullanmaktadır. Sitemizi kullanarak KVKK kapsamındaki çerez politikamızı kabul etmiş olursunuz.'
                  : 'This website uses cookies to improve your experience. By using our site, you accept our cookie policy under KVKK regulations.'}
              </p>
              <div className="flex gap-3 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className={`rounded-full ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-800' : ''}`}
                  onClick={() => {
                    localStorage.setItem('antest-cookie-consent', 'rejected')
                    setShowCookieBanner(false)
                  }}
                >
                  {language === 'tr' ? 'Reddet' : 'Decline'}
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                  onClick={() => {
                    localStorage.setItem('antest-cookie-consent', 'accepted')
                    setShowCookieBanner(false)
                  }}
                >
                  {language === 'tr' ? 'Kabul Et' : 'Accept'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Catalog Fullscreen Overlay */}
      <AnimatePresence>
        {showCatalog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] overflow-y-auto ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}
          >
            {/* Catalog Header */}
            <div className={`sticky top-0 z-10 border-b backdrop-blur-md ${isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => { setShowCatalog(false); setSelectedCatalogProduct(null) }}
                      className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {t.catalog.title}
                      </h1>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t.catalog.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleDownloadPdf}
                      disabled={isGeneratingPdf}
                      size="sm"
                      variant="outline"
                      className="hidden sm:flex rounded-full"
                    >
                      {isGeneratingPdf ? (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <FileDown className="w-4 h-4 mr-2" />
                      )}
                      PDF
                    </Button>
                    <button
                      onClick={() => { setShowCatalog(false); setSelectedCatalogProduct(null) }}
                      className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Search & Filters Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      placeholder={t.catalog.search}
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${
                        isDarkMode
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={catalogCategory}
                      onChange={(e) => setCatalogCategory(e.target.value)}
                      className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl border text-sm cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-800 border-slate-700 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      {categoryFilterOptions.map(cat => (
                        <option key={cat.key} value={cat.key}>{cat.label}</option>
                      ))}
                    </select>
                    <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                  </div>

                  {/* Brand Filter */}
                  <div className="relative">
                    <select
                      value={catalogBrand}
                      onChange={(e) => setCatalogBrand(e.target.value)}
                      className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl border text-sm cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-800 border-slate-700 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="all">{t.catalog.allBrands}</option>
                      {catalogBrandList.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                  </div>

                  {/* View Toggle & Sort */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCatalogView('grid')}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        catalogView === 'grid'
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : isDarkMode ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                      }`}
                      title={t.catalog.gridView}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCatalogView('list')}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        catalogView === 'list'
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : isDarkMode ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                      }`}
                      title={t.catalog.listView}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <div className="relative">
                      <select
                        value={catalogSort}
                        onChange={(e) => setCatalogSort(e.target.value)}
                        className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl border text-sm cursor-pointer ${
                          isDarkMode
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-200 text-slate-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="default">{t.catalog.sortDefault}</option>
                        <option value="nameAZ">{t.catalog.sortNameAZ}</option>
                        <option value="nameZA">{t.catalog.sortNameZA}</option>
                        <option value="brand">{t.catalog.sortBrand}</option>
                      </select>
                      <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Catalog Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Results count & clear filters */}
              <div className="flex items-center justify-between mb-6">
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span className="font-semibold text-blue-600">{filteredCatalogProducts.length}</span> {t.catalog.results}
                </p>
                {(catalogCategory !== 'all' || catalogBrand !== 'all' || catalogSearch !== '') && (
                  <button
                    onClick={() => { setCatalogCategory('all'); setCatalogBrand('all'); setCatalogSearch(''); setCatalogSort('default') }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    {t.catalog.clearFilters}
                  </button>
                )}
              </div>

              {/* Product Detail View */}
              {selectedCatalogProduct !== null ? (
                (() => {
                  const product = catalogProducts.find(p => p.id === selectedCatalogProduct)
                  if (!product) return null
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-3xl mx-auto"
                    >
                      <button
                        onClick={() => setSelectedCatalogProduct(null)}
                        className={`flex items-center gap-2 text-sm mb-6 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        {t.catalog.backToCatalog}
                      </button>

                      <div className={`rounded-2xl overflow-hidden border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-lg`}>
                        {/* Header with icon and badges */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                {product.icon}
                              </div>
                              <div>
                                <h2 className="text-2xl font-bold">{product.name}</h2>
                                <p className="text-blue-100 text-sm mt-1">{product.category}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {product.isNew && (
                                <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                                  {t.catalog.new}
                                </span>
                              )}
                              {product.isPopular && (
                                <span className="bg-yellow-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                                  {t.catalog.popular}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="p-6 space-y-6">
                          {/* Brand & Model */}
                          <div className="flex gap-4">
                            <div className={`flex-1 p-4 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                              <p className={`text-xs uppercase tracking-wide mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{t.catalog.brand}</p>
                              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{product.brand}</p>
                            </div>
                            <div className={`flex-1 p-4 rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                              <p className={`text-xs uppercase tracking-wide mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{t.catalog.model}</p>
                              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{product.model}</p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className={`leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {product.description}
                          </p>

                          {/* Specs */}
                          <div>
                            <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              <FileText className="w-4 h-4 text-blue-600" />
                              {t.catalog.specs}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {product.specs.map((spec, i) => (
                                <div key={i} className={`flex items-center gap-2 text-sm p-3 rounded-lg ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
                                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                  {spec}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-2">
                            <Button
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                              onClick={() => {
                                setShowCatalog(false)
                                setSelectedCatalogProduct(null)
                                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300)
                              }}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              {t.catalog.getQuote}
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50"
                              onClick={() => window.open('https://wa.me/902323434949', '_blank')}
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              WhatsApp
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })()
              ) : (
                <>
                  {/* Grid View */}
                  {catalogView === 'grid' ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredCatalogProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`group rounded-xl border overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                            isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-blue-300'
                          }`}
                          onClick={() => setSelectedCatalogProduct(product.id)}
                        >
                          {/* Card Header with gradient */}
                          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 relative">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white mb-2">
                              {product.icon}
                            </div>
                            <div className="absolute top-3 right-3 flex gap-1.5">
                              {product.isNew && (
                                <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                                  {t.catalog.new}
                                </span>
                              )}
                              {product.isPopular && (
                                <span className="bg-yellow-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                                  <Star className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="p-4">
                            <p className="text-blue-600 text-xs font-medium mb-1">{product.brand}</p>
                            <h3 className={`font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              {product.name}
                            </h3>
                            <p className={`text-xs mb-3 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge className={`text-[10px] ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                                {product.model}
                              </Badge>
                              <span className="text-blue-600 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                {t.catalog.details}
                                <ChevronRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    /* List View */
                    <div className="space-y-3">
                      {filteredCatalogProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`group flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                            isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-blue-300'
                          }`}
                          onClick={() => setSelectedCatalogProduct(product.id)}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                            {product.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-semibold text-sm truncate group-hover:text-blue-600 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {product.name}
                              </h3>
                              {product.isNew && (
                                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                                  {t.catalog.new}
                                </span>
                              )}
                              {product.isPopular && (
                                <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                                  {t.catalog.popular}
                                </span>
                              )}
                            </div>
                            <p className={`text-xs truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              {product.description}
                            </p>
                          </div>
                          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                            <Badge className={`${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                              {product.brand}
                            </Badge>
                            <Badge className={`${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-blue-50 text-blue-600'}`}>
                              {product.model}
                            </Badge>
                          </div>
                          <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-slate-600' : 'text-slate-300'} group-hover:text-blue-600 transition-colors`} />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* No Results */}
                  {filteredCatalogProducts.length === 0 && (
                    <div className="text-center py-16">
                      <Search className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-slate-700' : 'text-slate-300'}`} />
                      <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {t.catalog.noResults}
                      </p>
                      <button
                        onClick={() => { setCatalogCategory('all'); setCatalogBrand('all'); setCatalogSearch('') }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {t.catalog.clearFilters}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <Dialog open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className={`sm:max-w-2xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
          {selectedProduct !== null && products[selectedProduct] && (
            <>
              <DialogHeader>
                <DialogTitle className={`text-2xl ${isDarkMode ? 'text-white' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      {products[selectedProduct].icon}
                    </div>
                    {products[selectedProduct].title}
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={products[selectedProduct].image}
                    alt={products[selectedProduct].title}
                    className="w-full h-56 object-cover"
                  />
                </div>
                <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                  {products[selectedProduct].description}
                </p>
                <div>
                  <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'tr' ? 'Teknik Özellikler' : 'Specifications'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {products[selectedProduct].details.specs.map((spec, i) => (
                      <div key={i} className={`flex items-center gap-2 text-sm p-2 rounded-lg ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {language === 'tr' ? 'Markalar' : 'Brands'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {products[selectedProduct].details.brands.map((brand, i) => (
                      <Badge key={i} className="bg-blue-100 text-blue-700 hover:bg-blue-200">{brand}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                    <Phone className="w-4 h-4 mr-2" />
                    {language === 'tr' ? 'Teklif Al' : 'Get Quote'}
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => {
                      setSelectedProduct(null)
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {language === 'tr' ? 'İletişime Geç' : 'Contact Us'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
