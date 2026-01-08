import { forwardRef } from "react";

const Bear = forwardRef(({ id }, ref) => (
  <div
    id={id}
    ref={ref}
    className="mb-6 float-animation pulse-animation"
  >
    <img
      src="./4.png"
      alt="Bear Character"
      className="login-bear-img"
      draggable={false}
    />
  </div>
));

export default Bear;
