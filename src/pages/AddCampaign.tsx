
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AddCampaignForm from '@/components/campaigns/AddCampaignForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp } from 'lucide-react';

const AddCampaign = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSuccess = () => {
    navigate('/dashboard/advertiser');
  };

  const handleCancel = () => {
    navigate('/dashboard/advertiser');
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
                onClick={() => navigate('/dashboard/advertiser')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Tambah Kampanye Baru
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
      <main className="py-8">
        <AddCampaignForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </main>
    </div>
  );
};

export default AddCampaign;
