"use client";
import { useState, KeyboardEvent, MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import camelCase from "camelcase";

import {
  Button,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Add,
  Menu,
  CheckBox,
  CheckBoxOutlineBlank,
  BorderAll,
} from "@mui/icons-material";

import Container from "@/components/Container";
import MyModal from "@/components/MyModal";
import Form from "@/components/Form";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigate = (pathname: string) => {
    if (pathname === "all") {
      router.push("/");
    } else {
      router.push(`/${pathname}`);
    }
  };

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawer(open);
    };

  return (
    <div className="h-[75px] bg-black text-white flex justify-center items-center sticky top-0 z-50">
      <Container noPY>
        <Button
          className="!rounded-full !bg-green-500 hover:!bg-green-600 !min-w-0 !w-[50px] !h-[50px] !fixed bottom-4 right-4 z-50 flex justify-center items-center !p-0 !text-white md:!hidden"
          onClick={handleOpen}
        >
          <Add fontSize="large" />
        </Button>
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 items-center relative gap-[12px] sm:gap-0">
          <IconButton
            size="large"
            edge="start"
            className="sm:!hidden w-1/5 !text-white"
            onClick={toggleDrawer(true)}
          >
            <Menu />
          </IconButton>
          <Drawer
            anchor={"left"}
            open={drawer}
            onClose={toggleDrawer(false)}
          >
            <Box
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
              className="2xs:w-[200px] xs:w-[225px]"
            >
              <List>
                {["all", "completed", "incomplete"].map((text, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    className={`${pathname === "/" + text && "!bg-black"} ${
                      pathname === "/" && text === "all" && "!bg-black"
                    }`}
                  >
                    <ListItemButton onClick={() => handleNavigate(text)}>
                      <ListItemIcon
                        className={`${
                          pathname === "/" + text && "!text-white"
                        } ${
                          pathname === "/" && text === "all" && "!text-white"
                        }`}
                      >
                        {index === 0 ? (
                          <BorderAll />
                        ) : index === 1 ? (
                          <CheckBox />
                        ) : (
                          <CheckBoxOutlineBlank />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={camelCase(text, { pascalCase: true })}
                        className={`${
                          pathname === "/" + text && "!text-white"
                        } ${
                          pathname === "/" && text === "all" && "!text-white"
                        }`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
          <div className="w-3/5 sm:w-auto flex justify-center text-3xl sm:justify-self-start font-bold sm:font-normal">
            Todo List
          </div>
          <div className="justify-self-end md:justify-self-center hidden sm:flex gap-8">
            <Link
              href="/"
              className={`hover:underline ${
                pathname === "/" && "underline font-semibold"
              }`}
            >
              All
            </Link>
            <Link
              href="/completed"
              className={`hover:underline ${
                pathname === "/completed" && "underline font-semibold"
              }`}
            >
              Completed
            </Link>
            <Link
              href="/incomplete"
              className={`hover:underline ${
                pathname === "/incomplete" && "underline font-semibold"
              }`}
            >
              Incomplete
            </Link>
          </div>
          <div className="justify-self-end hidden md:block">
            <Button
              variant="contained"
              className="!bg-green-500 hover:!bg-green-600 w-[100px]"
              onClick={handleOpen}
            >
              Add
            </Button>
          </div>
        </div>
      </Container>

      <MyModal
        handleClose={handleClose}
        open={open || false}
        header="Add New Task"
      >
        <Form
          handleClose={handleClose}
          type="create"
        />
      </MyModal>
    </div>
  );
};

export default Navbar;
