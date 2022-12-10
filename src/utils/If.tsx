const If = ({
	this: isTrue,
	children,
}: {
	this?: any;
	children: React.ReactNode;
}) => (isTrue ? <>{children}</> : null);

export default If;
