import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import ReviewForm from "../ReviewForm/ReviewForm";
import styles from "./ReviewModal.module.css";
import { ReviewFormProps } from "../ReviewForm/ReviewForm.types";

const ReviewModal: React.FC<ReviewFormProps> = ({
  onSubmitReview,
  selectedRow,
  rows,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedRow !== null) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [selectedRow]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmitReview = (review: string) => {
    onSubmitReview(review);
    setShowModal(false);
  };

  return (
    <Modal
      className={styles.ModalContainer}
      open={showModal}
      onClose={handleModalClose}
    >
      <div>
        {selectedRow !== null && (
          <ReviewForm
            onSubmitReview={handleSubmitReview}
            selectedRow={selectedRow}
            rows={rows}
          />
        )}
      </div>
    </Modal>
  );
};

export default ReviewModal;
