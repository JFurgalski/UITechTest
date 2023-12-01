import { useState } from "react";

type CallbackFunction = (data: any) => void;

const useSubmitReview = (apiEndpoint: string) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitReview = (review: string, callback: CallbackFunction) => {
    setSubmitting(true);
    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitting(false);
        if (data && data.message) {
          callback(data);
        } else {
          setError("An error occurred while submitting the review.");
        }
      })
      .catch((error) => {
        setSubmitting(false);
        setError(
          error.message || "An error occurred while submitting the review."
        );
      });
  };

  return { submitting, error, submitReview };
};

export default useSubmitReview;
