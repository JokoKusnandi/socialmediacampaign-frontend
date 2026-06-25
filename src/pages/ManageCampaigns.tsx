import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Plus,
  Calendar,
  DollarSign,
  Target,
  Users
} from 'lucide-react';
import { 
  Campaign, 
  CAMPAIGN_STATUS_LABELS, 
  CAMPAIGN_STATUS_BADGES,
  PLATFORM_LABELS,
  SERVICE_LABELS
} from '@/types/campaign';
import CampaignDetailModal from '@/components/campaigns/CampaignDetailModal';
import EditCampaignModal from '@/components/campaigns/EditCampaignModal';
import PaymentModal from '@/components/campaigns/PaymentModal';
import DeleteCampaignModal from '@/components/campaigns/DeleteCampaignModal';

const ManageCampaigns = () => {
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
    },
    {
      id: '2',
      title: 'Kampanye Instagram Produk Fashion',
      platform: 'instagram',
      target_url: 'https://www.instagram.com/p/example',
      services: [
        { type: 'like', target_amount: 500, price_per_unit: 60, completed_amount: 0 },
        { type: 'follow', target_amount: 200, price_per_unit: 120, completed_amount: 0 }
      ],
      budget: 150000,
      start_date: '2025-01-10',
      end_date: '2025-01-20',
      status: 'pending',
      advertiser_id: user?.id || '',
      created_at: '2024-12-22',
      updated_at: '2024-12-22',
      payment_status: 'unpaid',
      total_cost: 54000,
      progress: [
        { service_type: 'like', target_amount: 500, completed_amount: 0 },
        { service_type: 'follow', target_amount: 200, completed_amount: 0 }
      ]
    },
    {
      id: '3',
      title: 'TikTok Dance Challenge',
      platform: 'tiktok',
      target_url: 'https://www.tiktok.com/@example',
      services: [
        { type: 'view', target_amount: 5000, price_per_unit: 25, completed_amount: 5000 },
        { type: 'like', target_amount: 300, price_per_unit: 50, completed_amount: 300 }
      ],
      budget: 300000,
      start_date: '2024-12-15',
      end_date: '2024-12-25',
      status: 'completed',
      advertiser_id: user?.id || '',
      created_at: '2024-12-10',
      updated_at: '2024-12-25',
      payment_method: 'gopay',
      payment_status: 'paid',
      total_cost: 140000,
      progress: [
        { service_type: 'view', target_amount: 5000, completed_amount: 5000 },
        { service_type: 'like', target_amount: 300, completed_amount: 300 }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Modal states
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  const getProgressPercentage = (campaign: Campaign) => {
    if (!campaign.progress || campaign.progress.length === 0) return 0;
    
    const totalProgress = campaign.progress.reduce((sum, progress) => {
      return sum + (progress.completed_amount / progress.target_amount);
    }, 0);
    
    return Math.round((totalProgress / campaign.progress.length) * 100);
  };

  const getStatusVariant = (status: Campaign['status']) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'active': return 'default';
      case 'partial': return 'secondary';
      case 'completed': return 'default';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleViewDetails = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setSelectedCampaign(campaign);
      setIsDetailModalOpen(true);
    }
  };

  const handleEditCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setSelectedCampaign(campaign);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setSelectedCampaign(campaign);
      setIsDeleteModalOpen(true);
    }
  };

  const handlePayCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setSelectedCampaign(campaign);
      setIsPaymentModalOpen(true);
    }
  };

  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    // In a real app, this would make an API call
    console.log('Updating campaign:', updatedCampaign);
    // Mock update - in real app you'd update the campaigns state or refetch data
  };

  const handlePaymentSuccess = (campaignId: string, paymentProof?: string) => {
    // In a real app, this would make an API call to update payment status
    console.log('Payment successful for campaign:', campaignId, 'proof:', paymentProof);
    // Mock update - change status to active
  };

  const handleCampaignDelete = (campaignId: string) => {
    // In a real app, this would make an API call to delete the campaign
    console.log('Deleting campaign:', campaignId);
    // Mock delete - in real app you'd remove from campaigns state or refetch data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard/advertiser')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                Kelola Kampanye
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.full_name}
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Kampanye</p>
                  <p className="text-2xl font-bold">{campaigns.length}</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sedang Berjalan</p>
                  <p className="text-2xl font-bold">
                    {campaigns.filter(c => c.status === 'active' || c.status === 'partial').length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Selesai</p>
                  <p className="text-2xl font-bold">
                    {campaigns.filter(c => c.status === 'completed').length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Biaya</p>
                  <p className="text-2xl font-bold">
                    Rp {campaigns.filter(c => c.payment_status === 'paid').reduce((sum, c) => sum + c.total_cost, 0).toLocaleString('id-ID')}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <CardTitle>Daftar Kampanye</CardTitle>
              <Button 
                className="bg-hero-gradient hover:opacity-90"
                onClick={() => navigate('/campaigns/add')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Buat Kampanye Baru
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Cari kampanye..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Berjalan</SelectItem>
                  <SelectItem value="partial">Sebagian</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="failed">Gagal</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="oldest">Terlama</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Campaigns Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kampanye</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Layanan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Biaya</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.title}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {campaign.target_url}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {PLATFORM_LABELS[campaign.platform]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {campaign.services.map((service, idx) => (
                            <div key={idx} className="text-sm">
                              {SERVICE_LABELS[service.type]}: {service.target_amount.toLocaleString()}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{CAMPAIGN_STATUS_BADGES[campaign.status]}</span>
                          <Badge variant={getStatusVariant(campaign.status)}>
                            {CAMPAIGN_STATUS_LABELS[campaign.status]}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-20">
                          <div className="text-sm font-medium mb-1">
                            {getProgressPercentage(campaign)}%
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${getProgressPercentage(campaign)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">
                            Rp {campaign.total_cost.toLocaleString('id-ID')}
                          </p>
                          <p className="text-gray-500">
                            Budget: Rp {campaign.budget.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{new Date(campaign.start_date).toLocaleDateString('id-ID')}</p>
                          <p className="text-gray-500">
                            {new Date(campaign.end_date).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(campaign.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {campaign.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditCampaign(campaign.id)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              {campaign.payment_status === 'unpaid' && (
                                <Button
                                  size="sm"
                                  className="bg-hero-gradient hover:opacity-90"
                                  onClick={() => handlePayCampaign(campaign.id)}
                                >
                                  Bayar
                                </Button>
                              )}
                            </>
                          )}
                          {campaign.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCampaign(campaign.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredCampaigns.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Tidak ada kampanye yang sesuai dengan filter.'
                    : 'Belum ada kampanye. Buat kampanye pertama Anda!'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Modals */}
      <CampaignDetailModal
        campaign={selectedCampaign}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <EditCampaignModal
        campaign={selectedCampaign}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateCampaign}
      />

      <PaymentModal
        campaign={selectedCampaign}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <DeleteCampaignModal
        campaign={selectedCampaign}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleCampaignDelete}
      />
    </div>
  );
};

export default ManageCampaigns;
