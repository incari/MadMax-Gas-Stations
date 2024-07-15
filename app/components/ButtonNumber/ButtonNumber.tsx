import { Dispatch, SetStateAction } from "react";

type Props = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
};

export const ButtonNumber = ({ value = 0, setValue }: Props) => {
  const disableButton = Boolean(value <= 0);

  const handleButtons = (type: "add" | "subtract") => {
    if (type === "add") {
      setValue((value) => value + 1);
    }
    if (type === "subtract") {
      setValue((value) => {
        return value <= 0 ? 0 : value - 1;
      });
    }
  };

  return (
    <div
      className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg 
  dark:bg-neutral-900 dark:border-neutral-700 my-2"
      data-hs-input-number=""
    >
      <div className="flex items-center gap-x-1.5">
        <button
          type="button"
          className="size-6 inline-flex justify-center items-center gap-x-2 text-sm 
         font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm
          hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900
           dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          data-hs-input-number-decrement=""
          onClick={() => handleButtons("subtract")}
          disabled={disableButton}
        >
          <svg
            className="flex-shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
          </svg>
        </button>
        <input
          className="p-0 w-16 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white "
          id="liters"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          type="number"
          min="0" // Prevent negative values
          pattern="\d*" // Trigger IOS number pad
        />
        <button
          type="button"
          className="size-6 inline-flex justify-center items-center gap-x-2 text-sm 
    font-medium rounded-md border border-gray-200 bg-white text-gray-800 
    shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none
     dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          data-hs-input-number-increment=""
          onClick={() => handleButtons("add")}
        >
          <svg
            className="flex-shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
