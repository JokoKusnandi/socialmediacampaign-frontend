
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Campaign, 
  CAMPAIGN_STATUS_LABELS, 
  CAMPAIGN_STATUS_BADGES,
  PAYMENT_STATUS_LABELS,
  PLATFORM_LABELS,
  SERVICE_LABELS
} from '@/types/campaign';
import { Calendar, DollarSign, Target, Users } from 'lucide-react';

interface CampaignListProps {
  campaigns: Campaign[];
  userRole: 'advertiser' | 'service_provider';
  onPayCampaign?: (campaignId: string) => void;
  onMarkComplete?: (campaignId: string, serviceType: string) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ 
  campaigns, 
  userRole, 
  onPayCampaign,
  onMarkComplete 
}) => {
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

  const filteredCampaigns = userRole === 'service_provider' 
    ? campaigns.filter(c => c.status === 'active' || c.status === 'partial')
    : campaigns;

  if (filteredCampaigns.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8 text-gray-500">
            <p>
              {userRole === 'service_provider' 
                ? 'Belum ada kampanye aktif yang tersedia.'
                : 'Belum ada kampanye. Buat kampanye pertama Anda!'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredCampaigns.map((campaign) => (
        <Card key={campaign.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <span>{CAMPAIGN_STATUS_BADGES[campaign.status]}</span>
                  {campaign.title}
                </CardTitle>
                <CardDescription>
                  {PLATFORM_LABELS[campaign.platform]} • {campaign.target_url}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={getStatusVariant(campaign.status)}>
                  {CAMPAIGN_STATUS_LABELS[campaign.status]}
                </Badge>
                {campaign.payment_status !== 'paid' && userRole === 'advertiser' && (
                  <Badge variant="outline">
                    {PAYMENT_STATUS_LABELS[campaign.payment_status]}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Campaign Services */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Layanan:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {campaign.services.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{SERVICE_LABELS[service.type]}</span>
                    <div className="text-sm text-gray-600">
                      {service.completed_amount || 0}/{service.target_amount}
                      {userRole === 'service_provider' && campaign.status === 'active' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="ml-2"
                          onClick={() => onMarkComplete?.(campaign.id, service.type)}
                        >
                          Selesai
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            {(campaign.status === 'active' || campaign.status === 'partial') && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress Kampanye</span>
                  <span className="text-sm text-gray-600">{getProgressPercentage(campaign)}%</span>
                </div>
                <Progress value={getProgressPercentage(campaign)} className="h-2" />
              </div>
            )}

            {/* Campaign Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-600">Mulai</p>
                  <p className="font-medium">{new Date(campaign.start_date).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-600">Berakhir</p>
                  <p className="font-medium">{new Date(campaign.end_date).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-600">Total Biaya</p>
                  <p className="font-medium">Rp {campaign.total_cost.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-600">Budget</p>
                  <p className="font-medium">Rp {campaign.budget.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {userRole === 'advertiser' && campaign.status === 'pending' && campaign.payment_status === 'unpaid' && (
              <div className="pt-2">
                <Button 
                  onClick={() => onPayCampaign?.(campaign.id)}
                  className="bg-hero-gradient hover:opacity-90"
                >
                  Bayar Sekarang
                </Button>
              </div>
            )}

            {/* Notes */}
            {campaign.notes && (
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600">
                  <strong>Catatan:</strong> {campaign.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CampaignList;
