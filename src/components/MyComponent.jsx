// src/components/MyComponent.jsx
import { MY_CONST, add } from "../utils/constants";

export default function MyComponent() {
  return <div>{add(MY_CONST, 8)}</div>;
}
