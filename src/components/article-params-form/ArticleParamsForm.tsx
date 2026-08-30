import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, useCallback, useRef, useState } from 'react';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(currentArticleState);
	const rootRef = useRef<HTMLDivElement | null>(null);

	const handleChange = (key: keyof ArticleStateType) => (value: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleClose = useCallback(() => setIsAsideOpen(false), []);

	useOutsideClickClose({
		isOpen: isAsideOpen,
		onClose: handleClose,
		rootRef,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isAsideOpen}
				onClick={() => {
					setIsAsideOpen(!isAsideOpen);
				}}
			/>
			<aside
				className={clsx(
					styles.container,
					isAsideOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={handleChange('fontFamilyOption')}
						title='Шрифт'></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
						title='Размер шрифта'></RadioGroup>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={handleChange('fontColor')}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={handleChange('backgroundColor')}
						title='Цвет фона'></Select>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={handleChange('contentWidth')}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
