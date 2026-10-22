import type { CSSProperties } from "react";

interface PhoneVisualProps {
  color: string;
  className?: string;
  front?: boolean;
}

export default function PhoneVisual({ color, className = "", front = false }: PhoneVisualProps) {
  return (
    <div
      className={`phone-visual ${front ? "phone-front" : "phone-back"} ${className}`}
      style={{ "--phone-color": color } as CSSProperties}
      aria-hidden="true"
    >
      <div className="phone-edge">
        {front ? (
          <div className="phone-screen">
            <div className="phone-island" />
            <div className="phone-screen-orb phone-screen-orb-one" />
            <div className="phone-screen-orb phone-screen-orb-two" />
            <span className="phone-time">9:41</span>
            <div className="phone-home" />
          </div>
        ) : (
          <>
            <div className="camera-plate">
              <span className="camera-lens lens-one"><i /></span>
              <span className="camera-lens lens-two"><i /></span>
              <span className="camera-lens lens-three"><i /></span>
              <span className="camera-flash" />
              <span className="camera-sensor" />
            </div>
            <span className="phone-subtle-mark" />
          </>
        )}
      </div>
    </div>
  );
}
