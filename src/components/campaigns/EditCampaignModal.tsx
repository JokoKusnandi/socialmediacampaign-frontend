
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Campaign } from '@/types/campaign';
import { useToast } from '@/hooks/use-toast';

interface EditCampaignModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedCampaign: Campaign) => void;
}

const EditCampaignModal: React.FC<EditCampaignModalProps> = ({
  campaign,
  isOpen,
  onClose,
  onUpdate
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    target_url: '',
    budget: 0,
    start_date: '',
    end_date: '',
    notes: ''
  });

  useEffect(() => {
    if (campaign) {
      setFormData({
        title: campaign.title,
        target_url: campaign.target_url,
        budget: campaign.budget,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        notes: campaign.notes || ''
      });
    }
  }, [campaign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaign) return;

    // Validation
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Judul kampanye harus diisi",
        variant: "destructive"
      });
      return;
    }

    if (!formData.target_url.trim()) {
      toast({
        title: "Error", 
        description: "URL target harus diisi",
        variant: "destructive"
      });
      return;
    }

    if (formData.budget <= 0) {
      toast({
        title: "Error",
        description: "Budget harus lebih dari 0",
        variant: "destructive"
      });
      return;
    }

    // Update campaign
    const updatedCampaign: Campaign = {
      ...campaign,
      title: formData.title,
      target_url: formData.target_url,
      budget: formData.budget,
      start_date: formData.start_date,
      end_date: formData.end_date,
      notes: formData.notes,
      updated_at: new Date().toISOString()
    };

    onUpdate(updatedCampaign);
    
    toast({
      title: "Berhasil",
      description: "Kampanye berhasil diperbarui"
    });
    
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!campaign) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Kampanye</DialogTitle>
          <DialogDescription>
            Ubah detail kampanye. Perhatikan bahwa layanan tidak dapat diubah setelah kampanye dibuat.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Kampanye</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Masukkan judul kampanye"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_url">URL Target</Label>
            <Input
              id="target_url"
              value={formData.target_url}
              onChange={(e) => handleChange('target_url', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Maksimal (Rp)</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => handleChange('budget', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Tanggal Mulai</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => handleChange('start_date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">Tanggal Berakhir</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => handleChange('end_date', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan (Opsional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Tambahkan catatan untuk kampanye..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" className="bg-hero-gradient hover:opacity-90">
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCampaignModal;
