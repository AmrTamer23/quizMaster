const useSessionStorage = () => {
  function setResult(score: number, genre: string) {
    sessionStorage.setItem(
      "quizResult",
      JSON.stringify({
        score: score,
        genre: genre,
      })
    );
  }

  function getResult() {
    const quizData = sessionStorage.getItem("quizResult");

    let data: { score: number; genre: string } = { score: 0, genre: "" };
    if (quizData) {
      data = JSON.parse(quizData);
    }

    return data;
  }

  return {
    setResult,
    getResult,
  };
};

export default useSessionStorage;
