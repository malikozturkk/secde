import React from "react";

interface LegalSectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

export const LegalSection: React.FC<LegalSectionProps> = ({
  id,
  title,
  children,
}) => {
  return (
    <section id={id} className="space-y-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
};

interface LegalSubSectionProps {
  title: string;
  children: React.ReactNode;
}

export const LegalSubSection: React.FC<LegalSubSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="space-y-2 pl-1">
      <h3 className="text-base font-semibold text-[var(--color-primary-light)]">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

interface LegalListProps {
  items: string[];
}

export const LegalList: React.FC<LegalListProps> = ({ items }) => {
  return (
    <ul className="space-y-1.5 pl-5">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative before:content-['•'] before:absolute before:-left-4 before:text-[var(--color-primary-light)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
