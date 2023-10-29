import { useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import camelCase from "camelcase";
import { IconButton, Button } from "@mui/material";
import { Close, Edit } from "@mui/icons-material";

import { remove, updateStatus } from "@/store/features/todosSlice";
import { Data } from "@/types/types";
import MyModal from "./MyModal";
import Form from "./Form";

type Props = { item: Data };

const Card = (props: Props) => {
  const { item } = props;

  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = () => {
    dispatch(remove(item.id));
    handleCloseModal();
  };

  const handleEdit = (status: string) => {
    dispatch(updateStatus({ id: item.id, status: status }));
  };

  return (
    <div className="overflow-hidden shadow-md rounded-md relative">
      <div className="bg-black text-white px-4 py-2 font-medium flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${
              item.status === "completed" ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <div>{camelCase(item.title, { pascalCase: true })}</div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton
            className="!absolute right-0 !text-white hover:!text-red-500"
            onClick={handleOpenModal}
          >
            <Close />
          </IconButton>
          <MyModal
            header="Delete Task?"
            open={openModal}
            handleClose={handleCloseModal}
          >
            <div className="mb-4">
              Are you sure you want to delete <b>{item.title}</b> task?
            </div>
            <div className="flex justify-end items-center gap-3">
              <Button
                variant="contained"
                className="!bg-white hover:!bg-zinc-100 !text-zinc-600 w-[100px] !border !border-solid !border-zinc-600"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="!bg-red-500 hover:!bg-red-600 w-[100px]"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </MyModal>
        </div>
      </div>

      <div
        className="px-4 py-2 grid 2xs:grid-cols-5 xs:grid-cols-6 sm:grid-cols-5 lg:grid-cols-6 3xl:grid-cols-7 gap-2 relative"
        onMouseEnter={() => setShowEdit(true)}
        onMouseLeave={() => setShowEdit(false)}
      >
        <div className="hidden xl:block absolute right-2 top-2 ">
          {showEdit && (
            <IconButton
              className="hover:!bg-amber-400 hover:!text-white"
              onClick={handleOpen}
            >
              <Edit />
            </IconButton>
          )}
        </div>
        <div className="absolute xl:hidden right-2 top-2">
          <IconButton
            className="hover:!bg-amber-400 hover:!text-white "
            onClick={handleOpen}
          >
            <Edit />
          </IconButton>
        </div>
        <div className="2xs:col-span-2 xs:col-span-2 font-semibold">
          Due Date:
        </div>
        <div className="2xs:col-start-3 2xs:col-end-6 xs:col-end-7 sm:col-end-6 lg:col-end-7 3xl:col-end-8">
          {dayjs(item.dueDate).format("DD/MM/YYYY")}
        </div>
        <div className="2xs:col-span-2 xs:col-span-2 font-semibold">
          Location:
        </div>
        <div className="2xs:col-start-3 2xs:col-end-6 xs:col-end-7 sm:col-end-6 lg:col-end-7 3xl:col-end-8">
          {camelCase(item.location, { pascalCase: true })}
        </div>
        <div className="2xs:col-span-2 xs:col-span-2 font-semibold">
          Priority:
        </div>
        <div className="2xs:col-start-3 2xs:col-end-6 xs:col-end-7 sm:col-end-6 lg:col-end-7 3xl:col-end-8">
          {camelCase(item.priority, { pascalCase: true })}
        </div>
        <div className="2xs:col-span-2 xs:col-span-2 font-semibold">
          Status:
        </div>
        <div className="2xs:col-start-3 2xs:col-end-6 xs:col-end-7 sm:col-end-6 lg:col-end-7 3xl:col-end-8 flex gap-2">
          <Button
            variant="contained"
            className={`2xs:!text-[0.5rem] 2xs:h-[25px] xs:!text-[0.75rem] xs:h-[30px] xs:w-[100px] sm:!text-[0.85rem] sm:w-[110px] xl:w-[105px] 2xl:!text-[0.65rem] 2xl:h-[25px] 2xl:w-[80px] 3xl:!text-xs 3xl:h-[30px] 3xl:w-[95px] ${
              item.status === "incomplete"
                ? "!bg-red-500 hover:!bg-red-600"
                : "!bg-white hover:!bg-zinc-50 !border !border-solid !border-zinc-400 !text-zinc-400 hover:!text-red-500"
            }`}
            onClick={() => handleEdit("incomplete")}
          >
            Incomplete
          </Button>
          <Button
            variant="contained"
            className={`2xs:!text-[0.5rem] 2xs:h-[25px] xs:!text-[0.75rem] xs:h-[30px] xs:w-[100px] sm:!text-[0.85rem] sm:w-[110px] xl:w-[105px] 2xl:!text-[0.65rem] 2xl:h-[25px] 2xl:w-[80px] 3xl:!text-xs 3xl:h-[30px] 3xl:w-[95px] ${
              item.status === "completed"
                ? "!bg-green-500 hover:!bg-green-600"
                : "!bg-white hover:!bg-zinc-50 !border !border-solid !border-zinc-400 !text-zinc-400 hover:!text-green-500"
            }`}
            onClick={() => handleEdit("completed")}
          >
            Completed
          </Button>
        </div>
        <div className="2xs:col-span-2 xs:col-span-2 font-semibold">
          Description:
        </div>
        <div className="2xs:col-start-3 2xs:col-end-6 xs:col-end-7 sm:col-end-6 lg:col-end-7 3xl:col-end-8 overflow-y-auto h-[4.75rem]">
          {item.description}
        </div>
      </div>
      <MyModal
        handleClose={handleClose}
        open={open || false}
        header={`Edit ${camelCase(item.title, { pascalCase: true })}`}
      >
        <Form
          handleClose={handleClose}
          id={item.id}
          type="update"
        />
      </MyModal>
    </div>
  );
};

export default Card;
