
import { Card } from '@/components/ui/card';
import { 
  UserPlus, 
  FileText, 
  CreditCard, 
  TrendingUp,
  ArrowRight 
} from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      icon: UserPlus,
      title: 'Daftar & Pilih Role',
      description: 'Bergabung sebagai Pemasang Iklan untuk mempromosikan konten atau sebagai Service Provider untuk menyediakan layanan engagement',
      color: 'bg-blue-500'
    },
    {
      step: '02',
      icon: FileText,
      title: 'Buat atau Pilih Kampanye',
      description: 'Pemasang iklan membuat kampanye dengan target dan budget. Service Provider memilih tugas yang sesuai kemampuan',
      color: 'bg-green-500'
    },
    {
      step: '03',
      icon: CreditCard,
      title: 'Pembayaran & Eksekusi',
      description: 'Pembayaran aman melalui sistem escrow. Service Provider mulai mengerjakan tugas sesuai instruksi kampanye',
      color: 'bg-purple-500'
    },
    {
      step: '04',
      icon: TrendingUp,
      title: 'Hasil & Penarikan',
      description: 'Pantau progress real-time. Setelah selesai, Pemasang iklan mendapat hasil dan Service Provider menerima pembayaran',
      color: 'bg-orange-500'
    }
  ];

  const userTypes = [
    {
      title: 'Untuk Pemasang Iklan',
      subtitle: 'Promosikan konten Anda',
      features: [
        'Buat kampanye dengan target spesifik',
        'Tentukan budget dan timeline',
        'Pantau progress real-time',
        'Dapatkan laporan detail',
        'Pembayaran aman dengan escrow'
      ],
      cta: 'Mulai Promosi',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Untuk Service Provider',
      subtitle: 'Hasilkan income dari skill Anda',
      features: [
        'Pilih tugas sesuai kemampuan',
        'Dapatkan penghasilan fleksibel',
        'Upload bukti pekerjaan',
        'Penarikan saldo mudah',
        'Rating & review system'
      ],
      cta: 'Mulai Bekerja',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* How it works steps */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Cara Kerja Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proses sederhana dan aman untuk mempertemukan pemasang iklan dengan service provider berkualitas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 text-center h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </Card>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User type cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {userTypes.map((type, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-xl">
              <div className={`h-2 bg-gradient-to-r ${type.gradient}`}></div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-gray-600">
                    {type.subtitle}
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${type.gradient} rounded-full`}></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full py-3 px-6 bg-gradient-to-r ${type.gradient} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}>
                  {type.cta}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
