import { useState, useEffect, useRef } from 'react'
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
  HelpCircle
} from 'lucide-react'
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
    whatsapp: 'Canlı Destek',
    liveStatus: 'Çevrimiçi'
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
    whatsapp: 'Live Support',
    liveStatus: 'Online'
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
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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
      icon: <Thermometer className="w-6 h-6" />
    },
    {
      title: t.products.categories.balances,
      description: language === 'tr'
        ? 'Yüksek hassasiyetli analitik teraziler ve hassas tartım cihazları'
        : 'High precision analytical balances and precision weighing devices',
      image: '/images/product-balance.jpg',
      icon: <Scale className="w-6 h-6" />
    },
    {
      title: t.products.categories.centrifuges,
      description: language === 'tr'
        ? 'Laboratuvar ve endüstriyel kullanıma uygun santrifüj cihazları'
        : 'Centrifuge devices suitable for laboratory and industrial use',
      image: '/images/product-centrifuge.jpg',
      icon: <Wind className="w-6 h-6" />
    },
    {
      title: t.products.categories.incubators,
      description: language === 'tr'
        ? 'CO2 inkübatörler, bakteri inkübatörleri ve iklimlendirme dolapları'
        : 'CO2 incubators, bacteria incubators and climate chambers',
      image: '/images/product-incubator.jpg',
      icon: <FlaskConical className="w-6 h-6" />
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950' : 'bg-white'}`}>
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

              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
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
                <Card className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  isDarkMode ? 'bg-slate-800' : 'bg-white'
                }`}>
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
                  </div>
                  <CardContent className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{product.title}</h3>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{product.description}</p>
                    <a 
                      href="#" 
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      {t.products.details}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="rounded-full px-8 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
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
              © 2024 ANTEST. {t.footer.rights}
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
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
          {t.whatsapp}
        </span>
      </motion.a>
    </div>
  )
}

export default App
