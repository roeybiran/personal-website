import {
	DetailedHTMLProps,
	HTMLAttributes,
	ReactNode,
	createElement,
} from 'react';

type ListType = Pick<JSX.IntrinsicElements, 'ul' | 'ol'>;

type ListProps<T, K extends keyof ListType> = {
	listType: K;
	iterable: T[];
	keyedBy: keyof T;
	content?: (item: T) => ReactNode;
	listProps?: DetailedHTMLProps<HTMLAttributes<K>, K>;
	listItemProps?: DetailedHTMLProps<
		HTMLAttributes<HTMLLIElement>,
		HTMLLIElement
	>;
};

function List<T, K extends keyof ListType>({
	listType,
	iterable,
	keyedBy,
	listProps,
	listItemProps,
	content = () => <></>,
}: ListProps<T, K>) {
	return createElement(
		listType,
		listProps,
		iterable.map((x) => {
			return (
				<li key={String(x[keyedBy])} {...listItemProps}>
					{content(x)}
				</li>
			);
		})
	);
}

export function UL<T>(props: Omit<ListProps<T, 'ul'>, 'listType'>) {
	return <List listType="ul" {...props} />;
}

export function OL<T>(props: Omit<ListProps<T, 'ol'>, 'listType'>) {
	return <List listType="ol" {...props} />;
}
