import { useMedia } from "react-use";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({
  children,
  onOpenChange,
  open,
}: ResponsiveModalProps) => {
  const isDekstop = useMedia("(min-width: 1024px)", true);

  if (isDekstop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
          <VisuallyHidden.Root>
            <DialogTitle>Dialog in desktop</DialogTitle>
            <DialogDescription>
              This dialog only show in desktop screen or more
            </DialogDescription>
          </VisuallyHidden.Root>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
        <DrawerContent>{children}</DrawerContent>
      </div>
    </Drawer>
  );
};
