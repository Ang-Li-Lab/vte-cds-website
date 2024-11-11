"use client";

import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface Button {
  id: string;
  name: string;
  value?: number;
  color: string;
}

interface ButtonGroupProps {
  criterionId: string;
  buttons: Button[];
  buttonsOrientation?: "horizontal" | "vertical";
  selectedButtonId: string;
  onButtonClick: (criterionId: string, buttonId: string) => void;
  showValues?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  criterionId,
  buttons,
  buttonsOrientation = "horizontal",
  selectedButtonId = "",
  onButtonClick,
  showValues = false,
}) => {
  const isHorizontal = buttonsOrientation === "horizontal";

  return (
    <ToggleGroup.Root
      type="single"
      className={`inline-flex ${isHorizontal ? "" : "flex-col"}`}
      value={selectedButtonId}
      onValueChange={(value) => {
        if (value) onButtonClick(criterionId, value);
      }}
    >
      {buttons.map((button, index) => {
        const isFirst = index === 0;
        const isLast = index === buttons.length - 1;

        const baseClasses = `px-2 py-2 border border-${button.color} focus:z-10 text-sm flex justify-between items-center`;
        const selectedClasses = `bg-${button.color} text-white`;
        const unselectedClasses = `bg-white text-${button.color}`;

        const borderRadiusClasses = isHorizontal
          ? isFirst
            ? "rounded-l-md"
            : isLast
              ? "rounded-r-md -ml-px"
              : "-ml-px"
          : isFirst
            ? "rounded-t-md"
            : isLast
              ? "rounded-b-md -mt-px"
              : "-mt-px";

        const classes = `${baseClasses} ${borderRadiusClasses} ${
          selectedButtonId === button.id ? selectedClasses : unselectedClasses
        }`;

        const formattedValue =
          showValues && button.value !== undefined
            ? button.value > 0
              ? `+${button.value}`
              : `${button.value}`
            : null;

        return (
          <ToggleGroup.Item
            key={button.id}
            value={button.id}
            className={classes}
          >
            <span className="text-left">{button.name}</span>
            {formattedValue !== null && (
              <span className="text-right ml-2">{formattedValue}</span>
            )}
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
};

export default ButtonGroup;
