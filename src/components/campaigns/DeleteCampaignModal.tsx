
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Campaign } from '@/types/campaign';
import { useToast } from '@/hooks/use-toast';

interface DeleteCampaignModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (campaignId: string) => void;
}

const DeleteCampaignModal: React.FC<DeleteCampaignModalProps> = ({
  campaign,
  isOpen,
  onClose,
  onDelete
}) => {
  const { toast } = useToast();

  const handleDelete = () => {
    if (!campaign) return;

    onDelete(campaign.id);
    
    toast({
      title: "Kampanye Dihapus",
      description: `Kampanye "${campaign.title}" berhasil dihapus`
    });
    
    onClose();
  };

  if (!campaign) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Kampanye "<strong>{campaign.title}</strong>" 
            akan dihapus secara permanen dari sistem.
            {campaign.payment_status === 'paid' && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800">
                <strong>Peringatan:</strong> Kampanye ini sudah dibayar. Hubungi customer service untuk pengembalian dana.
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Ya, Hapus Kampanye
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCampaignModal;
