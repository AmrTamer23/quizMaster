import { IoBasketballOutline } from "react-icons/io5";
import { QuizGenreType } from "./types";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { FiCpu } from "react-icons/fi";

const getGenreDetails = (selectedGenre: QuizGenreType) => {
  if (selectedGenre == ("sports" as unknown as QuizGenreType)) {
    return {
      title: "Sports",
      icon: <IoBasketballOutline size={30} />,
    };
  } else if (selectedGenre == ("history" as unknown as QuizGenreType)) {
    return {
      title: "History",
      icon: <MdOutlineHistoryEdu size={70} />,
    };
  } else if (selectedGenre == ("geo" as unknown as QuizGenreType)) {
    return {
      title: "Geography",
      icon: <GiEarthAfricaEurope size={70} />,
    };
  } else if (selectedGenre == ("cs" as unknown as QuizGenreType)) {
    return {
      title: "Computer Science",
      icon: <FiCpu size={40} />,
    };
  }
};
export default getGenreDetails;
