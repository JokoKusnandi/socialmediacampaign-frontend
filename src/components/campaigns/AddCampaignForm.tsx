
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { 
  CreateCampaignData, 
  SocialPlatform, 
  ServiceType, 
  PaymentMethod,
  PLATFORM_SERVICES, 
  SERVICE_LABELS, 
  PLATFORM_LABELS,
  PAYMENT_METHODS,
  TARGET_AMOUNT_OPTIONS,
  calculatePricePerUnit,
  calculateDiscount
} from '@/types/campaign';
import { Plus, Trash2, Calendar, DollarSign, CreditCard, Percent } from 'lucide-react';

const campaignSchema = z.object({
  title: z.string().min(3, 'Judul kampanye minimal 3 karakter'),
  platform: z.enum(['youtube', 'instagram', 'facebook', 'twitter', 'tiktok', 'likee', 'waveful']),
  target_url: z.string().url('URL tidak valid'),
  services: z.array(z.object({
    type: z.enum(['view', 'subscribe', 'like', 'comment', 'follow', 'watchtime', 'share']),
    target_amount: z.number().min(1, 'Target minimal 1'),
    price_per_unit: z.number().min(0.01, 'Harga minimal 0.01'),
    comment_type: z.enum(['positive', 'script']).optional(),
    comment_script: z.string().optional()
  })).min(1, 'Minimal pilih 1 layanan'),
  budget: z.number().min(1000, 'Budget minimal Rp 1.000'),
  start_date: z.string(),
  end_date: z.string(),
  notes: z.string().optional(),
  payment_method: z.enum(['qris', 'gopay', 'shopeepay', 'bca', 'mandiri', 'bni', 'bri', 'cimb', 'mastercard', 'visa', 'paypal'])
});

interface AddCampaignFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddCampaignForm: React.FC<AddCampaignFormProps> = ({ onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('youtube');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm<CreateCampaignData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      platform: 'youtube',
      services: [{ type: 'view', target_amount: 1000, price_per_unit: calculatePricePerUnit('view', 1000) }],
      payment_method: 'qris'
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services'
  });

  const watchedServices = watch('services');
  const watchedBudget = watch('budget');

  const calculateSubtotal = () => {
    return watchedServices?.reduce((total, service) => {
      return total + (service.target_amount * service.price_per_unit);
    }, 0) || 0;
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const discountAmount = subtotal * discount;
  const totalCost = subtotal - discountAmount;

  const handlePlatformChange = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    setValue('platform', platform);
    const firstService = PLATFORM_SERVICES[platform][0];
    setValue('services', [{ 
      type: firstService, 
      target_amount: 1000, 
      price_per_unit: calculatePricePerUnit(firstService, 1000) 
    }]);
  };

  const addService = () => {
    const availableServices = PLATFORM_SERVICES[selectedPlatform];
    const serviceType = availableServices[0];
    append({
      type: serviceType,
      target_amount: 1000,
      price_per_unit: calculatePricePerUnit(serviceType, 1000)
    });
  };

  const handleTargetAmountChange = (index: number, amount: number) => {
    const serviceType = watchedServices[index].type;
    const newPrice = calculatePricePerUnit(serviceType, amount);
    setValue(`services.${index}.target_amount`, amount);
    setValue(`services.${index}.price_per_unit`, newPrice);
  };

  const handleServiceTypeChange = (index: number, serviceType: ServiceType) => {
    const currentAmount = watchedServices[index].target_amount;
    const newPrice = calculatePricePerUnit(serviceType, currentAmount);
    setValue(`services.${index}.type`, serviceType);
    setValue(`services.${index}.price_per_unit`, newPrice);
  };

  const onSubmit = async (data: CreateCampaignData) => {
    if (totalCost > watchedBudget) {
      toast({
        title: "Budget tidak mencukupi",
        description: `Total biaya Rp ${totalCost.toLocaleString('id-ID')} melebihi budget Rp ${watchedBudget.toLocaleString('id-ID')}`,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Creating campaign:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Kampanye berhasil dibuat",
        description: "Kampanye Anda telah dibuat dan menunggu review"
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Gagal membuat kampanye",
        description: "Terjadi kesalahan saat membuat kampanye",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Buat Kampanye Baru
          </CardTitle>
          <CardDescription>
            Buat kampanye promosi untuk meningkatkan engagement di media sosial Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campaign Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Judul Kampanye</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Contoh: Promosi Video Tutorial React"
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Platform Selection */}
            <div className="space-y-2">
              <Label>Platform Media Sosial</Label>
              <Select value={selectedPlatform} onValueChange={handlePlatformChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih platform" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PLATFORM_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Target URL */}
            <div className="space-y-2">
              <Label htmlFor="target_url">URL Target Konten</Label>
              <Input
                id="target_url"
                {...register('target_url')}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              {errors.target_url && (
                <p className="text-sm text-red-600">{errors.target_url.message}</p>
              )}
            </div>

            {/* Services */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Jenis Layanan yang Dibutuhkan</Label>
                <Button type="button" variant="outline" size="sm" onClick={addService}>
                  <Plus className="w-4 h-4 mr-1" />
                  Tambah Layanan
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="p-4 border-2 border-dashed border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium text-lg">Layanan #{index + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Service Type */}
                    <div className="space-y-2">
                      <Label>Jenis Layanan</Label>
                      <Select
                        value={watchedServices?.[index]?.type}
                        onValueChange={(value: ServiceType) => handleServiceTypeChange(index, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PLATFORM_SERVICES[selectedPlatform].map((service) => (
                            <SelectItem key={service} value={service}>
                              {SERVICE_LABELS[service]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Target Amount */}
                    <div className="space-y-2">
                      <Label>Jumlah Target</Label>
                      <Select
                        value={watchedServices?.[index]?.target_amount?.toString()}
                        onValueChange={(value) => handleTargetAmountChange(index, parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TARGET_AMOUNT_OPTIONS.map((amount) => (
                            <SelectItem key={amount} value={amount.toString()}>
                              {amount.toLocaleString('id-ID')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span>Harga per Unit:</span>
                      <span className="font-semibold">Rp {watchedServices?.[index]?.price_per_unit?.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span>Subtotal Layanan:</span>
                      <span className="font-bold text-blue-600">
                        Rp {((watchedServices?.[index]?.target_amount || 0) * (watchedServices?.[index]?.price_per_unit || 0)).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Comment Options */}
                  {watchedServices?.[index]?.type === 'comment' && (
                    <div className="space-y-4 border-t pt-4">
                      <Label>Jenis Komentar</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`positive-${index}`}
                            checked={watchedServices[index].comment_type === 'positive'}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setValue(`services.${index}.comment_type`, 'positive');
                              }
                            }}
                          />
                          <Label htmlFor={`positive-${index}`}>Komentar Positif Otomatis</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`script-${index}`}
                            checked={watchedServices[index].comment_type === 'script'}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setValue(`services.${index}.comment_type`, 'script');
                              }
                            }}
                          />
                          <Label htmlFor={`script-${index}`}>Komentar Sesuai Skrip</Label>
                        </div>
                      </div>

                      {watchedServices[index].comment_type === 'script' && (
                        <div className="space-y-2">
                          <Label>Skrip Komentar</Label>
                          <Textarea
                            {...register(`services.${index}.comment_script`)}
                            placeholder="Tulis skrip komentar yang ingin digunakan..."
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Budget and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Anggaran Maksimal (Rp)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  {...register('budget', { valueAsNumber: true })}
                  placeholder="100000"
                />
                {errors.budget && (
                  <p className="text-sm text-red-600">{errors.budget.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="start_date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Tanggal Mulai
                </Label>
                <Input
                  id="start_date"
                  type="date"
                  {...register('start_date')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date">Tanggal Berakhir</Label>
                <Input
                  id="end_date"
                  type="date"
                  {...register('end_date')}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Metode Pembayaran
              </Label>
              <Select
                value={watch('payment_method')}
                onValueChange={(value: PaymentMethod) => setValue('payment_method', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih metode pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qris">🔄 QRIS (Universal)</SelectItem>
                  <SelectItem value="gopay">💚 GoPay</SelectItem>
                  <SelectItem value="shopeepay">🧡 ShopeePay</SelectItem>
                  <SelectItem value="bca">🔵 Bank BCA</SelectItem>
                  <SelectItem value="mandiri">🟡 Bank Mandiri</SelectItem>
                  <SelectItem value="bni">🟠 Bank BNI</SelectItem>
                  <SelectItem value="bri">🔵 Bank BRI</SelectItem>
                  <SelectItem value="cimb">🔴 CIMB Niaga</SelectItem>
                  <SelectItem value="mastercard">💳 Mastercard</SelectItem>
                  <SelectItem value="visa">💙 Visa</SelectItem>
                  <SelectItem value="paypal">💰 PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cost Estimation */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Subtotal:</span>
                    <span className="text-lg font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="font-medium flex items-center gap-1">
                        <Percent className="w-4 h-4" />
                        Diskon ({(discount * 100).toFixed(0)}%):
                      </span>
                      <span className="font-semibold">-Rp {discountAmount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  
                  <hr className="border-blue-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Estimasi Biaya:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      Rp {totalCost.toLocaleString('id-ID')}
                    </span>
                  </div>
                  
                  {totalCost > watchedBudget && (
                    <div className="text-red-600 text-sm font-medium">
                      ⚠️ Total biaya melebihi anggaran maksimal (Rp {watchedBudget?.toLocaleString('id-ID')})
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Tambahkan catatan atau instruksi khusus untuk kampanye ini..."
                rows={3}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isLoading || totalCost > watchedBudget}>
                {isLoading ? 'Membuat Kampanye...' : 'Buat Kampanye'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCampaignForm;
