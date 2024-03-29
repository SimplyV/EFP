import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Article = (props) => {
  const { currentUser } = useAuth();
  const formatDate = (sqlDate) => {
    const date = new Date(sqlDate);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const day = formattedDate.slice(0, 2);
    const month = formattedDate.slice(3, 6);
    const year = formattedDate.slice(7);

    const suffix =
      day === '01' || day === '21' || day === '31' ? 'st' :
      day === '02' || day === '22' ? 'nd' :
      day === '03' || day === '23' ? 'rd' :
      'th';

    return `${day}${suffix} ${month} ${year}`;
  }

  return (
    <article className="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm">
      <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
          {formatDate(props.date)}
        </time>
        <Link to={`/single/${props.id}`}>
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            {props.content}
          </h3>
        </Link>
        {currentUser.uid === props.authorId ? (<Link to={`/update-post/${props.id}`}> Update </Link>) : ''}
      </div>
    </article>
  );
};

export default Article;

