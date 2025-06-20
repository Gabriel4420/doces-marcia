interface LogoProps {
  heading?: string;
  subheading?: string;
}

export const Logo = ({heading = 'ZAP', subheading = 'Loja'}: LogoProps) => {
  return (
    <div className="text-xl">
      {subheading}{" "}
      <span className="font-bold text-[#10ae79] dark:text-[#10ae79]">
        {heading}
      </span>
    </div>
  );
};
