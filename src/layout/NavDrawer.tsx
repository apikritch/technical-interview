import React, { KeyboardEvent, MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import camelCase from "camelcase";

import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  BorderAll,
  Brightness1,
} from "@mui/icons-material";

type Props = {
  drawer: boolean;
  toggleDrawer: (open: boolean) => (event: KeyboardEvent | MouseEvent) => void;
};

const NavDrawer = (props: Props) => {
  const { drawer, toggleDrawer } = props;

  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (pathname: string) => {
    if (pathname === "all") {
      router.push("/");
    } else {
      router.push(`/${pathname}`);
    }
  };

  return (
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
        <List className="!p-0">
          <div className="font-semibold text-xl py-3 px-5 mb-">Menu</div>
          <Divider />
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
                  className={`${pathname === "/" + text && "!text-white"} ${
                    pathname === "/" && text === "all" && "!text-white"
                  }`}
                >
                  {index === 0 ? (
                    <Brightness1 className="text-sky-500" />
                  ) : index === 1 ? (
                    <Brightness1 className="text-green-500" />
                  ) : (
                    <Brightness1 className="text-red-500" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={camelCase(text, { pascalCase: true })}
                  className={`${pathname === "/" + text && "!text-white"} ${
                    pathname === "/" && text === "all" && "!text-white"
                  }`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default NavDrawer;
