
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, DollarSign, Star, Users } from 'lucide-react';
import CampaignList from '@/components/campaigns/CampaignList';
import { Campaign } from '@/types/campaign';

const ServiceProviderDashboard = () => {
  const { user, logout } = useAuth();
  
  // Mock data - replace with real API call
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Promosi Video Tutorial React',
      platform: 'youtube',
      target_url: 'https://www.youtube.com/watch?v=example',
      services: [
        { type: 'view', target_amount: 1000, price_per_unit: 50, completed_amount: 380 },
        { type: 'like', target_amount: 100, price_per_unit: 75, completed_amount: 45 }
      ],
      budget: 200000,
      start_date: '2025-01-01',
      end_date: '2025-01-15',
      status: 'active',
      advertiser_id: 'advertiser-1',
      created_at: '2024-12-20',
      updated_at: '2024-12-20',
      payment_method: 'qris',
      payment_status: 'paid',
      total_cost: 57500,
      progress: [
        { service_type: 'view', target_amount: 1000, completed_amount: 380 },
        { service_type: 'like', target_amount: 100, completed_amount: 45 }
      ]
    }
  ]);

  const availableTasks = campaigns.filter(c => c.status === 'active' || c.status === 'partial').length;
  const completedTasks = 0; // Calculate from completed campaigns
  const monthlyEarnings = 0; // Calculate from completed services

  const handleMarkComplete = (campaignId: string, serviceType: string) => {
    console.log('Marking service complete:', campaignId, serviceType);
    // Implement service completion logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Dashboard Penyedia Jasa
                </h1>
                {user?.is_agency && (
                  <Badge variant="secondary" className="mt-1">
                    Agency: {user.agency_name}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Selamat datang, {user?.full_name}
              </span>
              <Button variant="outline" onClick={logout}>
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tugas Tersedia</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableTasks}</div>
              <p className="text-xs text-muted-foreground">
                Siap untuk dikerjakan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tugas Selesai</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                Bulan ini
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Penghasilan</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {monthlyEarnings.toLocaleString('id-ID')}</div>
              <p className="text-xs text-muted-foreground">
                Total bulan ini
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.0</div>
              <p className="text-xs text-muted-foreground">
                Dari 0 ulasan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Available Campaigns */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Kampanye Tersedia</CardTitle>
            <CardDescription>
              Ambil tugas yang sesuai dengan keahlian Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CampaignList 
              campaigns={campaigns}
              userRole="service_provider"
              onMarkComplete={handleMarkComplete}
            />
          </CardContent>
        </Card>

        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Profil</CardTitle>
            <CardDescription>
              Detail akun dan preferensi kerja Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Tipe Akun</h4>
                <Badge variant={user?.is_agency ? "default" : "secondary"}>
                  {user?.is_agency ? "Agency" : "Individu"}
                </Badge>
              </div>
              
              {user?.is_agency && (
                <>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Jumlah Anggota</h4>
                    <p className="text-sm">{user.team_member_count} orang</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Deskripsi Agency</h4>
                    <p className="text-sm text-gray-600">{user.agency_description}</p>
                  </div>
                </>
              )}
              
              {!user?.is_agency && user?.work_channels && (
                <div className="md:col-span-2">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Channel Kerja</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.work_channels.map((channel, index) => (
                      <Badge key={index} variant="outline">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ServiceProviderDashboard;
