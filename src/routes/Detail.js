import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie_detail, setMvDetail] = useState();

  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setMvDetail(json.data.movie);
      setLoading(false);
    };

    getMovie();
  }, [id]); // id가 변경될 때마다 useEffect가 실행됨

  return (
    <div>
      {loading ? (
        <h1>불러오는 중...</h1>
      ) : (
        <div>
          <h1>세부 정보</h1>
          <img src={movie_detail.medium_cover_image} alt={movie_detail.title} />
          <h2>제목 : {movie_detail.title}</h2>
          <p>{movie_detail.summary}</p>
          <ul>
            {movie_detail.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
