import { Dayjs } from "dayjs";

export type Data = {
  id: string;
  title: string;
  location: string;
  priority: string;
  description: string;
  dueDate: Dayjs | null;
  status: string;
};
