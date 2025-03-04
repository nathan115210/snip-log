---
title: "Neumorphic Input Box"
date: "2025-03-04"
description: "The NeumorphicInputBox component is a styled text input field that uses the neumorphism design trend, creating a soft, 3D-pressed effect. The input box changes its shadow style when focused, simulating a pressed appearance."
tags: [ "CSS", "react" ]
demoName: "neumorphic-input-box"
---

## Overview

The NeumorphicInputBox component is a styled text input field that uses the neumorphism design trend, creating a soft,
3D-pressed effect. The input box changes its shadow style when focused, simulating a pressed appearance.

## Key Features

- Neumorphic Design: Uses soft shadows to create a raised effect.

- Smooth Interaction: Changes shadow style when focused.

- Custom Placeholder Styling: Transitions to a darker color when focused.

## Implementation

### React Component

- A wrapper <div> container for layout and styling.

- An ``<input>`` field with neumorphic styles applied.

### CSS Styling Approach

```css
.container {
    background: #e0e0e0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6rem;
}
```

- Sets a light gray background (#e0e0e0) for a soft, raised effect.

- Uses ``display: flex; flex-direction: column; align-items: center;`` to center the input.

```css
.input {
    width: 180px;
    height: 56px;
    border: none;
    outline-style: none;
    font-size: 16px;
    color: #333333;
    padding: 0 28px;
    border-radius: 28px;
    background: #e0e0e0;
    box-shadow: 6px 6px 12px #b8b8b8, -6px -6px 12px #ffffff, inset 0 0 0 #b8b8b8, inset 0 0 0 #ffffff;
    transition: all .24s ease-in-out;

    &:focus {
        box-shadow: 0 0 0 #b8b8b8, 0 0 0 #ffffff, inset 6px 6px 12px #b8b8b8, inset -6px -6px 12px #ffffff;
    }

    &::placeholder {
        color: rgba(0, 0, 0, 0.4);
        font-size: 1rem;
        font-weight: 700;
        transition: all .24s ease-in-out;
    }


    &:focus::placeholder {
        color: rgba(0, 0, 0, 0.8);
    }
}
```

- Base Styles:

    - ``border-radius: 28px`` for a rounded appearance.
    - ``background: #e0e0e0`` matches the container for a seamless look.
    - `box-shadow` simulates a raised element:
        - ``6px 6px 12px #b8b8b8`` (darker shadow on one side).
        - ``6px -6px 12px #ffffff`` (lighter highlight on the opposite side).

- Focus State (&:focus):

    - Shadow inverts to simulate an inset (pressed) effect.

    - box-shadow: inset 6px 6px 12px #b8b8b8, inset -6px -6px 12px #ffffff;

- Placeholder Styling:

    - Lighter placeholder color (`rgba(0, 0, 0, 0.4)`) for a subtle look.

    - Placeholder darkens when input is focused (`rgba(0, 0, 0, 0.8)`)

## Full code

```tsx
const NeumorphicInputBox = () => {
  return (
    <div className={`${styles.container} h-auto pb-40`}>
      <h2 className="heading pt-10 mb-10">Neumorphic Input Box</h2>
      <input type="text" className={styles.input} placeholder="Enter text" />
    </div>
  );
};
export default NeumorphicInputBox;
```

```scss
.container {
  background: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
}

.input {
  width: 180px;
  height: 56px;
  border: none;
  outline-style: none;
  font-size: 16px;
  color: #333333;
  padding: 0 28px;
  border-radius: 28px;
  background: #e0e0e0;
  box-shadow: 6px 6px 12px #b8b8b8, -6px -6px 12px #ffffff, inset 0 0 0 #b8b8b8, inset 0 0 0 #ffffff;
  transition: all .24s ease-in-out;

  &:focus {
    box-shadow: 0 0 0 #b8b8b8, 0 0 0 #ffffff, inset 6px 6px 12px #b8b8b8, inset -6px -6px 12px #ffffff;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-size: 1rem;
    font-weight: 700;
    transition: all .24s ease-in-out;
  }


  &:focus::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }
}
```