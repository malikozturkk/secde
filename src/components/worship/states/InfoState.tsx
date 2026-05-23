"use client";

import React from "react";

interface InfoStateAction {
  label: string;
  onClick: () => void;
}

interface InfoStateProps {
  tone?: "default" | "error";
  icon: React.ReactNode;
  title: string;
  body: string;
  primaryAction?: InfoStateAction;
  secondaryAction?: InfoStateAction;
}

export const InfoState: React.FC<InfoStateProps> = ({
  tone = "default",
  icon,
  title,
  body,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <section className={`wsh-info ${tone === "error" ? "is-error" : ""}`}>
      <div className="wsh-info-icon">{icon}</div>
      <h2 className="wsh-info-title">{title}</h2>
      <p className="wsh-info-body">{body}</p>
      {(primaryAction || secondaryAction) && (
        <div className="wsh-info-actions">
          {primaryAction && (
            <button
              type="button"
              className="wsh-info-btn-primary"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              className="wsh-info-btn-ghost"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </section>
  );
};
