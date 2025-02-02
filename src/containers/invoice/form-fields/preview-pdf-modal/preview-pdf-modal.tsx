import { FC } from "react";
import { Button, Dialog, Flex } from "@radix-ui/themes";

import { Pdf } from "./pdf";

type PreviewPdfModalProps = {
  toggle: () => void;
};

export const PreviewPdfModal: FC<PreviewPdfModalProps> = (props) => {
  return (
    <Dialog.Root open>
      <Dialog.Content
        onClick={(event) => event.stopPropagation()}
        className="md:max-w-[80%] max-w-[90%] min-h-[80vh] flex flex-col"
      >
        <div className="flex flex-col p-2 md:p-4 relative w-full pb-5 h-full text-center">
          <Dialog.Title>Preview Invoice PDF</Dialog.Title>
          <Dialog.Description>
            Review your invoice before generate to PDF
          </Dialog.Description>
        </div>
        <div className="relative flex-1 flex flex-col self-stretch justify-between gap-5">
          <div id="pdf-preview" className="flex flex-grow flex-1 h-full">
            <Pdf />
          </div>
          <Flex gap="4" direction="row" wrap="wrap" justify="center">
            <Button
              variant="outline"
              className="min-w-[100px]"
              onClick={() => props.toggle()}
            >
              Cancel
            </Button>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
