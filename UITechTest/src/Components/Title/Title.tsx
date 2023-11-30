import React from "react";
import styles from './Title.module.css'

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default Title;
