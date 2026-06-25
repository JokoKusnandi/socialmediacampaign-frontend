
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Campaign, 
  CAMPAIGN_STATUS_LABELS, 
  CAMPAIGN_STATUS_BADGES,
  PLATFORM_LABELS,
  SERVICE_LABELS,
  PAYMENT_STATUS_LABELS
} from '@/types/campaign';
import { Calendar, DollarSign, Target, Users, ExternalLink } from 'lucide-react';

interface CampaignDetailModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
}

const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  campaign,
  isOpen,
  onClose
}) => {
  if (!campaign) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{CAMPAIGN_STATUS_BADGES[campaign.status]}</span>
            {campaign.title}
          </DialogTitle>
          <DialogDescription>
            Detail lengkap kampanye pemasaran sosial media
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Kampanye</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Platform</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{PLATFORM_LABELS[campaign.platform]}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getStatusVariant(campaign.status)}>
                      {CAMPAIGN_STATUS_LABELS[campaign.status]}
                    </Badge>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">URL Target</label>
                  <div className="flex items-center gap-2 mt-1">
                    <a 
                      href={campaign.target_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {campaign.target_url}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Layanan yang Diminta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {campaign.services.map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{SERVICE_LABELS[service.type]}</span>
                      <p className="text-sm text-gray-600">
                        Target: {service.target_amount.toLocaleString('id-ID')} | 
                        Harga: Rp {service.price_per_unit.toLocaleString('id-ID')}/unit
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {service.completed_amount || 0} / {service.target_amount}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total: Rp {(service.target_amount * service.price_per_unit).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          {(campaign.status === 'active' || campaign.status === 'partial') && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress Kampanye</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Kemajuan Keseluruhan</span>
                    <span className="text-sm text-gray-600">{getProgressPercentage(campaign)}%</span>
                  </div>
                  <Progress value={getProgressPercentage(campaign)} className="h-3" />
                  <p className="text-sm text-gray-600">
                    {campaign.status === 'active' ? 'Kampanye sedang dikerjakan' : 'Sebagian layanan telah selesai'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Financial Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Keuangan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Total Biaya</p>
                    <p className="font-medium">Rp {campaign.total_cost.toLocaleString('id-ID')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-medium">Rp {campaign.budget.toLocaleString('id-ID')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Mulai</p>
                    <p className="font-medium">{new Date(campaign.start_date).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Berakhir</p>
                    <p className="font-medium">{new Date(campaign.end_date).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              </div>
              
              {campaign.payment_method && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status Pembayaran:</span>
                    <Badge variant={campaign.payment_status === 'paid' ? 'default' : 'secondary'}>
                      {PAYMENT_STATUS_LABELS[campaign.payment_status]}
                    </Badge>
                  </div>
                  {campaign.payment_method && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">Metode Pembayaran:</span>
                      <span className="font-medium">{campaign.payment_method.toUpperCase()}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          {campaign.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Catatan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{campaign.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailModal;
