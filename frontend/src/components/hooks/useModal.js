import { useState } from "react";

export function useModal(initialState = false) {
  //useModal use in the place in useState
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  }; // isModalopen, openModal, closeModal -  inside the bracket
}
