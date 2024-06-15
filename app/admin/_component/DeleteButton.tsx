import React, { useState } from "react";

import { DeleteButtonPros } from "@/@types/enum";
import { Button } from "@/Components/ui/button";

export const DeleteButton: React.FC<DeleteButtonPros> = ({ label, onDelete }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <div>Are you sure you want to delete?</div>
                    <div className="flex gap-2 mt-1">
                        <Button type="button" onClick={() => setShowConfirm(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                onDelete();
                                setShowConfirm(false);
                            }}
                            type="button"
                            className="border-b bg-purple-300 text-black">
                            Yes,&nbsp;delete!
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    );
}