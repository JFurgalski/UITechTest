import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import ReviewForm from "../ReviewForm/ReviewForm";

interface ReviewModalProps {
  onSubmitReview: (review: string) => void;
  selectedRow: number | null;
  rows: any[][];
}

const ReviewModal: React.FC<ReviewModalProps> = ({
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
    <Modal open={showModal} onClose={handleModalClose}>
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
