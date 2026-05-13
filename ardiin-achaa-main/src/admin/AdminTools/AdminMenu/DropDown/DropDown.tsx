// @ts-nocheck
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DropDown = ({ id, title, content, icon }) => {
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
          <li key={index} className="list-none mt-1">
            <NavLink
              className={({ isActive }) =>
                cn(
                  "relative flex min-h-[2.25rem] items-center gap-3 rounded-lg py-2 pl-10 pr-3 text-[14px] leading-snug transition-colors duration-150",
                  isActive
                    ? "bg-muted/50 font-semibold text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )
              }
              to={`/admin/${id}${item.uri}`}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 shrink-0" aria-hidden />
              {item.name}
            </NavLink>
          </li>
        );
      }
    });
  };

  if (!content) return null;

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="space-y-1 mb-1">
      <Collapsible.Trigger
        className={cn(
          "flex w-full items-center justify-between rounded-lg py-[10px] px-3 text-left text-regular font-medium transition-colors",
          childActive() 
            ? "bg-muted font-semibold text-foreground" 
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        )}
      >
        <div className="flex items-center">
          {icon}
          <span className="leading-snug">{title}</span>
        </div>
        <ChevronRight
          className={cn(
            "h-[18px] w-[18px] shrink-0 text-muted-foreground transition-transform duration-200",
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
