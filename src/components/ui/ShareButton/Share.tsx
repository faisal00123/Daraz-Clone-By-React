import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Copy, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { InputGroup } from '@/components/ui/input-group';

export function Share() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <InputGroup>
              <Label htmlFor="link" className=" sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={location.href} readOnly />
              <Copy
                className="w-12"
                onClick={() => {
                  window.navigator.clipboard.writeText(location.href);
                  toast.success('Copied');
                }}
              />
            </InputGroup>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
