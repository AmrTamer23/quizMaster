import { IoBasketballOutline } from "react-icons/io5";
import { QuizCategorieType } from "./types";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { FiCpu } from "react-icons/fi";

const getGenreDetails = (selectedGenre: QuizCategorieType) => {
  if (selectedGenre == ("sports" as unknown as QuizCategorieType)) {
    return {
      title: "Sports",
      icon: <IoBasketballOutline size={80} />,
    };
  } else if (selectedGenre == ("history" as unknown as QuizCategorieType)) {
    return {
      title: "History",
      icon: <MdOutlineHistoryEdu size={70} />,
    };
  } else if (selectedGenre == ("geo" as unknown as QuizCategorieType)) {
    return {
      title: "Geography",
      icon: <GiEarthAfricaEurope size={70} />,
    };
  } else if (selectedGenre == ("cs" as unknown as QuizCategorieType)) {
    return {
      title: "Computer Science",
      icon: <FiCpu size={40} />,
    };
  }
};
export default getGenreDetails;
