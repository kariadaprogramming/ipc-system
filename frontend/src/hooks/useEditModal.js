import { useState } from 'react';

const useEditModal = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [editFoto, setEditFoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const openEditModal = (item) => {
        setEditingItem(item);
        setEditFormData(item);
        setEditFoto(null);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingItem(null);
        setEditFormData({});
        setEditFoto(null);
        setIsLoading(false);
    };

    return {
        showEditModal,
        setShowEditModal,
        editingItem,
        setEditingItem,
        editFormData,
        setEditFormData,
        editFoto,
        setEditFoto,
        isLoading,
        setIsLoading,
        openEditModal,
        closeEditModal
    };
};

export default useEditModal;
