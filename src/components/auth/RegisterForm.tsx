
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { RegisterFormData } from '@/types/auth';

const registerSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string(),
  full_name: z.string().min(2, 'Nama lengkap minimal 2 karakter'),
  role: z.enum(['advertiser', 'service_provider']),
  is_agency: z.boolean(),
  agency_name: z.string().optional(),
  team_member_count: z
  .string()
  .optional()
  .transform((val) => (val ? Number(val) : undefined)),
  agency_description: z.string().optional(),
  work_channels: z.array(z.string()).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'advertiser' | 'service_provider'>('advertiser');
  const [isAgency, setIsAgency] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } =  useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'advertiser',
      is_agency: false,
      work_channels: []
    }
  });

  const channels = [
    'YouTube', 'Instagram', 'Facebook', 'Twitter', 'TikTok', 'Likee', 'Waveful'
  ];

  const handleChannelChange = (channel: string, checked: boolean) => {
    let newChannels: string[];
    if (checked) {
      newChannels = [...selectedChannels, channel];
    } else {
      newChannels = selectedChannels.filter(c => c !== channel);
    }
    setSelectedChannels(newChannels);
    setValue('work_channels', newChannels);
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast({
        title: "Registrasi berhasil",
        description: "Akun Anda telah dibuat successfully"
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Registrasi gagal",
        description: "Terjadi kesalahan saat membuat akun",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="contoh@email.com"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          placeholder="Minimal 6 karakter"
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          placeholder="Ulangi password"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="full_name">Nama Lengkap</Label>
        <Input
          id="full_name"
          {...register('full_name')}
          placeholder="Nama lengkap Anda"
        />
        {errors.full_name && (
          <p className="text-sm text-red-600">{errors.full_name.message}</p>
        )}
      </div>

      {/* Role Selection */}
      <div className="space-y-2">
        <Label>Jenis Akun</Label>
        <Select 
          value={selectedRole} 
          onValueChange={(value: 'advertiser' | 'service_provider') => {
            setSelectedRole(value);
            setValue('role', value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih jenis akun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="advertiser">Pemasang Iklan</SelectItem>
            <SelectItem value="service_provider">Penyedia Jasa Engagement</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      {/* Service Provider Specific Fields */}
      {selectedRole === 'service_provider' && (
        <>
          {/* Agency Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_agency"
              checked={isAgency}
              onCheckedChange={(checked) => {
                setIsAgency(checked as boolean);
                setValue('is_agency', checked as boolean);
              }}
            />
            <Label htmlFor="is_agency">Saya adalah Agency</Label>
          </div>

          {/* Agency Fields */}
          {isAgency && (
            <>
              <div className="space-y-2">
                <Label htmlFor="agency_name">Nama Agency</Label>
                <Input
                  id="agency_name"
                  {...register('agency_name')}
                  placeholder="Nama agency Anda"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="team_member_count">Jumlah Anggota Tim</Label>
                <Input
                  id="team_member_count"
                  type="number"
                  {...register('team_member_count')}
                  placeholder="Jumlah anggota tim"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agency_description">Deskripsi Agency</Label>
                <Textarea
                  id="agency_description"
                  {...register('agency_description')}
                  placeholder="Deskripsikan agency Anda"
                  rows={3}
                />
              </div>
            </>
          )}

          {/* Work Channels */}
          <div className="space-y-2">
            <Label>Platform Media Sosial yang Dikerjakan</Label>
            <div className="grid grid-cols-2 gap-2">
              {channels.map((channel) => (
                <div key={channel} className="flex items-center space-x-2">
                  <Checkbox
                    id={channel}
                    checked={selectedChannels.includes(channel)}
                    onCheckedChange={(checked) => handleChannelChange(channel, checked as boolean)}
                  />
                  <Label htmlFor={channel} className="text-sm">{channel}</Label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Mendaftar...' : 'Daftar'}
      </Button>
    </form>
  );
};

export default RegisterForm;
