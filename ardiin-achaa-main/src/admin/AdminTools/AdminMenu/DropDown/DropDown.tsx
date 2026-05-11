// @ts-nocheck
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DropDown = ({ id, title, content }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const childActive = () => {
    if (!content) return false;
    return content.some(
      (item) => item?.uri && String(pathname).includes(item.uri)
    );
  };

  useEffect(() => {
    if (!content) return;
    const any = content.some(
      (item) => item?.uri && String(pathname).includes(item.uri)
    );
    if (any) setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- route config identity changes each render
  }, [pathname]);

  const renderContent = () => {
    return content.map((item, index) => {
      if (!item) {
        return null;
      } else {
        return (
          <li key={index} className="list-none">
            <NavLink
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
              to={`/admin/${id}${item.uri}`}
            >
              <span className="text-lg leading-none text-primary/70">·</span>
              {item.name}
            </NavLink>
          </li>
        );
      }
    });
  };

  if (!content) return null;

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="space-y-1">
      <Collapsible.Trigger
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
          childActive()
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        )}
      >
        <span>{title}</span>
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            open && "rotate-90"
          )}
          aria-hidden
        />
      </Collapsible.Trigger>
      <Collapsible.Content className="space-y-0.5 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <ul>{renderContent()}</ul>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default DropDown;
