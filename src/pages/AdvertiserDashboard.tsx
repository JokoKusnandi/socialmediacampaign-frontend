
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, TrendingUp, DollarSign, Clock, BarChart } from 'lucide-react';
import CampaignList from '@/components/campaigns/CampaignList';
import { Campaign } from '@/types/campaign';

const AdvertiserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
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
      status: 'partial',
      advertiser_id: user?.id || '',
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

  // Calculate dashboard stats
  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'partial').length;
  const totalSpent = campaigns.filter(c => c.payment_status === 'paid').reduce((sum, c) => sum + c.total_cost, 0);
  const totalEngagement = campaigns.reduce((sum, campaign) => {
    return sum + campaign.services.reduce((serviceSum, service) => {
      return serviceSum + (service.completed_amount || 0);
    }, 0);
  }, 0);

  const handleCreateCampaign = () => {
    navigate('/campaigns/add');
  };

  const handleManageCampaigns = () => {
    navigate('/campaigns/manage');
  };

  const handlePayCampaign = (campaignId: string) => {
    console.log('Processing payment for campaign:', campaignId);
    // Implement payment processing
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard Pemasang Iklan
              </h1>
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
              <CardTitle className="text-sm font-medium">Kampanye Aktif</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCampaigns}</div>
              <p className="text-xs text-muted-foreground">
                {activeCampaigns === 0 ? 'Tidak ada kampanye aktif' : 'Sedang berjalan'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {totalSpent.toLocaleString('id-ID')}</div>
              <p className="text-xs text-muted-foreground">
                {totalSpent === 0 ? 'Belum ada transaksi' : 'Total yang sudah dibayar'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Total</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEngagement.toLocaleString('id-ID')}</div>
              <p className="text-xs text-muted-foreground">
                Views, likes, comments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalSpent > 0 ? `${Math.round((totalEngagement / totalSpent) * 100)}%` : '0%'}
              </div>
              <p className="text-xs text-muted-foreground">
                Return on Investment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Buat Kampanye Baru</CardTitle>
              <CardDescription>
                Mulai kampanye promosi untuk meningkatkan engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-hero-gradient hover:opacity-90"
                onClick={handleCreateCampaign}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Buat Kampanye
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kelola Kampanye</CardTitle>
              <CardDescription>
                Pantau dan kelola kampanye yang sedang berjalan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleManageCampaigns}
              >
                <BarChart className="w-4 h-4 mr-2" />
                Kelola Semua Kampanye
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Campaign List */}
        <Card>
          <CardHeader>
            <CardTitle>Kampanye Terbaru</CardTitle>
            <CardDescription>
              Daftar kampanye yang baru dibuat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CampaignList 
              campaigns={campaigns.slice(0, 3)}
              userRole="advertiser"
              onPayCampaign={handlePayCampaign}
            />
            {campaigns.length > 3 && (
              <div className="mt-4 text-center">
                <Button 
                  variant="outline"
                  onClick={handleManageCampaigns}
                >
                  Lihat Semua Kampanye ({campaigns.length})
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdvertiserDashboard;
