---
title: "Tank Progress Bar"
date: "2025-03-01"
description: "A circular progress bar with a wave animation that fills dynamically based on a slider input."
tags: [ "CSS", "React" ]
demoName: "tank-progress-bar"
---

## Overview

The TankProgressBar component visually represents a percentage value using a circular tank filled with a wave animation.
The user can control the fill level via a slider. The component leverages CSS animations and absolute positioning to
create a liquid effect that dynamically updates based on user input.

### Key Features

1. Uses an `input[type=range]` slider to adjust the tank fill level.
2. The fill level is represented by a div element (.wave) that moves vertically.
3. CSS animations (@keyframes rotate) create a rotating wave effect.
4. The value is displayed at the center of the tank.

## Implementation

### React Component

The TankProgressBar component maintains the following state and references:

- `value`: Represents the current percentage (0-100).

- `inputRef`: Ref for the slider input.

- `waveRef`: Ref for the wave element.

- The `useEffect` hooks ensure that:

    - The state updates whenever the slider input changes.

    - The `.wave` element's top position adjusts dynamically based on value, creating the visual effect of filling the
      tank.

### CSS Styling Approach

```css
.percentContainer {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: #000 solid 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
```

The outer container is a circular tank defined using:

- ``border-radius: 50%;`` to create a round shape.

- ``overflow: hidden;`` to keep the wave animation within the boundaries.

- ``position: relative;`` to ensure the .wave element can be absolutely positioned.

```css
.percent {
    font-size: 100px;
    z-index: 1;
    user-select: none;
}
```

- Displays the percentage value at the center of the tank.

- Uses ``z-index: 1`` to keep it above the wave animation.

```css
.wave {
    position: absolute;
    width: 400px;
    height: 400px;
    top: 200px;
    background: rgb(102, 153, 255);
    border-radius: 35%;
    animation: rotate 2s linear infinite;
}
```

The wave animation creates the effect of a liquid fill:

- Positioning:

    - Initially set at ``top: 200px`` (fully empty state).

    - Moves upward as the slider increases, ``top: 200 - value * 2 px``.

    - Absolute positioning ensures movement within the container.

- Styling:

    - `width: 400px`, `height: 400px`: Large enough to allow smooth animation.

    - `border-radius: 35%`: Gives a natural wavy water-like appearance.

    - `background: rgb(102, 153, 255)`: Defines the wave color.

- Animation, `@keyframes rotate`:

```css
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

```

- Rotates the ``.wave`` continuously for a realistic liquid effect.

- ``transform: rotate(0deg) → rotate(360deg)`` over `2s linear infinite`.

```css
.slider {
    -webkit-appearance: none;
    width: 100%;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider:hover {
    opacity: 1;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #000;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #000;
    cursor: pointer;
}
```

The range slider is styled for better UX:

- opacity: ``0.7`` (increases on hover for better visual feedback).

- Custom styling for ``::-webkit-slider-thumb`` and `::-moz-range-thumb` to enhance appearance.

## Full code

```tsx
import React, { useEffect, useRef, useState } from "react";

const TankProgressBar = () => {
  const [value, setValue] = useState<string>("0");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const waveRef = useRef<HTMLDivElement | null>(null);
  const slider: HTMLInputElement | null = inputRef.current;
  const wave: HTMLDivElement | null = waveRef.current;

  useEffect(() => {
    if (slider) {
      const handleInput = () => {
        setValue(slider.value);
      };
      slider.addEventListener("input", handleInput);
      return () => {
        slider.removeEventListener("input", handleInput);
      };
    }
  }, []);
  useEffect(() => {
    if (wave) {
      wave.style.top = `${200 - parseInt(value) * 2}px`;
    }
  }, [value]);
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <div className="p-6 slideContainer">
      <div className="percentContainer">
        <div className="percent">
          <span>{value}</span>
        </div>
        <div className="wave" ref={waveRef}></div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        className="slider"
        ref={inputRef}
        onChange={(e) => handleInputOnChange(e)}
      />
    </div>

  );
};
export default TankProgressBar;

```

```scss
.slideContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  gap: 3rem;

}

.percentContainer {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: #000 solid 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

}

.percent {
  font-size: 100px;
  z-index: 1;
  user-select: none;

}

.wave {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 200px;
  background: rgb(102, 153, 255);
  border-radius: 35%;
  animation: rotate 2s linear infinite;

}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;

  &:hover {
    opacity: 1;

  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #000;
    cursor: pointer;

  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #000;
    cursor: pointer;

  }

}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```