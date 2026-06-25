
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Users, Target, TrendingUp, Star } from 'lucide-react';

const HeroSection = () => {
  const stats = [
    { label: 'Kampanye Aktif', value: '2,450+', icon: Target },
    { label: 'Service Provider', value: '12,890+', icon: Users },
    { label: 'Total Views', value: '45M+', icon: Play },
    { label: 'Rating Rata-rata', value: '4.9', icon: Star }
  ];

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-brand-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Platform{' '}
              <span className="bg-hero-gradient bg-clip-text text-transparent">
                Engagement
              </span>{' '}
              Media Sosial Terpercaya
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Hubungkan pemasang iklan dengan penyedia jasa engagement berkualitas. 
              Tingkatkan view, subscriber, dan interaksi media sosial Anda dengan mudah dan aman.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-hero-gradient hover:opacity-90 text-lg px-8 py-6"
              >
                Mulai Kampanye
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-brand-200 text-brand-700 text-lg px-8 py-6"
              >
                Jadi Service Provider
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="relative z-10">
              <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-hero-gradient rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">YouTube Campaign</h3>
                      <p className="text-sm text-gray-600">1,000 Views • Rp 150,000</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-brand-600 font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-hero-gradient h-2 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">850 / 1,000 Views</span>
                    <span className="text-green-600 font-semibold">2 jam tersisa</span>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-hero-gradient rounded-3xl transform rotate-6 scale-110 opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
