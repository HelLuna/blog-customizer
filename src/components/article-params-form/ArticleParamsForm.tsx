import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from 'react';
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
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const handleFontFamilySelect = (value: OptionType) => {
		setFontFamily(value);
	};
	const selectedFontFamily = fontFamilyOptions.find(
		(option) => option.value === fontFamily.value
	);

	const handleFontSizeSelect = (value: OptionType) => {
		setFontSize(value);
	};
	const selectedFontSize = fontSizeOptions.find(
		(option) => option.value === fontSize.value
	);

	const handleFontColorSelect = (value: OptionType) => {
		setFontColor(value);
	};
	const selectedFontColor = fontColors.find(
		(option) => option.value === fontColor.value
	);

	const handleBackgroundColorSelect = (value: OptionType) => {
		setBackgroundColor(value);
	};
	const selectedBackgroundColor = backgroundColors.find(
		(option) => option.value === backgroundColor.value
	);

	const handleContentWidthSelect = (value: OptionType) => {
		setContentWidth(value);
	};
	const selectedContentWidth = contentWidthArr.find(
		(option) => option.value === contentWidth.value
	);

	return (
		<>
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
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectedFontFamily || null}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={handleFontFamilySelect}
						title='Шрифт'></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedFontSize || defaultArticleState.fontSizeOption}
						onChange={handleFontSizeSelect}
						title='Размер шрифта'></RadioGroup>
					<Select
						selected={selectedFontColor || null}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={handleFontColorSelect}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						selected={selectedBackgroundColor || null}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={handleBackgroundColorSelect}
						title='Цвет фона'></Select>
					<Select
						selected={selectedContentWidth || null}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={handleContentWidthSelect}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
