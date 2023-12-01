import * as React from "react";
import { useState, useEffect } from "react";
import CustomButton from "../Button/CustomButton";
import { ReviewFormProps } from "./ReviewForm.types";
import styles from "./ReviewForm.module.css";

const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmitReview,
  selectedRow,
  rows,
}) => {
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = event.target.value;
    if (text.length <= 100) {
      setReview(text);
      setErrorMessage("");
    } else {
      setReview(text);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (review.length > 100) {
      setErrorMessage("Review must be 100 characters or fewer.");
    } else if (review.length > 0) {
      onSubmitReview(review);
      setReview("");
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (selectedRow !== null) {
      setSubmitted(false);
    }
  }, [selectedRow]);

  return (
    <div>
      {selectedRow !== null && !submitted && (
        <div>
          <h3>
            Leave a Review for{" "}
            <span className={styles.movieTitle}>{rows[selectedRow][0]}</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="reviewTextArea">
              Review (100 character limit):
            </label>
            <br />
            <textarea
              rows={4}
              cols={50}
              value={review}
              onChange={handleReviewChange}
            />
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <br />
            <CustomButton type="submit" buttonTitle="Submit Review" />
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
