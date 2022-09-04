import React, {
  useRef,
  createRef,
  useEffect,
  FC,
  Children,
  MouseEventHandler,
  ReactElement,
} from "react";
import { GridStack } from "gridstack";

import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { GridItem } from "./GridItem";
type layout = { id: string; x: number; y: number; w: number; h: number }[];

type GridProps = {
  layout: layout;
  updateLayoutHandle: (layout: layout) => void;
  addWidget: MouseEventHandler<HTMLButtonElement>;
  removeWidget: (id: string) => void;
  children?: ReactElement | ReactElement[];
};

export const Grid: FC<GridProps> = ({
  layout,
  addWidget,
  removeWidget,
  children,
}) => {
  const gridItemsRefs: React.MutableRefObject<{
    [key: string]: React.MutableRefObject<HTMLDivElement>;
  }> = useRef({});
  const gridRef: React.MutableRefObject<undefined | GridStack> = useRef();

  if (children) {
    Children.forEach(children, (child) => {
      gridItemsRefs.current[child.props.id] =
        gridItemsRefs.current[child.props.id] || createRef();
    });
  }

  useEffect(() => {
    if (!children) return;

    gridRef.current =
      gridRef.current ||
      GridStack.init({
        column: 4,
        cellHeight: "510px",
        margin: 5,
      });

    const grid = gridRef.current;
    grid.batchUpdate();
    grid.removeAll(false);
    Children.forEach(children, (child) =>
      grid.makeWidget(gridItemsRefs.current[child.props.id].current)
    );

    grid.batchUpdate(false);
  }, [children]);

  return (
    <div>
      <button onClick={addWidget}>Add new widget</button>
      <div className={"grid-stack"}>
        {Children.map(children, (child) => {
          const childLayout = layout.find(
            (widget) => widget.id === child?.props.id
          );
          return (
            <GridItem
              itemRef={gridItemsRefs.current[child?.props.id]}
              id={child?.props.id}
              gs-id={childLayout?.id}
              gs-x={childLayout?.x}
              gs-y={childLayout?.y}
              gs-w={childLayout?.w}
              gs-h={childLayout?.h}
            >
              <button onClick={() => removeWidget(child?.props.id)}>
                Remove Widget
              </button>
              {child}
            </GridItem>
          );
        })}
      </div>
    </div>
  );
};
