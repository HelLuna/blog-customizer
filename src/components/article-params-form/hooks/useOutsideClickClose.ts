import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	onClose,
	rootRef,
}: UseOutsideClickClose) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (e: MouseEvent) => {
			const { target } = e;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onClose();
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, rootRef, onClose]);
};
