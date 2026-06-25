
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  UserPlus, 
  Clock, 
  Heart, 
  MessageCircle, 
  Eye,
  Zap,
  Shield
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Play,
      title: 'YouTube Views',
      description: 'Tingkatkan jumlah penonton video YouTube Anda',
      price: 'Mulai Rp 100/view',
      features: ['Real viewers', 'Retention tinggi', 'Aman untuk channel']
    },
    {
      icon: UserPlus,
      title: 'Subscribe & Follow',
      description: 'Dapatkan subscriber dan follower organik',
      price: 'Mulai Rp 2,000/subscriber',
      features: ['Akun real', 'Long-term engagement', 'Multi platform']
    },
    {
      icon: Clock,
      title: 'Watch Time',
      description: 'Tingkatkan jam tayang untuk monetisasi',
      price: 'Mulai Rp 50/menit',
      features: ['Natural viewing', 'Boost algorithm', 'Monetization ready']
    },
    {
      icon: Heart,
      title: 'Likes & Reactions',
      description: 'Raih likes dan reactions untuk boost engagement',
      price: 'Mulai Rp 200/like',
      features: ['Instant delivery', 'Real accounts', 'All platforms']
    },
    {
      icon: MessageCircle,
      title: 'Comments',
      description: 'Komentar positif sesuai script yang Anda inginkan',
      price: 'Mulai Rp 1,000/comment',
      features: ['Custom script', 'Native language', 'Engaging replies']
    },
    {
      icon: Eye,
      title: 'Story Views',
      description: 'Tingkatkan viewers untuk Instagram dan Facebook Stories',
      price: 'Mulai Rp 50/view',
      features: ['Fast delivery', 'Real accounts', 'Safe for business']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Layanan Engagement Terlengkap
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berbagai pilihan layanan untuk meningkatkan performa media sosial Anda 
            dengan harga terjangkau dan kualitas terjamin
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="text-2xl font-bold text-brand-600">
                  {service.price}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-hero-gradient hover:opacity-90">
                Pesan Sekarang
              </Button>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">100% Aman</h4>
            <p className="text-gray-600 text-sm">Layanan kami aman dan tidak melanggar ToS platform</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Pengiriman Cepat</h4>
            <p className="text-gray-600 text-sm">Layanan dimulai dalam 24 jam setelah pembayaran</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Real Accounts</h4>
            <p className="text-gray-600 text-sm">Semua engagement dari akun asli dan aktif</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
