import { Tab } from "@/types/product";

export const ErrorHandler = (categoryTab: Tab) => {
  return (
    <>
      {categoryTab.title === "Temaki" ? (
        <div className="flex flex-col items-center justify-center my-10 w-full">
          <img src="/images/errors/temaki-error.png" width={150} height={150} />
          <h3 className="text-lg normal-case font-thin flex flex-col items-center justify-center">
            Isso é embaraçoso 😅😅😅 Não temos mais
            <span className="font-bold"> {categoryTab.title} </span>
          </h3>
        </div>
      ) : categoryTab.title === "Sushi" ? (
        <div className="flex flex-col items-center justify-center my-10">
          <h3 className="text-lg normal-case font-thin">
            Isso é embaraçoso 😅😅😅
            <br /> Aparentemente acabaram os estoques de
            <span className="font-bold"> sushi  🍣  </span>
          </h3>
        </div>
      ) : categoryTab.title === "Combinados" ? (
        <div className="flex flex-col items-center justify-center my-10">
          <img
            src="/images/errors/combinado-error.png"
            width={150}
            height={150}
          />
          <h3 className="text-lg normal-case font-thin flex flex-col items-center justify-center">
            Isso é embaraçoso 😅😅😅
            <br /> Aparentemente acabaram os estoques de
            <span className="font-bold"> {categoryTab.title} </span>
          </h3>
        </div>
      ) : (
        <div className="flex flex-col mx-auto w-full items-center justify-center my-10">
          <h3 className="text-lg normal-case font-thin flex flex-col items-center justify-center ">
            😭😭😭 <br/>
            Em breve ...
            <span className="font-bold"> {categoryTab.title} </span>
            
          </h3>
        </div>
      )}
    </>
  );
};
