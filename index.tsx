import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Scale, 
  Gavel, 
  Users, 
  Building2, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  Mail,
  LucideIcon
} from 'lucide-react';

// --- Types ---

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

// --- Constants & Data ---

const NAV_LINKS: NavLink[] = [
  { label: 'Início', href: '#home' },
  { label: 'Áreas de Atuação', href: '#services' },
  { label: 'Sobre', href: '#about' },
  { label: 'Contato', href: '#contact' },
];

const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: 'Direito Civil',
    description: 'Resolução de conflitos, contratos, responsabilidade civil e proteção patrimonial com estratégia e segurança.',
    icon: Scale
  },
  {
    id: 2,
    title: 'Direito de Família',
    description: 'Atuação sensível e discreta em divórcios, pensões, guarda e inventários, priorizando a harmonia familiar.',
    icon: Users
  },
  {
    id: 3,
    title: 'Direito Trabalhista',
    description: 'Defesa de direitos trabalhistas e consultoria preventiva para empresas, focada na redução de passivos.',
    icon: Building2
  },
  {
    id: 4,
    title: 'Direito Empresarial',
    description: 'Assessoria jurídica completa para empresas, desde a constituição até fusões, aquisições e compliance.',
    icon: Gavel
  }
];

const FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: 'Atendimento Personalizado',
    description: 'Cada caso é único. Tratamos sua demanda com a exclusividade e a atenção que ela merece.',
    icon: Users
  },
  {
    id: 2,
    title: 'Transparência Total',
    description: 'Comunicação clara sobre riscos, prazos e custos. Você sempre informado sobre o andamento do processo.',
    icon: CheckCircle2
  },
  {
    id: 3,
    title: 'Excelência Técnica',
    description: 'Equipe altamente qualificada e em constante atualização para oferecer as melhores teses jurídicas.',
    icon: ShieldCheck
  },
  {
    id: 4,
    title: 'Localização Estratégica',
    description: 'Escritório situado no coração de Sorocaba, com fácil acesso e estacionamento para clientes.',
    icon: MapPin
  }
];

// --- Sub-Components ---

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'outline' | 'text'; 
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}> = ({ children, variant = 'primary', className = '', onClick, fullWidth = false }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-sm tracking-wide uppercase";
  const variants = {
    primary: "bg-gold text-white hover:bg-gold-dark shadow-md hover:shadow-lg",
    outline: "border-2 border-white text-white hover:bg-white hover:text-navy-900",
    text: "text-gold hover:text-gold-dark underline-offset-4 hover:underline p-0 bg-transparent"
  };
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${widthClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const SectionHeading: React.FC<{ 
  title: string; 
  subtitle?: string; 
  centered?: boolean;
  light?: boolean;
}> = ({ title, subtitle, centered = true, light = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${light ? 'text-white' : 'text-navy-900'}`}>
      {title}
    </h2>
    <div className={`h-1 w-20 bg-gold mb-6 ${centered ? 'mx-auto' : ''}`}></div>
    {subtitle && (
      <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

// --- Main Components ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy-900 shadow-lg py-2' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-gold" />
            <div className="text-white font-serif text-xl tracking-wider">
              <span className="font-bold">SILVA & SOUZA</span>
              <span className="block text-xs text-gold tracking-[0.2em] font-sans">ADVOCACIA</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-gray-300 hover:text-gold transition-colors text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <Button className="!py-2 !px-4 text-xs">Agendar Consulta</Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-gold transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-navy-900/95 backdrop-blur-sm shadow-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 py-4' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-gray-200 hover:text-gold py-2 border-b border-gray-800"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button fullWidth onClick={() => setIsOpen(false)}>Agendar via WhatsApp</Button>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Escritório de Advocacia" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/80 bg-gradient-to-t from-navy-900 via-navy-900/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center md:text-left mt-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-navy-900/50 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-gold"></span>
            <span className="text-gold text-xs font-semibold uppercase tracking-wider">Advocacia em Sorocaba/SP</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Advocacia Estratégica & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">
              Compromisso com a Justiça
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 font-light max-w-2xl leading-relaxed">
            Defendendo seus interesses com integridade, técnica jurídica refinada e atendimento personalizado. 
            Especialistas em resolver conflitos complexos.
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Button>
              Fale com um Especialista
            </Button>
            <Button variant="outline">
              Conheça Nossas Áreas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => (
  <div className="group bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 border-b-4 border-transparent hover:border-gold hover:-translate-y-2">
    <div className="mb-6 inline-flex p-3 bg-ice rounded-full text-navy-900 group-hover:bg-navy-900 group-hover:text-gold transition-colors duration-300">
      <item.icon size={32} />
    </div>
    <h3 className="text-xl font-serif font-bold text-navy-900 mb-3 group-hover:text-gold transition-colors">
      {item.title}
    </h3>
    <p className="text-gray-600 leading-relaxed mb-4 text-sm">
      {item.description}
    </p>
    <a href="#contact" className="inline-flex items-center text-sm font-bold text-navy-900 hover:text-gold transition-colors">
      Saiba mais <ArrowRight size={14} className="ml-2" />
    </a>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-ice">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="Áreas de Atuação" 
          subtitle="Oferecemos soluções jurídicas abrangentes, pautadas na ética e na excelência técnica para pessoas físicas e jurídicas."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} item={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-navy-900 text-white relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <Scale size={600} className="transform translate-x-1/2 -translate-y-1/4" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Por que escolher nosso escritório?
            </h2>
            <div className="h-1 w-20 bg-gold mb-8"></div>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Entendemos que por trás de cada processo existem pessoas, histórias e patrimônios. 
              Nossa abordagem combina a tradição do direito com a agilidade necessária para o mundo moderno.
            </p>
            <Button variant="primary">Agendar Consulta Inicial</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.id} className="flex flex-col items-start">
                <div className="p-3 bg-white/10 rounded-lg text-gold mb-4 backdrop-blur-sm">
                  <feature.icon size={24} />
                </div>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold rounded-sm z-0 hidden md:block"></div>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Advogado Sênior" 
              className="relative z-10 w-full h-[500px] object-cover rounded-sm shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-8 right-8 z-20 bg-white p-6 shadow-lg max-w-xs hidden md:block border-l-4 border-gold">
              <p className="font-serif text-xl italic text-navy-900">
                "A justiça é o vínculo das sociedades humanas."
              </p>
            </div>
          </div>
          
          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <SectionHeading 
              title="Sobre o Escritório" 
              centered={false}
              subtitle="Uma trajetória marcada pela dedicação e resultados expressivos na região de Sorocaba."
            />
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Fundado com o propósito de oferecer uma advocacia de excelência, o escritório <strong>Silva & Souza</strong> consolidou-se em Sorocaba como referência em resolução estratégica de conflitos.
              </p>
              <p>
                Nossa filosofia de trabalho baseia-se no estudo aprofundado de cada caso e no contato direto com o cliente. Acreditamos que a confiança é o pilar fundamental da relação advogado-cliente.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <h4 className="text-4xl font-serif font-bold text-navy-900">15+</h4>
                  <p className="text-sm uppercase tracking-wide text-gray-500 mt-1">Anos de Experiência</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif font-bold text-navy-900">800+</h4>
                  <p className="text-sm uppercase tracking-wide text-gray-500 mt-1">Casos Resolvidos</p>
                </div>
              </div>

              <div className="pt-8">
                <div className="flex items-center space-x-4">
                  <img src="https://picsum.photos/id/64/100/100" alt="Assinatura" className="h-12 opacity-60" />
                  <div>
                    <p className="font-bold text-navy-900">Dr. Carlos Silva</p>
                    <p className="text-xs text-gold uppercase font-bold">Sócio Fundador | OAB/SP 000.000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA: React.FC = () => {
  return (
    <section className="py-16 bg-gold text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-6">Precisa de orientação jurídica imediata?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Não deixe suas dúvidas para depois. Entre em contato agora mesmo e agende uma consulta com nossos especialistas.
        </p>
        <button className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-4 rounded-sm font-semibold transition-colors shadow-lg inline-flex items-center">
          <Phone className="mr-2" size={20} />
          Falar no WhatsApp
        </button>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white pt-20 pb-10 border-t border-gray-800" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-gold" />
              <div className="font-serif text-lg font-bold tracking-wider">
                SILVA & SOUZA
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advocacia comprometida com a ética e a defesa intransigente dos direitos de nossos clientes.
            </p>
            <div className="flex space-x-4">
              {/* Social Placeholders */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold transition-colors cursor-pointer">
                  <span className="text-xs">IG</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gold font-bold uppercase tracking-wider text-sm mb-6">Navegação</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-bold uppercase tracking-wider text-sm mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin className="min-w-[16px] mt-1 text-gold" size={16} />
                <span>Av. Antônio Carlos Comitre, 1234<br/>Parque Campolim, Sorocaba - SP</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="min-w-[16px] text-gold" size={16} />
                <span>(15) 3232-0000</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="min-w-[16px] text-gold" size={16} />
                <span>contato@silvaesouza.adv.br</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Clock className="min-w-[16px] text-gold" size={16} />
                <span>Seg - Sex: 08h às 18h</span>
              </li>
            </ul>
          </div>

          {/* Map Simulation */}
          <div className="w-full h-48 bg-gray-800 rounded-sm relative overflow-hidden group">
            {/* Using an image to simulate a map for design purposes */}
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Mapa Sorocaba" 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button variant="outline" className="text-xs px-3 py-1 border-gray-400 text-gray-200">Ver no Google Maps</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Silva & Souza Advocacia. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">Desenvolvido para Sorocaba/SP</p>
        </div>
      </div>
    </footer>
  );
};

// --- App Root ---

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-navy-900 bg-ice min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Features />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);