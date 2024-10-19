import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto ",
        className
      )}>
      {children}
    </div>)
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}) => {
  return (
    (<div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input p-4 bg-black border border-transparent justify-between flex flex-col space-y-4",
        className
      )}>
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div
          className="xl:text-[1.5rem] lg:text-[1.4rem] md:text-[1.1rem] text-[1rem] header font-bold text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div
          className="body font-normal text-xs text-neutral-500">
          {description}
        </div>
      </div>
    </div>)
  );
};
