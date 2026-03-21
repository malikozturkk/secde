export function AmbientBackground() {
  return (
    <>
      <div className="nebula bg-primary/10 top-20 -right-40" />
      <div className="nebula bg-secondary/10 bottom-40 -left-20" />
      <div className="nebula bg-tertiary/10 top-[40%] right-[10%]" />

      <div
        className="float-particle w-1 h-1 top-[10%] left-[20%]"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="float-particle w-2 h-2 top-[30%] right-[30%]"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="float-particle w-1.5 h-1.5 bottom-[20%] left-[40%]"
        style={{ animationDelay: "5s" }}
      />
      <div
        className="float-particle w-1 h-1 top-[60%] right-[15%]"
        style={{ animationDelay: "2s" }}
      />
    </>
  );
}
