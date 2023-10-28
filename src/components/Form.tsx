import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Data } from "@/types/types";
import { create, update } from "@/store/features/todosSlice";
import { RootState } from "@/store/store";

type Props = {
  type: string;
  id?: string;
  handleClose: () => void;
};

const Form = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { type, id, handleClose } = props;

  const todos = useSelector((state: RootState) => state.todos.todosData);

  const [data, SetData] = useState<Data>({
    id: "",
    title: "",
    location: "",
    priority: "",
    description: "",
    dueDate: null,
    status: "",
  });

  useEffect(() => {
    if (type === "update") {
      const foundObject = todos.find((obj: Data) => obj.id === id);
      if (foundObject) {
        SetData(foundObject);
      }
    }
  }, [type, todos, id]);

  const closeModal = () => {
    SetData({
      id: "",
      title: "",
      location: "",
      priority: "",
      description: "",
      dueDate: null,
      status: "",
    });
    handleClose();
  };

  const handleChange = (
    event:
      | SelectChangeEvent
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    SetData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      data.title &&
      data.location &&
      data.priority &&
      data.description &&
      data.dueDate
    ) {
      if (type === "create") {
        data.id = uuidv4();
        data.status = "incomplete";
        dispatch(create({ ...data, dueDate: dayjs(data.dueDate).format() }));
      } else if (type === "update") {
        dispatch(update({ ...data, dueDate: dayjs(data.dueDate).format() }));
      }
      router.push("/");
      closeModal();
    }
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => handleSubmit(event)}
    >
      <TextField
        label="Title"
        variant="outlined"
        size="small"
        name="title"
        value={data.title}
        onChange={handleChange}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Due Date"
          format="DD/MM/YYYY"
          slotProps={{ textField: { size: "small" } }}
          value={type === "create" ? data.dueDate : dayjs(data.dueDate)}
          onChange={(newValue: Dayjs | null) =>
            SetData({ ...data, dueDate: newValue })
          }
        />
      </LocalizationProvider>
      <TextField
        label="Location"
        variant="outlined"
        size="small"
        name="location"
        value={data.location}
        onChange={handleChange}
      />
      <FormControl
        fullWidth
        size="small"
      >
        <InputLabel id="priority-select-label">Priority</InputLabel>
        <Select
          labelId="priority-select-label"
          id="priority-select"
          value={data.priority}
          label="Priority"
          name="priority"
          onChange={handleChange}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Description"
        multiline
        rows={3.5}
        name="description"
        value={data.description}
        onChange={handleChange}
      />
      <div className="flex justify-end gap-3">
        <Button
          variant="contained"
          className="!bg-white hover:!bg-zinc-100 !text-rose-600 w-[100px] !border !border-solid !border-rose-600"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className="!bg-green-500 hover:!bg-green-600 w-[100px]"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default Form;
