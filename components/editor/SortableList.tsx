"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCallback, useRef, type ReactNode } from "react";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

function useStableIds<T>(items: T[]): {
  ids: string[];
  reorderIds: (oldIdx: number, newIdx: number) => void;
} {
  const idsRef = useRef<string[]>([]);
  const prevItemsRef = useRef<T[] | null>(null);

  if (prevItemsRef.current === null) {
    idsRef.current = items.map(() => generateId());
    prevItemsRef.current = items;
  } else if (items !== prevItemsRef.current) {
    const prev = prevItemsRef.current;
    const ids = idsRef.current;

    if (items.length === ids.length) {
      // Same length: edit or already-handled reorder. Keep IDs.
    } else if (items.length > ids.length) {
      let addedIdx = items.length - 1;
      for (let i = 0; i < prev.length; i++) {
        if (!Object.is(items[i], prev[i])) {
          addedIdx = i;
          break;
        }
      }
      const next = [...ids];
      next.splice(addedIdx, 0, generateId());
      idsRef.current = next;
    } else {
      let removedIdx = prev.length - 1;
      for (let i = 0; i < items.length; i++) {
        if (!Object.is(items[i], prev[i])) {
          removedIdx = i;
          break;
        }
      }
      idsRef.current = ids.filter((_, i) => i !== removedIdx);
    }

    prevItemsRef.current = items;
  }

  const reorderIds = useCallback((oldIdx: number, newIdx: number) => {
    idsRef.current = arrayMove(idsRef.current, oldIdx, newIdx);
  }, []);

  return { ids: idsRef.current, reorderIds };
}

type SortableListProps<T> = {
  items: T[];
  onReorder: (next: T[]) => void;
  renderItem: (item: T, index: number) => ReactNode;
  idPrefix?: string;
  className?: string;
  itemClassName?: string;
};

export function SortableList<T>({
  items,
  onReorder,
  renderItem,
  idPrefix = "item",
  className,
  itemClassName,
}: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  const { ids: stableIds, reorderIds } = useStableIds(items);
  const ids = stableIds.map((id) => `${idPrefix}-${id}`);

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    reorderIds(oldIndex, newIndex);
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className={className}>
          {items.map((item, i) => (
            <SortableRow key={ids[i]} id={ids[i]} className={itemClassName}>
              {renderItem(item, i)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-2 ${className ?? ""}`}
    >
      <button
        type="button"
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        aria-label="Glisser pour réordonner"
        className="mt-2 flex h-6 w-5 shrink-0 cursor-grab items-center justify-center rounded text-muted hover:bg-zinc-100 hover:text-foreground active:cursor-grabbing"
      >
        <GripIcon />
      </button>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function GripIcon() {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="1.3" />
      <circle cx="3" cy="7" r="1.3" />
      <circle cx="3" cy="11" r="1.3" />
      <circle cx="9" cy="3" r="1.3" />
      <circle cx="9" cy="7" r="1.3" />
      <circle cx="9" cy="11" r="1.3" />
    </svg>
  );
}
