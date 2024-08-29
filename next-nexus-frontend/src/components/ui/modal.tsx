import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/state/modal.store";
import { Button } from "./button";

const UserDeleteModal = ({ onDelete }: { onDelete: (id: string) => void }) => {
  const { isOpen, closeModal, id } = useModalStore();

  if (!isOpen) return null;

  const onSubmit = () => {
    if (!id) {
      closeModal();
    }

    onDelete(id as string);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-4">
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="destructive" onClick={onSubmit}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { UserDeleteModal };
