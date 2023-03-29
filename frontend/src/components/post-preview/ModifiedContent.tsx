import { Link } from "react-router-dom";
import styles from "./PostPreview.module.scss";

const ModifiedContent = ({ content, hashtags }) => {
  const hashNames = hashtags.map((hash) => hash.name);

  return content.split(/(#\w+)/gim).map((text) => {
    if (hashNames.includes(text)) {
      return (
        <Link
          className={styles.hashlink}
          to={`/hashtags/${text.slice(1, text.length)}`}
          key={text}
        >
          {text}
        </Link>
      );
    } else {
      return text;
    }
  });
};

export default ModifiedContent;
