"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import camelCase from "camelcase";

import { RootState } from "@/store/store";
import Container from "@/components/Container";
import Card from "@/components/Card";
import { Data } from "@/types/types";

type Props = {
  page: string;
};

const Content = (props: Props) => {
  const { page } = props;

  const [data, setData] = useState([]);

  const todos = useSelector((state: RootState) => state.todos.todosData);

  useEffect(() => {
    if (page === "all") {
      setData(todos);
    } else {
      setData(todos.filter((todo: Data) => todo.status === page));
    }
  }, [page, todos]);

  return (
    <Container>
      <div className="flex justify-center items-center mt-5 text-2xl font-bold">
        {camelCase(page, { pascalCase: true })} Tasks
      </div>
      <main className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 py-6">
        {data &&
          data.map((item: Data, index: number) => (
            <Card
              key={index}
              item={item}
            />
          ))}
      </main>
    </Container>
  );
};

export default Content;
