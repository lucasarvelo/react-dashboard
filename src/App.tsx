import { useState } from "react";
import "./App.css";
import { Grid } from "./components/Grid";

type layout = { id: string; x: number; y: number; w: number; h: number }[];
type widget = { id: string; content: string; lock: boolean };

const App = () => {
  const [layout, setLayout] = useState<layout>([
    { id: "1", x: 0, y: 0, w: 1, h: 1 },
    { id: "2", x: 1, y: 0, w: 1, h: 1 },
    { id: "3", x: 2, y: 0, w: 1, h: 1 },
    { id: "4", x: 3, y: 0, w: 1, h: 1 },
  ]);

  const [widgets, setWidgets] = useState<widget[]>([
    { id: "1", content: "widget 1", lock: false },
    { id: "2", content: "widget 2", lock: false },
    { id: "3", content: "widget 3", lock: false },
    { id: "4", content: "widget 4", lock: false },
  ]);

  const updateLayoutHandle = (layout: layout) => console.log(layout);

  const addWidget = () => {
    const newWidget: widget = {
      id: (widgets.length + 1).toString(),
      content: "widget " + (widgets.length + 1).toString(),
      lock: false,
    };

    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  return (
    <div className="App">
      <Grid
        layout={layout}
        updateLayoutHandle={updateLayoutHandle}
        addWidget={addWidget}
        removeWidget={removeWidget}
      >
        {widgets.map((widget) => (
          <div
            className="widget"
            key={widget.id}
            id={widget.id}
            data-lock={widget.lock}
          >
            {widget.content}
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default App;
