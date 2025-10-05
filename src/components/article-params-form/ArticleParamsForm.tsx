import clsx from 'clsx';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	function changeFormField(key: keyof ArticleStateType, value: OptionType) {
		setFormState({ ...formState, [key]: value });
	}

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setArticleState(formState);
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => changeFormField('fontFamilyOption', value)}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) => changeFormField('fontSizeOption', value)}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => changeFormField('fontColor', value)}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) => changeFormField('backgroundColor', value)}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => changeFormField('contentWidth', value)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setFormState(defaultArticleState);
								setArticleState(defaultArticleState);
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
