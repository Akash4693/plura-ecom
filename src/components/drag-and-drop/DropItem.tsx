import { useDroppable } from "@dnd-kit/core";

// Update the props to include `children`
const DroppableArea = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  console.log(`Droppable area ${id} - isOver:`, isOver); // Log the state of isOver

  return (
    <div
      ref={setNodeRef}
      className={`space-y-6 rounded-xl transition-all duration-300 border-2 ${
        isOver ? "border-blue-500 bg-blue-50 shadow-lg" : "border-transparent"
      }`}
    >
      {children} {/* Render children */}
    </div>
  );
};

export default DroppableArea;
