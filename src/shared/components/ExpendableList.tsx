"use client";

import { useState } from "react";

interface ExpandableListProps {
    title: string;
    children: React.ReactNode;
}

function ExpandableList({ title, children }: ExpandableListProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    function toggleExpanded() {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="border rounded-md shadow-sm my-2">
            <button
                onClick={toggleExpanded}
                className="w-full text-left p-2 bg-gray-100 border-b hover:bg-gray-200"
            >
                {title}
            </button>
            {isExpanded && (
                <div className="p-2">
                    {children}
                </div>
            )}
        </div>
    );
}

export default ExpandableList;