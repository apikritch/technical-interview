import { ReactNode } from "react";
import { Backdrop, Box, Modal, Fade } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

type Props = {
  children: ReactNode;
  handleClose: () => void;
  open: boolean;
  header: string;
};

const MyModal = (props: Props) => {
  const { children, handleClose, open, header } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={style}
          className="rounded-md bg-white py-4 px-6 2xs:w-[290px] xs:w-[345px] sm:w-[400px]"
        >
          <div className="text-2xl font-bold">{header}</div>
          <hr className="bg-black mt-2 mb-4" />
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default MyModal;
