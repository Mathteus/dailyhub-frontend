import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';

interface IDialog {
	btnText: string;
	title: string;
	children: React.ReactNode;
	hasCloseBtn?: boolean;
	size:
		| 'xs'
		| 'sm'
		| 'md'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| 'full';
}

export default function App({
	btnText,
	title,
	children,
	size = 'md',
	hasCloseBtn = false,
}: IDialog) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<Button onPress={onOpen}>asdsds</Button>
			<Modal size={size} isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
							<ModalBody>{children}</ModalBody>
							<ModalFooter>
								{hasCloseBtn && (
									<Button color='danger' variant='light' onPress={onClose}>
										Close
									</Button>
								)}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
