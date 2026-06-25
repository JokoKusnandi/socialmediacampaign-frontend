export interface Campaign {
  id: string;
  title: string;
  platform: SocialPlatform;
  target_url: string;
  services: CampaignService[];
  budget: number;
  start_date: string;
  end_date: string;
  status: 'pending' | 'active' | 'partial' | 'completed' | 'failed';
  notes?: string;
  advertiser_id: string;
  created_at: string;
  updated_at: string;
  payment_method?: PaymentMethod;
  payment_status: 'unpaid' | 'paid' | 'failed' | 'expired';
  payment_proof?: string;
  total_cost: number;
  progress: CampaignProgress[];
}

export interface CampaignProgress {
  service_type: ServiceType;
  target_amount: number;
  completed_amount: number;
  assigned_providers?: string[];
}

export interface CampaignService {
  type: ServiceType;
  target_amount: number;
  price_per_unit: number;
  comment_script?: string;
  comment_type?: 'positive' | 'script';
  completed_amount?: number;
}

export type SocialPlatform = 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'tiktok' | 'likee' | 'waveful';

export interface CampaignService {
  type: ServiceType;
  target_amount: number;
  price_per_unit: number;
  comment_script?: string;
  comment_type?: 'positive' | 'script';
}

export type ServiceType = 'view' | 'subscribe' | 'like' | 'comment' | 'follow' | 'watchtime' | 'share';

export type PaymentMethod = 'qris' | 'gopay' | 'shopeepay' | 'bca' | 'mandiri' | 'bni' | 'bri' | 'cimb' | 'mastercard' | 'visa' | 'paypal';

export const PLATFORM_SERVICES: Record<SocialPlatform, ServiceType[]> = {
  youtube: ['view', 'subscribe', 'like', 'comment', 'watchtime', 'share'],
  instagram: ['like', 'comment', 'follow', 'view', 'share'],
  facebook: ['like', 'comment', 'follow', 'view', 'share'],
  twitter: ['like', 'comment', 'follow', 'view', 'share'],
  tiktok: ['like', 'comment', 'follow', 'view', 'share'],
  likee: ['like', 'comment', 'follow', 'view', 'share'],
  waveful: ['like', 'comment', 'follow', 'view', 'share']
};

export const SERVICE_LABELS: Record<ServiceType, string> = {
  view: 'View Video',
  subscribe: 'Subscribe',
  like: 'Like',
  comment: 'Komentar',
  follow: 'Follow',
  watchtime: 'Watch Time',
  share: 'Share'
};

export const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'Twitter',
  tiktok: 'TikTok',
  likee: 'Likee',
  waveful: 'Waveful'
};

export const PAYMENT_METHODS: Record<PaymentMethod, string> = {
  qris: 'QRIS (Universal)',
  gopay: 'GoPay',
  shopeepay: 'ShopeePay',
  bca: 'Bank BCA',
  mandiri: 'Bank Mandiri',
  bni: 'Bank BNI',
  bri: 'Bank BRI',
  cimb: 'CIMB Niaga',
  mastercard: 'Mastercard',
  visa: 'Visa',
  paypal: 'PayPal'
};

export const CAMPAIGN_STATUS_LABELS = {
  pending: 'Menunggu Pembayaran',
  active: 'Berjalan',
  partial: 'Sebagian Selesai',
  completed: 'Selesai',
  failed: 'Gagal'
};

export const CAMPAIGN_STATUS_BADGES = {
  pending: '🟡',
  active: '🔵',
  partial: '🟠',
  completed: '✅',
  failed: '❌'
};

export const PAYMENT_STATUS_LABELS = {
  unpaid: 'Belum Dibayar',
  paid: 'Sudah Dibayar',
  failed: 'Pembayaran Gagal',
  expired: 'Kadaluarsa'
};

export const TARGET_AMOUNT_OPTIONS = [
  10, 20, 30, 40, 50, 60, 70, 100, 250, 500, 
  1000, 2000,3000,4000, 5000, 10000, 25000, 50000, 100000, 
  250000, 500000, 1000000
];

export const calculatePricePerUnit = (serviceType: ServiceType, targetAmount: number): number => {
  const pricingRules = {
    view: {
      min: 2,
      max: 50,
      factor: 0.8 // Price decreases as quantity increases
    },
    like: {
      min: 5,
      max: 80,
      factor: 0.75
    },
    subscribe: {
      min: 100,
      max: 500,
      factor: 0.7
    },
    follow: {
      min: 100,
      max: 500,
      factor: 0.7
    },
    comment: {
      min: 40,
      max: 200,
      factor: 0.8
    },
    share: {
      min: 40,
      max: 100,
      factor: 0.8
    },
    watchtime: {
      min: 30,
      max: 150,
      factor: 0.8
    }
  };

  const rule = pricingRules[serviceType];
  if (!rule) return 50;

  // Calculate price based on quantity (bulk discount)
  const quantityFactor = Math.pow(targetAmount / 1000, -rule.factor / 10);
  const basePrice = rule.min + (rule.max - rule.min) * Math.random() * 0.3;
  
  return Math.max(rule.min, Math.min(rule.max, Math.round(basePrice * quantityFactor)));
};

export const calculateDiscount = (totalAmount: number): number => {
  if (totalAmount >= 1000000) return 0.15; // 15% discount for 1M+
  if (totalAmount >= 500000) return 0.12;  // 12% discount for 500K+
  if (totalAmount >= 100000) return 0.08;  // 8% discount for 100K+
  if (totalAmount >= 50000) return 0.05;   // 5% discount for 50K+
  return 0; // No discount
};

export interface CreateCampaignData {
  title: string;
  platform: SocialPlatform;
  target_url: string;
  services: CampaignService[];
  budget: number;
  start_date: string;
  end_date: string;
  notes?: string;
  payment_method?: PaymentMethod;
}
