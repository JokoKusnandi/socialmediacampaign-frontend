
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Campaign, PAYMENT_METHODS } from '@/types/campaign';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Smartphone, Building, Upload } from 'lucide-react';

interface PaymentModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (campaignId: string, paymentProof?: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  campaign,
  isOpen,
  onClose,
  onPaymentSuccess
}) => {
  const { toast } = useToast();
  const [paymentStep, setPaymentStep] = useState<'confirm' | 'upload' | 'success'>('confirm');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!campaign) return null;

  const getPaymentIcon = (method: string) => {
    if (['qris', 'gopay', 'shopeepay'].includes(method)) {
      return <Smartphone className="w-5 h-5" />;
    } else if (['bca', 'mandiri', 'bni', 'bri', 'cimb'].includes(method)) {
      return <Building className="w-5 h-5" />;
    } else {
      return <CreditCard className="w-5 h-5" />;
    }
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('upload');
      
      toast({
        title: "Pembayaran Diproses",
        description: `Silakan lakukan pembayaran sebesar Rp ${campaign.total_cost.toLocaleString('id-ID')} melalui ${campaign.payment_method?.toUpperCase()}`
      });
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentProof(file);
    }
  };

  const handleSubmitProof = () => {
    if (!paymentProof) {
      toast({
        title: "Error",
        description: "Silakan upload bukti pembayaran",
        variant: "destructive"
      });
      return;
    }

    // Simulate successful payment verification
    setTimeout(() => {
      onPaymentSuccess(campaign.id, `proof_${Date.now()}.jpg`);
      setPaymentStep('success');
      
      toast({
        title: "Pembayaran Berhasil!",
        description: "Kampanye Anda akan segera aktif dan dikerjakan"
      });
      
      setTimeout(() => {
        onClose();
        setPaymentStep('confirm');
        setPaymentProof(null);
      }, 3000);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setPaymentStep('confirm');
    setPaymentProof(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {paymentStep === 'confirm' && 'Konfirmasi Pembayaran'}
            {paymentStep === 'upload' && 'Upload Bukti Pembayaran'}
            {paymentStep === 'success' && 'Pembayaran Berhasil!'}
          </DialogTitle>
          <DialogDescription>
            {paymentStep === 'confirm' && 'Pastikan detail pembayaran sudah benar sebelum melanjutkan'}
            {paymentStep === 'upload' && 'Upload screenshot atau bukti pembayaran yang berhasil'}
            {paymentStep === 'success' && 'Kampanye Anda akan segera aktif'}
          </DialogDescription>
        </DialogHeader>

        {paymentStep === 'confirm' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detail Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kampanye:</span>
                  <span className="font-medium">{campaign.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Biaya:</span>
                  <span className="font-bold text-lg">Rp {campaign.total_cost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Metode Pembayaran:</span>
                  <div className="flex items-center gap-2">
                    {campaign.payment_method && getPaymentIcon(campaign.payment_method)}
                    <span className="font-medium">
                      {campaign.payment_method && PAYMENT_METHODS[campaign.payment_method]}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Perhatian:</strong> Setelah mengklik "Bayar Sekarang", Anda akan diarahkan untuk melakukan pembayaran. 
                Pastikan untuk menyimpan bukti pembayaran untuk diupload nanti.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Batal
              </Button>
              <Button 
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="bg-hero-gradient hover:opacity-90"
              >
                {isProcessing ? 'Memproses...' : 'Bayar Sekarang'}
              </Button>
            </div>
          </div>
        )}

        {paymentStep === 'upload' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Bukti Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <Label htmlFor="payment-proof" className="cursor-pointer">
                      <div className="text-blue-600 hover:text-blue-700 font-medium">
                        Klik untuk upload bukti pembayaran
                      </div>
                      <div className="text-sm text-gray-500">
                        Format: JPG, PNG, PDF (Max 5MB)
                      </div>
                    </Label>
                    <Input
                      id="payment-proof"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                
                {paymentProof && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      File terpilih
                    </Badge>
                    <span className="text-sm">{paymentProof.name}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>
                Batal
              </Button>
              <Button 
                onClick={handleSubmitProof}
                disabled={!paymentProof}
                className="bg-hero-gradient hover:opacity-90"
              >
                Konfirmasi Pembayaran
              </Button>
            </div>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <div className="text-2xl">✅</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Pembayaran Berhasil!</h3>
              <p className="text-gray-600 mt-2">
                Kampanye "<strong>{campaign.title}</strong>" akan segera aktif dan mulai dikerjakan oleh penyedia layanan.
              </p>
            </div>
            <Badge variant="default" className="bg-green-100 text-green-800">
              Status: Menunggu Aktivasi
            </Badge>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
